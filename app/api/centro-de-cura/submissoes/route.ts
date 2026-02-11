import { NextRequest, NextResponse } from 'next/server'
import { getServerUser } from '@/lib/auth-server'
import { createCuraSubmission } from '@/lib/db'

export async function POST(req: NextRequest) {
  const user = await getServerUser()

  if (!user) {
    return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 })
  }

  const body = await req.json()

  if (!body.nome || !body.telemovel || !body.cura) {
    return NextResponse.json(
      { error: 'Campos obrigatorios faltando' },
      { status: 400 }
    )
  }

  try {
    await createCuraSubmission(
      { uid: user.uid, email: user.email ?? null },
      {
        nome: body.nome,
        genero: body.genero ?? null,
        nascimento: body.nascimento || null,
        morada: body.morada ?? null,
        telemovel: body.telemovel,
        religiao: body.religiao ?? null,
        frequenta_igreja: body.frequenta_igreja ?? null,
        batismo_espirito: body.batismo_espirito ?? null,
        origem: body.origem ?? null,
        enfermidade: body.enfermidade ?? null,
        cura: body.cura,
      }
    )
  } catch {
    return NextResponse.json(
      { error: 'Falha ao guardar submissao na API interna' },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true })
}
