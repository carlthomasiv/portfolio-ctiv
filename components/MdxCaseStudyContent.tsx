import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { CaseStudyFrontmatter } from "@/lib/mdx-case-study";
import { allProjects } from "@/data/work-projects";

export function MdxCaseStudyContent({
  frontmatter,
  slug,
  children,
}: {
  frontmatter: CaseStudyFrontmatter;
  slug: string;
  children: React.ReactNode;
}) {
  const disciplines = allProjects.find((p) => p.slug === slug)?.disciplines ?? [];

  return (
    <div className="w-full px-6 md:px-12" style={{ paddingBottom: "96px" }}>
      <div className="max-w-5xl mx-auto">

        {/* Back link */}
        <div style={{ paddingTop: "32px", marginBottom: "8px" }}>
          <Link
            href="/work"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "var(--font-dm-mono)",
              fontSize: "12px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            Work
          </Link>
        </div>

        {/* Header */}
        <header style={{ paddingTop: "40px", paddingBottom: "48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", margin: "0 0 16px" }}>
            <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)" }}>
              {frontmatter.company}
            </span>
            {disciplines.length > 0 && (
              <>
                <span style={{ color: "var(--text-muted)", opacity: 0.4, fontSize: "12px" }}>·</span>
                {disciplines.map((d) => (
                  <span
                    key={d}
                    style={{
                      fontFamily: "var(--font-dm-mono)",
                      fontSize: "10px",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                      border: "1px solid var(--border)",
                      borderRadius: "4px",
                      padding: "2px 7px",
                      lineHeight: 1.6,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {d}
                  </span>
                ))}
              </>
            )}
          </div>

          <h1
            style={{
              fontFamily: "var(--font-dm-serif-display)",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              color: "var(--text)",
              margin: "0 0 20px",
            }}
          >
            {frontmatter.title}
          </h1>

          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "16px",
              lineHeight: 1.6,
              color: "var(--text-muted)",
              margin: "0 0 24px",
            }}
          >
            {frontmatter.description}
          </p>

          <p
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: "12px",
              letterSpacing: "0.06em",
              color: "var(--text-muted)",
              margin: 0,
            }}
          >
            {frontmatter.role} &middot; {frontmatter.period}
          </p>
        </header>

        {/* Hero image */}
        {frontmatter.heroImage && (
          <div style={{ marginBottom: "64px" }}>
            <img
              src={frontmatter.heroImage}
              alt={frontmatter.title}
              style={{ width: "100%", height: "auto", borderRadius: "8px", border: "1px solid var(--border)", display: "block" }}
            />
          </div>
        )}

        {/* MDX body */}
        <div>
          {children}
        </div>

        {/* Bottom nav */}
        <div style={{ paddingTop: "56px" }}>
          <Link
            href="/work"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "var(--font-dm-mono)",
              fontSize: "12px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            Back to work
          </Link>
        </div>

      </div>
    </div>
  );
}
