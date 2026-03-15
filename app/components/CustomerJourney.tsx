"use client";

import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import RevealOnScroll from "./RevealOnScroll";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

/* ── stage data ── */
const stages = [
  {
    step: 1,
    metric: "+200%",
    metricLabel: "More Traffic",
    title: "We put you in front of the right people",
    cardTitle: "SEO, ads, and AI visibility, all handled",
    cardDetail:
      "We run your Google Ads, optimize your SEO, and get you listed everywhere that matters, including Google Business Profile, social media, and AI search results.",
    side: "left" as const,
    illustration: "traffic",
  },
  {
    step: 2,
    metric: "+21%",
    metricLabel: "Conversion Rate",
    title: "We build a website that actually converts",
    cardTitle: "Not just pretty. Built to book jobs",
    cardDetail:
      "Clear messaging, strong CTAs, real testimonials, and built-in scheduling. Every page is designed to turn visitors into leads.",
    side: "right" as const,
    illustration: "website",
  },
  {
    step: 3,
    metric: "< 60s",
    metricLabel: "Response Time",
    title: "We contact your leads before they go cold",
    cardTitle: "Our team responds in under 60 seconds",
    cardDetail:
      "When a lead comes in, our team calls, texts, and emails them immediately so you never lose a job to a slow response.",
    side: "left" as const,
    illustration: "phone",
  },
  {
    step: 4,
    metric: "-40%",
    metricLabel: "No-Shows",
    title: "We make sure they show up",
    cardTitle: "Automated reminders that cut no-shows",
    cardDetail:
      "Once a lead books, we send reminder calls, texts, and emails so they actually show up. No more wasted time slots.",
    side: "right" as const,
    illustration: "reminders",
  },
  {
    step: 5,
    metric: "+9%",
    metricLabel: "Close Rate",
    title: "We help you close faster",
    cardTitle: "Proposals and follow-ups on autopilot",
    cardDetail:
      "We send proposals and invoices fast, then follow up automatically so the deal doesn't go cold while you're on a job site.",
    side: "left" as const,
    illustration: "invoice",
  },
  {
    step: 6,
    metric: "0",
    metricLabel: "Missed Messages",
    title: "We keep every conversation in one place",
    cardTitle: "One inbox for calls, texts, and emails",
    cardDetail:
      "No more checking five apps. Every customer message lands in one unified inbox so nothing slips through the cracks.",
    side: "right" as const,
    illustration: "inbox",
  },
  {
    step: 7,
    metric: "100%",
    metricLabel: "Visibility",
    title: "We keep your projects on track",
    cardTitle: "Your clients see progress in real time",
    cardDetail:
      "A project dashboard and client portal so everyone stays aligned. No more \"just checking in\" calls from customers.",
    side: "left" as const,
    illustration: "project",
  },
  {
    step: 8,
    metric: "+5x",
    metricLabel: "More Reviews",
    title: "We turn happy clients into repeat business",
    cardTitle: "Reviews and referrals on autopilot",
    cardDetail:
      "After every job, we automatically request reviews, launch referral campaigns, and re-engage past clients to keep your pipeline full.",
    side: "right" as const,
    illustration: "reviews",
  },
];

/* ── illustration components ── */
function TrafficIllustration() {
  return (
    <div className="w-full max-w-[400px] bg-[#111] rounded-xl border border-white-10 p-4 shadow-[0_8px_30px_rgba(0,0,0,0.4)] md:rotate-[2deg]">
      <div className="flex items-center gap-3 mb-2 text-[9px] text-text-dim">
        <span className="font-semibold text-text-mid text-[10px]">Web traffic</span>
        <span>SEO</span>
        <span>Ads</span>
        <span className="border-l border-white-10 pl-3 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="text-accent font-medium">Klema</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-white-25" />
          <span>Others</span>
        </span>
      </div>
      <svg viewBox="0 0 280 100" className="w-full h-[100px]">
        <line x1="0" y1="33" x2="280" y2="33" stroke="rgba(255,255,255,0.04)" />
        <line x1="0" y1="66" x2="280" y2="66" stroke="rgba(255,255,255,0.04)" />
        <path d="M0,80 C40,78 80,76 120,72 C160,68 200,65 240,63 C260,62 280,61 280,60" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M0,85 C40,80 80,65 120,50 C160,38 200,22 240,12 C260,8 280,4 280,2" fill="none" stroke="#4ade80" strokeWidth="2" />
        <path d="M0,85 C40,80 80,65 120,50 C160,38 200,22 240,12 C260,8 280,4 280,2 L280,100 L0,100 Z" fill="url(#glow1)" opacity="0.12" />
        <defs><linearGradient id="glow1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4ade80" /><stop offset="100%" stopColor="transparent" /></linearGradient></defs>
      </svg>
    </div>
  );
}

