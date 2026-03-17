import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WorkIndex } from "@/components/WorkIndex";

export const metadata = {
  title: "Work — Carl Thomas",
  description: "Case studies across developer infrastructure, AI platforms, and growth design.",
};

export default function WorkPage() {
  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <WorkIndex />
      <Footer />
    </main>
  );
}
