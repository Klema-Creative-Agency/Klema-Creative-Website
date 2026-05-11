import { useEffect, useLayoutEffect } from "react";
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

type HomeProps = {
  /**
   * Optional element id to scroll to on initial load. The /contact route
   * passes "contact" so the visitor lands directly on the audit form
   * without an in-URL hash. URL #hash anchors are also honored automatically.
   */
  scrollToOnLoad?: string;
};

export default function Home({ scrollToOnLoad }: HomeProps = {}) {
  // Determine the scroll target: explicit prop wins, then URL hash fallback.
  // Runs once on mount. Scrolls early (pre-paint) and again after a short
  // delay to catch layout shifts from late-loading images/fonts.
  useLayoutEffect(() => {
    const target =
      scrollToOnLoad ||
      (typeof window !== "undefined" && window.location.hash
        ? window.location.hash.slice(1)
        : null);
    if (!target) return;

    const scrollToTarget = () => {
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: "auto", block: "start" });
    };

    requestAnimationFrame(scrollToTarget);
  }, [scrollToOnLoad]);

  useEffect(() => {
    const target =
      scrollToOnLoad ||
      (typeof window !== "undefined" && window.location.hash
        ? window.location.hash.slice(1)
        : null);
    if (!target) return;

    const scrollToTarget = () => {
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: "auto", block: "start" });
    };

    const t1 = setTimeout(scrollToTarget, 200);
    const t2 = setTimeout(scrollToTarget, 700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [scrollToOnLoad]);

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
