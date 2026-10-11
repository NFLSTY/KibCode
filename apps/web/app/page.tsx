import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { CategoryCards } from "@/components/landing/CategoryCards";
import { MiniChallenge } from "@/components/landing/MiniChallenge";
import { ParentFeatures } from "@/components/landing/ParentFeatures";
import { CallToAction } from "@/components/landing/CallToAction";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBEB] text-[#1E293B]">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Hero />
        <CategoryCards />
        <MiniChallenge />
        <ParentFeatures />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
