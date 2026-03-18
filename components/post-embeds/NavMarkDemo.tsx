"use client";

import { NavMark } from "@/components/NavMark";

export function NavMarkDemo() {
  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: "8px",
        padding: "40px 32px",
        margin: "32px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <NavMark />

      <span
        style={{
          fontFamily: "var(--font-dm-mono)",
          fontSize: "10px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          opacity: 0.5,
        }}
      >
        Hover to expand
      </span>
    </div>
  );
}
