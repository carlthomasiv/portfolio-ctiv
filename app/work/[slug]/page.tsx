import Link from "next/link";

const projects: Record<string, { title: string; company: string; category: string }> = {
  automations: { title: "Automations", company: "Ona", category: "AI Workflows" },
  "rethinking-conversations": { title: "Rethinking Conversations", company: "Ona", category: "Conversation Design" },
  "voice-and-tone": { title: "Voice & Tone", company: "Ona", category: "Design Systems" },
  "instant-postgres-playground": { title: "Instant Postgres Playground", company: "Neon", category: "Developer Tools" },
  "console-navigation": { title: "Console Navigation", company: "Neon", category: "Infrastructure UX" },
  "upgrade-flow-redesign": { title: "Upgrade Flow Redesign", company: "Neon", category: "Growth" },
};

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects[slug];

  if (!project) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg)",
          color: "var(--text)",
          gap: "16px",
        }}
      >
        <p style={{ fontFamily: "var(--font-dm-mono)", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)" }}>
          404
        </p>
        <h1 style={{ fontFamily: "var(--font-dm-serif-display)", fontSize: "32px", fontWeight: 400 }}>
          Project not found
        </h1>
        <Link href="/" style={{ fontFamily: "var(--font-dm-mono)", fontSize: "11px", letterSpacing: "0.06em", color: "var(--text-muted)" }}>
          ← Back home
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--text)",
      }}
    >
      {/* Minimal nav */}
      <div
        style={{ borderBottom: "1px solid var(--border)", padding: "20px 48px" }}
        className="flex items-center justify-between"
      >
        <Link
          href="/"
          style={{ fontFamily: "var(--font-caveat)", fontSize: "28px", color: "var(--text)", textDecoration: "none" }}
        >
          CThomas
        </Link>
        <Link
          href="/"
          style={{ fontFamily: "var(--font-dm-mono)", fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", textDecoration: "none" }}
        >
          ← Back
        </Link>
      </div>

      {/* Case study placeholder */}
      <div className="px-6 md:px-12 pt-20 pb-32 max-w-3xl mx-auto">
        <p
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: "11px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            marginBottom: "16px",
          }}
        >
          {project.company} — {project.category}
        </p>
        <h1
          style={{
            fontFamily: "var(--font-dm-serif-display)",
            fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            color: "var(--text)",
            marginBottom: "48px",
          }}
        >
          {project.title}
        </h1>

        <div
          style={{
            width: "100%",
            height: "400px",
            borderRadius: "8px",
            border: "1px solid var(--border)",
            background: "var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: "11px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            Case study coming soon
          </p>
        </div>
      </div>
    </div>
  );
}
