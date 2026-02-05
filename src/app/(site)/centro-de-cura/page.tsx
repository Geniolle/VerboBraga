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
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">
            Centro de Cura
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-5xl">
            Um espaço de cuidado e restauração
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 sm:text-lg">
            Este ministério será dedicado ao acompanhamento, oração e apoio às famílias. Em breve
            adicionaremos as informações completas sobre horários e responsáveis.
          </p>
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
    </>
  );
}
