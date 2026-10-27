"use client";

import type { FunnelNiche } from "../data/funnel-content";
import { TRUST_STATS } from "../data/funnel-content";

export default function FunnelHero({ niche }: { niche: FunnelNiche }) {
  return (
    <section
      className="relative pt-20 pb-16 max-md:pt-14 max-md:pb-10 overflow-hidden"
      data-funnel-stage="1"
      data-stage-name="hero"
    >
      {/* Glow */}
      <div className="hero-glow hero-glow-breathe" />

      <div className="relative max-w-[800px] mx-auto px-8 max-md:px-5 text-center z-10">
        <h1 className="text-[clamp(26px,7vw,48px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-5">
          {niche.painHeadline}
        </h1>
        <p className="text-[17px] text-text-dim leading-[1.7] max-w-[600px] mx-auto mb-10 max-md:text-[15px]">
          {niche.painSubheadline}
        </p>

        <a
          href="#lead-form"
          className="inline-block bg-accent text-black px-8 py-4 rounded-full font-semibold text-[16px] transition-all duration-300 btn-primary-hover"
        >
          {niche.heroCtaText}
        </a>
        <p className="text-[13px] text-text-dim mt-3">
          Free strategy call. No obligation. No contracts.
        </p>

        {/* Trust micro-bar */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-[640px] mx-auto">
          {TRUST_STATS.map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-[24px] font-bold text-accent">{s.stat}</p>
              <p className="text-[12px] text-text-dim leading-[1.4] mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
