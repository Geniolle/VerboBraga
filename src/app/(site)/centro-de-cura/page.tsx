import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata = {
  title: "Centro de Cura | Verbo da Vida Braga",
  description: "Espaço de cuidado, oração e restauração da Verbo da Vida Braga."
};

export default function CentroDeCura() {
  return (
    <>
      <AnimatedSection>
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-indigo">
            Centro de Cura
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-5xl">
            Um espaço de cuidado e restauração
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 sm:text-lg">
            Este ministério será dedicado ao acompanhamento, oração e apoio às famílias. Em breve
            adicionaremos as informações completas sobre horários e responsáveis.
          </p>
          <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow-soft dark:border-slate-800/70 dark:bg-slate-900/70">
            <div className="relative h-0 w-full pb-[56.25%]">
              <iframe
                title="Centro de Cura - Vídeo"
                src="https://www.youtube.com/embed/dfpbPAMCMzU"
                className="absolute left-0 top-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <SectionHeader title="Informações">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
            Conteúdo em construção
          </h2>
        </SectionHeader>
        <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-soft dark:border-slate-800/70 dark:bg-slate-900/70">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Em breve você verá aqui a equipe responsável, dias de atendimento e materiais de apoio
            para quem busca cura interior e fortalecimento espiritual.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <SectionHeader title="Inscrição">
              <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
                Quer participar do Centro de Cura?
              </h2>
            </SectionHeader>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Clique no botão abaixo para abrir a ficha de inscrição. Por enquanto, os dados não
              são enviados para nenhum lugar.
            </p>
            <Link
              href="/centro-de-cura/inscricao"
              className="inline-flex items-center justify-center rounded-full bg-brand-indigo px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
            >
              Clique aqui e faça sua inscrição
            </Link>
          </div>
          <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-soft dark:border-slate-800/70 dark:bg-slate-900/70">
            <p className="text-sm font-semibold text-brand-indigo">Redes sociais</p>
            <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <p>Instagram</p>
              <p>Facebook</p>
              <p>TikTok</p>
              <p>WhatsApp: +351 913 489 133</p>
              <p>YouTube (Centro de Cura)</p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <SectionHeader title="Localização">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
            Verbo da Vida Braga
          </h2>
        </SectionHeader>
        <div className="overflow-hidden rounded-3xl border border-white/60 shadow-soft dark:border-slate-800/70">
          <iframe
            title="Mapa Verbo da Vida Braga"
            src="https://maps.google.com/maps?q=Praceta%20Beato%20Ato%20In%C3%A1cio%20de%20Azevedo%204,%20Braga%20(S%C3%A3o%20Vicente),%204700-387%20Braga,%20Portugal&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="h-72 w-full border-0"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </AnimatedSection>
    </>
  );
}
