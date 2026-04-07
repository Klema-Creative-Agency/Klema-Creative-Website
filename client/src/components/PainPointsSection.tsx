import { useReveal } from "@/hooks/useReveal";

const AUTOMATION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663297447526/mEEGQWAhe3sZbFRjQQCeee/automation_visual-XBrFBcErABKX9ZXrxpdfFi.webp";

const painPoints = [
  {
    stat: "78%",
    label: "of homeowners hire the first contractor who responds",
    detail: "Speed to lead is everything. Our Missed Call Text-Back ensures you're always first.",
  },
  {
    stat: "$228",
    label: "average cost per roofing lead on shared platforms",
    detail: "Stop paying for leads you share with 5 competitors. Our system generates exclusive leads for your business only.",
  },
  {
    stat: "97%",
    label: "of homeowners say response speed influences who they hire",
    detail: "Your custom automation works 24/7, even when you're on a job site in San Antonio.",
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
              <div className="w-6 sm:w-8 h-px bg-[var(--brand-lime)]" />
              <span className="section-label text-[var(--brand-lime)]">
                The Problem
              </span>
            </div>

            <h2
              className="text-white mb-5 sm:mb-6 font-extrabold"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.625rem)", letterSpacing: "-0.025em", lineHeight: 1.15 }}
            >
              You're Losing Jobs
              <br />
              <span className="text-[var(--brand-lime)]">Every Single Day</span>
            </h2>

            <p className="text-white/70 mb-8 sm:mb-10 font-body text-base sm:text-[1.0625rem] leading-[1.65] sm:leading-[1.7]">
              While you're under a house fixing a pipe or on a roof in the San Antonio
              heat, your phone rings and you miss it. That homeowner calls the next
              contractor on Google. The job is gone. This happens dozens of times
              a month and most contractors don't even realize it.
            </p>

            <div className="flex flex-col gap-5 sm:gap-7">
              {painPoints.map((point) => (
                <div key={point.stat} className="left-accent-border">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-1.5">
                    <span className="font-display font-extrabold text-[1.75rem] sm:text-[2rem] text-[var(--brand-lime)] leading-none">
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
          </div>

          {/* Image -- hidden on very small screens, shown on sm+ */}
          <div ref={rightRef} className={`relative hidden sm:block reveal-scale ${rightVisible ? "revealed" : ""}`}>
            <div
              className="absolute -inset-4 rounded-lg opacity-20"
              style={{
                background: "radial-gradient(circle at center, oklch(0.74 0.21 130), transparent 70%)",
              }}
            />
            <img
              src={AUTOMATION_IMG}
              alt="CRM automation dashboard showing missed call recovery and lead pipeline"
              className="relative rounded-lg w-full object-cover shadow-2xl"
              loading="lazy"
              width={600}
              height={450}
              style={{ boxShadow: "0 25px 60px oklch(0.10 0.05 145 / 0.6)" }}
            />
            <div
              className="absolute -bottom-3 -left-3 lg:-bottom-4 lg:-left-4 bg-white rounded-md px-4 py-3 shadow-xl flex items-center gap-3"
            >
              <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-[var(--brand-lime)] flex items-center justify-center shrink-0">
                <span className="text-[var(--brand-charcoal)] text-sm font-bold">&#10003;</span>
              </div>
              <div>
                <p className="text-foreground text-[0.75rem] lg:text-[0.8125rem] font-display font-bold leading-tight">
                  Missed Call Recovered
                </p>
                <p className="text-muted-foreground text-[0.75rem] lg:text-[0.8125rem] font-body">
                  Text-back sent in 2 seconds
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
