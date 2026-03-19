"use client";

/**
 * MDX component library for case studies.
 *
 * These are the building blocks you use inside .mdx files.
 * Prose (paragraphs, headings, lists) is handled by the base
 * MDX typography styles below. Richer blocks use these components.
 *
 * Usage in MDX:
 *   <Metrics items={[{ value: "40%", label: "reduction in time", trend: "down" }]} />
 *   <Comparison before={...} after={...} />
 *   <ImageGrid images={[{ src: "/...", alt: "..." }]} columns={2} />
 *   <Callout>Some highlighted insight.</Callout>
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";

// ─── Typography defaults ──────────────────────────────────────────────────────
// Applied to plain markdown elements rendered by MDX

export const mdxTypography = {
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      {...props}
      style={{
        fontFamily: "var(--font-dm-sans)",
        fontSize: "15px",
        lineHeight: 1.75,
        color: "var(--text-muted)",
        marginBottom: "20px",
        ...props.style,
      }}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      {...props}
      style={{
        fontFamily: "var(--font-dm-serif-display)",
        fontSize: "26px",
        fontWeight: 400,
        color: "var(--text)",
        marginTop: "48px",
        marginBottom: "12px",
        ...props.style,
      }}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      {...props}
      style={{
        fontFamily: "var(--font-dm-serif-display)",
        fontSize: "20px",
        fontWeight: 400,
        color: "var(--text)",
        marginTop: "32px",
        marginBottom: "10px",
        ...props.style,
      }}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      {...props}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        marginBottom: "20px",
        paddingLeft: 0,
        listStyle: "none",
        ...props.style,
      }}
    />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li
      {...props}
      style={{
        display: "flex",
        gap: "10px",
        fontFamily: "var(--font-dm-sans)",
        fontSize: "15px",
        lineHeight: 1.65,
        color: "var(--text-muted)",
        ...props.style,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-dm-mono)",
          fontSize: "14px",
          color: "var(--text-muted)",
          flexShrink: 0,
          lineHeight: 1.65,
        }}
      >
        &bull;
      </span>
      <span>{(props as { children?: React.ReactNode }).children}</span>
    </li>
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      style={{
        borderLeft: "2px solid var(--border)",
        paddingLeft: "20px",
        marginTop: "32px",
        marginBottom: "32px",
        marginLeft: 0,
        marginRight: 0,
        ...props.style,
      }}
    />
  ),
  hr: () => (
    <hr
      style={{
        border: "none",
        borderTop: "1px solid var(--border)",
        margin: "40px 0",
      }}
    />
  ),
};

// ─── Metrics block ────────────────────────────────────────────────────────────

interface MetricItem {
  value: string;
  label: string;
  trend?: "up" | "down";
}

export function Metrics({ items }: { items: MetricItem[] }) {
  const parseValue = (val: string) => {
    const match = val.match(/^([^0-9]*)([0-9,.]+)(.*)$/);
    if (!match) return { prefix: "", number: val, suffix: "" };
    return { prefix: match[1], number: match[2], suffix: match[3] };
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "32px",
        paddingTop: "32px",
        paddingBottom: "32px",
        marginBottom: "20px",
      }}
    >
      {items.map((item) => {
        const { prefix, number, suffix } = parseValue(item.value);
        return (
          <div key={item.label} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <div style={{ display: "flex", alignItems: "baseline", lineHeight: 1 }}>
                {prefix && (
                  <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "20px", fontWeight: 700, color: "var(--text)", marginRight: "2px" }}>
                    {prefix}
                  </span>
                )}
                <span style={{ fontFamily: "var(--font-dm-serif-display)", fontSize: "52px", fontWeight: 400, color: "var(--text)", lineHeight: 1 }}>
                  {number}
                </span>
                {suffix && (
                  <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "20px", fontWeight: 700, color: "var(--text)", marginLeft: "3px" }}>
                    {suffix}
                  </span>
                )}
              </div>
              {item.trend === "up" && <TrendingUp size={18} strokeWidth={1.5} style={{ color: "var(--green-tag-text)", flexShrink: 0, marginBottom: "4px" }} />}
              {item.trend === "down" && <TrendingDown size={18} strokeWidth={1.5} style={{ color: "var(--green-tag-text)", flexShrink: 0, marginBottom: "4px" }} />}
            </div>
            <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)" }}>
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Callout ──────────────────────────────────────────────────────────────────

export function Callout({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        padding: "20px 24px",
        margin: "32px 0",
      }}
    >
      {label && (
        <p style={{ fontFamily: "var(--font-dm-mono)", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 10px" }}>
          {label}
        </p>
      )}
      <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "15px", lineHeight: 1.7, color: "var(--text-muted)" }}>
        {children}
      </div>
    </div>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-dm-mono)",
        fontSize: "11px",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--text-muted)",
        borderBottom: "1px solid var(--border)",
        paddingBottom: "12px",
        marginBottom: "32px",
        marginTop: "56px",
      }}
    >
      {children}
    </p>
  );
}

// ─── Image ────────────────────────────────────────────────────────────────────

export function CaseImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div style={{ marginBottom: "32px", cursor: "zoom-in" }} onClick={() => setOpen(true)}>
        <img
          src={src}
          alt={alt}
          style={{ width: "100%", height: "auto", borderRadius: "8px", border: "1px solid var(--border)", display: "block" }}
        />
        {caption && (
          <p style={{ fontFamily: "var(--font-dm-mono)", fontSize: "11px", letterSpacing: "0.04em", color: "var(--text-muted)", margin: "8px 0 0" }}>
            {caption}
          </p>
        )}
      </div>
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(20px) saturate(0.8)", WebkitBackdropFilter: "blur(20px) saturate(0.8)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", cursor: "zoom-out" }}
        >
          <img src={src} alt={alt} style={{ maxWidth: "100%", maxHeight: "85vh", borderRadius: "8px", boxShadow: "0 24px 80px rgba(0,0,0,0.4)", display: "block" }} onClick={e => e.stopPropagation()} />
          {alt && <p style={{ fontFamily: "var(--font-dm-mono)", fontSize: "12px", letterSpacing: "0.06em", color: "rgba(255,255,255,0.5)", marginTop: "16px" }}>{alt}</p>}
        </div>
      )}
    </>
  );
}

// ─── Image grid ───────────────────────────────────────────────────────────────

export function ImageGrid({
  images,
  columns = 2,
}: {
  images: { src: string; alt: string }[];
  columns?: 2 | 3;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const close = useCallback(() => setActiveIndex(null), []);
  const prev = useCallback(() => setActiveIndex(i => i !== null ? (i - 1 + images.length) % images.length : null), [images.length]);
  const next = useCallback(() => setActiveIndex(i => i !== null ? (i + 1) % images.length : null), [images.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, close, prev, next]);

  const active = activeIndex !== null ? images[activeIndex] : null;

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: "12px", marginBottom: "32px" }}>
        {images.map((img, i) => (
          <button key={i} onClick={() => setActiveIndex(i)} style={{ display: "block", padding: 0, background: "none", border: "none", cursor: "zoom-in", borderRadius: "8px", overflow: "hidden" }}>
            <img src={img.src} alt={img.alt} style={{ width: "100%", height: "auto", display: "block", borderRadius: "8px", border: "1px solid var(--border)" }} />
          </button>
        ))}
      </div>
      {active && (
        <div onClick={close} style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(20px) saturate(0.8)", WebkitBackdropFilter: "blur(20px) saturate(0.8)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", cursor: "zoom-out" }}>
          <img src={active.src} alt={active.alt} style={{ maxWidth: "100%", maxHeight: "80vh", borderRadius: "8px", boxShadow: "0 24px 80px rgba(0,0,0,0.4)", display: "block" }} onClick={e => e.stopPropagation()} />
          <div onClick={e => e.stopPropagation()} style={{ display: "flex", alignItems: "center", gap: "24px", marginTop: "20px" }}>
            <button onClick={prev} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-dm-mono)", fontSize: "13px", padding: "6px 14px", cursor: "pointer" }}>←</button>
            <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "12px", letterSpacing: "0.06em", color: "rgba(255,255,255,0.6)", textAlign: "center" }}>
              {active.alt}<span style={{ opacity: 0.4, marginLeft: "12px" }}>{(activeIndex ?? 0) + 1} / {images.length}</span>
            </span>
            <button onClick={next} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-dm-mono)", fontSize: "13px", padding: "6px 14px", cursor: "pointer" }}>→</button>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Slideshow ────────────────────────────────────────────────────────────────

export function Slideshow({ images }: { images: { src: string; alt: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!ref.current) return;
    isDragging.current = true;
    startX.current = e.pageX - ref.current.offsetLeft;
    scrollLeft.current = ref.current.scrollLeft;
    ref.current.style.cursor = "grabbing";
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    ref.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.2;
  };
  const onMouseUp = () => {
    isDragging.current = false;
    if (ref.current) ref.current.style.cursor = "grab";
  };

  return (
    <div
      ref={ref}
      className="no-scrollbar"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      style={{ overflowX: "auto", display: "flex", gap: "12px", scrollSnapType: "x mandatory", paddingBottom: "16px", marginBottom: "24px", cursor: "grab", userSelect: "none" }}
    >
      {images.map((img, i) => (
        <div key={i} style={{ flexShrink: 0, width: "82%", scrollSnapAlign: "start" }}>
          <img src={img.src} alt={img.alt} draggable={false} style={{ width: "100%", height: "auto", borderRadius: "8px", border: "1px solid var(--border)", display: "block" }} />
        </div>
      ))}
    </div>
  );
}

// ─── Comparison ───────────────────────────────────────────────────────────────

interface ComparisonSide {
  label: string;
  steps: Array<{ text: string; warning?: boolean }>;
  note: string;
}

export function Comparison({ before, after }: { before: ComparisonSide; after: ComparisonSide }) {
  const cardStyle: React.CSSProperties = { padding: "24px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "8px" };
  const labelStyle: React.CSSProperties = { fontFamily: "var(--font-dm-mono)", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 20px" };
  const noteStyle: React.CSSProperties = { fontFamily: "var(--font-dm-mono)", fontSize: "12px", letterSpacing: "0.03em", color: "var(--text-muted)", marginTop: "16px", paddingTop: "16px", borderTop: "1px solid var(--border)" };

  const renderSide = (side: ComparisonSide, showWarnings: boolean) => (
    <div style={cardStyle}>
      <p style={labelStyle}>{side.label}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {side.steps.map((step, i) => (
          <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "11px", letterSpacing: "0.04em", color: "var(--text-muted)", flexShrink: 0, paddingTop: "2px", minWidth: "18px" }}>{i + 1}.</span>
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "15px", lineHeight: 1.6, color: "var(--text-muted)" }}>
              {step.text}{showWarnings && step.warning && <span style={{ marginLeft: "6px" }}>⚠️</span>}
            </span>
          </div>
        ))}
      </div>
      <p style={noteStyle}>{side.note}</p>
    </div>
  );

  return (
    <div style={{ display: "grid", gap: "32px", marginBottom: "40px" }} className="grid-cols-1 md:grid-cols-2">
      {renderSide(before, true)}
      {renderSide(after, false)}
    </div>
  );
}

// ─── Link ─────────────────────────────────────────────────────────────────────

export function CaseLink({ href, label }: { href: string; label: string }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-dm-mono)", fontSize: "12px", letterSpacing: "0.06em", textDecoration: "none", borderBottom: "1px solid var(--border)", paddingBottom: "1px", lineHeight: 1, color: "var(--text)" }}
      >
        {label}
        <ArrowRight size={12} strokeWidth={1.5} />
      </a>
    </div>
  );
}
