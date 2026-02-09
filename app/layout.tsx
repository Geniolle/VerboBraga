import React from "react"
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { GsapRouteTransition } from '@/components/gsap-route-transition'

import './globals.css'

const geist = Geist({ subsets: ['latin'] })
const geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Verbo da Vida - Igreja Espiritual',
  description: 'Bem-vindo à Igreja Verbo da Vida. Conheça nossos pastores, serviços, agenda de eventos e conecte-se conosco através do WhatsApp.',
  generator: 'v0.app',
  keywords: ['igreja', 'espiritual', 'comunidade', 'fé'],
  openGraph: {
    title: 'Verbo da Vida - Igreja Espiritual',
    description: 'Comunidade espiritual acolhedora com serviços às quartas e domingos',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#1e5a7a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <GsapRouteTransition>{children}</GsapRouteTransition>
      </body>
    </html>
  )
}
