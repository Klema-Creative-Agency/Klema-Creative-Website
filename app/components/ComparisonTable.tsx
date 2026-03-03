"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";

/* ───── Chevron Icon ───── */

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

/* ───── Tier Headers ───── */

const TIERS = [
  { name: "Ignition", price: "$997", slug: "ai-lead-engine" },
  { name: "Foundation", price: "$1,997", slug: "foundation" },
  { name: "Accelerator", price: "$3,997", slug: "accelerator" },
  { name: "Authority", price: "$7,500", slug: "authority" },
  { name: "Dominator", price: "$12,000", slug: "dominator" },
];

const HIGHLIGHT_COL = 2; // Accelerator

/* ───── Category Data ───── */

interface Feature {
  name: string;
  values: string[]; // 5 values, one per tier
}

interface Category {
  name: string;
  features: Feature[];
}

const CATEGORIES: Category[] = [
  {
    name: "Lead Engine",
    features: [
      { name: "Lead Conversion Funnel", values: ["\u2713", "\u2713", "\u2713", "\u2713", "\u2713"] },
      { name: "60-Second Call Trigger", values: ["\u2713", "\u2713", "\u2713", "\u2713", "\u2713"] },
      { name: "Automated SMS & Email", values: ["\u2713", "\u2713", "\u2713", "\u2713", "\u2713"] },
      { name: "CRM & Lead Pipeline", values: ["\u2713", "\u2713", "\u2713", "\u2713", "\u2713"] },
      { name: "Monthly Funnel Optimization", values: ["\u2713", "\u2713", "\u2713", "\u2713", "\u2713"] },
    ],
  },
  {
    name: "SEO & Visibility",
    features: [
      { name: "SEO & Local Rankings", values: ["\u2014", "\u2713", "\u2713", "\u2713", "\u2713"] },
      { name: "Google Business Profile", values: ["\u2014", "\u2713", "\u2713", "\u2713", "\u2713"] },
      { name: "Reputation Engine", values: ["\u2014", "\u2713", "\u2713", "\u2713", "\u2713"] },
      { name: "AI Visibility (AEO)", values: ["\u2014", "Basic", "Basic", "Full", "Full"] },
    ],
  },
  {
    name: "Website & Ads",
    features: [
      { name: "Custom Website", values: ["\u2014", "\u2014", "\u2713", "\u2713", "\u2713"] },
      { name: "Paid Ad Management", values: ["\u2014", "\u2014", "\u2713", "\u2713", "\u2713"] },
      { name: "Branded Dashboard", values: ["\u2014", "\u2014", "\u2713", "\u2713", "\u2713"] },
    ],
  },
  {
    name: "Marketing",
    features: [
      { name: "Blog Articles/Month", values: ["\u2014", "\u2014", "\u2014", "4\u20136", "6\u20138"] },
      { name: "Social Media", values: ["\u2014", "\u2014", "\u2014", "2 Platforms", "3 Platforms"] },
      { name: "Email Campaigns", values: ["\u2014", "\u2014", "\u2014", "\u2713", "\u2713"] },
      { name: "Competitor Monitoring", values: ["\u2014", "\u2014", "\u2014", "\u2713", "\u2713"] },
      { name: "A/B Testing", values: ["\u2014", "\u2014", "\u2014", "\u2713", "\u2713"] },
    ],
  },
  {
    name: "Lead Team & Support",
    features: [
      { name: "Dedicated Lead Team", values: ["\u2014", "\u2014", "\u2014", "\u2014", "\u2713"] },
      { name: "Lead Qualification Calls", values: ["\u2014", "\u2014", "\u2014", "\u2014", "\u2713"] },
      { name: "Live Hot Transfers", values: ["\u2014", "\u2014", "\u2014", "\u2014", "\u2713"] },
      { name: "Appointment Setting", values: ["\u2014", "\u2014", "\u2014", "\u2014", "\u2713"] },
      { name: "Strategy Calls", values: ["Monthly", "Monthly", "Monthly", "Bi-weekly", "Weekly"] },
      { name: "Business Reviews", values: ["\u2014", "\u2014", "\u2014", "Quarterly", "Quarterly"] },
    ],
  },
];

/* ───── Value Renderer ───── */

function renderValue(val: string) {
  if (val === "\u2713")
    return <span className="text-accent font-bold">{val}</span>;
  if (val === "\u2014")
    return <span className="text-white-15">{val}</span>;
  return <span className="text-text-mid text-[12px] max-lg:text-[10px]">{val}</span>;
}

/* ───── Mobile Value Renderer (larger sizes) ───── */

