import { ArrowRight, Phone, Mail, MapPin, Shield, Clock, Users, Star } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import ContactForm from "./ContactForm";

const foundingBenefits = [
  { icon: Shield, text: "Locked-in founding pricing" },
  { icon: Clock, text: "Direct founder access" },
  { icon: Users, text: "Only 5 spots per month" },
  { icon: Star, text: "Shape the service with us" },
];

export default function ContactSection() {
  const { ref, visible } = useReveal();

  return (
    <section id="contact" className="dark-section py-16 sm:py-24">
      <div className="container">
        {/* Founding Client intro -- visible on all screens */}
        <div className="text-center mb-10 sm:mb-14">
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
          <p className="text-white/70 font-body text-[0.9375rem] sm:text-[1.0625rem] leading-[1.65] sm:leading-[1.7] max-w-2xl mx-auto mb-8 sm:mb-10">
            We're looking for a small group of founding clients to grow with. You get our best
            pricing and direct attention. We get partners who help us refine the service.
          </p>

          {/* Founding benefits -- compact horizontal strip */}
          <div className="grid grid-cols-2 sm:flex sm:justify-center gap-3 sm:gap-6 max-w-2xl mx-auto">
            {foundingBenefits.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 sm:gap-2.5">
                <Icon className="w-4 h-4 sm:w-[1.125rem] sm:h-[1.125rem] text-[var(--brand-lime)] shrink-0" strokeWidth={2} />
                <span className="text-white/60 text-[0.75rem] sm:text-[0.8125rem] font-body font-medium text-left leading-tight">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form area */}
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start max-w-5xl mx-auto">
          {/* Left: details -- desktop only */}
          <div className={`hidden lg:block reveal-left ${visible ? "revealed" : ""}`}>
            <h3
              className="text-white mb-5 font-extrabold"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", letterSpacing: "-0.025em", lineHeight: 1.15 }}
            >
              Get Your Free
              <br />
              <span className="text-[var(--brand-lime)]">Lead Audit Today</span>
            </h3>

            <p className="text-white/70 mb-8 font-body text-[1.0625rem] leading-[1.7]">
              Fill out the form and we'll run a complete analysis of your online
              presence: your Google rankings, ad performance, website speed,
              and where your competitors are beating you. No cost, no obligation.
            </p>

            <div className="flex flex-col gap-4 mb-8">
              {[
                "A full SEO audit of your website and local rankings",
                "Analysis of your Google Business Profile",
                "Competitor gap analysis for the San Antonio market",
                "A custom growth roadmap with clear next steps",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-sm flex items-center justify-center shrink-0 mt-0.5 bg-[oklch(0.74_0.21_130_/_0.2)]">
                    <ArrowRight className="w-3 h-3 text-[var(--brand-lime)]" strokeWidth={2.5} />
                  </div>
                  <span className="text-white/70 text-[0.9375rem] font-body leading-snug">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3.5 border-t border-white/10 pt-8">
              {[
                { icon: Phone, text: "(210) 974-9386", href: "tel:+1-210-974-9386" },
                { icon: Mail, text: "tamaya@klemacreative.com", href: "mailto:tamaya@klemacreative.com" },
                { icon: MapPin, text: "Based in San Antonio, TX", href: undefined },
              ].map(({ icon: Icon, text, href }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-[var(--brand-lime)]" strokeWidth={2} />
                  {href ? (
                    <a href={href} className="text-white/55 hover:text-white/80 text-[0.875rem] font-body transition-colors">
                      {text}
                    </a>
                  ) : (
                    <span className="text-white/55 text-[0.875rem] font-body">{text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: 2-Step Form */}
          <div className={`reveal-up ${visible ? "revealed" : ""}`} style={{ transitionDelay: "0.15s" }}>
            <ContactForm idPrefix="contact" />

            {/* Mobile-only contact info below form */}
            <div className="lg:hidden flex items-center justify-center gap-6 mt-6 pt-6 border-t border-white/10">
              <a href="tel:+1-210-974-9386" className="flex items-center gap-2 text-white/50 text-[0.8125rem] font-body">
                <Phone className="w-3.5 h-3.5 text-[var(--brand-lime)]" strokeWidth={2} />
                (210) 974-9386
              </a>
              <a href="mailto:tamaya@klemacreative.com" className="flex items-center gap-2 text-white/50 text-[0.8125rem] font-body">
                <Mail className="w-3.5 h-3.5 text-[var(--brand-lime)]" strokeWidth={2} />
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
