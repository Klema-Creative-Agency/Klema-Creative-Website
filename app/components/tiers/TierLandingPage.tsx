"use client";

import Link from "next/link";
import type { TierData } from "@/app/data/tiers";
import RevealOnScroll from "@/app/components/RevealOnScroll";

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-accent">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/** Full landing page for a tier — renders all sections from TierData */
export default function TierLandingPage({ tier, children }: { tier: TierData; children?: React.ReactNode }) {
  return (
    <>
      {/* HERO */}
      <section className="pt-[140px] pb-20 max-md:pb-14 relative overflow-hidden">
        <div className="hero-glow hero-glow-breathe" />
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 relative z-2">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
              {tier.name} — Tier {tier.tierNumber}
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <h1 className="text-[clamp(36px,5.5vw,64px)] font-extrabold leading-[1.05] tracking-[-2px] mb-6 max-w-[800px] whitespace-pre-line">
              {tier.headline}
            </h1>
          </RevealOnScroll>
          <RevealOnScroll>
            <p className="text-[17px] text-text-dim leading-[1.7] max-w-[600px] mb-4">
              {tier.sub}
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <p className="text-[13px] text-accent/70 font-semibold mb-10">
              {tier.includesPrevious}
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="flex items-center gap-4 flex-wrap">
              <a
                href="#apply"
                className="btn-primary-hover inline-flex items-center gap-2.5 bg-accent text-black px-9 py-4 rounded-full text-[15px] font-bold no-underline transition-all duration-300 tracking-[-0.01em]"
              >
                Apply for {tier.name}
                <ArrowIcon />
              </a>
              <Link
                href={`/services/${tier.slug}/watch`}
                className="btn-secondary-arrow inline-flex items-center gap-2 text-[15px] font-semibold text-text no-underline transition-colors duration-300 hover:text-accent"
              >
                Watch the Walkthrough
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-300">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </RevealOnScroll>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-bg pointer-events-none z-[1]" />
      </section>

      {/* STATS BAR */}
      <section className="py-16 max-md:py-10">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <div className="grid grid-cols-3 gap-px bg-border border border-border rounded-[20px] overflow-hidden max-md:grid-cols-1">
            {tier.stats.map((stat, i) => (
              <RevealOnScroll key={i}>
                <div className="bg-surface p-8 px-7 text-center">
                  <div className="text-[clamp(28px,3.5vw,40px)] font-black tracking-[-1.5px] text-accent leading-none mb-2">
                    {stat.value}
                  </div>
                  <p className="text-[13px] text-text-dim leading-[1.5]">
                    {stat.label}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="py-30 max-md:py-20">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
              The problem
            </p>
            <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
              Sound familiar?
            </h2>
            <p className="text-[17px] text-text-dim leading-[1.7] max-w-[540px] mb-16">
              These are the problems we hear from business owners every single week.
            </p>
          </RevealOnScroll>
          <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
            {tier.painPoints.map((p, i) => (
              <RevealOnScroll key={i}>
                <div className="accent-line-hover bg-surface border border-border rounded-[20px] p-8 transition-all duration-400 hover:border-border-hover hover:bg-[#121212] h-full">
                  <div className="text-3xl mb-4">{p.icon}</div>
                  <h3 className="text-[17px] font-bold mb-2.5 tracking-[-0.2px]">
                    {p.title}
                  </h3>
                  <p className="text-sm text-text-dim leading-[1.7]">{p.body}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="py-30 max-md:py-20 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
              What you get
            </p>
            <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
              Everything included in {tier.name}.
            </h2>
            <p className="text-[17px] text-text-dim leading-[1.7] max-w-[540px] mb-16">
              {tier.price}/mo &middot; {tier.setupFee} setup &middot; Month-to-month, cancel anytime.
            </p>
          </RevealOnScroll>
          <div className="grid grid-cols-2 gap-5 max-lg:grid-cols-1">
            {tier.deliverables.map((d, i) => (
              <RevealOnScroll key={i}>
                <div className="accent-top-hover bg-surface border border-border rounded-[20px] p-8 h-full">
                  <div className="w-10 h-10 rounded-xl bg-accent-dim border border-accent-border flex items-center justify-center mb-5">
                    <span className="text-accent text-sm font-bold">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="text-[17px] font-bold mb-2.5 tracking-[-0.2px]">
                    {d.title}
                  </h3>
                  <p className="text-sm text-text-dim leading-[1.7]">{d.body}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-30 max-md:py-20">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
              How it works
            </p>
            <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-16">
              Four steps. That&apos;s it.
            </h2>
          </RevealOnScroll>
          <div className="grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
            {tier.howItWorks.map((step) => (
              <RevealOnScroll key={step.num}>
                <div className="bg-surface border border-border rounded-[20px] p-8 h-full">
                  <div className="text-[clamp(36px,4vw,48px)] font-black text-accent/20 leading-none mb-4">
                    {String(step.num).padStart(2, "0")}
                  </div>
                  <h3 className="text-[17px] font-bold mb-2.5 tracking-[-0.2px]">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-dim leading-[1.7]">{step.body}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ROI SECTION */}
      <section className="py-30 max-md:py-20 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
              The math
            </p>
            <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-16 max-w-[700px]">
              {tier.roiHeadline}
            </h2>
          </RevealOnScroll>
          <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
            {tier.roiCards.map((card, i) => (
              <RevealOnScroll key={i}>
                <div className={`bg-surface border rounded-[20px] p-8 h-full ${i === 1 ? "border-accent/30 ring-1 ring-accent/10" : "border-border"}`}>
                  <p className="text-xs font-bold tracking-[0.15em] uppercase text-text-dim mb-3">
                    {card.label}
                  </p>
                  <div className="text-[clamp(28px,3.5vw,40px)] font-black tracking-[-1.5px] text-accent leading-none mb-4">
                    {card.value}
                  </div>
                  <p className="text-sm text-text-dim leading-[1.7]">{card.detail}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING + PROOF */}
      <section className="py-30 max-md:py-20">
        <div className="max-w-[800px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <div className="bg-surface border border-border rounded-[20px] p-10 max-md:p-7 text-center">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
                {tier.name} pricing
              </p>
              <div className="flex items-baseline justify-center gap-2 mb-1">
                <span className="text-[clamp(40px,5vw,56px)] font-black tracking-[-2px] text-text">
                  {tier.price}
                </span>
                <span className="text-[17px] text-text-dim">/month</span>
              </div>
              <p className="text-sm text-text-dim mb-8">
                {tier.setupFee} one-time setup &middot; Month-to-month, cancel anytime
              </p>

              <div className="text-left space-y-3 mb-8">
                {tier.proofPoints.map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent-dim border border-accent-border flex items-center justify-center shrink-0 mt-0.5">
                      <CheckIcon />
                    </div>
                    <p className="text-[14px] text-text-mid leading-[1.6]">
                      {point.text}
                    </p>
                  </div>
                ))}
              </div>

              <a
                href="#apply"
                className="btn-primary-hover inline-flex items-center gap-2.5 bg-accent text-black px-9 py-4 rounded-full text-[15px] font-bold no-underline transition-all duration-300 tracking-[-0.01em]"
              >
                Apply for {tier.name}
                <ArrowIcon />
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <TierApplicationForm tier={tier} />

      {/* OPTIONAL CHILDREN (e.g. BusinessesWeWorkWith) */}
      {children}

      {/* FINAL CTA */}
      <section className="py-40 text-center relative overflow-hidden">
        <div className="cta-glow" />
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 relative z-2">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
              {tier.name}
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
              {tier.ctaHeadline.split("?")[0]}
              <span className="text-accent">?</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll>
            <p className="text-[17px] text-text-dim leading-[1.7] max-w-[540px] mx-auto mb-12">
              {tier.ctaSub}
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <a
              href="#apply"
              className="btn-primary-hover inline-flex items-center gap-2.5 bg-accent text-black px-9 py-4 rounded-full text-[15px] font-bold no-underline transition-all duration-300 tracking-[-0.01em]"
            >
              Apply for {tier.name}
              <ArrowIcon />
            </a>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}

/* ---------- Tier Application Form ---------- */
/* Inline form component — same structure as the Lead Engine ApplicationForm
   but with tier-specific copy and field values */

import { useState, FormEvent } from "react";

function TierApplicationForm({ tier }: { tier: TierData }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const body = {
      firstName: data.get("firstName") as string,
      lastName: data.get("lastName") as string,
      businessName: data.get("businessName") as string,
      city: data.get("city") as string,
      phone: data.get("phone") as string,
      email: data.get("email") as string,
      leadSource: data.get("leadSource") as string,
      frustration: data.get("frustration") as string,
      niche: "general",
      source: `tier-${tier.slug}`,
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
      } else {
        setStatus("error");
        setErrorMsg(json.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <section id="apply" className="py-30 max-md:py-20">
        <div className="max-w-[560px] mx-auto px-8 max-md:px-5 text-center">
          <div className="w-16 h-16 rounded-full bg-accent-dim border border-accent-border flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-accent">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3 className="text-2xl font-extrabold tracking-[-0.5px] mb-3">
            Application received.
          </h3>
          <p className="text-[15px] text-text-dim leading-[1.7]">
            We&apos;ll review your application and reach out within 1 business day. Keep an eye on your email and phone.
          </p>
        </div>
      </section>
    );
  }

  const inputClass =
    "bg-surface border border-border rounded-xl px-4 py-3.5 text-sm text-text placeholder:text-text-dim outline-none transition-colors duration-200 focus:border-accent-border";

  return (
    <section id="apply" className="border-t border-border py-30 max-md:py-20">
      <div className="max-w-[560px] mx-auto px-8 max-md:px-5">
        <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
          Apply now
        </p>
        <h2 className="text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
          {tier.ctaHeadline}
        </h2>
        <p className="text-[15px] text-text-dim leading-[1.7] mb-10">
          Fill out this short application. Two minutes. We review every one and respond within 1 business day.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <input name="firstName" required placeholder="First name *" className={inputClass} />
            <input name="lastName" required placeholder="Last name *" className={inputClass} />
          </div>
          <input name="businessName" required placeholder="Business name *" className={inputClass} />
          <input name="city" required placeholder="City / Service area *" className={inputClass} />
          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <input name="phone" type="tel" required placeholder="Phone *" className={inputClass} />
            <input name="email" type="email" required placeholder="Email *" className={inputClass} />
          </div>
          <select
            name="leadSource"
            required
            defaultValue=""
            className="bg-surface border border-border rounded-xl px-4 py-3.5 text-sm text-text-dim outline-none transition-colors duration-200 focus:border-accent-border appearance-none"
          >
            <option value="" disabled>Where do most of your leads come from? *</option>
            <option value="Google / Search">Google / Search</option>
            <option value="Referrals / Word of Mouth">Referrals / Word of Mouth</option>
            <option value="Social Media">Social Media</option>
            <option value="Home service platforms (Angi, Thumbtack)">Home service platforms (Angi, Thumbtack)</option>
            <option value="Mix of sources">Mix of sources</option>
            <option value="Not sure">Not sure</option>
          </select>
          <textarea
            name="frustration"
            rows={3}
            placeholder="What's your biggest challenge with growing your business right now? (optional)"
            className={`${inputClass} resize-none`}
          />

          {status === "error" && (
            <p className="text-sm text-red">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="btn-primary-hover w-full py-4 rounded-full text-[15px] font-bold text-center transition-all duration-300 bg-accent text-black tracking-[-0.01em] hover:shadow-[0_0_32px_rgba(74,222,128,0.3)] hover:-translate-y-px disabled:opacity-60 disabled:pointer-events-none mt-2"
          >
            {status === "submitting" ? "Submitting..." : `Apply for ${tier.name} \u2192`}
          </button>
          <p className="text-[11px] text-text-dim text-center">
            No commitment. No spam. We respond within 1 business day.
          </p>
        </form>
      </div>
    </section>
  );
}
