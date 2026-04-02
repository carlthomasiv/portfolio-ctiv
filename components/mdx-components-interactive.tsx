"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";

// ─── Automation funnel ────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const CONNECTOR_COLOR = "var(--text-muted)";
const CONNECTOR_OPACITY = 0.3;

// Horizontal: dot (half behind prev card) + line through chevron tip
// Vertical: same pattern rotated 90°, dot half behind card above
const Arrow = ({ horizontal }: { horizontal?: boolean }) => horizontal ? (
  <svg width="36" height="16" viewBox="0 0 36 16" fill="none" style={{ flexShrink: 0, overflow: "visible" }}>
    <g opacity={CONNECTOR_OPACITY}>
      <circle cx="4" cy="8" r="4" fill={CONNECTOR_COLOR}/>
      <line x1="8" y1="8" x2="36" y2="8" stroke={CONNECTOR_COLOR} strokeWidth="1"/>
      <polyline points="28,4 36,8 28,12" stroke={CONNECTOR_COLOR} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
  </svg>
) : (
  <svg width="16" height="48" viewBox="0 0 16 48" fill="none" style={{ overflow: "visible" }}>
    <g opacity={CONNECTOR_OPACITY}>
      <circle cx="8" cy="4" r="4" fill={CONNECTOR_COLOR}/>
      <line x1="8" y1="8" x2="8" y2="48" stroke={CONNECTOR_COLOR} strokeWidth="1"/>
      <polyline points="4,40 8,48 12,40" stroke={CONNECTOR_COLOR} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
  </svg>
);

const Card = ({ step, label, value, sub, dim }: { step: string; label: string; value: string; sub: string; dim?: boolean }) => (
  <div style={{
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: "8px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    opacity: dim ? 0.7 : 1,
  }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)" }}>{label}</span>
      <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", color: "var(--text-muted)", opacity: 0.4 }}>{step}</span>
    </div>
    <div>
      <div style={{ fontFamily: "var(--font-dm-serif-display)", fontSize: "32px", fontWeight: 400, color: "var(--text)", lineHeight: 1 }}>{value}</div>
      <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", letterSpacing: "0.06em", color: "var(--text-muted)", marginTop: "6px" }}>{sub}</div>
    </div>
  </div>
);

const parseValue = (val: string) => {
  const match = val.match(/^([^0-9]*)([0-9,.]+)(.*)$/);
  if (!match) return { prefix: "", number: val, suffix: "" };
  return { prefix: match[1], number: match[2], suffix: match[3] };
};

const StatNumber = ({ value, size = 36 }: { value: string; size?: number }) => {
  const { prefix, number, suffix } = parseValue(value);
  const adornSize = Math.round(size * 0.42);
  return (
    <div style={{ display: "flex", alignItems: "baseline", lineHeight: 1 }}>
      {prefix && <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: `${adornSize}px`, fontWeight: 700, color: "var(--text)", marginRight: "2px" }}>{prefix}</span>}
      <span style={{ fontFamily: "var(--font-dm-serif-display)", fontSize: `${size}px`, fontWeight: 400, color: "var(--text)", lineHeight: 1 }}>{number}</span>
      {suffix && <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: `${adornSize}px`, fontWeight: 700, color: "var(--text)", marginLeft: "2px" }}>{suffix}</span>}
    </div>
  );
};

