"use client";

import { useEffect, useState } from "react";
import { Command } from "lucide-react";
import { navItems } from "@/data/nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleToggle } from "@/components/locale-toggle";
import { useLocale } from "@/hooks/use-locale";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLocale();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/70 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        <a
          href="#hero"
          className="group inline-flex items-center gap-2 font-mono text-sm font-medium"
        >
          <span className="inline-flex size-7 items-center justify-center rounded border border-border bg-background/60 text-accent transition-colors group-hover:border-accent/60">
            d8
          </span>
          <span className="hidden sm:inline text-muted-foreground">
            <span className="text-foreground">diogo</span>
            <span className="text-accent">.</span>
            <span>dev</span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1 font-mono text-xs">
            {navItems.slice(1).map((n) => (
              <li key={n.id}>
                <a
                  href={n.href}
                  className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <span className="text-accent/70">{n.key}</span>
                  <span>{t.nav[n.id].toLowerCase()}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            data-cmdk-trigger
            className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-background/60 px-2.5 font-mono text-xs text-muted-foreground transition-colors hover:border-accent/60 hover:text-foreground"
            aria-label={t.header.paletteAria}
          >
            <Command className="size-3.5" aria-hidden />
            <span className="hidden sm:inline">{t.header.paletteLabel}</span>
            <kbd className="kbd hidden sm:inline-flex">⌘K</kbd>
          </button>
          <LocaleToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
