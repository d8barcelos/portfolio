"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, FileText, Sparkles } from "lucide-react";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { SocialLinks } from "@/components/social-links";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/use-locale";
import { getPortfolio } from "@/data/portfolio";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const { locale, t } = useLocale();
  const { identity } = getPortfolio(locale);

  const stagger = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[92svh] items-center overflow-hidden pt-24 lg:pt-28"
      aria-label="Introduction"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50 mask-fade-b" />
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.035] mix-blend-overlay" />

      <div className="container relative">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16"
        >
          <div className="max-w-2xl">
            <motion.p
              variants={item}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              {t.hero.available}
            </motion.p>

            <motion.h1
              variants={item}
              className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
            >
              {identity.name}
              <span className="block font-mono text-base font-normal text-muted-foreground sm:text-lg">
                {"// "}
                {identity.role.toLowerCase()}
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {identity.positioning}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button asChild size="lg">
                <a href={`mailto:${identity.email}`}>
                  {t.hero.cta.contact}
                  <ArrowUpRight />
                </a>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <a href={identity.socials.resume} target="_blank" rel="noreferrer">
                  <FileText />
                  {t.hero.cta.resume}
                </a>
              </Button>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-8 flex items-center gap-4"
            >
              <SocialLinks />
              <span className="h-4 w-px bg-border" />
              <button
                type="button"
                data-cmdk-trigger
                className="group inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                aria-label={t.header.paletteAria}
              >
                <Sparkles className="size-3.5 text-accent" />
                <span>{t.hero.paletteHint}</span>
                <kbd className="kbd">⌘</kbd>
                <kbd className="kbd">K</kbd>
              </button>
            </motion.div>
          </div>

          <motion.div variants={item} className="relative">
            <ArchitectureDiagram />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
