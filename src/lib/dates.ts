import type { Locale } from "@/lib/i18n";

export function formatPeriod(
  start: string,
  end: string,
  locale: Locale = "en",
): string {
  const presentLabel = locale === "pt" ? "Atual" : "Present";
  return `${formatMonth(start, locale)} — ${
    end === "Present" ? presentLabel : formatMonth(end, locale)
  }`;
}

export function formatMonth(yyyyMM: string, locale: Locale = "en"): string {
  const [year, month] = yyyyMM.split("-");
  if (!year || !month) return yyyyMM;
  const date = new Date(Number(year), Number(month) - 1, 1);
  const intlLocale = locale === "pt" ? "pt-BR" : "en-US";
  return date.toLocaleDateString(intlLocale, {
    month: "short",
    year: "numeric",
  });
}
