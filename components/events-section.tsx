'use client'

/* Página - Eventos */

import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin } from 'lucide-react'

export function EventsSection() {
  const upcomingEvents = [
    {
      date: 'Quarta-Feira',
      title: 'Culto de Ensino',
      time: '20:30',
      location: 'Praceta Beato Inácio de Azevedo 4',
      category: 'Culto',
      color: 'from-primary to-accent',
    },
    {
      date: 'Domingo',
      title: 'Culto da Família',
      time: '10:00',
      location: 'Praceta Beato Inácio de Azevedo 4 ',
      category: 'Culto',
      color: 'from-accent to-primary',
    },
    {
      date: 'Sábado',
      title: 'Jovens Ekbalo',
      time: '20:00',
      location: 'Praceta Beato Inácio de Azevedo 4 ',
      category: 'Jovens',
      color: 'from-accent to-primary',
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="events" className="w-full bg-background py-20 md:py-32">
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
            Eventos e Cultos
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Próximos encontros especiais e atividades da comunidade
          </p>
        </motion.div>

        {/* Calendar Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-8 flex gap-4 justify-center"
        >
          {['Semanal', 'Mensal', 'Anual'].map((view) => (
            <button
              key={view}
              className="rounded-lg border border-border bg-card px-4 py-2 font-medium transition-all hover:border-primary hover:bg-primary/5"
            >
              {view}
            </button>
          ))}
        </motion.div>

        {/* Events List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {upcomingEvents.map((event, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`group overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-accent hover:shadow-lg`}
            >
              <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center">
                {/* Left - Date & Category */}
                <div className={`flex-shrink-0 rounded-lg bg-gradient-to-br ${event.color} p-4 text-white`}>
                  <p className="text-sm font-semibold uppercase">{event.category}</p>
                  <p className="mt-2 text-lg font-bold">{event.date}</p>
                </div>

                {/* Center - Event Details */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground">
                    {event.title}
                  </h3>
                  <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:gap-6">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-accent" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-accent" />
                      {event.location}
                    </div>
                  </div>
                </div>

                {/* Right - CTA Button */}
                <button className="flex-shrink-0 rounded-lg bg-primary px-6 py-2 font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/30">
                  Saiba Mais
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* All Events CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <button className="inline-flex items-center gap-2 rounded-lg border border-primary bg-background px-8 py-3 font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground">
            <Calendar size={20} />
            Ver Todo o Calendário
          </button>
        </motion.div>
      </div>
    </section>
  )
}
