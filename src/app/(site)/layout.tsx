import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-sky via-white to-brand-lavender dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-4 pb-24 pt-12 sm:px-6">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
