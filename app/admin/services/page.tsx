'use client'

import { motion } from 'framer-motion'
import { Edit, Trash2, Plus, Clock, DollarSign } from 'lucide-react'
import { useState } from 'react'

export default function ServicesPage() {
  const [showModal, setShowModal] = useState(false)

  const services = [
    {
      id: 1,
      name: 'Sessão de Cura',
      description: 'Tratamento espiritual para cura emocional e física',
      price: 150,
      duration: 60,
      active: true,
    },
    {
      id: 2,
      name: 'Consulta Espiritual',
      description: 'Orientação e aconselhamento espiritual personalizado',
      price: 100,
      duration: 45,
      active: true,
    },
    {
      id: 3,
      name: 'Terapia Holística',
      description: 'Tratamento integrado de corpo, mente e espírito',
      price: 200,
      duration: 90,
      active: true,
    },
    {
      id: 4,
      name: 'Retiro Espiritual',
      description: 'Programa intensivo de desenvolvimento espiritual',
      price: 800,
      duration: 480,
      active: false,
    },
  ]

  const combos = [
    {
      id: 1,
      name: 'Pacote Básico (3 sessões)',
      services: ['Sessão de Cura', 'Consulta Espiritual'],
      regularPrice: 450,
      comboPrice: 350,
      discount: 22,
    },
    {
      id: 2,
      name: 'Pacote Premium (6 sessões)',
      services: ['Sessão de Cura', 'Consulta Espiritual', 'Terapia Holística'],
      regularPrice: 1050,
      comboPrice: 750,
      discount: 29,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-foreground">Serviços</h2>
        <p className="mt-1 text-muted-foreground">
          Gerencie serviços, preços, durações e combos
        </p>
      </motion.div>

      {/* Individual Services */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-bold text-foreground">Serviços Individuais</h3>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground hover:shadow-lg"
          >
            <Plus size={18} />
            Novo Serviço
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`rounded-lg border ${
                service.active ? 'border-border' : 'border-border/50 opacity-60'
              } bg-card p-6`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-foreground">{service.name}</h4>
                    {!service.active && (
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        Inativo
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {service.description}
                  </p>

                  <div className="mt-4 flex gap-6">
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-accent" />
                      <span className="text-sm font-bold text-foreground">
                        R$ {service.price}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-accent" />
                      <span className="text-sm font-bold text-foreground">
                        {service.duration} min
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="rounded p-2 hover:bg-secondary text-primary">
                    <Edit size={18} />
                  </button>
                  <button className="rounded p-2 hover:bg-red-100 text-red-600">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Combos & Packages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-bold text-foreground">Pacotes e Combos</h3>
          <button className="flex items-center gap-2 rounded-lg border border-primary text-primary px-4 py-2 font-semibold hover:bg-primary/5">
            <Plus size={18} />
            Novo Combo
          </button>
        </div>

        <div className="space-y-4">
          {combos.map((combo, idx) => (
            <motion.div
              key={combo.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
              className="rounded-lg border border-border bg-card p-6"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <h4 className="font-bold text-foreground">{combo.name}</h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Inclui: {combo.services.join(', ')}
                  </p>
                </div>

                <div className="flex gap-8">
                  <div>
                    <p className="text-xs text-muted-foreground">Valor Regular</p>
                    <p className="text-lg font-bold line-through text-muted-foreground">
                      R$ {combo.regularPrice}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Preço Combo</p>
                    <p className="text-lg font-bold text-primary">
                      R$ {combo.comboPrice}
                    </p>
                    <p className="text-xs font-medium text-green-600">
                      -{combo.discount}%
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="rounded p-2 hover:bg-secondary text-primary">
                    <Edit size={18} />
                  </button>
                  <button className="rounded p-2 hover:bg-red-100 text-red-600">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Discounts & Vouchers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="rounded-lg border border-border bg-card p-6"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-foreground">Descontos e Cupons</h3>
          <button className="flex items-center gap-2 rounded-lg border border-primary text-primary px-4 py-2 font-semibold hover:bg-primary/5">
            <Plus size={18} />
            Novo Cupom
          </button>
        </div>

        <div className="space-y-3">
          {[
            { code: 'PRIMEIRAVISITA', discount: '15%', expiry: '30/04/2026' },
            { code: 'REFERENCIA10', discount: '10%', expiry: 'Sem expiração' },
            { code: 'VIP2026', discount: '20%', expiry: '31/12/2026' },
          ].map((coupon, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-lg bg-secondary/50 p-4"
            >
              <div>
                <p className="font-bold text-foreground">{coupon.code}</p>
                <p className="text-xs text-muted-foreground">
                  Válido até: {coupon.expiry}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-lg font-bold text-accent">{coupon.discount}</p>
                <button className="rounded p-2 hover:bg-secondary text-muted-foreground">
                  <Edit size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
