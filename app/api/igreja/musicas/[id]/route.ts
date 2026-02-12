import { NextResponse } from 'next/server'
import { getServerUser } from '@/lib/auth-server'
import { deletePendingMusicRequest, getUserAccess } from '@/lib/db'
import { getChurchFeatureAccessForUser } from '@/lib/church-permissions'

export async function DELETE(
  _req: Request,
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

    if (!featureAccess.canDeletePendingMusic) {
      return NextResponse.json(
        {
          error:
            'Somente manager_louvor ou coordenador_louvor pode deletar em_espera',
        },
        { status: 403 }
      )
    }

    const { id: rawId } = await context.params
    const id = Number(rawId)
    if (!Number.isFinite(id) || id <= 0) {
      return NextResponse.json({ error: 'ID invalido' }, { status: 400 })
    }

    await deletePendingMusicRequest(id, {
      uid: user.uid,
      email: user.email ?? null,
    })

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch {
    return NextResponse.json(
      { error: 'Falha ao deletar pedido de musica' },
      { status: 502 }
    )
  }
}
