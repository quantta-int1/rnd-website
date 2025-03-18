'use client';
import Header from "@/components/shared/Header";
import HeroSection from "@/components/home/HeroSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        {/* Other sections */}
      </main>
    </div>
  );
}

