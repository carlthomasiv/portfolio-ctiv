import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content/case-studies");

export interface CaseStudyFrontmatter {
  title: string;
  company: string;
  category: string;
  description: string;
  role: string;
  period: string;
  heroImage?: string;
  draft?: boolean;
}

/** Returns the raw MDX source + frontmatter for a slug, or null if no file exists.
 *  Files with `draft: true` in frontmatter are hidden in production but visible locally. */
export function getMdxCaseStudy(slug: string): {
  frontmatter: CaseStudyFrontmatter;
  source: string;
} | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  // Hide drafts in production — falls through to placeholder page
  if (data.draft && process.env.NODE_ENV !== "development") return null;

  return {
    frontmatter: data as CaseStudyFrontmatter,
    source: content,
  };
}

/** Returns all slugs that have a published (non-draft) MDX file. */
export function getMdxCaseStudySlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"))
    .map((f) => f.replace(/\.mdx$/, ""))
    .filter((slug) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, `${slug}.mdx`), "utf-8");
      const { data } = matter(raw);
      return !data.draft || process.env.NODE_ENV === "development";
    });
}
