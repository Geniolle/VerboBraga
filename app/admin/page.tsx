'use client'

import { motion } from 'framer-motion'
import { Calendar, Users, DollarSign, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function AdminDashboard() {
  const [viewType, setViewType] = useState<'weekly' | 'monthly' | 'daily'>('weekly')

  const stats = [
    {
      label: 'Agendamentos Esta Semana',
      value: '12',
      icon: Calendar,
      color: 'from-primary to-accent',
    },
    {
      label: 'Clientes Ativos',
      value: '48',
      icon: Users,
      color: 'from-accent to-primary',
    },
    {
      label: 'Receita Este Mês',
      value: 'R$ 2.450',
      icon: DollarSign,
      color: 'from-primary/60 to-accent/60',
    },
    {
      label: 'Próximo Agendamento',
      value: '14:30',
      icon: Clock,
      color: 'from-accent/60 to-primary/60',
    },
  ]

  const weeklySchedule = [
    {
      day: 'Segunda',
      date: '10 de Fevereiro',
      appointments: [
        { time: '09:00', client: 'Ana Silva', service: 'Sessão de Cura', status: 'confirmed' },
        { time: '10:30', client: 'Carlos Santos', service: 'Consulta Espiritual', status: 'confirmed' },
        { time: '14:00', client: 'Marina Costa', service: 'Terapia Holística', status: 'pending' },
      ],
    },
    {
      day: 'Terça',
      date: '11 de Fevereiro',
      appointments: [
        { time: '09:00', client: 'João Silva', service: 'Sessão de Cura', status: 'confirmed' },
        { time: '15:00', client: 'Pedro Costa', service: 'Consulta Espiritual', status: 'confirmed' },
      ],
    },
    {
      day: 'Quarta',
      date: '12 de Fevereiro',
      appointments: [
        { time: '10:00', client: 'Rosa Santos', service: 'Terapia Holística', status: 'confirmed' },
        { time: '11:30', client: 'Lucas Oliveira', service: 'Sessão de Cura', status: 'pending' },
        { time: '14:30', client: 'Juliana Costa', service: 'Consulta Espiritual', status: 'confirmed' },
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <div className="space-y-8">
      {/* Header with View Controls */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold text-foreground">Agendamentos</h2>
          <p className="mt-1 text-muted-foreground">Gerencie todos os agendamentos e atividades</p>
        </div>
        <div className="flex gap-2">
          {(['daily', 'weekly', 'monthly'] as const).map((view) => (
            <button
              key={view}
              onClick={() => setViewType(view)}
              className={`rounded-lg px-4 py-2 font-medium transition-all ${
                viewType === view
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border bg-background hover:border-primary'
              }`}
            >
              {view === 'daily' ? 'Diário' : view === 'weekly' ? 'Semanal' : 'Mensal'}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="overflow-hidden rounded-lg bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="mt-2 text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className={`rounded-lg bg-gradient-to-br ${stat.color} p-3 text-white`}>
                  <Icon size={24} />
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Schedule View */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border border-border bg-card"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-2">
            <button className="rounded-lg p-2 hover:bg-secondary">
              <ChevronLeft size={20} />
            </button>
            <h3 className="text-lg font-bold text-foreground">
              Semana de 10 a 16 de Fevereiro
            </h3>
            <button className="rounded-lg p-2 hover:bg-secondary">
              <ChevronRight size={20} />
            </button>
          </div>
          <button className="rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground hover:shadow-lg">
            + Novo Agendamento
          </button>
        </div>

        {/* Schedule Content */}
        <div className="divide-y divide-border">
          {weeklySchedule.map((daySchedule, dayIdx) => (
            <motion.div
              key={dayIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: dayIdx * 0.1 }}
              className="p-6"
            >
              <h4 className="font-bold text-foreground">
                {daySchedule.day} • {daySchedule.date}
              </h4>

              <div className="mt-4 space-y-3">
                {daySchedule.appointments.map((apt, aptIdx) => (
                  <motion.div
                    key={aptIdx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: dayIdx * 0.1 + aptIdx * 0.05 }}
                    className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4 hover:border-accent"
                  >
                    <div className="flex gap-4 flex-1">
                      <div className="text-sm font-bold text-primary w-12">{apt.time}</div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{apt.client}</p>
                        <p className="text-xs text-muted-foreground">{apt.service}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          apt.status === 'confirmed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {apt.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                      </span>
                      <button className="rounded-lg p-2 hover:bg-secondary">
                        ⋮
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid gap-6 md:grid-cols-2"
      >
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-bold text-foreground">Clientes em Espera</h3>
          <p className="mt-2 text-sm text-muted-foreground">5 clientes aguardando confirmação</p>
          <button className="mt-4 rounded-lg border border-primary text-primary hover:bg-primary/5 w-full py-2 font-medium">
            Revisar Pendências
          </button>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-bold text-foreground">Próximos Eventos</h3>
          <p className="mt-2 text-sm text-muted-foreground">3 eventos programados para este mês</p>
          <button className="mt-4 rounded-lg bg-primary text-primary-foreground hover:shadow-lg w-full py-2 font-medium">
            Ver Calendário
          </button>
        </div>
      </motion.div>
    </div>
  )
}
