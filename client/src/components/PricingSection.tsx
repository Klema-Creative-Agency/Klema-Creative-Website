import { useState } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const plans = [
  {
    name: "Speed to Lead",
    tagline: "Stop the Leaky Bucket",
    price: "$297",
    priceNote: "/mo + $497 setup",
    highlight: false,
    badge: null,
    description:
      "Stop bleeding leads. Get the automation foundation that responds before your competitors can.",
    features: [
      "Custom CRM setup & configuration",
      "Missed Call Text-Back automation",
      "Web Chat Widget",
      "Automated review request campaign",
      "Google Business Profile optimization",
      "Unified inbox (calls, texts, emails)",
      "Monthly performance report",
    ],
    cta: "Get My Free Audit",
  },
  {
    name: "Local Visibility",
    tagline: "Get Found on Google",
    price: "$797",
    priceNote: "/mo",
    highlight: false,
    badge: null,
    description:
      "You have the automation. Now get found. We put you at the top of Google in San Antonio.",
    features: [
      "Everything in Speed to Lead",
      "Full local SEO management",
      "Google Business Profile management",
      "2 local landing pages built",
      "Monthly content & citation building",
      "Competitor gap analysis",
      "Bi-monthly strategy calls",
    ],
    cta: "Get My Free Audit",
  },
  {
    name: "Exclusive Lead Machine",
    tagline: "The Growth Engine",
    price: "$1,497",
    priceNote: "/mo + ad spend",
    highlight: true,
    badge: "MOST POPULAR",
    description:
      "The full system. SEO + paid ads + automation working together to fill your calendar every week.",
    features: [
      "Everything in Local Visibility",
      "Google Ads & LSA management",
      "Custom ad creatives (graphic design)",
      "High-converting landing page (paid traffic)",
      "Lead attribution & ROI tracking",
      "Weekly campaign optimization",
      "Weekly strategy calls",
    ],
    cta: "Get My Free Audit",
  },
  {
    name: "Market Dominator",
    tagline: "Own San Antonio",
    price: "$2,997+",
    priceNote: "/mo + ad spend",
    highlight: false,
    badge: null,
    description:
      "For contractors who want to be the undisputed first choice in San Antonio across every channel.",
    features: [
      "Everything in Exclusive Lead Machine",
      "Aggressive SEO & content strategy",
      "Omnichannel retargeting (Meta + Google)",
      "Full website rebuild (if needed)",
      "Advanced automation pipelines",
      "Sales team training & scripting",
      "Dedicated account manager",
    ],
    cta: "Get My Free Audit",
  },
];

function PricingCard({ plan, index, visible }: { plan: typeof plans[0]; index: number; visible: boolean }) {
  return (
    <div
      className={`rounded-md flex flex-col reveal-up stagger-${index + 1} ${visible ? "revealed" : ""}`}
      style={
        plan.highlight
          ? {
              background: "oklch(0.28 0.09 145)",
              boxShadow: "0 0 0 2px oklch(0.74 0.21 130), 0 25px 50px oklch(0.10 0.05 145 / 0.5)",
            }
          : {
              background: "oklch(0.24 0.08 145)",
              border: "1px solid oklch(1 0 0 / 0.08)",
            }
      }
    >
      {plan.badge ? (
        <div className="text-center py-2.5 rounded-t-md bg-[var(--brand-lime)] font-display font-bold text-[0.75rem] tracking-[0.08em] text-[var(--brand-charcoal)]">
          {plan.badge}
        </div>
      ) : (
        <div className="h-0" />
      )}

      <div className="p-5 sm:p-7 flex flex-col flex-1">
        <span className="text-[0.8125rem] font-semibold uppercase tracking-[0.06em] mb-1.5 block font-body text-[var(--brand-lime)]">
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
              <div className="w-4.5 h-4.5 rounded-sm flex items-center justify-center shrink-0 mt-0.5 bg-[oklch(0.74_0.21_130_/_0.15)]">
                <Check className="w-3 h-3 text-[var(--brand-lime)]" strokeWidth={2.5} />
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

export default function PricingSection() {
  const { ref: desktopRef, visible: desktopVisible } = useReveal();
  const { ref: mobileRef, visible: mobileVisible } = useReveal();
  const [showAllMobile, setShowAllMobile] = useState(false);
  const popularPlan = plans.find((p) => p.highlight)!;
  const popularIndex = plans.indexOf(popularPlan);

  return (
    <section id="pricing" className="darker-section py-16 sm:py-24">
      <div className="container">
        <div className="text-center mb-8 sm:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-6 sm:w-8 h-px bg-[var(--brand-lime)]" />
            <span className="section-label text-[var(--brand-lime)]">
              Transparent Pricing
            </span>
            <div className="w-6 sm:w-8 h-px bg-[var(--brand-lime)]" />
          </div>
          <h2
            className="text-white max-w-2xl mx-auto mb-4 sm:mb-5 font-extrabold"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.625rem)", letterSpacing: "-0.025em", lineHeight: 1.15 }}
          >
            No Contracts. No Shared Leads.
            <span className="text-[var(--brand-lime)]"> Just Results.</span>
          </h2>
          <p className="text-white/60 max-w-lg mx-auto font-body text-[0.9375rem] sm:text-base leading-relaxed">
            Each tier builds on the last. Start where you are and scale as you grow. Month-to-month, cancel anytime.
          </p>
        </div>

        {/* Desktop only: tier progression bar */}
        <div className="hidden lg:flex items-center justify-center gap-0 mb-10">
          {plans.map((plan, i) => (
            <div key={plan.name} className="flex items-center">
              <div className="flex flex-col items-center px-6">
                <span
                  className="text-[0.8125rem] uppercase tracking-[0.06em] mb-1 font-body font-semibold"
                  style={{ color: plan.highlight ? "oklch(0.74 0.21 130)" : "oklch(1 0 0 / 0.35)" }}
                >
                  Tier {i + 1}
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

        {/* Desktop: all 4 cards */}
        <div ref={desktopRef} className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {plans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} visible={desktopVisible} />
          ))}
        </div>

        {/* Mobile: show popular card first, toggle for rest */}
        <div ref={mobileRef} className="md:hidden">
          <PricingCard plan={popularPlan} index={0} visible={mobileVisible} />

          {!showAllMobile && (
            <button
              onClick={() => setShowAllMobile(true)}
              className="w-full mt-5 py-3.5 rounded-md border border-white/15 text-white/60 hover:text-white hover:border-white/30 text-[0.875rem] font-body font-medium transition-colors flex items-center justify-center gap-2 min-h-[48px] active:bg-white/5"
            >
              See All Plans
              <ChevronDown className="w-4 h-4" />
            </button>
          )}

          {showAllMobile && (
            <div className="flex flex-col gap-5 mt-5">
              {plans.filter((p) => !p.highlight).map((plan, i) => (
                <PricingCard key={plan.name} plan={plan} index={i} visible={true} />
              ))}
              <button
                onClick={() => setShowAllMobile(false)}
                className="w-full py-3 text-white/40 hover:text-white/60 text-[0.8125rem] font-body transition-colors flex items-center justify-center gap-1 min-h-[44px]"
              >
                Show Less
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-white/35 text-[0.75rem] sm:text-[0.8125rem] mt-8 sm:mt-10 font-body leading-relaxed">
          All plans are month-to-month. Each tier includes everything from the tier below it.
          Ad spend is billed separately and goes directly to the ad platforms.
        </p>
      </div>
    </section>
  );
}
