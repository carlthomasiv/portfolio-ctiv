export interface Project {
  company?: string;
  category: string;
  title: string;
  description: string;
  slug: string;
  thumbnail: string;
  thumbnailImage?: string;
  year: string;
}

export interface CompanyGroup {
  company: string;
  context: string;
  projects: Project[];
}

export const groups: CompanyGroup[] = [
  {
    company: "Neon",
    context: "Serverless Postgres",
    projects: [
      {
        category: "Developer Tools",
        title: "Instant Postgres Playground",
        description: "Zero-config database environments that spin up in milliseconds. No signup required.",
        slug: "instant-postgres-playground",
        thumbnail: "linear-gradient(140deg, #daeaf4 0%, #a4c8e4 100%)",
        thumbnailImage: "/images/thumbnails/instant-postgres-playground.png",
        year: "2024",
      },
      {
        category: "Infrastructure UX",
        title: "Console Navigation",
        description: "Restructuring the mental model for a multi-tenant cloud console.",
        slug: "console-navigation",
        thumbnail: "linear-gradient(140deg, #dce2f2 0%, #a8b8e4 100%)",
        thumbnailImage: "/images/thumbnails/console-navigation.png",
        year: "2024",
      },
      {
        category: "Growth",
        title: "Upgrade Flow Redesign",
        description: "Reducing friction in the path from free to paid without the hard sell.",
        slug: "upgrade-flow-redesign",
        thumbnail: "linear-gradient(140deg, #e2e0f4 0%, #b4b0e0 100%)",
        thumbnailImage: "/images/thumbnails/upgrade-flow-redesign.png",
        year: "2024",
      },
    ],
  },
  {
    company: "Kong",
    context: "API management and gateway infrastructure",
    projects: [
      {
        category: "Infrastructure UX",
        title: "Serverless Gateways",
        description: "Turning complex infrastructure setup into a zero-to-one experience developers could complete in minutes.",
        slug: "serverless-gateways",
        thumbnail: "linear-gradient(140deg, #f0e8df 0%, #d4c0aa 100%)",
        thumbnailImage: "/images/thumbnails/serverless-gateways.png",
        year: "2024",
      },
      {
        category: "Developer Education",
        title: "Learning Hub",
        description: "A developer-first education portal built to reduce time-to-value across the Konnect platform.",
        slug: "learning-hub",
        thumbnail: "linear-gradient(140deg, #ede4da 0%, #ccb89e 100%)",
        thumbnailImage: "/images/thumbnails/learning-hub.png",
        year: "2024",
      },
      {
        category: "Growth",
        title: "Konnect Plus Trial",
        description: "Self-serve trial flows that converted enterprise prospects without high-touch sales.",
        slug: "konnect-plus-trial",
        thumbnail: "linear-gradient(140deg, #eae0d4 0%, #c8b09a 100%)",
        thumbnailImage: "/images/thumbnails/konnect-plus-trial.png",
        year: "2024",
      },
    ],
  },
  {
    company: "Postman",
    context: "API development platform",
    projects: [
      {
        category: "Growth",
        title: "Notification Center 2.0",
        description: "Redesigning how 25M+ users stay informed across a complex collaborative platform.",
        slug: "notification-center",
        thumbnail: "linear-gradient(140deg, #f4e8da 0%, #e0c8a4 100%)",
        thumbnailImage: "/images/thumbnails/notification-center.png",
        year: "2023",
      },
      {
        category: "Collaboration",
        title: "Domain Visibility",
        description: "Making team boundaries legible inside invite flows to reduce workspace confusion.",
        slug: "domain-visibility",
        thumbnail: "linear-gradient(140deg, #f0e4d4 0%, #d8c098 100%)",
        thumbnailImage: "/images/thumbnails/domain-visibility.png",
        year: "2022",
      },
    ],
  },
  {
    company: "Google",
    context: "Android developer tooling",
    projects: [
      {
        category: "Developer Tools",
        title: "Layout Inspector 2.0",
        description: "Giving Android developers a live, hierarchical view of their UI at runtime.",
        slug: "layout-inspector",
        thumbnail: "linear-gradient(140deg, #ddf0ec 0%, #a8d4cc 100%)",
        thumbnailImage: "/images/thumbnails/layout-inspector.png",
        year: "2020",
      },
      {
        category: "Developer Tools",
        title: "Resource Management",
        description: "0-to-1 asset management for Android Studio, serving a community of 2.5M+ developers.",
        slug: "resource-management",
        thumbnail: "linear-gradient(140deg, #d8eee8 0%, #a0ccbf 100%)",
        thumbnailImage: "/images/thumbnails/resource-management.png",
        year: "2019",
      },
    ],
  },
  {
    company: "Microsoft",
    context: "Azure cloud database infrastructure",
    projects: [
      {
        category: "Cloud Infrastructure",
        title: "Azure SQL Overview",
        description: "Redesigning the entry point for enterprise cloud database management at global scale.",
        slug: "azure-sql-overview",
        thumbnail: "linear-gradient(140deg, #dde4f0 0%, #a8b8d8 100%)",
        thumbnailImage: "/images/thumbnails/azure-sql-overview.png",
        year: "2017",
      },
      {
        category: "Cloud Infrastructure",
        title: "Azure SQL Resources & Pricing",
        description: "Making complex pricing tiers and resource configuration legible for enterprise buyers.",
        slug: "azure-sql-resources",
        thumbnail: "linear-gradient(140deg, #d8dff0 0%, #a0aed4 100%)",
        thumbnailImage: "/images/thumbnails/azure-sql-resources.png",
        year: "2016",
      },
    ],
  },
];

// Flat list of all available projects with company name attached
export const allProjects = groups.flatMap((g) =>
  g.projects.map((p) => ({ ...p, company: g.company }))
);
