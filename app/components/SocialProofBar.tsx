"use client";

import { useEffect, useRef, useState } from "react";

function CountUp({
  value,
  suffix,
  prefix,
  start,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  start: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number;
    let rafId: number;
    const duration = 1800;

    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [start, value]);

  return (
    <span>
      {prefix}
      {start ? display : 0}
      {suffix}
    </span>
  );
}

const metrics = [
  { value: 50, suffix: "+", label: "Clients Served" },
  { value: 4.9, suffix: "", label: "Google Rating", isDecimal: true },
  { value: 2, prefix: "$", suffix: "M+", label: "Revenue Generated" },
  { value: 60, suffix: "s", label: "Response Time" },
];

export default function SocialProofBar() {
  const ref = useRef<HTMLDivElement>(null);
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
    <section
      ref={ref}
      className="bg-surface border-t border-b border-border py-6"
    >
      <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
        <div className="grid grid-cols-4 gap-6 max-md:grid-cols-2 max-md:gap-4">
          {metrics.map((m, i) => (
            <div key={i} className="text-center">
              <div
                className="text-[28px] font-black tracking-[-1px] leading-none mb-1"
                style={{
                  background:
                    "linear-gradient(to bottom, #4ade80 0%, rgba(74,222,128,0.4) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {m.isDecimal ? (
                  <span>{inView ? "4.9" : "0"}</span>
                ) : (
                  <CountUp
                    value={m.value}
                    suffix={m.suffix}
                    prefix={m.prefix}
                    start={inView}
                  />
                )}
              </div>
              <p className="text-[13px] text-text-dim tracking-[0.02em]">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
