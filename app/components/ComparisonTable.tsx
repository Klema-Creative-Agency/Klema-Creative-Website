"use client";

import { useState } from "react";
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
  return <span className="text-text-mid text-[12px]">{val}</span>;
}

/* ───── Mobile Feature Card ───── */

function MobileFeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="bg-white-6 rounded-xl p-4">
      <p className="text-[13px] font-semibold text-text mb-3">{feature.name}</p>
      <div className="grid grid-cols-5 gap-2">
        {TIERS.map((tier, i) => (
          <div key={i} className="text-center">
            <p className="text-[9px] text-text-dim mb-1 truncate">{tier.name}</p>
            <div className="text-[13px]">{renderValue(feature.values[i])}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───── Component ───── */

export default function ComparisonTable() {
  // All categories open by default
  const [openCategories, setOpenCategories] = useState<Set<number>>(
    new Set(CATEGORIES.map((_, i) => i))
  );

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

  return (
    <div className="mt-12">
      {/*
        Sticky Tier Header (desktop)
        - Sticks to top: 0 (not 80px) so it covers the full viewport top
        - 80px of opaque padding-top pushes the visible content below the navbar
        - Nothing can scroll through above the header
      */}
      <div
        className="hidden lg:block sticky top-0 z-30"
        style={{ background: "#050505" }}
      >
        {/* Opaque spacer — fills the space behind the navbar so nothing peeks through */}
        <div style={{ height: 110 }} />
        {/* Actual header content */}
        <div
          className="grid grid-cols-[220px_repeat(5,1fr)] border-b border-border"
          style={{ background: "#050505" }}
        >
          <div className="px-4 py-4 text-text-dim font-semibold text-[13px]">Feature</div>
          {TIERS.map((tier, i) => (
            <div
              key={i}
              className="text-center px-3 py-4"
              style={
                i === HIGHLIGHT_COL
                  ? { background: "#08170d" } /* opaque equivalent of rgba(74,222,128,0.05) on #050505 */
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

      {/* ── Category Sections — sticky headers release after their features ── */}
      <div className="flex flex-col">
        {CATEGORIES.map((category, catIdx) => {
          const isOpen = openCategories.has(catIdx);

          return (
            <div key={catIdx} className="mt-3">
              {/* Category header — sticky within its parent div, releases when section ends */}
              <button
                onClick={() => toggleCategory(catIdx)}
                className="w-full flex items-center gap-3 px-6 py-4 border-l-4 border-l-accent border-b border-border transition-colors hover:bg-white-6 sticky z-20"
                style={{ background: "#0d0d0d", top: 206 }}
              >
                <span className="text-[15px] font-bold text-text">{category.name}</span>
                <span className="text-[12px] text-text-dim">
                  {category.features.length} feature{category.features.length !== 1 ? "s" : ""}
                </span>
                <span className="ml-auto text-text-dim">
                  <ChevronDown open={isOpen} />
                </span>
              </button>

              {/* Category body — collapsible accordion */}
              <div className={`category-answer ${isOpen ? "open" : ""}`}>
                <div>
                  {/* Desktop rows */}
                  <div className="hidden lg:block">
                    {category.features.map((feature, fIdx) => (
                      <div
                        key={fIdx}
                        className="grid grid-cols-[220px_repeat(5,1fr)] border-b border-border"
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

                  {/* Mobile stacked cards */}
                  <div className="lg:hidden flex flex-col gap-2 p-4">
                    {category.features.map((feature, fIdx) => (
                      <MobileFeatureCard key={fIdx} feature={feature} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
