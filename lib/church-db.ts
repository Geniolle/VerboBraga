import 'server-only'

import { internalApiRequest } from '@/lib/internal-api'

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

export async function listChurchTables(): Promise<ChurchTableInfo[]> {
  const response = await internalApiRequest<{ tables: ChurchTableInfo[] }>('/v1/church/tables')
  return response.tables
}

export async function getChurchDashboardData(): Promise<ChurchDashboardData> {
  const response = await internalApiRequest<{ dashboard: ChurchDashboardData }>(
    '/v1/church/dashboard'
  )
  return response.dashboard
}

export async function getChurchTablePreview(
  tableName: string,
  limit = 100
): Promise<ChurchTablePreview | null> {
  if (!tableName || tableName.length > 200) return null

  const query = new URLSearchParams({
    tableName,
    limit: String(limit),
  })

  try {
    const response = await internalApiRequest<{ preview: ChurchTablePreview }>(
      `/v1/church/table-preview?${query.toString()}`
    )

    return response.preview
  } catch {
    return null
  }
}
