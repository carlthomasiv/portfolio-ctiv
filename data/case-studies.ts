export type InlineBlock =
  | { type: "text"; content: string }
  | { type: "heading"; content: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; content: string; attribution?: string }
  | { type: "image"; src: string; alt: string; caption?: string };

export type Block =
  | { type: "text"; content: string }
  | { type: "heading"; content: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "video"; youtubeId: string; caption?: string }
  | { type: "video-aside"; youtubeId: string; children: InlineBlock[] }
  | { type: "image-grid"; images: { src: string; alt: string }[]; columns?: 2 | 3 }
  | { type: "slideshow"; images: { src: string; alt: string }[] }
  | { type: "image-aside"; image: { src: string; alt: string; caption?: string }; children: InlineBlock[] }
  | { type: "image-aside-stack"; images: { src: string; alt: string; caption?: string }[]; children: InlineBlock[] }
  | { type: "comparison"; before: { label: string; steps: Array<{ text: string; warning?: boolean }>; note: string }; after: { label: string; steps: Array<{ text: string }>; note: string } }
  | { type: "ia-comparison"; before: { label: string; items: Array<{ text: string; depth: number }>; notes: string[] }; after: { label: string; items: Array<{ text: string; depth: number }>; notes: string[] } }
  | { type: "metrics"; items: { value: string; label: string; trend?: "up" | "down" }[] }
  | { type: "quote"; content: string; attribution?: string }
  | { type: "quote-list"; items: Array<{ text: string; attribution?: string }> }
  | { type: "two-col"; left: InlineBlock[]; right: InlineBlock[] }
  | { type: "list"; items: string[] };

export interface Section {
  label: string;
  blocks: Block[];
}

export interface CaseStudy {
  slug: string;
  company: string;
  category: string;
  title: string;
  description: string;
  role: string;
  period: string;
  heroImage?: string;
  sections: Section[];
}

