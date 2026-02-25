"use client";

import Link from "next/link";
import type { NicheData } from "@/app/data/niches";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import StatsBar from "./StatsBar";
import ProblemCards from "./ProblemCards";
import QuizFunnelDemo from "./QuizFunnelDemo";
import DeliverablesSection from "./DeliverablesSection";
import LiveDemoPreview from "./LiveDemoPreview";
import HowItWorksSection from "./HowItWorksSection";
import LeadEngineComparison from "./LeadEngineComparison";
import ROISection from "./ROISection";
import PricingCard from "./PricingCard";
import ApplicationForm from "./ApplicationForm";

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

/** Full niche service page — accepts niche data as props and renders all sections */
export default function NicheServicePage({ niche }: { niche: NicheData }) {
  return (
    <>
      {/* HERO */}
      <section className="pt-[140px] pb-20 max-md:pb-14 relative overflow-hidden">
        <div className="hero-glow hero-glow-breathe" />
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 relative z-2">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
              {niche.service_name}
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <h1 className="text-[clamp(36px,5.5vw,64px)] font-extrabold leading-[1.05] tracking-[-2px] mb-6 max-w-[800px]">
              {niche.headline}
            </h1>
          </RevealOnScroll>
          <RevealOnScroll>
            <p className="text-[17px] text-text-dim leading-[1.7] max-w-[600px] mb-10">
              {niche.sub}
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="flex items-center gap-4 flex-wrap">
              <a
                href="#apply"
                className="btn-primary-hover inline-flex items-center gap-2.5 bg-accent text-black px-9 py-4 rounded-full text-[15px] font-bold no-underline transition-all duration-300 tracking-[-0.01em]"
              >
                See How It Works
                <ArrowIcon />
              </a>
              <Link
                href={`/services/ai-lead-engine/${niche.url_slug}/watch`}
                className="btn-secondary-arrow inline-flex items-center gap-2 text-[15px] font-semibold text-text no-underline transition-colors duration-300 hover:text-accent"
              >
                Watch the Demo
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-300">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </RevealOnScroll>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-bg pointer-events-none z-[1]" />
      </section>

      {/* STATS BAR */}
      <section className="py-16 max-md:py-10">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <StatsBar
            stats={[niche.pain_stat_1, niche.pain_stat_2, niche.pain_stat_3]}
          />
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="py-30 max-md:py-20">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
              The problem
            </p>
            <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
              Sound familiar?
            </h2>
            <p className="text-[17px] text-text-dim leading-[1.7] max-w-[540px] mb-16">
              Most {niche.target_audience.toLowerCase().split(" doing")[0]} deal with the same problems.
              Here&apos;s what we hear every week.
            </p>
          </RevealOnScroll>
          <ProblemCards problems={niche.problems} />
        </div>
      </section>

      {/* QUIZ FUNNEL DEMO */}
      <QuizFunnelDemo niche={niche} />

      {/* DELIVERABLES */}
      <DeliverablesSection />

      {/* LIVE DEMO PREVIEW */}
      <LiveDemoPreview />

      {/* HOW IT WORKS */}
      <HowItWorksSection />

      {/* COMPARISON */}
      <LeadEngineComparison />

      {/* ROI SECTION */}
      <ROISection
        serviceName={niche.service_name}
        avgJobValue={niche.avg_job_value}
        setupFee={niche.setup_fee}
        monthlyFee={niche.monthly_fee}
        breakEvenJobs={niche.break_even_jobs}
        cplGoogle={niche.cpl_google}
        cplOurs={niche.cpl_our_system}
      />

      {/* PRICING */}
      <PricingCard serviceName={niche.service_name} />

      {/* APPLICATION FORM */}
      <ApplicationForm
        niche={niche.url_slug}
        serviceName={niche.service_name}
        source="service-page"
      />

      {/* FINAL CTA */}
      <section className="py-40 text-center relative overflow-hidden">
        <div className="cta-glow" />
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 relative z-2">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
              {niche.seasonal_note.split(" — ")[0]}
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
              Ready to own<br />your <span className="text-accent">leads?</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll>
            <p className="text-[17px] text-text-dim leading-[1.7] max-w-[540px] mx-auto mb-12">
              {niche.seasonal_note}
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <a
              href="#apply"
              className="btn-primary-hover inline-flex items-center gap-2.5 bg-accent text-black px-9 py-4 rounded-full text-[15px] font-bold no-underline transition-all duration-300 tracking-[-0.01em]"
            >
              Apply for {niche.service_name}
              <ArrowIcon />
            </a>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
