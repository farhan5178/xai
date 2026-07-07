import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/Hero/HeroSection";
import { InsightFlowSection } from "@/components/InsightFlow/InsightFlowSection";
import { DashboardSection } from "@/components/Dashboard/DashboardSection";
import { WowSection } from "@/components/WowMoment/WowSection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <InsightFlowSection />
        <DashboardSection />
        <WowSection />
      </main>
      <Footer />
    </>
  );
}
