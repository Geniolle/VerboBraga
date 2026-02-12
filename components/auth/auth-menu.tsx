'use client'

import { useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { getClientAuth } from '@/lib/firebase/client'

type MeResponse = {
  user: {
    uid: string
    email?: string
    name?: string
    picture?: string
  } | null
  isAdmin: boolean
  isColaborador: boolean
  isMembresia: boolean
  canAccessChurch: boolean
}

export function AuthMenu() {
  const [me, setMe] = useState<MeResponse>({
    user: null,
    isAdmin: false,
    isColaborador: false,
    isMembresia: false,
    canAccessChurch: false,
  })
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function refreshMe() {
    const res = await fetch('/api/auth/me', { cache: 'no-store' })
    const data = (await res.json()) as MeResponse
    setMe(data)
  }

  useEffect(() => {
    refreshMe()
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const params = new URLSearchParams(window.location.search)
    if (params.get('openLogin') !== '1') return
    if (me.user) return

    setOpen(true)
  }, [me.user])

  useEffect(() => {
    if (typeof window === 'undefined') return

    function handleOpenAuthLogin() {
      if (me.user) return
      setOpen(true)
    }

    window.addEventListener('open-auth-login', handleOpenAuthLogin)
    return () => window.removeEventListener('open-auth-login', handleOpenAuthLogin)
  }, [me.user])

  async function createSessionFromIdToken(idToken: string) {
    const res = await fetch('/api/auth/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    })

    if (!res.ok) throw new Error('Falha ao criar sessao')
    await refreshMe()
  }

  async function loginWithGoogle() {
    setLoading(true)
    setError('')
    try {
      const provider = new GoogleAuthProvider()
      const cred = await signInWithPopup(getClientAuth(), provider)
      const idToken = await cred.user.getIdToken()
      await createSessionFromIdToken(idToken)
      setOpen(false)
    } catch (e) {
      setError('Nao foi possivel entrar com Google')
    } finally {
      setLoading(false)
    }
  }

  async function logout() {
    setLoading(true)
    try {
      await signOut(getClientAuth())
      await fetch('/api/auth/session', { method: 'DELETE' })
      await refreshMe()
      setOpen(false)
    } finally {
      setLoading(false)
    }
  }

  if (me.user) {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg border border-border px-3 py-2 text-sm font-medium"
        >
          {me.user.name || me.user.email || 'Utilizador'}
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-72 rounded-lg border border-border bg-background p-4 shadow-lg">
            <p className="text-sm font-semibold text-foreground">
              {me.user.name || 'Utilizador'}
            </p>
            <p className="text-xs text-muted-foreground">{me.user.email}</p>
            {me.canAccessChurch && (
              <a
                href="/igreja"
                className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Igreja
              </a>
            )}
            {me.isAdmin && (
              <a href="/admin" className="mt-2 block text-sm font-medium text-primary">
                Ir para Admin
              </a>
            )}
            <button
              type="button"
              disabled={loading}
              onClick={logout}
              className="mt-4 w-full rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="rounded-lg border border-border px-3 py-2 text-sm font-medium"
      >
        Login
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 rounded-lg border border-border bg-background p-4 shadow-lg">
          <button
            type="button"
            onClick={loginWithGoogle}
            disabled={loading}
            className="w-full rounded-lg border border-border px-3 py-2 text-sm font-medium"
          >
            Entrar com Google
          </button>

          {error && <p className="mt-3 text-xs text-red-600">{error}</p>}
        </div>
      )}
    </div>
  )
}
