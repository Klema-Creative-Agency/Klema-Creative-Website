"use client";

import RevealOnScroll from "@/app/components/RevealOnScroll";

/** Dynamic ROI math section — populated from niche data */
export default function ROISection({
  serviceName,
  avgJobValue,
  setupFee,
  monthlyFee,
  breakEvenJobs,
  cplGoogle,
  cplOurs,
}: {
  serviceName: string;
  avgJobValue: number;
  setupFee: number;
  monthlyFee: number;
  breakEvenJobs: number;
  cplGoogle: string;
  cplOurs: string;
}) {
  const yearOneCost = setupFee + monthlyFee * 12;
  const jobsToPayOff = Math.ceil(yearOneCost / avgJobValue);

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
            Run the numbers yourself. The average {serviceName.toLowerCase().replace(" lead engine", "").replace(" patient engine", "")} job
            is worth ${avgJobValue.toLocaleString()}. Here&apos;s how fast this system pays off.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-3 gap-5 mt-16 max-lg:grid-cols-1 max-lg:max-w-[480px]">
          <RevealOnScroll>
            <div className="bg-surface border border-border rounded-[20px] p-8">
              <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-text-dim mb-5">
                Your current cost
              </p>
              <div className="text-3xl font-black tracking-[-1px] text-red mb-2">
                {cplGoogle}
              </div>
              <p className="text-sm text-text-dim leading-[1.6]">
                Per lead on Google Ads. Stop paying and the leads stop.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="bg-surface border border-accent-border rounded-[20px] p-8 relative">
              <div className="absolute -top-3 left-6 bg-accent text-black px-3 py-1 rounded-full text-[10px] font-extrabold tracking-[0.06em] uppercase">
                Our System
              </div>
              <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-text-dim mb-5">
                Your cost with us
              </p>
              <div className="text-3xl font-black tracking-[-1px] text-accent mb-2">
                {cplOurs}
              </div>
              <p className="text-sm text-text-dim leading-[1.6]">
                Per exclusive lead. You own the system. Leads compound over time.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="bg-surface border border-border rounded-[20px] p-8">
              <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-text-dim mb-5">
                Year one investment
              </p>
              <div className="text-3xl font-black tracking-[-1px] mb-2">
                ${yearOneCost.toLocaleString()}
              </div>
              <p className="text-sm text-text-dim leading-[1.6]">
                ${setupFee.toLocaleString()} setup + ${monthlyFee}/mo. Only{" "}
                <span className="text-accent font-semibold">{jobsToPayOff} jobs</span>{" "}
                to pay off the entire year.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
