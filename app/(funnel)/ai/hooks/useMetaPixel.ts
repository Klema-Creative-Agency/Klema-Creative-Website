"use client";

import { useCallback } from "react";

const CONSENT_KEY = "klema_funnel_consent";

export function useMetaPixel() {
  const trackEvent = useCallback(
    (eventName: string, params?: Record<string, unknown>) => {
      if (typeof window === "undefined") return;
      if (localStorage.getItem(CONSENT_KEY) !== "accepted") return;
      if (!window.fbq) return;

      // Standard events use "track", custom events use "trackCustom"
      const standardEvents = [
        "PageView",
        "ViewContent",
        "InitiateCheckout",
        "Lead",
        "CompleteRegistration",
      ];
      const method = standardEvents.includes(eventName)
        ? "track"
        : "trackCustom";

      window.fbq(method, eventName, params);
    },
    []
  );

  const trackCTA = useCallback(
    (location: string) => {
      trackEvent("InitiateCheckout", { cta_location: location });
    },
    [trackEvent]
  );

  return { trackEvent, trackCTA };
}
