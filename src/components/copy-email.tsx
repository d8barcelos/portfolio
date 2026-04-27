"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import { cn } from "@/lib/utils";

export function CopyEmail({
  email,
  className,
}: {
  email: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const { t } = useLocale();

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={t.copyEmail.aria(email)}
      className={cn(
        "inline-flex items-center gap-2 rounded-md border border-border bg-background/60 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-accent/60 hover:text-foreground",
        className,
      )}
    >
      {copied ? (
        <Check className="size-3.5 text-accent" aria-hidden />
      ) : (
        <Copy className="size-3.5" aria-hidden />
      )}
      <span>{copied ? t.copyEmail.copied : t.copyEmail.copy}</span>
    </button>
  );
}