export function AutomationFunnel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const fade = (i: number) => ({
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.1, ease: EASE } },
  });

  // Four linear stages: Trigger → Execution → Review → Output
  const stages = [
    {
      step: "01", label: "Trigger", value: "36K+", sub: "events fired",
    },
    {
      step: "02", label: "Execution", value: "99.7%", sub: "trigger-to-run rate",
    },
    {
      step: "03", label: "Review", value: "~457", sub: "of 36K+ needed human review",
    },
    {
      step: "04", label: "Output", split: [
        { value: "849", sub: "pull requests" },
        { value: "2,291", sub: "reports" },
      ],
    },
  ];

  return (
    <div ref={ref} style={{ margin: "40px 0" }}>

      {/* Desktop */}
      <div className="hidden md:flex" style={{ alignItems: "stretch", gap: "0" }}>
        {stages.map((s, i) => (
          <React.Fragment key={s.step}>
            <motion.div
              variants={fade(i)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              style={{ flex: 1, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "16px 18px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "8px", position: "relative", zIndex: 1 }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)" }}>{s.label}</span>
                <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", color: "var(--text-muted)", opacity: 0.35 }}>{s.step}</span>
              </div>
              {"split" in s && s.split ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {s.split.map((item, si) => (
                    <div key={item.sub} style={{ paddingTop: si > 0 ? "10px" : 0, borderTop: si > 0 ? "1px solid var(--border)" : "none" }}>
                      <StatNumber value={item.value} size={28} />
                      <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.06em", color: "var(--text-muted)", marginTop: "5px" }}>{item.sub}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ marginTop: "auto" }}>
                  <StatNumber value={"value" in s ? s.value ?? "" : ""} size={34} />
                  <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.06em", color: "var(--text-muted)", marginTop: "5px" }}>{"sub" in s ? s.sub : ""}</div>
                </div>
              )}
            </motion.div>
            {i < stages.length - 1 && (
              <motion.div variants={fade(i)} initial="hidden" animate={inView ? "visible" : "hidden"} style={{ display: "flex", alignItems: "center", flexShrink: 0, marginLeft: "-4px", position: "relative", zIndex: 0 }}>
                <Arrow horizontal />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile */}
      <div className="flex md:hidden" style={{ flexDirection: "column", gap: "0" }}>
        {stages.map((s, i) => (
          <React.Fragment key={s.step + "-m"}>
            <motion.div variants={fade(i)} initial="hidden" animate={inView ? "visible" : "hidden"} style={{ position: "relative", zIndex: 1 }}>
              <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "16px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                  <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)" }}>{s.label}</span>
                  <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", color: "var(--text-muted)", opacity: 0.4 }}>{s.step}</span>
                </div>
                {"split" in s && s.split ? (
                  <div style={{ display: "flex", gap: "20px" }}>
                    {s.split.map((item) => (
                      <div key={item.sub}>
                        <StatNumber value={item.value} size={26} />
                        <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", fontWeight: 500, color: "var(--text-muted)", marginTop: "4px" }}>{item.sub}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                    <StatNumber value={"value" in s ? s.value ?? "" : ""} size={30} />
                    <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", fontWeight: 500, color: "var(--text-muted)" }}>{"sub" in s ? s.sub : ""}</span>
                  </div>
                )}
              </div>
            </motion.div>
            {i < stages.length - 1 && (
              <div style={{ display: "flex", justifyContent: "center", position: "relative", zIndex: 0, marginTop: "-4px" }}><Arrow /></div>
            )}
          </React.Fragment>
        ))}
      </div>

    </div>
  );
}

// ─── Hybrid model diagram ─────────────────────────────────────────────────────

const HYBRID_STEPS: { type: "agent" | "script"; intent: string; command?: string }[] = [
  { type: "agent",  intent: "Analyze repository for outdated Node dependencies" },
  { type: "script", intent: "Fetch latest remote state", command: "git fetch --all --prune" },
  { type: "agent",  intent: "Determine if a version bump PR is needed" },
  { type: "script", intent: "Run tests and lint before making changes", command: "npm test && npm run lint" },
  { type: "agent",  intent: "Draft a PR description with scope and rationale" },
  { type: "script", intent: "Open a draft pull request", command: "gh pr create --draft" },
];

const HYBRID_TYPE = {
  agent:  {
    label: "Agent",
    dot: "rgba(99,102,241,0.7)",
    badge: { bg: "rgba(99,102,241,0.08)", color: "rgba(99,102,241,0.85)" },
  },
  script: {
    label: "Script",
    dot: "var(--border)",
    badge: { bg: "transparent", color: "var(--text-muted)" },
  },
};

export function HybridModel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const EASE_LOCAL: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const LINE_COLOR = "var(--border)";
  const DOT_SIZE = 10;
  const GUTTER = 28; // px from left edge to center of timeline

  return (
    <div ref={ref} style={{ margin: "40px 0" }}>
    <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "10px", padding: "24px 28px" }}>
      {/* Legend */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
        {(["agent", "script"] as const).map((t) => {
          const cfg = HYBRID_TYPE[t];
          return (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{
                width: DOT_SIZE, height: DOT_SIZE, borderRadius: "50%",
                background: cfg.dot,
                border: t === "script" ? "1.5px solid var(--text-muted)" : "none",
                opacity: t === "script" ? 0.4 : 1,
                flexShrink: 0,
              }} />
              <span style={{
                fontFamily: "var(--font-dm-mono)", fontSize: "10px",
                fontWeight: 500, letterSpacing: "0.06em",
                textTransform: "uppercase", color: "var(--text-muted)",
              }}>
                {cfg.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Timeline */}
      <div style={{ position: "relative" }}>
        {/* Vertical line */}
        <div style={{
          position: "absolute",
          left: GUTTER - 0.5,
          top: DOT_SIZE / 2,
          bottom: DOT_SIZE / 2,
          width: "1px",
          background: LINE_COLOR,
          opacity: 0.35,
        }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {HYBRID_STEPS.map((step, i) => {
            const cfg = HYBRID_TYPE[step.type];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.38, delay: i * 0.08, ease: EASE_LOCAL }}
                style={{ display: "flex", alignItems: "flex-start", gap: "0", paddingBottom: i < HYBRID_STEPS.length - 1 ? "20px" : "0" }}
              >
                {/* Dot column */}
                <div style={{
                  width: GUTTER * 2,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: "2px",
                  position: "relative",
                }}>
                  {/* Step number */}
                  <span style={{
                    position: "absolute", left: 0,
                    fontFamily: "var(--font-dm-mono)", fontSize: "9px",
                    color: "var(--text-muted)", opacity: 0.4,
                    lineHeight: 1,
                    paddingTop: "1px",
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* Dot */}
                  <div style={{
                    width: DOT_SIZE, height: DOT_SIZE, borderRadius: "50%",
                    background: step.type === "agent" ? cfg.dot : "var(--bg, #fafafa)",
                    border: step.type === "script" ? "1.5px solid var(--text-muted)" : "none",
                    opacity: step.type === "script" ? 0.4 : 1,
                    flexShrink: 0,
                    position: "relative", zIndex: 1,
                  }} />
                </div>

                {/* Content */}
                <div style={{ paddingTop: "0", flex: 1 }}>
                  {/* Type badge */}
                  <span style={{
                    display: "inline-block",
                    fontFamily: "var(--font-dm-mono)", fontSize: "9px",
                    fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
                    padding: "2px 6px", borderRadius: "3px",
                    background: cfg.badge.bg, color: cfg.badge.color,
                    border: step.type === "script" ? "1px solid var(--border)" : "none",
                    marginBottom: "5px",
                  }}>
                    {cfg.label}
                  </span>
                  {/* Intent */}
                  <div style={{
                    fontFamily: "var(--font-dm-sans)", fontSize: "13px",
                    color: "var(--text)", lineHeight: 1.4,
                    marginBottom: step.command ? "5px" : "0",
                  }}>
                    {step.intent}
                  </div>
                  {/* Command (script steps only) */}
                  {step.command && (
                    <div style={{
                      fontFamily: "var(--font-dm-mono)", fontSize: "11px",
                      color: "var(--text-muted)", opacity: 0.65,
                      background: "var(--border)",
                      padding: "3px 8px", borderRadius: "4px",
                      display: "inline-block",
                    }}>
                      {step.command}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: "20px", paddingTop: "14px",
        borderTop: "1px solid var(--border)",
        fontFamily: "var(--font-dm-mono)", fontSize: "10px",
        color: "var(--text-muted)", opacity: 0.5, lineHeight: 1.6,
      }}>
        Agent steps apply judgment. Script steps apply consistency.
      </div>
    </div>
    </div>
  );
}

// ─── System model diagram ─────────────────────────────────────────────────────

const SYSTEM_STAGES = [
  { step: "01", label: "Trigger", desc: "When it fires", items: ["Manual", "Scheduled", "Event-driven"] },
  { step: "02", label: "Context", desc: "Where it runs", items: ["Repos", "Branches", "Scope"] },
  { step: "03", label: "Steps", desc: "What happens", items: ["Agent reasoning", "Shell scripts", "Validations"] },
  { step: "04", label: "Report", desc: "What surfaces", items: ["Outcomes", "Failures", "Next actions"] },
];

export function SystemModel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const EASE_LOCAL: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <div ref={ref} style={{ margin: "32px 0" }}>
      {/* Desktop */}
      <div className="hidden md:flex" style={{ alignItems: "stretch", gap: "0" }}>
        {SYSTEM_STAGES.map((s, i) => (
          <React.Fragment key={s.step}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08, ease: EASE_LOCAL }}
              style={{
                flex: 1, background: "var(--bg-card)", border: "1px solid var(--border)",
                borderRadius: "8px", padding: "16px 18px", display: "flex", flexDirection: "column",
                gap: "10px", position: "relative", zIndex: 1,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)" }}>{s.label}</span>
                <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", color: "var(--text-muted)", opacity: 0.35 }}>{s.step}</span>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-dm-serif-display)", fontSize: "20px", color: "var(--text)", lineHeight: 1.1, marginBottom: "8px" }}>{s.desc}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                  {s.items.map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "9px", color: "var(--text-muted)", opacity: 0.4, flexShrink: 0 }}>·</span>
                      <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.04em", color: "var(--text-muted)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            {i < SYSTEM_STAGES.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: i * 0.08 + 0.2, ease: EASE_LOCAL }}
                style={{ display: "flex", alignItems: "center", flexShrink: 0, marginLeft: "-4px", position: "relative", zIndex: 0 }}
              >
                <Arrow horizontal />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile */}
      <div className="flex md:hidden" style={{ flexDirection: "column", gap: "0" }}>
        {SYSTEM_STAGES.map((s, i) => (
          <React.Fragment key={s.step + "-m"}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08, ease: EASE_LOCAL }}
              style={{ position: "relative", zIndex: 1 }}
            >
              <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "14px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)" }}>{s.label}</span>
                  <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", color: "var(--text-muted)", opacity: 0.4 }}>{s.step}</span>
                </div>
                <div style={{ fontFamily: "var(--font-dm-serif-display)", fontSize: "18px", color: "var(--text)", lineHeight: 1.1, marginBottom: "6px" }}>{s.desc}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                  {s.items.map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "9px", color: "var(--text-muted)", opacity: 0.4, flexShrink: 0 }}>·</span>
                      <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", fontWeight: 500, color: "var(--text-muted)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            {i < SYSTEM_STAGES.length - 1 && (
              <div style={{ display: "flex", justifyContent: "center", position: "relative", zIndex: 0, marginTop: "-4px" }}>
                <Arrow />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// ─── Repo fanout comparison ───────────────────────────────────────────────────

const GRID_REPOS = [
  "payment-gateway", "fraud-detection", "kyc-service", "ledger-core", "risk-scoring",
  "card-processing", "compliance-engine", "transaction-api", "account-service", "onboarding",
  "reporting-service", "auth-service",
];

function PanelHeader({ title, subtitle, time }: { title: string; subtitle: string; time: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px", marginBottom: "12px" }}>
      <div>
        <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", fontWeight: 600, color: "var(--text)", lineHeight: 1.2 }}>{title}</div>
        <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", letterSpacing: "0.04em", color: "var(--text-muted)", marginTop: "3px", opacity: 0.6 }}>{subtitle}</div>
      </div>
      <div style={{
        fontFamily: "var(--font-dm-serif-display)", fontSize: "13px", color: "var(--text)",
        background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "4px",
        padding: "3px 7px", flexShrink: 0, whiteSpace: "nowrap",
      }}>{time}</div>
    </div>
  );
}

// Left panel: vertical queue — one active, rest dimmed/waiting
function QueuePanel({ fadeDelay }: { fadeDelay: number }) {
  const EASE_LOCAL: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const rows = [
    { name: "payment-gateway", status: "done" as const },
    { name: "fraud-detection", status: "active" as const },
    { name: "kyc-service", status: "waiting" as const },
    { name: "ledger-core", status: "waiting" as const },
    { name: "risk-scoring", status: "waiting" as const },
    { name: "card-processing", status: "waiting" as const },
    { name: "compliance-engine", status: "waiting" as const },
    { name: "transaction-api", status: "waiting" as const },
    { name: "account-service", status: "waiting" as const },
    { name: "onboarding", status: "waiting" as const },
    { name: "reporting-service", status: "waiting" as const },
    { name: "auth-service", status: "waiting" as const },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: fadeDelay, ease: EASE_LOCAL }}
      style={{ flex: 1, minWidth: "240px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "10px", padding: "16px" }}
    >
      <PanelHeader title="Repo by repo" subtitle="One at a time" time="~6 months" />
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {rows.map((r) => (
          <div key={r.name} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "7px 10px", borderRadius: "6px", border: "1px solid var(--border)",
            background: "var(--bg)", opacity: r.status === "waiting" ? Math.max(0.15, 0.6 - rows.indexOf(r) * 0.05) : 1, gap: "8px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", minWidth: 0 }}>
              <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "9px", color: "var(--text-muted)", opacity: 0.5, flexShrink: 0 }}>repo</span>
              <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "11px", color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.name}</span>
            </div>
            <span style={{
              fontFamily: "var(--font-dm-mono)", fontSize: "10px", flexShrink: 0,
              color: r.status === "done" ? "var(--green-tag-text)" : "var(--text-muted)",
            }}>
              {r.status === "done" ? "Merged" : r.status === "active" ? "Running" : "Waiting"}
            </span>
          </div>
        ))}
        <div style={{ textAlign: "center", padding: "6px", fontFamily: "var(--font-dm-mono)", fontSize: "10px", color: "var(--text-muted)", opacity: 0.4 }}>
          +996 more repos
        </div>
      </div>
    </motion.div>
  );
}

// Right panel: dense grid — all running simultaneously
function GridPanel({ fadeDelay }: { fadeDelay: number }) {
  const EASE_LOCAL: [number, number, number, number] = [0.22, 1, 0.36, 1];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: fadeDelay, ease: EASE_LOCAL }}
      style={{ flex: 1, minWidth: "240px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "10px", padding: "16px" }}
    >
      <PanelHeader title="In parallel" subtitle="All repos at once" time="~2 weeks" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px" }}>
        {GRID_REPOS.map((name, i) => (
          <div key={name} style={{
            padding: "7px 8px", borderRadius: "6px", border: "1px solid var(--border)",
            background: "var(--bg)",
            opacity: i === 0 ? 1 : 0.85,
          }}>
            <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "9px", color: "var(--text-muted)", opacity: 0.5, marginBottom: "2px" }}>repo</div>
            <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: "4px" }}>{name}</div>
            <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", color: i === 0 ? "var(--green-tag-text)" : "var(--text-muted)" }}>
              {i === 0 ? "Merged" : "Running"}
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", padding: "8px 0 2px", fontFamily: "var(--font-dm-mono)", fontSize: "10px", color: "var(--text-muted)", opacity: 0.4 }}>
        +989 more repos
      </div>
    </motion.div>
  );
}

export function RepoFanout() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} style={{ margin: "40px 0" }}>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "stretch" }}>
        {inView && (
          <>
            <QueuePanel fadeDelay={0} />
            <GridPanel fadeDelay={0.1} />
          </>
        )}
      </div>
    </div>
  );
}

// ─── Numbered list ────────────────────────────────────────────────────────────

export function NumberedList({ items }: { items: { label: string; description: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const EASE_LOCAL: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <div ref={ref} style={{ margin: "32px 0", display: "flex", flexDirection: "column", gap: "0" }}>
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.38, delay: i * 0.08, ease: EASE_LOCAL }}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "16px",
            padding: "16px 0",
            borderBottom: i < items.length - 1 ? "1px solid var(--border)" : "none",
          }}
        >
          {/* Step number */}
          <span style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.06em",
            color: "var(--text-muted)",
            opacity: 0.4,
            flexShrink: 0,
            paddingTop: "3px",
            width: "20px",
          }}>
            {String(i + 1).padStart(2, "0")}
          </span>
          {/* Content */}
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--text)",
              marginBottom: "5px",
              lineHeight: 1.3,
            }}>
              {item.label}
            </div>
            <div style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "13px",
              color: "var(--text-muted)",
              lineHeight: 1.6,
            }}>
              {item.description}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Image (lightbox) ─────────────────────────────────────────────────────────

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

// ─── Image grid (lightbox) ────────────────────────────────────────────────────

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

// ─── Slideshow (drag-scroll) ──────────────────────────────────────────────────

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
