import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeader } from "@/components/SectionHeader";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  departments,
  events,
  history,
  leadership,
  schedule,
  testimonials
} from "@/lib/content";

export const metadata = {
  title: "Verbo da Vida Braga | Bem-vindo",
  description: "Cultos, agenda e departamentos da Verbo da Vida Braga."
};

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-brand-sky via-white to-brand-lavender dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <header className="sticky top-0 z-40 border-b border-white/40 bg-white/80 backdrop-blur dark:border-slate-800/60 dark:bg-slate-950/80">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="#" className="text-lg font-semibold tracking-wide text-brand-indigo">
            Verbo da Vida Braga
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex dark:text-slate-300">
            <Link href="#agenda">Agenda</Link>
            <Link href="#historia">História</Link>
            <Link href="#departamentos">Departamentos</Link>
            <Link href="#doacoes">Apoie</Link>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 pb-24 pt-12 sm:px-6">
        <AnimatedSection>
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">
                Seja bem-vindo
              </p>
              <h1 className="text-4xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-5xl">
                Uma igreja para toda a família em Braga, com fé, amor e propósito.
              </h1>
              <p className="text-base text-slate-600 dark:text-slate-300 sm:text-lg">
                Conecte-se a uma comunidade vibrante, participe dos cultos semanais e descubra a
                visão que transforma vidas.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#agenda"
                  className="rounded-full bg-brand-indigo px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
                >
                  Ver agenda
                </Link>
                <Link
                  href="#contato"
                  className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 dark:border-slate-700 dark:text-slate-200"
                >
                  Falar com a igreja
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {schedule.map((item) => (
                  <div
                    key={item.day}
                    className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm transition hover:-translate-y-1 dark:border-slate-800/70 dark:bg-slate-900/70"
                  >
                    <p className="text-sm font-medium text-brand-indigo">{item.day}</p>
                    <p className="text-2xl font-semibold text-slate-900 dark:text-white">
                      {item.time}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-soft dark:border-slate-800/70 dark:bg-slate-900/70">
              <SectionHeader title="Pastores & Liderança">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                  Liderança com visão, cuidado e propósito.
                </h2>
              </SectionHeader>
              <div className="mt-6 grid gap-4">
                {leadership.map((leader) => (
                  <div
                    key={leader.name}
                    className="flex items-center gap-4 rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm transition hover:-translate-y-1 dark:border-slate-800/70 dark:bg-slate-950/70"
                  >
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      width={72}
                      height={72}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-base font-semibold text-slate-900 dark:text-white">
                        {leader.name}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{leader.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div id="agenda" className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div className="space-y-4">
              <SectionHeader title="Eventos & Agenda">
                <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
                  Calendário dinâmico para toda a comunidade.
                </h2>
              </SectionHeader>
              <p className="text-base text-slate-600 dark:text-slate-300">
                Consulte nossos encontros semanais, programações mensais e eventos anuais.
              </p>
              <div className="flex flex-wrap gap-3">
                {Object.keys(events).map((key) => (
                  <span
                    key={key}
                    className="rounded-full border border-brand-indigo/30 bg-brand-sky px-4 py-2 text-xs font-semibold uppercase tracking-widest text-brand-indigo dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    {key}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[...events.weekly, ...events.monthly, ...events.yearly].map((event) => (
                <div
                  key={event.title}
                  className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-sm transition hover:-translate-y-1 dark:border-slate-800/70 dark:bg-slate-900/70"
                >
                  <p className="text-sm font-semibold text-brand-indigo">{event.title}</p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">
                    {event.date}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{event.focus}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div id="historia" className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <SectionHeader title="Nossa história">
                <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
                  Uma jornada de fé que transforma Braga.
                </h2>
              </SectionHeader>
              <div className="grid gap-4">
                {history.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/70"
                  >
                    <p className="text-sm font-semibold text-brand-indigo">{item.title}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-soft dark:border-slate-800/70 dark:bg-slate-900/70">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">
                Impacto
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                Histórias que nos inspiram.
              </h3>
              <div className="mt-6 space-y-4">
                {testimonials.map((item) => (
                  <div
                    key={item.name}
                    className="rounded-2xl border border-white/60 bg-white/70 p-4 text-sm text-slate-600 shadow-sm dark:border-slate-800/70 dark:bg-slate-950/70 dark:text-slate-300"
                  >
                    <p className="font-semibold text-slate-900 dark:text-white">{item.name}</p>
                    <p>{item.story}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div id="departamentos" className="space-y-8">
            <SectionHeader title="Departamentos">
              <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
                Cuidado pastoral em todas as fases da vida.
              </h2>
            </SectionHeader>
            <div className="grid gap-4 md:grid-cols-3">
              {departments.map((department) => (
                <div
                  key={department.name}
                  className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-sm transition hover:-translate-y-1 dark:border-slate-800/70 dark:bg-slate-900/70"
                >
                  <p className="text-sm font-semibold text-brand-indigo">{department.name}</p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">
                    {department.leader}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {department.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]" id="contato">
            <div className="space-y-4">
              <SectionHeader title="Localização">
                <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
                  Estamos prontos para receber você.
                </h2>
              </SectionHeader>
              <p className="text-base text-slate-600 dark:text-slate-300">
                Rua da Esperança, 120 - Braga, Portugal.
              </p>
              <div className="rounded-2xl border border-white/60 bg-white/80 p-4 text-sm text-slate-600 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/70 dark:text-slate-300">
                <p className="font-semibold text-slate-900 dark:text-white">Contato direto</p>
                <p>+351 912 345 678</p>
                <p>contato@verbodavidabraga.pt</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl border border-white/60 shadow-soft dark:border-slate-800/70">
              <iframe
                title="Mapa Verbo da Vida Braga"
                src="https://maps.google.com/maps?q=braga%20portugal&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="h-72 w-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div
            id="doacoes"
            className="grid gap-8 rounded-3xl border border-white/60 bg-white/80 p-8 shadow-soft dark:border-slate-800/70 dark:bg-slate-900/70 lg:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="space-y-4">
              <SectionHeader title="Apoie a visão">
                <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
                  Contribua para alcançarmos mais famílias.
                </h2>
              </SectionHeader>
              <p className="text-base text-slate-600 dark:text-slate-300">
                Sua contribuição sustenta projetos sociais, missões e a expansão do evangelho.
              </p>
              <button className="rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5">
                Quero apoiar
              </button>
            </div>
            <div className="grid gap-4">
              <div className="rounded-2xl border border-brand-gold/30 bg-brand-sage/40 p-5 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                <p className="font-semibold">Transparência</p>
                <p>Relatórios mensais disponíveis para a comunidade.</p>
              </div>
              <div className="rounded-2xl border border-brand-gold/30 bg-brand-sky/40 p-5 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                <p className="font-semibold">Projetos ativos</p>
                <p>Missões, apoio familiar e formação pastoral.</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      <footer className="border-t border-white/60 bg-white/80 py-10 dark:border-slate-800/70 dark:bg-slate-950/80">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Verbo da Vida Braga
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Igreja cristã dedicada à Palavra e ao amor.
            </p>
          </div>
          <Link
            href="/admin"
            className="text-sm font-semibold text-brand-indigo transition hover:-translate-y-0.5"
          >
            Acessar painel administrativo
          </Link>
        </div>
      </footer>

      <Link
        href="https://wa.me/351912345678"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-soft transition hover:-translate-y-1"
        aria-label="Fale conosco pelo WhatsApp"
      >
        <span className="text-xl">💬</span>
      </Link>
    </main>
  );
}
