"use client";

import { useEffect } from "react";
import { useMetaPixel } from "../hooks/useMetaPixel";

export default function ThankYouPage() {
  const { trackEvent } = useMetaPixel();

  // Hide global nav/footer
  useEffect(() => {
    document.body.classList.add("vsl-page");
    return () => document.body.classList.remove("vsl-page");
  }, []);

  // Fire CompleteRegistration pixel event
  useEffect(() => {
    trackEvent("CompleteRegistration");
  }, [trackEvent]);

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-8 max-md:px-5">
      <div className="max-w-[500px] text-center">
        {/* Checkmark */}
        <div className="w-20 h-20 rounded-full bg-accent-dim border border-accent-border flex items-center justify-center mx-auto mb-6">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-accent"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="text-[clamp(24px,5vw,36px)] font-extrabold leading-[1.15] tracking-[-1px] mb-4">
          You Are In. We Will Be in Touch.
        </h1>
        <p className="text-[16px] text-text-dim leading-[1.7] mb-6">
          We received your information and will reach out within 1 business day
          to schedule your free strategy call. Keep an eye on your phone.
        </p>

        <div className="bg-surface border border-border rounded-xl p-5 text-left space-y-3">
          <p className="text-[14px] text-text-mid font-semibold">
            What happens next:
          </p>
          {[
            "We review your market and service area",
            "We check zip code availability in your area",
            "We schedule a quick strategy call to map out your campaign",
            "If it is a good fit, we launch within 7 days",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-accent text-black text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="text-[14px] text-text-dim leading-[1.6]">{step}</p>
            </div>
          ))}
        </div>

        {/* Minimal footer */}
        <p className="text-[12px] text-text-dim mt-12">
          &copy; {new Date().getFullYear()} Klema Creative. All rights reserved.
        </p>
      </div>
    </div>
  );
}
