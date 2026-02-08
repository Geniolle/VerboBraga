'use client'

/* Página - Departamentos */

import { motion } from 'framer-motion'
import { Calendar, Users, MessageCircle } from 'lucide-react'

export function ServicesSection() {
  const services = [
    {
      day: '@thiagotrindadelopes',
      time: 'Thiago Lopes',
      title: 'Vice Líder',
      icon: Calendar,
    },
    {
      day: '@jads.felipe',
      time: 'Jadson Felipe',
      title: 'Líder',
      icon: Users,
    },
    {
      day: '@rosa.e.cunha',
      time: 'Rosa Cunha',
      title: 'Líder',
      icon: MessageCircle,
    },
    {
      day: '@fmauricio10',
      time: 'Fernando Maurício',
      title: 'Líder',
      icon: Users,
    },
    {
      day: '@teresa_mauricio',
      time: 'Teresa Maurício',
      title: 'Líder',
      icon: MessageCircle,
    },
    {
      day: '@wiliamjosefilho',
      time: 'Wiliam José',
      title: 'Líder',
      icon: Users,
    },
    {
      day: '@goncalamartinsda',
      time: 'Gonçala Martins',
      title: 'Líder',
      icon: MessageCircle,
    },
    {
      day: '@thiagotrindadelopes',
      time: 'Thiago Lopes',
      title: 'Responsável Luz e Camera',
      icon: Calendar,
    },
    {
      day: '@ewerton7lima',
      time: 'Erton Lima',
      title: 'Responsável Edição e Foto',
      icon: Users,
    },
    {
      day: '@methevic',
      time: 'Victor Lopes',
      title: 'Responsável Som',
      icon: MessageCircle,
    },
    {
      day: '@caioflima17',
      time: 'Caio Lima',
      title: 'Líder',
      icon: Users,
    },
    {
      day: '@anaflima17',
      time: 'Ana Lima',
      title: 'Líder',
      icon: MessageCircle,
    },
    {
      day: '@wiliamjosefilho',
      time: 'Wiliam José',
      title: 'Líder Louvor',
      icon: Users,
    },
    {
      day: '@gislanefs',
      time: 'Gislane',
      title: 'Líder Verbo Café',
      icon: Users,
    },
    {
      day: '@patricialopes3121',
      time: 'Patrícia Lopes',
      title: 'Líder Departamento Infantil',
      icon: MessageCircle,
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
    <section id="services" className="w-full bg-background py-20 md:py-32">
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
            Departamento
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Encontre nossos departamentos e participe!
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-3"
        >
          {services.map((service, idx) => {
            const IconComponent = service.icon
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="group rounded-xl border border-border bg-card p-8 shadow-sm transition-all hover:border-accent hover:shadow-lg hover:shadow-accent/10"
              >
                {/* Icon */}
                <div className="mb-6 inline-flex rounded-lg bg-primary/10 p-3 text-primary transition-transform group-hover:scale-110">
                  <IconComponent size={24} />
                </div>

                {/* Time */}
                <div className="mb-4">
                  <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                    {service.day}
                  </p>
                  <p className="text-2xl font-bold text-primary">{service.time}</p>
                </div>

                {/* Content */}
                <h3 className="mb-2 text-xl font-bold text-foreground">
                  {service.title}
                </h3>

                {/* Bottom Line */}
                <div className="mt-6 h-1 w-0 bg-accent transition-all duration-300 group-hover:w-12" />
              </motion.div>
            )
          })}
        </motion.div>

        {/* Weekly Schedule Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 rounded-lg bg-secondary/50 p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-foreground">
            Calendário e Eventos
          </h3>
          <p className="mt-2 text-muted-foreground">
            Confira nosso calendário completo de atividades, retiros anuais e eventos especiais
          </p>
          <button className="mt-6 rounded-lg bg-primary px-6 py-2 font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/30">
            Ver Calendário
          </button>
        </motion.div>
      </div>
    </section>
  )
}