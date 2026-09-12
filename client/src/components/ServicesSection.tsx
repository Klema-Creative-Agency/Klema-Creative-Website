import { Zap, Palette, Truck, Globe, ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const services = [
  {
    icon: Palette,
    title: "Brand Identity",
    tagline: "Step 1: Start Here",
    description:
      "Your name, logo, colors, and a simple brand guide, built to make homeowners remember you and trust you at first glance. This is the foundation everything else is printed on.",
    outcomes: ["Logo + full visual identity", "Naming + tagline help", "Brand guide you own forever"],
  },
  {
    icon: Truck,
    title: "Vehicle Wraps",
    tagline: "Step 2: Your Rolling Billboard",
    description:
      "We design your wrap and print it under one roof in San Antonio. One wrapped truck earns 30,000+ views a day, and it advertises for years after you pay for it once.",
    outcomes: ["Full + partial wraps", "Design, print + install", "Matching fleet graphics"],
  },
  {
    icon: Globe,
    title: "Websites + Marketing",
    tagline: "Step 3: Close the Loop",
    description:
      "A fast, mobile-first website that matches your new brand and turns the people who saw your truck into booked jobs. Ongoing design and marketing support when you're ready to grow.",
    outcomes: ["Brand-matched website", "Local SEO foundation", "Ongoing design support"],
  },
];

export default function ServicesSection() {
  const { ref, visible } = useReveal();

  return (
    <section id="services" className="light-section py-16 sm:py-24">
      <div className="container">
        <div className="mb-10 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-3.5 h-3.5 text-[var(--brand-gold)] shrink-0" fill="currentColor" strokeWidth={2.5} />
            <span className="section-label text-[var(--brand-mid)]">
              What We Do
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6">
            <h2
              className="text-foreground max-w-lg font-extrabold"
              style={{ fontSize: "clamp(1.625rem, 4vw, 2.75rem)", letterSpacing: "0", lineHeight: 1.12 }}
            >
              Three Steps to Becoming
              <span className="text-primary"> the Obvious Choice</span>
            </h2>
            <p className="text-muted-foreground max-w-sm font-body text-[0.9375rem] sm:text-base leading-relaxed">
              Start with the brand, wrap the trucks, launch the website. One team, one standard, zero handoffs.
            </p>
          </div>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`group bg-white rounded-md border border-border p-5 sm:p-8 hover:shadow-xl hover:shadow-primary/[0.08] transition-all duration-300 hover:-translate-y-1 reveal-up stagger-${i + 1} ${visible ? "revealed" : ""}`}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-primary flex items-center justify-center mb-4 sm:mb-6">
                  <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[var(--brand-gold)]" strokeWidth={2} />
                </div>

                <span className="text-[var(--brand-gold)] text-[0.75rem] sm:text-[0.8125rem] font-semibold uppercase tracking-[0.06em] mb-1.5 sm:mb-2 block font-body">
                  {service.tagline}
                </span>

                <h3 className="text-foreground mb-2 sm:mb-3 font-bold text-[1.125rem] sm:text-[1.25rem] leading-tight">
                  {service.title}
                </h3>

                <p className="text-muted-foreground mb-4 sm:mb-6 font-body text-[0.875rem] sm:text-[0.9375rem] leading-[1.6] sm:leading-[1.65]">
                  {service.description}
                </p>

                <div className="border-t border-border pt-4 sm:pt-5 flex flex-col gap-1.5 sm:gap-2">
                  {service.outcomes.map((outcome) => (
                    <div key={outcome} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--brand-gold)] shrink-0" />
                      <span className="text-[var(--brand-mid)] text-[0.75rem] sm:text-[0.8125rem] font-body font-medium">
                        {outcome}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA -- full width on mobile */}
        <div className="text-center mt-10 sm:mt-14">
          <a href="#contact" className="btn-primary w-full sm:w-auto text-base">
            Start With a Free Brand Audit
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
