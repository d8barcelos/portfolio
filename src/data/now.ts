import type { Locale } from "@/lib/i18n";

export type NowStatus = {
  label: string;
  value: string;
  href?: string;
};

export const nowStatus: readonly NowStatus[] = [
  { label: "Working at", value: "Petrobras (via Global Hitss)" },
  { label: "Studying at", value: "FIAP — Software Architecture" },
  { label: "Reading", value: "Designing Data-Intensive Applications" },
  { label: "Listening", value: "Hand-curated mix" },
] as const;

export const nowStatusPt: readonly NowStatus[] = [
  { label: "Trabalhando em", value: "Petrobras (via Global Hitss)" },
  { label: "Estudando em", value: "FIAP — Arquitetura de Software" },
  { label: "Lendo", value: "Designing Data-Intensive Applications" },
  { label: "Ouvindo", value: "Mix curado na unha" },
] as const;

export function getNowStatus(locale: Locale): readonly NowStatus[] {
  return locale === "pt" ? nowStatusPt : nowStatus;
}
