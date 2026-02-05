import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata = {
  title: "Jovens | Verbo da Vida Braga",
  description: "Ministério de jovens da Verbo da Vida Braga."
};

export default function Jovens() {
  return (
    <>
      <AnimatedSection>
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">Jovens</p>
          <h1 className="text-4xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-5xl">
            Uma geração conectada à Palavra
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 sm:text-lg">
            O ministério de jovens será um espaço de amizade, discipulado e crescimento. Em breve
            incluiremos agenda, líderes e temas de encontro.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <SectionHeader title="Em breve">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
            Conteúdo em atualização
          </h2>
        </SectionHeader>
        <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-soft dark:border-slate-800/70 dark:bg-slate-900/70">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Vamos compartilhar aqui o propósito do ministério, horários de encontros e recursos para
            a juventude da igreja.
          </p>
        </div>
      </AnimatedSection>
    </>
  );
}
