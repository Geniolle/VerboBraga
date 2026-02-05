import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { label: "Quem somos", href: "/" },
  { label: "Departamentos", href: "/departamentos" },
  { label: "Centro de Cura", href: "/centro-de-cura" },
  { label: "Jovens", href: "/jovens" }
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
          <nav className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-700 sm:text-sm md:gap-6 dark:text-slate-300">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-1 hover:text-brand-indigo"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
