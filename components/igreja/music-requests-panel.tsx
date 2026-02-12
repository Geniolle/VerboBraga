'use client'

import { FormEvent, useMemo, useState } from 'react'

type MusicRequest = {
  id: number
  requested_by_uid: string
  requested_by_email: string | null
  musica: string
  versao: string | null
  url: string | null
  letra: string | null
  status: 'em_espera' | 'concluido'
  completed_by_uid: string | null
  completed_by_email: string | null
  completed_at: string | null
  created_at: string
  updated_at: string
}

function formatStatus(status: MusicRequest['status']) {
  return status === 'concluido' ? 'Concluido' : 'Em espera'
}

function formatDate(date: string) {
  const parsed = parseDate(date)
  if (parsed) {
    return parsed.toLocaleString('pt-PT')
  }

  try {
    return new Date(date).toLocaleString('pt-PT')
  } catch {
    return date
  }
}

function parseDate(value: string | null | undefined) {
  if (!value) return null
  const raw = String(value).trim()
  if (!raw) return null

  const native = new Date(raw)
  if (!Number.isNaN(native.getTime())) {
    return native
  }

  const match = raw.match(
    /^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?$/
  )
  if (!match) return null

  const [, day, month, year, hour = '0', minute = '0', second = '0'] = match
  const parsed = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
    Number(second)
  )

  return Number.isNaN(parsed.getTime()) ? null : parsed
}

