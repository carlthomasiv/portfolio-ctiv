"use client";

import { useEffect, useRef, useState } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const EASING = "cubic-bezier(0, 0, 0.2, 1)"; // strong ease-out: hits full speed immediately, decelerates into place
const EXPAND_MS = 220;
const COLLAPSE_MS = 160;
const COLLAPSE_DEBOUNCE_MS = 160; // grace period before collapsing on mouseleave
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
  return Math.ceil(w) + 1;
}

// ─── NavMark ─────────────────────────────────────────────────────────────────

interface Widths {
  arl: number;
  homas: number;
}

export function NavMark() {
  const [widths, setWidths] = useState<Widths | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [animate, setAnimate] = useState(false);
  const isMobileRef = useRef(false);
  const collapseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let mobileTimer: ReturnType<typeof setTimeout>;

    document.fonts.ready.then(() => {
      isMobileRef.current = window.innerWidth < MOBILE_BREAKPOINT;

      setWidths({
        arl: measureText("arl\u00A0", 500),
        homas: measureText("homas", 500),
      });

      // Two rAF frames so the initial collapsed width paints before
      // transitions are enabled — prevents an animate-in from zero
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimate(true));
      });

      if (isMobileRef.current) {
        mobileTimer = setTimeout(() => setExpanded(true), MOBILE_DELAY_MS);
      }
    });

    return () => {
      clearTimeout(mobileTimer);
      if (collapseTimer.current) clearTimeout(collapseTimer.current);
    };
  }, []);

  function handleEnter() {
    if (isMobileRef.current) return;
    if (collapseTimer.current) {
      clearTimeout(collapseTimer.current);
      collapseTimer.current = null;
    }
    if (widths) setExpanded(true);
  }

  function handleLeave() {
    if (isMobileRef.current) return;
    // Debounce the collapse so small mouse movements don't cause flicker
    collapseTimer.current = setTimeout(() => {
      setExpanded(false);
      collapseTimer.current = null;
    }, COLLAPSE_DEBOUNCE_MS);
  }

  const duration = expanded ? EXPAND_MS : COLLAPSE_MS;
  // Only enable transitions after first paint at collapsed width
  const expandT = animate ? `width ${duration}ms ${EASING}` : "none";
  const underscoreT = animate ? `opacity ${Math.round(duration * 0.45)}ms ease` : "none";

  const container: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "baseline",
    fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
    fontSize: "15px",
    lineHeight: 1,
    whiteSpace: "nowrap",
    cursor: "default",
    userSelect: "none" as const,
    // Extend the hover zone with padding, offset with negative margin so
    // surrounding layout isn't affected
    padding: "6px 10px 6px 0",
    margin: "-6px -10px -6px 0",
  };

  if (!widths) {
    return (
      <div style={container}>
        <span style={{ fontWeight: 500, color: "var(--text)" }}>CT</span>
        <span style={{ fontWeight: 300, color: "var(--text)", opacity: 0.28 }}>_IV</span>
      </div>
    );
  }

  // Clip container for the expanding letter groups.
  // flex-shrink:0 + min-width:0 prevents the flex algorithm from fighting
  // the width animation. Use `width` not `max-width` — more reliable in flex.
  const clip = (w: number): React.CSSProperties => ({
    flexShrink: 0,
    minWidth: 0,
    overflow: "hidden",
    width: expanded ? w : 0,
    transition: expandT,
  });

  const revealText: React.CSSProperties = {
    display: "block",
    whiteSpace: "nowrap",
    fontWeight: 500,
    color: "var(--text)",
  };

  return (
    <div style={container} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>

      {/* C — anchored */}
      <span style={{ fontWeight: 500, color: "var(--text)" }}>C</span>

      {/* arl  — grows rightward from C */}
      <span style={clip(widths.arl)}>
        <span style={revealText}>arl{"\u00A0"}</span>
      </span>

      {/* T — shifts right as "arl" expands */}
      <span style={{ fontWeight: 500, color: "var(--text)" }}>T</span>

      {/* homas — grows rightward from T, same timing */}
      <span style={clip(widths.homas)}>
        <span style={revealText}>homas</span>
      </span>

      {/* _ — fades out, width preserved so IV stays in place */}
      <span style={{
        fontWeight: 300,
        color: "var(--text)",
        opacity: expanded ? 0 : 0.28,
        transition: underscoreT,
      }}>_</span>

      {/* IV — always visible at muted weight */}
      <span style={{ fontWeight: 300, color: "var(--text)", opacity: 0.28 }}>IV</span>

    </div>
  );
}