function WebsiteIllustration() {
  return (
    <div className="w-full max-w-[400px] bg-[#111] rounded-xl border border-white-10 shadow-[0_8px_30px_rgba(0,0,0,0.4)] overflow-hidden md:-rotate-[2deg]">
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white-6">
        <div className="w-2 h-2 rounded-full bg-[#ff5f57]" /><div className="w-2 h-2 rounded-full bg-[#febc2e]" /><div className="w-2 h-2 rounded-full bg-[#28c840]" />
        <div className="flex-1 ml-2 h-4 rounded bg-white-6 flex items-center px-2">
          <span className="text-[7px] text-text-dim">yourbusiness.com</span>
        </div>
      </div>
      <div className="p-4 flex gap-3">
        <div className="flex-1">
          <div className="text-[7px] text-accent font-bold uppercase tracking-wider mb-1">Serving Your City</div>
          <div className="text-[11px] font-extrabold text-text leading-tight mb-1.5">Your Trusted Partner for Quality Results</div>
          <div className="text-[7px] text-text-dim leading-relaxed mb-2">From start to finish, we handle every detail with care.</div>
          <div className="inline-block bg-accent text-black text-[7px] font-bold px-2 py-1 rounded">Get Your Free Quote</div>
        </div>
        <div className="w-[80px] h-[70px] rounded bg-white-6 flex items-center justify-center flex-shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
        </div>
      </div>
    </div>
  );
}

function PhoneIllustration() {
  return (
    <div className="w-[210px] mx-auto bg-[#111] rounded-[22px] border-2 border-white-10 p-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.4)] md:rotate-[3deg]">
      <div className="w-10 h-1 rounded-full bg-white-10 mx-auto mb-3" />
      <div className="bg-accent/15 border border-accent/25 rounded-lg p-2.5 mb-2">
        <div className="flex items-center gap-1.5 mb-1">
          <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3" /></svg>
          </div>
          <p className="text-[9px] font-bold text-accent">Incoming Call</p>
        </div>
        <p className="text-[8px] text-accent/70">Response time: 34s</p>
      </div>
      <div className="bg-white-6 rounded-lg p-2 mb-1.5">
        <p className="text-[7px] text-text-dim">SMS Sent</p>
        <p className="text-[8px] text-text-mid">&quot;Hi Sarah! Thanks for...&quot;</p>
      </div>
      <div className="bg-white-6 rounded-lg p-2">
        <p className="text-[7px] text-text-dim">Email Sent</p>
        <p className="text-[8px] text-text-mid">&quot;Your free quote is ready&quot;</p>
      </div>
      <div className="w-16 h-0.5 rounded-full bg-white-10 mx-auto mt-3" />
    </div>
  );
}

function RemindersIllustration() {
  return (
    <div className="w-full max-w-[305px] flex flex-col gap-2 md:-rotate-[1deg]">
      <div className="bg-[#111] border border-white-10 rounded-xl p-3 shadow-[0_4px_20px_rgba(0,0,0,0.3)] max-w-[220px]">
        <p className="text-[8px] text-text-dim mb-1">Hey! Just checking in...</p>
        <p className="text-[9px] text-text-mid">Your appointment is tomorrow at 2 PM. Still good?</p>
      </div>
      <div className="bg-accent/10 border border-accent/20 rounded-xl p-3 shadow-[0_4px_20px_rgba(0,0,0,0.3)] max-w-[180px] self-end">
        <p className="text-[9px] text-accent font-medium">Yes! See you then.</p>
      </div>
    </div>
  );
}

function InvoiceIllustration() {
  return (
    <div className="w-full max-w-[330px] bg-[#111] rounded-xl border border-white-10 p-4 shadow-[0_8px_30px_rgba(0,0,0,0.4)] md:rotate-[1deg]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-accent/20 flex items-center justify-center"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /></svg></div>
          <span className="text-[9px] text-text-dim">Invoice #1042</span>
        </div>
        <span className="text-[8px] text-accent font-bold bg-accent/10 px-2 py-0.5 rounded-full">Paid</span>
      </div>
      <div className="text-[18px] font-black text-text mb-1">$4,200.00</div>
      <div className="text-[9px] text-text-dim mb-3">Johnson Plumbing Co.</div>
      <div className="flex gap-2">
        <div className="h-1.5 flex-[3] rounded-full bg-accent/30" />
        <div className="h-1.5 flex-1 rounded-full bg-white-6" />
      </div>
    </div>
  );
}

