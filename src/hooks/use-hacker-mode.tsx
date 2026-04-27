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

const STORAGE_KEY = "portfolio-hacker-mode";
const CLASS_NAME = "hacker-mode";

type HackerModeContextValue = {
  enabled: boolean;
  booting: boolean;
  toggle: () => void;
  enable: () => void;
  disable: () => void;
};

const HackerModeContext = createContext<HackerModeContextValue | null>(null);

export function HackerModeProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [booting, setBooting] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "true") {
        document.documentElement.classList.add(CLASS_NAME);
        setEnabled(true);
      }
    } catch {
      // no-op
    }
  }, []);

  const enable = useCallback(() => {
    setBooting(true);
    document.documentElement.classList.add(CLASS_NAME);
    try {
      window.localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // no-op
    }
    setEnabled(true);
    window.setTimeout(() => setBooting(false), 1400);
  }, []);

  const disable = useCallback(() => {
    document.documentElement.classList.remove(CLASS_NAME);
    try {
      window.localStorage.setItem(STORAGE_KEY, "false");
    } catch {
      // no-op
    }
    setEnabled(false);
    setBooting(false);
  }, []);

  const toggle = useCallback(() => {
    if (enabled) {
      disable();
    } else {
      enable();
    }
  }, [enabled, enable, disable]);

  const value = useMemo<HackerModeContextValue>(
    () => ({ enabled, booting, toggle, enable, disable }),
    [enabled, booting, toggle, enable, disable],
  );

  return (
    <HackerModeContext.Provider value={value}>
      {children}
    </HackerModeContext.Provider>
  );
}

export function useHackerMode(): HackerModeContextValue {
  const ctx = useContext(HackerModeContext);
  if (!ctx) {
    throw new Error("useHackerMode must be used inside HackerModeProvider");
  }
  return ctx;
}
