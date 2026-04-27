"use client";

import { GraduationCap, MapPin, Radio } from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { useLocale } from "@/hooks/use-locale";
import { getPortfolio } from "@/data/portfolio";
import { getNowStatus } from "@/data/now";

export function About() {
  const { locale, t } = useLocale();
  const { about, education, identity } = getPortfolio(locale);
  const nowStatus = getNowStatus(locale);

  return (
    <Section id="about" aria-label={t.sections.about.label}>
      <SectionHeading
        index={t.sections.about.index}
        label={t.sections.about.label}
        title={t.sections.about.title}
      />

      <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {about.map((paragraph, i) => (
            <p key={i}>
              <span className="text-foreground">{paragraph.slice(0, 1)}</span>
              {paragraph.slice(1)}
            </p>
          ))}
        </div>

        <aside className="space-y-6">
          <div className="rounded-lg border border-border/70 bg-card/40 p-5 backdrop-blur-sm">
            <h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              <Radio className="size-3.5 text-accent" aria-hidden />
              {t.about.nowLabel}
            </h3>
            <ul className="space-y-2 font-mono text-sm">
              {nowStatus.map((n) => (
                <li key={n.label} className="flex flex-col gap-0.5">
                  <span className="text-xs text-muted-foreground">
                    {n.label}
                  </span>
                  <span className="text-foreground">{n.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-border/70 bg-card/40 p-5 backdrop-blur-sm">
            <h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              <GraduationCap className="size-3.5 text-accent" aria-hidden />
              {t.about.educationLabel}
            </h3>
            <ul className="space-y-3">
              {education.map((e) => (
                <li key={e.school} className="text-sm">
                  <p className="font-medium text-foreground">{e.school}</p>
                  <p className="text-muted-foreground">{e.degree}</p>
                  <p className="font-mono text-xs text-muted-foreground/80">
                    {e.start} — {e.end}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <MapPin className="size-3.5" aria-hidden />
            {identity.location}
          </div>
        </aside>
      </div>
    </Section>
  );
}
