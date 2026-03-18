"use client";

import { useEffect, useRef, useState } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const EASING = "cubic-bezier(0.4, 0, 0.2, 1)";
const EXPAND_MS = 480;
const COLLAPSE_MS = 380;
const MOBILE_DELAY_MS = 800;
const MOBILE_BREAKPOINT = 768;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function measureText(text: string, weight: number): number {
  const el = document.createElement("span");
  el.style.fontFamily = "var(--font-dm-mono), 'DM Mono', monospace";
  el.style.fontSize = "15px";
  el.style.fontWeight = String(weight);
  el.style.whiteSpace = "nowrap";
  el.style.lineHeight = "1";
  el.style.position = "fixed";
  el.style.visibility = "hidden";
  el.style.pointerEvents = "none";
  el.style.top = "-9999px";
  el.style.left = "-9999px";
  el.textContent = text;
  document.body.appendChild(el);
  const w = el.getBoundingClientRect().width;
  document.body.removeChild(el);
  return Math.ceil(w) + 1; // +1px buffer against sub-pixel clipping
}

// ─── NavMark ─────────────────────────────────────────────────────────────────

interface Widths {
  arl: number;   // "arl " (trailing nbsp keeps the space from collapsing)
  homas: number; // "homas"
}

export function NavMark() {
  const [widths, setWidths] = useState<Widths | null>(null);
  const [expanded, setExpanded] = useState(false);
  // Suppresses the transition for two rAF frames after mount so the
  // initial collapsed state paints instantly with no entry animation
  const [animate, setAnimate] = useState(false);
  const isMobileRef = useRef(false);

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;

    document.fonts.ready.then(() => {
      isMobileRef.current = window.innerWidth < MOBILE_BREAKPOINT;

      setWidths({
        // nbsp after "arl" so the trailing space is preserved in rendering
        arl: measureText("arl\u00A0", 500),
        homas: measureText("homas", 500),
      });

      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimate(true));
      });

      if (isMobileRef.current) {
        timerId = setTimeout(() => setExpanded(true), MOBILE_DELAY_MS);
      }
    });

    return () => clearTimeout(timerId);
  }, []);

  function handleEnter() {
    if (!isMobileRef.current && widths) setExpanded(true);
  }
  function handleLeave() {
    if (!isMobileRef.current && widths) setExpanded(false);
  }

  const duration = expanded ? EXPAND_MS : COLLAPSE_MS;
  const expandT = animate ? `max-width ${duration}ms ${EASING}` : "none";
  const underscoreT = animate ? `opacity ${Math.round(duration * 0.45)}ms ease` : "none";

  // Shared container style
  const container: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "baseline",
    fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
    fontSize: "15px",
    lineHeight: 1,
    whiteSpace: "nowrap",
    cursor: "default",
    userSelect: "none" as const,
  };

  // Static fallback rendered before fonts are measured — no layout shift
  if (!widths) {
    return (
      <div style={container}>
        <span style={{ fontWeight: 500, color: "var(--text)" }}>CT</span>
        <span style={{ fontWeight: 300, color: "var(--text)", opacity: 0.28 }}>_IV</span>
      </div>
    );
  }

  // Clip span that grows from 0 → measured width
  const clipStyle = (w: number, transition: string): React.CSSProperties => ({
    display: "inline-block",
    overflow: "hidden",
    maxWidth: expanded ? w : 0,
    transition,
  });

  // Inner text that must not wrap while being revealed
  const revealText: React.CSSProperties = {
    display: "inline-block",
    whiteSpace: "nowrap",
    fontWeight: 500,
    color: "var(--text)",
  };

  return (
    <div style={container} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>

      {/* ── Left mark: C[arl ]T[homas] ────────────────────────────────── */}

      {/* "C" — anchored, never moves */}
      <span style={{ fontWeight: 500, color: "var(--text)" }}>C</span>

      {/* "arl " — grows rightward from C */}
      <span style={clipStyle(widths.arl, expandT)}>
        <span style={revealText}>arl{"\u00A0"}</span>
      </span>

      {/* "T" — shifts right naturally as "arl" expands */}
      <span style={{ fontWeight: 500, color: "var(--text)" }}>T</span>

      {/* "homas" — grows rightward from T, same timing as "arl" */}
      <span style={clipStyle(widths.homas, expandT)}>
        <span style={revealText}>homas</span>
      </span>

      {/* ── Right mark: _IV ────────────────────────────────────────────── */}

      {/* "_" — fades to invisible on expand; opacity:0 preserves its width
           so "IV" stays in place and the gap reads as a natural space */}
      <span style={{
        fontWeight: 300,
        color: "var(--text)",
        opacity: expanded ? 0 : 0.28,
        transition: underscoreT,
      }}>_</span>

      {/* "IV" — always visible at muted weight */}
      <span style={{ fontWeight: 300, color: "var(--text)", opacity: 0.28 }}>IV</span>

    </div>
  );
}
