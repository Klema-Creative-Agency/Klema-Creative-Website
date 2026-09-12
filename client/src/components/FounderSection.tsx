import { ArrowRight, Zap } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

export default function FounderSection() {
  const { ref, visible } = useReveal();

  return (
    <section id="founder" className="dark-section py-16 sm:py-24">
      <div className="container">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-center max-w-5xl mx-auto">
          {/* Photo column */}
          <div className={`lg:col-span-2 reveal-scale ${visible ? "revealed" : ""}`}>
            <div className="relative">
              <img
                src="/founder_tomas.jpg"
                alt="Tomas Amaya, founder of Klema Creative"
                className="w-full aspect-square object-cover shadow-2xl clip-slant"
                loading="lazy"
                width={600}
                height={600}
              />
              <div className="absolute -bottom-3 -left-3 bg-[var(--brand-gold)] text-[var(--brand-charcoal)] rounded-md px-4 py-2.5 shadow-xl">
                <p className="text-[0.75rem] font-display font-bold uppercase tracking-wider leading-none">
                  San Antonio, TX
                </p>
              </div>
            </div>
          </div>

          {/* Copy column */}
          <div className={`lg:col-span-3 reveal-up ${visible ? "revealed" : ""}`} style={{ transitionDelay: "0.15s" }}>
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <Zap className="w-3.5 h-3.5 text-[var(--brand-gold)] shrink-0" fill="currentColor" strokeWidth={2.5} />
              <span className="section-label text-[var(--brand-gold)]">
                Why Contractors Trust Klema
              </span>
            </div>

            <h2
              className="text-white mb-5 sm:mb-6 font-extrabold"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.625rem)", letterSpacing: "0", lineHeight: 1.15 }}
            >
              Built by Someone
              <span className="text-[var(--brand-gold)]"> Who Gets It</span>
            </h2>

            <div className="mb-6">
              <p className="text-white font-display font-bold text-[1.0625rem] sm:text-[1.125rem] leading-tight">
                Tomas Amaya
              </p>
              <p className="text-[var(--brand-gold)] text-[0.8125rem] sm:text-[0.875rem] font-body font-semibold uppercase tracking-wider mt-1">
                Founder
              </p>
            </div>

            <p className="text-white/75 font-body text-[0.9375rem] sm:text-[1rem] leading-[1.7] mb-7">
              I started Klema Creative because I watched too many great San Antonio contractors lose jobs to companies that simply looked more established. Your work deserves better than a clip-art logo and a plain white truck. I design brands for the trades and print them under one roof here in San Antonio: logos, wraps, signage, and the website to match. When you work with Klema, you get me directly. No account managers. No handoffs. Just a brand you're proud to park in a customer's driveway.
            </p>

            <a href="#contact" className="btn-primary inline-flex">
              Book a Call With Tomas
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
