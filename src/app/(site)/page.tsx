import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeader } from "@/components/SectionHeader";
import { verboDaVidaHistory, verboDaVidaIdentity } from "@/lib/content";

export const metadata = {
  title: "Quem Somos | Verbo da Vida Braga",
  description: "História, propósito e visão da Verbo da Vida Braga."
};

export default function QuemSomos() {
  return (
    <>
      <AnimatedSection>
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-indigo">
              Quem somos
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-5xl">
              Verbo da Vida Braga
            </h1>
            <p className="text-base text-slate-600 dark:text-slate-300 sm:text-lg">
              Somos uma igreja local em Braga ligada ao Ministério Verbo da Vida, uma rede de
              igrejas e escolas bíblicas que tem alcançado famílias com a Palavra da Fé e o amor.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/70">
                <p className="text-sm font-semibold text-brand-indigo">Nossa história</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Nossa comunidade nasceu para servir Braga com discipulado, cuidado pastoral e uma
                  mensagem de fé prática para o dia a dia.
                </p>
              </div>
              <div className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/70">
                <p className="text-sm font-semibold text-brand-indigo">Propósito</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Conectar pessoas a Jesus, formar famílias firmes na Palavra e levantar líderes que
                  sirvam com excelência.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-soft dark:border-slate-800/70 dark:bg-slate-900/70">
            <SectionHeader title="O que é o Verbo da Vida">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                Um ministério comprometido com a Palavra, fé e amor.
              </h2>
            </SectionHeader>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
              O Ministério Verbo da Vida coordena igrejas e centros de treinamento bíblico no
              Brasil, incluindo escolas como o Rhema, mantendo raízes no ensino da Palavra da Fé e
              uma visão missionária ativa.
            </p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <SectionHeader title="História do Verbo da Vida">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
            Uma trajetória de fé que inspira a nossa igreja local.
          </h2>
        </SectionHeader>
        <div className="grid gap-4 md:grid-cols-2">
          {verboDaVidaHistory.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/70"
            >
              <p className="text-sm font-semibold text-brand-indigo">{item.title}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <SectionHeader title="Propósito e visão">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
            A missão que direciona nossa caminhada em Braga.
          </h2>
        </SectionHeader>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/70">
            <p className="text-sm font-semibold text-brand-indigo">Missão</p>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">
              {verboDaVidaIdentity.mission}
            </p>
          </div>
          <div className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/70">
            <p className="text-sm font-semibold text-brand-indigo">Visão</p>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">
              {verboDaVidaIdentity.vision}
            </p>
          </div>
        </div>
        <div className="mt-6 rounded-2xl border border-white/60 bg-white/80 p-5 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/70">
          <p className="text-sm font-semibold text-brand-indigo">Valores que nos guiam</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {verboDaVidaIdentity.values.map((value) => (
              <span
                key={value}
                className="rounded-full border border-brand-indigo/30 bg-brand-sky px-4 py-2 text-xs font-semibold uppercase tracking-widest text-brand-indigo dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <SectionHeader title="Verbo da Vida Braga">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
            Uma igreja local com coração missionário.
          </h2>
        </SectionHeader>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/70">
            <p className="text-sm font-semibold text-brand-indigo">História da igreja</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Nossa comunidade nasceu para alcançar Braga com ensino bíblico sólido e relacionamentos
              saudáveis.
            </p>
          </div>
          <div className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/70">
            <p className="text-sm font-semibold text-brand-indigo">Propósito local</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Servir famílias, formar discípulos e treinar líderes que impactem a cidade com amor.
            </p>
          </div>
          <div className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/70">
            <p className="text-sm font-semibold text-brand-indigo">O que você encontra aqui</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Cultos inspiradores, acompanhamento pastoral e oportunidades de crescimento para todas
              as idades.
            </p>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
