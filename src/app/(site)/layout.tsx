import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-brand-sky via-white to-brand-lavender dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-4 pb-24 pt-24 sm:px-6 sm:pt-28">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
