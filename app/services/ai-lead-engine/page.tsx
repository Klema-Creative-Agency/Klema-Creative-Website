import type { Metadata } from "next";
import Link from "next/link";
import { niches, getNicheBySlug } from "@/app/data/niches";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import QuizFunnelDemo from "@/app/components/lead-engine/QuizFunnelDemo";

export const metadata: Metadata = {
  title: "AI Lead Engine | Done-For-You Lead Systems | Klema Creative",
  description:
    "Niche-specific AI lead generation systems for home service businesses. Mobile funnel, instant call trigger, automated follow-up. $2,500 setup + $997/mo.",
};

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

const NICHE_ICONS: Record<string, string> = {
  roofing: "🏠",
  "tree-removal": "🌳",
  hvac: "❄️",
  plumbing: "🔧",
  dental: "🦷",
};

const NICHE_DESCRIPTIONS: Record<string, string> = {
  roofing:
    "Done-for-you lead system for roofing contractors. Stop paying $350/lead on Google. Own your lead pipeline.",
  "tree-removal":
    "Capture storm season demand automatically. Emergency and scheduled tree removal leads delivered to your phone.",
  hvac:
    "Peak season ready. Mobile funnel, instant call trigger, and automated follow-up for HVAC contractors.",
  plumbing:
    "24/7 lead capture for plumbing emergencies. Burst pipe at 9pm? Your phone still rings first.",
  dental:
    "New patient acquisition system for dental practices. Reduce no-shows, fill your schedule, reactivate lapsed patients.",
};

export default function AILeadEngineHub() {
  return (
    <>
      {/* HERO */}
      <section className="pt-[140px] pb-20 max-md:pb-14 relative overflow-hidden">
        <div className="hero-glow hero-glow-breathe" />
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 relative z-2">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
              AI Lead Engine
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <h1 className="text-[clamp(36px,5.5vw,64px)] font-extrabold leading-[1.05] tracking-[-2px] mb-6 max-w-[800px]">
              Done-for-you lead systems<br />
              that make your phone <span className="text-accent">ring.</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll>
            <p className="text-[17px] text-text-dim leading-[1.7] max-w-[600px]">
              Mobile-first quiz funnel, 60-second call trigger, automated SMS and email follow-up.
              Pick your industry below and see exactly how it works.
            </p>
          </RevealOnScroll>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-bg pointer-events-none z-[1]" />
      </section>

      {/* NICHE GRID */}
      <section className="py-30 max-md:py-20">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
              Choose your industry
            </p>
            <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
              5 niches. One system.<br />Built for each.
            </h2>
          </RevealOnScroll>

          <div className="grid grid-cols-2 gap-5 mt-16 max-lg:grid-cols-1">
            {niches.map((niche) => (
              <RevealOnScroll key={niche.url_slug}>
                <div className="accent-line-hover bg-surface border border-border rounded-[20px] p-8 transition-all duration-400 hover:border-border-hover hover:bg-[#121212] h-full flex flex-col">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="text-3xl">{NICHE_ICONS[niche.url_slug]}</div>
                    <div>
                      <h3 className="text-xl font-extrabold tracking-[-0.3px] mb-1">
                        {niche.service_name}
                      </h3>
                      <p className="text-sm text-text-dim leading-[1.6]">
                        {NICHE_DESCRIPTIONS[niche.url_slug]}
                      </p>
                    </div>
                  </div>

                  <div className="bg-card rounded-xl p-4 mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black tracking-[-1px] text-accent">
                        {niche.pain_stat_1.value}
                      </span>
                      <span className="text-[12px] text-text-dim">
                        {niche.pain_stat_1.label.length > 50
                          ? niche.pain_stat_1.label.slice(0, 50) + "..."
                          : niche.pain_stat_1.label}
                      </span>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center gap-4 flex-wrap">
                    <Link
                      href={`/services/ai-lead-engine/${niche.url_slug}`}
                      className="btn-secondary-arrow inline-flex items-center gap-2 text-[14px] font-bold text-accent no-underline transition-colors duration-300 hover:text-text"
                    >
                      See {niche.service_name}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-300">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <Link
                      href={`/services/ai-lead-engine/${niche.url_slug}/watch`}
                      className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-text-dim no-underline transition-colors duration-300 hover:text-text"
                    >
                      Watch Demo
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* QUIZ DEMO TEASER */}
      <QuizFunnelDemo niche={getNicheBySlug("roofing")!} compact />

      {/* SHARED PRICING OVERVIEW */}
      <section className="py-30 max-md:py-20 relative overflow-hidden">
        <div className="cta-glow" />
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 text-center relative z-2">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
              Same price. Every niche.
            </p>
            <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
              <span className="text-accent">$2,500</span> setup +{" "}
              <span className="text-accent">$997</span>/mo
            </h2>
            <p className="text-[17px] text-text-dim leading-[1.7] max-w-[540px] mx-auto mb-12">
              Full system build, monthly optimization, and dedicated support. No contracts. The system is yours to keep.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-40 text-center relative overflow-hidden">
        <div className="cta-glow" />
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 relative z-2">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
              Not sure which niche page to visit?
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
              Let&apos;s talk about<br />your <span className="text-accent">business.</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll>
            <p className="text-[17px] text-text-dim leading-[1.7] max-w-[540px] mx-auto mb-12">
              Book a free strategy call. We&apos;ll tell you exactly how the AI Lead Engine would work for your specific industry and market.
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <Link
              href="/contact"
              className="btn-primary-hover inline-flex items-center gap-2.5 bg-accent text-black px-9 py-4 rounded-full text-[15px] font-bold no-underline transition-all duration-300 tracking-[-0.01em]"
            >
              Book a Free Strategy Call
              <ArrowIcon />
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
