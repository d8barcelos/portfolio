"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Cpu,
  Keyboard,
  MonitorSmartphone,
  Terminal,
  Wrench,
} from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import { cn } from "@/lib/utils";

export default function UsesPage() {
  const { t } = useLocale();
  const s = t.uses.sections;

  const sections = [
    { ...s.hardware, icon: Cpu, note: undefined as string | undefined },
    { ...s.editor, icon: MonitorSmartphone, note: s.editor.note },
    { ...s.terminal, icon: Terminal, note: undefined as string | undefined },
    { ...s.keyboard, icon: Keyboard, note: undefined as string | undefined },
    { ...s.daily, icon: Wrench, note: undefined as string | undefined },
  ];

  return (
    <main id="main" className="relative pb-24 pt-28">
      <div className="container max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          {t.uses.backLink}
        </Link>

        <header className="mb-12 border-b border-border/60 pb-8">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <span className="text-accent">/uses</span>
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            {t.uses.title}
          </h1>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            {t.uses.intro.lead}
            <a
              href="https://uses.tech"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              uses.tech
            </a>
            {t.uses.intro.suffix}
          </p>
        </header>

        <div className="space-y-10">
          {sections.map(({ title, icon: Icon, note, items }) => (
            <section key={title}>
              <h2 className="mb-1 flex items-center gap-2 text-xl font-semibold tracking-tight">
                <Icon className="size-4 text-accent" aria-hidden />
                {title}
              </h2>
              {note && (
                <p className="mb-4 text-sm text-muted-foreground">{note}</p>
              )}
              <dl
                className={cn(
                  "grid gap-x-6 gap-y-2 rounded-lg border border-border/60 bg-card/30 p-5",
                  "sm:grid-cols-[140px_1fr]",
                )}
              >
                {items.map((item) => (
                  <div
                    key={item.label}
                    className="contents font-mono text-sm"
                  >
                    <dt className="text-muted-foreground">{item.label}</dt>
                    <dd className="text-foreground">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
