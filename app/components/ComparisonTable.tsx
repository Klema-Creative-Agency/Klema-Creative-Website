"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";

/* ───── Exported Types ───── */

export interface ComparisonTier {
  name: string;
  price: string;
  href: string;
}

export interface ComparisonCategory {
  name: string;
  features: { name: string; values: string[] }[];
}

export interface ComparisonTableProps {
  tiers: ComparisonTier[];
  categories: ComparisonCategory[];
  highlightCol?: number;
}

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

/* ───── Value Renderer ───── */

function renderValue(val: string) {
  if (val === "\u2713")
    return <span className="text-accent font-bold">{val}</span>;
  if (val === "-")
    return <span className="text-white-15">{val}</span>;
  return <span className="text-text-mid text-[12px] max-lg:text-[10px]">{val}</span>;
}

/* ───── Mobile Value Renderer (larger sizes) ───── */

function renderMobileValue(val: string) {
  if (val === "\u2713")
    return <span className="text-accent font-bold text-[14px]">{val}</span>;
  if (val === "-")
    return <span className="text-white-15 text-[14px]">{val}</span>;
  return <span className="text-text-mid text-[13px]">{val}</span>;
}

/* ───── CTA Link (Link for internal, <a> for hash) ───── */

function CtaLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

/* ───── Component ───── */

export default function ComparisonTable({
  tiers,
  categories,
  highlightCol = 1,
}: ComparisonTableProps) {
  const highlight = highlightCol;

  // All categories open by default
  const [openCategories, setOpenCategories] = useState<Set<number>>(
    new Set(categories.map((_, i) => i))
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mobile swipeable cards state
  const cardScrollRef = useRef<HTMLDivElement>(null);
  const pillRowRef = useRef<HTMLDivElement>(null);
  const [activeTier, setActiveTier] = useState(highlight);

  const scrollPillIntoView = useCallback((index: number) => {
    const row = pillRowRef.current;
    if (!row) return;
    const pill = row.children[index] as HTMLElement | undefined;
    if (!pill) return;
    const pillCenter = pill.offsetLeft + pill.offsetWidth / 2;
    const rowCenter = row.clientWidth / 2;
    row.scrollTo({ left: pillCenter - rowCenter, behavior: "smooth" });
  }, []);

  const tierCount = tiers.length;

  const updateActiveTier = useCallback(() => {
    const el = cardScrollRef.current;
    if (!el) return;
    const cardWidth = el.clientWidth;
    const idx = Math.round(el.scrollLeft / cardWidth);
    const clamped = Math.max(0, Math.min(tierCount - 1, idx));
    setActiveTier(clamped);
    scrollPillIntoView(clamped);
  }, [scrollPillIntoView, tierCount]);

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

  // Scroll to highlighted tier on mobile mount
  useEffect(() => {
    const el = cardScrollRef.current;
    if (!el || window.innerWidth >= 1024) return;
    requestAnimationFrame(() => {
      el.scrollTo({ left: highlight * el.clientWidth, behavior: "instant" });
      scrollPillIntoView(highlight);
    });
  }, [scrollPillIntoView, highlight]);

  /* Dynamic grid: 220px label column + N equal tier columns */
  const gridStyle = { gridTemplateColumns: `220px repeat(${tierCount}, 1fr)` };

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
              {/* Opaque spacer - fills the space behind the navbar */}
              <div style={{ height: 110 }} />
              {/* Actual header content */}
              <div
                className="grid border-b border-border"
                style={{ ...gridStyle, background: "#050505" }}
              >
                <div className="px-4 py-4 text-text-dim font-semibold text-[13px]">Feature</div>
                {tiers.map((tier, i) => (
                  <div
                    key={i}
                    className="text-center px-3 py-4"
                    style={
                      i === highlight
                        ? { background: "#08170d" }
                        : undefined
                    }
                  >
                    <p className={`font-bold text-[13px] ${i === highlight ? "text-accent" : "text-text"}`}>
                      {tier.name}
                    </p>
                    <p className="text-text-dim font-medium text-[11px]">{tier.price}/mo</p>
                    <CtaLink
                      href={tier.href}
                      className={`inline-block mt-2 px-4 py-1.5 rounded-full text-[11px] font-bold no-underline transition-all duration-300 ${
                        i === highlight
                          ? "bg-accent text-black hover:shadow-[0_0_20px_rgba(74,222,128,0.3)]"
                          : "bg-white-6 text-text hover:bg-white-10"
                      }`}
                    >
                      Get Started
                    </CtaLink>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Category Sections ── */}
            <div className="flex flex-col">
              {categories.map((category, catIdx) => {
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

                    {/* Category body - collapsible accordion */}
                    <div className={`category-answer ${isOpen ? "open" : ""}`}>
                      <div>
                        {category.features.map((feature, fIdx) => (
                          <div
                            key={fIdx}
                            className="grid border-b border-border"
                            style={{ ...gridStyle, background: fIdx % 2 === 0 ? "#0d0d0d" : "#050505" }}
                          >
                            <div className="px-6 py-3 text-[13px] text-text-mid">{feature.name}</div>
                            {feature.values.map((val, vIdx) => (
                              <div
                                key={vIdx}
                                className="px-3 py-3 text-center text-[13px]"
                                style={
                                  vIdx === highlight
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
          {tiers.map((tier, i) => (
            <button
              key={i}
              onClick={() => scrollToTier(i)}
              className={`shrink-0 px-4 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-300 ${
                i === activeTier
                  ? i === highlight
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
          {tiers.map((tier, tierIdx) => (
            <div
              key={tierIdx}
              className="w-full shrink-0 snap-center px-4"
            >
              {/* Card */}
              <div
                className={`rounded-2xl border p-5 ${
                  tierIdx === highlight
                    ? "border-accent-border bg-[linear-gradient(180deg,rgba(74,222,128,0.06)_0%,#0d0d0d_100%)]"
                    : "border-border bg-surface"
                }`}
              >
                {/* Card header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className={`text-[18px] font-bold ${tierIdx === highlight ? "text-accent" : "text-text"}`}>
                      {tier.name}
                    </h3>
                    <p className="text-[14px] text-text-dim font-medium">{tier.price}/mo</p>
                  </div>
                  <CtaLink
                    href={tier.href}
                    className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[13px] font-bold no-underline transition-all duration-300 ${
                      tierIdx === highlight
                        ? "bg-accent text-black hover:shadow-[0_0_20px_rgba(74,222,128,0.3)]"
                        : "bg-white-6 text-text hover:bg-white-10"
                    }`}
                  >
                    Get Started
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </CtaLink>
                </div>

                {/* Divider */}
                <div className="h-px bg-border mb-3" />

                {/* Category accordions */}
                {categories.map((category, catIdx) => {
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
          {tiers.map((_, i) => (
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
