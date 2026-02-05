import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  {
    label: "Quem somos",
    href: "/",
    icon: (
      <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h18" />
        <path d="M4 6h16" />
        <path d="M6 18h12" />
      </svg>
    )
  },
  {
    label: "Departamentos",
    href: "/departamentos",
    icon: (
      <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h7v6H4z" />
        <path d="M13 6h7v6h-7z" />
        <path d="M4 14h7v6H4z" />
        <path d="M13 14h7v6h-7z" />
      </svg>
    )
  },
  {
    label: "Centro de Cura",
    href: "/centro-de-cura",
    icon: (
      <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.6-7 10-7 10Z" />
      </svg>
    )
  },
  {
    label: "Jovens",
    href: "/jovens",
    icon: (
      <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z" />
      </svg>
    )
  }
];

export function SiteHeader() {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/40 bg-white/85 backdrop-blur dark:border-slate-800/60 dark:bg-slate-950/80">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold text-brand-ink dark:text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-indigo/20 text-sm font-bold text-brand-indigo">
            VB
          </span>
          Verbo da Vida Braga
        </Link>
        <div className="ml-auto flex items-center gap-6">
          <nav className="hidden items-center gap-4 text-xs font-medium text-slate-700 sm:text-sm md:flex md:gap-6 dark:text-slate-300">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 rounded-full px-3 py-1 hover:text-brand-indigo"
              >
                <span className="text-brand-indigo">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
      <nav className="md:hidden">
        <div className="fixed bottom-4 left-4 right-4 z-40 animate-float-in rounded-2xl border border-white/60 bg-white/90 px-4 py-3 shadow-soft backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/90">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 dark:text-slate-200">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-1 transition hover:text-brand-indigo"
              >
                <span className="text-brand-indigo">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
