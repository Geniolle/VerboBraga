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
