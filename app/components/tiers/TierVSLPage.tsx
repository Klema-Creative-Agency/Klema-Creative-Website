"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import type { TierData } from "@/app/data/tiers";

/** VSL landing page for a tier — minimal nav, urgency bar, video placeholder, proof points, application form */
export default function TierVSLPage({ tier }: { tier: TierData }) {
  // Hide the global Navbar and Footer on VSL pages
  useEffect(() => {
    document.body.classList.add("vsl-page");
    return () => document.body.classList.remove("vsl-page");
  }, []);

  return (
    <div className="min-h-screen bg-bg">
      {/* URGENCY TOP BAR */}
      <div className="bg-accent text-black text-center py-2.5 px-4 text-[13px] font-bold tracking-[0.02em]">
        Only 3 {tier.name} spots available this month
      </div>

      {/* MINIMAL NAV */}
      <nav className="py-5 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <Link
            href="/"
            className="text-[22px] font-bold text-text no-underline tracking-[-0.4px] flex items-center gap-2.5"
          >
            <span className="logo-dot" />
            klema creative
          </Link>
        </div>
      </nav>

      {/* HERO + VIDEO */}
      <section className="pt-20 pb-16 max-md:pt-14 max-md:pb-10">
        <div className="max-w-[800px] mx-auto px-8 max-md:px-5 text-center">
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
            {tier.name} — Tier {tier.tierNumber}
          </p>
          <h1 className="text-[clamp(28px,4.5vw,48px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-5">
            {tier.vslHeadline}
          </h1>
          <p className="text-[17px] text-text-dim leading-[1.7] max-w-[560px] mx-auto mb-10">
            {tier.vslSub}
          </p>

          {/* VIDEO CONTAINER — Replace with Loom/YouTube embed */}
          <div className="relative w-full aspect-video rounded-[20px] overflow-hidden border border-border bg-surface mb-6">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 rounded-full bg-accent/20 border border-accent-border flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-accent ml-1">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <p className="text-sm text-text-dim">
                Video walkthrough coming soon
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF POINTS */}
      <section className="border-t border-border py-12 max-md:py-8">
        <div className="max-w-[700px] mx-auto px-8 max-md:px-5">
          <div className="flex flex-col gap-4">
            {tier.proofPoints.map((point, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-accent-dim border border-accent-border flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-accent">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-[14px] text-text-mid leading-[1.6]">
                  {point.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING STRIP */}
      <section className="border-t border-border py-12 max-md:py-8">
        <div className="max-w-[700px] mx-auto px-8 max-md:px-5 text-center">
          <div className="flex items-baseline justify-center gap-2 mb-1">
            <span className="text-[clamp(32px,4vw,44px)] font-black tracking-[-1.5px] text-text">
              {tier.price}
            </span>
            <span className="text-[15px] text-text-dim">/month</span>
          </div>
          <p className="text-sm text-text-dim">
            {tier.setupFee} one-time setup &middot; Month-to-month, cancel anytime
          </p>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <VSLApplicationForm tier={tier} />

      {/* MINIMAL FOOTER */}
      <footer className="border-t border-border py-8">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 text-center">
          <p className="text-[12px] text-text-dim">
            &copy; {new Date().getFullYear()} Klema Creative. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ---------- VSL Application Form ---------- */

function VSLApplicationForm({ tier }: { tier: TierData }) {
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
      source: `vsl-${tier.slug}`,
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
      <section id="apply" className="py-20 max-md:py-14">
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
    <section id="apply" className="border-t border-border py-20 max-md:py-14">
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
