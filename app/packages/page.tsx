"use client";

import { useState } from "react";
import Link from "next/link";
import RevealOnScroll from "../components/RevealOnScroll";
import ComparisonTable from "../components/ComparisonTable";
import TierQuiz from "../components/TierQuiz";

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/* ───── Tier Data ───── */

interface TierData {
  tier: number;
  name: string;
  price: string;
  setup: string;
  tagline: string;
  bestFor: string;
  featured: boolean;
  cta: string;
  ctaStyle: "primary" | "secondary";
  keyFeatures: string[];
  allFeatures: string[];
}

const TIERS: TierData[] = [
  {
    tier: 1,
    name: "Ignition",
    price: "997",
    setup: "$2,500 setup",
    tagline: "Stop losing the leads you already get.",
    bestFor: "Businesses getting leads but losing them to slow follow-up or no system at all.",
    featured: false,
    cta: "Get Started",
    ctaStyle: "secondary",
    keyFeatures: [
      "Custom lead conversion funnel",
      "60-second automated call trigger",
      "SMS & email follow-up sequences",
      "Klema CRM — fully configured",
    ],
    allFeatures: [
      "Custom lead conversion funnel",
      "60-second automated call trigger",
      "SMS & email follow-up sequences",
      "Lead nurture pipeline",
      "Calendar booking integration",
      "Klema CRM — fully configured",
      "Monthly funnel optimization",
      "Dedicated account manager",
      "You keep everything if you cancel",
    ],
  },
  {
    tier: 2,
    name: "Foundation",
    price: "1,997",
    setup: "$2,500 setup",
    tagline: "Convert more leads and get found by new ones.",
    bestFor: "Businesses ready to grow lead volume organically and build a 5-star reputation.",
    featured: false,
    cta: "Get Started",
    ctaStyle: "secondary",
    keyFeatures: [
      "Everything in Ignition",
      "Search engine optimization (SEO)",
      "Google Business Profile management",
      "Reputation engine — automated reviews",
    ],
    allFeatures: [
      "Everything in Ignition, plus:",
      "Search engine optimization (SEO)",
      "Google Business Profile management",
      "Reputation engine — automated review requests",
      "Local visibility tracking & reporting",
      "Monthly SEO + conversion report",
    ],
  },
  {
    tier: 3,
    name: "Accelerator",
    price: "3,997",
    setup: "$5,000–$7,500 setup",
    tagline: "Look like the biggest company in your market.",
    bestFor: "Growing businesses ready for a professional website, paid ads, and full online presence.",
    featured: true,
    cta: "Get Started",
    ctaStyle: "primary",
    keyFeatures: [
      "Everything in Foundation",
      "Custom high-performance website",
      "Paid ad management (Google & Meta)",
      "Branded reporting dashboard",
    ],
    allFeatures: [
      "Everything in Foundation, plus:",
      "Custom-designed, high-performance website",
      "Paid ad management (Google & Meta)",
      "Branded reporting dashboard",
      "Content planning & strategy",
      "Monthly strategy call",
      "Ad spend billed directly to you — we manage it",
    ],
  },
  {
    tier: 4,
    name: "Authority",
    price: "7,500",
    setup: "$7,500 setup",
    tagline: "We run your marketing. You run your business.",
    bestFor: "Established businesses that want a full marketing department without the overhead.",
    featured: false,
    cta: "Book a Call",
    ctaStyle: "secondary",
    keyFeatures: [
      "Everything in Accelerator",
      "Content & social media (2 platforms)",
      "Email marketing campaigns",
      "Full marketing management",
    ],
    allFeatures: [
      "Everything in Accelerator, plus:",
      "4–6 SEO-optimized blog articles per month",
      "Social media management (2 platforms, 16–20 posts/mo)",
      "Email marketing campaigns",
      "Ad strategy & budget scaling",
      "Competitor monitoring",
      "Conversion optimization & A/B testing",
      "Bi-weekly strategy calls",
      "Quarterly business review",
    ],
  },
  {
    tier: 5,
    name: "Dominator",
    price: "12,000",
    setup: "$10,000 setup",
    tagline: "Your phone only rings when someone is ready to book.",
    bestFor: "Businesses that want to own their market. You close — we do everything else.",
    featured: false,
    cta: "Book a Call",
    ctaStyle: "secondary",
    keyFeatures: [
      "Everything in Authority",
      "Dedicated lead team (60-sec response)",
      "Live hot transfers to your team",
      "Appointment setting & outbound follow-up",
    ],
    allFeatures: [
      "Everything in Authority, plus:",
      "Dedicated lead team — every lead called in 60 seconds",
      "Lead qualification (budget, timeline, scope)",
      "Live hot transfers to your sales team",
      "Appointment setting with full notes",
      "Outbound follow-up until they book or opt out",
      "Daily lead reports",
      "Weekly call performance reviews",
      "White-glove account management",
    ],
  },
];

/* ───── Pricing Card Component ───── */

