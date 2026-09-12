import { Zap } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const PROBLEM_IMG = "/brand_contrast_v1.jpg";

const painPoints = [
  {
    stat: "75%",
    label: "of people judge a company by how its vehicles look",
    detail: "A plain white truck tells homeowners nothing. A wrapped truck tells them you're established, professional, and worth premium prices.",
  },
  {
    stat: "30,000+",
    label: "impressions a single wrapped truck earns every day",
    detail: "Your trucks are already driving all over San Antonio. Right now they're doing it anonymously, for free, for nobody.",
  },
  {
    stat: "Lowest",
    label: "cost per impression of any major advertising channel",
    detail: "You pay for a wrap once and it advertises for years. No monthly ad bill, no algorithm, no shared platform.",
  },
];

export default function PainPointsSection() {
  const { ref: leftRef, visible: leftVisible } = useReveal();
  const { ref: rightRef, visible: rightVisible } = useReveal();

  return (
    <section className="dark-section py-16 sm:py-24 overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div ref={leftRef} className={`reveal-left ${leftVisible ? "revealed" : ""}`}>
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <Zap className="w-3.5 h-3.5 text-[var(--brand-gold)] shrink-0" fill="currentColor" strokeWidth={2.5} />
              <span className="section-label text-[var(--brand-gold)]">
                The Problem
              </span>
            </div>

            <h2
              className="text-white mb-5 sm:mb-6 font-extrabold"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.625rem)", letterSpacing: "0", lineHeight: 1.15 }}
            >
              Blending In Is
              <br />
              <span className="text-[var(--brand-gold)]">Costing You Jobs</span>
            </h2>

            <p className="text-white/70 mb-8 sm:mb-10 font-body text-base sm:text-[1.0625rem] leading-[1.65] sm:leading-[1.7]">
              Think about the last contractor truck you actually remembered. It wasn't
              the plain white one. When your truck, your logo, and your website look
              like everyone else's, homeowners pick on price alone. A brand that stands
              out wins the job before you ever ring the doorbell.
            </p>

            <div className="flex flex-col gap-5 sm:gap-7">
              {painPoints.map((point) => (
                <div key={point.stat} className="left-accent-border">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-1.5">
                    <span className="font-display font-extrabold text-[1.75rem] sm:text-[2rem] text-[var(--brand-gold)] leading-none">
                      {point.stat}
                    </span>
                    <span className="text-white/80 text-[0.875rem] sm:text-[0.9375rem] font-body font-medium leading-snug">
                      {point.label}
                    </span>
                  </div>
                  <p className="text-white/45 text-[0.8125rem] sm:text-[0.875rem] font-body leading-relaxed">
                    {point.detail}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-5 sm:mt-7 text-white/40 text-[0.75rem] sm:text-[0.8125rem] font-body leading-relaxed italic">
              Industry benchmarks from outdoor advertising and fleet graphics research. Your trucks are the most underpriced ad space you own.
            </p>
          </div>

          {/* Image -- hidden on very small screens, shown on sm+ */}
          <div ref={rightRef} className={`relative hidden sm:block reveal-scale ${rightVisible ? "revealed" : ""}`}>
            {/* Offset gold slab behind the image: angular frame */}
            <div
              aria-hidden
              className="absolute top-4 -right-4 bottom-[-1rem] left-4 bg-[var(--brand-gold)] clip-slant"
            />
            <img
              src={PROBLEM_IMG}
              alt="Side-by-side comparison of a plain unmarked white work van and the same van fully wrapped in bold black and gold branding for a plumbing company"
              className="relative w-full object-cover clip-slant"
              loading="lazy"
              width={1920}
              height={1288}
            />
            <div
              className="absolute -bottom-3 -left-3 lg:-bottom-4 lg:-left-4 bg-white rounded-md px-4 py-3 shadow-xl flex items-center gap-3"
            >
              <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-[var(--brand-gold)] flex items-center justify-center shrink-0">
                <span className="text-[var(--brand-charcoal)] text-sm font-bold">&#10003;</span>
              </div>
              <div>
                <p className="text-foreground text-[0.75rem] lg:text-[0.8125rem] font-display font-bold leading-tight">
                  Same Van, New Brand
                </p>
                <p className="text-muted-foreground text-[0.75rem] lg:text-[0.8125rem] font-body">
                  Now it sells while it drives
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
