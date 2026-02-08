'use client'

import { motion } from 'framer-motion'
import { Search, Filter, MoreHorizontal, Check, X } from 'lucide-react'
import { useState } from 'react'

export default function AppointmentsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const appointments = [
    {
      id: 1,
      date: '10/02/2026',
      time: '09:00',
      client: 'Ana Silva',
      email: 'ana@example.com',
      phone: '(11) 99999-1111',
      service: 'Sessão de Cura',
      duration: '1h',
      status: 'confirmed',
      value: 'R$ 150',
    },
    {
      id: 2,
      date: '10/02/2026',
      time: '10:30',
      client: 'Carlos Santos',
      email: 'carlos@example.com',
      phone: '(11) 99999-2222',
      service: 'Consulta Espiritual',
      duration: '45 min',
      status: 'pending',
      value: 'R$ 100',
    },
    {
      id: 3,
      date: '11/02/2026',
      time: '14:00',
      client: 'Marina Costa',
      email: 'marina@example.com',
      phone: '(11) 99999-3333',
      service: 'Terapia Holística',
      duration: '1.5h',
      status: 'confirmed',
      value: 'R$ 200',
    },
    {
      id: 4,
      date: '12/02/2026',
      time: '11:30',
      client: 'Lucas Oliveira',
      email: 'lucas@example.com',
      phone: '(11) 99999-4444',
      service: 'Sessão de Cura',
      duration: '1h',
      status: 'cancelled',
      value: 'R$ 150',
    },
  ]

  const filteredAppointments = appointments.filter((apt) =>
    apt.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    apt.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'cancelled':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      confirmed: 'Confirmado',
      pending: 'Pendente',
      cancelled: 'Cancelado',
    }
    return labels[status] || status
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-foreground">Agendamentos</h2>
        <p className="mt-1 text-muted-foreground">
          Gerencie todos os agendamentos de clientes
        </p>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex gap-4 flex-1">
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
          <button className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 hover:bg-secondary">
            <Filter size={18} />
            Filtrar
          </button>
        </div>
        <button className="rounded-lg bg-primary px-6 py-2 font-semibold text-primary-foreground hover:shadow-lg">
          + Novo Agendamento
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
                  Cliente
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-foreground">
                  Data/Hora
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-foreground">
                  Serviço
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-foreground">
                  Valor
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-foreground">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-foreground">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredAppointments.map((apt, idx) => (
                <motion.tr
                  key={apt.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-secondary/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-foreground">{apt.client}</p>
                      <p className="text-xs text-muted-foreground">{apt.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {apt.date} às {apt.time}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {apt.service}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">
                    {apt.value}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(apt.status)}`}
                    >
                      {getStatusLabel(apt.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {apt.status === 'pending' && (
                        <>
                          <button
                            className="rounded p-2 hover:bg-green-100 text-green-600"
                            title="Confirmar"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            className="rounded p-2 hover:bg-red-100 text-red-600"
                            title="Rejeitar"
                          >
                            <X size={16} />
                          </button>
                        </>
                      )}
                      <button className="rounded p-2 hover:bg-secondary">
                        <MoreHorizontal size={16} className="text-muted-foreground" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Pagination */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-between text-sm text-muted-foreground"
      >
        <p>Mostrando {filteredAppointments.length} de {appointments.length} agendamentos</p>
        <div className="flex gap-2">
          <button className="rounded-lg border border-border px-3 py-2 hover:bg-secondary">
            Anterior
          </button>
          <button className="rounded-lg border border-border px-3 py-2 hover:bg-secondary">
            1
          </button>
          <button className="rounded-lg border border-border px-3 py-2 hover:bg-secondary">
            Próximo
          </button>
        </div>
      </motion.div>
    </div>
  )
}
