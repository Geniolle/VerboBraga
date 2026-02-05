"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = stored ? stored === "dark" : prefersDark;
    setIsDark(shouldUseDark);
    document.body.classList.toggle("dark", shouldUseDark);
  }, []);

  const toggle = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.body.classList.toggle("dark", next);
      window.localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200"
      aria-pressed={isDark}
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      title={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
    >
      {isDark ? (
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1Z" />
          <path d="M12 18a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1Z" />
          <path d="M4 11a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Z" />
          <path d="M17 11a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1Z" />
          <path d="M5.6 5.6a1 1 0 0 1 1.4 0l1.4 1.4a1 1 0 1 1-1.4 1.4L5.6 7a1 1 0 0 1 0-1.4Z" />
          <path d="M15.6 15.6a1 1 0 0 1 1.4 0l1.4 1.4a1 1 0 1 1-1.4 1.4l-1.4-1.4a1 1 0 0 1 0-1.4Z" />
          <path d="M5.6 18.4a1 1 0 0 1 0-1.4L7 15.6a1 1 0 0 1 1.4 1.4L7 18.4a1 1 0 0 1-1.4 0Z" />
          <path d="M15.6 8.4a1 1 0 0 1 0-1.4L17 5.6a1 1 0 0 1 1.4 1.4L17 8.4a1 1 0 0 1-1.4 0Z" />
          <circle cx="12" cy="12" r="3.5" />
        </svg>
      ) : (
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.3 14.9A8 8 0 0 1 9.1 3.7a1 1 0 0 1 1.2-1.2 8 8 0 1 0 9.8 9.8 1 1 0 0 1 1.2 1.2Z" />
        </svg>
      )}
    </button>
  );
}
