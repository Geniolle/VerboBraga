import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-b from-brand-sky via-white to-brand-lavender dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
      <div className="pointer-events-none absolute -right-24 top-[-120px] h-[320px] w-[320px] rounded-full bg-brand-indigo/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-[260px] w-[260px] rounded-full bg-brand-sky/60 blur-3xl dark:bg-brand-indigo/10" />
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-4 pb-24 pt-24 sm:px-6 sm:pt-28">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
