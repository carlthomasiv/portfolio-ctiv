import { Footer } from "@/components/Footer";
import { ThinkingContent } from "@/components/ThinkingContent";

export const metadata = {
  title: "Thinking — Carl Thomas",
  description: "Essays and posts on design, infrastructure, and AI-native workflows.",
};

export default function ThinkingPage() {
  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <ThinkingContent />
      <Footer />
    </main>
  );
}
