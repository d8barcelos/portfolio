import { siteConfig } from "@/lib/site";

export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ContributionWeek = {
  days: ContributionDay[];
};

export type ContributionStats = {
  total: number;
  weeks: ContributionWeek[];
  mostInADay: number;
  streakCurrent: number;
  streakLongest: number;
  source: "github" | "placeholder";
};

type GraphQLResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              date: string;
              contributionCount: number;
              color: string;
            }[];
          }[];
        };
      };
    };
  };
  errors?: { message: string }[];
};

function toLevel(count: number, max: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (max <= 0) return 1;
  const ratio = count / max;
  if (ratio < 0.25) return 1;
  if (ratio < 0.5) return 2;
  if (ratio < 0.75) return 3;
  return 4;
}

function computeStreaks(days: ContributionDay[]): {
  current: number;
  longest: number;
} {
  let longest = 0;
  let run = 0;
  for (const d of days) {
    if (d.count > 0) {
      run += 1;
      if (run > longest) longest = run;
    } else {
      run = 0;
    }
  }
  let current = 0;
  for (let i = days.length - 1; i >= 0; i -= 1) {
    const d = days[i];
    if (d && d.count > 0) current += 1;
    else break;
  }
  return { current, longest };
}

function placeholderStats(): ContributionStats {
  const weeks: ContributionWeek[] = [];
  const allDays: ContributionDay[] = [];
  const now = new Date();
  const start = new Date(now);
  start.setDate(start.getDate() - 7 * 52);

  for (let w = 0; w < 53; w += 1) {
    const days: ContributionDay[] = [];
    for (let d = 0; d < 7; d += 1) {
      const date = new Date(start);
      date.setDate(start.getDate() + w * 7 + d);
      if (date > now) continue;
      const seed = Math.abs(
        Math.sin(date.getTime() / 8.64e7) * 10_000 +
          Math.cos(date.getTime() / 1.2e7) * 10_000,
      );
      const base = Math.floor(seed % 9);
      const weekendDamp = date.getDay() === 0 || date.getDay() === 6 ? 0.4 : 1;
      const count = Math.max(0, Math.round(base * weekendDamp));
      const day: ContributionDay = {
        date: date.toISOString().slice(0, 10),
        count,
        level: toLevel(count, 9),
      };
      days.push(day);
      allDays.push(day);
    }
    weeks.push({ days });
  }
  const total = allDays.reduce((sum, d) => sum + d.count, 0);
  const mostInADay = allDays.reduce(
    (max, d) => (d.count > max ? d.count : max),
    0,
  );
  const { current, longest } = computeStreaks(allDays);
  return {
    total,
    weeks,
    mostInADay,
    streakCurrent: current,
    streakLongest: longest,
    source: "placeholder",
  };
}

export async function fetchContributions(): Promise<ContributionStats> {
  const token = process.env.GITHUB_TOKEN;
  const login = siteConfig.githubUsername;
  if (!token || !login) return placeholderStats();

  const query = `query($login:String!){
    user(login:$login){
      contributionsCollection{
        contributionCalendar{
          totalContributions
          weeks{
            contributionDays{ date contributionCount color }
          }
        }
      }
    }
  }`;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "portfolio-heatmap",
      },
      body: JSON.stringify({ query, variables: { login } }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) return placeholderStats();
    const json = (await res.json()) as GraphQLResponse;
    const cal = json.data?.user?.contributionsCollection?.contributionCalendar;
    if (!cal) return placeholderStats();

    const rawDays = cal.weeks.flatMap((w) => w.contributionDays);
    const max = rawDays.reduce(
      (m, d) => (d.contributionCount > m ? d.contributionCount : m),
      0,
    );
    const weeks: ContributionWeek[] = cal.weeks.map((w) => ({
      days: w.contributionDays.map((d) => ({
        date: d.date,
        count: d.contributionCount,
        level: toLevel(d.contributionCount, max),
      })),
    }));
    const allDays = weeks.flatMap((w) => w.days);
    const { current, longest } = computeStreaks(allDays);

    return {
      total: cal.totalContributions,
      weeks,
      mostInADay: max,
      streakCurrent: current,
      streakLongest: longest,
      source: "github",
    };
  } catch {
    return placeholderStats();
  }
}
