"use client";

import { useEffect, useRef, useState } from "react";
import type { PainStat } from "@/app/data/niches";

/** Animated count-up stats bar displaying 3 pain statistics */
export default function StatsBar({
  stats,
}: {
  stats: [PainStat, PainStat, PainStat];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="grid grid-cols-3 gap-px bg-border border border-border rounded-[20px] overflow-hidden max-md:grid-cols-1"
    >
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-surface p-8 px-7 text-center transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transitionDelay: `${i * 150}ms`,
          }}
        >
          <div className="text-[clamp(28px,3.5vw,40px)] font-black tracking-[-1.5px] text-accent leading-none mb-2">
            {stat.value}
          </div>
          <p className="text-[13px] text-text-dim leading-[1.5]">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
