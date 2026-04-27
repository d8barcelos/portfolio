"use client";

import Link from "next/link";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { getPortfolio, type Project } from "@/data/portfolio";
import { useLocale } from "@/hooks/use-locale";

export function Projects() {
  const { locale, t } = useLocale();
  const { projects } = getPortfolio(locale);

  return (
    <Section id="projects" aria-label={t.sections.projects.label}>
      <SectionHeading
        index={t.sections.projects.index}
        label={t.sections.projects.label}
        title={t.sections.projects.title}
        description={t.sections.projects.description}
      />

      <ul className="grid gap-5 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </ul>
    </Section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const { t } = useLocale();
  const tagText = project.featured ? t.sections.projects.featured : t.sections.projects.lab;

  return (
    <li className="group relative">
      <Link
        href={`/projects/${project.slug}`}
        className="relative block h-full overflow-hidden rounded-xl border border-border/70 bg-card/40 p-6 transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:bg-card/70 focus-visible:-translate-y-0.5 focus-visible:border-accent"
        aria-label={t.sections.projects.cardAria(project.title)}
      >
        <div className="pointer-events-none absolute inset-x-0 -top-24 h-40 bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.18),transparent_60%)] opacity-0 transition-opacity group-hover:opacity-100" />

        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {project.year} · {tagText}
            </p>
            <h3 className="text-lg font-semibold tracking-tight">
              {project.title}
            </h3>
            <p className="mt-1 font-mono text-xs text-accent/80">
              {project.tagline}
            </p>
          </div>
          <ArrowUpRight
            className="size-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
            aria-hidden
          />
        </div>

        <p className="mt-4 text-sm text-muted-foreground text-pretty">
          {project.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded border border-border/70 bg-background/60 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center gap-3 border-t border-border/60 pt-4 text-xs text-muted-foreground">
          {project.repo && (
            <span className="inline-flex items-center gap-1.5">
              <Github className="size-3.5" aria-hidden /> {t.sections.projects.source}
            </span>
          )}
          {project.demo && (
            <span className="inline-flex items-center gap-1.5">
              <ExternalLink className="size-3.5" aria-hidden /> {t.sections.projects.demo}
            </span>
          )}
          <span className="ml-auto font-mono text-accent opacity-0 transition-opacity group-hover:opacity-100">
            {t.sections.projects.readCaseStudy}
          </span>
        </div>
      </Link>
    </li>
  );
}
