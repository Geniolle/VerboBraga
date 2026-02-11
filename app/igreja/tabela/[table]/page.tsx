import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import FloatingWhatsApp from '@/components/floating-whatsapp'
import { requireChurchUser } from '@/lib/auth-server'
import { getChurchTablePreview } from '@/lib/church-db'

export default async function IgrejaTabelaPage({
  params,
}: {
  params: Promise<{ table: string }>
}) {
  await requireChurchUser('/?openLogin=1')
  const { table } = await params
  const preview = await getChurchTablePreview(table, 100)

  if (!preview) notFound()

  return (
    <main className="w-full">
      <Header />

      <section className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-10">
        <div className="container mx-auto space-y-6 px-4">
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold">{table}</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Visualizando as primeiras 100 linhas. Total de linhas: {preview.totalRows}
                </p>
              </div>
              <Link
                href="/igreja"
                className="inline-flex items-center justify-center rounded-lg border border-border px-4 py-2 text-sm font-medium hover:border-primary"
              >
                Voltar ao Painel Igreja
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs">
                <thead>
                  <tr className="border-b border-border bg-muted/30 text-left text-muted-foreground">
                    {preview.columns.map((column) => (
                      <th key={column} className="whitespace-nowrap px-2 py-2 font-medium">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {preview.rows.map((row, index) => (
                    <tr key={index} className="border-b border-border/50 align-top">
                      {preview.columns.map((column) => (
                        <td key={`${index}-${column}`} className="max-w-[280px] px-2 py-2">
                          <span className="line-clamp-3 break-words">{row[column] || '-'}</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                  {preview.rows.length === 0 && (
                    <tr>
                      <td className="px-2 py-3 text-muted-foreground" colSpan={preview.columns.length}>
                        Tabela sem linhas.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </main>
  )
}
