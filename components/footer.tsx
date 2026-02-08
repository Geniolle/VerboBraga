'use client'

/* Página - Rodapé */

import { motion } from 'framer-motion'
import { Facebook, Instagram, Mail, Phone } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Sobre',
      links: [
        { label: 'Nossa História', href: '#about' },
        { label: 'Liderança', href: '#leadership' },
        { label: 'Departamentos', href: '#departments' },
      ],
    },
    {
      title: 'Serviços',
      links: [
        { label: 'Cultos', href: '#services' },
        { label: 'Eventos', href: '#events' },
        { label: 'Agenda', href: '#booking' },
      ],
    },
    {
      title: 'Comunidade',
      links: [
        { label: 'Grupos', href: '#groups' },
        { label: 'Voluntariado', href: '#volunteer' },
        { label: 'Contato', href: '#contact' },
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <footer className="w-full border-t border-border bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-12 md:grid-cols-4"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-2xl font-bold">Verbo da Vida</h3>
            <p className="text-primary-foreground/70">
              Família Verbo da Vida Braga uma igreja crescendo juntos em Cristo.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="#"
                className="rounded-lg bg-primary-foreground/10 p-2 transition-all hover:bg-primary-foreground/20"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="rounded-lg bg-primary-foreground/10 p-2 transition-all hover:bg-primary-foreground/20"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="mailto:contato@verboadvida.com.br"
                className="rounded-lg bg-primary-foreground/10 p-2 transition-all hover:bg-primary-foreground/20"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </motion.div>

          {/* Footer Sections */}
          {footerSections.map((section, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="space-y-4"
            >
              <h4 className="font-semibold">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      href={link.href}
                      className="text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 border-t border-primary-foreground/10 pt-8"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">Precisa de ajuda?</p>
              <p className="mt-1 text-primary-foreground/70">
                Estamos aqui para responder suas dúvidas
              </p>
            </div>
            <a
              href="https://wa.me/5511999999999"
              className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-2 font-semibold text-white transition-all hover:shadow-lg hover:shadow-green-600/30"
            >
              <Phone size={18} />
              WhatsApp
            </a>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 border-t border-primary-foreground/10 pt-8 text-center"
        >
          <p className="text-sm text-primary-foreground/70">
            © {currentYear} Igreja Verbo da Vida Braga. Todos os direitos reservados.
          </p>
          <p className="mt-2 text-xs text-primary-foreground/50">
            Desenvolvido para nossa comunidade
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
