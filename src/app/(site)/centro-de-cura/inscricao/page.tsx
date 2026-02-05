import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata = {
  title: "Inscrição | Centro de Cura",
  description: "Ficha de inscrição do Centro de Cura."
};

export default function InscricaoCentroDeCura() {
  return (
    <>
      <AnimatedSection>
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-indigo">
            Centro de Cura
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-5xl">
            Ficha de inscrição
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 sm:text-lg">
            Esta página é apenas um formulário de demonstração. Nenhuma informação será salva por
            enquanto.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <SectionHeader title="Dados pessoais">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
            Preencha com suas informações
          </h2>
        </SectionHeader>

        <form className="space-y-6 rounded-3xl border border-white/60 bg-white/80 p-6 shadow-soft dark:border-slate-800/70 dark:bg-slate-900/70">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Nome Completo *
              </label>
              <input
                type="text"
                className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-brand-indigo dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200"
                placeholder="Digite seu nome"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Data de nascimento
              </label>
              <input
                type="date"
                className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-brand-indigo dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Género
            </label>
            <div className="flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-300">
              <label className="flex items-center gap-2">
                <input type="radio" name="genero" />
                Feminino
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="genero" />
                Masculino
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Morada completa (Rua/Avenida, Número, Freguesia, Código Postal)
            </label>
            <input
              type="text"
              className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-brand-indigo dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200"
              placeholder="Digite a morada completa"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Telemóvel *
            </label>
            <input
              type="tel"
              className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-brand-indigo dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200"
              placeholder="+351"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Qual a sua religião?
            </label>
            <div className="grid gap-2 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-2">
              {["Evangelico", "Catolico", "Espirita", "Outro"].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input type="radio" name="religiao" />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Você frequenta ou já frequentou alguma igreja evangélica? Se sim, qual?
            </label>
            <div className="grid gap-2 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-2">
              {[
                "Sim",
                "Não",
                "Não tenho certeza",
                "Não sei o que isso siginifica",
                "Outro"
              ].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input type="radio" name="frequentou" />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Já recebeu o batismo no Espírito Santo?
            </label>
            <div className="grid gap-2 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-2">
              {[
                "Sim",
                "Não",
                "Não tenho certeza",
                "Não sei o que isso siginifica",
                "Outro"
              ].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input type="radio" name="batismo" />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Como ficou a saber do Centro de Cura?
            </label>
            <div className="grid gap-2 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-2">
              {["Avisos da igreja local", "Indicação de amigos", "Redes Sociais", "Outro"].map(
                (option) => (
                  <label key={option} className="flex items-center gap-2">
                    <input type="radio" name="conheceu" />
                    {option}
                  </label>
                )
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              A enfermidade que está no seu corpo é;
            </label>
            <div className="grid gap-2 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-2">
              {["Emocional", "Fisica", "Emocional e fisica", "Outro"].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input type="radio" name="enfermidade" />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Descreva do que quer ser curado
            </label>
            <textarea
              rows={5}
              className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-brand-indigo dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200"
              placeholder="Escreva aqui"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-full bg-brand-indigo px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
            >
              Enviar inscrição
            </button>
            <Link
              href="/centro-de-cura"
              className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 dark:border-slate-700 dark:text-slate-200"
            >
              Voltar
            </Link>
          </div>
        </form>
      </AnimatedSection>
    </>
  );
}
