"use client";

import { useState, useEffect } from "react";

export default function StickyMobileCTA({ ctaText }: { ctaText: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const formEl = document.getElementById("lead-form");
    if (!formEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hide when form is in view, show otherwise (after scrolling past hero)
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(formEl);

    // Only show after scrolling past 400px
    function handleScroll() {
      if (window.scrollY < 400) setVisible(false);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="bg-bg/95 backdrop-blur-md border-t border-border px-5 py-3">
        <a
          href="#lead-form"
          className="block w-full bg-accent text-black py-3.5 rounded-full font-semibold text-[15px] text-center transition-all duration-300"
        >
          {ctaText}
        </a>
      </div>
    </div>
  );
}
