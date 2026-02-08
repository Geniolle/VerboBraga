import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import FloatingWhatsApp from '@/components/floating-whatsapp'

export default function CentroDeCuraFormularioPage() {
  return (
    <main className="w-full">
      <Header />

      <section className="w-full bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-foreground md:text-5xl">
            Formulario - Centro de Cura
          </h1>
          <p className="mt-4 text-muted-foreground">
            Preencha os dados abaixo. Os campos com * sao obrigatorios.
          </p>
        </div>
      </section>

      <section className="w-full bg-background">
        <div className="container mx-auto px-4 py-12">
          <form className="mx-auto max-w-4xl space-y-8 rounded-xl border border-border bg-card p-6 md:p-8">
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
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Enviar Formulario
            </button>
          </form>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </main>
  )
}
