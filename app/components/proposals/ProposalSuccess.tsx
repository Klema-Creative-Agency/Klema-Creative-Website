"use client";

import type { ProposalData } from "@/app/data/proposals";
import RevealOnScroll from "@/app/components/RevealOnScroll";

export default function ProposalSuccess({
  proposal,
}: {
  proposal: ProposalData;
}) {
  return (
    <div className="relative text-center">
      <div className="cta-glow" />
      <div className="relative z-2">
        <RevealOnScroll>
          <div className="w-16 h-16 rounded-full bg-accent-dim border border-accent-border flex items-center justify-center mx-auto mb-6">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-accent"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <h2 className="text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-3">
            Payment Received
          </h2>
        </RevealOnScroll>

        <RevealOnScroll>
          <p className="text-[17px] text-text-dim leading-[1.7] max-w-[480px] mx-auto mb-10">
            {proposal.clientFirstName}, you&apos;re all set. Here&apos;s what
            happens next:
          </p>
        </RevealOnScroll>

        <div className="text-left space-y-4 max-w-[440px] mx-auto">
          {proposal.nextSteps.map((step) => (
            <RevealOnScroll key={step.num}>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-accent-dim border border-accent-border flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-accent text-xs font-bold">
                    {step.num}
                  </span>
                </div>
                <div>
                  <p className="text-[15px] font-bold text-text mb-0.5">
                    {step.title}
                  </p>
                  <p className="text-sm text-text-dim leading-[1.6]">
                    {step.body}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
}
