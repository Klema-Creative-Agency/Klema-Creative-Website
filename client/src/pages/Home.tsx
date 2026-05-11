import Navbar from "@/components/Navbar";
import MobileStickyBar from "@/components/MobileStickyBar";
import HeroSection from "@/components/HeroSection";
import NicheBar from "@/components/NicheBar";
import PainPointsSection from "@/components/PainPointsSection";
import ServicesSection from "@/components/ServicesSection";
import ResultsSection from "@/components/ResultsSection";
import FounderSection from "@/components/FounderSection";
import ProcessSection from "@/components/ProcessSection";
import ContactSection from "@/components/ContactSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <NicheBar />
      <PainPointsSection />
      <ServicesSection />
      <ResultsSection />
      <FounderSection />
      <ProcessSection />
      <ContactSection />
      <PricingSection />
      <FAQSection />
      <Footer />
      <MobileStickyBar />
    </div>
  );
}
