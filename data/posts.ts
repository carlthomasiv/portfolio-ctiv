export type PostBlock =
  | { type: "text"; content: string }
  | { type: "heading"; content: string; level?: 2 | 3 }
  | { type: "quote"; content: string; attribution?: string }
  | { type: "list"; items: string[] }
  | { type: "code"; content: string; language?: string }
  | { type: "footnote"; content: string; label?: string }
  | { type: "divider" }
  | {
      type: "interactive";
      component: "navmark-demo" | "taxonomy-diagram" | "theme-demo" | "closure-comparison";
    };

export interface Post {
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  readTime: number;
  tags: string[];
  excerpt: string;
  thumbnail?: string;  // optional path to a hero/preview image
  blocks: PostBlock[];
}

export const posts: Post[] = [
  {
    slug: "building-with-an-agent",
    title: "Building with an agent",
    subtitle: "Notes on designing this portfolio with Claude Code",
    date: "March 2026",
    readTime: 7,
    tags: ["Process", "AI", "Infrastructure"],
    excerpt:
      "Using an AI agent to build a production portfolio isn't the same as using AI to generate code. The interesting part is what the workflow demands of you as a designer.",
    blocks: [
      {
        type: "text",
        content:
          "There's a version of this story where the headline is 'I used AI to build my portfolio faster.' That's boring and also slightly wrong. Speed was a side effect. The more interesting thing: I had to become a better spec writer.",
      },
      {
        type: "heading",
        content: "Why build it yourself",
        level: 2,
      },
      {
        type: "text",
        content:
          "A designer who works on developer tooling and infrastructure UX, presenting their work on a Webflow template, is sending mixed signals. The portfolio should demonstrate the thinking. Not as a performance of technical ability, but because the decisions you make when building something reveal how you reason about systems. If I can't architect a clean component hierarchy for my own portfolio, why would anyone trust me with a product serving engineers?",
      },
      {
        type: "text",
        content:
          "The tool was Claude Code, Anthropic's agentic coding environment. The workflow felt closer to pair programming than code generation. I'd describe what I wanted at the behavior level, review the implementation, give specific feedback, iterate. It moves fast. The thinking stayed with me: what to build, why, in what order.",
      },
      {
        type: "heading",
        content: "The discipline the workflow requires",
        level: 2,
      },
      {
        type: "text",
        content:
          "The process forced one thing above everything else: precision about intent. Before asking for an implementation, I had to know what I actually wanted. That sounds obvious, but there's a version of design work where you figure out what you want by playing with it until something feels right. That doesn't work when directing an agent. You need to know the target state before reaching for code.",
      },
      {
        type: "text",
        content:
          "Concretely, that meant writing descriptions like: 'The logo should expand from CT_IV to Carl Thomas_IV on hover. The expansion should be a smooth width animation, not a pop. The underscore before IV should fade out during expansion to maintain visual balance. On mobile, it should play once on load instead of on hover.' That's also exactly what you'd need to hand it to an engineer. Faster feedback loop, same discipline.",
      },
      {
        type: "quote",
        content:
          "The interesting part of building with an agent isn't what it does for you. It's what it demands from you.",
      },
      {
        type: "heading",
        content: "Three decisions worth examining",
        level: 2,
      },
      {
        type: "heading",
        content: "The theme system bug",
        level: 3,
      },
      {
        type: "text",
        content:
          "The portfolio has a three-state theme toggle: light, dark, system. System tracks the OS preference via matchMedia; manually selecting light or dark overrides it. Simple enough in concept. But early in the build, manually selecting a theme wouldn't stick when the system preference differed. The visual result was correct for about half a second, then reverted.",
      },
      {
        type: "text",
        content:
          "The root cause was a React stale closure. The cycle() function (which steps through light → dark → system) was closing over the systemPref state value from an earlier render. When it ran, it read the preference as it was when the function was created, not as it was now. Refs fixed it. They hold values that survive renders without triggering them, so the event handler always reads current state regardless of when it was defined. systemPrefRef.current always holds the current preference.",
      },
      {
        type: "text",
        content:
          "You can't catch this from visual review alone. You need to know what React is doing with closures and when state updates are committed. The agent spotted the pattern and proposed the fix. I understood why it was right before we shipped it. That felt like the right division of labor.",
      },
      { type: "interactive", component: "theme-demo" },
      {
        type: "heading",
        content: "The discipline taxonomy",
        level: 3,
      },
      {
        type: "text",
        content:
          "The work section originally had six categories pulled directly from how each project was labeled at the time: Developer Tools, Infrastructure UX, Cloud Infrastructure, Growth, Developer Education, Collaboration. Six labels for eleven projects is too granular. It's an information architecture problem. Categories only do useful work when they cut across the full body of work, not when they mirror the org chart of wherever the project happened to live.",
      },
      { type: "interactive", component: "taxonomy-diagram" },
      {
        type: "text",
        content:
          "Collapsing them meant making a real decision: what story does the work tell? Three disciplines: Infrastructure, DX, Growth. A fourth reserved for AI and agent work as that body grows. Infrastructure and Cloud Infrastructure are the same muscle. Developer Education and Developer Tools are both DX. Collaboration is a growth and activation problem. The taxonomy means something now. A hiring manager can act on it.",
      },
      {
        type: "text",
        content:
          "Three projects earned dual tags: Instant Postgres Playground (DX + Growth), Serverless Gateways (Infrastructure + DX), Azure SQL Resources (Infrastructure + Growth). All three genuinely span two disciplines. The filter logic is OR-based: a project appears if it matches any of its tags. A project shouldn't earn a second tag because you want it to show up in more filters. It should earn it because it actually spans two problems.",
      },
      {
        type: "heading",
        content: "The NavMark animation",
        level: 3,
      },
      {
        type: "text",
        content:
          "The logo in the nav expands on hover from CT_IV to Carl Thomas_IV. Animating it meant going from width 0 to a measured pixel value, the gap between the short and long forms. The first attempt used max-width: 0 → max-width: [n]px. It didn't animate. Flex items resist collapsing below their minimum content size, so the width constraint was ignored.",
      },
      {
        type: "text",
        content:
          "The fix was animating width directly, with flex-shrink: 0 on the expanding span and min-width: 0 on the clip container. That collapses the minimum size to zero and gives the width animation somewhere to go. It took three attempts. The constraint isn't obvious from the desired behavior; it lives in how flex calculates minimum content sizes.",
      },
      { type: "interactive", component: "navmark-demo" },
      {
        type: "heading",
        content: "What the process changed",
        level: 2,
      },
      {
        type: "text",
        content:
          "A few things shifted. Writing specs precise enough for an agent to implement correctly is the same discipline as writing them precise enough for an engineer. The stakes are lower and the feedback loop faster, which makes it easier to build the habit.",
      },
      {
        type: "text",
        content:
          "It also clarified what belongs in a document versus a conversation. Architecture decisions need to be written down: what the component model is, why the data flows this way, what the invariants are. Implementation details can be worked out iteratively. That line is clearer to me now.",
      },
      {
        type: "text",
        content:
          "The portfolio is still a work in progress. The case studies are placeholders. But the infrastructure is solid: the component model, the data layer, the theme system, the routing. Adding real content to a solid foundation is the easy part. That's the right state to be in.",
      },
      {
        type: "footnote",
        content:
          "Next.js 16 App Router, Tailwind CSS v4, Framer Motion 12, TypeScript throughout. Deployed on Vercel. Built with Claude Code over several weeks of evenings. The repository is private for now, but I'm considering opening it as the case studies fill in.",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
