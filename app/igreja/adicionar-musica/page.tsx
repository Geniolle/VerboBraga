import { redirect } from 'next/navigation'
import { requireChurchUser } from '@/lib/auth-server'
import { getUserAccess, listMusicRequests } from '@/lib/db'
import { getChurchFeatureAccessForUser } from '@/lib/church-permissions'
import { MusicRequestsPanel } from '@/components/igreja/music-requests-panel'

export default async function IgrejaAdicionarMusicaPage() {
  const user = await requireChurchUser('/?openLogin=1')
  const access = await getUserAccess(user.uid, user.email ?? null)
  const featureAccess = await getChurchFeatureAccessForUser(user.email, access.isAdmin)

  if (!featureAccess.canAddMusic) {
    redirect('/igreja')
  }

  const requests = await listMusicRequests(120)

  return (
    <section className="py-6 md:py-8">
      <div className="container mx-auto space-y-6 px-4">
        <div className="rounded-lg border border-border bg-card p-6">
          <h1 className="text-2xl font-bold text-foreground">Adicionar Música</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Acesso liberado por permissão de <code>manager_louvor</code>,{' '}
            <code>coordenador_louvor</code> ou <code>colaborador_comunicacao</code> na tabela{' '}
            <code>igreja_bp_autority</code>. Novos pedidos entram com status{' '}
            <code>em_espera</code>.
          </p>
        </div>

        <MusicRequestsPanel
          initialRequests={requests}
          canManageMusicMedia={featureAccess.canManageMusicMedia}
          canDeletePendingMusic={featureAccess.canDeletePendingMusic}
        />
      </div>
    </section>
  )
}
