"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Post, PostBlock } from "@/data/posts";
import { PostHero } from "@/components/PostHero";
import { NavMarkDemo } from "@/components/post-embeds/NavMarkDemo";
import { TaxonomyDiagram } from "@/components/post-embeds/TaxonomyDiagram";
import { ThemeDemo } from "@/components/post-embeds/ThemeDemo";

function BlockRenderer({ block }: { block: PostBlock }) {
  switch (block.type) {
    case "text":
      return (
        <p
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "16px",
            lineHeight: 1.8,
            color: "var(--text-muted)",
            margin: "0 0 32px",
          }}
        >
          {block.content}
        </p>
      );

    case "heading":
      if (block.level === 3) {
        return (
          <h3
            style={{
              fontFamily: "var(--font-dm-serif-display)",
              fontSize: "22px",
              fontWeight: 400,
              lineHeight: 1.25,
              letterSpacing: "-0.01em",
              color: "var(--text)",
              margin: "40px 0 16px",
            }}
          >
            {block.content}
          </h3>
        );
      }
      return (
        <h2
          style={{
            fontFamily: "var(--font-dm-serif-display)",
            fontSize: "28px",
            fontWeight: 400,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            color: "var(--text)",
            margin: "56px 0 20px",
          }}
        >
          {block.content}
        </h2>
      );

    case "quote":
      return (
        <div
          style={{
            borderLeft: "2px solid var(--border-strong)",
            paddingLeft: "24px",
            margin: "40px 0",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-dm-serif-display)",
              fontStyle: "italic",
              fontSize: "21px",
              lineHeight: 1.55,
              color: "var(--text)",
              margin: 0,
            }}
          >
            {block.content}
          </p>
          {block.attribution && (
            <p
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: "11px",
                letterSpacing: "0.04em",
                color: "var(--text-muted)",
                margin: "8px 0 0",
              }}
            >
              {block.attribution}
            </p>
          )}
        </div>
      );

    case "list":
      return (
        <ul
          style={{
            margin: "0 0 24px",
            padding: 0,
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {block.items.map((item, i) => (
            <li key={i} style={{ display: "flex", gap: "12px" }}>
              <span
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "14px",
                  color: "var(--text-muted)",
                  opacity: 0.5,
                  flexShrink: 0,
                  lineHeight: 1.8,
                }}
              >
                —
              </span>
              <span
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "16px",
                  lineHeight: 1.8,
                  color: "var(--text-muted)",
                }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      );

    case "code":
      return (
        <div style={{ margin: "0 0 28px" }}>
          <pre
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: "13px",
              lineHeight: 1.65,
              color: "var(--text)",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              padding: "20px 24px",
              overflowX: "auto",
              margin: 0,
            }}
          >
            <code>{block.content}</code>
          </pre>
        </div>
      );

    case "footnote":
      return (
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            padding: "16px 20px",
            margin: "16px 0 32px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "13px",
              lineHeight: 1.7,
              color: "var(--text-muted)",
              margin: 0,
              opacity: 0.75,
            }}
          >
            {block.content}
          </p>
        </div>
      );

    case "divider":
      return (
        <div
          style={{
            borderTop: "1px solid var(--border)",
            margin: "48px 0",
          }}
        />
      );

    case "interactive":
      switch (block.component) {
        case "navmark-demo":       return <NavMarkDemo />;
        case "taxonomy-diagram":   return <TaxonomyDiagram />;
        case "theme-demo":         return <ThemeDemo />;
default:                   return null;
      }

    default:
      return null;
  }
}

export function PostContent({ post }: { post: Post }) {
  return (
    <div className="w-full px-6 md:px-12" style={{ paddingBottom: "96px" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>

        {/* Back link */}
        <div style={{ paddingTop: "32px", marginBottom: "8px" }}>
          <Link
            href="/thinking"
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
              transition: "color 0.15s ease",
            }}
            className="link-hover"
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            Thinking
          </Link>
        </div>

        {/* Featured hero */}
        <PostHero />

        {/* Reading column */}
        <div style={{ paddingTop: "40px" }}>

          {/* Meta: tags + date above title */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: "20px",
            }}
          >
            {post.tags.map((tag) => (
              <span
                key={tag}
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
                }}
              >
                {tag}
              </span>
            ))}
            <span
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: "11px",
                color: "var(--text-muted)",
                opacity: 0.35,
              }}
            >
              ·
            </span>
            <span
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: "11px",
                letterSpacing: "0.04em",
                color: "var(--text-muted)",
                opacity: 0.65,
              }}
            >
              {post.date} · {post.readTime} min read
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: "var(--font-dm-serif-display)",
              fontSize: "clamp(32px, 4vw, 44px)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              color: "var(--text)",
              margin: "0 0 12px",
            }}
          >
            {post.title}
          </h1>

          {/* Subtitle */}
          {post.subtitle && (
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "17px",
                lineHeight: 1.55,
                color: "var(--text-muted)",
                margin: "0 0 40px",
              }}
            >
              {post.subtitle}
            </p>
          )}

          {/* Body */}
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "40px" }}>
            {post.blocks.map((block, i) => (
              <BlockRenderer key={i} block={block} />
            ))}
          </div>

          {/* Bottom nav */}
          <div style={{ paddingTop: "56px", borderTop: "1px solid var(--border)" }}>
            <Link
              href="/thinking"
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
                transition: "color 0.15s ease",
              }}
              className="link-hover"
            >
              <ArrowLeft size={14} strokeWidth={1.5} />
              Back to thinking
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
