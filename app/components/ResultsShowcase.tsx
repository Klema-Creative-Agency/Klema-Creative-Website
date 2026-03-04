"use client";

import RevealOnScroll from "./RevealOnScroll";

const results = [
  {
    industry: "Roofing",
    metric: "+340%",
    metricLabel: "leads in 90 days",
    description:
      "Went from 3 leads/month to 15+ with a full SEO + paid ads engine. Now the top-ranked roofer in their city.",
  },
  {
    industry: "Dental",
    metric: "52",
    metricLabel: "new patients/month",
    description:
      "Custom funnel + Google Ads + speed-to-lead follow-up turned a quiet practice into a 6-month waitlist.",
  },
  {
    industry: "HVAC",
    metric: "$47K",
    metricLabel: "revenue in month 2",
    description:
      "From zero online presence to a booked-out schedule. CRM automation cut their follow-up time by 90%.",
  },
  {
    industry: "Plumbing",
    metric: "4.9★",
    metricLabel: "Google rating (127 reviews)",
    description:
      "Reputation engine turned happy customers into public proof. Review volume tripled in 60 days.",
  },
  {
    industry: "Tree Service",
    metric: "8x",
    metricLabel: "return on ad spend",
    description:
      "Targeted local ads + conversion-optimized landing page. Every $1 spent brought back $8 in booked jobs.",
  },
];

export default function ResultsShowcase() {
  return (
    <section className="border-t border-border py-30 max-md:py-20">
      <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
        <div className="text-center mb-12">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
              Proof
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
              Results That Speak
              <br />
              <span className="text-accent">for Themselves.</span>
            </h2>
          </RevealOnScroll>
        </div>

        <RevealOnScroll>
          <div className="relative">
            {/* Gradient edge masks */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-12 z-10 max-md:w-6"
              style={{
                background:
                  "linear-gradient(to right, var(--color-bg), transparent)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-12 z-10 max-md:w-6"
              style={{
                background:
                  "linear-gradient(to left, var(--color-bg), transparent)",
              }}
            />

            {/* Scrollable row */}
            <div
              className="flex gap-4 overflow-x-auto pb-4 px-1"
              style={{
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
              }}
            >
              {results.map((r, i) => (
                <div
                  key={i}
                  className="accent-top-hover flex-shrink-0 w-[300px] max-md:w-[260px] bg-surface border border-border rounded-2xl p-8 transition-[background] duration-400 hover:bg-[#121212]"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-accent mb-4">
                    {r.industry}
                  </p>
                  <div
                    className="text-[40px] font-black tracking-[-2px] leading-none mb-1"
                    style={{
                      background:
                        "linear-gradient(to bottom, #4ade80 0%, rgba(74,222,128,0.15) 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {r.metric}
                  </div>
                  <p className="text-[13px] text-text-dim mb-4">
                    {r.metricLabel}
                  </p>
                  <p className="text-[13.5px] text-text-dim leading-[1.7]">
                    {r.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
