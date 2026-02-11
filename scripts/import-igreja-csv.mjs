#!/usr/bin/env node

import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import { parse } from 'csv-parse/sync'
import pg from 'pg'

const { Pool } = pg

const DATABASE_URL = process.env.DATABASE_URL
const CSV_DIR = path.join(process.cwd(), 'appantigo', 'xls')
const BATCH_SIZE = 200

if (!DATABASE_URL) {
  console.error('DATABASE_URL não configurado.')
  process.exit(1)
}

function normalizeAscii(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function sanitizeIdentifier(value, fallback) {
  const normalized = normalizeAscii(value)
  let identifier = normalized
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')

  if (!identifier) identifier = fallback
  if (/^[0-9]/.test(identifier)) identifier = `c_${identifier}`

  if (identifier.length > 63) {
    const hash = crypto.createHash('md5').update(identifier).digest('hex').slice(0, 8)
    identifier = `${identifier.slice(0, 54)}_${hash}`
  }

  return identifier
}

function sanitizeTableName(fileName) {
  const withoutExtension = fileName.replace(/\.csv$/i, '')
  const withoutPrefix = normalizeAscii(withoutExtension)
    .replace(/^apppastoreiogestao\s*-\s*/i, '')
    .replace(/^apppastoreiogestao\s*/i, '')
    .trim()

  return `igreja_${sanitizeIdentifier(withoutPrefix || withoutExtension, 'dados')}`
}

function quoteIdent(identifier) {
  return `"${identifier.replace(/"/g, '""')}"`
}

function normalizeCell(value) {
  if (value === null || value === undefined) return null
  const asString = String(value)
  return asString.trim() === '' ? null : asString
}

function uniqueColumnNames(headers) {
  const seen = new Map()
  const result = []

  for (let index = 0; index < headers.length; index += 1) {
    const header = headers[index]
    const base = sanitizeIdentifier(header, `col_${index + 1}`)
    const count = seen.get(base) ?? 0
    seen.set(base, count + 1)
    result.push(count === 0 ? base : `${base}_${count + 1}`)
  }

  return result
}

function parseCsv(content) {
  return parse(content, {
    bom: true,
    columns: false,
    delimiter: ',',
    quote: '"',
    escape: '"',
    relax_quotes: true,
    relax_column_count: true,
    skip_empty_lines: false,
    trim: false,
  })
}

async function tableColumns(client, tableName) {
  const result = await client.query(
    `
      SELECT column_name
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = $1
    `,
    [tableName]
  )

  return new Set(result.rows.map((row) => row.column_name))
}

async function tableExists(client, tableName) {
  const result = await client.query(
    `
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = $1
      ) AS ok
    `,
    [tableName]
  )
  return Boolean(result.rows[0]?.ok)
}

async function upsertAccessFromSource(client, source) {
  await client.query(
    `
      INSERT INTO igreja_access_index (email, is_colaborador, is_membresia, source, updated_at)
      SELECT DISTINCT
        LOWER(TRIM(email)) AS email,
        $1::boolean AS is_colaborador,
        $2::boolean AS is_membresia,
        ARRAY[$3::text] AS source,
        NOW()
      FROM ${quoteIdent(source.tableName)}
      WHERE COALESCE(TRIM(email), '') <> ''
      ON CONFLICT (email) DO UPDATE SET
        is_colaborador = igreja_access_index.is_colaborador OR EXCLUDED.is_colaborador,
        is_membresia = igreja_access_index.is_membresia OR EXCLUDED.is_membresia,
        source = (
          SELECT ARRAY(
            SELECT DISTINCT entry
            FROM unnest(igreja_access_index.source || EXCLUDED.source) AS entry
          )
        ),
        updated_at = NOW()
    `,
    [source.isColaborador, source.isMembresia, source.label]
  )
}

async function rebuildAccessIndex(client) {
  await client.query('TRUNCATE TABLE igreja_access_index')

  const sources = [
    {
      tableName: 'igreja_bp_autority',
      requiredColumn: 'email',
      label: 'bp_autority',
      isColaborador: true,
      isMembresia: true,
    },
    {
      tableName: 'igreja_appdiscipulado',
      requiredColumn: 'email',
      label: 'appdiscipulado',
      isColaborador: false,
      isMembresia: true,
    },
    {
      tableName: 'igreja_id_departamentos',
      requiredColumn: 'email',
      label: 'id_departamentos',
      isColaborador: true,
      isMembresia: true,
    },
  ]

  for (const source of sources) {
    const exists = await tableExists(client, source.tableName)
    if (!exists) continue

    const columns = await tableColumns(client, source.tableName)
    if (!columns.has(source.requiredColumn)) continue

    await upsertAccessFromSource(client, source)
  }
}

async function main() {
  const files = (await fs.readdir(CSV_DIR))
    .filter((file) => file.toLowerCase().endsWith('.csv'))
    .sort((a, b) => a.localeCompare(b))

  if (files.length === 0) {
    console.log(`Nenhum CSV encontrado em ${CSV_DIR}`)
    return
  }

  const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
  })

  const client = await pool.connect()
  const failures = []
  let importedTables = 0
  let importedRows = 0

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS igreja_import_meta (
        source_file TEXT PRIMARY KEY,
        table_name TEXT NOT NULL,
        rows_imported INTEGER NOT NULL DEFAULT 0,
        imported_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        status TEXT NOT NULL DEFAULT 'ok',
        error TEXT
      )
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS igreja_access_index (
        email TEXT PRIMARY KEY,
        is_colaborador BOOLEAN NOT NULL DEFAULT FALSE,
        is_membresia BOOLEAN NOT NULL DEFAULT FALSE,
        source TEXT[] NOT NULL DEFAULT '{}',
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `)

    await client.query(`
      CREATE INDEX IF NOT EXISTS igreja_access_index_email_idx
      ON igreja_access_index ((LOWER(email)))
    `)

    for (const fileName of files) {
      const tableName = sanitizeTableName(fileName)
      const filePath = path.join(CSV_DIR, fileName)

      try {
        const content = await fs.readFile(filePath, 'utf8')
        const parsed = parseCsv(content)
        const rawHeaders = Array.isArray(parsed[0]) ? parsed[0] : []
        const headers = uniqueColumnNames(rawHeaders)
        const dataRows = parsed.slice(1)

        if (headers.length === 0) {
          throw new Error('CSV sem cabeçalho')
        }

        await client.query('BEGIN')

        await client.query(`DROP TABLE IF EXISTS ${quoteIdent(tableName)}`)
        await client.query(
          `
            CREATE TABLE ${quoteIdent(tableName)} (
              ${headers.map((header) => `${quoteIdent(header)} TEXT`).join(', ')},
              _source_row INTEGER NOT NULL,
              _imported_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            )
          `
        )

        const insertColumns = [...headers, '_source_row']
        const quotedColumns = insertColumns.map((column) => quoteIdent(column)).join(', ')

        let rowsInserted = 0
        const preparedRows = dataRows
          .map((row, index) => {
            const values = headers.map((_, colIndex) => normalizeCell(Array.isArray(row) ? row[colIndex] : null))
            const isEmpty = values.every((value) => value === null)
            if (isEmpty) return null
            return {
              values,
              sourceRow: index + 2,
            }
          })
          .filter(Boolean)

        for (let i = 0; i < preparedRows.length; i += BATCH_SIZE) {
          const batch = preparedRows.slice(i, i + BATCH_SIZE)
          const params = []
          const valuesSql = []

          for (const row of batch) {
            const placeholders = []
            for (const value of row.values) {
              params.push(value)
              placeholders.push(`$${params.length}`)
            }
            params.push(row.sourceRow)
            placeholders.push(`$${params.length}`)
            valuesSql.push(`(${placeholders.join(', ')})`)
          }

          await client.query(
            `
              INSERT INTO ${quoteIdent(tableName)} (${quotedColumns})
              VALUES ${valuesSql.join(', ')}
            `,
            params
          )
          rowsInserted += batch.length
        }

        await client.query(
          `
            INSERT INTO igreja_import_meta (
              source_file,
              table_name,
              rows_imported,
              imported_at,
              status,
              error
            )
            VALUES ($1, $2, $3, NOW(), 'ok', NULL)
            ON CONFLICT (source_file) DO UPDATE SET
              table_name = EXCLUDED.table_name,
              rows_imported = EXCLUDED.rows_imported,
              imported_at = NOW(),
              status = 'ok',
              error = NULL
          `,
          [fileName, tableName, rowsInserted]
        )

        await client.query('COMMIT')
        importedTables += 1
        importedRows += rowsInserted
        console.log(`Importado ${fileName} -> ${tableName} (${rowsInserted} linhas)`)
      } catch (error) {
        await client.query('ROLLBACK').catch(() => undefined)
        failures.push({
          fileName,
          error: error instanceof Error ? error.message : String(error),
        })
        await client.query(
          `
            INSERT INTO igreja_import_meta (
              source_file,
              table_name,
              rows_imported,
              imported_at,
              status,
              error
            )
            VALUES ($1, $2, 0, NOW(), 'error', $3)
            ON CONFLICT (source_file) DO UPDATE SET
              imported_at = NOW(),
              status = 'error',
              error = EXCLUDED.error
          `,
          [fileName, sanitizeTableName(fileName), error instanceof Error ? error.message : String(error)]
        )
        console.error(`Falha ao importar ${fileName}: ${failures[failures.length - 1].error}`)
      }
    }

    await rebuildAccessIndex(client)

    console.log('')
    console.log(`Importação finalizada: ${importedTables} tabela(s), ${importedRows} linha(s).`)

    if (failures.length > 0) {
      console.log('Arquivos com falha:')
      for (const failure of failures) {
        console.log(`- ${failure.fileName}: ${failure.error}`)
      }
      process.exitCode = 1
    }
  } finally {
    client.release()
    await pool.end()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
