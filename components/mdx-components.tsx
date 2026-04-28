/**
 * MDX component library for case studies.
 * Pure rendering components — no client hooks. Interactive components
 * (CaseImage, ImageGrid, Slideshow) live in mdx-components-interactive.tsx.
 */

import React from "react";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";

export { CaseImage, ImageGrid, Slideshow, AutomationFunnel, RepoFanout, SystemModel, HybridModel, NumberedList, UseCaseSplit } from "./mdx-components-interactive";

// ─── Typography defaults ──────────────────────────────────────────────────────

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
        fontSize: "18px",
        fontWeight: 400,
        color: "var(--text)",
        marginTop: "40px",
        marginBottom: "10px",
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
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong
      {...props}
      style={{
        fontFamily: "var(--font-dm-serif-display)",
        fontSize: "1.08em",
        fontWeight: 400,
        color: "var(--text)",
        ...props.style,
      }}
    />
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

// ─── Pullquote ────────────────────────────────────────────────────────────────

export function Pullquote({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ margin: "36px 0", padding: "0 0 0 20px", borderLeft: "2px solid var(--text)" }}>
      <p style={{
        fontFamily: "var(--font-dm-serif-display)",
        fontSize: "18px",
        fontWeight: 400,
        lineHeight: 1.3,
        color: "var(--text)",
        margin: 0,
      }}>
        {children}
      </p>
    </div>
  );
}

// ─── Callout ──────────────────────────────────────────────────────────────────

export function Callout({ children, label, info }: { children: React.ReactNode; label?: string; info?: boolean }) {
  if (info) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "10px",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "12px 0",
          margin: "24px 0",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: "2px", opacity: 0.4 }}>
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 7v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="8" cy="4.5" r="0.75" fill="currentColor"/>
        </svg>
        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", lineHeight: 1.6, color: "var(--text-muted)", margin: 0, opacity: 0.7 }}>
          {children}
        </p>
      </div>
    );
  }

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

// ─── Visual placeholder ───────────────────────────────────────────────────────

export function Visual({ name, description }: { name: string; description?: string }) {
  return (
    <div
      style={{
        border: "1px dashed var(--border)",
        borderRadius: "8px",
        padding: "32px 24px",
        margin: "32px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        textAlign: "center",
        minHeight: "120px",
      }}
    >
      <p style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", opacity: 0.4, margin: 0 }}>
        Visual
      </p>
      <p style={{ fontFamily: "var(--font-dm-mono)", fontSize: "12px", letterSpacing: "0.04em", color: "var(--text-muted)", margin: 0, opacity: 0.6 }}>
        {name}
      </p>
      {description && (
        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "12px", color: "var(--text-muted)", margin: "4px 0 0", opacity: 0.45, maxWidth: "480px", lineHeight: 1.5 }}>
          {description}
        </p>
      )}
    </div>
  );
}

// ─── Article card ─────────────────────────────────────────────────────────────

export function ArticleCard({ href, label, description, image, imageBg }: { href: string; label: string; description?: string; image?: string; imageBg?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "8px", textDecoration: "none", margin: "32px 0" }}
    >
      {image && (
        <div style={{ flexShrink: 0, width: "80px", height: "52px", borderRadius: "5px", overflow: "hidden", border: "1px solid var(--border)", background: imageBg ?? "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src={image} alt="" style={{ width: "100%", height: "100%", objectFit: imageBg ? "contain" : "cover", display: "block", padding: imageBg ? "6px" : "0" }} />
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        {description && (
          <p style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 4px", opacity: 0.6 }}>
            {description}
          </p>
        )}
        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: "var(--text)", margin: 0, lineHeight: 1.4 }}>
          {label}
        </p>
      </div>
      <ArrowRight size={14} strokeWidth={1.5} style={{ flexShrink: 0, color: "var(--text-muted)", opacity: 0.5 }} />
    </a>
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
