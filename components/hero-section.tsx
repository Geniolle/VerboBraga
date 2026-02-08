'use client'

/* Página - Títulos */

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-primary/10 to-background pt-20">
      <div className="container mx-auto flex flex-col items-center justify-center gap-8 px-4 py-20 text-center md:gap-12 md:py-32">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold leading-tight text-foreground md:text-6xl lg:text-7xl">
            <span className="text-balance">
              Bem-vindo à
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Igreja Verbo da Vida
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl text-lg text-muted-foreground md:text-xl"
        >
          Uma comunidade espiritual acolhedora dedicada ao crescimento, cura e conexão com a fé
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <Link
            href="#services"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/30"
          >
            Nossos Serviços
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-lg border border-primary bg-background px-8 py-3 font-semibold text-primary transition-all hover:bg-primary/5"
          >
            Entre em Contato
          </Link>
        </motion.div>

        {/* Leadership Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 w-full"
        >
          <p className="mb-8 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Nossos Pastores e Lideranças
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: 'Pastora Principal',
                role: 'Fundadora e Pastora',
                image: '/pastor-1.jpg',
                bio: 'Visão e dedicação ao crescimento espiritual',
              },
              {
                name: 'Pastor Associado',
                role: 'Pastor Espiritual',
                image: '/pastor-2.jpg',
                bio: 'Guia espiritual e mentor comunitário',
              },
              {
                name: 'Coordenador',
                role: 'Coordenador de Ministérios',
                image: '/pastor-3.jpg',
                bio: 'Organização e desenvolvimento de ministérios',
              },
            ].map((leader, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 + idx * 0.1 }}
                className="group rounded-lg bg-card p-6 shadow-sm hover:shadow-lg transition-all overflow-hidden"
              >
                <div className="relative mb-4 h-40 w-full overflow-hidden rounded-md bg-muted">
                  <Image
                    src={leader.image || "/placeholder.svg"}
                    alt={leader.name}
                    fill
                    priority={idx === 0}
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <h3 className="font-semibold text-foreground">{leader.name}</h3>
                <p className="text-sm text-accent font-medium">{leader.role}</p>
                <p className="mt-2 text-xs text-muted-foreground italic">{leader.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-6 w-6 text-primary opacity-50" />
        </motion.div>
      </div>
    </section>
  )
}
