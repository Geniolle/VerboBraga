import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import FloatingWhatsApp from '@/components/floating-whatsapp'
import Link from 'next/link'

const whatsappText =
  'Ola. Quero participar da proxima edicao do centro de cura. Como devo fazer?'

export default function CentroDeCuraPage() {
  return (
    <main className="w-full">
      <Header />

      <section className="w-full bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <h1 className="text-4xl font-bold text-foreground md:text-5xl">
            Centro de Cura
          </h1>

          <p className="mt-6 max-w-4xl text-lg italic text-muted-foreground">
            "Eu creio que essa visão vai se expandir. Eu quero implantar um
            Centro de Cura em outros estados, nas capitais, pelo menos."
          </p>
          <p className="mt-2 text-sm font-medium text-primary">
            Centro de Cura Rhema
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/centro-de-cura/formulario"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Formulario de Inscricao
            </Link>
            <a
              href="https://www.instagram.com/centrodecurarhemabraga/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-6 py-3 font-semibold text-foreground transition hover:bg-accent/10"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/CentroDeCuraRhemaBraga"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-6 py-3 font-semibold text-foreground transition hover:bg-accent/10"
            >
              Facebook
            </a>
            <a
              href="https://www.tiktok.com/@centrodecurarhemabraga"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-6 py-3 font-semibold text-foreground transition hover:bg-accent/10"
            >
              TikTok
            </a>
            <a
              href={`https://wa.me/351913489133?text=${encodeURIComponent(whatsappText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              Conversar com responsável no WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="w-full bg-background">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-foreground">Nossa historia</h2>

          <div className="mt-8 space-y-6 text-muted-foreground">
            <p>
              Kenneth E. Hagin nasceu com um coracao deformado e uma doenca
              sanguinea incuravel. Ainda na adolescencia, essas condicoes o
              deixaram paralisado e acamado. Seus familiares foram avisados para
              se prepararem para a morte dele. Mas, lendo e meditando diariamente
              na Palavra de Deus, recebeu uma divina revelacao sobre o texto
              biblico de Marcos 11.23-24. Passou, entao, a crer com o seu coracao
              e declarar com a sua boca que era curado. Em 8 de agosto de 1934,
              Deus praticamente ressuscitou Kenneth, curando-o completamente e
              levantando-o daquele leito de enfermidade.
            </p>

            <p>
              Naquele tempo, Deus gerou algo ainda maior em Kenneth Hagin: o
              desejo de ver os perdidos salvos e os doentes curados. Ele comecou
              a pregar e ensinar a salvacao e a cura divina onde quer que fosse.
              Embora ele nao soubesse disso, na epoca, este foi o inicio do que
              viria a se tornar um ministerio mundial, fundamentado na oracao e
              nas verdades de cura da Palavra de Deus.
            </p>

            <p>
              Em 1979, poucos anos depois de ter fundado o Centro de Treinamento
              Biblico Rhema, ele seguiu uma nova direcao do Senhor, iniciando a
              Escola de Oracao e de Cura em Broken Arrow-OK, nos Estados Unidos.
              Dali surgiu o Centro de Cura Rhema. Hoje, as pessoas que frequentam
              o Centro aprendem o plano de Deus para suas vidas e como receber e
              manter a cura conquistada por Jesus Cristo.
            </p>

            <p>
              Kenneth Hagin foi estar com o Senhor em 2003. Mas a uncao so tem
              crescido e se fortalecido no campus Rhema. Ministros como Craig
              Hagin, Patsy Cameneti, Doug Jones e tantos outros ja lideraram e
              serviram no Centro.
            </p>

            <h3 className="pt-3 text-2xl font-semibold text-foreground">
              Bud e Jan no Brasil
            </h3>
            <p>
              Em 1983, chegou ao Brasil um casal de missionarios graduados do
              Rhema EUA, Bud e Jan Wright. Durante a decada de 1980, serviram ao
              Senhor no estado de Sao Paulo, onde iniciaram igrejas e escolas
              biblicas. O ministerio de cura era visivel atraves deles.
            </p>

            <p>
              No inicio da decada de 1990, mudaram-se para Campina Grande-PB, onde
              estabeleceram a sede do Ministerio Verbo da Vida e do Centro de
              Treinamento Biblico que, em 2000, apos parceria com o Ministerio
              Kenneth Hagin, passou a se chamar Rhema Brasil.
            </p>

            <p>
              Em 2012, nasceu o primeiro Centro de Cura Rhema Brasil, em Campina
              Grande-PB. De segunda a sexta-feira, enfermos escutam a Palavra de
              Deus, recebem fe para tomar posse da cura e tambem imposicao de maos
              sobre cada paciente. Inumeros testemunhos de cura e salvacao foram
              registrados nesse lugar.
            </p>

            <h3 className="pt-3 text-2xl font-semibold text-foreground">
              Raphael e Manuelle Frota
            </h3>
            <p>
              O desejo do Ap. Bud tambem era abrir unidades do Centro de Cura
              Rhema em todos os estados do Brasil. Para isso, delegou autoridade
              ao casal Raphael e Manuelle Frota, promovendo-os a diretores
              nacionais do Centro.
            </p>

            <p>
              Em 7 de novembro de 2013, poucos dias depois do Centro completar seu
              primeiro ano, o Ap. Bud foi para o Senhor, tendo cumprido sua
              carreira e visao celestial. A visao permaneceu e continua sendo
              cumprida no Ministerio Verbo da Vida, hoje presidido pelo Ap. Guto
              Emery, juntamente com os diretores nacionais e centenas de ministros
              de cura em treinamento.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </main>
  )
}
