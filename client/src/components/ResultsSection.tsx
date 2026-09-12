import { TrendingUp, Eye, Timer, Gauge, Zap } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const RESULTS_IMG = "/wrapped_fleet_v1.jpg";

const stats = [
  { icon: Eye, value: "30-70k", label: "Daily impressions from a single wrapped vehicle" },
  { icon: TrendingUp, value: "75%", label: "Of people judge a company by its vehicles" },
  { icon: Timer, value: "Years", label: "One wrap keeps advertising after one payment" },
  { icon: Gauge, value: "100s", label: "The Lighthouse speed scores we build websites to" },
];

export default function ResultsSection() {
  const { ref, visible } = useReveal();

  return (
    <section id="results" className="dark-section py-16 sm:py-24">
      <div className="container">
        <div className="mb-10 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-3.5 h-3.5 text-[var(--brand-gold)] shrink-0" fill="currentColor" strokeWidth={2.5} />
            <span className="section-label text-[var(--brand-gold)]">
              What to Expect
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6">
            <h2
              className="text-white max-w-xl font-extrabold"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.625rem)", letterSpacing: "0", lineHeight: 1.15 }}
            >
              The Numbers Behind
              <span className="text-[var(--brand-gold)]"> a Brand That Works</span>
            </h2>
            <p className="text-white/70 max-w-sm font-body text-[0.875rem] sm:text-[0.9375rem] leading-relaxed">
              Industry benchmarks from outdoor advertising and fleet graphics research, and the standards we hold our own builds to.
            </p>
          </div>
        </div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Stats -- 2x2 grid, stacks to 1-col on very small */}
          <div>
            <div className="grid grid-cols-2 gap-3 sm:gap-5">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className={`bg-white border border-border rounded-md p-4 sm:p-6 reveal-up stagger-${i + 1} ${visible ? "revealed" : ""}`}
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-md bg-primary/[0.08] flex items-center justify-center mb-3 sm:mb-4">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" strokeWidth={2} />
                    </div>
                    <span className="font-display font-extrabold text-[1.5rem] sm:text-[2rem] text-primary block leading-none mb-1.5 sm:mb-2">
                      {stat.value}
                    </span>
                    <span className="text-muted-foreground text-[0.75rem] sm:text-[0.8125rem] font-body leading-snug">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 sm:mt-5 text-white/45 text-[0.75rem] sm:text-[0.8125rem] font-body leading-relaxed italic">
              Impression and perception figures are published outdoor advertising industry benchmarks. Speed scores are the standard we hold every website we build to.
            </p>
          </div>

          {/* Image -- hidden on mobile */}
          <div className={`relative hidden lg:block reveal-scale ${visible ? "revealed" : ""}`} style={{ transitionDelay: "0.2s" }}>
            <img
              src={RESULTS_IMG}
              alt="A matching fleet of wrapped service vans and a pickup truck in unified black and gold branding lined up at golden hour"
              className="w-full object-cover shadow-xl aspect-[4/3] clip-slant"
              loading="lazy"
              width={600}
              height={450}
            />
            <div className="absolute top-4 right-4 rounded-md px-4 py-3 bg-primary">
              <span className="text-white text-[0.8125rem] font-display font-bold block leading-tight">
                Designed + Printed
              </span>
              <span className="text-[var(--brand-gold)] text-[1.125rem] font-display font-extrabold">
                Under One Roof
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
