"use client";

import { useEffect, useRef, useState } from "react";

const problems = [
  {
    value: 0,
    suffix: "",
    title: "Invisible online",
    text: "When someone searches \u201cyour service + San Antonio,\u201d are you in the top 3? If not, those leads are calling someone else. Every day you\u2019re not ranking is money you\u2019ll never get back.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    value: 80,
    suffix: "%",
    title: "Slow to respond",
    text: "You\u2019re on a job site. A lead comes in at 2pm. You call back at 5pm. They already booked your competitor at 2:15. This happens every single day to businesses without an automated response system.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    value: 5,
    suffix: "K",
    title: "No follow-up system",
    text: "A customer fills out your contact form. You call once. They don\u2019t answer. You forget. That\u2019s a $500\u2013$5,000 job you\u2019ll never see again. Multiply that by every lead you\u2019ve lost this year.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    value: 0,
    suffix: "",
    title: "Paying for vanity metrics",
    text: "Your agency sends you clicks and impressions. You need booked jobs. If your marketing report doesn\u2019t show exactly how many leads came in, how many were contacted, and how many became paying customers \u2014 you\u2019re flying blind.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2">
        <path d="M12 20V10M18 20V4M6 20v-4" />
      </svg>
    ),
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

// Heading words with timing - "competitors" is flagged for emphasis
const LINE_1 = [
  { word: "Right", delay: 200 },
  { word: "now,", delay: 300 },
  { word: "4", delay: 400 },
  { word: "things", delay: 480 },
  { word: "are", delay: 560 },
];
const LINE_2 = [
  { word: "sending", delay: 650 },
  { word: "your", delay: 730 },
  { word: "leads", delay: 810 },
  { word: "to", delay: 880 },
  { word: "competitors.", delay: 960, emphasis: true },
];
// "competitors" emphasis kicks in after all words have landed
const EMPHASIS_DELAY = 1500;

// Stagger delays for each card (ms)
const CARD_DELAYS = [0, 600, 1200, 1800];

export default function ProblemSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [headerInView, setHeaderInView] = useState(false);
  const [gridInView, setGridInView] = useState(false);
  const [emphasize, setEmphasize] = useState(false);

  // Header observer - toggles in AND out on scroll
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

  // Grid observer - one-shot
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
            These are the gaps sending your leads straight to competitors.
            Here&apos;s what&apos;s broken.
          </p>
        </div>

        {/* Accordion grid - cards fold out left to right */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 gap-4 max-md:grid-cols-1"
        >
          {problems.map((problem, i) => (
            <div
              key={i}
              className="group relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-10 px-8 max-md:p-7 transition-all duration-400 hover:border-accent/30 hover:shadow-[0_0_24px_rgba(74,222,128,0.06)] overflow-hidden"
              style={{
                opacity: gridInView ? 1 : 0,
                transform: gridInView ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left center",
                transition: `opacity 0.8s ease ${CARD_DELAYS[i]}ms, transform 1s cubic-bezier(0.22, 1, 0.36, 1) ${CARD_DELAYS[i]}ms, border-color 0.4s ease, box-shadow 0.4s ease`,
              }}
            >
              {/* Green left accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent/20 group-hover:bg-accent/60 transition-colors duration-400" />
              {/* Radial gradient overlay on hover */}
              <div className="absolute top-0 right-0 w-1/2 h-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(circle at top right, rgba(74,222,128,0.06), transparent 70%)" }} />
              <div
                className="relative"
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
                <h3 className="text-base font-bold mb-2 tracking-[-0.2px] flex items-center gap-2">
                  <span className="flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity duration-300">{problem.icon}</span>
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
