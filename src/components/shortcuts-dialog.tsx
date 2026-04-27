"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { navItems } from "@/data/nav";
import { useLocale } from "@/hooks/use-locale";

type Row = { keys: readonly string[]; label: string };

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ShortcutsDialog({ open, onOpenChange }: Props) {
  const { t } = useLocale();

  const shortcutGroups: { heading: string; rows: Row[] }[] = [
    {
      heading: t.shortcuts.groups.palette,
      rows: [
        { keys: ["⌘", "K"], label: t.shortcuts.rows.openPalette },
        { keys: ["?"], label: t.shortcuts.rows.openShortcuts },
        { keys: ["Esc"], label: t.shortcuts.rows.closeDialog },
      ],
    },
    {
      heading: t.shortcuts.groups.navigation,
      rows: [
        { keys: ["j"], label: t.shortcuts.rows.nextSection },
        { keys: ["k"], label: t.shortcuts.rows.prevSection },
        ...navItems.map<Row>((n) => ({
          keys: ["g", n.key],
          label: t.shortcuts.rows.jumpTo(t.nav[n.id]),
        })),
      ],
    },
    {
      heading: t.shortcuts.groups.hacker,
      rows: [
        { keys: ["`"], label: t.shortcuts.rows.toggleShell },
        { keys: ["↑", "↓"], label: t.shortcuts.rows.shellHistory },
        { keys: ["⌘", "L"], label: t.shortcuts.rows.clearShell },
      ],
    },
  ];

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[98] bg-background/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-[99] w-[min(560px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-border bg-popover p-6 shadow-2xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
          aria-describedby={undefined}
        >
          <div className="mb-5 flex items-start justify-between">
            <div>
              <Dialog.Title className="text-lg font-semibold tracking-tight">
                {t.shortcuts.title}
              </Dialog.Title>
              <Dialog.Description className="mt-1 font-mono text-xs text-muted-foreground">
                {t.shortcuts.description}
              </Dialog.Description>
            </div>
            <Dialog.Close
              className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Close"
            >
              <X className="size-4" aria-hidden />
            </Dialog.Close>
          </div>

          <div className="space-y-5">
            {shortcutGroups.map((group) => (
              <div key={group.heading}>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {group.heading}
                </p>
                <ul className="space-y-1.5">
                  {group.rows.map((row) => (
                    <li
                      key={row.label}
                      className="flex items-center justify-between gap-4 text-sm"
                    >
                      <span className="text-foreground">{row.label}</span>
                      <span className="flex items-center gap-1">
                        {row.keys.map((k) => (
                          <kbd key={k} className="kbd">
                            {k}
                          </kbd>
                        ))}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
