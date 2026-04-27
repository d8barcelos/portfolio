"use client";

import { useCallback, useState } from "react";
import { HackerModeProvider, useHackerMode } from "@/hooks/use-hacker-mode";
import { useKeyboardNav } from "@/hooks/use-keyboard-nav";
import { LocaleProvider } from "@/hooks/use-locale";
import { CommandPalette } from "@/components/command-palette";
import { HackerShell } from "@/components/hacker-shell";
import { HackerBoot } from "@/components/hacker-boot";
import { ShortcutsDialog } from "@/components/shortcuts-dialog";

function AppShellInner({ children }: { children: React.ReactNode }) {
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const hacker = useHackerMode();

  const openShortcuts = useCallback(() => setShortcutsOpen(true), []);

  useKeyboardNav({
    onRequestShortcuts: openShortcuts,
    onKonami: () => hacker.enable(),
  });

  return (
    <>
      {children}
      <CommandPalette onRequestShortcuts={openShortcuts} />
      <ShortcutsDialog open={shortcutsOpen} onOpenChange={setShortcutsOpen} />
      <HackerBoot />
      <HackerShell />
    </>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <HackerModeProvider>
        <AppShellInner>{children}</AppShellInner>
      </HackerModeProvider>
    </LocaleProvider>
  );
}
