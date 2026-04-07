import { Zap, Search, MousePointer, Globe, Palette, GitBranch, ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const services = [
  {
    icon: Zap,
    title: "Custom Automation & CRM",
    tagline: "Never Miss a Lead Again",
    description:
      "We set up a custom CRM with Missed Call Text-Back, automated review requests, lead nurturing sequences, and a unified inbox so every prospect gets an instant response.",
    outcomes: ["Missed call recovery", "Automated review requests", "Lead nurture sequences"],
  },
  {
    icon: Search,
    title: "Local SEO",
    tagline: "Own San Antonio on Google",
    description:
      "We optimize your Google Business Profile, build local landing pages for the San Antonio metro, and execute a content strategy that puts you at the top of search results.",
    outcomes: ["Google Business Profile", "Local landing pages", "Map pack rankings"],
  },
  {
    icon: MousePointer,
    title: "Paid Ads & Google LSAs",
    tagline: "Exclusive Leads, Not Shared Ones",
    description:
      "We manage Google Ads and Local Services Ads to generate high-intent, exclusive leads. No more bidding against 5 other contractors on Angi. Your leads, your jobs.",
    outcomes: ["Google Ads management", "Local Services Ads", "A/B tested creatives"],
  },
  {
    icon: Globe,
    title: "Web Development",
    tagline: "A Website That Actually Converts",
    description:
      "Fast, mobile-first websites and landing pages designed to turn San Antonio visitors into booked appointments with clear CTAs, trust signals, and lightning-fast load times.",
    outcomes: ["High-converting landing pages", "Mobile-first design", "Speed optimized"],
  },
  {
    icon: Palette,
    title: "Graphic Design",
    tagline: "Look Like the Premium Choice",
    description:
      "From scroll-stopping ad creatives to branded truck wraps and seasonal promotions, we make sure your business looks professional and commands premium pricing.",
    outcomes: ["Ad creatives", "Brand identity", "Seasonal promotions"],
  },
  {
    icon: GitBranch,
    title: "Workflow Automations",
    tagline: "Your Business on Autopilot",
    description:
      "We connect your tools and automate repetitive tasks from job completion follow-ups to appointment reminders so your team can focus on doing great work.",
    outcomes: ["Job completion follow-ups", "Appointment reminders", "Re-engagement flows"],
  },
];

export default function ServicesSection() {
  const { ref, visible } = useReveal();

  return (
    <section id="services" className="light-section py-16 sm:py-24">
      <div className="container">
        <div className="mb-10 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 sm:w-8 h-px bg-[var(--brand-lime)]" />
            <span className="section-label text-[var(--brand-green-mid)]">
              What We Do
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6">
            <h2
              className="text-foreground max-w-lg font-extrabold"
              style={{ fontSize: "clamp(1.625rem, 4vw, 2.75rem)", letterSpacing: "-0.025em", lineHeight: 1.12 }}
            >
              Everything You Need to
              <span className="text-primary"> Dominate San Antonio</span>
            </h2>
            <p className="text-muted-foreground max-w-sm font-body text-[0.9375rem] sm:text-base leading-relaxed">
              Every system is custom-built for your trade and your market. No templates, no one-size-fits-all.
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
                  <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[var(--brand-lime)]" strokeWidth={2} />
                </div>

                <span className="text-[var(--brand-lime)] text-[0.75rem] sm:text-[0.8125rem] font-semibold uppercase tracking-[0.06em] mb-1.5 sm:mb-2 block font-body">
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
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--brand-lime)] shrink-0" />
                      <span className="text-[var(--brand-green-mid)] text-[0.75rem] sm:text-[0.8125rem] font-body font-medium">
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
            See What's Possible for Your Business
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
