import { AnimatedSection } from "@/components/AnimatedSection";
import { PeopleTabs } from "@/components/PeopleTabs";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata = {
  title: "Departamentos | Verbo da Vida Braga",
  description: "Conheça os departamentos e a liderança da Verbo da Vida Braga."
};

export default function Departamentos() {
  return (
    <>
      <AnimatedSection>
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">
            Departamentos
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-5xl">
            Pastores e líderes
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 sm:text-lg">
            Aqui você encontra a liderança da Verbo da Vida Braga. Mais departamentos e áreas serão
            adicionados conforme alinharmos os nomes e imagens oficiais.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <SectionHeader title="Liderança">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
            Pessoas que servem com amor, cuidado e propósito.
          </h2>
        </SectionHeader>
        <PeopleTabs />
      </AnimatedSection>
    </>
  );
}
