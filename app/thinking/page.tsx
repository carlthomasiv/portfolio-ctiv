import Link from "next/link";

export default function ThinkingPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>
      <div
        style={{ borderBottom: "1px solid var(--border)", padding: "20px 48px" }}
        className="flex items-center justify-between"
      >
        <Link href="/" style={{ fontFamily: "var(--font-caveat)", fontSize: "28px", color: "var(--text)", textDecoration: "none" }}>
          CThomas
        </Link>
        <Link href="/" style={{ fontFamily: "var(--font-dm-mono)", fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", textDecoration: "none" }}>
          ← Back
        </Link>
      </div>
      <div className="px-6 md:px-12 pt-20 max-w-3xl mx-auto">
        <p style={{ fontFamily: "var(--font-dm-mono)", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "16px" }}>
          Writing
        </p>
        <h1 style={{ fontFamily: "var(--font-dm-serif-display)", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 400, lineHeight: 1.15, color: "var(--text)" }}>
          Thinking
        </h1>
        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "16px", lineHeight: 1.7, color: "var(--text-muted)", marginTop: "24px" }}>
          Essays and notes coming soon.
        </p>
      </div>
    </div>
  );
}
