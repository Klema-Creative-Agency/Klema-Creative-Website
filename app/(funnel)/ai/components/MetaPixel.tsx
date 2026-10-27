"use client";

import { useEffect } from "react";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const CONSENT_KEY = "klema_funnel_consent";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

function initPixel() {
  if (!PIXEL_ID || typeof window === "undefined") return;
  if (typeof window.fbq === "function") return;

  /* Meta Pixel base code (matches official snippet) */
  const f: any = (window.fbq = function () { // eslint-disable-line @typescript-eslint/no-explicit-any
    f.callMethod
      ? f.callMethod.apply(f, arguments) // eslint-disable-line prefer-rest-params
      : f.queue.push(arguments); // eslint-disable-line prefer-rest-params
  });
  window._fbq = f;
  f.push = f;
  f.loaded = true;
  f.version = "2.0";
  f.queue = [];

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  window.fbq("init", PIXEL_ID);
  window.fbq("track", "PageView");
}

export default function MetaPixel() {
  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent === "accepted") {
      initPixel();
    }

    function onConsent() {
      initPixel();
    }
    window.addEventListener("funnel-consent-accepted", onConsent);
    return () =>
      window.removeEventListener("funnel-consent-accepted", onConsent);
  }, []);

  return null;
}
