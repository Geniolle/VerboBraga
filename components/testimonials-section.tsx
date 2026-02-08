'use client'

/* Paágina -  */

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Ana Silva',
      role: 'Membro há 5 anos',
      content:
        'A Igreja Verbo da Vida mudou minha vida. Encontrei uma comunidade acolhedora que me apoiou durante os momentos mais difíceis.',
      rating: 5,
    },
    {
      name: 'Carlos Santos',
      role: 'Novo Membro',
      content:
        'Desde que cheguei aqui, sinto-me parte de uma grande família. O apoio espiritual e emocional é incomparável.',
      rating: 5,
    },
    {
      name: 'Marina Costa',
      role: 'Voluntária',
      content:
        'Ser voluntária nesta comunidade é uma honra. Vejo o impacto positivo que causamos todos os dias na vida das pessoas.',
      rating: 5,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="w-full bg-primary/5 py-20 md:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Histórias de Impacto
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Conheça as experiências transformadoras de nossos membros
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-3"
        >
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="rounded-xl border border-border bg-card p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-accent text-accent"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="mt-4 text-muted-foreground italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="mt-6 border-t border-border pt-4">
                <p className="font-semibold text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 rounded-xl bg-gradient-to-r from-primary to-accent p-8 text-center text-white md:p-12"
        >
          <h3 className="text-2xl font-bold md:text-3xl">
            Impacto na Comunidade
          </h3>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              { number: '500+', label: 'Membros Ativos' },
              { number: '150+', label: 'Cultos Exibidos' },
              { number: '1000+', label: 'Vidas Tocadas' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 + idx * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-4xl font-bold">{stat.number}</p>
                <p className="mt-2 text-white/80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
