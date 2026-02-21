"use client";

import { useEffect, useRef, useState } from "react";

const problems = [
  {
    value: 0,
    suffix: "%",
    title: "Invisible to AI",
    text: "40% of consumers now ask AI for business recommendations instead of Google. If you\u2019re not in the answers, your AI visibility is zero \u2014 and every lead goes to a competitor.",
  },
  {
    value: 78,
    suffix: "%",
    title: "Not enough leads",
    text: "78% of leads go to the first business that responds. If your website doesn\u2019t rank and your ads underperform, your competitors are eating your market share.",
  },
  {
    value: 5,
    suffix: "min",
    title: "No follow-up system",
    text: "After 5 minutes, your odds of contacting a lead drop by 80%. Leads come in but nobody responds fast enough \u2014 by the time you do, they\u2019ve hired someone else.",
  },
  {
    value: 5,
    suffix: "+",
    title: "Fragmented tools",
    text: "You\u2019re paying for 5+ marketing tools that don\u2019t talk to each other. No unified view, no real strategy \u2014 just wasted budget and missed opportunities.",
  },
];

function TickerNumber({
  value,
  suffix,
  start,
}: {
  value: number;
  suffix: string;
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
      {start ? display : 0}
      {suffix}
    </span>
  );
}

// Heading words with timing — "money" is flagged for emphasis
const LINE_1 = [
  { word: "Are", delay: 200 },
  { word: "you", delay: 300 },
  { word: "leaving", delay: 400 },
  { word: "money", delay: 520, emphasis: true },
];
const LINE_2 = [
  { word: "on", delay: 650 },
  { word: "the", delay: 730 },
  { word: "table?", delay: 830 },
];
// "money" emphasis kicks in after all words have landed
const EMPHASIS_DELAY = 1300;

// Stagger delays for each card (ms)
const CARD_DELAYS = [0, 600, 1200, 1800];

export default function ProblemSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [headerInView, setHeaderInView] = useState(false);
  const [gridInView, setGridInView] = useState(false);
  const [emphasize, setEmphasize] = useState(false);

  // Header observer — toggles in AND out on scroll
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        setHeaderInView(e.isIntersecting);
        if (!e.isIntersecting) setEmphasize(false);
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Trigger "money" emphasis after words land
  useEffect(() => {
    if (!headerInView) return;
    const t = setTimeout(() => setEmphasize(true), EMPHASIS_DELAY);
    return () => clearTimeout(t);
  }, [headerInView]);

  // Grid observer — one-shot
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setGridInView(true); obs.unobserve(el); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  function renderWord(w: { word: string; delay: number; emphasis?: boolean }, i: number) {
    const isMoneyWord = w.emphasis;
    return (
      <span
        key={i}
        className="inline-block"
        style={{
          opacity: headerInView ? 1 : 0,
          transform: headerInView ? "translateY(0)" : "translateY(12px)",
          filter: headerInView ? "blur(0)" : "blur(4px)",
          transition: `opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${w.delay}ms, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${w.delay}ms, filter 0.5s ease ${w.delay}ms, color 0.6s ease, text-shadow 0.6s ease`,
          color: isMoneyWord && emphasize ? "#4ade80" : undefined,
          textShadow: isMoneyWord && emphasize
            ? "0 0 20px rgba(74,222,128,0.5), 0 0 60px rgba(74,222,128,0.2)"
            : "none",
        }}
      >
        {w.word}{"\u00A0"}
      </span>
    );
  }

  return (
    <section id="problem-section" className="pt-52 pb-30 max-md:pt-36 max-md:pb-20">
      <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
        <div ref={headerRef} className="text-center mb-16">
          <p
            className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4"
            style={{
              opacity: headerInView ? 1 : 0,
              transition: "opacity 0.6s ease 0ms",
            }}
          >
            The problem
          </p>
          <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
            {LINE_1.map((w, i) => renderWord(w, i))}
            <br />
            {LINE_2.map((w, i) => renderWord(w, i + LINE_1.length))}
          </h2>
          <p
            className="text-[17px] text-text-dim leading-[1.7] max-w-[540px] mx-auto"
            style={{
              opacity: headerInView ? 1 : 0,
              transform: headerInView ? "translateY(0)" : "translateY(12px)",
              transition: "all 0.8s ease-out 1100ms",
            }}
          >
            Most businesses are invisible where it matters &mdash; to AI, to
            Google, and to the leads slipping through the cracks. We solve all
            three.
          </p>
        </div>

        {/* Accordion grid — cards fold out left to right */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 gap-3 max-md:grid-cols-1"
        >
          {problems.map((problem, i) => (
            <div
              key={i}
              className="accent-top-hover bg-surface border border-border rounded-2xl p-10 px-8 max-md:p-7 transition-[background] duration-400 hover:bg-[#121212]"
              style={{
                opacity: gridInView ? 1 : 0,
                transform: gridInView ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left center",
                transition: `opacity 0.8s ease ${CARD_DELAYS[i]}ms, transform 1s cubic-bezier(0.22, 1, 0.36, 1) ${CARD_DELAYS[i]}ms`,
              }}
            >
              <div
                style={{
                  opacity: gridInView ? 1 : 0,
                  transform: gridInView ? "translateX(0)" : "translateX(-24px)",
                  transition: `opacity 0.8s ease ${CARD_DELAYS[i] + 400}ms, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${CARD_DELAYS[i] + 400}ms`,
                }}
              >
                <div
                  className="text-[48px] font-black tracking-[-3px] leading-none mb-3"
                  style={{
                    background: "linear-gradient(to bottom, #4ade80 0%, rgba(74,222,128,0.15) 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  <TickerNumber
                    value={problem.value}
                    suffix={problem.suffix}
                    start={gridInView}
                  />
                </div>
                <h3 className="text-base font-bold mb-2 tracking-[-0.2px]">
                  {problem.title}
                </h3>
                <p className="text-[14px] text-text-dim leading-[1.7]">
                  {problem.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
