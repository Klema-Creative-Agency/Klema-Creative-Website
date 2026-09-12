import { useEffect, useRef, useState } from "react";

/**
 * Scroll-reveal hook. Hardened 2026-09-12:
 * - threshold 0.05 so tall containers reveal as soon as they enter the viewport
 * - reveals immediately if the element is already on screen at mount (anchor jumps, refresh mid-page)
 * - respects prefers-reduced-motion (reveals at once)
 * - 4s safety timer so content can never stay invisible if the observer never fires
 */
export function useReveal(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -5% 0px" }
    );
    observer.observe(el);

    const safety = window.setTimeout(() => {
      setVisible(true);
      observer.disconnect();
    }, 4000);

    return () => {
      observer.disconnect();
      window.clearTimeout(safety);
    };
  }, [threshold]);

  return { ref, visible };
}
