"use client";

import { useEffect, useRef } from "react";

const CELL        = 18;    // grid spacing in px — tighter, denser field
const RING_SPEED  = 160;   // px/s — fast enough to clear before next pulse
const RING_SIGMA  = 44;    // px — wider rings, softer edge
const RING_FREQ   = 0.08;  // slightly looser oscillation
const FADE        = 0.9;   // faster fade so single is gone before double fires
const SIZE_BASE   = 8;     // resting dot size in px
const SIZE_DELTA  = 5;     // max size increase at ring crest
const OP_MIN      = 0.05;  // quiet resting grid
const OP_MAX      = 0.35;  // peak opacity as ring passes

// Breathing pattern: one large pulse → wait → two smaller pulses → wait → repeat
const CYCLE  = 7.0;
const PULSES: { offset: number; amp: number }[] = [
  { offset: 0,   amp: 1.5 },  // single — larger, more presence
  { offset: 3.2, amp: 1.0 },  // double — first
  { offset: 3.75, amp: 1.0 }, // double — second
];
const MAX_AGE = CYCLE + 0.5;

export function PostHero() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef       = useRef<number>(0);
  const timeRef      = useRef<number>(0);
  const lastRef      = useRef<number>(0);

  useEffect(() => {
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width  = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const getTextColor = () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--text")
        .trim() || "#111318";

    const draw = (timestamp: number) => {
      const delta = lastRef.current
        ? (timestamp - lastRef.current) / 1000
        : 0;
      lastRef.current  = timestamp;
      timeRef.current += delta;

      const t = timeRef.current;
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      const cx = w / 2;
      const cy = h / 2;

      // Collect active pulses across current + previous cycle
      const activePulses: { born: number; amp: number }[] = [];
      const cycle = Math.floor(t / CYCLE);
      for (let c = Math.max(0, cycle - 1); c <= cycle; c++) {
        for (const p of PULSES) {
          const born = c * CYCLE + p.offset;
          if (born <= t && t - born < MAX_AGE) {
            activePulses.push({ born, amp: p.amp });
          }
        }
      }

      ctx.clearRect(0, 0, w, h);
      ctx.textAlign    = "center";
      ctx.textBaseline = "middle";

      const color = getTextColor();
      const cols  = Math.ceil(w / CELL) + 1;
      const rows  = Math.ceil(h / CELL) + 1;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const px   = col * CELL + CELL / 2;
          const py   = row * CELL + CELL / 2;
          const dist = Math.sqrt((px - cx) ** 2 + (py - cy) ** 2);

          let totalWave = 0;

          for (const { born, amp } of activePulses) {
            const age      = t - born;
            const front    = age * RING_SPEED;
            const dr       = dist - front;
            const spatial  = Math.exp(-(dr * dr) / (2 * RING_SIGMA * RING_SIGMA));
            const temporal = Math.exp(-age * FADE);
            totalWave += Math.cos(dr * RING_FREQ) * spatial * temporal * amp;
          }

          // Soft clamp
          totalWave = Math.tanh(totalWave);

          // Dots stay pinned — size swells as the ring passes through
          const t01    = (totalWave + 1) / 2;
          const size   = SIZE_BASE + t01 * SIZE_DELTA;
          const opacity = OP_MIN + t01 * (OP_MAX - OP_MIN);

          ctx.font        = `400 ${size.toFixed(1)}px "DM Mono", monospace`;
          ctx.globalAlpha = opacity;
          ctx.fillStyle   = color;
          ctx.fillText("·", px, py);
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "360px",
        overflow: "hidden",
        borderRadius: "8px",
        border: "1px solid var(--border)",
        background: "color-mix(in srgb, var(--bg) 60%, var(--bg-card))",
        marginBottom: "48px",
      }}
    >
      {/* Ripple canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0 }}
      />

      {/* CT_IV mark — glass pill at the pulse origin */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
            fontSize: "20px",
            fontWeight: 500,
            letterSpacing: "0.06em",
            color: "var(--text)",
            background: "color-mix(in srgb, var(--bg) 55%, transparent)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            border: "1px solid color-mix(in srgb, var(--border-strong) 60%, transparent)",
            borderRadius: "6px",
            padding: "12px 22px",
            userSelect: "none",
            lineHeight: 1,
          }}
        >
          <span>CT</span>
          <span style={{ opacity: 0.4, fontWeight: 300 }}>_IV</span>
        </div>
      </div>
    </div>
  );
}
