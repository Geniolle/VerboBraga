"use client";

import { useState } from "react";
import Image from "next/image";
import { leaders, pastors } from "@/lib/content";

const tabs = [
  { id: "pastores", label: "Pastores" },
  { id: "lideres", label: "Líderes" }
] as const;

type TabId = (typeof tabs)[number]["id"];

export function PeopleTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("pastores");
  const people = activeTab === "pastores" ? pastors : leaders;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeTab === tab.id
                ? "bg-brand-indigo text-white shadow-soft"
                : "border border-slate-200 bg-white/80 text-slate-600 hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {people.map((person) => (
          <div
            key={person.name}
            className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-sm transition hover:-translate-y-1 dark:border-slate-800/70 dark:bg-slate-900/70"
          >
            <div className="flex items-center gap-4">
              <Image
                src={person.image}
                alt={person.name}
                width={72}
                height={72}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div>
                <p className="text-base font-semibold text-slate-900 dark:text-white">
                  {person.name}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{person.role}</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              {person.description}
            </p>
          </div>
        ))}
      </div>

      {activeTab === "lideres" ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Esta seção pode ser atualizada com líderes e ministérios específicos quando você definir os
          nomes e imagens.
        </p>
      ) : null}
    </div>
  );
}
