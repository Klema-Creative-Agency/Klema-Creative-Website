"use client";
import { useState, useEffect } from "react";

const SIZE = 160;
const STROKE = 10;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function getColor(score: number, total: number) {
  const ratio = score / total;
  if (ratio <= 0.33) return "var(--color-red)";
  if (ratio <= 0.66) return "var(--color-amber)";
  return "var(--color-accent)";
}

function getGlow(score: number, total: number) {
  const ratio = score / total;
  if (ratio <= 0.33) return "rgba(248,113,113,0.25)";
  if (ratio <= 0.66) return "rgba(251,191,36,0.25)";
  return "rgba(74,222,128,0.25)";
}

export default function VisibilityScoreRing({
  score,
  total = 5,
}: {
  score: number;
  total?: number;
}) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const duration = 1200;
    const start = performance.now();
    let frame: number;

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(eased * score));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [score]);

  const offset = CIRCUMFERENCE - (animatedScore / total) * CIRCUMFERENCE;
  const color = getColor(score, total);
  const glow = getGlow(score, total);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative transition-[filter] duration-600"
        style={{
          width: SIZE,
          height: SIZE,
          filter: mounted ? `drop-shadow(0 0 20px ${glow})` : "none",
        }}
      >
        <svg
          width={SIZE}
          height={SIZE}
          style={{ transform: "rotate(-90deg)" }}
        >
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={STROKE}
          />
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke={color}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            className="transition-all duration-1200"
            style={{
              transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
            }}
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div
            className="text-[44px] font-black leading-none tracking-[-2px] transition-colors duration-400"
            style={{ color }}
          >
            {animatedScore}
          </div>
          <div className="text-sm text-text-dim font-semibold mt-0.5">
            / {total}
          </div>
        </div>
      </div>
      <div
        className="text-[13px] font-bold tracking-[0.1em] uppercase transition-colors duration-400"
        style={{ color }}
      >
        AI Visibility Score
      </div>
    </div>
  );
}
