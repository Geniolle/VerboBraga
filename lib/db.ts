import 'server-only'

import { internalApiRequest } from '@/lib/internal-api'

export const db = null

export type ChurchAccessFlags = {
  isColaborador: boolean
  isMembresia: boolean
  canAccessChurch: boolean
}

export type ChurchAuthorityRow = Record<
  string,
  string | number | boolean | null | undefined
>

export type UserAccess = ChurchAccessFlags & {
  uid: string
  role: string
  isAdmin: boolean
}

export type CuraSubmissionPayload = {
  nome: string
  genero?: string | null
  nascimento?: string | null
  morada?: string | null
  telemovel: string
  religiao?: string | null
  frequenta_igreja?: string | null
  batismo_espirito?: string | null
  origem?: string | null
  enfermidade?: string | null
  cura: string
}

export type MusicRequestStatus = 'em_espera' | 'concluido'

export type MusicRequest = {
  id: number
  requested_by_uid: string
  requested_by_email: string | null
  musica: string
  versao: string | null
  url: string | null
  letra: string | null
  status: MusicRequestStatus
  completed_by_uid: string | null
  completed_by_email: string | null
  completed_at: string | null
  created_at: string
  updated_at: string
}

function emptyAccess(uid: string): UserAccess {
  return {
    uid,
    role: 'user',
    isAdmin: false,
    isColaborador: false,
    isMembresia: false,
    canAccessChurch: false,
  }
}

export async function ensureTables() {
  await internalApiRequest<{ ok: boolean }>('/v1/admin/ensure-tables', {
    method: 'POST',
  })
}

export async function getChurchAuthorityByEmail(
  email?: string | null
): Promise<ChurchAuthorityRow | null> {
  if (!email) return null

  const response = await internalApiRequest<{ authority: ChurchAuthorityRow | null }>(
    `/v1/church/authority?email=${encodeURIComponent(email)}`
  )

  return response.authority ?? null
}

export async function resolveChurchAccessByEmail(
  email?: string | null
): Promise<ChurchAccessFlags> {
  if (!email) {
    return {
      isColaborador: false,
      isMembresia: false,
      canAccessChurch: false,
    }
  }

  const response = await internalApiRequest<{ access: ChurchAccessFlags }>(
    `/v1/church/access-by-email?email=${encodeURIComponent(email)}`
  )

  return response.access
}

export async function getUserAccess(uid: string, email?: string | null): Promise<UserAccess> {
  if (!uid) {
    return emptyAccess(uid)
  }

  const response = await internalApiRequest<{ access: UserAccess }>('/v1/users/access', {
    method: 'POST',
    body: {
      uid,
      email: email ?? null,
    },
  })

  return response.access
}

export async function isUserAdmin(uid: string, email?: string | null) {
  const access = await getUserAccess(uid, email)
  return access.isAdmin
}

export async function upsertSessionUser(uid: string, email?: string | null) {
  await internalApiRequest<{ ok: boolean }>('/v1/users/upsert-session', {
    method: 'POST',
    body: {
      uid,
      email: email ?? null,
    },
  })
}

export async function listChurchDatabaseTables() {
  const response = await internalApiRequest<{ tableNames: string[] }>('/v1/church/database-tables')
  return response.tableNames
}

export async function createCuraSubmission(
  user: { uid: string; email?: string | null },
  payload: CuraSubmissionPayload
) {
  await internalApiRequest<{ ok: boolean }>('/v1/cura/submissions', {
    method: 'POST',
    body: {
      uid: user.uid,
      email: user.email ?? null,
      ...payload,
    },
  })
}

export async function listMusicRequests(limit = 100) {
  const query = new URLSearchParams({ limit: String(limit) })
  const response = await internalApiRequest<{ requests: MusicRequest[] }>(
    `/v1/music/requests?${query.toString()}`
  )

  return response.requests
}

export async function createMusicRequest(
  user: { uid: string; email?: string | null },
  payload: {
    musica: string
    versao?: string | null
    url?: string | null
    letra?: string | null
  }
) {
  const response = await internalApiRequest<{ request: MusicRequest | null }>(
    '/v1/music/requests',
    {
      method: 'POST',
      body: {
        uid: user.uid,
        email: user.email ?? null,
        musica: payload.musica,
        versao: payload.versao ?? null,
        url: payload.url ?? null,
        letra: payload.letra ?? null,
      },
    }
  )

  return response.request
}

export async function markMusicRequestAsCompleted(
  id: number,
  user: { uid: string; email?: string | null }
) {
  const response = await internalApiRequest<{ request: MusicRequest | null }>(
    `/v1/music/requests/${id}/status`,
    {
      method: 'PATCH',
      body: {
        uid: user.uid,
        email: user.email ?? null,
        status: 'concluido',
      },
    }
  )

  return response.request
}

export async function deletePendingMusicRequest(
  id: number,
  user: { uid: string; email?: string | null }
) {
  const response = await internalApiRequest<{ ok: boolean }>(
    `/v1/music/requests/${id}`,
    {
      method: 'DELETE',
      body: {
        uid: user.uid,
        email: user.email ?? null,
      },
    }
  )

  return response.ok
}
