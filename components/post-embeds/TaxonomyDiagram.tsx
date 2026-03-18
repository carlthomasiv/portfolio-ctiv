"use client";

const BEFORE = [
  "Developer Tools",
  "Infrastructure UX",
  "Cloud Infrastructure",
  "Growth",
  "Developer Education",
  "Collaboration",
];

const AFTER = [
  {
    name: "DX",
    sources: ["Developer Tools", "Developer Education", "Infrastructure UX"],
  },
  {
    name: "Infrastructure",
    sources: ["Cloud Infrastructure", "Infrastructure UX"],
  },
  {
    name: "Growth",
    sources: ["Growth", "Collaboration"],
  },
];

export function TaxonomyDiagram() {
  return (
    <div style={{ margin: "32px 0", border: "1px solid var(--border)", borderRadius: "8px", padding: "24px" }}>

      {/* Column headers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
          marginBottom: "12px",
        }}
      >
        {["Before", "After"].map((label) => (
          <span
            key={label}
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: "10px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              opacity: 0.5,
            }}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Rule */}
      <div style={{ borderTop: "1px solid var(--border)", marginBottom: "20px" }} />

      {/* Two-column body */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
          alignItems: "start",
        }}
      >
        {/* Before: flat list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {BEFORE.map((label) => (
            <span
              key={label}
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "13px",
                color: "var(--text-muted)",
                lineHeight: 1.4,
              }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* After: grouped pillars */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {AFTER.map((pillar) => (
            <div key={pillar.name}>
              {/* Pillar name — styled as the actual tag pill */}
              <span
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  padding: "2px 7px",
                  lineHeight: 1.6,
                  marginBottom: "8px",
                }}
              >
                {pillar.name}
              </span>

              {/* Source labels — plain, muted */}
              <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                {pillar.sources.map((src) => (
                  <span
                    key={src}
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "13px",
                      color: "var(--text-muted)",
                      lineHeight: 1.4,
                    }}
                  >
                    {src}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* AI & Agents — reserved */}
          <div>
            <span
              style={{
                display: "inline-block",
                fontFamily: "var(--font-dm-mono)",
                fontSize: "10px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                border: "1px dashed var(--border)",
                borderRadius: "4px",
                padding: "2px 7px",
                lineHeight: 1.6,
                opacity: 0.35,
                marginBottom: "4px",
              }}
            >
              AI & Agents
            </span>
            <div
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "13px",
                color: "var(--text-muted)",
                opacity: 0.35,
                fontStyle: "italic",
              }}
            >
              Reserved
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
