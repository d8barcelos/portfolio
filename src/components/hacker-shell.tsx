"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { Minus, X } from "lucide-react";
import { useHackerMode } from "@/hooks/use-hacker-mode";
import { runCommand, type ShellOutputLine } from "@/lib/shell-commands";
import { cn } from "@/lib/utils";

const welcome: ShellOutputLine[] = [
  { kind: "stdout", text: "portfolio.os · interactive shell (v1.0)" },
  { kind: "hint", text: "type 'help' to list commands, 'exit' to leave." },
];

export function HackerShell() {
  const { enabled, booting, disable } = useHackerMode();
  const [history, setHistory] = useState<ShellOutputLine[]>(welcome);
  const [value, setValue] = useState("");
  const [minimized, setMinimized] = useState(false);
  const [past, setPast] = useState<string[]>([]);
  const [, setPastIdx] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (enabled && !booting && !minimized) {
      inputRef.current?.focus();
    }
  }, [enabled, booting, minimized]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [history]);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (!enabled) return;
      if (e.key === "`" && !isEditableTarget(e.target)) {
        e.preventDefault();
        setMinimized((m) => !m);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [enabled]);

  const submit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const raw = value;
      if (!raw.trim()) {
        setHistory((h) => [...h, { kind: "input", text: "" }]);
        setValue("");
        return;
      }
      const result = runCommand(raw, {
        exitHackerMode: () => disable(),
        clear: () => setHistory([]),
        goTo: (section) => {
          document
            .getElementById(section)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        },
      });
      setHistory((h) =>
        result.side === "clear"
          ? result.output
          : [...h, { kind: "input", text: raw }, ...result.output],
      );
      setPast((p) => [...p, raw].slice(-50));
      setPastIdx(null);
      setValue("");
    },
    [value, disable],
  );

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setPastIdx((idx) => {
        const next = idx === null ? past.length - 1 : Math.max(0, idx - 1);
        setValue(past[next] ?? "");
        return next;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setPastIdx((idx) => {
        if (idx === null) return null;
        const next = idx + 1;
        if (next >= past.length) {
          setValue("");
          return null;
        }
        setValue(past[next] ?? "");
        return next;
      });
    } else if (e.key === "l" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setHistory([]);
    }
  };

  if (!enabled || booting) return null;

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-[80] w-[min(640px,calc(100vw-2rem))] overflow-hidden rounded-md border border-[hsl(var(--terminal-fg)/0.4)] bg-[hsl(var(--terminal-bg)/0.97)] shadow-[0_0_40px_-8px_hsl(var(--terminal-fg)/0.4)] backdrop-blur transition-all",
        minimized ? "h-9" : "h-[340px]",
      )}
      role="region"
      aria-label="Terminal shell"
    >
      <div className="flex h-9 items-center justify-between border-b border-[hsl(var(--terminal-fg)/0.3)] px-3 font-mono text-xs text-[hsl(var(--terminal-fg))]">
        <span className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-[hsl(var(--terminal-fg)/0.7)]" />
          <span>guest@portfolio ~ </span>
          <span className="text-[hsl(var(--terminal-fg)/0.5)]">
            press{" "}
            <kbd className="rounded border border-[hsl(var(--terminal-fg)/0.3)] px-1 text-[10px]">
              `
            </kbd>{" "}
            to toggle
          </span>
        </span>
        <span className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setMinimized((m) => !m)}
            className="rounded p-1 hover:bg-[hsl(var(--terminal-fg)/0.1)]"
            aria-label="Minimize terminal"
          >
            <Minus className="size-3" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => disable()}
            className="rounded p-1 hover:bg-[hsl(var(--terminal-fg)/0.1)]"
            aria-label="Close terminal and exit hacker mode"
          >
            <X className="size-3" aria-hidden />
          </button>
        </span>
      </div>

      {!minimized && (
        <>
          <div
            ref={scrollRef}
            className="h-[calc(100%-72px)] overflow-y-auto px-3 py-2 font-mono text-xs text-[hsl(var(--terminal-fg))]"
          >
            {history.map((line, i) => (
              <p
                key={i}
                className={cn(
                  "whitespace-pre-wrap break-words leading-5",
                  line.kind === "stderr" && "text-red-400",
                  line.kind === "hint" && "text-[hsl(var(--terminal-fg)/0.6)]",
                )}
              >
                {line.kind === "input" ? (
                  <>
                    <span className="text-[hsl(var(--terminal-fg)/0.7)]">❯ </span>
                    {line.text}
                  </>
                ) : (
                  line.text || "\u00A0"
                )}
              </p>
            ))}
          </div>

          <form
            onSubmit={submit}
            className="flex h-9 items-center gap-2 border-t border-[hsl(var(--terminal-fg)/0.3)] px-3 font-mono text-xs text-[hsl(var(--terminal-fg))]"
          >
            <span className="text-[hsl(var(--terminal-fg)/0.7)]">❯</span>
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              aria-label="Shell input"
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              className="h-full flex-1 bg-transparent text-[hsl(var(--terminal-fg))] caret-[hsl(var(--terminal-fg))] outline-none placeholder:text-[hsl(var(--terminal-fg)/0.4)]"
              placeholder="type 'help'…"
            />
          </form>
        </>
      )}
    </div>
  );
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable
  );
}

