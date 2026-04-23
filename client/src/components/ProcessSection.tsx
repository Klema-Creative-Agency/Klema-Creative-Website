import { Zap } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const steps = [
  {
    number: "01",
    title: "Free Lead Audit",
    description: "We analyze your online presence and show you exactly where you're losing leads in San Antonio.",
  },
  {
    number: "02",
    title: "Custom Strategy Call",
    description: "We walk you through a tailored growth plan built for your trade, your area, and your goals.",
  },
  {
    number: "03",
    title: "System Build & Launch",
    description: "We build your automation, landing pages, and ad campaigns. Most clients are live within 2 weeks.",
  },
  {
    number: "04",
    title: "Optimize & Scale",
    description: "Every month, we review results, optimize campaigns, and report on every booked job.",
  },
];

export default function ProcessSection() {
  const { ref: desktopRef, visible: desktopVisible } = useReveal();
  const { ref: mobileRef, visible: mobileVisible } = useReveal();

  return (
    <section id="process" className="cream-section py-16 sm:py-24">
      <div className="container">
        <div className="text-center mb-10 sm:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="w-3.5 h-3.5 text-[var(--brand-lime)] shrink-0" fill="currentColor" strokeWidth={2.5} />
            <span className="section-label text-[var(--brand-green-mid)]">
              How It Works
            </span>
            <Zap className="w-3.5 h-3.5 text-[var(--brand-lime)] shrink-0" fill="currentColor" strokeWidth={2.5} />
          </div>
          <h2
            className="text-foreground max-w-2xl mx-auto font-extrabold"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.625rem)", letterSpacing: "-0.025em", lineHeight: 1.15 }}
          >
            From Zero to Booked Jobs in
            <span className="text-primary"> 2 Weeks</span>
          </h2>
        </div>

        {/* Desktop: horizontal 4-column with connecting line */}
        <div ref={desktopRef} className="hidden md:grid md:grid-cols-4 gap-8 relative">
          <div className="absolute top-10 left-[12.5%] right-[12.5%] h-px bg-border" />

          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`relative flex flex-col items-center text-center reveal-up stagger-${i + 1} ${desktopVisible ? "revealed" : ""}`}
            >
              <div className="relative z-10 w-20 h-20 rounded-md bg-primary flex items-center justify-center mb-6 shrink-0">
                <span className="font-display font-extrabold text-[1.5rem] text-[var(--brand-lime)]">
                  {step.number}
                </span>
              </div>

              <h3 className="text-foreground mb-3 font-bold text-[1.1875rem] leading-tight">
                {step.title}
              </h3>
              <p className="text-muted-foreground font-body text-[0.9375rem] leading-[1.65]">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile: vertical timeline */}
        <div ref={mobileRef} className="md:hidden flex flex-col relative">
          {/* Vertical connecting line */}
          <div
            className="absolute left-[1.4375rem] top-6 bottom-6 w-px bg-border"
          />

          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`relative flex gap-5 pb-8 last:pb-0 reveal-up stagger-${i + 1} ${mobileVisible ? "revealed" : ""}`}
            >
              {/* Number circle */}
              <div className="relative z-10 w-[2.875rem] h-[2.875rem] rounded-md bg-primary flex items-center justify-center shrink-0">
                <span className="font-display font-extrabold text-[1rem] text-[var(--brand-lime)]">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 pt-1.5">
                <h3 className="text-foreground font-bold text-[1.0625rem] leading-tight mb-1.5">
                  {step.title}
                </h3>
                <p className="text-muted-foreground font-body text-[0.875rem] leading-[1.6]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 sm:mt-14">
          <a href="#contact" className="btn-primary w-full sm:w-auto">
            Start My Free Audit Today
          </a>
        </div>
      </div>
    </section>
  );
}
