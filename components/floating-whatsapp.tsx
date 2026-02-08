'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { useState } from 'react'

export default function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false)

  const phoneNumber = '5511999999999'
  const message = 'Olá! Gostaria de saber mais sobre a Igreja Verbo da Vida.'

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-40"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      whileHover={{ scale: 1.1 }}
    >
      <motion.a
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center gap-3 rounded-full bg-green-500 px-4 py-4 text-white shadow-lg transition-all hover:shadow-2xl hover:shadow-green-500/40"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <MessageCircle size={24} />
        <motion.span
          initial={{ opacity: 0, width: 0 }}
          animate={isHovered ? { opacity: 1, width: 'auto' } : { opacity: 0, width: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden font-semibold"
        >
          WhatsApp
        </motion.span>
      </motion.a>

      {/* Pulsing Animation */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-green-500"
        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  )
}
