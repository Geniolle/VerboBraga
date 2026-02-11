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

export type UserAccess = ChurchAccessFlags & {
  uid: string
  role: string
  isAdmin: boolean
}

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

export async function resolveChurchAccessByEmail(
  email?: string | null
): Promise<ChurchAccessFlags> {
  if (!db || !email) {
    return {
      isColaborador: false,
      isMembresia: false,
      canAccessChurch: false,
    }
  }

  await ensureTables()
  const result = await db.query(
    `
      SELECT is_colaborador, is_membresia
      FROM igreja_access_index
      WHERE LOWER(email) = LOWER($1)
      LIMIT 1
    `,
    [email.trim()]
  )

  const row = result.rows[0]
  const isColaborador = Boolean(row?.is_colaborador)
  const isMembresia = Boolean(row?.is_membresia)

  return {
    isColaborador,
    isMembresia,
    canAccessChurch: isColaborador || isMembresia,
  }
}

export async function getUserAccess(uid: string): Promise<UserAccess> {
  if (!db) {
    return accessFromRow(uid, null)
  }

  await ensureTables()
  const result = await db.query(
    `
      SELECT role, is_colaborador, is_membresia
      FROM app_users
      WHERE uid = $1
      LIMIT 1
    `,
    [uid]
  )

  return accessFromRow(uid, result.rows[0] ?? null)
}

export async function isUserAdmin(uid: string) {
  const access = await getUserAccess(uid)
  return access.isAdmin
}
