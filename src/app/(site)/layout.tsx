import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-b from-brand-sky via-white to-brand-lavender dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
      <div className="pointer-events-none absolute -right-40 top-[-180px] h-[520px] w-[520px] rounded-full bg-brand-indigo/30 blur-[120px]" />
      <div className="pointer-events-none absolute -left-32 bottom-[-80px] h-[420px] w-[420px] rounded-full bg-brand-sky/80 blur-[110px] dark:bg-brand-indigo/20" />
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-4 pb-32 pt-24 sm:px-6 sm:pt-28">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
