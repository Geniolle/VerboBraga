import { db } from '@/lib/db'

type TableCountRow = {
  table_name: string
  row_estimate: string | number
}

type GenericRow = Record<string, string | number | boolean | null>

export type ChurchTableInfo = {
  tableName: string
  rowEstimate: number
}

export type ChurchDashboardData = {
  tables: ChurchTableInfo[]
  agenda: Array<{
    data: string
    hora: string
    titulo: string
    organizador: string
    local: string
    status: string
  }>
  recados: Array<{
    id: string
    titulo: string
    detalhes: string
  }>
  musicas: Array<{
    musica: string
    repeticoes: number
  }>
  takeway: Array<{
    menu: string
    dataEntrega: string
    status: string
    destaque: string
    preco: string
  }>
  frequencia: Array<{
    data: string
    tipo: string
    membresia: number
    visitantes: number
    criancas: number
  }>
  metrics: {
    tableCount: number
    rowEstimate: number
    mediaMembresia: number
    mediaVisitantes: number
    mediaCriancas: number
  }
}

export type ChurchTablePreview = {
  columns: string[]
  rows: Array<Record<string, string>>
  totalRows: number
}

function quoteIdent(identifier: string) {
  return `"${identifier.replace(/"/g, '""')}"`
}

function parseNumeric(value: string | number | null | undefined) {
  if (value === null || value === undefined) return 0
  const normalized = String(value).trim().replace(',', '.')
  const number = Number(normalized)
  return Number.isFinite(number) ? number : 0
}

function getValue(row: GenericRow, keys: string[]) {
  for (const key of keys) {
    const value = row[key]
    if (value === null || value === undefined) continue
    const asString = String(value).trim()
    if (asString.length > 0) return asString
  }
  return ''
}

