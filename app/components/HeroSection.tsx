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
    <section className="hero-bg min-h-screen max-md:min-h-[85vh] flex items-center justify-center text-center relative overflow-hidden pt-30 pb-20 px-8 max-md:pt-[22vh] max-md:px-5 max-md:pb-12 max-md:items-start">
      <HeroParticles />
      <div className={`hero-glow ${
        glowPhase === "appearing" ? "hero-glow-appear" :
        glowPhase === "breathing" ? "hero-glow-breathe" :
        "hero-glow-hidden"
      }`} />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-bg pointer-events-none z-[1]" />
      <div className="relative z-2 max-w-[900px] max-md:max-w-[380px]">
        <TypewriterHeading onComplete={handleComplete} />
        <p
          className="text-[clamp(17px,1.9vw,22px)] text-text-dim leading-[1.7] max-w-[560px] mx-auto mb-10 max-md:mb-7 font-normal transition-all duration-700 ease-out"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(16px)",
          }}
        >
          We don&apos;t just run ads for San Antonio businesses — we build
          complete marketing engines that attract, follow up, and convert
          on autopilot.
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
            href="/contact"
            className="btn-primary-hover group inline-flex items-center gap-3 bg-accent text-black px-10 py-[18px] rounded-full text-[16px] font-bold no-underline transition-all duration-300 tracking-[-0.01em] shadow-[0_0_20px_rgba(74,222,128,0.25),0_4px_16px_rgba(0,0,0,0.3)]"
          >
            Book a Free Discovery Call
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
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
          Free 30-min strategy session <span className="text-accent/60">&bull;</span> limited spots this month
        </p>
      </div>
    </section>
  );
}
