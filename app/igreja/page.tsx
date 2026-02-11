import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import FloatingWhatsApp from '@/components/floating-whatsapp'
import { requireChurchUser } from '@/lib/auth-server'
import { getChurchDashboardData } from '@/lib/church-db'

export default async function IgrejaPage() {
  await requireChurchUser('/?openLogin=1')
  const data = await getChurchDashboardData()

  const hasData = data.tables.length > 0

  return (
    <main className="w-full">
      <Header />

      <section className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-10">
        <div className="container mx-auto space-y-8 px-4">
          <div className="rounded-lg border border-border bg-card p-6">
            <h1 className="text-3xl font-bold text-foreground">Painel Igreja</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Área para colaboradores e membresia com os dados migrados do AppSheet.
            </p>

            <div className="mt-4 grid gap-4 md:grid-cols-4">
              <div className="rounded-lg border border-border bg-background p-4">
                <p className="text-xs text-muted-foreground">Tabelas migradas</p>
                <p className="text-2xl font-bold">{data.metrics.tableCount}</p>
              </div>
              <div className="rounded-lg border border-border bg-background p-4">
                <p className="text-xs text-muted-foreground">Linhas estimadas</p>
                <p className="text-2xl font-bold">{data.metrics.rowEstimate}</p>
              </div>
              <div className="rounded-lg border border-border bg-background p-4">
                <p className="text-xs text-muted-foreground">Média membresia</p>
                <p className="text-2xl font-bold">{data.metrics.mediaMembresia}</p>
              </div>
              <div className="rounded-lg border border-border bg-background p-4">
                <p className="text-xs text-muted-foreground">Média visitantes</p>
                <p className="text-2xl font-bold">{data.metrics.mediaVisitantes}</p>
              </div>
            </div>
          </div>

          {!hasData && (
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground">
                Ainda não existem tabelas `igreja_*` no Postgres. Rode `npm run db:import-igreja`
                para concluir a transição da base `appantigo/xls`.
              </p>
            </div>
          )}

          {hasData && (
            <>
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="text-xl font-semibold">Agenda de Departamentos</h2>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left text-muted-foreground">
                        <th className="px-2 py-2">Data</th>
                        <th className="px-2 py-2">Hora</th>
                        <th className="px-2 py-2">Título</th>
                        <th className="px-2 py-2">Organizador</th>
                        <th className="px-2 py-2">Local</th>
                        <th className="px-2 py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.agenda.map((item, index) => (
                        <tr key={`${item.titulo}-${index}`} className="border-b border-border/60">
                          <td className="px-2 py-2">{item.data || '-'}</td>
                          <td className="px-2 py-2">{item.hora || '-'}</td>
                          <td className="px-2 py-2">{item.titulo || '-'}</td>
                          <td className="px-2 py-2">{item.organizador || '-'}</td>
                          <td className="px-2 py-2">{item.local || '-'}</td>
                          <td className="px-2 py-2">{item.status || '-'}</td>
                        </tr>
                      ))}
                      {data.agenda.length === 0 && (
                        <tr>
                          <td className="px-2 py-3 text-muted-foreground" colSpan={6}>
                            Sem dados na agenda.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-lg border border-border bg-card p-6">
                  <h2 className="text-xl font-semibold">Recados</h2>
                  <div className="mt-4 space-y-3">
                    {data.recados.map((recado) => (
                      <div key={`${recado.id}-${recado.titulo}`} className="rounded-lg border border-border p-3">
                        <p className="text-xs text-muted-foreground">ID {recado.id || '-'}</p>
                        <p className="font-medium">{recado.titulo || '-'}</p>
                        <p className="text-sm text-muted-foreground">{recado.detalhes || '-'}</p>
                      </div>
                    ))}
                    {data.recados.length === 0 && (
                      <p className="text-sm text-muted-foreground">Sem recados cadastrados.</p>
                    )}
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-card p-6">
                  <h2 className="text-xl font-semibold">Ranking de Músicas</h2>
                  <div className="mt-4 space-y-2">
                    {data.musicas.map((musica) => (
                      <div
                        key={musica.musica}
                        className="flex items-center justify-between rounded-lg border border-border px-3 py-2"
                      >
                        <span className="text-sm">{musica.musica}</span>
                        <span className="text-sm font-semibold text-primary">{musica.repeticoes}</span>
                      </div>
                    ))}
                    {data.musicas.length === 0 && (
                      <p className="text-sm text-muted-foreground">Sem dados de músicas.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-lg border border-border bg-card p-6">
                  <h2 className="text-xl font-semibold">Takeaway</h2>
                  <div className="mt-4 space-y-3">
                    {data.takeway.map((item, index) => (
                      <div key={`${item.menu}-${index}`} className="rounded-lg border border-border p-3">
                        <p className="font-medium">{item.menu || '-'}</p>
                        <p className="text-sm text-muted-foreground">Data entrega: {item.dataEntrega || '-'}</p>
                        <p className="text-sm text-muted-foreground">Status: {item.status || '-'}</p>
                        <p className="text-sm text-muted-foreground">
                          Destaque: {item.destaque || '-'} {item.preco ? `(${item.preco})` : ''}
                        </p>
                      </div>
                    ))}
                    {data.takeway.length === 0 && (
                      <p className="text-sm text-muted-foreground">Sem dados de takeaway.</p>
                    )}
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-card p-6">
                  <h2 className="text-xl font-semibold">Frequência recente</h2>
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border text-left text-muted-foreground">
                          <th className="px-2 py-2">Data</th>
                          <th className="px-2 py-2">Tipo</th>
                          <th className="px-2 py-2">Membresia</th>
                          <th className="px-2 py-2">Visitantes</th>
                          <th className="px-2 py-2">Crianças</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.frequencia.map((item, index) => (
                          <tr key={`${item.data}-${index}`} className="border-b border-border/60">
                            <td className="px-2 py-2">{item.data || '-'}</td>
                            <td className="px-2 py-2">{item.tipo || '-'}</td>
                            <td className="px-2 py-2">{item.membresia || 0}</td>
                            <td className="px-2 py-2">{item.visitantes || 0}</td>
                            <td className="px-2 py-2">{item.criancas || 0}</td>
                          </tr>
                        ))}
                        {data.frequencia.length === 0 && (
                          <tr>
                            <td className="px-2 py-3 text-muted-foreground" colSpan={5}>
                              Sem dados de frequência.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="text-xl font-semibold">Explorador de Tabelas</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Abra cada tabela migrada para conferir os dados e validar a transição.
                </p>

                <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {data.tables.map((table) => (
                    <Link
                      key={table.tableName}
                      href={`/igreja/tabela/${table.tableName}`}
                      className="rounded-lg border border-border bg-background px-4 py-3 transition hover:border-primary"
                    >
                      <p className="text-sm font-medium">{table.tableName}</p>
                      <p className="text-xs text-muted-foreground">
                        ~ {table.rowEstimate} linhas
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </main>
  )
}
