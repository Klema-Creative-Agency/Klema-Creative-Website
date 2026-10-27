"use client";

import { useEffect, useRef } from "react";
import { useMetaPixel } from "./useMetaPixel";

/**
 * Hook to track when a specific section becomes visible.
 * Returns a ref to attach to the section element.
 */
export function useFunnelTracking(stageName: string, stageNumber: number) {
  const ref = useRef<HTMLDivElement>(null);
  const tracked = useRef(false);
  const { trackEvent } = useMetaPixel();

  useEffect(() => {
    const el = ref.current;
    if (!el || tracked.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked.current) {
          tracked.current = true;
          trackEvent("FunnelStage", {
            stage_number: stageNumber,
            stage_name: stageName,
          });
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [stageName, stageNumber, trackEvent]);

  return ref;
}
