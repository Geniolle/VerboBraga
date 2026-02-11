import Link from 'next/link'
import { requireChurchUser } from '@/lib/auth-server'
import { getUserAccess } from '@/lib/db'
import { getChurchTabsForUser } from '@/lib/church-permissions'

export default async function IgrejaPage() {
  const user = await requireChurchUser('/?openLogin=1')
  const access = await getUserAccess(user.uid, user.email ?? null)
  const tabs = await getChurchTabsForUser(user.email, access.isAdmin)

  const totalTabs = tabs.length
  const allowedTabs = tabs.filter((tab) => tab.canView)
  const blockedTabs = tabs.filter((tab) => !tab.canView)
  const connectedTabs = tabs.filter((tab) => tab.canView && tab.tableExists)
  const missingTables = tabs.filter((tab) => tab.canView && !tab.tableExists)

  return (
    <section className="py-6 md:py-8">
      <div className="container mx-auto space-y-8 px-4">
        <div className="rounded-lg border border-border bg-card p-6">
          <h1 className="text-3xl font-bold text-foreground">Painel Igreja</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Abas e permissões baseadas na tabela <code>igreja_bp_autority</code>.
          </p>

          <div className="mt-4 grid gap-4 md:grid-cols-4">
            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-xs text-muted-foreground">Total de abas</p>
              <p className="text-2xl font-bold">{totalTabs}</p>
            </div>
            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-xs text-muted-foreground">Abas permitidas</p>
              <p className="text-2xl font-bold">{allowedTabs.length}</p>
            </div>
            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-xs text-muted-foreground">Sem permissão</p>
              <p className="text-2xl font-bold">{blockedTabs.length}</p>
            </div>
            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-xs text-muted-foreground">Com tabela ligada</p>
              <p className="text-2xl font-bold">{connectedTabs.length}</p>
            </div>
          </div>
        </div>

        {missingTables.length > 0 && (
          <div className="rounded-lg border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">
              {missingTables.length} aba(s) permitida(s) ainda não encontrou tabela equivalente no
              Postgres. Se já existir no banco com outro nome, eu ajusto o mapeamento.
            </p>
          </div>
        )}

        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-semibold">Abas AppSheet</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            A visualização abaixo valida permissão por usuário usando <code>igreja_bp_autority</code>.
          </p>

          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {tabs.map((tab) => {
              const isClickable = tab.canView && tab.tableExists && tab.tableName
              const cardClass = tab.canView
                ? 'rounded-lg border border-border bg-background p-4'
                : 'rounded-lg border border-dashed border-border bg-muted/20 p-4 opacity-75'

              const content = (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold">{tab.title}</p>
                    <span
                      className={`rounded px-2 py-1 text-[10px] font-semibold ${
                        tab.canView ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {tab.canView ? 'Permitido' : 'Sem permissão'}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-muted-foreground">{tab.columnsInfo}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Tabela: {tab.tableName ?? 'não encontrada'}
                  </p>
                </>
              )

              if (!isClickable) {
                return (
                  <div key={tab.id} className={cardClass}>
                    {content}
                  </div>
                )
              }

              return (
                <Link
                  key={tab.id}
                  href={`/igreja/tabela/${encodeURIComponent(tab.tableName!)}`}
                  className={`${cardClass} transition hover:border-primary`}
                >
                  {content}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
