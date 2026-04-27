"use client";

import { useLocale } from "@/hooks/use-locale";
import { cn } from "@/lib/utils";

export function LocaleToggle() {
  const { locale, setLocale } = useLocale();
  const next = locale === "en" ? "pt" : "en";

  return (
    <button
      type="button"
      onClick={() => setLocale(next)}
      aria-label={
        next === "pt" ? "Mudar para português" : "Switch to English"
      }
      className="inline-flex h-9 items-center gap-1 rounded-md px-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
    >
      <span
        aria-hidden
        className={cn(
          "px-1 transition-colors",
          locale === "en" ? "text-accent" : "text-muted-foreground/60",
        )}
      >
        en
      </span>
      <span aria-hidden className="text-muted-foreground/40">
        ·
      </span>
      <span
        aria-hidden
        className={cn(
          "px-1 transition-colors",
          locale === "pt" ? "text-accent" : "text-muted-foreground/60",
        )}
      >
        pt
      </span>
    </button>
  );
}
