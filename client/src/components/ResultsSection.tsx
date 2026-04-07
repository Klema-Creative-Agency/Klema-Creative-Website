import { TrendingUp, Target, Clock, BarChart3 } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const RESULTS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663297447526/mEEGQWAhe3sZbFRjQQCeee/results_section-USwBUEWRxAeKtmtbzgdMmv.webp";

const stats = [
  { icon: TrendingUp, value: "3-5x", label: "Typical ROI on ad spend for contractors" },
  { icon: Clock, value: "< 14 days", label: "Average time to first lead after launch" },
  { icon: Target, value: "62%", label: "Of homeowners choose the first to respond" },
  { icon: BarChart3, value: "18%+", label: "Landing page conversion (industry avg: 3%)" },
];

export default function ResultsSection() {
  const { ref, visible } = useReveal();

  return (
    <section id="results" className="light-section py-16 sm:py-24">
      <div className="container">
        <div className="mb-10 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 sm:w-8 h-px bg-[var(--brand-lime)]" />
            <span className="section-label text-[var(--brand-green-mid)]">
              What to Expect
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6">
            <h2
              className="text-foreground max-w-xl font-extrabold"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.625rem)", letterSpacing: "-0.025em", lineHeight: 1.15 }}
            >
              The Numbers Behind
              <span className="text-primary"> Contractor Marketing Done Right</span>
            </h2>
            <p className="text-muted-foreground max-w-sm font-body text-[0.875rem] sm:text-[0.9375rem] leading-relaxed">
              Real industry benchmarks from contractors using exclusive lead systems like the ones we build.
            </p>
          </div>
        </div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Stats -- 2x2 grid, stacks to 1-col on very small */}
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

          {/* Image -- hidden on mobile */}
          <div className={`relative hidden lg:block reveal-scale ${visible ? "revealed" : ""}`} style={{ transitionDelay: "0.2s" }}>
            <img
              src={RESULTS_IMG}
              alt="Marketing analytics dashboard showing lead generation performance"
              className="rounded-md w-full object-cover shadow-xl aspect-[4/3]"
              loading="lazy"
              width={600}
              height={450}
            />
            <div className="absolute top-4 right-4 rounded-md px-4 py-3 bg-primary">
              <span className="text-white text-[0.8125rem] font-display font-bold block leading-tight">
                Exclusive Leads
              </span>
              <span className="text-[var(--brand-lime)] text-[1.125rem] font-display font-extrabold">
                Not Shared
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
