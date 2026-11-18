"use client";

import { useEffect, useRef } from "react";
import { useMetaPixel } from "../hooks/useMetaPixel";

const STAGE_KEY = "klema_funnel_deepest_stage";

export default function FunnelTracker() {
  const { trackEvent } = useMetaPixel();
  const trackedStages = useRef(new Set<string>());

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(
      "[data-funnel-stage]"
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target as HTMLElement;
          const stageNum = el.dataset.funnelStage;
          const stageName = el.dataset.stageName;
          if (!stageNum || !stageName) return;
          if (trackedStages.current.has(stageNum)) return;

          trackedStages.current.add(stageNum);

          // Fire custom pixel event
          trackEvent("FunnelStage", {
            stage_number: Number(stageNum),
            stage_name: stageName,
          });

          // Track deepest stage in localStorage for retargeting tiers
          const current = Number(localStorage.getItem(STAGE_KEY) || "0");
          const next = Number(stageNum);
          if (next > current) {
            localStorage.setItem(STAGE_KEY, String(next));
          }

          // Fire standard events for key stages
          if (stageName === "hero") {
            trackEvent("ViewContent", { content_name: "funnel_hero" });
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [trackEvent]);

  return null;
}
