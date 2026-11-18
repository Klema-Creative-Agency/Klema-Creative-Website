"use client";

import RevealOnScroll from "@/app/components/RevealOnScroll";
import { VALUE_STACK } from "../data/funnel-content";
import type { FunnelNiche } from "../data/funnel-content";

export default function OfferSection({ niche }: { niche: FunnelNiche }) {
  const totalValue = "$5,500/mo";

  return (
    <section className="py-20 max-md:py-14 border-t border-border relative">
      <div className="pricing-glow-bg" />
      <div className="relative max-w-[700px] mx-auto px-8 max-md:px-5 z-10">
        <RevealOnScroll>
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4 text-center">
            The Offer
          </p>
          <h2 className="text-[clamp(22px,5vw,36px)] font-extrabold leading-[1.15] tracking-[-1px] mb-4 text-center">
            Everything You Need to Fill Your Calendar
          </h2>
          <p className="text-[16px] text-text-dim leading-[1.7] mb-10 text-center max-md:text-[15px]">
            One system. One price. No hidden fees. No long-term contracts.
          </p>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="price-card-featured rounded-xl p-8 max-md:p-6">
            {/* Value stack */}
            <div className="space-y-3 mb-8">
              {VALUE_STACK.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-2 border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-accent-dim border border-accent-border flex items-center justify-center shrink-0">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="text-accent"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-[14px] text-text-mid">
                      {item.item}
                    </span>
                  </div>
                  <span className="text-[14px] text-text-dim line-through">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Price anchor */}
            <div className="text-center border-t border-border pt-6">
              <p className="text-[14px] text-text-dim mb-1">
                Total value:{" "}
                <span className="line-through">{totalValue}</span>
              </p>
              <p className="text-[13px] text-text-dim mb-4">
                Your investment:
              </p>
              <p className="text-[clamp(36px,6vw,52px)] font-extrabold text-accent leading-none">
                $1,497
                <span className="text-[16px] text-text-dim font-normal">
                  /mo
                </span>
              </p>
              <p className="text-[13px] text-text-dim mt-2">
                + ad spend (recommended $1,000-$1,500/mo to Facebook)
              </p>
            </div>

            {/* CTA */}
            <div className="mt-8 text-center">
              <a
                href="#lead-form"
                className="inline-block w-full sm:w-auto bg-accent text-black px-8 py-4 rounded-full font-semibold text-[16px] transition-all duration-300 btn-primary-hover"
              >
                {niche.heroCtaText}
              </a>
              <p className="text-[12px] text-text-dim mt-3">
                Limited spots per market. Book your call today.
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
