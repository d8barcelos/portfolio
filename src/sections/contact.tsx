"use client";

import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { CopyEmail } from "@/components/copy-email";
import { Button } from "@/components/ui/button";
import { getPortfolio } from "@/data/portfolio";
import { useLocale } from "@/hooks/use-locale";

export function Contact() {
  const { locale, t } = useLocale();
  const { identity } = getPortfolio(locale);

  const channels = [
    {
      label: "Email",
      value: identity.email,
      href: `mailto:${identity.email}`,
      Icon: Mail,
    },
    {
      label: "LinkedIn",
      value: "diogo-barcelos",
      href: identity.socials.linkedin,
      Icon: Linkedin,
    },
    {
      label: "GitHub",
      value: "d8barcelos",
      href: identity.socials.github,
      Icon: Github,
    },
  ] as const;

  return (
    <Section id="contact" aria-label={t.sections.contact.label}>
      <SectionHeading
        index={t.sections.contact.index}
        label={t.sections.contact.label}
        title={t.sections.contact.title}
        description={t.sections.contact.description}
      />

      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <div>
          <p className="text-pretty text-lg text-muted-foreground">
            {t.sections.contact.body}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <a href={`mailto:${identity.email}`}>
                {t.sections.contact.sendEmail}
                <ArrowUpRight />
              </a>
            </Button>
            <CopyEmail email={identity.email} />
          </div>
        </div>

        <ul className="space-y-2">
          {channels.map(({ label, value, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="group flex items-center justify-between gap-4 rounded-lg border border-border/70 bg-card/40 px-4 py-3 transition-colors hover:border-accent/60 hover:bg-card/70"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <Icon
                    className="size-4 shrink-0 text-muted-foreground group-hover:text-accent"
                    aria-hidden
                  />
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {label}
                    </span>
                    <span className="block truncate text-sm">{value}</span>
                  </span>
                </span>
                <ArrowUpRight
                  className="size-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  aria-hidden
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
