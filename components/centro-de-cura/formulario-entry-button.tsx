'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type MeResponse = {
  user: {
    uid: string
    email?: string
    name?: string
    picture?: string
  } | null
  isAdmin: boolean
}

export function FormularioEntryButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    if (loading) return

    setLoading(true)
    try {
      const res = await fetch('/api/auth/me', { cache: 'no-store' })
      const data = (await res.json().catch(() => ({ user: null }))) as MeResponse

      if (data.user) {
        router.push('/centro-de-cura/formulario')
        return
      }

      window.dispatchEvent(new Event('open-auth-login'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-70"
    >
      Formulario de Inscricao
    </button>
  )
}
