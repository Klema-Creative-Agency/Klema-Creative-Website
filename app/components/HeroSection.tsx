"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import TypewriterHeading from "./TypewriterHeading";
import HeroParticles from "./HeroParticles";


function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export default function HeroSection() {
  const [revealed, setRevealed] = useState(false);
  const [glowPhase, setGlowPhase] = useState<"hidden" | "appearing" | "breathing">("hidden");

  const handleComplete = useCallback(() => {
    setRevealed(true);
    // Start glow 300ms after emphasis animation begins
    setTimeout(() => {
      setGlowPhase("appearing");
      // After expand animation, switch to breathing loop
      setTimeout(() => setGlowPhase("breathing"), 2000);
    }, 450);
  }, []);

  return (
    <section className="hero-bg min-h-screen max-md:min-h-[85vh] flex items-center justify-center text-center relative overflow-hidden pt-44 pb-20 px-8 max-md:pt-32 max-md:px-5 max-md:pb-12">
      <HeroParticles />
      <div className={`hero-glow ${
        glowPhase === "appearing" ? "hero-glow-appear" :
        glowPhase === "breathing" ? "hero-glow-breathe" :
        "hero-glow-hidden"
      }`} />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent to-bg pointer-events-none z-[1]" />
      <div className="relative z-2 max-w-[900px] max-md:max-w-[380px]">
        <TypewriterHeading onComplete={handleComplete} />
        <p
          className="text-[clamp(15px,1.6vw,18px)] text-text-dim leading-[1.7] max-w-[520px] mx-auto mb-8 max-md:mb-6 font-normal transition-all duration-700 ease-out"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(16px)",
          }}
        >
          We build AI systems that handle your leads, automate your follow-ups,
          and close the gaps you don&apos;t have time to fill. Same you, ten times
          more effective.
        </p>
        <div
          className="transition-all duration-700 ease-out"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(16px)",
            transitionDelay: revealed ? "200ms" : "0ms",
          }}
        >
          <Link
            href="/book"
            className="btn-primary-hover group inline-flex items-center gap-3 bg-[#22c55e] text-black px-8 max-md:px-6 py-[14px] rounded-full text-[14px] font-bold no-underline transition-all duration-300 tracking-[-0.01em] shadow-[0_0_20px_rgba(34,197,94,0.25),0_4px_16px_rgba(0,0,0,0.3)]"
          >
            Get My Time Back
            <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>
        <p
          className="text-[13px] text-text-dim mt-6 tracking-[0.04em] transition-all duration-700 ease-out"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(12px)",
            transitionDelay: revealed ? "400ms" : "0ms",
          }}
        >
          Free, no-obligation strategy call to see where AI can save you the most time.
        </p>
        <p
          className="text-[13px] text-text-dim mt-3 transition-all duration-700 ease-out"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(12px)",
            transitionDelay: revealed ? "500ms" : "0ms",
          }}
        >
          Not ready to talk?{" "}
          <Link
            href="/tools/ai-visibility"
            className="text-[#22c55e] no-underline hover:underline font-medium"
          >
            See how you show up in AI search &rarr;
          </Link>
        </p>
      </div>
    </section>
  );
}
