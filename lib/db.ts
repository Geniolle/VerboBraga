import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL

export const db =
  connectionString
    ? new Pool({
        connectionString,
        ssl:
          process.env.NODE_ENV === 'production'
            ? { rejectUnauthorized: false }
            : undefined,
      })
    : null

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

const AUTHORITY_GLOBAL_COLUMNS = [
  'user_all',
  'geral_departamentos',
  'departamentos_manager',
  'departamentos_coordenador',
  'departamentos_pastoreio',
]

const AUTHORITY_PERMISSION_PREFIXES = ['manager_', 'coordenador_', 'colaborador_']

export async function ensureTables() {
  if (!db) return

  await db.query(`
    CREATE TABLE IF NOT EXISTS app_users (
      uid TEXT PRIMARY KEY,
      email TEXT,
      role TEXT NOT NULL DEFAULT 'user',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `)

  await db.query(`
    ALTER TABLE app_users
    ADD COLUMN IF NOT EXISTS is_colaborador BOOLEAN NOT NULL DEFAULT FALSE;
  `)

  await db.query(`
    ALTER TABLE app_users
    ADD COLUMN IF NOT EXISTS is_membresia BOOLEAN NOT NULL DEFAULT FALSE;
  `)

  await db.query(`
    CREATE TABLE IF NOT EXISTS cura_submissions (
      id BIGSERIAL PRIMARY KEY,
      uid TEXT NOT NULL,
      email TEXT,
      nome TEXT NOT NULL,
      genero TEXT,
      nascimento DATE,
      morada TEXT,
      telemovel TEXT NOT NULL,
      religiao TEXT,
      frequenta_igreja TEXT,
      batismo_espirito TEXT,
      origem TEXT,
      enfermidade TEXT,
      descricao_cura TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `)

  await db.query(`
    CREATE TABLE IF NOT EXISTS igreja_access_index (
      email TEXT PRIMARY KEY,
      is_colaborador BOOLEAN NOT NULL DEFAULT FALSE,
      is_membresia BOOLEAN NOT NULL DEFAULT FALSE,
      source TEXT[] NOT NULL DEFAULT '{}',
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `)

  await db.query(`
    CREATE INDEX IF NOT EXISTS igreja_access_index_email_idx
    ON igreja_access_index ((LOWER(email)));
  `)
}

function accessFromRow(
  uid: string,
  row: {
    role?: string | null
    email?: string | null
    is_colaborador?: boolean | null
    is_membresia?: boolean | null
  } | null
): UserAccess {
  const role = (row?.role ?? 'user').toLowerCase()
  const isAdmin = role === 'admin'
  const roleIsColaborador = role === 'colaborador'
  const roleIsMembresia = role === 'membresia'

  const isColaborador = Boolean(row?.is_colaborador) || roleIsColaborador || isAdmin
  const isMembresia =
    Boolean(row?.is_membresia) || roleIsMembresia || roleIsColaborador || isAdmin
  const canAccessChurch = isAdmin || isColaborador || isMembresia

  return {
    uid,
    role,
    isAdmin,
    isColaborador,
    isMembresia,
    canAccessChurch,
  }
}

function isTruthyValue(value: string | number | boolean | null | undefined) {
  if (value === null || value === undefined) return false
  if (typeof value === 'boolean') return value
  if (typeof value === 'number') return value !== 0

  const normalized = String(value).trim().toLowerCase()
  if (!normalized) return false

  return ['true', '1', 'yes', 'sim', 'x'].includes(normalized)
}

function hasAnyAuthorityValue(row: ChurchAuthorityRow, keys: string[]) {
  return keys.some((key) => isTruthyValue(row[key]))
}

function hasAnyAuthorityPermission(row: ChurchAuthorityRow) {
  return Object.entries(row).some(([key, value]) => {
    if (!AUTHORITY_PERMISSION_PREFIXES.some((prefix) => key.startsWith(prefix))) {
      return false
    }
    return isTruthyValue(value)
  })
}

async function tableExists(tableName: string) {
  if (!db) return false
  const result = await db.query<{ ok: boolean }>(
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

export async function getChurchAuthorityByEmail(
  email?: string | null
): Promise<ChurchAuthorityRow | null> {
  if (!db || !email) return null

  await ensureTables()
  const exists = await tableExists('igreja_bp_autority')
  if (!exists) return null

  const normalizedEmail = email.trim()
  const queries = [
    `
      SELECT *
      FROM igreja_bp_autority
      WHERE LOWER(COALESCE(email, useremail, '')) = LOWER($1)
      ORDER BY _source_row DESC NULLS LAST
      LIMIT 1
    `,
    `
      SELECT *
      FROM igreja_bp_autority
      WHERE LOWER(email) = LOWER($1)
      ORDER BY _source_row DESC NULLS LAST
      LIMIT 1
    `,
    `
      SELECT *
      FROM igreja_bp_autority
      WHERE LOWER(useremail) = LOWER($1)
      ORDER BY _source_row DESC NULLS LAST
      LIMIT 1
    `,
  ]

  for (const queryText of queries) {
    try {
      const result = await db.query<ChurchAuthorityRow>(queryText, [normalizedEmail])
      if (result.rows[0]) return result.rows[0]
    } catch {
      continue
    }
  }

  return null
}

export async function resolveChurchAccessByEmail(
  email?: string | null
): Promise<ChurchAccessFlags> {
  const authorityRow = await getChurchAuthorityByEmail(email)

  if (!authorityRow) {
    return {
      isColaborador: false,
      isMembresia: false,
      canAccessChurch: false,
    }
  }

  const isColaborador =
    hasAnyAuthorityValue(authorityRow, AUTHORITY_GLOBAL_COLUMNS) ||
    hasAnyAuthorityPermission(authorityRow)
  const isMembresia = true

  return {
    isColaborador,
    isMembresia,
    canAccessChurch: true,
  }
}

export async function getUserAccess(uid: string): Promise<UserAccess> {
  if (!db) {
    return accessFromRow(uid, null)
  }

  await ensureTables()
  const result = await db.query(
    `
      SELECT role, email, is_colaborador, is_membresia
      FROM app_users
      WHERE uid = $1
      LIMIT 1
    `,
    [uid]
  )

  const row = result.rows[0] ?? null
  const baseAccess = accessFromRow(uid, row)
  const authorityAccess = await resolveChurchAccessByEmail(row?.email ?? null)

  // Igreja access should follow BP AUTORITY as the source of truth (except admins).
  const isColaborador = baseAccess.isAdmin || authorityAccess.isColaborador
  const isMembresia = baseAccess.isAdmin || authorityAccess.isMembresia
  const canAccessChurch = baseAccess.isAdmin || authorityAccess.canAccessChurch

  return {
    ...baseAccess,
    isColaborador,
    isMembresia,
    canAccessChurch,
  }
}

export async function isUserAdmin(uid: string) {
  const access = await getUserAccess(uid)
  return access.isAdmin
}
