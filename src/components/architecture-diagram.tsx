"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Node = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  kind?: "primary" | "muted";
};

type Edge = {
  from: string;
  to: string;
  delay?: number;
};

const nodes: readonly Node[] = [
  { id: "client", x: 16, y: 140, w: 92, h: 44, label: "client", sub: "web · mobile" },
  { id: "gateway", x: 148, y: 140, w: 96, h: 44, label: "gateway", sub: "API edge", kind: "primary" },
  { id: "auth", x: 288, y: 52, w: 100, h: 44, label: "auth.svc", sub: ".NET 9" },
  { id: "orders", x: 288, y: 140, w: 100, h: 44, label: "orders.svc", sub: ".NET 9" },
  { id: "sync", x: 288, y: 228, w: 100, h: 44, label: "sync.svc", sub: "Polly · retry" },
  { id: "queue", x: 432, y: 140, w: 88, h: 44, label: "queue", sub: "events", kind: "primary" },
  { id: "cache", x: 560, y: 64, w: 84, h: 44, label: "cache", sub: "Redis" },
  { id: "db", x: 560, y: 152, w: 84, h: 44, label: "db", sub: "Postgres" },
  { id: "worker", x: 560, y: 240, w: 84, h: 44, label: "worker", sub: "xUnit" },
];

const edges: readonly Edge[] = [
  { from: "client", to: "gateway" },
  { from: "gateway", to: "auth", delay: 0.2 },
  { from: "gateway", to: "orders", delay: 0.4 },
  { from: "gateway", to: "sync", delay: 0.6 },
  { from: "orders", to: "queue", delay: 0.8 },
  { from: "sync", to: "queue", delay: 1.0 },
  { from: "queue", to: "cache", delay: 1.2 },
  { from: "queue", to: "db", delay: 1.4 },
  { from: "queue", to: "worker", delay: 1.6 },
];

function nodeCenter(n: Node) {
  return { x: n.x + n.w / 2, y: n.y + n.h / 2 };
}

function edgePath(from: Node, to: Node): string {
  const a = { x: from.x + from.w, y: nodeCenter(from).y };
  const b = { x: to.x, y: nodeCenter(to).y };
  const midX = (a.x + b.x) / 2;
  return `M ${a.x} ${a.y} C ${midX} ${a.y}, ${midX} ${b.y}, ${b.x} ${b.y}`;
}

const nodeById = new Map(nodes.map((n) => [n.id, n]));

export function ArchitectureDiagram({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl border border-border/70 bg-gradient-to-br from-background/60 to-muted/30 p-3 backdrop-blur-sm",
        className,
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-grid opacity-40 mask-fade-b" />
      <div className="pointer-events-none absolute -inset-20 bg-hero-glow" />

      <div className="absolute left-3 top-3 flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-red-500/70" />
        <span className="size-2 rounded-full bg-yellow-500/70" />
        <span className="size-2 rounded-full bg-green-500/70" />
        <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          architecture.svg
        </span>
      </div>

      <svg
        viewBox="0 0 680 320"
        className="relative mt-6 w-full"
        role="img"
        aria-label="Animated backend architecture diagram: client, gateway, services, queue, cache, database, worker."
      >
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
          </marker>
        </defs>

        <g className="text-border">
          {edges.map(({ from, to }) => {
            const a = nodeById.get(from);
            const b = nodeById.get(to);
            if (!a || !b) return null;
            return (
              <path
                key={`${from}-${to}-base`}
                d={edgePath(a, b)}
                className="fill-none stroke-current opacity-50"
                strokeWidth={1}
              />
            );
          })}
        </g>

        {!prefersReducedMotion && (
          <g className="text-accent">
            {edges.map(({ from, to, delay = 0 }) => {
              const a = nodeById.get(from);
              const b = nodeById.get(to);
              if (!a || !b) return null;
              return (
                <path
                  key={`${from}-${to}-flow`}
                  d={edgePath(a, b)}
                  className="fill-none stroke-current animate-flow-dash"
                  strokeWidth={1.25}
                  strokeDasharray="2 6"
                  style={{ animationDelay: `${delay}s` }}
                  markerEnd="url(#arrow)"
                />
              );
            })}
          </g>
        )}

        {nodes.map((n, i) => (
          <motion.g
            key={n.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: prefersReducedMotion ? 0 : 0.08 * i,
              ease: "easeOut",
            }}
          >
            <rect
              x={n.x}
              y={n.y}
              width={n.w}
              height={n.h}
              rx={6}
              className={cn(
                "fill-background stroke-border",
                n.kind === "primary" && "stroke-accent",
              )}
              strokeWidth={n.kind === "primary" ? 1.5 : 1}
            />
            <text
              x={n.x + n.w / 2}
              y={n.y + 18}
              textAnchor="middle"
              className={cn(
                "fill-foreground font-mono text-[11px] font-medium",
                n.kind === "primary" && "fill-accent",
              )}
            >
              {n.label}
            </text>
            {n.sub && (
              <text
                x={n.x + n.w / 2}
                y={n.y + 33}
                textAnchor="middle"
                className="fill-muted-foreground font-mono text-[9px]"
              >
                {n.sub}
              </text>
            )}
          </motion.g>
        ))}

        {!prefersReducedMotion && (
          <>
            <circle className="fill-accent animate-pulse-soft" cx="62" cy="162" r="2" />
            <circle
              className="fill-accent animate-pulse-soft"
              cx="196"
              cy="162"
              r="2"
              style={{ animationDelay: "0.6s" }}
            />
            <circle
              className="fill-accent animate-pulse-soft"
              cx="476"
              cy="162"
              r="2"
              style={{ animationDelay: "1.2s" }}
            />
          </>
        )}
      </svg>

      <div className="mt-1 flex items-center justify-between px-1 pb-1 font-mono text-[10px] text-muted-foreground">
        <span>{"// request flow · simplified"}</span>
        <span className="flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-accent animate-pulse-soft" />
          live
        </span>
      </div>
    </div>
  );
}
