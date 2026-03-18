"use client";

import { useState, useEffect } from "react";

type ThemeState = "light" | "dark" | "system";

const LIGHT = {
  bg: "#fafafa",
  text: "#111318",
  textMuted: "rgba(17,19,24,0.52)",
  border: "rgba(17,19,24,0.08)",
};

const DARK = {
  bg: "#111110",
  text: "#f0ede8",
  textMuted: "rgba(240,237,232,0.52)",
  border: "rgba(240,237,232,0.08)",
};

const WORK_ITEMS = [
  { title: "Instant Postgres Playground", tags: ["DX", "Growth"],        year: "2024" },
  { title: "Serverless Gateways",         tags: ["Infrastructure", "DX"], year: "2023" },
  { title: "Azure SQL Resources",         tags: ["Infrastructure"],        year: "2022" },
];

const STATE_META: Record<ThemeState, string> = {
  light:  "Fixed — ignores OS preference",
  dark:   "Fixed — ignores OS preference",
  system: "Follows your OS setting",
};

export function ThemeDemo() {
  const [active, setActive]   = useState<ThemeState>("system");
  const [sysDark, setSysDark] = useState(false);

  useEffect(() => {
    const mq      = window.matchMedia("(prefers-color-scheme: dark)");
    setSysDark(mq.matches);
    const handler = (e: MediaQueryListEvent) => setSysDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const t      = active === "system" ? (sysDark ? DARK : LIGHT) : active === "dark" ? DARK : LIGHT;
  const isDark = t === DARK;
  const T      = "0.25s ease"; // transition shorthand

  return (
    <div style={{ margin: "32px 0" }}>

      {/* ── Preview window ─────────────────────────────────────────────── */}
      <div
        style={{
          border: "1px solid var(--border)",
          borderRadius: "8px",
          overflow: "hidden",
          background: t.bg,
          transition: `background ${T}`,
        }}
      >

        {/* Mini nav */}
        <div
          style={{
            padding: "12px 20px",
            borderBottom: `1px solid ${t.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: `border-color ${T}`,
          }}
        >
          {/* Logo mark */}
          <span
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: "14px",
              fontWeight: 400,
              color: t.text,
              letterSpacing: "0.01em",
              transition: `color ${T}`,
            }}
          >
            CT
            <span style={{ fontWeight: 300, opacity: 0.28 }}>_IV</span>
          </span>

          {/* Nav links + toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {["Work", "Thinking", "About"].map((link) => (
              <span
                key={link}
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  color: t.textMuted,
                  transition: `color ${T}`,
                }}
              >
                {link}
              </span>
            ))}

            {/* Theme toggle pill */}
            <div
              style={{
                width: "26px",
                height: "26px",
                borderRadius: "50%",
                border: `1px solid ${t.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: `border-color ${T}`,
              }}
            >
              {active === "system" ? (
                /* AutoIcon — exact match from Nav.tsx */
                <svg width="12" height="12" viewBox="0 0 15 15" fill={t.textMuted} aria-hidden style={{ transition: `fill ${T}` }}>
                  <path fillRule="evenodd" d="M7.5 1.4 A6.1 6.1 0 0 1 7.5 13.6 A6.1 6.1 0 0 1 7.5 1.4 Z M7.5 2.6 A4.9 4.9 0 0 0 7.5 12.4 A4.9 4.9 0 0 0 7.5 2.6 Z" />
                  <path d="M7.5 2.6 A4.9 4.9 0 0 0 7.5 12.4 Z" />
                </svg>
              ) : active === "dark" ? (
                /* MoonIcon — exact match from Nav.tsx */
                <svg width="12" height="12" viewBox="0 0 15 15" fill="none" aria-hidden>
                  <path d="M7.5 1.5A6 6 0 1 0 13.5 7.5 4.5 4.5 0 0 1 7.5 1.5z" stroke={t.textMuted} strokeWidth="1.2" strokeLinejoin="round" style={{ transition: `stroke ${T}` }} />
                </svg>
              ) : (
                /* SunIcon — exact match from Nav.tsx */
                <svg width="12" height="12" viewBox="0 0 15 15" fill="none" aria-hidden>
                  <circle cx="7.5" cy="7.5" r="2.5" stroke={t.textMuted} strokeWidth="1.2" style={{ transition: `stroke ${T}` }} />
                  <path d="M7.5 1v1.5M7.5 12.5V14M1 7.5h1.5M12.5 7.5H14M2.93 2.93l1.06 1.06M11.01 11.01l1.06 1.06M2.93 12.07l1.06-1.06M11.01 3.99l1.06-1.06" stroke={t.textMuted} strokeWidth="1.2" strokeLinecap="round" style={{ transition: `stroke ${T}` }} />
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Mini work list */}
        {WORK_ITEMS.map((item, i) => (
          <div
            key={item.title}
            style={{
              padding: "13px 20px",
              borderBottom: i < WORK_ITEMS.length - 1 ? `1px solid ${t.border}` : "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              transition: `border-color ${T}`,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "13px",
                color: t.text,
                transition: `color ${T}`,
              }}
            >
              {item.title}
            </span>

            <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-dm-mono)",
                    fontSize: "9px",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: t.textMuted,
                    border: `1px solid ${t.border}`,
                    borderRadius: "3px",
                    padding: "1px 5px",
                    lineHeight: 1.6,
                    whiteSpace: "nowrap",
                    transition: `color ${T}, border-color ${T}`,
                  }}
                >
                  {tag}
                </span>
              ))}
              <span
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "11px",
                  color: t.textMuted,
                  marginLeft: "4px",
                  transition: `color ${T}`,
                }}
              >
                {item.year}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Controls ───────────────────────────────────────────────────── */}
      <div
        style={{
          marginTop: "12px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          flexWrap: "wrap",
        }}
      >
        {(["light", "dark", "system"] as ThemeState[]).map((state) => (
          <button
            key={state}
            onClick={() => setActive(state)}
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: "11px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              padding: "4px 10px",
              borderRadius: "4px",
              border: "1px solid",
              borderColor: active === state ? "var(--text)" : "var(--border)",
              background:  active === state ? "var(--text)" : "transparent",
              color:       active === state ? "var(--bg)"   : "var(--text-muted)",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            {state.charAt(0).toUpperCase() + state.slice(1)}
          </button>
        ))}

        <span
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "12px",
            color: "var(--text-muted)",
            opacity: 0.6,
            marginLeft: "6px",
          }}
        >
          {active === "system"
            ? `System → resolved to ${sysDark ? "dark" : "light"} (your OS)`
            : STATE_META[active]}
        </span>
      </div>
    </div>
  );
}
