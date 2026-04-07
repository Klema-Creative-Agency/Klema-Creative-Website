import { ArrowRight, Shield, Clock, Users, Star } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const benefits = [
  {
    icon: Shield,
    title: "Locked-In Pricing",
    description: "Your founding rate stays the same even as our prices increase.",
  },
  {
    icon: Clock,
    title: "Direct Founder Access",
    description: "Work directly with the founder. White-glove onboarding.",
  },
  {
    icon: Users,
    title: "5 Spots Per Month",
    description: "Limited to 5 new contractors per month to ensure quality.",
  },
  {
    icon: Star,
    title: "Shape the Service",
    description: "Your feedback directly shapes how we build. You have a voice.",
  },
];

export default function FoundingClientSection() {
  const { ref, visible } = useReveal();

  return (
    <section className="dark-section py-16 sm:py-24 overflow-hidden">
      <div className="container">
        <div ref={ref} className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <div className={`reveal-up ${visible ? "revealed" : ""}`}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-6 sm:w-8 h-px bg-[var(--brand-lime)]" />
              <span className="section-label text-[var(--brand-lime)]">
                Limited Availability
              </span>
              <div className="w-6 sm:w-8 h-px bg-[var(--brand-lime)]" />
            </div>
            <h2
              className="text-white font-extrabold mb-4 sm:mb-5"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.625rem)", letterSpacing: "-0.025em", lineHeight: 1.15 }}
            >
              Founding Client Program
            </h2>
            <p className="text-white/70 font-body text-[0.9375rem] sm:text-[1.0625rem] leading-[1.65] sm:leading-[1.7] max-w-2xl mx-auto">
              We're looking for a small group of founding clients to grow with. You get our best
              pricing and direct attention. We get partners who help us refine the service.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-10 sm:mb-14">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className={`rounded-md p-4 sm:p-6 text-center reveal-up stagger-${i + 1} ${visible ? "revealed" : ""}`}
                style={{ background: "oklch(0.24 0.08 145)", border: "1px solid oklch(1 0 0 / 0.08)" }}
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-md bg-[oklch(0.74_0.21_130_/_0.15)] flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--brand-lime)]" strokeWidth={2} />
                </div>
                <h3 className="text-white font-bold text-[0.875rem] sm:text-[1.0625rem] mb-1.5 sm:mb-2 leading-tight">
                  {benefit.title}
                </h3>
                <p className="text-white/50 font-body text-[0.75rem] sm:text-[0.875rem] leading-[1.5] sm:leading-[1.6]">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className={`text-center reveal-up ${visible ? "revealed" : ""}`} style={{ transitionDelay: "0.3s" }}>
          <a href="#contact" className="btn-primary w-full sm:w-auto text-base">
            Apply for a Founding Spot
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-white/35 text-[0.75rem] sm:text-[0.8125rem] font-body mt-4">
            Only 5 spots available this month. No commitment required to apply.
          </p>
        </div>
      </div>
    </section>
  );
}
