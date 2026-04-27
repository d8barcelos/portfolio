"use client";

import { useEffect } from "react";
import { navItems } from "@/data/nav";

type Options = {
  onRequestShortcuts: () => void;
  onKonami: () => void;
};

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
] as const;

function isEditable(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable
  );
}

function sectionIds(): string[] {
  return navItems.map((n) => n.id);
}

function currentSectionIndex(): number {
  const ids = sectionIds();
  const vh = window.innerHeight;
  let bestIdx = 0;
  let bestDist = Infinity;
  ids.forEach((id, i) => {
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dist = Math.abs(rect.top - vh * 0.2);
    if (dist < bestDist) {
      bestDist = dist;
      bestIdx = i;
    }
  });
  return bestIdx;
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function useKeyboardNav({ onRequestShortcuts, onKonami }: Options) {
  useEffect(() => {
    let gPending = false;
    let gTimer: number | undefined;
    let konamiIdx = 0;

    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isEditable(e.target)) return;

      const expected = KONAMI[konamiIdx];
      if (expected && e.key.toLowerCase() === expected.toLowerCase()) {
        konamiIdx += 1;
        if (konamiIdx === KONAMI.length) {
          konamiIdx = 0;
          onKonami();
          return;
        }
      } else {
        konamiIdx = expected && e.key === KONAMI[0] ? 1 : 0;
      }

      if (gPending) {
        const match = navItems.find((n) => n.key === e.key.toLowerCase());
        gPending = false;
        if (gTimer !== undefined) window.clearTimeout(gTimer);
        if (match) {
          e.preventDefault();
          scrollToSection(match.id);
        }
        return;
      }

      switch (e.key) {
        case "?": {
          e.preventDefault();
          onRequestShortcuts();
          return;
        }
        case "g": {
          gPending = true;
          gTimer = window.setTimeout(() => {
            gPending = false;
          }, 900);
          return;
        }
        case "j": {
          e.preventDefault();
          const ids = sectionIds();
          const next = Math.min(ids.length - 1, currentSectionIndex() + 1);
          const id = ids[next];
          if (id) scrollToSection(id);
          return;
        }
        case "k": {
          e.preventDefault();
          const ids = sectionIds();
          const prev = Math.max(0, currentSectionIndex() - 1);
          const id = ids[prev];
          if (id) scrollToSection(id);
          return;
        }
        default:
          return;
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (gTimer !== undefined) window.clearTimeout(gTimer);
    };
  }, [onRequestShortcuts, onKonami]);
}
