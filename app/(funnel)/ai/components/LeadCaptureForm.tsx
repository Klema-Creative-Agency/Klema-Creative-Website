"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import type { FunnelNiche } from "../data/funnel-content";
import { useMetaPixel } from "../hooks/useMetaPixel";

const BUSINESS_TYPES = [
  "HVAC",
  "Roofing",
  "Plumbing",
  "Electrical",
  "Cleaning",
  "Landscaping",
  "Dental",
  "Auto Repair",
  "Pest Control",
  "Other",
];

export default function LeadCaptureForm({ niche }: { niche: FunnelNiche }) {
  const router = useRouter();
  const { trackEvent } = useMetaPixel();
  const formStarted = useRef(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    businessType: "",
    city: "",
  });

  function handleFocus() {
    if (!formStarted.current) {
      formStarted.current = true;
      trackEvent("FormStart", { form_type: "lead_capture" });
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/funnel-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          niche: niche.slug,
          source: "ai-funnel",
        }),
      });

      if (!res.ok) throw new Error("Submission failed");

      trackEvent("Lead", { content_name: "ai_funnel_lead" });
      router.push("/ai/thank-you");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again or call us directly.");
    }
  }

  const inputClass =
    "w-full bg-surface border border-border rounded-xl px-4 py-3.5 text-[16px] text-text placeholder:text-text-dim focus:outline-none focus:border-accent-border transition-colors";

  return (
    <section className="py-20 max-md:py-14 border-t border-border">
      <div className="max-w-[500px] mx-auto px-8 max-md:px-5">
        <div className="text-center mb-8">
          <h2 className="text-[clamp(22px,5vw,32px)] font-extrabold leading-[1.15] tracking-[-1px] mb-3">
            Check Your Area Availability
          </h2>
          <p className="text-[15px] text-text-dim leading-[1.6]">
            Fill out the form below and we will reach out within 1 business day
            to schedule your free strategy call.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            required
            placeholder="Your name *"
            value={form.name}
            onChange={handleChange}
            onFocus={handleFocus}
            className={inputClass}
          />
          <input
            type="tel"
            name="phone"
            required
            placeholder="Phone number *"
            value={form.phone}
            onChange={handleChange}
            onFocus={handleFocus}
            className={inputClass}
          />
          <select
            name="businessType"
            required
            value={form.businessType}
            onChange={handleChange}
            onFocus={handleFocus}
            className={`${inputClass} ${
              !form.businessType ? "text-text-dim" : ""
            }`}
          >
            <option value="" disabled>
              Business type *
            </option>
            {BUSINESS_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="city"
            required
            placeholder="City / service area *"
            value={form.city}
            onChange={handleChange}
            onFocus={handleFocus}
            className={inputClass}
          />

          {errorMsg && (
            <p className="text-[13px] text-red text-center">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full bg-accent text-black py-4 rounded-full font-semibold text-[16px] transition-all duration-300 btn-primary-hover disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {status === "submitting" ? "Submitting..." : "Check Availability"}
          </button>

          <p className="text-[12px] text-text-dim text-center">
            No spam. No obligation. We will only use this to contact you about
            your inquiry.
          </p>
        </form>
      </div>
    </section>
  );
}
