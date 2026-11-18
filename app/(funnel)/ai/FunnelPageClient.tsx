"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getNiche } from "./data/funnel-content";
import FunnelNav from "./components/FunnelNav";
import FunnelHero from "./components/FunnelHero";
import ProblemSection from "./components/ProblemSection";
import SolutionSection from "./components/SolutionSection";
import HowItWorks from "./components/HowItWorks";
import TrustSignals from "./components/TrustSignals";
import OfferSection from "./components/OfferSection";
import FunnelFAQ from "./components/FunnelFAQ";
import FinalCTA from "./components/FinalCTA";
import LeadCaptureForm from "./components/LeadCaptureForm";
import StickyMobileCTA from "./components/StickyMobileCTA";
import FunnelFooter from "./components/FunnelFooter";
import CookieConsent from "./components/CookieConsent";
import MetaPixel from "./components/MetaPixel";
import FunnelTracker from "./components/FunnelTracker";

export default function FunnelPageClient() {
  const searchParams = useSearchParams();
  const nicheSlug = searchParams.get("niche");
  const niche = getNiche(nicheSlug);

  // Hide global Navbar and Footer via vsl-page body class
  useEffect(() => {
    document.body.classList.add("vsl-page");
    return () => document.body.classList.remove("vsl-page");
  }, []);

  return (
    <div className="min-h-screen bg-bg">
      <MetaPixel />
      <FunnelTracker />

      {/* URGENCY BAR */}
      <div className="bg-accent text-black text-center py-2.5 px-4 text-[13px] font-bold tracking-[0.02em]">
        {niche.urgencyBar}
      </div>

      <FunnelNav />

      <main>
        <FunnelHero niche={niche} />

        <div data-funnel-stage="2" data-stage-name="problem">
          <ProblemSection niche={niche} />
        </div>

        <div data-funnel-stage="3" data-stage-name="solution">
          <SolutionSection />
        </div>

        <div data-funnel-stage="4" data-stage-name="how-it-works">
          <HowItWorks />
        </div>

        {/* Mid-page CTA */}
        <section className="py-16 max-md:py-10">
          <div className="max-w-[600px] mx-auto px-8 max-md:px-5 text-center">
            <a
              href="#lead-form"
              className="inline-block bg-accent text-black px-8 py-4 rounded-full font-semibold text-[16px] transition-all duration-300 btn-primary-hover"
            >
              {niche.heroCtaText}
            </a>
            <p className="text-[13px] text-text-dim mt-3">
              Free strategy call. No obligation.
            </p>
          </div>
        </section>

        <div data-funnel-stage="5" data-stage-name="trust">
          <TrustSignals />
        </div>

        <div data-funnel-stage="6" data-stage-name="offer">
          <OfferSection niche={niche} />
        </div>

        <div data-funnel-stage="7" data-stage-name="faq">
          <FunnelFAQ />
        </div>

        <div data-funnel-stage="8" data-stage-name="final-cta">
          <FinalCTA niche={niche} />
        </div>

        <div id="lead-form" data-funnel-stage="9" data-stage-name="lead-form">
          <LeadCaptureForm niche={niche} />
        </div>
      </main>

      <FunnelFooter />
      <StickyMobileCTA ctaText={niche.heroCtaText} />
      <CookieConsent />
    </div>
  );
}
