'use client'

/* Pagina Pricipal - Ínicio */

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import FloatingWhatsApp from '@/components/floating-whatsapp'
import { Heart, Users, CalendarDays, MapPin } from 'lucide-react'

export default function Home() {
  const quickLinks = [
    {
      title: 'Sobre Nós',
      description: 'Conheça a história da Igreja Verbo da Vida - Braga',
      href: '/about',
      icon: Heart,
    },
    {
      title: 'Departamentos',
      description: 'Confira nossos departamentos e Líderes',
      href: '/services',
      icon: Users,
    },
    {
      title: 'Eventos',
      description: 'Acompanhe os eventos e atividades da nossa igreja',
      href: '/events',
      icon: CalendarDays,
    },
    {
      title: 'Localização',
      description: 'Encontre-nos e entre em contato conosco',
      href: '/location',
      icon: MapPin,
    },
  ]

  return (
    <main className="w-full">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/5">
        <div className="container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-balance text-5xl font-bold tracking-tight text-foreground md:text-6xl">
              Verbo da Vida
              <span className="block text-primary">BRAGA</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground">
              Uma igreja em crescimento baseado na palavra de Deus, na palavra da Fé. Seja bem-vindo a família Verbo da Vida em Braga!
            </p>
          </motion.div>

          {/* Quick Links Grid */}
          <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((link, idx) => {
              const Icon = link.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
                >
                  <Link href={link.href}>
                    <div className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-accent hover:shadow-lg hover:shadow-accent/20">
                      <Icon className="mb-4 h-8 w-8 text-accent transition-transform group-hover:scale-110" />
                      <h3 className="font-semibold text-foreground">{link.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{link.description}</p>
                      <div className="mt-4 inline-block text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
                        Conhecer mais →
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 flex flex-col gap-4 text-center sm:flex-row sm:justify-center"
          >
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg"
            >
              Ver Agenda de Cultos
            </Link>
            <a
              href="https://wa.me/5585987654321"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-accent bg-transparent px-8 py-3 font-semibold text-accent transition-all hover:bg-accent/10"
            >
              Entrar em Contato
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </main>
  )
}
