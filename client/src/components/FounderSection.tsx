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
              {/* TODO: Swap placeholder with final founder photo (square, ~600x600, well-lit headshot). Replace src with /founder_tomas.jpg or similar. */}
              <img
                src="/founder_tomas_placeholder.svg"
                alt="Tomas Amaya, founder of Klema Creative"
                className="w-full aspect-square object-cover rounded-md shadow-2xl"
                loading="lazy"
                width={600}
                height={600}
              />
              <div className="absolute -bottom-3 -left-3 bg-[var(--brand-lime)] text-[var(--brand-charcoal)] rounded-md px-4 py-2.5 shadow-xl">
                <p className="text-[0.75rem] font-display font-bold uppercase tracking-wider leading-none">
                  San Antonio, TX
                </p>
              </div>
            </div>
          </div>

          {/* Copy column */}
          <div className={`lg:col-span-3 reveal-up ${visible ? "revealed" : ""}`} style={{ transitionDelay: "0.15s" }}>
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <Zap className="w-3.5 h-3.5 text-[var(--brand-lime)] shrink-0" fill="currentColor" strokeWidth={2.5} />
              <span className="section-label text-[var(--brand-lime)]">
                Why Contractors Trust Klema
              </span>
            </div>

            <h2
              className="text-white mb-5 sm:mb-6 font-extrabold"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.625rem)", letterSpacing: "-0.025em", lineHeight: 1.15 }}
            >
              Built by Someone
              <span className="text-[var(--brand-lime)]"> Who Gets It</span>
            </h2>

            <div className="mb-6">
              <p className="text-white font-display font-bold text-[1.0625rem] sm:text-[1.125rem] leading-tight">
                Tomas Amaya
              </p>
              <p className="text-[var(--brand-lime)] text-[0.8125rem] sm:text-[0.875rem] font-body font-semibold uppercase tracking-wider mt-1">
                Founder
              </p>
            </div>

            <p className="text-white/75 font-body text-[0.9375rem] sm:text-[1rem] leading-[1.7] mb-7">
              I started Klema Creative because I watched too many San Antonio contractors get burned by agencies that promised leads and delivered nothing, and by shared-lead platforms like Angi that pit you against four other contractors for the same homeowner. You shouldn't have to fight for every job. I build the systems that get the phone ringing with leads that are exclusively yours, and respond to them faster than your competitors can. When you work with Klema, you get me on the phone directly. No account managers. No handoffs. Just results.
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