export const caseStudies: CaseStudy[] = [
  // --- Ona ---
  {
    slug: "automations",
    company: "Ona",
    category: "AI Workflows",
    title: "Automations",
    description: "Designing the infrastructure for AI-powered workflow automation at scale.",
    role: "Product Designer",
    period: "2025",
    sections: [],
  },
  {
    slug: "rethinking-conversations",
    company: "Ona",
    category: "Conversation Design",
    title: "Rethinking Conversations",
    description: "Reimagining how teams collaborate through structured conversation patterns.",
    role: "Product Designer",
    period: "2025",
    sections: [],
  },
  {
    slug: "voice-and-tone",
    company: "Ona",
    category: "Design Systems",
    title: "Voice & Tone",
    description: "Building a cohesive language system that scales across a complex product.",
    role: "Product Designer",
    period: "2025",
    sections: [],
  },

  // --- Neon ---
  {
    slug: "instant-postgres-playground",
    company: "Neon",
    category: "Developer Tools",
    title: "Instant Postgres Playground",
    description: "A no-signup, zero-friction SQL environment backed by real Neon infrastructure. Try Postgres before you commit to anything.",
    role: "Head of Design",
    period: "Dec 2024",
    heroImage: "/images/work/neon/instant-postgres-playground/1.1-psql-sh.png",
    sections: [
      {
        label: "",
        blocks: [
          {
            type: "text",
            content: "When I joined Neon as Head of Design, the product had a problem every developer platform eventually hits: it asked for commitment before it had earned it. Create an account. Verify your email. Go through onboarding. Maybe see something useful eventually.",
          },
          {
            type: "text",
            content: "I designed psql.sh. A live, browser-based SQL environment backed by real Neon infrastructure. No signup. No configuration. Open a tab and start writing queries.",
          },
          {
            type: "metrics",
            items: [
              { value: "1,020+", label: "Sessions in 60 days", trend: "up" },
              { value: "34%", label: "CTA click-through", trend: "up" },
              { value: "240", label: "Signups generated", trend: "up" },
              { value: ">70%", label: "First-query success", trend: "up" },
            ],
          },
        ],
      },
      {
        label: "The Problem",
        blocks: [
          {
            type: "text",
            content: "Most developer tools default to the same funnel: marketing page, signup form, onboarding checklist, maybe value eventually. Every step bleeds the people most likely to become power users.",
          },
          {
            type: "text",
            content: "For Neon, this played out at the top of the funnel. Developers evaluating alternatives. RDS, Supabase, PlanetScale. They weren't going to create an account just to see what serverless Postgres felt like. They'd move on. The product needed to be experienced before it could be sold.",
          },
        ],
      },
      {
        label: "The Solution",
        blocks: [
          {
            type: "text",
            content: "I pitched and designed psql.sh. An instant demo environment built on real Neon infrastructure. No signup. No configuration. A browser tab that drops you straight into a live Postgres session.",
          },
          {
            type: "image",
            src: "/images/work/neon/instant-postgres-playground/1.1-psql-sh.png",
            alt: "psql.sh -- the Neon Instant Postgres Playground",
          },
          {
            type: "text",
            content: "The environment came pre-seeded with a relatable schema and examples that demonstrated Neon's core differentiators: branching, autoscaling, and storage separation. Not documentation. Live commands you could run.",
          },
          {
            type: "image-grid",
            images: [
              { src: "/images/work/neon/instant-postgres-playground/1.2-psql-sh.png", alt: "Running queries in the playground" },
              { src: "/images/work/neon/instant-postgres-playground/1.4-psql-sh.png", alt: "Exploring branching" },
            ],
            columns: 2,
          },
          {
            type: "text",
            content: "When a developer was ready to go further, a 'Continue in Neon' CTA preserved their demo session. Their work carried into a real account without starting over. The transition became the moment of commitment, not the entry point.",
          },
          {
            type: "image",
            src: "/images/work/neon/instant-postgres-playground/1.5-psql-sh-signup.png",
            alt: "Continue in Neon -- the signup CTA preserves demo state",
            caption: "The CTA carries the demo session into a real account, reducing the perceived cost of committing.",
          },
          {
            type: "text",
            content: "I also added /ai <prompt>. A natural-language SQL assistant for users who didn't want to write queries from scratch. Type what you want, get something that runs. It lowered the floor without touching the ceiling.",
          },
        ],
      },
      {
        label: "Outcomes",
        blocks: [
          {
            type: "text",
            content: "psql.sh launched in December 2024. In the first 60 days:",
          },
          {
            type: "list",
            items: [
              "1,020+ sessions with no paid acquisition behind it",
              "34% of users clicked through to create a Neon account",
              "240 signups generated directly from the playground",
              "More than 70% of first-time users successfully ran a query",
            ],
          },
          {
            type: "text",
            content: "It also gave Growth and Marketing something they didn't have before. A shareable, low-friction entry point that worked in social posts, developer newsletters, and documentation without needing a sales pitch attached.",
          },
        ],
      },
      {
        label: "Learnings",
        blocks: [
          {
            type: "text",
            content: "Demo-first is the new doc-first. The instinct in developer tools is to explain before showing. This project inverted that. Show the thing, explain it when they ask.",
          },
          {
            type: "text",
            content: "The conversion data also surfaced something less obvious. When pricing tier differentiation is unclear, even strong UX hits a ceiling. The playground created intent. Converting that intent required pricing clarity downstream. Good UX surfaces the next problem to solve.",
          },
        ],
      },
    ],
  },
  {
    slug: "console-navigation",
    company: "Neon",
    category: "Infrastructure UX",
    title: "Console Navigation",
    description: "Restructuring the mental model for a multi-tenant cloud console.",
    role: "Head of Design",
    period: "May 2025",
    heroImage: "/images/work/neon/console-navigation/1.4.1-project-overview.png",
    sections: [
      {
        label: "",
        blocks: [
          { type: "text", content: "Neon was signing up 60,000 new developers every week. 15% dropped off immediately after arriving. 40% of support tickets were navigation-related. The console was organized around how the product was built internally, not how developers think about their work. That gap was the problem." },
          { type: "text", content: "I led the navigation redesign end to end. Set the long-term architecture vision first. Shipped Milestone 1 in a single quarter to prove the direction. Built the cross-functional alignment to carry it through multiple phases." },
          { type: "metrics", items: [
            { value: "+12%", label: "Branch switching", trend: "up" },
            { value: "9%", label: "Fewer nav tickets", trend: "down" },
          ]},
        ],
      },
      {
        label: "The Problem",
        blocks: [
          { type: "text", content: "Neon's navigation treated every feature with equal weight. No hierarchy. Branches inconsistently surfaced or buried depending on context. The structure mirrored backend architecture, not developer workflows. Users arrived expecting to connect data and start building. Instead they spent time figuring out where they were." },
          { type: "text", content: "The numbers confirmed it. 15% of users dropped off immediately after signup. Only 30% engaged with key features like Auth and Monitoring. The nav wasn't a minor usability issue. It was blocking activation." },
        ],
      },
      {
        label: "Why the IA Wasn't Working",
        blocks: [
          { type: "ia-comparison",
            before: {
              label: "What developers saw",
              items: [
                { text: "Organization", depth: 0 },
                { text: "Project", depth: 1 },
                { text: "Dashboard", depth: 2 },
                { text: "Branch", depth: 2 },
                { text: "SQL Editor", depth: 2 },
                { text: "Restore", depth: 2 },
                { text: "Integrations", depth: 2 },
                { text: "Monitoring", depth: 2 },
                { text: "Authorize", depth: 2 },
                { text: "Identity", depth: 2 },
                { text: "Project Settings", depth: 2 },
                { text: "Org Billing", depth: 1 },
                { text: "Org People", depth: 1 },
                { text: "Org Settings", depth: 1 },
              ],
              notes: [
                "All features shown at equal weight with no hierarchy",
                "Branches buried alongside unrelated org-level actions",
                "Structure reflected how the product was built, not how it was used",
              ],
            },
            after: {
              label: "What it needed to be",
              items: [
                { text: "Organization", depth: 0 },
                { text: "Project", depth: 1 },
                { text: "Project Overview", depth: 2 },
                { text: "Branches", depth: 2 },
                { text: "SQL Editor", depth: 3 },
                { text: "Table Editor", depth: 3 },
                { text: "Monitoring", depth: 3 },
                { text: "Integrations", depth: 2 },
                { text: "Neon Auth", depth: 2 },
                { text: "Restore", depth: 2 },
                { text: "Org Billing", depth: 1 },
                { text: "Org People", depth: 1 },
                { text: "Org Settings", depth: 1 },
              ],
              notes: [
                "Clear separation between org, project, and branch contexts",
                "Branches promoted as first-class objects with their own nav layer",
                "Contextual tools surfaced at the right level, not all at once",
              ],
            },
          },
        ],
      },
      {
        label: "What We Heard",
        blocks: [
          { type: "text", content: "User feedback from HubSpot transcripts and support tickets surfaced three consistent themes:" },
          { type: "quote-list", items: [
            { text: "Felt like a step backward in usability." },
            { text: "Why was a branch created with my name on it?" },
            { text: "I had no idea where to go next." },
          ]},
          { type: "text", content: "Orientation breakdowns. Low branch adoption. High early churn. The navigation wasn't just confusing. It was undermining confidence in the product itself." },
        ],
      },
      {
        label: "Goals",
        blocks: [
          { type: "two-col",
            left: [
              { type: "heading", content: "User Goals" },
              { type: "list", items: [
                "Know where I am and what I can do, instantly",
                "Connect my data and start building without reading the docs",
                "Move between projects, branches, and tools without losing context",
              ]},
            ],
            right: [
              { type: "heading", content: "Business Goals" },
              { type: "list", items: [
                "Increase activation by streamlining the path to value",
                "Reduce early abandonment by simplifying the console experience",
                "Raise the bar for developer UX and position Neon as a category leader",
              ]},
            ],
          },
        ],
      },
      {
        label: "Setting the Vision",
        blocks: [
          { type: "text", content: "Before shipping anything, I needed to set the long-term direction. The existing structure exposed org, project, and branch-level actions without clear separation. Developers were navigating across three conceptual levels with no hierarchy." },
          { type: "text", content: "The proposed architecture separated global from contextual actions. Org-level tools at the top. Project structure in the middle. Branch-level workflows in context panels. Everything surfaced where it was relevant, not all at once." },
          { type: "list", items: [
            "Org level: Billing, People, Settings",
            "Project level: Overview, Branches, Roles, Integrations",
            "Branch level: SQL Editor, Tables, Monitoring, Restore",
          ]},
          { type: "slideshow", images: [
            { src: "/images/work/neon/console-navigation/1.1-org-home.png", alt: "Org-level navigation vision" },
            { src: "/images/work/neon/console-navigation/1.4.1-project-overview.png", alt: "Project-level navigation vision" },
            { src: "/images/work/neon/console-navigation/1.4.2-sql-editor.png", alt: "SQL Editor in vision nav structure" },
            { src: "/images/work/neon/console-navigation/1.7.1-monitoring.png", alt: "Monitoring in vision nav structure" },
            { src: "/images/work/neon/console-navigation/1.9.1-restore.png", alt: "Restore in vision nav structure" },
          ]},
        ],
      },
      {
        label: "Milestone 1",
        blocks: [
          { type: "text", content: "Rather than wait for the full vision, I scoped what would have the most immediate impact. Branch context was the biggest confusion point. Users didn't know which branch they were on, how to switch, or how environments related to each other." },
          { type: "text", content: "Milestone 1 shipped in one quarter. Persistent branch context in the side panel. Clear entry points for switching and creating branches. A simplified project structure that reflected how developers actually move through their work." },
          { type: "slideshow", images: [
            { src: "/images/work/neon/console-navigation/1.1-interim-org.png", alt: "Org-level navigation, Milestone 1" },
            { src: "/images/work/neon/console-navigation/1.2-interim-dashboard.png", alt: "Dashboard navigation, Milestone 1" },
            { src: "/images/work/neon/console-navigation/1.3-interim-branch.png", alt: "Branch navigation, Milestone 1" },
          ]},
        ],
      },
      {
        label: "Outcomes",
        blocks: [
          { type: "text", content: "Milestone 1 released May 2025. Early signals within the first month:" },
          { type: "list", items: [
            "Branch switching increased 12%",
            "Nav-related support tickets dropped 9%",
            "Teams across 4 Console pillars aligned on a shared architecture direction for the first time",
          ]},
          { type: "quote", content: "It's finally clear which branch I'm in and how to switch. Game changer.", attribution: "Neon user" },
        ],
      },
      {
        label: "Learnings",
        blocks: [
          { type: "text", content: "Navigation is invisible when it works. That's the goal, but it makes it a hard case to build internally. The path to buy-in was shipping something fast that proved the direction before asking for commitment to the full vision." },
          { type: "text", content: "The IA work was as important as the UI work. Getting cross-functional agreement on how org, project, and branch contexts related to each other required as much facilitation as design. Alignment on language and hierarchy came before the first pixel." },
          { type: "text", content: "The most useful thing I did early was name what we were optimizing for. Not better navigation. Reducing orientation overhead. That framing gave PM and engineering a way to evaluate decisions without relitigating the problem every time a tradeoff came up." },
        ],
      },
    ],
  },
  {
    slug: "upgrade-flow-redesign",
    company: "Neon",
    category: "Growth",
    title: "Upgrade Flow Redesign",
    description: "Reducing friction in the path from free to paid without the hard sell.",
    role: "Head of Design",
    period: "Oct 2024",
    heroImage: "/images/work/neon/upgrade-flow-redesign/2.2-upgrade-modal.png",
    sections: [
      {
        label: "",
        blocks: [
          { type: "text", content: "47% of users abandoned Neon's upgrade flow mid-way through. Only 15% converted to any paid tier within their first week. 2% reached Business. The product wasn't the problem. Users couldn't make sense of what they were being asked to decide." },
          { type: "text", content: "I redesigned the upgrade experience end to end. Clearer tier hierarchy, smarter defaults, reduced confirmation steps. The goal was to make upgrading feel like a confident decision, not a commitment to something they didn't fully understand." },
          { type: "metrics", items: [
            { value: "+7%", label: "Paid conversions", trend: "up" },
            { value: "13%", label: "Fewer mid-upgrade drop-offs", trend: "down" },
          ]},
        ],
      },
      {
        label: "The Problem",
        blocks: [
          { type: "text", content: "The original upgrade flow blended all pricing tiers together with weak visual distinction. No clear hierarchy. Value propositions that didn't map to what users actually cared about. A multi-step process that required selecting a tier, clicking upgrade, then confirming again before anything happened." },
          { type: "text", content: "Users weren't hesitating because they didn't want to pay. They were hesitating because the flow gave them no confidence they were making the right choice." },
          { type: "image", src: "/images/work/neon/upgrade-flow-redesign/1.2-original-upgrade-modal.png", alt: "Original Neon upgrade modal", caption: "The original modal. Tiers blended together, weak hierarchy, no clear path to Business." },
        ],
      },
      {
        label: "Goals",
        blocks: [
          { type: "two-col",
            left: [
              { type: "heading", content: "User Goals" },
              { type: "list", items: [
                "Understand what each tier offers and why it matters",
                "Confidently choose the right fit without second-guessing",
                "No hidden costs or surprises at checkout",
              ]},
            ],
            right: [
              { type: "heading", content: "Business Goals" },
              { type: "list", items: [
                "Increase upgrade conversion, especially to Business tier",
                "Reduce friction and build trust at the key monetization moment",
                "Position Neon as a platform that scales with customers",
              ]},
            ],
          },
        ],
      },
      {
        label: "Hypothesis",
        blocks: [
          { type: "quote", content: "If we increase the distinction between pricing tiers and clarify the value of each, especially Business, we will drive higher upgrade confidence and improve trial-to-paid conversion." },
        ],
      },
      {
        label: "Competitive Analysis",
        blocks: [
          { type: "text", content: "I audited upgrade and pricing flows across 8 SaaS products to understand what the best ones got right. A few clear patterns emerged:" },
          { type: "list", items: [
            "Focus on key differences between tiers, not exhaustive feature grids",
            "Use recommended defaults to guide decisions without removing choice",
            "Minimize confirmation steps. The longer the path, the higher the drop-off",
            "Surface billing details upfront. Surprises at checkout kill confidence",
          ]},
          { type: "slideshow", images: [
            { src: "/images/work/neon/upgrade-flow-redesign/competitive1.png", alt: "Competitor pricing flow reference 1" },
            { src: "/images/work/neon/upgrade-flow-redesign/competitive2.png", alt: "Competitor pricing flow reference 2" },
            { src: "/images/work/neon/upgrade-flow-redesign/competitive3.png", alt: "Competitor pricing flow reference 3" },
            { src: "/images/work/neon/upgrade-flow-redesign/competitive4.png", alt: "Competitor pricing flow reference 4" },
            { src: "/images/work/neon/upgrade-flow-redesign/competitive5.png", alt: "Competitor pricing flow reference 5" },
          ]},
        ],
      },
      {
        label: "The Solution",
        blocks: [
          { type: "text", content: "The redesigned modal consolidated the upgrade experience into a single, focused view. Strong type hierarchy separated tiers clearly. A recommended tag surfaced based on user behavior. Current usage visible before committing. One fewer step to complete the upgrade." },
          { type: "image", src: "/images/work/neon/upgrade-flow-redesign/2.2-upgrade-modal.png", alt: "Redesigned Neon upgrade modal" },
          { type: "list", items: [
            "Clear tier hierarchy with simplified content per plan",
            "Recommended tag surfaced based on activation behavior",
            "Current usage visible before upgrading to reduce hesitation",
            "Contact Sales CTA for enterprise-scale customers",
          ]},
        ],
      },
      {
        label: "Outcomes",
        blocks: [
          { type: "text", content: "Released October 2024." },
          { type: "list", items: [
            "Paid conversions increased 7%",
            "Support tickets related to pricing confusion decreased",
            "Business Tier adoption improved among activated users",
            "The design was adopted as the foundation for Neon's broader pricing and billing redesign across Marketing and the Billing team",
          ]},
        ],
      },
      {
        label: "Learnings",
        blocks: [
          { type: "text", content: "Pricing flows are trust moments as much as conversion moments. Users aren't just deciding whether to pay. They're deciding whether they believe the product will deliver. Every element that reduces clarity is a vote against confidence." },
          { type: "text", content: "The recommended tag was the highest-leverage single change. Giving users a signal that someone had already thought about the right choice for them removed decision paralysis without removing agency. Small surface area, meaningful impact." },
          { type: "text", content: "This work ended up shaping more than the modal. The hierarchy and framing we landed here became the reference point when Marketing and Billing rebuilt their pricing pages. That kind of upstream influence is what separates tactical design from strategic design." },
        ],
      },
    ],
  },

  // --- Kong ---
  {
    slug: "serverless-gateways",
    company: "Kong",
    category: "Infrastructure UX",
    title: "Serverless Gateways",
    description: "Turning complex infrastructure setup into a zero-to-one deployment experience. Developers from signup to sending real API traffic in under five minutes.",
    role: "Senior Staff Product Designer",
    period: "Jul 2024",
    heroImage: "/images/work/kong/serverless-gateways/1.1-quickstart.png",
    sections: [
      {
        label: "",
        blocks: [
          { type: "text", content: "90% of new organizations failed to activate after signup. Not a minor usability gap. A structural growth problem. To get started, users had to provision a dataplane, connect it via CLI, create a service, and define a route. Each step assumed architecture knowledge most users didn't have yet. Each step required jumping between Konnect, documentation, and a local terminal. 60 to 70% dropped off at the first wall they hit." },
          { type: "text", content: "95% of ARR came through Sales because the product couldn't close itself. I designed Serverless Gateway to change that. Remove infrastructure as a prerequisite. Provision a ready gateway at signup. Put users in front of value before complexity could stop them." },
          { type: "metrics", items: [
            { value: "<5 min", label: "Time to first traffic", trend: "down" },
            { value: "30%+", label: "Activation rate", trend: "up" },
            { value: "+10%", label: "Traffic-sending orgs", trend: "up" },
            { value: "30s", label: "Gateway provisioning time", trend: "down" },
          ]},
        ],
      },
      {
        label: "The Problem",
        blocks: [
          { type: "text", content: "Kong Konnect saw around 1,000 new organizations per week. 90% of them failed to activate after signup. 60 to 70% dropped off at a single step: Connect a Dataplane." },
          { type: "text", content: "To get past that step, users had to provision infrastructure, connect a local dataplane via CLI, then return to the console to create a service and define a route. Each step assumed knowledge they didn't have yet and required context-switching across three different environments. They were being asked to set up before they could evaluate." },
          { type: "slideshow", images: [
            { src: "/images/work/kong/serverless-gateways/0.1-original.png", alt: "Original Kong Konnect self-managed gateway setup" },
            { src: "/images/work/kong/serverless-gateways/0.4-original.png", alt: "Dataplane connection step" },
            { src: "/images/work/kong/serverless-gateways/0.5-original.png", alt: "Service creation in original flow" },
            { src: "/images/work/kong/serverless-gateways/0.9-original.png", alt: "Route definition step" },
            { src: "/images/work/kong/serverless-gateways/0.10-original.png", alt: "Original onboarding final state" },
          ]},
        ],
      },
      {
        label: "User Insights",
        blocks: [
          { type: "text", content: "Backed by funnel data, support tickets, and user interviews, four core blockers emerged:" },
          { type: "image-aside",
            image: { src: "/images/work/kong/serverless-gateways/flow-user-insights.png", alt: "User insights flow diagram" },
            children: [
              { type: "list", items: [
                "Send API requests right after signup. Users expected to evaluate quickly. Setup was a blocker.",
                "Get guidance, not architecture lessons. They needed help configuring services and routes, not understanding control planes.",
                "Explore safely without setup. Users wanted to try Kong in a secure environment without managing infrastructure.",
                "Know what comes next. They needed a clear path to scale when ready.",
              ]},
              { type: "quote", content: "I want to try Kong, but I don't want to spend hours setting it up just to see what it does.", attribution: "Kong customer, user interview" },
            ],
          },
        ],
      },
      {
        label: "Hypothesis",
        blocks: [
          { type: "quote", content: "If we remove the need to download the dataplane to try the features of Konnect gateway, we will see more organizations experience the value of the product. We would measure this as an increase in the activation and retention of new organizations." },
        ],
      },
      {
        label: "Goals",
        blocks: [
          { type: "two-col",
            left: [
              { type: "heading", content: "User Goals" },
              { type: "list", items: [
                "Sign up and start sending traffic in minutes, without setup delays",
                "Understand the value of API gateways through guided, real-world usage",
                "Evaluate how Kong can improve team workflows and scale with business needs",
              ]},
            ],
            right: [
              { type: "heading", content: "Business Goals" },
              { type: "list", items: [
                "Increase activation by eliminating the need for infrastructure setup",
                "Drive gateway traffic earlier by reducing time-to-value",
                "Improve conversion by enabling users to reach value without sales assistance",
              ]},
            ],
          },
        ],
      },
      {
        label: "Competitive Context",
        blocks: [
          { type: "image-aside",
            image: { src: "/images/work/kong/serverless-gateways/competitors.png", alt: "Competitive analysis of API platform onboarding" },
            children: [
              { type: "text", content: "I reviewed onboarding across AWS, Google Apigee, Mulesoft, Tyk, Ngrok, Snyk, Readme, and Jira. Most platforms assumed infrastructure readiness before gateway usage." },
              { type: "list", items: [
                "Getting started typically meant provisioning, configuring, and reading dense documentation",
                "Few platforms allowed users to explore value without committing time or cloud resources",
                "No one was offering a fast, frictionless path to sending traffic without setup",
              ]},
              { type: "text", content: "That gap was the opportunity. Serverless Gateway could meet developers where they actually are, then give them a clear path to scale when ready." },
            ],
          },
        ],
      },
      {
        label: "Unblocking Users from the Start",
        blocks: [
          { type: "comparison",
            before: {
              label: "Legacy Flow",
              steps: [
                { text: "Sign up" },
                { text: "Create new organization" },
                { text: "Self-managed gateway provisioned" },
                { text: "Provision and connect a dataplane (CLI or cloud)", warning: true },
                { text: "Create service" },
                { text: "Define route" },
                { text: "Send API request through gateway" },
              ],
              note: "🔁 Each step was spread across Konnect, docs, and terminals.",
            },
            after: {
              label: "Serverless Gateway",
              steps: [
                { text: "Sign up" },
                { text: "Create new organization" },
                { text: "Serverless gateway provisioned automatically" },
                { text: "Create service and route" },
                { text: "Send API request through gateway" },
              ],
              note: "✅ No dataplane setup required — value in under 5 minutes.",
            },
          },
        ],
      },
      {
        label: "Understanding the Architecture",
        blocks: [
          { type: "image-aside-stack",
            images: [
              { src: "/images/work/kong/serverless-gateways/1.1-gateway-diagram.png", alt: "Gateway traffic path without plugins" },
              { src: "/images/work/kong/serverless-gateways/1.2-gateway-diagram-plugins.png", alt: "Gateway traffic path with plugins" },
            ],
            children: [
              { type: "text", content: "Before designing the onboarding flow, I needed to deeply understand how gateways actually work. I ran workshops with Engineering and Product leads to build a shared model of how traffic flows through services, routes, and plugins. The goal was to find the simplest accurate mental model we could give new users." },
              { type: "text", content: "That work directly informed how we introduced the gateway concept in the onboarding UI. Instead of asking users to understand the architecture first, we let them experience the outcome and explained the model as they went." },
            ],
          },
        ],
      },
      {
        label: "The Solution",
        blocks: [
          { type: "text", content: "Serverless Gateway eliminated infrastructure as a prerequisite. When a new organization signed up, a gateway was provisioned automatically in under 30 seconds. No CLI. No dataplane. No documentation required before first use." },
          { type: "text", content: "The new flow went from seven steps spread across three environments to four steps entirely inside Konnect. Users could go from signup to sending real API traffic in under five minutes." },
          { type: "slideshow", images: [
            { src: "/images/work/kong/serverless-gateways/1.1-quickstart-alt.png", alt: "Serverless quickstart — step 1" },
            { src: "/images/work/kong/serverless-gateways/1.2-service-route.png", alt: "Creating a service and route" },
            { src: "/images/work/kong/serverless-gateways/1.3-service-route-2.png", alt: "Service and route configured" },
            { src: "/images/work/kong/serverless-gateways/1.4-quickstart-test.png", alt: "Testing the gateway" },
            { src: "/images/work/kong/serverless-gateways/1.4.2-quickstart-test.png", alt: "Gateway test in progress" },
            { src: "/images/work/kong/serverless-gateways/1.5-test-done.png", alt: "Traffic sent successfully" },
            { src: "/images/work/kong/serverless-gateways/1.6-traffic.png", alt: "Live gateway traffic view" },
            { src: "/images/work/kong/serverless-gateways/1.7-plugins.png", alt: "Plugins available in serverless mode" },
            { src: "/images/work/kong/serverless-gateways/1.8-rla.png", alt: "Rate limiting applied" },
            { src: "/images/work/kong/serverless-gateways/1.9-rla-2.png", alt: "Rate limiting configured" },
            { src: "/images/work/kong/serverless-gateways/1.10-quickstart-done.png", alt: "Quickstart complete" },
            { src: "/images/work/kong/serverless-gateways/1.11-overview.png", alt: "Serverless Gateway overview" },
          ]},
          { type: "list", items: [
            "Full access to Kong Gateway plugins from day one",
            "Cold-start recovery with idle shutdown to control cloud costs",
            "Konnect handled provisioning and placement transparently. Users never saw it happen.",
          ]},
        ],
      },
      {
        label: "Migration Path",
        blocks: [
          { type: "text", content: "Serverless Gateway was never meant to be the final destination. The design included a clear upgrade path for users who were ready to move to self-managed infrastructure at production scale." },
          { type: "text", content: "Upgrade guidance surfaced at usage limits. Configuration handoff to hybrid gateways was guided step by step. Serverless became a launchpad, not a ceiling." },
          { type: "slideshow", images: [
            { src: "/images/work/kong/serverless-gateways/2.1-migrate-overview.png", alt: "Migration overview" },
            { src: "/images/work/kong/serverless-gateways/2.2-migrate-setup.png", alt: "Setting up the self-managed dataplane" },
            { src: "/images/work/kong/serverless-gateways/2.3-migrate-cli.png", alt: "CLI setup step" },
            { src: "/images/work/kong/serverless-gateways/2.4-migrate-cli-running.png", alt: "CLI running" },
            { src: "/images/work/kong/serverless-gateways/2.5-migrate-connected.png", alt: "Self-managed gateway connected" },
            { src: "/images/work/kong/serverless-gateways/2.6-migrate-add-service.png", alt: "Adding service and route post-migration" },
          ]},
        ],
      },
      {
        label: "Outcomes",
        blocks: [
          { type: "text", content: "Serverless Gateway launched July 2024." },
          { type: "list", items: [
            "Time to first traffic dropped from hours to under 5 minutes",
            "Traffic-sending organizations increased from ~20% to 30%+",
            "Week-over-week retention improved as more organizations returned after first use",
            "Growth and Marketing ran their first self-serve acquisition campaigns using Serverless as the entry point",
            "Enterprise sales teams adopted Serverless as a standard demo path, reducing time-to-conviction in trials",
          ]},
          { type: "quote", content: "Once we had Serverless running, I finally saw the power of Kong without needing help. That's when we got serious.", attribution: "Developer, post-evaluation survey" },
        ],
      },
      {
        label: "Learnings",
        blocks: [
          { type: "text", content: "Activation turned out to be a systems problem, not a UI problem. Fixing the entry point helped, but every step I touched surfaced dependencies on things upstream or downstream I hadn't yet designed. The whole journey from signup to first value had to be coherent before any single piece of it could land." },
          { type: "text", content: "The insight that stuck with me: developers don't evaluate products by reading about them. They need to touch something real. Every minute of setup before that first moment of use is a risk to the relationship. Not a preference. A risk." },
          { type: "text", content: "What surprised me most was how much of the friction was conceptual, not technical. Users weren't blocked because the UI was hard. They were blocked because they didn't understand what a gateway was or why they needed one. The architecture diagrams and progressive disclosure patterns weren't polish. They were load-bearing." },
          { type: "text", content: "This project became a reference point internally for how Kong could approach PLG. Not a playbook I handed off. A pattern other teams could build on." },
        ],
      },
    ],
  },
  {
    slug: "learning-hub",
    company: "Kong",
    category: "Developer Education",
    title: "Learning Hub",
    description: "A developer-first education portal built to reduce time-to-value across Konnect.",
    role: "Senior Staff Product Designer",
    period: "Jul 2024",
    heroImage: "/images/work/kong/learning-hub/1.5-learning-center.png",
    sections: [
      {
        label: "",
        blocks: [
          { type: "text", content: "Kong Konnect offers powerful API gateway infrastructure, but I identified a critical gap: users arrived with no onboarding support, no in-app guidance, and no way to quickly understand what the platform did or why it mattered. The product assumed knowledge most new users were still building." },
          { type: "text", content: "I designed the Learning Hub — an in-app education system embedded directly in the console, built to meet users where they were confused rather than sending them elsewhere to figure it out. Delivered across 3 milestones over 3 months as Staff Product Designer, Growth." },
          { type: "metrics", items: [
            { value: "+15%", label: "Activation rate", trend: "up" },
            { value: "25%", label: "Fewer support requests", trend: "down" },
          ]},
        ],
      },
      {
        label: "Background",
        blocks: [
          { type: "text", content: "Kong Konnect Gateway is an API gateway that helps organizations securely manage, route, and monitor API traffic across services. It provides key capabilities like traffic control, authentication, rate limiting, and observability — designed to help teams scale services reliably and efficiently." },
          { type: "two-col",
            left: [
              { type: "heading", content: "Before Kong" },
              { type: "image", src: "/images/work/kong/learning-hub/before.png", alt: "Before Kong — manual API connections without a gateway" },
              { type: "text", content: "Developers had to manually build and maintain complex systems to connect and protect APIs. This slowed teams down and increased the risk of errors at every layer." },
            ],
            right: [
              { type: "heading", content: "After Kong" },
              { type: "image", src: "/images/work/kong/learning-hub/Kong-Gateway-Example-2.png", alt: "After Kong — unified gateway managing API traffic" },
              { type: "text", content: "With a Kong Gateway you have a traffic controller for your APIs. It manages, secures, and routes data between services so apps run smoothly and reliably — without the custom plumbing." },
            ],
          },
        ],
      },
      {
        label: "The Problem",
        blocks: [
          { type: "text", content: "Gateways help teams move faster and build more reliable software — but only once they understand them. That gap was exactly where Konnect was losing users." },
          { type: "heading", content: "Where we were before" },
          { type: "text", content: "When new customers signed up for Konnect they were greeted with the main overview page. No next steps. No context. No acknowledgment that they were new." },
          { type: "text", content: "Along with this, new customers were often confronted with terminology they had not yet internalized. Gateways, services, routes, plugins — concepts that took time to understand but were assumed from the start." },
          { type: "image", src: "/images/work/kong/learning-hub/konnect-preview.png", alt: "Konnect overview page before the Learning Hub", caption: "New users landed here — dense, unfamiliar, and with no indication of where to start." },
          { type: "text", content: "To understand the scale of the problem I analyzed user data and support requests, focusing on where users got stuck and what was preventing successful activation." },
          { type: "text", content: "90% of users failed to activate within the first week. Over 50% churned. 95% of revenue still came through the sales team. These numbers, based on 1,000+ new orgs created per week, made it clear the product was leaving most users behind before they ever reached the value." },
          { type: "text", content: "The pattern was consistent: users did not understand Konnect's terms and features. The time to 'a-ha' was too long and too risky. Users who did eventually get it retained quickly. The problem was getting them there." },
        ],
      },
      {
        label: "Competitive Analysis",
        blocks: [
          { type: "image-aside",
            image: { src: "/images/work/kong/learning-hub/Competitive-logos-2.png", alt: "Competitive analysis — products reviewed" },
            children: [
              { type: "text", content: "I reviewed approximately 5 products including direct competitors to understand how they handled in-app learning and onboarding support. Key findings:" },
              { type: "list", items: [
                "Templates at onboarding work best when matched to the user's specific use case, not generic checklists",
                "AI-assisted bots have become standard for self-serve flows and return content with a casual, human tone",
                "Side panel and bottom-right floating components are the dominant delivery pattern for in-context help",
                "Products that got it right treated learning as part of the product surface, not a help overlay bolted on after the fact",
              ]},
            ],
          },
        ],
      },
      {
        label: "Hypothesis",
        blocks: [
          { type: "quote", content: "By introducing an in-app Learning Hub with contextual guidance, use case-driven templates, and AI-assisted support, we can reduce onboarding friction, empower users to become self-sufficient faster, and drive higher activation and adoption. Lowering support costs and laying the foundation for Konnect to become a true API co-pilot." },
        ],
      },
      {
        label: "Goals",
        blocks: [
          { type: "two-col",
            left: [
              { type: "heading", content: "User Goals" },
              { type: "list", items: [
                "Intuitive onboarding that adapts to my workflow and use case",
                "Confidence and control to quickly set up and manage my API gateway",
                "Ability to resolve common issues independently without relying on external support",
              ]},
            ],
            right: [
              { type: "heading", content: "Business Goals" },
              { type: "list", items: [
                "Accelerate onboarding and drive rapid user activation",
                "Reduce support costs through self-serve in-app learning",
                "Build the foundation for progressively smarter, AI-driven guidance",
              ]},
            ],
          },
        ],
      },
      {
        label: "Flow 1: Welcoming New Users",
        blocks: [
          { type: "text", content: "The initiative was scoped across multiple milestones — each expanding the hub's capabilities and incorporating feedback from the previous iteration. Flow 1 focused on the welcome experience: getting new users oriented, contextualizing the product for their use case, and giving them a clear path forward from day one." },
          { type: "text", content: "Before designing anything I mapped Konnect's core concepts — what we called foundations — against the apps and features built on top of them. The goal was to understand when and how to surface meaningful steps for users to be successful with Kong gateways." },
          { type: "image", src: "/images/work/kong/learning-hub/foundations-breakdown.png", alt: "Foundations and apps content mapping" },
          { type: "text", content: "From there I developed a content strategy for the Learning Hub, working closely with the docs team to determine what information needed to live inside the product versus when to hand users off to external documentation." },
          { type: "text", content: "Flow 1 designed the welcome experience for new users — from signup through to their first gateway. The designs below show the full flow:" },
          { type: "list", items: [
            "Input your org name",
            "Set your region",
            "Needs survey — used to set context in the Learning Hub for the session ahead",
            "Gateway quickstart with the Learning Hub open and oriented to your use case",
          ]},
          { type: "slideshow", images: [
            { src: "/images/work/kong/learning-hub/1.1-new-org.png", alt: "Step 1 — Input your org name" },
            { src: "/images/work/kong/learning-hub/1.3-org-region.png", alt: "Step 2 — Set your region" },
            { src: "/images/work/kong/learning-hub/1.5-learning-center.png", alt: "Step 4 — Gateway quickstart with Learning Hub open" },
          ]},
          { type: "video-aside",
            youtubeId: "Fg_sB69Irh4",
            children: [
              { type: "text", content: "A key part of the welcome experience was helping customers understand what Kong offers and that the platform was there for them. I worked closely with Senior Director of DevRel, Michael Heap, to produce a welcome video that captured Kong's value and how easy it was to get started. Goals for the video:" },
              { type: "list", items: [
                "Show that Kong solves real problems",
                "Showcase the power of a unified control plane",
                "Demonstrate the ability to scale quickly with ease",
              ]},
            ],
          },
          { type: "image-aside",
            image: { src: "/images/work/kong/learning-hub/hub-breakdown.png", alt: "Learning Hub component anatomy" },
            children: [
              { type: "heading", content: "Learning Hub component anatomy" },
              { type: "text", content: "The Learning Hub pattern provides a structured and accessible in-app learning environment, designed to optimize user understanding and support. Key components include:" },
              { type: "list", items: [
                "LH Breadcrumb: top-level navigation to orient within the hub and move efficiently",
                "Content Area: concise, relevant information sourced from Konnect docs, reshaped for in-app delivery",
                "Content Survey: integrated feedback mechanism for continuous content improvement",
                "Additional Help: persistent gateway to deeper support resources",
              ]},
            ],
          },
        ],
      },
      {
        label: "Flow 2: Product-Wide Assistance",
        blocks: [
          { type: "text", content: "A key challenge in Konnect was that users often struggled to grasp its features and terminology, which slowed them down across the entire product. Milestone 1 tackled this by integrating a global Learning Hub — a deliberate design choice to meet users wherever they were, not just at signup." },
          { type: "text", content: "Instead of bouncing users out to external documentation, I collaborated with the docs team to reshape content for in-app delivery — emphasizing conciseness and user-friendliness. This work covered approximately 18 different features and pages across the console. The grid below shows the hub across 6 of those features — each with its own contextual content, not a generic help panel." },
          { type: "image-grid", images: [
            { src: "/images/work/kong/learning-hub/2.1.2-Repurposing-book-icons-Services-Fly-Out.png", alt: "Learning Hub — Services" },
            { src: "/images/work/kong/learning-hub/2.2.2-Repurposing-book-icons-Routes-Fly-Out.png", alt: "Learning Hub — Routes" },
            { src: "/images/work/kong/learning-hub/2.3.2-Repurposing-book-icons-Consumers-Fly-Out.png", alt: "Learning Hub — Consumers" },
            { src: "/images/work/kong/learning-hub/2.4.2-Repurposing-book-icons-Plugins-Fly-Out.png", alt: "Learning Hub — Plugins" },
            { src: "/images/work/kong/learning-hub/2.5.2-Repurposing-book-icons-Upstreams-Fly-Out.png", alt: "Learning Hub — Upstreams" },
            { src: "/images/work/kong/learning-hub/2.6.2-Repurposing-book-icons-Vaults-Fly-Out.png", alt: "Learning Hub — Vaults" },
          ], columns: 3 },
        ],
      },
      {
        label: "Outcomes",
        blocks: [
          { type: "text", content: "Milestone 1 released July 2024. The initial framework established the strategic direction for the Learning Hub and created a scalable, adaptable system that became the foundation for future growth." },
          { type: "metrics", items: [
            { value: "+15%", label: "Activation rate", trend: "up" },
            { value: "25%", label: "Fewer support requests", trend: "down" },
          ]},
          { type: "list", items: [
            "Coverage across 18 features and pages from day one",
            "Needs survey at signup personalized hub content to each user's use case",
            "Welcome video produced with DevRel to accelerate time-to-understanding",
            "System became the foundation for Learning Hub 2.0, led by a designer I mentored through handoff",
          ]},
        ],
      },
      {
        label: "Learnings",
        blocks: [
          { type: "text", content: "The hardest part wasn't the UI. It was the content strategy. Deciding what to say, how much to say, and when to say it required as much design thinking as the component itself. Documentation that works in a docs site does not automatically work inside a product." },
          { type: "text", content: "The needs survey at signup was one of the most important decisions we made. Personalizing the hub based on use case meant users arrived at content that felt relevant rather than generic. It also gave us a signal we could use to improve over time." },
          { type: "text", content: "Building with handoff in mind paid off. The system I shipped was intentionally extensible. The fact that another designer was able to take it further without rebuilding it from scratch was a validation of the architecture decisions, not just the visual ones." },
        ],
      },
    ],
  },
  {
    slug: "konnect-plus-trial",
    company: "Kong",
    category: "Growth",
    title: "Konnect Plus Trial",
    description: "Self-serve trial flows that converted enterprise prospects without high-touch sales.",
    role: "Senior Staff Product Designer",
    period: "May 2024",
    heroImage: "/images/work/kong/konnect-plus-trial/1.1-banner-default.png",
    sections: [
      {
        label: "",
        blocks: [
          { type: "text", content: "Konnect Plus is a core pricing tier for Kong Konnect. Users could trial it before paying, but 68% of them never knew it was available. The ones who did find out wanted it. The product just wasn't telling them." },
          { type: "text", content: "I redesigned the trial and upgrade experience end-to-end across 2 milestones: a clear 30-day trial with persistent status banners, and a native in-product checkout replacing the Stripe redirect. Delivered over 2 months as Staff Product Designer, Growth." },
          { type: "metrics", items: [
            { value: "+17%", label: "Trial upgrades", trend: "up" },
            { value: "40%", label: "Fewer trial support requests", trend: "down" },
          ]},
        ],
      },
      {
        label: "The Problem",
        blocks: [
          { type: "text", content: "Only 10% of customers knew they had a trial running. The platform used a hybrid credit-and-time model that most users never understood. When the trial ended, features disappeared and unexpected costs appeared. Support tickets started with phrases like 'I didn't even know I had a trial.' The product had no visible signal that anything was happening." },
          { type: "text", content: "I analyzed user data focusing on trial awareness and what was preventing conversion. The numbers confirmed the support tickets." },
          { type: "list", items: [
            "68% of users wanted the Konnect Plus trial when it was explained to them",
            "10% of customers knew they were in a trial",
            "91% of users had no idea about the credit loan system",
          ]},
          { type: "quote-list", items: [
            { text: "I got an email about my trial expiring? When and who triggered the trial? We didn't realize we had it running and feel like we weren't able to properly use it.", attribution: "Konnect customer" },
            { text: "What are all these extra costs? I was looking to upgrade to Konnect Plus but it says I owe money?? Why?", attribution: "Konnect customer" },
          ]},
        ],
      },
      {
        label: "Competitive Analysis",
        blocks: [
          { type: "image-aside",
            image: { src: "/images/work/kong/konnect-plus-trial/Competitive-logos.png", alt: "Competitive analysis — products reviewed" },
            children: [
              { type: "text", content: "I reviewed approximately 5 products including direct competitors to understand how they surfaced trial status, upgrade paths, and pricing clarity. Key findings:" },
              { type: "list", items: [
                "Globalized banners reinstate trial status throughout the product and drive urgency without being disruptive",
                "Global upgrade CTAs maintain awareness and provide fast routes to convert at the moment users are ready",
                "What is in a trial should be in a trial. Hidden fees and credit loan systems destroy trust at the worst possible moment",
                "Pricing breakdowns need to be easy to read and presented before users commit, not after",
              ]},
            ],
          },
        ],
      },
      {
        label: "Hypothesis",
        blocks: [
          { type: "quote", content: "By redesigning the Konnect Plus trial and upgrade experience we can reduce friction, improve trial clarity, and surface value more effectively. This will lead to increased user confidence, higher activation rates, and significantly improved trial-to-paid conversion." },
        ],
      },
      {
        label: "Goals",
        blocks: [
          { type: "two-col",
            left: [
              { type: "heading", content: "User Goals" },
              { type: "list", items: [
                "Understand trial status, timeline, and what happens when it ends",
                "Explore Konnect Plus features with confidence, no surprise charges",
                "Convert to paid when ready through a clear, trustworthy flow",
              ]},
            ],
            right: [
              { type: "heading", content: "Business Goals" },
              { type: "list", items: [
                "Increase trial-to-paid conversion by removing confusion and friction",
                "Reduce support volume by making trial status and pricing self-evident",
                "Set the standard for all future purchasing and upgrade paths in Konnect",
              ]},
            ],
          },
        ],
      },
      {
        label: "Expanding the Scope",
        blocks: [
          { type: "text", content: "Originally the team wanted to focus only on trial mentions throughout the UI. After reviewing the data and walking through the existing flow, I pushed to go further." },
          { type: "text", content: "The upgrade flow was handled entirely through Stripe, taking customers completely out of the Konnect experience. Users were not presented with enough information about what they were about to be billed. Rebuilding this natively, alongside updating the billing page, gave us a more complete approach to the conversion problem rather than patching around it." },
        ],
      },
      {
        label: "Milestone 1: Trial Awareness",
        blocks: [
          { type: "text", content: "The first milestone focused on making the trial visible throughout the product. Before this work, users received no in-app indication of their trial status beyond a single email at expiry." },
          { type: "text", content: "The solution was a persistent global banner that tracked trial progress and surfaced a quick upgrade action at every stage. Alongside this we simplified the trial model itself, replacing the confusing credit-loan system with a clean 30-day period. When the trial ends, it ends. No hidden charges." },
          { type: "list", items: [
            "30-day trial duration, clearly communicated from signup",
            "Credit and loan system removed entirely",
            "Active alerting campaign in-app and via email at 30 days, 14 days, 2 days, 24 hours, and expiry",
          ]},
          { type: "slideshow", images: [
            { src: "/images/work/kong/konnect-plus-trial/1.1-banner-default.png", alt: "Trial banner — default state" },
            { src: "/images/work/kong/konnect-plus-trial/1.2-banner-expiring.png", alt: "Trial banner — expiring soon" },
            { src: "/images/work/kong/konnect-plus-trial/1.5-banner-almost-done.png", alt: "Trial banner — almost done" },
            { src: "/images/work/kong/konnect-plus-trial/1.7-banner-expired.png", alt: "Trial banner — expired" },
          ]},
        ],
      },
      {
        label: "Milestone 2: Upgrade Flow",
        blocks: [
          { type: "text", content: "Milestone 2 rebuilt the upgrade experience natively inside Konnect. The previous flow redirected users to Stripe with no pricing context and no continuity with the product they were buying into." },
          { type: "text", content: "The new flow surfaced transparent pricing, showed exactly what was included at each tier, and kept the entire checkout experience within Konnect. Trial credits were applied as a conversion incentive, giving users a concrete reason to upgrade before expiry rather than after." },
          { type: "slideshow", images: [
            { src: "/images/work/kong/konnect-plus-trial/2.1-plan-usage.png", alt: "Plan and usage — simplified overview" },
            { src: "/images/work/kong/konnect-plus-trial/2.4-upgrade.png", alt: "Upgrade flow — plan selection" },
            { src: "/images/work/kong/konnect-plus-trial/2.5-upgrade-filled.png", alt: "Upgrade flow — details filled" },
            { src: "/images/work/kong/konnect-plus-trial/2.6-paid-plan.png", alt: "Paid plan — confirmed state" },
          ]},
        ],
      },
      {
        label: "Outcomes",
        blocks: [
          { type: "text", content: "Milestone 1 and 2 released July 2024." },
          { type: "metrics", items: [
            { value: "+17%", label: "Trial upgrades", trend: "up" },
            { value: "40%", label: "Fewer trial support requests", trend: "down" },
          ]},
          { type: "list", items: [
            "Set the standard for all future purchasing and upgrade paths within Konnect",
            "Rapid improvement in trial awareness and self-serve upgrades",
            "Eliminated negative sentiment around loaned credits",
            "Upgrade flow rebuilt natively, removing the Stripe redirect entirely",
          ]},
        ],
      },
      {
        label: "Learnings",
        blocks: [
          { type: "text", content: "The biggest win was pushing to expand the scope. A narrower brief — just adding trial banners — would have improved awareness but left users hitting the same broken upgrade flow. The data made a clear case for doing more, and having the conviction to advocate for that shaped the outcome." },
          { type: "text", content: "Removing the credit loan system was as much a product decision as a design one. The confusion it created wasn't a communication problem, it was a model problem. Simplifying to a clean 30-day trial removed an entire category of support tickets and gave users a mental model they could actually hold." },
          { type: "text", content: "The native upgrade flow set a precedent beyond this project. Building it properly the first time meant every future purchasing surface in Konnect had a pattern to follow rather than defaulting to another Stripe redirect." },
        ],
      },
    ],
  },

  // --- Postman ---
  {
    slug: "notification-center",
    company: "Postman",
    category: "Growth",
    title: "Notification Center 2.0",
    description: "Redesigning how 25M+ users stay informed across a complex collaborative platform.",
    role: "Design Manager, Growth",
    period: "Nov 2023",
    heroImage: "/images/work/postman/notification-center/1.3-viewing-all.png",
    sections: [],
  },
  {
    slug: "domain-visibility",
    company: "Postman",
    category: "Collaboration",
    title: "Domain Visibility",
    description: "Making team boundaries legible inside invite flows to reduce workspace confusion.",
    role: "Design Manager, Growth",
    period: "Sep 2023",
    heroImage: "/images/work/postman/domain-visibility/1.2-invite-all.png",
    sections: [],
  },

  // --- Google ---
  {
    slug: "layout-inspector",
    company: "Google",
    category: "Developer Tools",
    title: "Layout Inspector 2.0",
    description: "Giving Android developers a live, hierarchical view of their UI at runtime.",
    role: "Interaction Designer II",
    period: "Apr 2020",
    heroImage: "/images/work/google/layout-inspector/1.4-3d-view-full.png",
    sections: [],
  },
  {
    slug: "resource-management",
    company: "Google",
    category: "Developer Tools",
    title: "Resource Management",
    description: "0-to-1 asset management for Android Studio, serving 2.5M+ developers.",
    role: "Interaction Designer II",
    period: "Jan 2019",
    heroImage: "/images/work/google/resource-management/res-1.png",
    sections: [],
  },

  // --- Microsoft ---
  {
    slug: "azure-sql-overview",
    company: "Microsoft",
    category: "Cloud Infrastructure",
    title: "Azure SQL Overview",
    description: "Redesigning the entry point for enterprise cloud database management at global scale.",
    role: "Designer II",
    period: "2017",
    heroImage: "/images/work/microsoft/azure-sql-overview/1.1-overview.png",
    sections: [],
  },
  {
    slug: "azure-sql-resources",
    company: "Microsoft",
    category: "Cloud Infrastructure",
    title: "Azure SQL Resources & Pricing",
    description: "Making complex pricing tiers and resource configuration legible for enterprise buyers.",
    role: "Designer II",
    period: "2016",
    heroImage: "/images/work/microsoft/azure-sql-resources/0.1-before.png",
    sections: [],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
