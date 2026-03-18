import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { PostContent } from "@/components/PostContent";
import { getPost, posts } from "@/data/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} — Carl Thomas`,
    description: post.excerpt,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>
      <PostContent post={post} />
      <Footer />
    </div>
  );
}
