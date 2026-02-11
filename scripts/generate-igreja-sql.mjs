#!/usr/bin/env node

import crypto from 'node:crypto'
import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'
import { parse } from 'csv-parse/sync'

const INPUT_DIR = path.join(process.cwd(), 'appantigo', 'xls')
const OUTPUT_DIR = path.join(process.cwd(), 'appantigo', 'sql')
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'igreja_full_import.sql')
const BATCH_SIZE = 200

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
  const base = fileName.replace(/\.csv$/i, '')
  return sanitizeIdentifier(base, 'igreja_dados')
}

function uniqueColumnNames(headers) {
  const seen = new Map()
  const result = []

  for (let index = 0; index < headers.length; index += 1) {
    const base = sanitizeIdentifier(headers[index], `col_${index + 1}`)
    const count = seen.get(base) ?? 0
    seen.set(base, count + 1)
    const suffix = count === 0 ? '' : `_${count + 1}`
    const maxBaseLen = 63 - suffix.length
    const column = `${base.slice(0, maxBaseLen)}${suffix}`
    result.push(column)
  }

  return result
}

function quoteIdent(identifier) {
  return `"${identifier.replace(/"/g, '""')}"`
}

function sqlValue(value) {
  if (value === null || value === undefined) return 'NULL'
  const text = String(value)
  return `'${text.replace(/'/g, "''")}'`
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

async function main() {
  const files = (await fsp.readdir(INPUT_DIR))
    .filter((file) => /^igreja_.*\.csv$/i.test(file))
    .sort((a, b) => a.localeCompare(b))

  if (files.length === 0) {
    throw new Error(`Nenhum arquivo igreja_*.csv encontrado em ${INPUT_DIR}`)
  }

  await fsp.mkdir(OUTPUT_DIR, { recursive: true })

  const stream = fs.createWriteStream(OUTPUT_FILE, { encoding: 'utf8' })
  const write = (text) => stream.write(text)

  write('-- Arquivo gerado automaticamente por scripts/generate-igreja-sql.mjs\n')
  write(`-- Gerado em: ${new Date().toISOString()}\n`)
  write(`-- Total de arquivos CSV: ${files.length}\n\n`)
  write('BEGIN;\n\n')

  let totalRows = 0

  for (const fileName of files) {
    const tableName = sanitizeTableName(fileName)
    const filePath = path.join(INPUT_DIR, fileName)
    const content = await fsp.readFile(filePath, 'utf8')
    const parsed = parseCsv(content)

    const rawHeaders = Array.isArray(parsed[0]) ? parsed[0] : []
    const columns = uniqueColumnNames(rawHeaders)

    write(`-- ============================================================================\n`)
    write(`-- ${fileName} -> ${tableName}\n`)
    write(`-- ============================================================================\n`)
    write(`DROP TABLE IF EXISTS ${quoteIdent(tableName)};\n`)
    write(`CREATE TABLE ${quoteIdent(tableName)} (\n`)

    for (let index = 0; index < columns.length; index += 1) {
      const suffix = index === columns.length - 1 ? ',' : ','
      write(`  ${quoteIdent(columns[index])} TEXT${suffix}\n`)
    }
    write(`  "_source_row" INTEGER NOT NULL\n`)
    write(');\n\n')

    const rows = parsed.slice(1)
    const preparedRows = []

    for (let rowIndex = 0; rowIndex < rows.length; rowIndex += 1) {
      const row = Array.isArray(rows[rowIndex]) ? rows[rowIndex] : []
      const values = columns.map((_, colIndex) =>
        row[colIndex] === undefined ? null : row[colIndex]
      )

      const isCompletelyEmpty = values.every(
        (value) => value === null || String(value).length === 0
      )
      if (isCompletelyEmpty) continue

      preparedRows.push({
        values,
        sourceRow: rowIndex + 2,
      })
    }

    totalRows += preparedRows.length

    if (preparedRows.length > 0) {
      const insertColumns = [...columns, '_source_row']
      const insertColumnsSql = insertColumns.map(quoteIdent).join(', ')

      for (let offset = 0; offset < preparedRows.length; offset += BATCH_SIZE) {
        const batch = preparedRows.slice(offset, offset + BATCH_SIZE)
        write(`INSERT INTO ${quoteIdent(tableName)} (${insertColumnsSql}) VALUES\n`)

        for (let index = 0; index < batch.length; index += 1) {
          const row = batch[index]
          const rowValues = row.values.map(sqlValue)
          rowValues.push(String(row.sourceRow))
          const end = index === batch.length - 1 ? ';\n' : ',\n'
          write(`  (${rowValues.join(', ')})${end}`)
        }
      }
      write('\n')
    }
  }

  write('COMMIT;\n')

  await new Promise((resolve, reject) => {
    stream.on('finish', resolve)
    stream.on('error', reject)
    stream.end()
  })

  const stat = await fsp.stat(OUTPUT_FILE)
  console.log(`SQL gerado: ${OUTPUT_FILE}`)
  console.log(`Tamanho: ${stat.size} bytes`)
  console.log(`Total de linhas de dados: ${totalRows}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
