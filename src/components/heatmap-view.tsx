"use client";

import { Github } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import { siteConfig } from "@/lib/site";
import { type ContributionDay, type ContributionStats } from "@/lib/github";
import { cn } from "@/lib/utils";

const CELL = 12;
const GAP = 3;
const LEVEL_CLASSES: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "fill-border/50",
  1: "fill-accent/25",
  2: "fill-accent/45",
  3: "fill-accent/70",
  4: "fill-accent",
};

export function HeatmapView({ stats }: { stats: ContributionStats }) {
  const { t } = useLocale();
  const months = t.heatmap.months;
  const dayLabels = t.heatmap.days;

  const width = stats.weeks.length * (CELL + GAP) + 40;
  const height = 7 * (CELL + GAP) + 24;
  const monthTicks = monthLabels(stats.weeks, months);
  const totalFormatted = stats.total.toLocaleString(t.dates.locale);
  const contribParts = t.heatmap.contributions(totalFormatted);

  return (
    <div className="relative overflow-hidden rounded-xl border border-border/70 bg-card/30 p-5 backdrop-blur-sm">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            <Github className="size-3.5 text-accent" aria-hidden />
            {t.heatmap.last12}
          </p>
          <p className="mt-1 font-mono text-sm text-foreground">
            <span className="text-accent">{contribParts.lead}</span>
            {contribParts.trail}
          </p>
        </div>

        <dl className="flex flex-wrap items-center gap-4 font-mono text-[11px] text-muted-foreground">
          <Stat label={t.heatmap.statMaxDay} value={stats.mostInADay} />
          <Stat
            label={t.heatmap.statCurrentStreak}
            value={`${stats.streakCurrent}${t.heatmap.streakUnit}`}
          />
          <Stat
            label={t.heatmap.statLongestStreak}
            value={`${stats.streakLongest}${t.heatmap.streakUnit}`}
          />
        </dl>
      </div>

      <div className="overflow-x-auto pb-2">
        <svg
          role="img"
          aria-label={t.heatmap.aria(stats.total)}
          width={width}
          height={height}
          className="block min-w-full"
        >
          <g transform="translate(32, 20)">
            {stats.weeks.map((week, wIdx) =>
              week.days.map((day, dIdx) => (
                <rect
                  key={`${day.date}-${wIdx}-${dIdx}`}
                  x={wIdx * (CELL + GAP)}
                  y={dayOfWeek(day.date) * (CELL + GAP)}
                  width={CELL}
                  height={CELL}
                  rx={2}
                  className={cn(
                    LEVEL_CLASSES[day.level],
                    "transition-colors hover:stroke-accent",
                  )}
                >
                  <title>
                    {day.count === 0
                      ? t.heatmap.cellNone(day.date)
                      : t.heatmap.cellSome(day.count, day.date)}
                  </title>
                </rect>
              )),
            )}
          </g>

          <g className="fill-muted-foreground font-mono text-[9px]">
            {monthTicks.map((tick) => (
              <text
                key={`${tick.label}-${tick.x}`}
                x={32 + tick.x}
                y={12}
              >
                {tick.label}
              </text>
            ))}
            {dayLabels.map((label, i) => (
              <text key={label} x={0} y={34 + i * 2 * (CELL + GAP)}>
                {label}
              </text>
            ))}
          </g>
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] text-muted-foreground">
        <span>
          {stats.source === "github" ? (
            <>
              {t.heatmap.liveVia}{" "}
              <a
                href={`https://github.com/${siteConfig.githubUsername}`}
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:underline"
              >
                @{siteConfig.githubUsername}
              </a>
            </>
          ) : (
            <>
              {t.heatmap.placeholderPrefix}
              <code className="rounded bg-muted px-1">GITHUB_TOKEN</code>
              {t.heatmap.placeholderSuffix}
            </>
          )}
        </span>
        <span className="flex items-center gap-1">
          {t.heatmap.less}
          {([0, 1, 2, 3, 4] as const).map((l) => (
            <span
              key={l}
              className={cn("size-2.5 rounded-[2px]", levelBg(l))}
              aria-hidden
            />
          ))}
          {t.heatmap.more}
        </span>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span>{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}

function dayOfWeek(iso: string): number {
  const d = new Date(iso);
  return d.getDay();
}

function monthLabels(
  weeks: { days: ContributionDay[] }[],
  months: readonly string[],
): { label: string; x: number }[] {
  const labels: { label: string; x: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, i) => {
    const firstDay = week.days[0];
    if (!firstDay) return;
    const month = new Date(firstDay.date).getMonth();
    if (month !== lastMonth) {
      lastMonth = month;
      labels.push({ label: months[month] ?? "", x: i * (CELL + GAP) });
    }
  });
  return labels;
}

function levelBg(level: 0 | 1 | 2 | 3 | 4): string {
  switch (level) {
    case 0:
      return "bg-border/50";
    case 1:
      return "bg-accent/25";
    case 2:
      return "bg-accent/45";
    case 3:
      return "bg-accent/70";
    case 4:
      return "bg-accent";
  }
}
