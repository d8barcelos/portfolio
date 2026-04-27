"use client";

import { type ReactNode } from "react";
import { Section, SectionHeading } from "@/components/section";
import { useLocale } from "@/hooks/use-locale";

export function Activity({ children }: { children: ReactNode }) {
  const { t } = useLocale();
  return (
    <Section id="activity" aria-label={t.sections.activity.label}>
      <SectionHeading
        index={t.sections.activity.index}
        label={t.sections.activity.label}
        title={t.sections.activity.title}
        description={t.sections.activity.description}
      />
      {children}
    </Section>
  );
}

export function HeatmapSkeleton() {
  return (
    <div className="h-48 animate-pulse rounded-xl border border-border/70 bg-card/30" />
  );
}
