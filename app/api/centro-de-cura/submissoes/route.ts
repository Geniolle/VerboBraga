import { NextRequest, NextResponse } from 'next/server'
import { getServerUser } from '@/lib/auth-server'
import { db, ensureTables } from '@/lib/db'

export async function POST(req: NextRequest) {
  const user = await getServerUser()

  if (!user) {
    return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 })
  }

  if (!db) {
    return NextResponse.json(
      { error: 'DATABASE_URL nao configurada' },
      { status: 500 }
    )
  }

  const body = await req.json()

  if (!body.nome || !body.telemovel || !body.cura) {
    return NextResponse.json(
      { error: 'Campos obrigatorios faltando' },
      { status: 400 }
    )
  }

  await ensureTables()

  await db.query(
    `INSERT INTO cura_submissions (
      uid, email, nome, genero, nascimento, morada, telemovel, religiao,
      frequenta_igreja, batismo_espirito, origem, enfermidade, descricao_cura
    ) VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13
    )`,
    [
      user.uid,
      user.email ?? null,
      body.nome,
      body.genero ?? null,
      body.nascimento || null,
      body.morada ?? null,
      body.telemovel,
      body.religiao ?? null,
      body.frequenta_igreja ?? null,
      body.batismo_espirito ?? null,
      body.origem ?? null,
      body.enfermidade ?? null,
      body.cura,
    ]
  )

  return NextResponse.json({ ok: true })
}
