"use client";

import { Section, SectionHeading } from "@/components/section";
import { getPortfolio } from "@/data/portfolio";
import { useLocale } from "@/hooks/use-locale";

export function Skills() {
  const { locale, t } = useLocale();
  const { skills } = getPortfolio(locale);

  return (
    <Section id="skills" aria-label={t.sections.skills.label}>
      <SectionHeading
        index={t.sections.skills.index}
        label={t.sections.skills.label}
        title={t.sections.skills.title}
        description={t.sections.skills.description}
      />

      <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group) => (
          <div
            key={group.label}
            className="rounded-lg border border-border/60 bg-card/30 p-5 transition-colors hover:border-accent/40"
          >
            <dt className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              <span className="text-accent">#</span>
              {group.label}
            </dt>
            <dd>
              <ul className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-border/70 bg-background/60 px-2.5 py-1 font-mono text-xs text-foreground/90 transition-colors hover:border-accent/60 hover:text-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
