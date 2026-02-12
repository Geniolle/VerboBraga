import { NextRequest, NextResponse } from 'next/server'
import { getServerUser } from '@/lib/auth-server'
import { getUserAccess, markMusicRequestAsCompleted } from '@/lib/db'
import { getChurchFeatureAccessForUser } from '@/lib/church-permissions'

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getServerUser()
    if (!user) {
      return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 })
    }

    const access = await getUserAccess(user.uid, user.email ?? null)
    const featureAccess = await getChurchFeatureAccessForUser(
      user.email,
      access.isAdmin
    )

    if (!featureAccess.canManageMusicMedia) {
      return NextResponse.json({ error: 'Somente a midia pode concluir' }, { status: 403 })
    }

    const { id: rawId } = await context.params
    const id = Number(rawId)
    if (!Number.isFinite(id) || id <= 0) {
      return NextResponse.json({ error: 'ID invalido' }, { status: 400 })
    }

    const body = await req.json()
    if (body?.status !== 'concluido') {
      return NextResponse.json({ error: 'Status invalido' }, { status: 400 })
    }

    const request = await markMusicRequestAsCompleted(id, {
      uid: user.uid,
      email: user.email ?? null,
    })

    if (!request) {
      return NextResponse.json({ error: 'Pedido nao encontrado' }, { status: 404 })
    }

    return NextResponse.json({ request }, { status: 200 })
  } catch {
    return NextResponse.json(
      { error: 'Falha ao atualizar status da musica' },
      { status: 502 }
    )
  }
}
