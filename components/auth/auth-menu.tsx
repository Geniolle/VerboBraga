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
            className="w-full rounded-lg bg-[linear-gradient(120deg,#4285F4_0%,#34A853_35%,#FBBC05_70%,#EA4335_100%)] px-3 py-2 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            <span className="flex items-center justify-center gap-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white">
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path
                    fill="#EA4335"
                    d="M12 10.2v3.9h5.5c-.2 1.3-1.6 3.9-5.5 3.9-3.3 0-6-2.8-6-6.2s2.7-6.2 6-6.2c1.9 0 3.1.8 3.9 1.5l2.7-2.6C17 2.9 14.7 2 12 2 6.9 2 2.8 6.2 2.8 11.3S6.9 20.6 12 20.6c5.3 0 8.8-3.7 8.8-8.9 0-.6-.1-1.1-.2-1.5H12z"
                  />
                  <path
                    fill="#34A853"
                    d="M3.9 7.2l3.2 2.3C7.9 7.5 9.8 6 12 6c1.9 0 3.1.8 3.9 1.5l2.7-2.6C17 2.9 14.7 2 12 2 8.5 2 5.5 4 3.9 7.2z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M12 20.6c2.6 0 4.8-.9 6.4-2.4l-3-2.4c-.8.6-1.9 1-3.4 1-2.6 0-4.9-1.8-5.7-4.2L3 15.2c1.6 3.2 4.9 5.4 9 5.4z"
                  />
                  <path
                    fill="#4285F4"
                    d="M20.8 11.7c0-.6-.1-1.1-.2-1.5H12v3.9h5.5c-.3 1.4-1.1 2.5-2.1 3.2l3 2.4c1.8-1.7 2.8-4.2 2.8-8z"
                  />
                </svg>
              </span>
              Entrar com Google
            </span>
          </button>

          {error && <p className="mt-3 text-xs text-red-600">{error}</p>}
        </div>
      )}
    </div>
  )
}
