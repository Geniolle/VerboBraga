import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import FloatingWhatsApp from '@/components/floating-whatsapp'
import { requireServerUser } from '@/lib/auth-server'
import { CuraForm } from '@/components/centro-de-cura/cura-form'

export default async function CentroDeCuraFormularioPage() {
  await requireServerUser('/?openLogin=1')

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
          <CuraForm />
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </main>
  )
}
