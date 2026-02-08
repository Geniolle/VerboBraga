'use client'

import { motion } from 'framer-motion'
import { Search, Download, MoreHorizontal } from 'lucide-react'
import { useState } from 'react'

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const clients = [
    {
      id: 1,
      name: 'Ana Silva',
      email: 'ana@example.com',
      phone: '(11) 99999-1111',
      servicesUsed: 12,
      totalSpent: 'R$ 1.800',
      lastVisit: '08/02/2026',
      retention: 'Alta',
    },
    {
      id: 2,
      name: 'Carlos Santos',
      email: 'carlos@example.com',
      phone: '(11) 99999-2222',
      servicesUsed: 8,
      totalSpent: 'R$ 1.200',
      lastVisit: '05/02/2026',
      retention: 'Média',
    },
    {
      id: 3,
      name: 'Marina Costa',
      email: 'marina@example.com',
      phone: '(11) 99999-3333',
      servicesUsed: 15,
      totalSpent: 'R$ 2.100',
      lastVisit: '09/02/2026',
      retention: 'Alta',
    },
    {
      id: 4,
      name: 'Lucas Oliveira',
      email: 'lucas@example.com',
      phone: '(11) 99999-4444',
      servicesUsed: 3,
      totalSpent: 'R$ 450',
      lastVisit: '02/02/2026',
      retention: 'Baixa',
    },
  ]

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getRetentionColor = (retention: string) => {
    switch (retention) {
      case 'Alta':
        return 'text-green-600'
      case 'Média':
        return 'text-yellow-600'
      case 'Baixa':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-foreground">Clientes</h2>
        <p className="mt-1 text-muted-foreground">
          Visualize e gerencie informações de todos os clientes
        </p>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="relative flex-1 md:flex-initial md:w-64">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Buscar cliente..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-border bg-card py-2 pl-10 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground hover:shadow-lg">
          <Download size={18} />
          Exportar
        </button>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="overflow-hidden rounded-lg border border-border"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-6 py-4 text-left text-sm font-bold text-foreground">
                  Nome
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-foreground">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-foreground">
                  Telefone
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-foreground">
                  Serviços
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-foreground">
                  Total Gasto
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-foreground">
                  Última Visita
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-foreground">
                  Retenção
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-foreground">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredClients.map((client, idx) => (
                <motion.tr
                  key={client.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-secondary/50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-foreground">
                    {client.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {client.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {client.phone}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-primary">
                    {client.servicesUsed}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">
                    {client.totalSpent}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {client.lastVisit}
                  </td>
                  <td className={`px-6 py-4 text-sm font-medium ${getRetentionColor(client.retention)}`}>
                    {client.retention}
                  </td>
                  <td className="px-6 py-4">
                    <button className="rounded p-2 hover:bg-secondary">
                      <MoreHorizontal size={16} className="text-muted-foreground" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid gap-6 md:grid-cols-4"
      >
        {[
          { label: 'Total de Clientes', value: '48' },
          { label: 'Clientes Ativos (30d)', value: '32' },
          { label: 'Ticket Médio', value: 'R$ 156' },
          { label: 'Taxa de Retenção', value: '72%' },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + idx * 0.05 }}
            className="rounded-lg bg-card p-6 text-center"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-primary">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
