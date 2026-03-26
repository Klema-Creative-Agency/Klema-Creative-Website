"use client";

import { useState, useEffect } from "react";

export default function HomeBackground() {
  const [opacity, setOpacity] = useState(0.05);

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      const maxScroll = 2000;
      const minOpacity = 0.45;
      const maxOpacity = 0.6;
      const progress = Math.min(scrollY / maxScroll, 1);
      setOpacity(minOpacity + progress * (maxOpacity - minOpacity));
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] transition-opacity duration-300"
      style={{ opacity }}
    >
      <div className="funnel-gradient-mesh" style={{ opacity: 0.4 }} />
      <div className="funnel-dot-grid" />
    </div>
  );
}
