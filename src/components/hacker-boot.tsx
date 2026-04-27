"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useHackerMode } from "@/hooks/use-hacker-mode";

const lines = [
  "[    0.000000] portfolio.os · boot sequence initialised",
  "[    0.004128] loading kernel modules ............ [ ok ]",
  "[    0.012004] mounting /dev/identity ............ [ ok ]",
  "[    0.028903] resolving dns for d8barcelos ...... [ ok ]",
  "[    0.048412] negotiating tls handshake ......... [ ok ]",
  "[    0.071233] spinning up .NET runtime .......... [ ok ]",
  "[    0.098441] warming caches (Redis, local) ..... [ ok ]",
  "[    0.122004] connecting to queue ............... [ ok ]",
  "[    0.144092] starting xUnit supervisor ......... [ ok ]",
  "[    0.171004] ⚠  detected curious visitor ...... [ welcome ]",
  "",
  "portfolio login: guest",
  "type 'help' to list commands, 'exit' to leave terminal mode.",
];

export function HackerBoot() {
  const { booting } = useHackerMode();

  return (
    <AnimatePresence>
      {booting && (
        <motion.div
          key="boot"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[hsl(var(--terminal-bg))] font-mono text-[hsl(var(--terminal-fg))]"
          aria-hidden="true"
        >
          <div className="w-full max-w-2xl px-6">
            {lines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.15 }}
                className="text-xs leading-5 whitespace-pre"
              >
                {line || "\u00A0"}
              </motion.p>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
