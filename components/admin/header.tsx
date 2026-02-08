'use client'

import { motion } from 'framer-motion'
import { Bell, User, Settings } from 'lucide-react'

export function AdminHeader() {
  return (
    <motion.header
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      className="border-b border-border bg-card"
    >
      <div className="flex items-center justify-between px-4 py-4 md:px-8">
        {/* Left */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Bem-vindo ao painel administrativo
          </p>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-4">
          <button className="relative rounded-lg p-2 hover:bg-secondary">
            <Bell size={20} className="text-foreground" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent" />
          </button>

          <button className="rounded-lg p-2 hover:bg-secondary">
            <Settings size={20} className="text-foreground" />
          </button>

          <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <User size={18} className="text-primary" />
          </div>
        </div>
      </div>
    </motion.header>
  )
}
