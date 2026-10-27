"use client";

import RevealOnScroll from "@/app/components/RevealOnScroll";

export default function TrustSignals() {
  return (
    <section className="py-20 max-md:py-14 border-t border-border relative">
      <div className="proof-glow" />
      <div className="relative max-w-[800px] mx-auto px-8 max-md:px-5 z-10">
        <RevealOnScroll>
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4 text-center">
            Why It Works
          </p>
          <h2 className="text-[clamp(22px,5vw,36px)] font-extrabold leading-[1.15] tracking-[-1px] mb-12 text-center">
            Built on Speed, Exclusivity, and Results
          </h2>
        </RevealOnScroll>

        {/* Industry stats grid */}
        <RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {[
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                ),
                title: "60-Second Response",
                body: "Our AI calls leads before your competitors even see the notification.",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
                title: "100% Exclusive Leads",
                body: "Your leads are yours. We never sell the same lead to your competition.",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                ),
                title: "No Long-Term Contracts",
                body: "Month-to-month. Our results earn your business every single month.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-surface border border-border rounded-xl p-5 text-center accent-top-hover"
              >
                <div className="w-10 h-10 rounded-full bg-accent-dim border border-accent-border flex items-center justify-center mx-auto mb-3">
                  {card.icon}
                </div>
                <h3 className="text-[15px] font-bold mb-1.5">{card.title}</h3>
                <p className="text-[13px] text-text-dim leading-[1.6]">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* Guarantee block */}
        <RevealOnScroll>
          <div className="bg-surface border border-accent-border rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-accent-dim border border-accent-border flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3 className="text-[18px] font-bold mb-2">
              Our Performance Guarantee
            </h3>
            <p className="text-[14px] text-text-dim leading-[1.7] max-w-[500px] mx-auto">
              If we do not generate booked appointments within your first 30 days,
              we will continue running your campaigns at no additional charge until
              we do. We succeed when you succeed.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
