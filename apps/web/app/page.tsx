import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { MiniChallenge } from "@/components/landing/MiniChallenge";
import { CategoryCards } from "@/components/landing/CategoryCards";
import { AITutorSpotlight } from "@/components/landing/AITutorSpotlight";
import { ParentFeatures } from "@/components/landing/ParentFeatures";
import { CallToAction } from "@/components/landing/CallToAction";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBEB] text-[#1E293B]">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Hero />
        <MiniChallenge />
        <CategoryCards />
        <AITutorSpotlight />
        <ParentFeatures />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
