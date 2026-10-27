"use client";

import RevealOnScroll from "@/app/components/RevealOnScroll";

export default function SolutionSection() {
  return (
    <section className="py-20 max-md:py-14 border-t border-border">
      <div className="max-w-[800px] mx-auto px-8 max-md:px-5">
        <RevealOnScroll>
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
            The Solution
          </p>
          <h2 className="text-[clamp(22px,5vw,36px)] font-extrabold leading-[1.15] tracking-[-1px] mb-4">
            A Two-Part System That Fills Your Calendar
          </h2>
          <p className="text-[16px] text-text-dim leading-[1.7] mb-12 max-md:text-[15px]">
            We do not just run ads. We built a complete system where ads bring the
            leads in and AI books them before your competitors even pick up the phone.
          </p>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Part 1: Ads */}
          <RevealOnScroll>
            <div className="bg-surface border border-border rounded-xl p-6 h-full accent-top-hover">
              <div className="w-12 h-12 rounded-xl bg-accent-dim border border-accent-border flex items-center justify-center mb-5">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-accent"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <h3 className="text-[18px] font-bold mb-2">
                Facebook Ads That Find Your Customers
              </h3>
              <p className="text-[14px] text-text-dim leading-[1.7]">
                Targeted campaigns that reach homeowners in your service area who need
                help right now. No wasted spend on people who will never buy.
              </p>
            </div>
          </RevealOnScroll>

          {/* Part 2: AI */}
          <RevealOnScroll>
            <div className="bg-surface border border-border rounded-xl p-6 h-full accent-top-hover">
              <div className="w-12 h-12 rounded-xl bg-accent-dim border border-accent-border flex items-center justify-center mb-5">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-accent"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <h3 className="text-[18px] font-bold mb-2">
                AI That Books Them in 60 Seconds
              </h3>
              <p className="text-[14px] text-text-dim leading-[1.7]">
                The moment a lead submits your form, our AI calls them, qualifies
                them, and books the appointment on your calendar. No delay, no
                missed calls, no leads slipping away.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
