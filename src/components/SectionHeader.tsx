import type { ReactNode } from "react";

export function SectionHeader({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-indigo">
        {title}
      </p>
      {children}
    </div>
  );
}
