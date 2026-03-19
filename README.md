# cft-portfolio

Personal portfolio for Carl Thomas — design leader specialising in developer tools, AI platforms, and infrastructure UX.

Live at [carlthomasiv.com](https://carlthomasiv.com)

---

## Stack

- **Framework** — Next.js 16 (App Router)
- **Styling** — Tailwind CSS v4 + CSS custom properties
- **Animation** — Framer Motion 12
- **Fonts** — DM Serif Display, DM Sans, DM Mono, Caveat (all via `next/font/google`)
- **Language** — TypeScript
- **Content** — MDX via `next-mdx-remote` (case studies), block-based TypeScript (legacy)
- **Analytics** — Vercel Analytics + Speed Insights
- **Deploy** — Vercel (Hobby), custom domain via Bluehost DNS

## Project structure

```
app/
  globals.css            # Design tokens (CSS vars), dark mode, utility classes
  layout.tsx             # Root layout — fonts, Nav, PageTransition, Analytics
  page.tsx               # Home — Hero, WorkList, NowSection
  work/
    page.tsx             # Work index — grouped case study grid
    [slug]/page.tsx      # Case study — MDX-first, falls back to TypeScript data
  thinking/
    page.tsx             # Writing & publications index
    [slug]/page.tsx      # Individual post — block-based renderer
  about/page.tsx         # About — bio, experience, convictions, writing
  resume/page.tsx        # Full resume — experience, publications, skills

components/
  Nav.tsx                # Sticky nav, logo animation, theme toggle, mobile drawer (swipe gestures)
  Hero.tsx               # Homepage hero — headline, intro, availability badge
  WorkList.tsx           # Homepage case study list (top 5, timeline layout)
  WorkIndex.tsx          # /work grid grouped by company
  CaseStudyContent.tsx   # Legacy case study renderer — TypeScript block-based content
  MdxCaseStudyContent.tsx # MDX case study layout shell — header, hero image, back nav
  mdx-components.tsx     # MDX component library — Metrics, Comparison, ImageGrid, etc.
  PostHero.tsx           # Animated dot-grid canvas hero for post pages
  PostContent.tsx        # Post renderer — handles all block types + interactive embeds
  post-embeds/           # Interactive components embedded in posts
    NavMarkDemo.tsx
    TaxonomyDiagram.tsx
    ThemeDemo.tsx
  NowSection.tsx         # Homepage "Now" section
  ThinkingContent.tsx    # Publication index with hover rows + dot-grid thumbnail
  AboutContent.tsx       # About page content
  ResumeContent.tsx      # Resume page content
  Footer.tsx             # Signature, social links
  ThemeProvider.tsx      # Dark/light/system mode via .dark class on <html>
  PageTransition.tsx     # Crossfade page transitions via AnimatePresence
  NavMark.tsx            # Animated CT_IV logo mark

content/
  case-studies/          # MDX files for case studies (one per slug)
    _template.mdx        # Reference template showing all available components

data/
  work-projects.ts       # All projects — feeds WorkList, WorkIndex, case study pages
  case-studies.ts        # Legacy block-based content + slug list for generateStaticParams
  posts.ts               # Thinking posts — block-based content model

lib/
  mdx-case-study.ts      # Loads and parses MDX + frontmatter for case study pages
```

## Writing case studies

Case studies are written as MDX files in `content/case-studies/`. Copy `_template.mdx` and rename it to the slug (e.g. `automations.mdx`).

**Frontmatter** (required):
```yaml
---
title: "Case Study Title"
company: "Company Name"
category: "Category"
description: "One sentence shown in the header and meta."
role: "Your Role"
period: "2025"
heroImage: "/images/work/slug/hero.png"  # optional
---
```

**Prose** is plain markdown — paragraphs, `## headings`, `- lists`, `> blockquotes` all render with the correct typography automatically.

**Rich blocks** are JSX components:

| Component | Purpose |
|---|---|
| `<SectionLabel>` | Labelled section divider |
| `<Metrics items={[...]} />` | Large stat numbers with trend indicators |
| `<Slideshow images={[...]} />` | Horizontal drag-scroll image strip |
| `<ImageGrid images={[...]} columns={2} />` | Click-to-zoom image grid |
| `<Comparison before={...} after={...} />` | Two-column before/after |
| `<Callout label="...">` | Highlighted insight or quote box |
| `<CaseImage src="..." alt="..." />` | Single lightbox image |
| `<CaseLink href="..." label="..." />` | External link row |

MDX takes priority over TypeScript data for any slug that has a matching file. Slugs without an MDX file continue using the existing TypeScript content in `data/case-studies.ts`.

## Design tokens

Theming is handled entirely via CSS custom properties in `globals.css`. The `.dark` class on `<html>` switches the palette.

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#fafafa` | `#111110` |
| `--text` | `#111318` | `#f0ede8` |
| `--text-muted` | 50% opacity | 50% opacity |
| `--border` | 8% opacity | 8% opacity |
| `--border-strong` | 16% opacity | 16% opacity |
| `--bg-card` | `#ffffff` | `#1c1c1b` |
| `--bg-glass` | 80% opacity | 80% opacity |

## Dev

```bash
npm run dev
```

> **Note:** Uses `node node_modules/next/dist/bin/next dev` internally due to a broken `.bin/next` symlink resolution. Don't change this back to plain `next dev`.

Opens at [http://localhost:3000](http://localhost:3000)
