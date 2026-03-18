"use client";

const BEFORE = `const [systemPref, setSystemPref] = useState("light");

function cycle() {
  // reads systemPref from the render it was created in
  const resolved = next === "system"
    ? systemPref        // ← stale snapshot
    : next;
}`;

const AFTER = `const systemPrefRef = useRef("light");

function cycle() {
  // always reads the current value, regardless of render
  const resolved = next === "system"
    ? systemPrefRef.current   // ← always fresh
    : next;
}`;

export function ClosureComparison() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "12px",
        margin: "32px 0",
      }}
    >
      {(
        [
          {
            label: "Before",
            code: BEFORE,
            accent: "rgba(220,60,60,0.55)",
            bg: "rgba(220,60,60,0.04)",
          },
          {
            label: "After",
            code: AFTER,
            accent: "rgba(30,160,100,0.5)",
            bg: "rgba(30,160,100,0.04)",
          },
        ] as const
      ).map(({ label, code, accent, bg }) => (
        <div key={label}>
          <div
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: "10px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              opacity: 0.55,
              marginBottom: "8px",
            }}
          >
            {label}
          </div>
          <pre
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: "12px",
              lineHeight: 1.7,
              color: "var(--text)",
              background: `color-mix(in srgb, var(--bg-card) 92%, transparent)`,
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderLeft: `3px solid ${accent}`,
              borderRadius: "0 6px 6px 0",
              padding: "16px",
              overflowX: "auto",
              margin: 0,
              whiteSpace: "pre",
            }}
          >
            <code>{code}</code>
          </pre>
        </div>
      ))}
    </div>
  );
}
