"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  detectInitialLocale,
  isLocale,
  ui,
  type Locale,
  type UI,
} from "@/lib/i18n";

type LocaleContextValue = {
  locale: Locale;
  t: UI;
  setLocale: (next: Locale) => void;
  toggle: () => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof document === "undefined") return DEFAULT_LOCALE;
    const fromAttr = document.documentElement.dataset.locale;
    if (isLocale(fromAttr)) return fromAttr;
    return DEFAULT_LOCALE;
  });

  useEffect(() => {
    const initial = detectInitialLocale();
    setLocaleState(initial);
    document.documentElement.lang = initial;
    document.documentElement.dataset.locale = initial;
  }, []);

  const setLocale = useCallback((next: Locale) => {
    if (!isLocale(next)) return;
    setLocaleState(next);
    document.documentElement.lang = next;
    document.documentElement.dataset.locale = next;
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      // no-op
    }
  }, []);

  const toggle = useCallback(() => {
    setLocale(locale === "en" ? "pt" : "en");
  }, [locale, setLocale]);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, t: ui[locale], setLocale, toggle }),
    [locale, setLocale, toggle],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used inside LocaleProvider");
  }
  return ctx;
}
