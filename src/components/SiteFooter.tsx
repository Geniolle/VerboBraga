export function SiteFooter() {
  return (
    <footer className="border-t border-white/60 bg-white/80 py-10 dark:border-slate-800/70 dark:bg-slate-950/80">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 text-sm text-slate-600 sm:px-6 md:flex-row md:items-center md:justify-between dark:text-slate-300">
        <div>
          <p className="font-semibold text-slate-900 dark:text-white">Verbo da Vida Braga</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Igreja cristã dedicada à Palavra e ao cuidado das pessoas.
          </p>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} Verbo da Vida Braga
        </p>
      </div>
    </footer>
  );
}
