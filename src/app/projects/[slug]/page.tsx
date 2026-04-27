import type { ComponentType } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { getPortfolio, projects } from "@/data/portfolio";
import { ui, type Locale } from "@/lib/i18n";

type Params = { slug: string };

type MDXModule = { default: ComponentType };

const contentMap: Record<string, Record<Locale, () => Promise<MDXModule>>> = {
  "dotnet-rpg-game": {
    en: () => import("@/content/projects/dotnet-rpg-game.mdx"),
    pt: () => import("@/content/projects/dotnet-rpg-game.pt.mdx"),
  },
  "requests-api": {
    en: () => import("@/content/projects/requests-api.mdx"),
    pt: () => import("@/content/projects/requests-api.pt.mdx"),
  },
};

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Case study`,
    description: project.tagline,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const enProject = projects.find((p) => p.slug === slug);
  const ptProject = getPortfolio("pt").projects.find((p) => p.slug === slug);
  const loaders = contentMap[slug];
  if (!enProject || !ptProject || !loaders) notFound();

  const [enMdx, ptMdx] = await Promise.all([loaders.en(), loaders.pt()]);
  const EnContent = enMdx.default;
  const PtContent = ptMdx.default;

  return (
    <main id="main" className="relative pb-24 pt-28">
      <article className="container max-w-3xl">
        <Link
          href="/#projects"
          className="mb-8 inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          <span data-locale-content="en">{ui.en.project.backLink}</span>
          <span data-locale-content="pt">{ui.pt.project.backLink}</span>
        </Link>

        <header className="mb-10 border-b border-border/60 pb-8">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <span className="text-accent" data-locale-content="en">
              {ui.en.project.caseStudyTag}
            </span>
            <span className="text-accent" data-locale-content="pt">
              {ui.pt.project.caseStudyTag}
            </span>
            <span className="mx-2 text-border">·</span>
            <span>{enProject.year}</span>
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            {enProject.title}
          </h1>
          <p className="mt-4 text-pretty text-lg text-muted-foreground" data-locale-content="en">
            {enProject.description}
          </p>
          <p className="mt-4 text-pretty text-lg text-muted-foreground" data-locale-content="pt">
            {ptProject.description}
          </p>

          <ul className="mt-6 flex flex-wrap gap-1.5">
            {enProject.stack.map((tech) => (
              <li
                key={tech}
                className="rounded border border-border/70 bg-background/60 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-3 font-mono text-xs">
            {enProject.repo && (
              <a
                href={enProject.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-background/60 px-3 py-1.5 text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
              >
                <Github className="size-3.5" aria-hidden />
                <span data-locale-content="en">{ui.en.project.sourceOnGithub}</span>
                <span data-locale-content="pt">{ui.pt.project.sourceOnGithub}</span>
              </a>
            )}
            {enProject.demo && (
              <a
                href={enProject.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-background/60 px-3 py-1.5 text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
              >
                <ExternalLink className="size-3.5" aria-hidden />
                <span data-locale-content="en">{ui.en.project.liveDemo}</span>
                <span data-locale-content="pt">{ui.pt.project.liveDemo}</span>
              </a>
            )}
          </div>
        </header>

        <div className="prose prose-invert prose-zinc max-w-none prose-headings:tracking-tight prose-headings:text-foreground prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:rounded prose-code:border prose-code:border-border prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:text-[0.9em] prose-code:font-mono prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:overflow-x-auto prose-pre:rounded-lg prose-pre:border prose-pre:border-border/70 prose-pre:bg-card/60 prose-pre:p-4 prose-pre:font-mono prose-pre:text-xs prose-pre:leading-5 prose-pre:text-muted-foreground">
          <div data-locale-content="en">
            <EnContent />
          </div>
          <div data-locale-content="pt">
            <PtContent />
          </div>
        </div>
      </article>
    </main>
  );
}
