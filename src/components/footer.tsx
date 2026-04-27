"use client";

import Link from "next/link";
import { useLocale } from "@/hooks/use-locale";
import { getPortfolio } from "@/data/portfolio";

export function Footer() {
  const year = new Date().getFullYear();
  const { locale, t } = useLocale();
  const { identity } = getPortfolio(locale);

  return (
    <footer className="border-t border-border/60 py-10">
      <div className="container flex flex-col gap-4 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="text-foreground">{identity.name}</span>
          <span className="mx-2 text-accent">/</span>
          <span>{`© ${year}`}</span>
        </p>
        <nav
          aria-label="Secondary"
          className="flex flex-wrap items-center gap-3"
        >
          <Link
            href="/uses"
            className="underline-offset-4 hover:text-accent hover:underline"
          >
            /uses
          </Link>
          <span className="text-border">·</span>
          <a
            href={identity.socials.github}
            target="_blank"
            rel="noreferrer"
            className="underline-offset-4 hover:text-accent hover:underline"
          >
            {t.footer.viewSource}
          </a>
          <span className="text-border">·</span>
          <span>{t.footer.builtWith}</span>
        </nav>
      </div>
    </footer>
  );
}
