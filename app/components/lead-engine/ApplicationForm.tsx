"use client";

import { useState, FormEvent } from "react";

/** Application form that submits to /api/lead-engine-booking */
export default function ApplicationForm({
  niche,
  serviceName,
  source,
}: {
  niche: string;
  serviceName: string;
  source: "service-page" | "vsl-page";
}) {
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
      marketingSpend: data.get("marketingSpend") as string,
      frustration: data.get("frustration") as string,
      niche,
      source,
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

  return (
    <section id="apply" className="border-t border-border py-30 max-md:py-20">
      <div className="max-w-[560px] mx-auto px-8 max-md:px-5">
        <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
          Apply now
        </p>
        <h2 className="text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
          Ready to stop overpaying<br />for leads?
        </h2>
        <p className="text-[15px] text-text-dim leading-[1.7] mb-10">
          Fill out this short application. Two minutes. We review every one and respond within 1 business day.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <input
              name="firstName"
              required
              placeholder="First name *"
              className="bg-surface border border-border rounded-xl px-4 py-3.5 text-sm text-text placeholder:text-text-dim outline-none transition-colors duration-200 focus:border-accent-border"
            />
            <input
              name="lastName"
              required
              placeholder="Last name *"
              className="bg-surface border border-border rounded-xl px-4 py-3.5 text-sm text-text placeholder:text-text-dim outline-none transition-colors duration-200 focus:border-accent-border"
            />
          </div>
          <input
            name="businessName"
            required
            placeholder="Business name *"
            className="bg-surface border border-border rounded-xl px-4 py-3.5 text-sm text-text placeholder:text-text-dim outline-none transition-colors duration-200 focus:border-accent-border"
          />
          <input
            name="city"
            required
            placeholder="City / Service area *"
            className="bg-surface border border-border rounded-xl px-4 py-3.5 text-sm text-text placeholder:text-text-dim outline-none transition-colors duration-200 focus:border-accent-border"
          />
          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <input
              name="phone"
              type="tel"
              required
              placeholder="Phone *"
              className="bg-surface border border-border rounded-xl px-4 py-3.5 text-sm text-text placeholder:text-text-dim outline-none transition-colors duration-200 focus:border-accent-border"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email *"
              className="bg-surface border border-border rounded-xl px-4 py-3.5 text-sm text-text placeholder:text-text-dim outline-none transition-colors duration-200 focus:border-accent-border"
            />
          </div>
          <select
            name="marketingSpend"
            required
            defaultValue=""
            className="bg-surface border border-border rounded-xl px-4 py-3.5 text-sm text-text-dim outline-none transition-colors duration-200 focus:border-accent-border appearance-none"
          >
            <option value="" disabled>
              Current monthly marketing spend *
            </option>
            <option value="$0 – $1,000">$0 – $1,000</option>
            <option value="$1,000 – $3,000">$1,000 – $3,000</option>
            <option value="$3,000 – $5,000">$3,000 – $5,000</option>
            <option value="$5,000 – $10,000">$5,000 – $10,000</option>
            <option value="$10,000+">$10,000+</option>
          </select>
          <textarea
            name="frustration"
            rows={3}
            placeholder="What's your biggest frustration with getting leads right now? (optional)"
            className="bg-surface border border-border rounded-xl px-4 py-3.5 text-sm text-text placeholder:text-text-dim outline-none transition-colors duration-200 focus:border-accent-border resize-none"
          />

          {status === "error" && (
            <p className="text-sm text-red">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="btn-primary-hover w-full py-4 rounded-full text-[15px] font-bold text-center transition-all duration-300 bg-accent text-black tracking-[-0.01em] hover:shadow-[0_0_32px_rgba(74,222,128,0.3)] hover:-translate-y-px disabled:opacity-60 disabled:pointer-events-none mt-2"
          >
            {status === "submitting"
              ? "Submitting..."
              : `Apply for ${serviceName} \u2192`}
          </button>
          <p className="text-[11px] text-text-dim text-center">
            No commitment. No spam. We respond within 1 business day.
          </p>
        </form>
      </div>
    </section>
  );
}
