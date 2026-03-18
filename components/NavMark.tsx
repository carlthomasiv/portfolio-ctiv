"use client";

import { useEffect, useRef, useState } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const EASING = "cubic-bezier(0.4, 0, 0.2, 1)";
const EXPAND_MS = 480;
const COLLAPSE_MS = 380;
const STAGGER_MS = 60;
const MOBILE_DELAY_MS = 800;
const MOBILE_BREAKPOINT = 768;

// Shared font style used for both rendering and off-screen measurement
const BASE_FONT = {
  fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
  fontSize: "15px",
  whiteSpace: "nowrap",
  lineHeight: 1,
} as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Measure the rendered pixel width of a string at a given font-weight.
 * Must be called after document.fonts.ready to get accurate results.
 */
function measureText(text: string, weight: number): number {
  const el = document.createElement("span");
  // Set each property explicitly — CSSStyleDeclaration expects strings and
  // doesn't always behave well with Object.assign + numeric values.
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
  return Math.ceil(w) + 1; // +1px buffer to prevent accidental clipping
}

// ─── Segment ─────────────────────────────────────────────────────────────────

/**
 * One half of the mark (e.g. "CT" / "Carl Thomas" or "_IV" / " IV").
 *
 * Layout trick: the short label lives in normal flow to establish height.
 * The long label is absolutely overlaid and clipped by the container's
 * overflow:hidden — it becomes visible as max-width grows. A quick
 * crossfade handles the swap between the two strings.
 */
interface SegmentProps {
  short: string;
  long: string;
  weight: number;
  /** Target opacity for this segment's text (1 for CT, 0.28 for _IV) */
  targetOpacity: number;
  shortWidth: number;
  longWidth: number;
  expanded: boolean;
  animate: boolean; // false on first mount to suppress the entry transition
  delay: number;   // ms
  duration: number; // ms
}

function Segment({
  short,
  long,
  weight,
  targetOpacity,
  shortWidth,
  longWidth,
  expanded,
  animate,
  delay,
  duration,
}: SegmentProps) {
  // Short crossfade: runs in the first ~30% of the width animation
  const xfadeMs = Math.round(duration * 0.32);
  // Long text fades in slightly after the container starts opening
  const longDelay = expanded ? delay + Math.round(duration * 0.22) : 0;

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        // width is always longWidth so the element has room to grow.
        // max-width clips it to shortWidth when collapsed — as max-width
        // animates outward the layout pushes naturally.
        width: longWidth,
        maxWidth: expanded ? longWidth : shortWidth,
        transition: animate ? `max-width ${duration}ms ${EASING} ${delay}ms` : "none",
      }}
    >
      {/* Short label — stays in normal flow to hold height; fades out on expand */}
      <span
        style={{
          ...BASE_FONT,
          display: "block",
          fontWeight: weight,
          color: "var(--text)",
          opacity: expanded ? 0 : targetOpacity,
          transition: `opacity ${xfadeMs}ms ease`,
        }}
      >
        {short}
      </span>

      {/* Long label — absolutely overlaid, clipped then revealed by container growth */}
      <span
        style={{
          ...BASE_FONT,
          position: "absolute",
          top: 0,
          left: 0,
          fontWeight: weight,
          color: "var(--text)",
          opacity: expanded ? targetOpacity : 0,
          transition: `opacity ${xfadeMs}ms ease ${longDelay}ms`,
        }}
      >
        {long}
      </span>
    </div>
  );
}

// ─── NavMark ─────────────────────────────────────────────────────────────────

interface Widths {
  ctShort: number;
  ctLong: number;
  ivShort: number;
  ivLong: number;
}

export function NavMark() {
  const [widths, setWidths] = useState<Widths | null>(null);
  const [expanded, setExpanded] = useState(false);
  // Suppress the transition on first paint so there's no entry animation
  const [animate, setAnimate] = useState(false);
  // Use a ref so event handlers always read the current value without stale closure
  const isMobileRef = useRef(false);

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;

    document.fonts.ready.then(() => {
      isMobileRef.current = window.innerWidth < MOBILE_BREAKPOINT;

      setWidths({
        ctShort: measureText("CT", 500),
        ctLong: measureText("Carl Thomas", 500),
        ivShort: measureText("_IV", 300),
        // Non-breaking space so the leading space is preserved after clipping
        ivLong: measureText("\u00A0IV", 300),
      });

      // Allow one rAF for the initial paint at collapsed width before
      // enabling transitions — prevents an animate-in from zero on mount
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimate(true));
      });

      // Mobile: auto-expand once after a short delay and stay expanded
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

  // Before fonts are measured, render a static fallback so there's no flash
  if (!widths) {
    return (
      <div style={{ display: "inline-flex", alignItems: "center" }}>
        <span style={{ ...BASE_FONT, fontWeight: 500, color: "var(--text)" }}>CT</span>
        <span style={{ ...BASE_FONT, fontWeight: 300, color: "var(--text)", opacity: 0.28 }}>_IV</span>
      </div>
    );
  }

  return (
    <div
      style={{ display: "inline-flex", alignItems: "center", cursor: "default" }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Left: CT → Carl Thomas */}
      <Segment
        short="CT"
        long="Carl Thomas"
        weight={500}
        targetOpacity={1}
        shortWidth={widths.ctShort}
        longWidth={widths.ctLong}
        expanded={expanded}
        animate={animate}
        delay={0}
        duration={duration}
      />

      {/* Right: _IV → " IV" (with leading non-breaking space) */}
      <Segment
        short="_IV"
        long={"\u00A0IV"}
        weight={300}
        targetOpacity={0.28}
        shortWidth={widths.ivShort}
        longWidth={widths.ivLong}
        expanded={expanded}
        animate={animate}
        delay={STAGGER_MS}
        duration={duration}
      />
    </div>
  );
}
