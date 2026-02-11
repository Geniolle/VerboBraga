import { redirect } from 'next/navigation'
import { requireChurchUser } from '@/lib/auth-server'
import { getUserAccess } from '@/lib/db'
import { getChurchFeatureAccessForUser } from '@/lib/church-permissions'

export default async function IgrejaAdicionarMusicaPage() {
  const user = await requireChurchUser('/?openLogin=1')
  const access = await getUserAccess(user.uid, user.email ?? null)
  const featureAccess = await getChurchFeatureAccessForUser(user.email, access.isAdmin)

  if (!featureAccess.canAddMusic) {
    redirect('/igreja')
  }

  return (
    <section className="py-6 md:py-8">
      <div className="container mx-auto space-y-6 px-4">
        <div className="rounded-lg border border-border bg-card p-6">
          <h1 className="text-2xl font-bold text-foreground">Adicionar Música</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Acesso liberado por permissão de <code>USER_ALL</code>, <code>MANAGER_LOUVOR</code>{' '}
            ou <code>COORDENADOR_LOUVOR</code> na tabela <code>igreja_bp_autority</code>.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">
            Próximo passo: eu posso montar aqui o formulário completo de cadastro para gravar no
            Postgres (tabela de músicas) com validação e histórico.
          </p>
        </div>
      </div>
    </section>
  )
}
