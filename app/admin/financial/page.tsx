'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Calendar } from 'lucide-react'

export default function FinancialPage() {
  const metrics = [
    {
      label: 'Receita Total (Mês)',
      value: 'R$ 8.950',
      change: '+12%',
      color: 'from-green-500 to-green-600',
    },
    {
      label: 'Total de Agendamentos',
      value: '45',
      change: '+8%',
      color: 'from-blue-500 to-blue-600',
    },
    {
      label: 'Serviços Realizados',
      value: '52',
      change: '+5%',
      color: 'from-purple-500 to-purple-600',
    },
    {
      label: 'Ticket Médio',
      value: 'R$ 172',
      change: '+3%',
      color: 'from-orange-500 to-orange-600',
    },
  ]

  const monthlyData = [
    { month: 'Jan', revenue: 7200, forecast: 7500 },
    { month: 'Fev', revenue: 8100, forecast: 8400 },
    { month: 'Mar', revenue: 8950, forecast: 9200 },
  ]

  const revenueByService = [
    { service: 'Sessão de Cura', revenue: 3600, percentage: 40 },
    { service: 'Consulta Espiritual', revenue: 2700, percentage: 30 },
    { service: 'Terapia Holística', revenue: 1800, percentage: 20 },
    { service: 'Outros', revenue: 850, percentage: 10 },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-foreground">Financeiro</h2>
        <p className="mt-1 text-muted-foreground">
          Análise de receita, despesas e projeções
        </p>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {metrics.map((metric, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="overflow-hidden rounded-lg bg-card p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="mt-2 text-3xl font-bold text-foreground">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm font-medium text-green-600">
                  {metric.change} vs. mês anterior
                </p>
              </div>
              <div className={`rounded-lg bg-gradient-to-br ${metric.color} p-3 text-white`}>
                <TrendingUp size={24} />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Section */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Monthly Revenue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-lg border border-border bg-card p-6"
        >
          <h3 className="font-bold text-foreground">Receita Mensal</h3>
          <p className="mt-1 text-sm text-muted-foreground">Últimos 3 meses</p>

          <div className="mt-6 space-y-6">
            {monthlyData.map((data, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-end justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {data.month}
                  </span>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">
                      R$ {data.revenue}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Previsão: R$ {data.forecast}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-primary to-accent"
                    style={{
                      width: `${(data.revenue / 9200) * 100}%`,
                    }}
                  />
                  <div
                    className="h-2 rounded-full bg-border"
                    style={{
                      width: `${(data.forecast / 9200) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Revenue by Service */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-lg border border-border bg-card p-6"
        >
          <h3 className="font-bold text-foreground">Receita por Serviço</h3>
          <p className="mt-1 text-sm text-muted-foreground">Distribuição de receita</p>

          <div className="mt-6 space-y-4">
            {revenueByService.map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {item.service}
                  </span>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">
                      R$ {item.revenue}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.percentage}%
                    </p>
                  </div>
                </div>
                <div className="mt-2 h-2 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Projection & Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="rounded-lg border border-border bg-gradient-to-r from-primary/10 to-accent/10 p-6"
      >
        <div className="flex items-start gap-4">
          <Calendar className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="font-bold text-foreground">Projeção Financeira</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Baseada na tendência atual e agendamentos confirmados
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {[
                { month: 'Próximo Mês', value: 'R$ 9.200' },
                { month: 'Próximos 3 Meses', value: 'R$ 27.600' },
                { month: 'Próximos 6 Meses', value: 'R$ 55.200' },
              ].map((proj, idx) => (
                <div key={idx} className="rounded-lg bg-card p-4">
                  <p className="text-sm text-muted-foreground">{proj.month}</p>
                  <p className="mt-1 text-2xl font-bold text-primary">
                    {proj.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