function PricingCardInner({ tier }: { tier: TierData }) {
  const [expanded, setExpanded] = useState(false);
  const features = expanded ? tier.allFeatures : tier.keyFeatures;

  return (
    <div
      className={`bg-surface border rounded-[20px] p-7 px-6 transition-all duration-400 hover:border-border-hover flex flex-col h-full relative ${
        tier.featured ? "border-accent-border price-card-featured" : "border-border"
      }`}
    >
      {tier.featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-black px-3 py-1 rounded-full text-[10px] font-extrabold tracking-[0.06em] uppercase whitespace-nowrap">
          Most Popular
        </div>
      )}

      {/* Tier label */}
      <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-accent mb-1.5">
        Tier {tier.tier}
      </p>

      {/* Name */}
      <h3 className="text-lg font-extrabold tracking-[-0.5px] mb-2">
        {tier.name}
      </h3>

      {/* Price */}
      <div className="flex items-baseline gap-1.5 mb-0.5">
        <div className="text-3xl font-black tracking-[-1.5px] leading-none">
          <span className="text-base font-semibold align-super mr-0.5">$</span>
          {tier.price}
        </div>
        <span className="text-[12px] text-text-dim">/mo</span>
      </div>
      <p className="text-[11px] text-text-dim mb-4">{tier.setup}</p>

      {/* Description */}
      <p className="text-[12.5px] text-text-dim leading-[1.5] mb-5">
        {tier.tagline}
      </p>

      {/* CTA */}
      <Link
        href="/contact"
        className={`block w-full py-3 rounded-full text-[13px] font-bold text-center no-underline transition-all duration-300 mb-5 ${
          tier.ctaStyle === "primary"
            ? "bg-accent text-black hover:shadow-[0_0_32px_rgba(74,222,128,0.3)] hover:-translate-y-px"
            : "bg-white-6 text-text hover:bg-white-10 hover:-translate-y-px"
        }`}
      >
        {tier.cta}
      </Link>

      {/* Divider */}
      <div className="h-px bg-border mb-4" />

      {/* Features */}
      <ul className="price-features list-none flex flex-col gap-2 mb-4 flex-1">
        {features.map((f, i) => (
          <li
            key={i}
            className="text-[12px] text-text-mid flex items-start gap-2 leading-[1.4]"
          >
            <span className="text-accent mt-0.5 shrink-0">&#10003;</span>
            {f}
          </li>
        ))}
      </ul>

      {/* Toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-center gap-1.5 text-[12px] font-semibold text-accent hover:text-text transition-colors w-full pt-2 border-t border-border"
      >
        {expanded ? "Show less" : "Show all features"}
        <ChevronDown open={expanded} />
      </button>
    </div>
  );
}

/* ───── Page ───── */

export default function PackagesPage() {
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <>
      {/* HERO */}
      <section className="packages-hero-bg pt-[140px] pb-20 text-center relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">Packages</p>
          </RevealOnScroll>
          <RevealOnScroll>
            <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
              One system. Five levels.<br />
              Start where you are. <span className="text-accent">Scale when ready.</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll>
            <p className="text-[17px] text-text-dim leading-[1.7] max-w-[560px] mx-auto mb-8">
              Every tier delivers results that make the next one a no-brainer. No contracts. No hidden fees. The system is yours to keep.
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <button
              onClick={() => setQuizOpen(true)}
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-accent border border-accent-border rounded-full px-6 py-2.5 transition-all duration-300 hover:bg-accent-dim hover:-translate-y-px"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              Not sure which tier? Take the quiz
            </button>
          </RevealOnScroll>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section className="pt-10 pb-20">
        <div className="max-w-[1400px] mx-auto px-6 max-md:px-5">
          <div className="grid grid-cols-5 gap-4 items-start max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:max-w-[440px] max-md:mx-auto">
            {TIERS.map((tier) => (
              <RevealOnScroll key={tier.tier}>
                <PricingCardInner tier={tier} />
              </RevealOnScroll>
            ))}
          </div>

          {/* No contracts note */}
          <RevealOnScroll>
            <p className="text-center text-[13px] text-text-dim mt-8">
              All packages are month-to-month. No long-term contracts. Cancel anytime.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-20 border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 max-md:px-5">
          <RevealOnScroll>
            <div className="text-center">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">Compare tiers</p>
              <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
                Everything at a glance.
              </h2>
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <ComparisonTable />
          </RevealOnScroll>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-40 text-center relative overflow-hidden border-t border-border">
        <div className="cta-glow" />
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 relative z-2">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">Still not sure?</p>
          </RevealOnScroll>
          <RevealOnScroll>
            <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
              Let&apos;s find the right<br />fit <span className="text-accent">together.</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll>
            <p className="text-[17px] text-text-dim leading-[1.7] max-w-[540px] mx-auto mb-8">
              Book a free discovery call and we&apos;ll give you an honest recommendation based on your business, goals, and budget — even if it&apos;s not us.
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/contact"
                className="btn-primary-hover inline-flex items-center gap-2.5 bg-accent text-black px-9 py-4 rounded-full text-[15px] font-bold no-underline transition-all duration-300 tracking-[-0.01em]"
              >
                Book a Free Discovery Call
                <ArrowIcon />
              </Link>
              <button
                onClick={() => setQuizOpen(true)}
                className="inline-flex items-center gap-2 text-[14px] font-semibold text-text-dim border border-border rounded-full px-7 py-3.5 transition-all duration-300 hover:border-accent-border hover:text-accent hover:-translate-y-px"
              >
                Take the Quiz Instead
              </button>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* QUIZ MODAL */}
      {quizOpen && <TierQuiz onClose={() => setQuizOpen(false)} />}
    </>
  );
}
