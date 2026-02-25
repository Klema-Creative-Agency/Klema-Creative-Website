"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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

/* ───── Scroll Arrow Button ───── */

function ScrollArrow({
  direction,
  onClick,
  visible,
}: {
  direction: "left" | "right";
  onClick: () => void;
  visible: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`absolute top-0 bottom-0 z-20 w-[72px] hidden md:flex items-center transition-all duration-300 ${
        direction === "left" ? "left-0 justify-start pl-3" : "right-0 justify-end pr-3"
      } ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      aria-label={`Scroll ${direction}`}
    >
      <div className="w-11 h-11 rounded-full bg-surface/90 backdrop-blur-sm border border-border flex items-center justify-center transition-all duration-300 hover:border-accent-border hover:text-accent hover:bg-surface hover:scale-110 shadow-lg shadow-black/30">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          {direction === "left" ? (
            <polyline points="15 18 9 12 15 6" />
          ) : (
            <polyline points="9 6 15 12 9 18" />
          )}
        </svg>
      </div>
    </button>
  );
}

/* ───── Dot indicators ───── */

function ScrollDots({ total, activeIndex }: { total: number; activeIndex: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i === activeIndex
              ? "w-6 h-2 bg-accent"
              : "w-2 h-2 bg-white-15"
          }`}
        />
      ))}
    </div>
  );
}

/* ───── Tier Data ───── */

interface TierData {
  tier: number;
  name: string;
  slug: string;
  price: string;
  setup: string;
  setupTooltip: string;
  tagline: string;
  bestFor: string;
  featured: boolean;
  cta: string;
  ctaStyle: "primary" | "secondary";
  includesPrevious?: string;
  keyFeatures: string[];
  allFeatures: string[];
}

