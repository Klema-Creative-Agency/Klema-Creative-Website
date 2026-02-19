"use client";

import { useEffect, useRef, useState } from "react";

export default function SplitHeading() {
  const ref = useRef<HTMLHeadingElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <h2
      ref={ref}
      className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4 overflow-hidden pb-1"
    >
      <span
        className="inline-block"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateX(0)" : "translateX(-60px)",
          transition: "opacity 1.6s cubic-bezier(0.22, 1, 0.36, 1), transform 1.6s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        The Klema Creative
      </span>
      <br />
      <span
        className="inline-block text-accent"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateX(0)" : "translateX(60px)",
          transition: "opacity 1.6s cubic-bezier(0.22, 1, 0.36, 1) 0.3s, transform 1.6s cubic-bezier(0.22, 1, 0.36, 1) 0.3s",
        }}
      >
        growth engine.
      </span>
    </h2>
  );
}
