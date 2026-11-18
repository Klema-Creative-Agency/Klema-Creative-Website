"use client";

import RevealOnScroll from "@/app/components/RevealOnScroll";
import { HOW_IT_WORKS_STEPS } from "../data/funnel-content";

const STEP_ICONS: Record<string, React.ReactNode> = {
  ads: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 3l-4 4-4-4" />
    </svg>
  ),
  ai: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  close: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
};

export default function HowItWorks() {
  return (
    <section className="py-20 max-md:py-14 border-t border-border">
      <div className="max-w-[800px] mx-auto px-8 max-md:px-5">
        <RevealOnScroll>
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4 text-center">
            How It Works
          </p>
          <h2 className="text-[clamp(22px,5vw,36px)] font-extrabold leading-[1.15] tracking-[-1px] mb-12 text-center">
            Three Steps to a Full Calendar
          </h2>
        </RevealOnScroll>

        <div className="space-y-8">
          {HOW_IT_WORKS_STEPS.map((step, i) => (
            <RevealOnScroll key={i}>
              <div className="flex gap-5 items-start">
                {/* Step number + icon */}
                <div className="shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-surface border border-border flex items-center justify-center relative">
                    {STEP_ICONS[step.icon]}
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent text-black text-[11px] font-bold flex items-center justify-center">
                      {step.number}
                    </span>
                  </div>
                  {/* Connector line */}
                  {i < HOW_IT_WORKS_STEPS.length - 1 && (
                    <div className="w-px h-8 bg-border mx-auto mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="pt-1">
                  <h3 className="text-[18px] font-bold mb-1.5">{step.title}</h3>
                  <p className="text-[14px] text-text-dim leading-[1.7]">
                    {step.description}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