function renderMobileValue(val: string) {
  if (val === "\u2713")
    return <span className="text-accent font-bold text-[14px]">{val}</span>;
  if (val === "\u2014")
    return <span className="text-white-15 text-[14px]">{val}</span>;
  return <span className="text-text-mid text-[13px]">{val}</span>;
}

/* ───── Component ───── */

export default function ComparisonTable() {
  // All categories open by default
  const [openCategories, setOpenCategories] = useState<Set<number>>(
    new Set(CATEGORIES.map((_, i) => i))
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mobile swipeable cards state
  const cardScrollRef = useRef<HTMLDivElement>(null);
  const pillRowRef = useRef<HTMLDivElement>(null);
  const [activeTier, setActiveTier] = useState(HIGHLIGHT_COL);

  const scrollPillIntoView = useCallback((index: number) => {
    const row = pillRowRef.current;
    if (!row) return;
    const pill = row.children[index] as HTMLElement | undefined;
    if (!pill) return;
    const pillCenter = pill.offsetLeft + pill.offsetWidth / 2;
    const rowCenter = row.clientWidth / 2;
    row.scrollTo({ left: pillCenter - rowCenter, behavior: "smooth" });
  }, []);

  const updateActiveTier = useCallback(() => {
    const el = cardScrollRef.current;
    if (!el) return;
    const cardWidth = el.clientWidth;
    const idx = Math.round(el.scrollLeft / cardWidth);
    const clamped = Math.max(0, Math.min(TIERS.length - 1, idx));
    setActiveTier(clamped);
    scrollPillIntoView(clamped);
  }, [scrollPillIntoView]);

  const scrollToTier = (index: number) => {
    const el = cardScrollRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
  };

  function toggleCategory(index: number) {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  // Scroll to Accelerator on mobile mount
  useEffect(() => {
    const el = cardScrollRef.current;
    if (!el || window.innerWidth >= 1024) return;
    requestAnimationFrame(() => {
      el.scrollTo({ left: HIGHLIGHT_COL * el.clientWidth, behavior: "instant" });
      scrollPillIntoView(HIGHLIGHT_COL);
    });
  }, [scrollPillIntoView]);

  /* Grid classes: desktop uses fr units */
  const gridCols = "grid-cols-[220px_repeat(5,1fr)]";

  return (
    <div className="mt-12">
      {/* ══════ DESKTOP TABLE (hidden on mobile) ══════ */}
      <div className="hidden lg:block">
        <div
          ref={scrollRef}
          className="comparison-scroll-mask"
        >
          <div>
            {/* Sticky Tier Header */}
            <div
              className="sticky top-0 z-30"
              style={{ background: "#050505" }}
            >
              {/* Opaque spacer — fills the space behind the navbar */}
              <div style={{ height: 110 }} />
              {/* Actual header content */}
              <div
                className={`grid ${gridCols} border-b border-border`}
                style={{ background: "#050505" }}
              >
                <div className="px-4 py-4 text-text-dim font-semibold text-[13px]">Feature</div>
                {TIERS.map((tier, i) => (
                  <div
                    key={i}
                    className="text-center px-3 py-4"
                    style={
                      i === HIGHLIGHT_COL
                        ? { background: "#08170d" }
                        : undefined
                    }
                  >
                    <p className={`font-bold text-[13px] ${i === HIGHLIGHT_COL ? "text-accent" : "text-text"}`}>
                      {tier.name}
                    </p>
                    <p className="text-text-dim font-medium text-[11px]">{tier.price}/mo</p>
                    <Link
                      href={`/services/${tier.slug}`}
                      className={`inline-block mt-2 px-4 py-1.5 rounded-full text-[11px] font-bold no-underline transition-all duration-300 ${
                        i === HIGHLIGHT_COL
                          ? "bg-accent text-black hover:shadow-[0_0_20px_rgba(74,222,128,0.3)]"
                          : "bg-white-6 text-text hover:bg-white-10"
                      }`}
                    >
                      Get Started
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Category Sections ── */}
            <div className="flex flex-col">
              {CATEGORIES.map((category, catIdx) => {
                const isOpen = openCategories.has(catIdx);

                return (
                  <div key={catIdx} className="mt-3">
                    {/* Category header */}
                    <button
                      onClick={() => toggleCategory(catIdx)}
                      className="w-full flex items-center gap-3 px-6 py-4 border-l-4 border-l-accent border-b border-border transition-colors hover:bg-white-6 sticky z-20"
                      style={{ background: "#0d0d0d", top: 206 }}
                    >
                      <span className="text-[15px] font-bold text-text whitespace-nowrap">{category.name}</span>
                      <span className="text-[12px] text-text-dim whitespace-nowrap">
                        {category.features.length} feature{category.features.length !== 1 ? "s" : ""}
                      </span>
                      <span className="ml-auto text-text-dim">
                        <ChevronDown open={isOpen} />
                      </span>
                    </button>

                    {/* Category body — collapsible accordion */}
                    <div className={`category-answer ${isOpen ? "open" : ""}`}>
                      <div>
                        {category.features.map((feature, fIdx) => (
                          <div
                            key={fIdx}
                            className={`grid ${gridCols} border-b border-border`}
                            style={{ background: fIdx % 2 === 0 ? "#0d0d0d" : "#050505" }}
                          >
                            <div className="px-6 py-3 text-[13px] text-text-mid">{feature.name}</div>
                            {feature.values.map((val, vIdx) => (
                              <div
                                key={vIdx}
                                className="px-3 py-3 text-center text-[13px]"
                                style={
                                  vIdx === HIGHLIGHT_COL
                                    ? { background: fIdx % 2 === 0 ? "#101d14" : "#08170d" }
                                    : undefined
                                }
                              >
                                {renderValue(val)}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ══════ MOBILE SWIPEABLE CARDS (hidden on desktop) ══════ */}
      <div className="lg:hidden">
        {/* Tier selector pills */}
        <div ref={pillRowRef} className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4">
          {TIERS.map((tier, i) => (
            <button
              key={i}
              onClick={() => scrollToTier(i)}
              className={`shrink-0 px-4 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-300 ${
                i === activeTier
                  ? i === HIGHLIGHT_COL
                    ? "bg-accent text-black"
                    : "bg-white-10 text-text"
                  : "bg-white-6 text-text-dim"
              }`}
            >
              {tier.name}
              <span className="ml-1.5 text-[11px] opacity-70">{tier.price}</span>
            </button>
          ))}
        </div>

        {/* Swipeable card container */}
        <div
          ref={cardScrollRef}
          onScroll={updateActiveTier}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4"
        >
          {TIERS.map((tier, tierIdx) => (
            <div
              key={tierIdx}
              className="w-full shrink-0 snap-center px-4"
            >
              {/* Card */}
              <div
                className={`rounded-2xl border p-5 ${
                  tierIdx === HIGHLIGHT_COL
                    ? "border-accent-border bg-[linear-gradient(180deg,rgba(74,222,128,0.06)_0%,#0d0d0d_100%)]"
                    : "border-border bg-surface"
                }`}
              >
                {/* Card header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className={`text-[18px] font-bold ${tierIdx === HIGHLIGHT_COL ? "text-accent" : "text-text"}`}>
                      {tier.name}
                    </h3>
                    <p className="text-[14px] text-text-dim font-medium">{tier.price}/mo</p>
                  </div>
                  <Link
                    href={`/services/${tier.slug}`}
                    className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[13px] font-bold no-underline transition-all duration-300 ${
                      tierIdx === HIGHLIGHT_COL
                        ? "bg-accent text-black hover:shadow-[0_0_20px_rgba(74,222,128,0.3)]"
                        : "bg-white-6 text-text hover:bg-white-10"
                    }`}
                  >
                    Get Started
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                {/* Divider */}
                <div className="h-px bg-border mb-3" />

                {/* Category accordions */}
                {CATEGORIES.map((category, catIdx) => {
                  const isOpen = openCategories.has(catIdx);

                  return (
                    <div key={catIdx} className="mb-1">
                      {/* Category header */}
                      <button
                        onClick={() => toggleCategory(catIdx)}
                        className="w-full flex items-center gap-2 py-3 border-l-3 border-l-accent pl-3 transition-colors"
                      >
                        <span className="text-[14px] font-bold text-text">{category.name}</span>
                        <span className="text-[11px] text-text-dim">
                          ({category.features.length})
                        </span>
                        <span className="ml-auto text-text-dim">
                          <ChevronDown open={isOpen} />
                        </span>
                      </button>

                      {/* Features list */}
                      <div className={`category-answer ${isOpen ? "open" : ""}`}>
                        <div className="pb-2">
                          {category.features.map((feature, fIdx) => (
                            <div
                              key={fIdx}
                              className="flex items-center justify-between py-2 pl-4 pr-1"
                              style={{ background: fIdx % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent" }}
                            >
                              <span className="text-[13px] text-text-mid">{feature.name}</span>
                              <span className="shrink-0 ml-3">
                                {renderMobileValue(feature.values[tierIdx])}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-5">
          {TIERS.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToTier(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeTier
                  ? "w-6 h-2 bg-accent"
                  : "w-2 h-2 bg-white-15"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
