"use client";

import RevealOnScroll from "@/app/components/RevealOnScroll";
import type { FunnelNiche } from "../data/funnel-content";

export default function FinalCTA({ niche }: { niche: FunnelNiche }) {
  return (
    <section className="py-20 max-md:py-14 border-t border-border relative">
      <div className="cta-glow" />
      <div className="relative max-w-[600px] mx-auto px-8 max-md:px-5 text-center z-10">
        <RevealOnScroll>
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
            Limited Availability
          </p>
          <h2 className="text-[clamp(22px,5vw,36px)] font-extrabold leading-[1.15] tracking-[-1px] mb-4">
            One Business Per Zip Code. That Is It.
          </h2>
          <p className="text-[16px] text-text-dim leading-[1.7] mb-8 max-md:text-[15px]">
            We limit our service to one business per zip code to keep your leads
            exclusive. Once your area is taken, it is taken. Check availability
            before your competitor does.
          </p>
          <a
            href="#lead-form"
            className="inline-block bg-accent text-black px-10 py-4 rounded-full font-semibold text-[17px] transition-all duration-300 btn-primary-hover"
          >
            {niche.heroCtaText}
          </a>
          <p className="text-[13px] text-text-dim mt-3">
            Free strategy call. Takes 2 minutes to apply.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
