'use client'

/* Secção Cabeçalho */

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { AuthMenu } from '@/components/auth/auth-menu'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Início', href: '/' },
    { label: 'Sobre', href: '/about' },
    { label: 'Departamentos', href: '/services' },
    { label: 'Jovens', href: '/jovens' },
    { label: 'Centro de Cura', href: '/centro-de-cura' },
    { label: 'Programação', href: '/events' },
    { label: 'Localização', href: '/location' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-2xl font-bold text-primary"
          >
            <Image
              src="/Logo.png"
              alt="Logo da Igreja"
              width={48}
              height={48}
              className="object-contain rounded-lg"
              priority
            />
          </motion.div>
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          <nav className="flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          </nav>
          <AuthMenu />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <AuthMenu />
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-border bg-background px-4 py-4 md:hidden"
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground transition-colors hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.nav>
      )}
    </header>
  )
}
