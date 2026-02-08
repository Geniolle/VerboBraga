'use client'

import { FormEvent, useState } from 'react'

export function CuraForm() {
  const [sending, setSending] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSending(true)
    setMessage('')

    const formData = new FormData(event.currentTarget)
    const payload = Object.fromEntries(formData.entries())

    const res = await fetch('/api/centro-de-cura/submissoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setMessage(data.error || 'Erro ao enviar formulario')
      setSending(false)
      return
    }

    event.currentTarget.reset()
    setMessage('Formulario enviado com sucesso!')
    setSending(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-4xl space-y-8 rounded-xl border border-border bg-card p-6 md:p-8"
    >
      <div className="space-y-2">
        <label htmlFor="nome" className="text-sm font-semibold text-foreground">
          Nome Completo *
        </label>
        <input
          id="nome"
          name="nome"
          required
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-foreground">Genero</legend>
        <div className="flex flex-wrap gap-6">
          <label className="inline-flex items-center gap-2">
            <input type="radio" name="genero" value="Feminino" />
            Feminino
          </label>
          <label className="inline-flex items-center gap-2">
            <input type="radio" name="genero" value="Masculino" />
            Masculino
          </label>
        </div>
      </fieldset>

      <div className="space-y-2">
        <label htmlFor="nascimento" className="text-sm font-semibold text-foreground">
          Data de nascimento
        </label>
        <input
          id="nascimento"
          name="nascimento"
          type="date"
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="morada" className="text-sm font-semibold text-foreground">
          Morada completa (Rua/Avenida, Numero, Freguesia, Codigo Postal)
        </label>
        <textarea
          id="morada"
          name="morada"
          rows={3}
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="telemovel" className="text-sm font-semibold text-foreground">
          Telemovel *
        </label>
        <input
          id="telemovel"
          name="telemovel"
          required
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-foreground">Qual a sua religiao?</legend>
        <div className="grid gap-2">
          <label className="inline-flex items-center gap-2"><input type="radio" name="religiao" value="Evangelico" />Evangelico</label>
          <label className="inline-flex items-center gap-2"><input type="radio" name="religiao" value="Catolico" />Catolico</label>
          <label className="inline-flex items-center gap-2"><input type="radio" name="religiao" value="Espirita" />Espirita</label>
          <label className="inline-flex items-center gap-2"><input type="radio" name="religiao" value="Outro" />Outro</label>
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-foreground">
          Voce frequenta ou ja frequentou alguma igreja evangelica? Se sim, qual?
        </legend>
        <div className="grid gap-2">
          <label className="inline-flex items-center gap-2"><input type="radio" name="frequenta_igreja" value="Sim" />Sim</label>
          <label className="inline-flex items-center gap-2"><input type="radio" name="frequenta_igreja" value="Nao" />Nao</label>
          <label className="inline-flex items-center gap-2"><input type="radio" name="frequenta_igreja" value="Nao tenho certeza" />Nao tenho certeza</label>
          <label className="inline-flex items-center gap-2"><input type="radio" name="frequenta_igreja" value="Nao sei o que isso significa" />Nao sei o que isso significa</label>
          <label className="inline-flex items-center gap-2"><input type="radio" name="frequenta_igreja" value="Outro" />Outro</label>
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-foreground">
          Ja recebeu o batismo no Espirito Santo?
        </legend>
        <div className="grid gap-2">
          <label className="inline-flex items-center gap-2"><input type="radio" name="batismo_espirito" value="Sim" />Sim</label>
          <label className="inline-flex items-center gap-2"><input type="radio" name="batismo_espirito" value="Nao" />Nao</label>
          <label className="inline-flex items-center gap-2"><input type="radio" name="batismo_espirito" value="Nao tenho certeza" />Nao tenho certeza</label>
          <label className="inline-flex items-center gap-2"><input type="radio" name="batismo_espirito" value="Nao sei o que isso significa" />Nao sei o que isso significa</label>
          <label className="inline-flex items-center gap-2"><input type="radio" name="batismo_espirito" value="Outro" />Outro</label>
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-foreground">
          Como ficou a saber do centro de Cura?
        </legend>
        <div className="grid gap-2">
          <label className="inline-flex items-center gap-2"><input type="radio" name="origem" value="Avisos da igreja local" />Avisos da igreja local</label>
          <label className="inline-flex items-center gap-2"><input type="radio" name="origem" value="Indicacao de amigos" />Indicacao de amigos</label>
          <label className="inline-flex items-center gap-2"><input type="radio" name="origem" value="Redes Sociais" />Redes Sociais</label>
          <label className="inline-flex items-center gap-2"><input type="radio" name="origem" value="Outro" />Outro</label>
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-foreground">
          A enfermidade que esta no seu corpo e;
        </legend>
        <div className="grid gap-2">
          <label className="inline-flex items-center gap-2"><input type="radio" name="enfermidade" value="Emocional" />Emocional</label>
          <label className="inline-flex items-center gap-2"><input type="radio" name="enfermidade" value="Fisica" />Fisica</label>
          <label className="inline-flex items-center gap-2"><input type="radio" name="enfermidade" value="Emocional e fisica" />Emocional e fisica</label>
          <label className="inline-flex items-center gap-2"><input type="radio" name="enfermidade" value="Outro" />Outro</label>
        </div>
      </fieldset>

      <div className="space-y-2">
        <label htmlFor="cura" className="text-sm font-semibold text-foreground">
          Descreva do que quer ser curado *
        </label>
        <textarea
          id="cura"
          name="cura"
          rows={5}
          required
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-70"
      >
        {sending ? 'Enviando...' : 'Enviar Formulario'}
      </button>

      {message && <p className="text-sm text-foreground">{message}</p>}
    </form>
  )
}
