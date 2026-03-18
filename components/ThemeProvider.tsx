"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

export type ThemeSetting = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

interface ThemeContextValue {
  /** The user's explicit setting: light | dark | system */
  theme: ThemeSetting;
  /** What's actually applied to the page after resolving "system" */
  resolvedTheme: ResolvedTheme;
  /** Cycles light → dark → system → light */
  cycle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "system",
  resolvedTheme: "light",
  cycle: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function getSystemPref(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyResolved(resolved: ResolvedTheme) {
  const root = document.documentElement;
  if (resolved === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

const CYCLE: ThemeSetting[] = ["light", "dark", "system"];

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeSetting>("system");
  const [systemPref, setSystemPref] = useState<ResolvedTheme>("light");
  const [mounted, setMounted] = useState(false);

  // Refs so cycle() always reads the latest values — avoids stale closures
  // that can occur when React batches renders or schedules them asynchronously.
  const themeRef = useRef<ThemeSetting>("system");
  const systemPrefRef = useRef<ResolvedTheme>("light");

  const resolvedTheme: ResolvedTheme = theme === "system" ? systemPref : theme;

  // Boot: read stored setting, detect system preference, start watching
  useEffect(() => {
    const stored = localStorage.getItem("theme") as ThemeSetting | null;
    const sysPref = getSystemPref();

    systemPrefRef.current = sysPref;
    setSystemPref(sysPref);

    // Default to "system" for first-time visitors so the initial state
    // matches the OS preference instead of always showing light mode.
    const initial: ThemeSetting = stored && CYCLE.includes(stored) ? stored : "system";
    themeRef.current = initial;
    setTheme(initial);
    applyResolved(initial === "system" ? sysPref : initial);
    setMounted(true);

    // Keep system pref in sync while user is on "system" setting
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      const next: ResolvedTheme = e.matches ? "dark" : "light";
      systemPrefRef.current = next;
      setSystemPref(next);
      if (localStorage.getItem("theme") === "system") {
        document.documentElement.classList.add("theme-switching");
        applyResolved(next);
        setTimeout(() => document.documentElement.classList.remove("theme-switching"), 300);
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  function cycle() {
    const root = document.documentElement;
    root.classList.add("theme-switching");
    // Read from refs — guaranteed to be the current values even if React
    // hasn't committed the latest state update yet.
    const current = themeRef.current;
    const next = CYCLE[(CYCLE.indexOf(current) + 1) % CYCLE.length];
    const resolved: ResolvedTheme = next === "system" ? systemPrefRef.current : next;
    themeRef.current = next;
    setTheme(next);
    applyResolved(resolved);
    localStorage.setItem("theme", next);
    setTimeout(() => root.classList.remove("theme-switching"), 300);
  }

  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme, resolvedTheme, cycle }}>
        <div style={{ visibility: "hidden" }}>{children}</div>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, cycle }}>
      {children}
    </ThemeContext.Provider>
  );
}