async function tableExists(tableName: string) {
  if (!db) return false
  const result = await db.query(
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

async function listTableColumns(tableName: string) {
  if (!db) return []
  const result = await db.query<{ column_name: string }>(
    `
      SELECT column_name
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = $1
      ORDER BY ordinal_position
    `,
    [tableName]
  )
  return result.rows.map((row: { column_name: string }) => row.column_name)
}

async function loadRows(tableName: string, limit: number): Promise<GenericRow[]> {
  if (!db || limit <= 0) return []
  const columns = await listTableColumns(tableName)
  if (columns.length === 0) return []

  const hasSourceRow = columns.includes('_source_row')
  const sql = hasSourceRow
    ? `SELECT * FROM ${quoteIdent(tableName)} ORDER BY _source_row DESC NULLS LAST LIMIT $1`
    : `SELECT * FROM ${quoteIdent(tableName)} LIMIT $1`
  const result = await db.query<GenericRow>(sql, [limit])
  return result.rows
}

export async function listChurchTables(): Promise<ChurchTableInfo[]> {
  if (!db) return []

  const result = await db.query<TableCountRow>(
    `
      SELECT
        c.relname AS table_name,
        COALESCE(s.n_live_tup::bigint, 0) AS row_estimate
      FROM pg_class c
      INNER JOIN pg_namespace n ON n.oid = c.relnamespace
      LEFT JOIN pg_stat_user_tables s ON s.relid = c.oid
      WHERE n.nspname = 'public'
        AND c.relkind = 'r'
        AND c.relname LIKE 'igreja_%'
      ORDER BY c.relname
    `
  )

  return result.rows.map((row: TableCountRow) => ({
    tableName: row.table_name,
    rowEstimate: Number(row.row_estimate || 0),
  }))
}

export async function getChurchDashboardData(): Promise<ChurchDashboardData> {
  const tables = await listChurchTables()
  const empty: ChurchDashboardData = {
    tables,
    agenda: [],
    recados: [],
    musicas: [],
    takeway: [],
    frequencia: [],
    metrics: {
      tableCount: tables.length,
      rowEstimate: tables.reduce((acc, table) => acc + table.rowEstimate, 0),
      mediaMembresia: 0,
      mediaVisitantes: 0,
      mediaCriancas: 0,
    },
  }

  if (!db) return empty

  const [hasAgenda, hasRecados, hasMusicas, hasTakeway, hasFrequencia] = await Promise.all([
    tableExists('igreja_appagendadepartamentos'),
    tableExists('igreja_recados'),
    tableExists('igreja_report_musicas'),
    tableExists('igreja_takeway'),
    tableExists('igreja_appfrequenciamembresia'),
  ])

  const [agendaRows, recadoRows, musicaRows, takewayRows, frequenciaRows] = await Promise.all([
    hasAgenda ? loadRows('igreja_appagendadepartamentos', 10) : Promise.resolve([]),
    hasRecados ? loadRows('igreja_recados', 10) : Promise.resolve([]),
    hasMusicas ? loadRows('igreja_report_musicas', 80) : Promise.resolve([]),
    hasTakeway ? loadRows('igreja_takeway', 5) : Promise.resolve([]),
    hasFrequencia ? loadRows('igreja_appfrequenciamembresia', 52) : Promise.resolve([]),
  ])

  const agenda = agendaRows.map((row) => ({
    data: getValue(row, ['data_do_agendamento']),
    hora: getValue(row, ['hora_de_inicio']),
    titulo: getValue(row, ['titulo_da_agenda']),
    organizador: getValue(row, ['organizador']),
    local: getValue(row, ['localizacao']),
    status: getValue(row, ['status']),
  }))

  const recados = recadoRows.map((row) => ({
    id: getValue(row, ['id']),
    titulo: getValue(row, ['titulo']),
    detalhes: getValue(row, ['detalhes']),
  }))

  const musicas = musicaRows
    .map((row) => ({
      musica: getValue(row, ['musicas']),
      repeticoes: parseNumeric(getValue(row, ['repeticoes'])),
    }))
    .filter((item) => item.musica)
    .sort((a, b) => b.repeticoes - a.repeticoes)
    .slice(0, 10)

  const takeway = takewayRows.map((row) => ({
    menu: getValue(row, ['menu']),
    dataEntrega: getValue(row, ['data_da_entrega']),
    status: getValue(row, ['status']),
    destaque: getValue(row, ['takeway1']),
    preco: getValue(row, ['preco1']),
  }))

  const frequencia = frequenciaRows
    .map((row) => ({
      data: getValue(row, ['data']),
      tipo: getValue(row, ['tipo']),
      membresia: parseNumeric(getValue(row, ['membresia'])),
      visitantes: parseNumeric(getValue(row, ['visitantes'])),
      criancas: parseNumeric(getValue(row, ['criancas'])),
    }))
    .filter((row) => row.data || row.tipo)

  const totalFrequenciaRows = frequencia.length || 1
  const mediaMembresia = frequencia.reduce((acc, row) => acc + row.membresia, 0) / totalFrequenciaRows
  const mediaVisitantes = frequencia.reduce((acc, row) => acc + row.visitantes, 0) / totalFrequenciaRows
  const mediaCriancas = frequencia.reduce((acc, row) => acc + row.criancas, 0) / totalFrequenciaRows

  return {
    tables,
    agenda,
    recados,
    musicas,
    takeway,
    frequencia: frequencia.slice(0, 12),
    metrics: {
      tableCount: tables.length,
      rowEstimate: tables.reduce((acc, table) => acc + table.rowEstimate, 0),
      mediaMembresia: Number(mediaMembresia.toFixed(1)),
      mediaVisitantes: Number(mediaVisitantes.toFixed(1)),
      mediaCriancas: Number(mediaCriancas.toFixed(1)),
    },
  }
}

export async function getChurchTablePreview(
  tableName: string,
  limit = 100
): Promise<ChurchTablePreview | null> {
  if (!db) return null
  if (!/^[a-z0-9_]+$/.test(tableName) || !tableName.startsWith('igreja_')) return null
  const exists = await tableExists(tableName)
  if (!exists) return null

  const columns = await listTableColumns(tableName)
  if (columns.length === 0) return null

  const hasSourceRow = columns.includes('_source_row')
  const query = hasSourceRow
    ? `SELECT * FROM ${quoteIdent(tableName)} ORDER BY _source_row DESC NULLS LAST LIMIT $1`
    : `SELECT * FROM ${quoteIdent(tableName)} LIMIT $1`

  const [rowsResult, countResult] = await Promise.all([
    db.query<GenericRow>(query, [limit]),
    db.query<{ total: string }>(
      `SELECT COUNT(*)::bigint AS total FROM ${quoteIdent(tableName)}`
    ),
  ])

  return {
    columns,
    rows: rowsResult.rows.map((row: GenericRow) =>
      Object.fromEntries(
        columns.map((column: string) => [
          column,
          row[column] === null || row[column] === undefined ? '' : String(row[column]),
        ])
      )
    ),
    totalRows: Number(countResult.rows[0]?.total ?? 0),
  }
}