const TIERS: TierData[] = [
  {
    tier: 1,
    name: "Ignition",
    slug: "ai-lead-engine",
    price: "997",
    setup: "$2,500 setup",
    setupTooltip: "Covers your custom funnel build, CRM configuration, SMS & email sequence setup, and call trigger activation.",
    tagline: "Stop losing the leads you already get.",
    bestFor: "Businesses getting leads but losing them to slow follow-up or no system at all.",
    featured: false,
    cta: "See How It Works",
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
    slug: "foundation",
    price: "1,997",
    setup: "$2,500 setup",
    setupTooltip: "Covers everything in Ignition setup, plus a full SEO audit, Google Business Profile optimization, reputation engine activation, and schema markup.",
    tagline: "Convert more leads and get found by new ones.",
    bestFor: "Businesses ready to grow lead volume organically and build a 5-star reputation.",
    featured: false,
    cta: "See What's Included",
    ctaStyle: "secondary",
    includesPrevious: "Everything in Ignition",
    keyFeatures: [
      "Search engine optimization (SEO)",
      "Google Business Profile management",
      "Reputation engine — automated reviews",
      "AI visibility — schema markup & structured data",
    ],
    allFeatures: [
      "Search engine optimization (SEO)",
      "Google Business Profile management",
      "Reputation engine — automated review requests",
      "AI visibility — schema markup & structured data",
      "Local visibility tracking & reporting",
      "Monthly SEO + conversion report",
    ],
  },
  {
    tier: 3,
    name: "Accelerator",
    slug: "accelerator",
    price: "3,997",
    setup: "$5,000 setup",
    setupTooltip: "Covers a custom website design and build, ad account setup, branded dashboard, plus the full Foundation setup underneath.",
    tagline: "Look like the biggest company in your market.",
    bestFor: "Growing businesses ready for a professional website, paid ads, and full online presence.",
    featured: true,
    cta: "See What's Included",
    ctaStyle: "primary",
    includesPrevious: "Everything in Foundation",
    keyFeatures: [
      "Custom high-performance website",
      "Paid ad management (Google & Meta)",
      "Branded reporting dashboard",
      "Content planning & strategy",
    ],
    allFeatures: [
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
    slug: "authority",
    price: "7,500",
    setup: "$7,500 setup",
    setupTooltip: "Covers everything in Accelerator setup, plus content strategy and calendar, social media setup, email marketing configuration, and competitor analysis.",
    tagline: "We run your marketing. You run your business.",
    bestFor: "Established businesses that want a full marketing department without the overhead.",
    featured: false,
    cta: "See What's Included",
    ctaStyle: "secondary",
    includesPrevious: "Everything in Accelerator",
    keyFeatures: [
      "Content & social media (2 platforms)",
      "Email marketing campaigns",
      "Full marketing management",
      "Bi-weekly strategy calls",
    ],
    allFeatures: [
      "4–6 SEO-optimized blog articles per month",
      "Social media management (2 platforms, 16–20 posts/mo)",
      "Email marketing campaigns",
      "Full AI visibility — content optimized for AI citations",
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
    slug: "dominator",
    price: "12,000",
    setup: "$10,000 setup",
    setupTooltip: "Covers recruitment, training, and equipping your dedicated lead team — headsets, voice tools, call scripts, qualification frameworks, and full CRM integration.",
    tagline: "Your phone only rings when someone is ready to book.",
    bestFor: "Businesses that want to own their market. You close — we do everything else.",
    featured: false,
    cta: "See What's Included",
    ctaStyle: "secondary",
    includesPrevious: "Everything in Authority",
    keyFeatures: [
      "Dedicated lead team (60-sec response)",
      "Live hot transfers to your team",
      "Appointment setting & outbound follow-up",
      "Daily lead reports",
    ],
    allFeatures: [
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
      className={`bg-surface border rounded-[24px] p-9 px-8 transition-all duration-400 hover:border-border-hover flex flex-col min-h-[620px] relative ${
        tier.featured ? "border-accent-border price-card-featured" : "border-border"
      }`}
    >
      {tier.featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-black px-3 py-1 rounded-full text-[11px] font-extrabold tracking-[0.06em] uppercase whitespace-nowrap">
          Most Popular
        </div>
      )}

      {/* Tier label */}
      <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-accent mb-1.5">
        Tier {tier.tier}
      </p>

      {/* Name */}
      <h3 className="text-2xl font-extrabold tracking-[-0.5px] mb-2">
        {tier.name}
      </h3>

      {/* Price */}
      <div className="flex items-baseline gap-1.5 mb-5">
        <div className="text-5xl font-black tracking-[-1.5px] leading-none">
          <span className="text-xl font-semibold align-super mr-0.5">$</span>
          {tier.price}
        </div>
        <span className="text-sm text-text-dim">/mo</span>
      </div>
      <div className="group/setup relative inline-flex items-center gap-1 mb-4">
        <p className="text-[13px] text-text-dim">{tier.setup}</p>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2"
             className="text-text-dim/50 cursor-help">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
        <div className="absolute bottom-full left-0 mb-2 w-56 bg-[#1a1a1a] border border-border rounded-xl p-3 text-[11px] text-text-mid leading-[1.5] opacity-0 pointer-events-none group-hover/setup:opacity-100 group-hover/setup:pointer-events-auto transition-opacity duration-200 z-10 shadow-xl">
          {tier.setupTooltip}
        </div>
      </div>

      {/* Description */}
      <p className="text-[15px] text-text-dim leading-[1.5] mb-5">
        {tier.tagline}
      </p>

      {/* CTA */}
      <Link
        href={`/services/${tier.slug}`}
        className={`block w-full py-3.5 rounded-full text-[15px] font-bold text-center no-underline transition-all duration-300 mb-5 ${
          tier.ctaStyle === "primary"
            ? "bg-accent text-black hover:shadow-[0_0_32px_rgba(74,222,128,0.3)] hover:-translate-y-px"
            : "bg-white-6 text-text hover:bg-white-10 hover:-translate-y-px"
        }`}
      >
        {tier.cta}
      </Link>

      {/* Includes previous tier */}
      {tier.includesPrevious && (
        <p className="text-[14px] font-bold text-text flex items-center gap-1.5 mb-3">
          <span className="text-accent text-sm">+</span>
          {tier.includesPrevious}
        </p>
      )}

      {/* Divider */}
      <div className="h-px bg-border mb-4" />

      {/* Features */}
      <ul className="price-features list-none flex flex-col gap-3 mb-4 flex-1">
        {features.map((f, i) => (
          <li
            key={i}
            className="text-[14px] text-text-mid flex items-start gap-2.5 leading-[1.4]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-accent shrink-0 mt-[1px]">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      {/* Toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-center gap-1.5 text-[13px] font-semibold text-accent hover:text-text transition-colors w-full pt-2 border-t border-border"
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(2); // Accelerator default

  const CARD_WIDTH = 380;
  const GAP = 28; // gap-7
  const SCROLL_AMOUNT = CARD_WIDTH + GAP;

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    // Figure out which card is centered
    const center = el.scrollLeft + el.clientWidth / 2;
    const idx = Math.round((center - CARD_WIDTH / 2) / SCROLL_AMOUNT);
    setActiveIndex(Math.max(0, Math.min(4, idx)));
  }, []);

  const scrollToLeft = () => {
    scrollRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
  };

  const scrollToRight = () => {
    scrollRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
  };

  // Center on Foundation (index 1) so Ignition is visible on the left
  // and Accelerator (featured) is prominent on the right
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const centerIndex = 1; // Foundation
    const cardCenter = centerIndex * SCROLL_AMOUNT + CARD_WIDTH / 2;
    const scrollTarget = cardCenter - el.clientWidth / 2;
    el.scrollTo({ left: Math.max(0, scrollTarget), behavior: "instant" });
    requestAnimationFrame(updateScrollState);
  }, [updateScrollState]);

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

      {/* PRICING CARDS — Horizontal Scroll Gallery */}
      <section className="pt-10 pb-20">
        <RevealOnScroll>
          {/* Full-width relative wrapper for arrows */}
          <div className="relative max-w-[1400px] mx-auto">
            {/* Green ambient glow behind cards */}
            <div className="pricing-glow-bg" />

            {/* Left arrow */}
            <ScrollArrow direction="left" onClick={scrollToLeft} visible={canScrollLeft} />

            {/* Scroll container — edge fade via CSS mask */}
            <div
              ref={scrollRef}
              onScroll={updateScrollState}
              className="flex gap-7 overflow-x-auto snap-x snap-mandatory scrollbar-hide pt-8 pb-6 pricing-scroll-mask"
              style={{ paddingLeft: "calc((100% - 3 * 380px - 2 * 28px) / 2)", paddingRight: "calc((100% - 3 * 380px - 2 * 28px) / 2)" }}
            >
              {TIERS.map((tier) => (
                <div
                  key={tier.tier}
                  className={`snap-center shrink-0 w-[380px] max-md:w-[320px] transition-transform duration-300 ${
                    tier.featured ? "scale-[1.03] z-10" : ""
                  }`}
                >
                  <PricingCardInner tier={tier} />
                </div>
              ))}
            </div>

            {/* Right arrow */}
            <ScrollArrow direction="right" onClick={scrollToRight} visible={canScrollRight} />
          </div>

          {/* Dot indicators */}
          <ScrollDots total={TIERS.length} activeIndex={activeIndex} />
        </RevealOnScroll>

        {/* No contracts note */}
        <RevealOnScroll>
          <p className="text-center text-[13px] text-text-dim mt-4">
            All packages are month-to-month. No long-term contracts. Cancel anytime.
          </p>
        </RevealOnScroll>
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
