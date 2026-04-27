"use client";

import { useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Section, SectionHeading } from "@/components/section";
import { getPortfolio, type Experience as ExperienceItem } from "@/data/portfolio";
import { useLocale } from "@/hooks/use-locale";
import { formatPeriod } from "@/lib/dates";
import { cn } from "@/lib/utils";

export function Experience() {
  const { locale, t } = useLocale();
  const { experience } = getPortfolio(locale);

  return (
    <Section id="experience" aria-label={t.sections.experience.label}>
      <SectionHeading
        index={t.sections.experience.index}
        label={t.sections.experience.label}
        title={t.sections.experience.title}
        description={t.sections.experience.description}
      />

      <ol className="relative space-y-4 border-l border-border/60 pl-6 sm:pl-8">
        {experience.map((item, i) => (
          <TimelineItem key={item.company} item={item} defaultOpen={i === 0} />
        ))}
      </ol>
    </Section>
  );
}

function TimelineItem({
  item,
  defaultOpen,
}: {
  item: ExperienceItem;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const { locale, t } = useLocale();
  const id = `exp-${item.company.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <li className="relative">
      <span
        className={cn(
          "absolute -left-[27px] top-4 flex size-3 items-center justify-center sm:-left-[35px]",
        )}
        aria-hidden
      >
        <span
          className={cn(
            "size-2 rounded-full ring-4 ring-background",
            item.current ? "bg-accent" : "bg-muted-foreground/50",
          )}
        />
        {item.current && (
          <span className="absolute size-3 animate-ping rounded-full bg-accent opacity-40" />
        )}
      </span>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={id}
        className="group block w-full rounded-lg border border-border/60 bg-card/40 p-5 text-left transition-all hover:border-accent/50 hover:bg-card/70"
      >
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">
              {item.role}
              <span className="text-muted-foreground"> @ </span>
              <span className="text-accent">{item.company}</span>
              {item.via && (
                <span className="font-mono text-xs text-muted-foreground">
                  {" "}
                  ({t.sections.experience.via} {item.via})
                </span>
              )}
            </h3>
            <p className="mt-1 flex items-center gap-3 font-mono text-xs text-muted-foreground">
              <span>{formatPeriod(item.start, item.end, locale)}</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3" aria-hidden />
                {item.location}
              </span>
            </p>
          </div>
          <ChevronDown
            className={cn(
              "mt-1 size-4 text-muted-foreground transition-transform",
              open && "rotate-180",
            )}
            aria-hidden
          />
        </div>

        <ul className="mt-3 flex flex-wrap gap-1.5">
          {item.stack.map((tech) => (
            <li
              key={tech}
              className="rounded border border-border/70 bg-background/60 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
            >
              {tech}
            </li>
          ))}
        </ul>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={id}
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {item.highlights.map((h, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      className="mt-2 size-1 shrink-0 rounded-full bg-accent"
                      aria-hidden
                    />
                    <span className="text-pretty">{h}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </li>
  );
}
