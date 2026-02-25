"use client";

import RevealOnScroll from "@/app/components/RevealOnScroll";

/** Dynamic ROI math section — shows conversion improvement, not CPL comparison */
export default function ROISection({
  serviceName,
  avgJobValue,
  setupFee,
  monthlyFee,
  breakEvenJobs,
  conversionBefore,
  conversionAfter,
  leadsMissed,
}: {
  serviceName: string;
  avgJobValue: number;
  setupFee: number;
  monthlyFee: number;
  breakEvenJobs: number;
  conversionBefore: string;
  conversionAfter: string;
  leadsMissed: number;
}) {
  const yearOneCost = setupFee + monthlyFee * 12;
  const jobsToPayOff = Math.ceil(yearOneCost / avgJobValue);
  const extraRevenuePerMonth = leadsMissed * avgJobValue;
  const niche = serviceName.toLowerCase().replace(" lead engine", "").replace(" patient engine", "");

  return (
    <section className="py-30 max-md:py-20 relative overflow-hidden">
      <div className="cta-glow" />
      <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 relative z-2">
        <RevealOnScroll>
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
            The math
          </p>
          <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
            This system pays for itself<br />
            in <span className="text-accent">{breakEvenJobs} jobs.</span>
          </h2>
          <p className="text-[17px] text-text-dim leading-[1.7] max-w-[540px]">
            You&apos;re already getting leads. The problem is conversion. Here&apos;s what happens when
            you stop losing them.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-3 gap-5 mt-16 max-lg:grid-cols-1 max-lg:max-w-[480px]">
          <RevealOnScroll>
            <div className="bg-surface border border-border rounded-[20px] p-8">
              <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-text-dim mb-5">
                Without a system
              </p>
              <div className="text-3xl font-black tracking-[-1px] text-red mb-2">
                {conversionBefore} close rate
              </div>
              <p className="text-sm text-text-dim leading-[1.6]">
                Slow follow-up, missed calls, no automation. ~{leadsMissed} leads/month lost to competitors who respond faster.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="bg-surface border border-accent-border rounded-[20px] p-8 relative">
              <div className="absolute -top-3 left-6 bg-accent text-black px-3 py-1 rounded-full text-[10px] font-extrabold tracking-[0.06em] uppercase">
                With Our System
              </div>
              <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-text-dim mb-5">
                With funnel + automation
              </p>
              <div className="text-3xl font-black tracking-[-1px] text-accent mb-2">
                {conversionAfter} close rate
              </div>
              <p className="text-sm text-text-dim leading-[1.6]">
                60-second response, automated follow-up, lead nurture sequences. More of your existing leads become booked jobs.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="bg-surface border border-border rounded-[20px] p-8">
              <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-text-dim mb-5">
                Extra revenue potential
              </p>
              <div className="text-3xl font-black tracking-[-1px] mb-2">
                ${extraRevenuePerMonth.toLocaleString()}/mo
              </div>
              <p className="text-sm text-text-dim leading-[1.6]">
                {leadsMissed} recovered leads &times; ${avgJobValue.toLocaleString()} avg {niche} job.
                Year one investment: ${yearOneCost.toLocaleString()} ({jobsToPayOff} jobs to pay it off).
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