function InboxIllustration() {
  return (
    <div className="w-full max-w-[330px] bg-[#111] rounded-xl border border-white-10 p-3 shadow-[0_8px_30px_rgba(0,0,0,0.4)] md:-rotate-[2deg]">
      {[
        { ch: "SMS", msg: "Thanks for the quick response!", time: "2m", unread: true },
        { ch: "Email", msg: "Re: Project update - looks great", time: "15m", unread: true },
        { ch: "Call", msg: "Missed call from (512) 555-0123", time: "1hr", unread: false },
      ].map((m, i) => (
        <div key={i} className={`flex items-center gap-2.5 py-2.5 ${i > 0 ? "border-t border-white-6" : ""}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[8px] font-bold flex-shrink-0 ${m.unread ? "bg-accent/15 text-accent" : "bg-white-6 text-text-dim"}`}>
            {m.ch[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[9px] text-text truncate">{m.msg}</p>
            <p className="text-[7px] text-text-dim">{m.ch} · {m.time}</p>
          </div>
          {m.unread && <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />}
        </div>
      ))}
    </div>
  );
}

function ProjectIllustration() {
  return (
    <div className="w-full max-w-[350px] bg-[#111] rounded-xl border border-white-10 p-4 shadow-[0_8px_30px_rgba(0,0,0,0.4)] md:rotate-[1deg]">
      <div className="text-[10px] font-bold text-text mb-3">Active Projects</div>
      {[
        { name: "Kitchen Remodel", progress: 85, status: "On track" },
        { name: "Bathroom Reno", progress: 45, status: "In progress" },
        { name: "Deck Install", progress: 20, status: "Starting" },
      ].map((p, i) => (
        <div key={i} className={`py-2 ${i > 0 ? "border-t border-white-6" : ""}`}>
          <div className="flex justify-between mb-1">
            <span className="text-[9px] text-text-mid">{p.name}</span>
            <span className="text-[8px] text-text-dim">{p.status}</span>
          </div>
          <div className="h-1.5 rounded-full bg-white-6">
            <div className="h-full rounded-full bg-accent/50" style={{ width: `${p.progress}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ReviewsIllustration() {
  return (
    <div className="w-full max-w-[280px] flex flex-col gap-2 md:-rotate-[2deg]">
      <div className="bg-[#111] border border-white-10 rounded-xl p-3 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
        <p className="text-[9px] text-text-mid mb-1">Hey Mark, just wanted to say thanks for the amazing work. Everything looks great!</p>
        <p className="text-[7px] text-text-dim">- Sarah M.</p>
      </div>
      <div className="bg-accent/10 border border-accent/20 rounded-xl p-3 shadow-[0_4px_20px_rgba(0,0,0,0.3)] max-w-[200px] self-end">
        <p className="text-[9px] text-accent">Thanks! A quick Google review would really help us out!</p>
      </div>
    </div>
  );
}

const illustrationMap: Record<string, React.ReactNode> = {
  traffic: <TrafficIllustration />,
  website: <WebsiteIllustration />,
  phone: <PhoneIllustration />,
  reminders: <RemindersIllustration />,
  invoice: <InvoiceIllustration />,
  inbox: <InboxIllustration />,
  project: <ProjectIllustration />,
  reviews: <ReviewsIllustration />,
};

/* ── Rocket SVG ── */
function RocketSVG() {
  return (
    <svg viewBox="0 0 95 41" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <defs>
        <linearGradient id="rocketGrad" x1="0" y1="0.5" x2="1" y2="0.5">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
        <linearGradient id="flameGrad" x1="0" y1="0.5" x2="1" y2="0.5">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="60%" stopColor="#a78bfa" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Flame trail */}
      <ellipse cx="12" cy="20.5" rx="14" ry="6" fill="url(#flameGrad)" opacity="0.7" />
      {/* Body */}
      <path d="M30 8 C30 8 38 2 58 2 C78 2 88 8 92 12 L92 29 C88 33 78 39 58 39 C38 39 30 33 30 33 Z" fill="url(#rocketGrad)" />
      {/* Nose cone */}
      <path d="M92 12 C92 12 96 16 96 20.5 C96 25 92 29 92 29 Z" fill="#7c3aed" />
      {/* Window */}
      <circle cx="68" cy="20.5" r="6" fill="#0d0d0d" stroke="#a78bfa" strokeWidth="1.5" />
      <circle cx="68" cy="20.5" r="3.5" fill="#a78bfa" opacity="0.35" />
      {/* Fin top */}
      <path d="M36 8 L30 0 L30 8 Z" fill="#a78bfa" />
      {/* Fin bottom */}
      <path d="M36 33 L30 41 L30 33 Z" fill="#a78bfa" />
    </svg>
  );
}

/* ── useIsMobile hook ── */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return isMobile;
}

/* ── Build smooth S-curve path through heading positions ── */
function buildPathFromHeadings(
  container: HTMLDivElement,
  headings: (HTMLHeadingElement | null)[]
): { mainD: string; phantomD: string } {
  const rect = container.getBoundingClientRect();

  const points: { x: number; y: number }[] = [];
  headings.forEach((h) => {
    if (!h) return;
    const hRect = h.getBoundingClientRect();
    points.push({
      x: hRect.left + hRect.width / 2 - rect.left,
      y: hRect.top + hRect.height / 2 - rect.top,
    });
  });

  if (points.length < 2) return { mainD: "", phantomD: "" };

  // Smooth S-curves: vertical at each heading, curves horizontally between them
  let d = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const curr = points[i];
    const next = points[i + 1];
    const midY = (curr.y + next.y) / 2;
    // Control points stay at current/next x but at the vertical midpoint,
    // creating smooth S-curves that leave each heading vertically
    d += ` C ${curr.x} ${midY}, ${next.x} ${midY}, ${next.x} ${next.y}`;
  }

  // Phantom path: extends 200px below last card
  const lastPt = points[points.length - 1];
  const phantomD = d + ` L ${lastPt.x} ${lastPt.y + 200}`;

  return { mainD: d, phantomD };
}

/* ── useGSAPJourney hook ── */
function useGSAPJourney(
  isMobile: boolean,
  containerRef: React.RefObject<HTMLDivElement | null>,
  stepsRef: React.RefObject<HTMLDivElement | null>,
  headingRefs: React.MutableRefObject<(HTMLHeadingElement | null)[]>,
  pathRef: React.RefObject<SVGPathElement | null>,
  phantomRef: React.RefObject<SVGPathElement | null>,
  trail1Ref: React.RefObject<SVGPathElement | null>,
  trail2Ref: React.RefObject<SVGPathElement | null>,
  rocketRef: React.RefObject<HTMLDivElement | null>
) {
  const calcAndAnimate = useCallback(() => {
    const container = containerRef.current;
    const stepsEl = stepsRef.current;
    const path = pathRef.current;
    const phantom = phantomRef.current;
    const trail1 = trail1Ref.current;
    const trail2 = trail2Ref.current;
    const rocket = rocketRef.current;

    if (isMobile || !container || !stepsEl || !path || !phantom || !trail1 || !trail2 || !rocket) return null;

    const { mainD, phantomD } = buildPathFromHeadings(container, headingRefs.current);
    if (!mainD) return null;

    // Set path d attributes
    path.setAttribute("d", mainD);
    phantom.setAttribute("d", phantomD);
    trail1.setAttribute("d", phantomD);
    trail2.setAttribute("d", phantomD);

    // Get total length for trail animation
    const totalLength = phantom.getTotalLength();
    trail1.style.strokeDasharray = `${totalLength}`;
    trail1.style.strokeDashoffset = `${totalLength}`;
    trail2.style.strokeDasharray = `${totalLength}`;
    trail2.style.strokeDashoffset = `${totalLength}`;

    // Main timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stepsEl,
        start: "top center",
        end: "bottom 70%",
        scrub: 1.2,
      },
    });

    // Rocket follows the phantom path with eased steps for subtle pauses at each stage
    const stageCount = headingRefs.current.filter(Boolean).length;
    if (stageCount > 1) {
      for (let s = 0; s < stageCount - 1; s++) {
        const segStart = s / (stageCount - 1);
        const segEnd = (s + 1) / (stageCount - 1);
        tl.to(rocket, {
          motionPath: {
            path: phantom,
            align: phantom,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
            offsetX: -50,
            offsetY: -80,
            start: segStart,
            end: segEnd,
          },
          ease: "power2.inOut",
          duration: 1,
        }, s > 0 ? `>-0.0` : 0);
      }
    } else {
      tl.to(rocket, {
        motionPath: {
          path: phantom,
          align: phantom,
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
          offsetX: -50,
          offsetY: -80,
        },
        ease: "none",
      }, 0);
    }

    // Trail duration must match total rocket duration
    const totalDuration = stageCount > 1 ? stageCount - 1 : 1;

    // Trail 1: green
    tl.to(trail1, {
      strokeDashoffset: 0,
      ease: "none",
      duration: totalDuration,
    }, 0);

    // Trail 2: purple (slightly delayed)
    tl.to(trail2, {
      strokeDashoffset: 0,
      duration: totalDuration,
      ease: "none",
    }, 0.02);

    // Card entrance animations
    const cards = stepsEl.querySelectorAll("[data-journey-card]");
    cards.forEach((card) => {
      gsap.from(card, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    return { tl };
  }, [isMobile, containerRef, stepsRef, headingRefs, pathRef, phantomRef, trail1Ref, trail2Ref, rocketRef]);

  useLayoutEffect(() => {
    if (isMobile) return;

    // Delay to let layout settle
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        calcAndAnimate();
      }, containerRef);

      // ResizeObserver for recalculation
      let resizeTimer: ReturnType<typeof setTimeout>;
      const ro = new ResizeObserver(() => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          ctx.revert();
          gsap.context(() => {
            calcAndAnimate();
          }, containerRef);
          ScrollTrigger.refresh();
        }, 200);
      });

      if (containerRef.current) {
        ro.observe(containerRef.current);
      }

      return () => {
        ro.disconnect();
        clearTimeout(resizeTimer);
        ctx.revert();
      };
    }, 300);

    return () => clearTimeout(timer);
  }, [isMobile, calcAndAnimate, containerRef]);

  // Mobile: scroll-driven chevron + progress trail + card reveals
  useEffect(() => {
    if (!isMobile) return;
    const stepsEl = stepsRef.current;
    const container = containerRef.current;
    if (!stepsEl || !container) return;

    const mobileTrailGreen = container.querySelector("[data-mobile-trail-green]") as SVGLineElement | null;
    const mobileTrailPurple = container.querySelector("[data-mobile-trail-purple]") as SVGLineElement | null;
    const mobileChevron = container.querySelector("[data-mobile-chevron]") as HTMLDivElement | null;
    const borderWrapper = container.querySelector("[data-mobile-border]") as HTMLDivElement | null;

    if (!mobileChevron || !mobileTrailGreen || !borderWrapper) return;

    let ctx: gsap.Context | null = null;

    // Small delay so layout is settled
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        // Card entrance animations
        const cards = stepsEl.querySelectorAll("[data-journey-card]");
        cards.forEach((card) => {
          gsap.from(card, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        });

        // Calculate travel distance for chevron (full height of steps area)
        const totalTravel = stepsEl.offsetHeight - 40;

        // Set up trail dash arrays
        const lineHeight = borderWrapper.scrollHeight;
        mobileTrailGreen.setAttribute("y2", String(lineHeight));
        mobileTrailGreen.style.strokeDasharray = `${lineHeight}`;
        mobileTrailGreen.style.strokeDashoffset = `${lineHeight}`;
        if (mobileTrailPurple) {
          mobileTrailPurple.setAttribute("y2", String(lineHeight));
          mobileTrailPurple.style.strokeDasharray = `${lineHeight}`;
          mobileTrailPurple.style.strokeDashoffset = `${lineHeight}`;
        }

        // Single scroll-driven timeline: chevron + trail in sync
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stepsEl,
            start: "top 75%",
            end: "bottom 30%",
            scrub: 0.5,
          },
        });

        // Chevron travels down the border line
        tl.to(mobileChevron, {
          y: totalTravel,
          ease: "none",
          duration: 1,
        }, 0);

        // Green trail fills behind the chevron (same timing = trail tracks chevron)
        tl.to(mobileTrailGreen, {
          strokeDashoffset: 0,
          ease: "none",
          duration: 1,
        }, 0);

        // Purple trail slightly delayed - trails behind the green
        if (mobileTrailPurple) {
          tl.to(mobileTrailPurple, {
            strokeDashoffset: 0,
            ease: "none",
            duration: 1,
          }, 0.05);
        }
      }, container);
    }, 300);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
  }, [isMobile, stepsRef, containerRef]);
}

/* ── main component ── */
export default function CustomerJourney() {
  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const phantomRef = useRef<SVGPathElement>(null);
  const trail1Ref = useRef<SVGPathElement>(null);
  const trail2Ref = useRef<SVGPathElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);

  const isMobile = useIsMobile();

  useGSAPJourney(
    isMobile,
    containerRef,
    stepsRef,
    headingRefs,
    pathRef,
    phantomRef,
    trail1Ref,
    trail2Ref,
    rocketRef
  );

  return (
    <section className="py-24 max-md:py-16 relative">
      <div className="max-w-[1100px] mx-auto px-8 max-md:px-5">
        {/* Section Header */}
        <div className="mb-16 max-md:mb-10 max-w-[500px]">
          <RevealOnScroll>
            <h2 className="text-[clamp(30px,4.5vw,48px)] font-extrabold leading-[1.15] tracking-[-1.5px] mb-4">
              Here&apos;s what happens when{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(86deg, #4ade80, #6ee7b7, #a78bfa)" }}
              >
                Klema runs your marketing
              </span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll>
            <p className="text-[15px] text-text-dim leading-[1.7]">
              From the first click to the repeat customer, we build and manage every step
              so you can focus on your craft.
            </p>
            <p className="text-[12px] text-text-dim/60 mt-3 italic">
              This is the full Dominator experience, our most comprehensive tier.{" "}
              <a href="/packages" className="text-accent/70 hover:text-accent transition-colors no-underline hover:underline">
                See all packages →
              </a>
            </p>
          </RevealOnScroll>
        </div>

        {/* Journey container (path + stages) */}
        <div ref={containerRef} className="relative">
          {/* Desktop: SVG S-curve path overlay */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
            style={{ zIndex: -10, overflow: "visible" }}
          >
            <defs>
              <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
                <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="neonGlowPurple" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur1" />
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="trailGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="50%" stopColor="#6ee7b7" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
            </defs>
            <path
              ref={pathRef}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              ref={phantomRef}
              stroke="transparent"
              fill="none"
            />
            <path
              ref={trail1Ref}
              stroke="url(#trailGradient)"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              opacity="0.7"
              filter="url(#neonGlow)"
            />
            <path
              ref={trail2Ref}
              stroke="#a78bfa"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              opacity="0.45"
              filter="url(#neonGlowPurple)"
            />
          </svg>

          {/* Desktop: Rocket */}
          <div
            ref={rocketRef}
            className="absolute w-[100px] pointer-events-none hidden md:block"
            style={{ zIndex: -5 }}
          >
            <RocketSVG />
          </div>

          {/* Mobile: border wrapper */}
          <div data-mobile-border className="max-md:border-l-2 max-md:border-white-6 max-md:pl-5 md:border-none md:pl-0 relative">
            {/* Mobile: scroll-driven SVG progress trails overlaying the left border */}
            <svg
              className="absolute left-0 top-0 h-full pointer-events-none md:hidden"
              style={{ marginLeft: "-2px", zIndex: 2, overflow: "visible", width: "4px" }}
            >
              {/* Green progress trail - fills as chevron passes */}
              <line
                data-mobile-trail-green
                x1="1" y1="0" x2="1" y2="0"
                stroke="#4ade80"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Purple secondary trail - slightly behind green */}
              <line
                data-mobile-trail-purple
                x1="3" y1="0" x2="3" y2="0"
                stroke="#a78bfa"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.4"
              />
            </svg>

            {/* Mobile: GSAP scroll-driven mini rocket that travels down the border */}
            <div
              data-mobile-chevron
              className="absolute left-0 z-20 md:hidden pointer-events-none"
              style={{ marginLeft: "-16px", top: 0 }}
            >
              <svg width="32" height="70" viewBox="0 0 32 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Flame trail above rocket */}
                <ellipse cx="16" cy="10" rx="4" ry="10" fill="url(#mobileFlameGrad)" opacity="0.7" />
                {/* Rocket body - pointing down */}
                <g transform="translate(16, 45) rotate(90)">
                  <defs>
                    <linearGradient id="mobileRocketGrad" x1="0" y1="0.5" x2="1" y2="0.5">
                      <stop offset="0%" stopColor="#c4b5fd" />
                      <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>
                    <linearGradient id="mobileFlameGrad" x1="0.5" y1="1" x2="0.5" y2="0">
                      <stop offset="0%" stopColor="#4ade80" />
                      <stop offset="60%" stopColor="#a78bfa" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Body */}
                  <path d="M-10 -5 C-10 -5 -6 -9 2 -9 C10 -9 14 -5 16 -3 L16 3 C14 5 10 9 2 9 C-6 9 -10 5 -10 5 Z" fill="url(#mobileRocketGrad)" />
                  {/* Nose cone */}
                  <path d="M16 -3 C16 -3 18 -1.5 18 0 C18 1.5 16 3 16 3 Z" fill="#7c3aed" />
                  {/* Window */}
                  <circle cx="6" cy="0" r="3" fill="#0d0d0d" stroke="#a78bfa" strokeWidth="0.8" />
                  <circle cx="6" cy="0" r="1.5" fill="#a78bfa" opacity="0.35" />
                  {/* Fins */}
                  <path d="M-7 -5 L-10 -9 L-10 -5 Z" fill="#a78bfa" />
                  <path d="M-7 5 L-10 9 L-10 5 Z" fill="#a78bfa" />
                </g>
              </svg>
            </div>

            {/* Cards */}
            <div ref={stepsRef} className="flex flex-col gap-20 max-md:gap-14 relative" style={{ zIndex: 1 }}>
              {stages.map((stage, i) => {
                const isLeft = stage.side === "left";
                const isReversed = i % 2 !== 0;

                return (
                  <div
                    key={stage.step}
                    data-journey-card
                    data-journey-card-reversed={isReversed || undefined}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 md:items-center gap-4 md:gap-10">
                      {/* Text column */}
                      <div
                        className={`${
                          isLeft ? "md:order-1" : "md:order-2 md:text-right"
                        }`}
                      >
                        <h3
                          ref={(el) => { headingRefs.current[i] = el; }}
                          className="text-[clamp(24px,3.5vw,36px)] font-extrabold leading-[1.2] tracking-[-0.5px] mb-3"
                          style={{ textShadow: "0 0 12px rgba(13,13,13,0.9), 0 0 24px rgba(13,13,13,0.7), 0 0 40px rgba(13,13,13,0.5)" }}
                        >
                          {stage.title}
                        </h3>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-accent/30 bg-accent/8">
                          <span className="text-[13px] font-bold text-accent">
                            {stage.metric} {stage.metricLabel}
                          </span>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3">
                            <path d="M18 15l-6-6-6 6" />
                          </svg>
                        </div>
                      </div>

                      {/* Illustration column */}
                      <div
                        className={`${
                          isLeft ? "md:order-2" : "md:order-1"
                        } max-md:-translate-x-2 max-md:-rotate-2`}
                      >
                        {illustrationMap[stage.illustration]}

                        {/* Description card overlapping illustration */}
                        <div
                          className={`-mt-14 max-md:-mt-5 relative z-10 ${
                            isLeft ? "ml-2 mr-auto" : "max-md:ml-2 max-md:mr-auto md:mr-2 md:ml-auto"
                          } bg-surface/95 backdrop-blur-sm border border-border rounded-xl p-4 max-w-[380px] shadow-[0_8px_24px_rgba(0,0,0,0.5)]`}
                        >
                          <div className="flex items-start gap-2">
                            <div className="hidden md:flex w-5 h-5 rounded bg-accent/15 items-center justify-center flex-shrink-0 mt-0.5">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5">
                                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-[14px] font-bold text-text leading-tight mb-1">
                                {stage.cardTitle}
                              </p>
                              <p className="text-[12px] text-text-dim leading-[1.55]">
                                {stage.cardDetail}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 max-md:mt-14">
          <div className="flex justify-center mb-6">
            <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>
          <RevealOnScroll>
            <h3 className="text-[clamp(24px,3.5vw,36px)] font-extrabold leading-[1.2] tracking-[-1px] mb-2">
              Ready to <span className="text-accent">stop chasing leads</span>
              <br />
              and <span className="text-accent">start closing them?</span>
            </h3>
          </RevealOnScroll>
          <RevealOnScroll>
            <a
              href="/contact"
              className="btn-primary-hover inline-flex items-center gap-2 bg-accent text-black px-7 py-3.5 rounded-full text-[14px] font-bold no-underline transition-all duration-300 mt-6"
            >
              Book Your Free Call
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
