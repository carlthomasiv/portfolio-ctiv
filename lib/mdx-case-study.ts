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
}

/** Returns the raw MDX source + frontmatter for a slug, or null if no file exists. */
export function getMdxCaseStudy(slug: string): {
  frontmatter: CaseStudyFrontmatter;
  source: string;
} | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    frontmatter: data as CaseStudyFrontmatter,
    source: content,
  };
}

/** Returns all slugs that have an MDX file. */
export function getMdxCaseStudySlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
