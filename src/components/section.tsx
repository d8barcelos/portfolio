import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = HTMLAttributes<HTMLElement> & {
  id: string;
  children: ReactNode;
};

export function Section({ id, className, children, ...rest }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 border-t border-border/60 py-20 sm:py-28",
        className,
      )}
      {...rest}
    >
      <div className="container">{children}</div>
    </section>
  );
}

type SectionHeadingProps = {
  index: string;
  label: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({
  index,
  label,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <header className={cn("mb-12 max-w-2xl", className)}>
      <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <span className="text-accent">{index}</span>
        <span className="h-px w-10 bg-border" />
        <span>{label}</span>
      </p>
      <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-pretty text-base text-muted-foreground">
          {description}
        </p>
      )}
    </header>
  );
}
