"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import ComparisonTable from "@/app/components/ComparisonTable";
import {
  webTiers,
  stripeAddon,
  webFeatures,
  webComparisonTiers,
  webMeta,
  type WebTier,
} from "@/app/data/web-engineering";

/* ───── Icons ───── */

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-accent shrink-0 mt-[1px]">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* ───── Pricing Card ───── */

function PricingCard({ tier }: { tier: WebTier }) {
  return (
    <div
      className={`bg-surface border rounded-[24px] p-7 px-6 transition-all duration-400 hover:border-border-hover flex flex-col relative ${
        tier.featured ? "border-accent-border price-card-featured" : "border-border"
      }`}
    >
      {tier.featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-black px-3 py-1 rounded-full text-[11px] font-extrabold tracking-[0.06em] uppercase whitespace-nowrap">
          Recommended
        </div>
      )}

      {/* Name */}
      <h3 className="text-2xl font-extrabold tracking-[-0.5px] mb-1">{tier.name}</h3>

      {/* Price */}
      <div className="flex items-baseline gap-1.5 mb-1">
        <div className="text-5xl max-md:text-4xl font-black tracking-[-1.5px] leading-none">
          <span className="text-xl max-md:text-lg font-semibold align-super mr-0.5">$</span>
          {tier.monthlyNum.toLocaleString()}
        </div>
        <span className="text-sm text-text-dim">/mo</span>
      </div>

      {/* Setup */}
      <div className="group/setup relative inline-flex items-center gap-1 mb-4">
        <p className="text-[13px] text-text-dim">{tier.setup} setup</p>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-dim/50 cursor-help">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
        <div className="absolute bottom-full left-0 mb-2 w-56 bg-[#1a1a1a] border border-border rounded-xl p-3 text-[11px] text-text-mid leading-[1.5] opacity-0 pointer-events-none group-hover/setup:opacity-100 group-hover/setup:pointer-events-auto transition-opacity duration-200 z-10 shadow-xl">
          One-time setup fee covers design, development, configuration, and launch of your site.
        </div>
      </div>

      {/* Tagline */}
      <p className="text-[15px] max-md:text-[13px] text-text-dim leading-[1.5] mb-5">{tier.tagline}</p>

      {/* CTA */}
      <a
        href="#apply"
        className={`block w-full py-3.5 rounded-full text-[15px] font-bold text-center no-underline transition-all duration-300 mb-5 ${
          tier.featured
            ? "bg-accent text-black hover:shadow-[0_0_32px_rgba(74,222,128,0.3)] hover:-translate-y-px"
            : "bg-white-6 text-text hover:bg-white-10 hover:-translate-y-px"
        }`}
      >
        Get Started
      </a>

      {/* Pages + CRM */}
      <p className="text-[13px] text-text-mid mb-1">
        <span className="font-semibold text-text">{tier.pages}</span>
      </p>
      <p className="text-[13px] text-text-mid mb-4">
        CRM: <span className="font-semibold text-text">{tier.crm}</span>
      </p>

      <div className="h-px bg-border mb-4" />

      {/* Features */}
      <ul className="list-none flex flex-col gap-2.5 flex-1">
        {tier.features.map((f, i) => (
          <li key={i} className="text-[14px] max-md:text-[12px] text-text-mid flex items-start gap-2.5 leading-[1.4]">
            <CheckIcon />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───── Application Form ───── */

function ApplicationForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = new FormData(e.currentTarget);

    const body = {
      businessName: data.get("businessName") as string,
      city: data.get("city") as string,
      phone: data.get("phone") as string,
      email: data.get("email") as string,
      leadSource: data.get("tier") as string,
      frustration: data.get("goals") as string,
      niche: "web-engineering",
      source: "web-engineering-page",
    };

    try {
      const res = await fetch("/api/lead-engine-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        formRef.current?.reset();
      } else {
        setStatus("error");
        setErrorMsg(json.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="max-w-[560px] mx-auto flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
        <input name="businessName" required placeholder="Business name" className="w-full px-5 py-3.5 rounded-xl bg-white-6 border border-border text-[14px] text-text placeholder:text-text-dim focus:outline-none focus:border-accent-border transition-colors" />
        <input name="city" required placeholder="City / area you serve" className="w-full px-5 py-3.5 rounded-xl bg-white-6 border border-border text-[14px] text-text placeholder:text-text-dim focus:outline-none focus:border-accent-border transition-colors" />
      </div>
      <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
        <input name="phone" required type="tel" placeholder="Phone number" className="w-full px-5 py-3.5 rounded-xl bg-white-6 border border-border text-[14px] text-text placeholder:text-text-dim focus:outline-none focus:border-accent-border transition-colors" />
        <input name="email" required type="email" placeholder="Email address" className="w-full px-5 py-3.5 rounded-xl bg-white-6 border border-border text-[14px] text-text placeholder:text-text-dim focus:outline-none focus:border-accent-border transition-colors" />
      </div>
      <select name="tier" required className="w-full px-5 py-3.5 rounded-xl bg-white-6 border border-border text-[14px] text-text focus:outline-none focus:border-accent-border transition-colors appearance-none">
        <option value="">Which tier interests you?</option>
        {webTiers.map((t) => (
          <option key={t.id} value={t.id}>{t.name} - {t.monthly}/mo</option>
        ))}
        <option value="not-sure">Not sure yet</option>
      </select>
      <textarea name="goals" rows={3} placeholder="Tell us about your business and what you need from your website..." className="w-full px-5 py-3.5 rounded-xl bg-white-6 border border-border text-[14px] text-text placeholder:text-text-dim focus:outline-none focus:border-accent-border transition-colors resize-none" />

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary-hover w-full py-4 rounded-full text-[15px] font-bold text-center transition-all duration-300 bg-accent text-black hover:shadow-[0_0_32px_rgba(74,222,128,0.3)] disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : "Submit Application"}
      </button>

      {status === "success" && (
        <p className="text-center text-accent text-[14px] font-semibold">Application received! We&apos;ll be in touch within 1 business day.</p>
      )}
      {status === "error" && (
        <p className="text-center text-red-400 text-[14px]">{errorMsg}</p>
      )}
    </form>
  );
}

/* ───── Page ───── */

export default function WebEngineeringPage() {
  return (
    <>
      {/* META via head - handled by metadata export below, but since this is "use client" we set title manually */}
      <title>{webMeta.title}</title>
      <meta name="description" content={webMeta.description} />

      {/* ══════ HERO ══════ */}
      <section className="pt-[140px] max-md:pt-[100px] pb-20 max-md:pb-14 relative overflow-hidden">
        <div className="hero-glow hero-glow-breathe" />
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 relative z-2">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">Web Engineering</p>
          </RevealOnScroll>
          <RevealOnScroll>
            <h1 className="text-[clamp(36px,5.5vw,64px)] font-extrabold leading-[1.05] tracking-[-2px] mb-6 max-w-[800px]">
              A website that works<br />as hard as <span className="text-accent">you do.</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll>
            <p className="text-[17px] text-text-dim leading-[1.7] max-w-[600px] mb-10">
              Custom-designed, high-performance websites built to convert visitors into leads. Not a template. Not a page builder. Engineered for your business.
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="flex items-center gap-4 flex-wrap">
              <a
                href="#pricing"
                className="btn-primary-hover inline-flex items-center gap-2.5 bg-accent text-black px-9 py-4 rounded-full text-[15px] font-bold no-underline transition-all duration-300 tracking-[-0.01em]"
              >
                See Pricing
                <ArrowIcon />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[15px] font-semibold text-text no-underline transition-colors duration-300 hover:text-accent"
              >
                Book a Call
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ══════ STATS BAR ══════ */}
      <section className="py-16 max-md:py-10">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <div className="grid grid-cols-3 gap-px bg-border border border-border rounded-[20px] overflow-hidden max-md:grid-cols-1">
              {[
                { value: "75%", label: "of consumers judge a company by its website" },
                { value: "3 sec", label: "before a visitor decides to stay or bounce" },
                { value: "4x", label: "more leads from a conversion-optimized site" },
              ].map((stat, i) => (
                <div key={i} className="bg-surface p-8 text-center">
                  <div className="text-3xl font-black text-accent tracking-[-1px] mb-1">{stat.value}</div>
                  <p className="text-[13px] text-text-dim leading-[1.5]">{stat.label}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ══════ WHAT YOU GET ══════ */}
      <section className="py-30 max-md:py-20 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">Three tiers</p>
            <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
              Pick the site that fits<br />your business <span className="text-accent">right now.</span>
            </h2>
          </RevealOnScroll>
          <div className="grid grid-cols-3 gap-6 mt-16 max-lg:grid-cols-1">
            {webTiers.map((tier) => (
              <RevealOnScroll key={tier.id}>
                <div className={`accent-top-hover bg-surface border rounded-[20px] p-8 transition-all duration-400 hover:bg-[#121212] h-full ${tier.featured ? "border-accent-border" : "border-border"}`}>
                  <h3 className="text-xl font-bold mb-2 tracking-[-0.3px]">{tier.name}</h3>
                  <p className="text-[14px] text-accent font-semibold mb-3">{tier.monthly}/mo &middot; {tier.setup} setup</p>
                  <p className="text-sm text-text-dim leading-[1.7] mb-4">{tier.bestFor}</p>
                  <div className="flex items-center gap-2 text-[13px] text-text-mid">
                    <span className="font-semibold text-text">{tier.pages}</span>
                    <span className="text-white-15">|</span>
                    <span>CRM: {tier.crm}</span>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ PRICING CARDS ══════ */}
      <section id="pricing" className="py-30 max-md:py-20 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <div className="text-center">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">Pricing</p>
              <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
                Transparent pricing.<br />No surprises.
              </h2>
            </div>
          </RevealOnScroll>

          {/* Cards */}
          <RevealOnScroll>
            <div className="grid grid-cols-3 gap-7 mt-16 items-start max-lg:grid-cols-1 max-lg:max-w-[440px] max-lg:mx-auto">
              {webTiers.map((tier) => (
                <div key={tier.id} className={tier.featured ? "scale-[1.03] z-10 max-lg:scale-100" : ""}>
                  <PricingCard tier={tier} />
                </div>
              ))}
            </div>
          </RevealOnScroll>

          {/* Stripe Add-on */}
          <RevealOnScroll>
            <div className="mt-10 bg-surface border border-border rounded-[20px] p-7 px-8 flex items-center gap-6 max-md:flex-col max-md:text-center">
              <div className="w-12 h-12 rounded-[12px] bg-accent-dim text-accent flex items-center justify-center shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="4" width="22" height="16" rx="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-1 tracking-[-0.3px]">Add-on: {stripeAddon.name}</h3>
                <p className="text-[14px] text-text-dim leading-[1.6]">{stripeAddon.description}</p>
              </div>
              <div className="text-right max-md:text-center shrink-0">
                <p className="text-xl font-black text-accent tracking-[-0.5px]">{stripeAddon.setup} setup</p>
                <p className="text-[13px] text-text-dim">+ {stripeAddon.monthly} maintenance</p>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="text-center text-[13px] text-text-dim mt-6">
              All tiers are month-to-month. No long-term contracts. Cancel anytime.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ══════ FEATURE COMPARISON ══════ */}
      <section className="py-30 max-md:py-20 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6 max-md:px-4">
          <RevealOnScroll>
            <div className="text-center">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">Compare tiers</p>
              <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
                Everything at a glance.
              </h2>
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <ComparisonTable
              tiers={webComparisonTiers}
              categories={webFeatures}
              highlightCol={1}
            />
          </RevealOnScroll>
        </div>
      </section>

      {/* ══════ UPGRADE NUDGE ══════ */}
      <section className="py-20 max-md:py-14">
        <div className="max-w-[640px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <div className="bg-surface border border-border rounded-[24px] p-10 max-md:p-7 text-center transition-all duration-400 hover:border-border-hover">
              <span className="inline-block text-[11px] font-bold tracking-[0.1em] uppercase text-accent bg-accent-dim px-3 py-1 rounded-full mb-5">
                Need more than a website?
              </span>
              <h3 className="text-[clamp(22px,3vw,28px)] font-extrabold leading-[1.15] tracking-[-0.8px] mb-4">
                Ready for the full<br />marketing engine?
              </h3>
              <p className="text-[15px] text-text-dim leading-[1.7] mb-7 max-w-[480px] mx-auto">
                Our packages combine your website with SEO, paid ads, reputation management, content, and a dedicated lead team, everything you need to dominate your market.
              </p>
              <Link
                href="/packages"
                className="btn-primary-hover inline-flex items-center gap-2.5 bg-accent text-black px-8 py-3.5 rounded-full text-[15px] font-bold no-underline transition-all duration-300 tracking-[-0.01em]"
              >
                See Packages
                <ArrowIcon />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ══════ HOW IT WORKS ══════ */}
      <section className="py-30 max-md:py-20 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <div className="text-center">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">How it works</p>
              <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
                From call to launch<br />in 2–4 weeks.
              </h2>
            </div>
          </RevealOnScroll>
          <div className="grid grid-cols-4 gap-px bg-border border border-border rounded-[20px] overflow-hidden mt-16 max-lg:grid-cols-2 max-md:grid-cols-1">
            {[
              { num: 1, title: "Discovery Call", body: "We learn your business, your customers, and what your website needs to accomplish." },
              { num: 2, title: "Design & Strategy", body: "We design your site layout, content structure, and conversion flow, then you approve before we build." },
              { num: 3, title: "Build & Test", body: "We build your site with clean code, fast load times, and mobile-first design. You review and we refine." },
              { num: 4, title: "Launch & Support", body: "Your site goes live. We handle hosting, updates, and maintenance every month." },
            ].map((step) => (
              <RevealOnScroll key={step.num} className="bg-surface p-10 px-7 text-center transition-[background] duration-400 hover:bg-[#121212] group">
                <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center text-[22px] font-black text-accent mx-auto mb-5 transition-all duration-300 group-hover:border-accent-border-dim group-hover:bg-accent-dim group-hover:shadow-[0_0_24px_rgba(74,222,128,0.1)]">
                  {step.num}
                </div>
                <h3 className="text-base font-bold mb-2 tracking-[-0.2px]">{step.title}</h3>
                <p className="text-[13px] text-text-dim leading-[1.7]">{step.body}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ APPLICATION FORM ══════ */}
      <section id="apply" className="py-30 max-md:py-20 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">Get started</p>
              <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
                Ready to build your<br /><span className="text-accent">new website?</span>
              </h2>
              <p className="text-[17px] text-text-dim leading-[1.7] max-w-[540px] mx-auto">
                Fill out the short form below and we&apos;ll respond within 1 business day with next steps.
              </p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <ApplicationForm />
          </RevealOnScroll>
        </div>
      </section>

      {/* ══════ FINAL CTA ══════ */}
      <section className="py-40 max-md:py-20 text-center relative overflow-hidden border-t border-border">
        <div className="cta-glow" />
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 relative z-2">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">Not sure which tier?</p>
          </RevealOnScroll>
          <RevealOnScroll>
            <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
              Let&apos;s figure it out<br /><span className="text-accent">together.</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll>
            <p className="text-[17px] text-text-dim leading-[1.7] max-w-[540px] mx-auto mb-8">
              We&apos;ll review your current site and send you a personalized Loom video with recommendations. No strings attached.
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <Link
              href="/contact"
              className="btn-primary-hover inline-flex items-center gap-2.5 bg-accent text-black px-9 py-4 rounded-full text-[15px] font-bold no-underline transition-all duration-300 tracking-[-0.01em]"
            >
              Get Your Free Marketing Audit
              <ArrowIcon />
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
