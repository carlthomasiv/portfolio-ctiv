import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Footer } from "@/components/Footer";
import { CaseStudyContent } from "@/components/CaseStudyContent";
import { MdxCaseStudyContent } from "@/components/MdxCaseStudyContent";
import { getCaseStudy, caseStudies } from "@/data/case-studies";
import { getMdxCaseStudy } from "@/lib/mdx-case-study";
import {
  mdxTypography,
  Metrics,
  Callout,
  SectionLabel,
  CaseImage,
  ImageGrid,
  Slideshow,
  Comparison,
  CaseLink,
  ArticleCard,
  Visual,
  AutomationFunnel,
  RepoFanout,
  SystemModel,
  HybridModel,
  NumberedList,
  Pullquote,
  UseCaseSplit,
} from "@/components/mdx-components";

const mdxComponents = {
  ...mdxTypography,
  Metrics,
  Callout,
  SectionLabel,
  CaseImage,
  ImageGrid,
  Slideshow,
  Comparison,
  CaseLink,
  ArticleCard,
  Visual,
  AutomationFunnel,
  RepoFanout,
  SystemModel,
  HybridModel,
  NumberedList,
  Pullquote,
  UseCaseSplit,
};

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const mdx = getMdxCaseStudy(slug);
  if (mdx) {
    return {
      title: `${mdx.frontmatter.title} — ${mdx.frontmatter.company}`,
      description: mdx.frontmatter.description,
    };
  }

  const study = getCaseStudy(slug);
  if (!study) return { title: "Not Found" };
  return {
    title: `${study.title} — ${study.company}`,
    description: study.description,
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // MDX-first: if a content file exists, render it
  const mdx = getMdxCaseStudy(slug);
  if (mdx) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>
        <MdxCaseStudyContent frontmatter={mdx.frontmatter} slug={slug}>
          <MDXRemote source={mdx.source} components={mdxComponents} options={{ blockJS: false }} />
        </MdxCaseStudyContent>
        <Footer />
      </div>
    );
  }

  // Fallback: existing TypeScript block data
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>
      <CaseStudyContent study={study} />
      <Footer />
    </div>
  );
}
