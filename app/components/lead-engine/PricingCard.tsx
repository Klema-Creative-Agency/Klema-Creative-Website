import RevealOnScroll from "@/app/components/RevealOnScroll";

const FEATURES = [
  "Mobile-first lead funnel (quiz-style)",
  "Instant call trigger (60-second response)",
  "Automated SMS + email follow-up",
  "Calendar booking integration",
  "Lead dashboard & CRM setup",
  "Monthly optimization & reporting",
  "Dedicated account manager",
  "Full system ownership — you keep everything",
];

/** Pricing card — $2,500 setup + $997/mo — shared across all niches */
export default function PricingCard({
  serviceName,
}: {
  serviceName: string;
}) {
  return (
    <section className="py-30 max-md:py-20 relative overflow-hidden">
      <div className="cta-glow" />
      <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 relative z-2">
        <RevealOnScroll>
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
            Investment
          </p>
          <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
            Simple pricing.<br />No hidden fees.
          </h2>
        </RevealOnScroll>

        <div className="max-w-[480px] mx-auto mt-16">
          <RevealOnScroll>
            <div className="price-card-featured bg-surface border border-border rounded-[20px] p-10 px-8 transition-all duration-400 hover:border-border-hover relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-black px-[18px] py-[5px] rounded-full text-[11px] font-extrabold tracking-[0.06em] uppercase whitespace-nowrap">
                {serviceName}
              </div>
              <div className="mb-8">
                <div className="flex items-baseline gap-3 mb-1">
                  <div className="text-5xl font-black tracking-[-2px] leading-none">
                    <span className="text-xl font-semibold align-super mr-0.5">$</span>2,500
                  </div>
                  <span className="text-sm text-text-dim">one-time setup</span>
                </div>
                <div className="flex items-baseline gap-3 mt-3">
                  <div className="text-3xl font-black tracking-[-1.5px] leading-none text-accent">
                    <span className="text-base font-semibold align-super mr-0.5">$</span>997
                  </div>
                  <span className="text-sm text-text-dim">/month</span>
                </div>
              </div>
              <div className="h-px bg-border mb-6" />
              <ul className="price-features list-none mb-8 flex flex-col gap-3">
                {FEATURES.map((f, i) => (
                  <li
                    key={i}
                    className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]"
                  >
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#apply"
                className="block w-full py-3.5 rounded-full text-sm font-bold text-center no-underline transition-all duration-300 bg-accent text-black tracking-[0.01em] hover:shadow-[0_0_32px_rgba(74,222,128,0.3)] hover:-translate-y-px"
              >
                Apply for {serviceName} &rarr;
              </a>
              <p className="text-[11px] text-text-dim text-center mt-4">
                No contracts. Cancel anytime. System is yours to keep.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
