import { useState } from "react";
import { Check, ChevronDown, ChevronUp, Zap } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

export const plans = [
  {
    name: "Brand Identity",
    tagline: "Step 1: The Foundation",
    price: "$1,500",
    priceNote: "one-time, starting at",
    highlight: false,
    badge: null,
    description:
      "The foundation everything else is built on. A brand that makes homeowners remember you and trust you.",
    features: [
      "Logo design (multiple concepts)",
      "Naming + tagline help if you need it",
      "Colors, typography + brand guide",
      "Business card + social graphics",
      "Every source file is 100% yours",
      "Print-ready from day one",
    ],
    cta: "Get My Free Brand Audit",
  },
  {
    name: "Vehicle Wrap",
    tagline: "Step 2: The Rolling Billboard",
    price: "$3,500",
    priceNote: "per vehicle, starting at",
    highlight: false,
    badge: null,
    description:
      "Designed and printed under one roof in San Antonio. Pay once, and your truck advertises for years.",
    features: [
      "Custom wrap design in your brand",
      "Printed in-house, no middleman",
      "Full wraps, partials + decals",
      "To-scale proof before we print",
      "Installation coordinated for you",
      "Fleet-matched design for every truck",
    ],
    cta: "Get My Free Brand Audit",
  },
  {
    name: "Website",
    tagline: "Step 3: Close the Loop",
    price: "$2,500",
    priceNote: "+ $99/mo care plan",
    highlight: false,
    badge: null,
    description:
      "A fast, brand-matched website that turns the people who saw your truck into booked jobs.",
    features: [
      "5-page site matched to your brand",
      "Mobile-first, built for speed",
      "Local SEO foundation included",
      "Lead forms straight to your phone",
      "Hosting, updates + care handled",
      "You own the site and the domain",
    ],
    cta: "Get My Free Brand Audit",
  },
  {
    name: "The Full Rebrand",
    tagline: "Everything, One Team",
    price: "$6,500",
    priceNote: "bundle, starting at",
    highlight: true,
    badge: "BEST VALUE",
    description:
      "Brand, wrap, and website launched together, so the truck, the logo, and the site all tell the same story.",
    features: [
      "Everything in all three packages",
      "One team, one timeline, zero handoffs",
      "Priority scheduling",
      "Savings vs. buying separately",
      "Brand launch kit for social media",
      "30 days of post-launch support",
    ],
    cta: "Get My Free Brand Audit",
  },
];

function PricingCard({
  plan,
  index,
  visible,
  className = "",
}: {
  plan: typeof plans[0];
  index: number;
  visible: boolean;
  className?: string;
}) {
  return (
    <div
      className={`rounded-md flex flex-col reveal-up stagger-${index + 1} ${visible ? "revealed" : ""} ${className}`}
      style={
        plan.highlight
          ? {
              background: "oklch(0.28 0.006 260)",
              boxShadow: "0 0 0 2px oklch(0.79 0.17 70), 0 25px 50px oklch(0.10 0.004 260 / 0.5)",
            }
          : {
              background: "oklch(0.24 0.006 260)",
              border: "1px solid oklch(1 0 0 / 0.08)",
            }
      }
    >
      {plan.badge ? (
        <div className="text-center py-2.5 rounded-t-md bg-[var(--brand-gold)] font-display font-bold text-[0.75rem] tracking-[0.08em] text-[var(--brand-charcoal)]">
          {plan.badge}
        </div>
      ) : (
        <div className="h-0" />
      )}

      <div className="p-5 sm:p-7 flex flex-col flex-1">
        <span className="text-[0.8125rem] font-semibold uppercase tracking-[0.06em] mb-1.5 block font-body text-[var(--brand-gold)]">
          {plan.tagline}
        </span>

        <h3 className="text-white mb-4 font-bold text-[1.1875rem] leading-tight">
          {plan.name}
        </h3>

        <div className="mb-5 pb-5 border-b border-white/10">
          <span className="text-white font-display font-extrabold text-[2.125rem] leading-none">
            {plan.price}
          </span>
          <span className="text-white/40 text-[0.8125rem] ml-1.5 font-body">
            {plan.priceNote}
          </span>
        </div>

        <p className="text-white/55 mb-6 font-body text-[0.875rem] leading-[1.65]">
          {plan.description}
        </p>

        <div className="flex flex-col gap-3 mb-8 flex-1">
          {plan.features.map((feature) => (
            <div key={feature} className="flex items-start gap-2.5">
              <div className="w-4.5 h-4.5 rounded-sm flex items-center justify-center shrink-0 mt-0.5 bg-[oklch(0.79_0.17_70_/_0.15)]">
                <Check className="w-3 h-3 text-[var(--brand-gold)]" strokeWidth={2.5} />
              </div>
              <span className="text-white/70 text-[0.8125rem] font-body leading-snug">
                {feature}
              </span>
            </div>
          ))}
        </div>

        <a
          href="#contact"
          className={
            plan.highlight
              ? "btn-primary justify-center text-sm py-3"
              : "btn-outline-white justify-center text-sm py-3"
          }
        >
          {plan.cta}
        </a>
      </div>
    </div>
  );
}

