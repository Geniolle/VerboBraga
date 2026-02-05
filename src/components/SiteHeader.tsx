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
    <header className="sticky top-0 z-40 border-b border-white/40 bg-white/80 backdrop-blur dark:border-slate-800/60 dark:bg-slate-950/80">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-wide text-brand-indigo">
          Verbo da Vida Braga
        </Link>
        <div className="ml-auto flex items-center gap-6">
          <nav className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600 sm:text-sm md:gap-6 dark:text-slate-300">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
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
