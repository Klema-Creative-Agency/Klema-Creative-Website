"use client";

import { useState, useEffect } from "react";

const CONSENT_KEY = "klema_funnel_consent";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      // Small delay so the banner doesn't flash on load
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setShow(false);
    // Dispatch event so MetaPixel can initialize
    window.dispatchEvent(new Event("funnel-consent-accepted"));
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, "declined");
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6">
      <div className="max-w-[500px] mx-auto bg-card border border-border rounded-xl p-5 shadow-2xl">
        <p className="text-[14px] text-text-mid leading-[1.6] mb-4">
          We use cookies to measure ad performance and improve your experience.
          No personal data is sold.
        </p>
        <div className="flex gap-3">
          <button
            onClick={accept}
            className="flex-1 bg-accent text-black py-2.5 rounded-full font-semibold text-[14px] transition-all duration-300 cursor-pointer"
          >
            Accept
          </button>
          <button
            onClick={decline}
            className="flex-1 bg-surface border border-border py-2.5 rounded-full font-semibold text-[14px] text-text-dim transition-all duration-300 cursor-pointer"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
