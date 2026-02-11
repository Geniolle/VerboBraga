import React from 'react'
import Link from 'next/link'
import { Footer } from '@/components/footer'
import FloatingWhatsApp from '@/components/floating-whatsapp'
import { requireChurchUser } from '@/lib/auth-server'
import { getUserAccess } from '@/lib/db'
import { getChurchFeatureAccessForUser } from '@/lib/church-permissions'

export default async function IgrejaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await requireChurchUser('/?openLogin=1')
  const access = await getUserAccess(user.uid)
  const featureAccess = await getChurchFeatureAccessForUser(user.email, access.isAdmin)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="sticky top-0 z-50 border-b border-red-800 bg-red-700 text-white">
        <div className="container mx-auto flex flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center rounded-md border border-white/40 px-3 py-1.5 text-sm font-medium hover:bg-white/10"
            >
              ← Voltar
            </Link>
            <div>
              <p className="text-sm font-semibold">Igreja</p>
              <p className="text-xs text-white/80">{user.email ?? ''}</p>
            </div>
          </div>

          <nav className="flex items-center gap-2 overflow-x-auto">
            <Link
              href="/igreja"
              className="whitespace-nowrap rounded-md border border-white/30 px-3 py-1.5 text-sm font-medium hover:bg-white/10"
            >
              Painel
            </Link>

            {featureAccess.canAddMusic && (
              <Link
                href="/igreja/adicionar-musica"
                className="whitespace-nowrap rounded-md border border-white/30 px-3 py-1.5 text-sm font-medium hover:bg-white/10"
              >
                Adicionar Música
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
