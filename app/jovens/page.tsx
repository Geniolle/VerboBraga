import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import FloatingWhatsApp from '@/components/floating-whatsapp'

export default function JovensPage() {
  return (
    <main className="w-full">
      <Header />

      <section className="w-full bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <h1 className="text-4xl font-bold text-foreground md:text-5xl">Jovens</h1>
          <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
            Bem-vindo ao departamento de jovens da Verbo da Vida Braga.
            Aqui crescemos juntos na Palavra, comunhão e propósito.
          </p>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            Em breve você verá a programação completa dos nossos encontros,
            atividades e próximos eventos.
          </p>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </main>
  )
}
