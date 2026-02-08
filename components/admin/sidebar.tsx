'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Calendar,
  Users,
  DollarSign,
  Settings,
  LogOut,
  BarChart3,
  ShoppingCart,
} from 'lucide-react'

export function AdminSidebar() {
  const pathname = usePathname()

  const menuItems = [
    {
      label: 'Dashboard',
      href: '/admin',
      icon: BarChart3,
    },
    {
      label: 'Agendamentos',
      href: '/admin/appointments',
      icon: Calendar,
    },
    {
      label: 'Clientes',
      href: '/admin/clients',
      icon: Users,
    },
    {
      label: 'Serviços',
      href: '/admin/services',
      icon: ShoppingCart,
    },
    {
      label: 'Financeiro',
      href: '/admin/financial',
      icon: DollarSign,
    },
    {
      label: 'Configurações',
      href: '/admin/settings',
      icon: Settings,
    },
  ]

  return (
    <motion.aside
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="w-64 border-r border-border bg-sidebar text-sidebar-foreground"
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="border-b border-sidebar-border px-6 py-6">
          <Link href="/admin" className="text-2xl font-bold text-sidebar-primary">
            Verbo da Vida
          </Link>
          <p className="mt-1 text-xs text-sidebar-foreground/60">Admin Panel</p>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
          {menuItems.map((item, idx) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

            return (
              <Link
                key={idx}
                href={item.href}
                className={`group flex items-center gap-3 rounded-lg px-4 py-2 transition-all ${
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                }`}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border px-3 py-6">
          <button className="group flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sidebar-foreground transition-all hover:bg-sidebar-accent/50">
            <LogOut size={20} />
            <span className="text-sm font-medium">Sair</span>
          </button>
        </div>
      </div>
    </motion.aside>
  )
}
