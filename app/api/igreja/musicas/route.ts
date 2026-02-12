import { NextRequest, NextResponse } from 'next/server'
import { getServerUser } from '@/lib/auth-server'
import {
  createMusicRequest,
  getUserAccess,
  listMusicRequests,
} from '@/lib/db'
import { getChurchFeatureAccessForUser } from '@/lib/church-permissions'

async function resolveFeatureAccess() {
  const user = await getServerUser()
  if (!user) return null

  const access = await getUserAccess(user.uid, user.email ?? null)
  const featureAccess = await getChurchFeatureAccessForUser(
    user.email,
    access.isAdmin
  )

  return { user, access, featureAccess }
}

export async function GET() {
  try {
    const resolved = await resolveFeatureAccess()

    if (!resolved) {
      return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 })
    }

    if (!resolved.featureAccess.canAddMusic) {
      return NextResponse.json({ error: 'Sem permissao' }, { status: 403 })
    }

    const requests = await listMusicRequests(120)
    return NextResponse.json({ requests }, { status: 200 })
  } catch {
    return NextResponse.json(
      { error: 'Falha ao carregar pedidos de musica' },
      { status: 502 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const resolved = await resolveFeatureAccess()

    if (!resolved) {
      return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 })
    }

    if (!resolved.featureAccess.canAddMusic) {
      return NextResponse.json({ error: 'Sem permissao' }, { status: 403 })
    }

    const body = await req.json()

    if (!body.musica || String(body.musica).trim().length === 0) {
      return NextResponse.json({ error: 'Musica obrigatoria' }, { status: 400 })
    }

    const request = await createMusicRequest(
      { uid: resolved.user.uid, email: resolved.user.email ?? null },
      {
        musica: String(body.musica).trim(),
        versao: body.versao ? String(body.versao).trim() : null,
        url: body.url ? String(body.url).trim() : null,
        letra: body.letra ? String(body.letra).trim() : null,
      }
    )

    return NextResponse.json({ request }, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: 'Falha ao criar pedido de musica' },
      { status: 502 }
    )
  }
}
