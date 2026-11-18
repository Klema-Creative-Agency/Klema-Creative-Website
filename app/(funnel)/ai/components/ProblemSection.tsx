"use client";

import RevealOnScroll from "@/app/components/RevealOnScroll";
import type { FunnelNiche } from "../data/funnel-content";

export default function ProblemSection({ niche }: { niche: FunnelNiche }) {
  return (
    <section className="py-20 max-md:py-14 border-t border-border">
      <div className="max-w-[800px] mx-auto px-8 max-md:px-5">
        <RevealOnScroll>
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-red mb-4">
            The Problem
          </p>
          <h2 className="text-[clamp(22px,5vw,36px)] font-extrabold leading-[1.15] tracking-[-1px] mb-4">
            Speed Wins. Slow Follow-Up Costs You Thousands.
          </h2>
          <p className="text-[16px] text-text-dim leading-[1.7] mb-10 max-md:text-[15px]">
            Every minute you wait to respond to a lead, your chances of booking
            that job drop dramatically. Here is what the data says:
          </p>
        </RevealOnScroll>

        {/* Lead Decay Visual */}
        <RevealOnScroll>
          <div className="space-y-4 mb-12">
            {[
              { time: "Under 1 min", pct: 95, label: "95% contact rate" },
              { time: "5 minutes", pct: 50, label: "50% contact rate" },
              { time: "30 minutes", pct: 20, label: "20% contact rate" },
              { time: "1 hour+", pct: 5, label: "5% contact rate" },
            ].map((row) => (
              <div key={row.time}>
                <div className="flex justify-between text-[13px] mb-1.5">
                  <span className="text-text-mid font-medium">{row.time}</span>
                  <span className="text-text-dim">{row.label}</span>
                </div>
                <div className="h-2 bg-surface rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${row.pct}%`,
                      background:
                        row.pct > 70
                          ? "#4ade80"
                          : row.pct > 30
                            ? "#fbbf24"
                            : "#f87171",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* Pain Points */}
        <div className="space-y-4">
          {niche.painPoints.map((point, i) => (
            <RevealOnScroll key={i}>
              <div className="flex items-start gap-3 bg-surface border border-border rounded-xl p-4">
                <div className="w-5 h-5 rounded-full bg-[rgba(248,113,113,0.12)] border border-[rgba(248,113,113,0.2)] flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-red"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
                <p className="text-[14px] text-text-mid leading-[1.6]">
                  {point}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
