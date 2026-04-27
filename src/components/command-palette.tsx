"use client";

import { Command } from "cmdk";
import * as Dialog from "@radix-ui/react-dialog";
import { useTheme } from "next-themes";
import {
  Copy,
  FileText,
  Github,
  Globe,
  Keyboard,
  Linkedin,
  Mail,
  Moon,
  Navigation,
  Sun,
  Terminal,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useHackerMode } from "@/hooks/use-hacker-mode";
import { useLocale } from "@/hooks/use-locale";
import { getPortfolio } from "@/data/portfolio";
import { navItems } from "@/data/nav";

type PaletteAction = {
  id: string;
  label: string;
  hint?: string;
  Icon: LucideIcon;
  keywords?: readonly string[];
  onSelect: () => void;
};

type CommandPaletteProps = {
  onRequestShortcuts: () => void;
};

export function CommandPalette({ onRequestShortcuts }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const hacker = useHackerMode();
  const { locale, t, toggle: toggleLocale } = useLocale();
  const { identity } = getPortfolio(locale);
  const nextLocale = locale === "en" ? "pt" : "en";

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isK = e.key === "k" || e.key === "K";
      if (isK && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      if (target.closest("[data-cmdk-trigger]")) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const run = useCallback(
    (fn: () => void) => {
      close();
      window.setTimeout(fn, 30);
    },
    [close],
  );

  const navActions: PaletteAction[] = navItems.map((n) => ({
    id: `nav-${n.id}`,
    label: t.palette.goTo(t.nav[n.id]),
    hint: `#${n.id}`,
    Icon: Navigation,
    keywords: ["jump", "section", n.id, t.nav[n.id].toLowerCase()],
    onSelect: () =>
      run(() => {
        document
          .getElementById(n.id)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }),
  }));

  const generalActions: PaletteAction[] = [
    {
      id: "theme-toggle",
      label:
        resolvedTheme === "dark" ? t.palette.themeToLight : t.palette.themeToDark,
      Icon: resolvedTheme === "dark" ? Sun : Moon,
      keywords: ["theme", "dark", "light", "toggle", "tema", "claro", "escuro"],
      onSelect: () =>
        run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark")),
    },
    {
      id: "locale-toggle",
      label: t.palette.switchLocale(nextLocale),
      hint: `${locale} → ${nextLocale}`,
      Icon: Globe,
      keywords: [
        "language",
        "locale",
        "idioma",
        "português",
        "english",
        "pt",
        "en",
        "translate",
        "tradução",
      ],
      onSelect: () => run(() => toggleLocale()),
    },
    {
      id: "hacker-mode",
      label: hacker.enabled ? t.palette.hackerDisable : t.palette.hackerEnable,
      hint: t.palette.hackerHint,
      Icon: Terminal,
      keywords: ["terminal", "crt", "vt220", "retro", "green", "modo"],
      onSelect: () => run(() => hacker.toggle()),
    },
    {
      id: "copy-email",
      label: t.palette.copyEmail,
      hint: identity.email,
      Icon: Copy,
      keywords: ["email", "contact", "clipboard", "contato", "copiar"],
      onSelect: () =>
        run(() => {
          void navigator.clipboard?.writeText(identity.email);
        }),
    },
    {
      id: "email-me",
      label: t.palette.emailMe,
      hint: identity.email,
      Icon: Mail,
      keywords: ["email", "contact", "mailto", "contato"],
      onSelect: () =>
        run(() => window.open(`mailto:${identity.email}`, "_self")),
    },
    {
      id: "resume",
      label: t.palette.openResume,
      hint: t.palette.resumeHint,
      Icon: FileText,
      keywords: ["cv", "resume", "pdf", "curriculum", "currículo"],
      onSelect: () =>
        run(() => window.open(identity.socials.resume, "_blank", "noopener")),
    },
    {
      id: "github",
      label: t.palette.openGithub,
      hint: "d8barcelos",
      Icon: Github,
      keywords: ["source", "code", "repositories", "código", "repositórios"],
      onSelect: () =>
        run(() => window.open(identity.socials.github, "_blank", "noopener")),
    },
    {
      id: "linkedin",
      label: t.palette.openLinkedin,
      hint: "diogo-barcelos",
      Icon: Linkedin,
      keywords: ["linkedin", "social", "network"],
      onSelect: () =>
        run(() => window.open(identity.socials.linkedin, "_blank", "noopener")),
    },
    {
      id: "uses",
      label: t.palette.openUses,
      hint: t.palette.usesHint,
      Icon: Wrench,
      keywords: ["uses", "gear", "setup", "tools", "hardware", "ferramentas"],
      onSelect: () => run(() => window.location.assign("/uses")),
    },
    {
      id: "shortcuts",
      label: t.palette.shortcuts,
      hint: "?",
      Icon: Keyboard,
      keywords: ["keyboard", "shortcuts", "help", "atalhos", "teclado"],
      onSelect: () => run(() => onRequestShortcuts()),
    },
  ];

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[98] bg-background/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="fixed left-1/2 top-[12vh] z-[99] w-[min(640px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-popover shadow-2xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">{t.header.paletteAria}</Dialog.Title>

          <Command label={t.header.paletteAria} loop>
            <div className="flex items-center gap-2 border-b border-border px-4">
              <span className="font-mono text-xs text-accent">❯</span>
              <Command.Input
                placeholder={t.palette.placeholder}
                className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                autoFocus
              />
              <kbd className="kbd">esc</kbd>
            </div>

            <Command.List className="max-h-[60vh] overflow-y-auto p-2">
              <Command.Empty className="p-6 text-center font-mono text-sm text-muted-foreground">
                {t.palette.empty.prefix}
                <span className="text-accent">hacker</span>,{" "}
                <span className="text-accent">projects</span>
                {t.palette.empty.suffix}
              </Command.Empty>

              <Group heading={t.palette.groupNav}>
                {navActions.map((a) => (
                  <Item key={a.id} action={a} />
                ))}
              </Group>

              <Group heading={t.palette.groupActions}>
                {generalActions.map((a) => (
                  <Item key={a.id} action={a} />
                ))}
              </Group>
            </Command.List>

            <div className="flex items-center justify-between border-t border-border px-3 py-2 font-mono text-[10px] text-muted-foreground">
              <span className="flex items-center gap-2">
                <kbd className="kbd">↑</kbd>
                <kbd className="kbd">↓</kbd>
                {t.palette.footHints.navigate}
              </span>
              <span className="flex items-center gap-2">
                <kbd className="kbd">↵</kbd>
                {t.palette.footHints.run}
              </span>
              <span className="flex items-center gap-2">
                <kbd className="kbd">⌘K</kbd>
                {t.palette.footHints.toggle}
              </span>
            </div>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Group({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <Command.Group
      heading={heading}
      className="mb-1 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground"
    >
      {children}
    </Command.Group>
  );
}

function Item({ action }: { action: PaletteAction }) {
  const { id, label, hint, Icon, keywords, onSelect } = action;
  return (
    <Command.Item
      value={`${label} ${keywords?.join(" ") ?? ""}`}
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-foreground data-[selected=true]:bg-muted data-[selected=true]:text-accent"
      data-id={id}
    >
      <Icon className="size-4 text-muted-foreground" aria-hidden />
      <span className="flex-1">{label}</span>
      {hint && (
        <span className="font-mono text-[10px] text-muted-foreground">
          {hint}
        </span>
      )}
    </Command.Item>
  );
}
