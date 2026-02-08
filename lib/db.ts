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
}

export async function isUserAdmin(uid: string) {
  if (!db) return false

  await ensureTables()
  const result = await db.query(
    'SELECT role FROM app_users WHERE uid = $1 LIMIT 1',
    [uid]
  )

  return result.rows[0]?.role === 'admin'
}
