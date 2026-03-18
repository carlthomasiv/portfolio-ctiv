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
- **Deploy** — Vercel (Hobby), custom domain via Bluehost DNS

## Project structure

```
app/
  globals.css            # Design tokens (CSS vars), dark mode, utility classes
  layout.tsx             # Root layout — fonts, Nav, PageTransition
  page.tsx               # Home — Hero, WorkList, NowSection
  work/
    page.tsx             # Work index — grouped case study grid
    [slug]/page.tsx      # Individual case study
  thinking/page.tsx      # Writing & publications index
  about/page.tsx         # About — bio, experience, convictions, writing
  resume/page.tsx        # Full resume — experience, publications, skills

components/
  Nav.tsx                # Sticky nav, logo scramble, theme toggle, mobile drawer
  Hero.tsx               # Homepage hero — headline, intro, availability badge
  WorkList.tsx           # Homepage case study list (top 5, timeline layout)
  WorkIndex.tsx          # /work grid grouped by company
  CaseStudyContent.tsx   # Case study renderer — block-based content system
  NowSection.tsx         # Homepage "Now" section
  ThinkingContent.tsx    # Publication index with hover rows
  AboutContent.tsx       # About page content
  ResumeContent.tsx      # Resume page content
  Footer.tsx             # Signature, social links
  ThemeProvider.tsx      # Dark/light mode via .dark class on <html>
  PageTransition.tsx     # Crossfade page transitions via AnimatePresence

data/
  work-projects.ts       # All projects — feeds WorkList, WorkIndex, case study pages
  case-studies.ts        # Full case study content — block-based content model
```

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