type PricingSectionProps = {
  eyebrow?: string;
};

export default function PricingSection({ eyebrow = "Transparent Pricing" }: PricingSectionProps) {
  const { ref, visible } = useReveal();
  const [showAllMobile, setShowAllMobile] = useState(false);

  return (
    <section id="pricing" className="darker-section py-16 sm:py-24">
      <div className="container">
        <div className="text-center mb-8 sm:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="w-3.5 h-3.5 text-[var(--brand-gold)] shrink-0" fill="currentColor" strokeWidth={2.5} />
            <span className="section-label text-[var(--brand-gold)]">
              {eyebrow}
            </span>
            <Zap className="w-3.5 h-3.5 text-[var(--brand-gold)] shrink-0" fill="currentColor" strokeWidth={2.5} />
          </div>
          <h2
            className="text-white max-w-2xl mx-auto mb-4 sm:mb-5 font-extrabold"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.625rem)", letterSpacing: "0", lineHeight: 1.15 }}
          >
            One Team. One Roof.
            <span className="text-[var(--brand-gold)]"> No Surprises.</span>
          </h2>
          <p className="text-white/60 max-w-lg mx-auto font-body text-[0.9375rem] sm:text-base leading-relaxed">
            Start with the piece you need most, or bundle the full rebrand and launch everything at once.
          </p>
        </div>

        {/* Desktop only: plan progression bar with named tiers + price, no "Tier N" prefix */}
        <div className="hidden xl:flex items-center justify-center gap-0 mb-10">
          {plans.map((plan, i) => (
            <div key={plan.name} className="flex items-center">
              <div className="flex flex-col items-center px-6">
                <span
                  className="text-[0.8125rem] uppercase tracking-[0.06em] mb-1 font-body font-semibold"
                  style={{ color: plan.highlight ? "oklch(0.79 0.17 70)" : "oklch(1 0 0 / 0.35)" }}
                >
                  {plan.name}
                </span>
                <span
                  className="text-[0.875rem] font-display font-bold"
                  style={{ color: plan.highlight ? "white" : "oklch(1 0 0 / 0.5)" }}
                >
                  {plan.price}
                </span>
              </div>
              {i < plans.length - 1 && (
                <div className="w-12 h-px bg-white/15" />
              )}
            </div>
          ))}
        </div>

        {/* Single responsive grid: renders each plan exactly once.
            Popular card displays first on mobile via order, natural position on desktop.
            Non-popular cards hide on mobile until expanded. */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch">
          {plans.map((plan, i) => {
            const isPopular = plan.highlight;
            const mobileHidden = !isPopular && !showAllMobile;
            return (
              <PricingCard
                key={plan.name}
                plan={plan}
                index={i}
                visible={visible}
                className={`${isPopular ? "order-first md:order-none" : ""} ${mobileHidden ? "hidden md:flex" : ""}`}
              />
            );
          })}
        </div>

        {/* Mobile-only expand/collapse: controls visibility of non-popular cards above */}
        <div className="md:hidden mt-5">
          {!showAllMobile ? (
            <button
              onClick={() => setShowAllMobile(true)}
              className="w-full py-3.5 rounded-md border border-white/15 text-white/60 hover:text-white hover:border-white/30 text-[0.875rem] font-body font-medium transition-colors flex items-center justify-center gap-2 min-h-[48px] active:bg-white/5"
            >
              See All Plans
              <ChevronDown className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setShowAllMobile(false)}
              className="w-full py-3 text-white/40 hover:text-white/60 text-[0.8125rem] font-body transition-colors flex items-center justify-center gap-1 min-h-[44px]"
            >
              Show Less
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <p className="text-center text-white/35 text-[0.75rem] sm:text-[0.8125rem] mt-8 sm:mt-10 font-body leading-relaxed">
          Starting prices shown. Wrap pricing varies by vehicle size and coverage, and every
          project gets a written quote before any work begins. The website care plan is
          month-to-month, cancel anytime.
        </p>
      </div>
    </section>
  );
}