export function MusicRequestsPanel({
  initialRequests,
  canManageMusicMedia,
  canDeletePendingMusic,
}: {
  initialRequests: MusicRequest[]
  canManageMusicMedia: boolean
  canDeletePendingMusic: boolean
}) {
  const [requests, setRequests] = useState<MusicRequest[]>(initialRequests)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    musica: '',
    versao: '',
    url: '',
    letra: '',
  })

  const pendingCount = useMemo(
    () => requests.filter((item) => item.status === 'em_espera').length,
    [requests]
  )

  const sortedRequests = useMemo(() => {
    return [...requests].sort((a, b) => {
      const aPendingRank = a.status === 'em_espera' ? 0 : 1
      const bPendingRank = b.status === 'em_espera' ? 0 : 1

      if (aPendingRank !== bPendingRank) {
        return aPendingRank - bPendingRank
      }

      const aDate = parseDate(a.created_at)
      const bDate = parseDate(b.created_at)
      const aTime = aDate?.getTime()
      const bTime = bDate?.getTime()

      if (aTime === undefined && bTime === undefined) return 0
      if (aTime === undefined) return 1
      if (bTime === undefined) return -1

      return bTime - aTime
    })
  }, [requests])

  async function reload() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/igreja/musicas', { cache: 'no-store' })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.error || 'Falha ao carregar pedidos')
      }

      setRequests(data.requests ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao carregar pedidos')
    } finally {
      setLoading(false)
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/igreja/musicas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          musica: form.musica,
          versao: form.versao,
          url: form.url,
          letra: form.letra,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.error || 'Falha ao criar pedido')
      }

      setForm({ musica: '', versao: '', url: '', letra: '' })
      await reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao criar pedido')
    } finally {
      setSubmitting(false)
    }
  }

  async function conclude(id: number) {
    setError('')

    try {
      const res = await fetch(`/api/igreja/musicas/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'concluido' }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.error || 'Falha ao concluir pedido')
      }

      await reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao concluir pedido')
    }
  }

  async function deletePending(id: number) {
    setError('')

    try {
      const res = await fetch(`/api/igreja/musicas/${id}`, {
        method: 'DELETE',
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.error || 'Falha ao deletar pedido')
      }

      await reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao deletar pedido')
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground">Novo pedido de música</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Todo pedido novo é enviado para análise e acompanhamento.
        </p>

        <form onSubmit={onSubmit} className="mt-4 grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-1 text-sm">
              <span className="font-medium text-foreground">Música *</span>
              <input
                required
                value={form.musica}
                onChange={(e) => setForm((prev) => ({ ...prev, musica: e.target.value }))}
                className="rounded-lg border border-border bg-background px-3 py-2"
                placeholder="Nome da música"
              />
            </label>

            <label className="grid gap-1 text-sm">
              <span className="font-medium text-foreground">Versão</span>
              <input
                value={form.versao}
                onChange={(e) => setForm((prev) => ({ ...prev, versao: e.target.value }))}
                className="rounded-lg border border-border bg-background px-3 py-2"
                placeholder="Original, acústica, etc"
              />
            </label>
          </div>

          <label className="grid gap-1 text-sm">
            <span className="font-medium text-foreground">URL</span>
            <input
              type="url"
              value={form.url}
              onChange={(e) => setForm((prev) => ({ ...prev, url: e.target.value }))}
              className="rounded-lg border border-border bg-background px-3 py-2"
              placeholder="https://..."
            />
          </label>

          <label className="grid gap-1 text-sm">
            <span className="font-medium text-foreground">Letra</span>
            <textarea
              value={form.letra}
              onChange={(e) => setForm((prev) => ({ ...prev, letra: e.target.value }))}
              className="min-h-32 rounded-lg border border-border bg-background px-3 py-2"
              placeholder="Cole aqui a letra"
            />
          </label>

          <div className="flex items-center gap-3">
            <button
              disabled={submitting}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
            >
              {submitting ? 'Guardando...' : 'Enviar pedido'}
            </button>

            <button
              type="button"
              onClick={reload}
              disabled={loading}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:border-primary disabled:opacity-60"
            >
              {loading ? 'A atualizar...' : 'Atualizar lista'}
            </button>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
          <h2 className="text-lg font-semibold text-foreground">Pedidos de música</h2>
          <p className="text-sm text-muted-foreground">
            Em espera: <strong>{pendingCount}</strong>
          </p>
        </div>

        {!canManageMusicMedia && (
          <p className="mt-2 text-sm text-muted-foreground">
            Somente a equipe de mídia pode marcar um pedido como <code>concluido</code>.
          </p>
        )}
        {!canDeletePendingMusic && (
          <p className="mt-2 text-sm text-muted-foreground">
            Apenas a liderança do louvor pode remover pedidos pendentes.
          </p>
        )}

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30 text-left text-muted-foreground">
                <th className="px-3 py-2">Música</th>
                <th className="px-3 py-2">Versão</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Pedido por</th>
                <th className="px-3 py-2">Criação em</th>
                <th className="px-3 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {sortedRequests.map((request) => (
                <tr key={request.id} className="border-b border-border/60 align-top">
                  <td className="px-3 py-2">
                    <p className="font-medium text-foreground">{request.musica}</p>
                    {request.url && (
                      <a
                        href={request.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-primary underline"
                      >
                        Abrir URL
                      </a>
                    )}
                    {request.letra && (
                      <p className="mt-1 max-w-xl whitespace-pre-wrap text-xs text-muted-foreground">
                        {request.letra}
                      </p>
                    )}
                  </td>
                  <td className="px-3 py-2">{request.versao || '-'}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`rounded px-2 py-1 text-xs font-semibold ${
                        request.status === 'concluido'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {formatStatus(request.status)}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-xs text-muted-foreground">
                    {request.requested_by_email || request.requested_by_uid}
                  </td>
                  <td className="px-3 py-2 text-xs text-muted-foreground">
                    {formatDate(request.created_at)}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex flex-wrap items-center gap-2">
                      {canManageMusicMedia && request.status === 'em_espera' && (
                        <button
                          onClick={() => conclude(request.id)}
                          className="rounded-lg border border-border px-3 py-1 text-xs font-semibold hover:border-primary"
                        >
                          Marcar concluido
                        </button>
                      )}
                      {canDeletePendingMusic && request.status === 'em_espera' && (
                        <button
                          onClick={() => deletePending(request.id)}
                          className="rounded-lg border border-red-300 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-100"
                        >
                          Deletar
                        </button>
                      )}
                      {!canManageMusicMedia &&
                        !canDeletePendingMusic &&
                        request.status === 'em_espera' && (
                          <span className="text-xs text-muted-foreground">-</span>
                        )}
                      {request.status !== 'em_espera' && (
                        <span className="text-xs text-muted-foreground">-</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {requests.length === 0 && (
                <tr>
                  <td className="px-3 py-3 text-muted-foreground" colSpan={6}>
                    Nenhum pedido encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
