import { Hero } from "@/components/Hero";
import { WorkList } from "@/components/WorkList";
import { NowSection } from "@/components/NowSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--bg)",
      }}
    >
      <main style={{ flex: 1 }}>
        <Hero />
        <WorkList />
        <NowSection />
      </main>
      <Footer />
    </div>
  );
}
