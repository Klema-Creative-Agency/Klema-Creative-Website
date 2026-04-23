import { useEffect, useRef, useState } from "react";
import ContactForm from "./ContactForm";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663297447526/mEEGQWAhe3sZbFRjQQCeee/hero_bg-LepAArL4ZUq7WifUPakWXv.webp";
const HERO_BG_MOBILE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663297447526/mEEGQWAhe3sZbFRjQQCeee/hero_bg_mobile-CRkzH4zc4gCGSBXpxFSazb.webp";

const stats = [
  { value: "3-5x", label: "Typical ROI" },
  { value: "< 14 Days", label: "To First Lead" },
  { value: "Month-to-Month", label: "No Contracts" },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [blur, setBlur] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const scrollY = window.scrollY;
      // Ramp from 0 to 12px blur over the first 300px of scroll
      const amount = Math.min(scrollY / 300, 1) * 12;
      setBlur(amount);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const blurStyle = { filter: `blur(${blur}px)`, transition: "filter 0.1s linear" };

  return (
    <section ref={sectionRef} className="relative lg:min-h-[100dvh] lg:flex lg:items-center overflow-hidden bg-[var(--brand-charcoal)]">
      {/* Desktop background (landscape) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
        style={{ backgroundImage: `url(${HERO_BG})`, ...blurStyle }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, oklch(0.20 0.07 145 / 0.55) 0%, oklch(0.20 0.07 145 / 0.85) 35%, oklch(0.20 0.07 145) 60%)",
          }}
        />
      </div>

      {/* Mobile background (portrait, face-forward) */}
      <div
        className="absolute inset-0 bg-cover bg-top bg-no-repeat md:hidden"
        style={{ backgroundImage: `url(${HERO_BG_MOBILE})`, ...blurStyle }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.20 0.07 145 / 0.50) 0%, oklch(0.20 0.07 145 / 0.65) 40%, oklch(0.20 0.07 145 / 0.92) 70%, oklch(0.20 0.07 145) 100%)",
          }}
        />
      </div>

      <div className="container relative z-10 pt-20 pb-10 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left: copy + stats */}
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4 sm:mb-6 lg:mb-8 hero-animate hero-animate-d1">
              <div className="w-6 sm:w-8 h-px bg-[var(--brand-lime)]" />
              <span className="section-label text-[var(--brand-lime)]">
                San Antonio's Contractor Marketing Agency
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-white mb-4 sm:mb-6 lg:mb-8 font-extrabold hero-animate hero-animate-d2"
              style={{
                fontSize: "clamp(1.875rem, 4.5vw, 3.25rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
              }}
            >
              Stop Losing Jobs <span className="text-[var(--brand-lime)]">To Missed Calls.</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-white/80 font-body mb-2 sm:mb-6 lg:mb-10 max-w-xl text-[0.9375rem] sm:text-base lg:text-[1.125rem] leading-[1.6] sm:leading-[1.65] lg:leading-[1.7] hero-animate hero-animate-d3">
              We build lead systems that respond to every call, rank you on Google,
              and keep your calendar full. No shared leads. No long-term contracts.
            </p>

            {/* Stats — desktop+ only (too cramped on mobile alongside the form) */}
            <div className="hidden lg:grid lg:mt-4 lg:grid-cols-3 lg:gap-8 hero-animate hero-animate-d5">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-0.5 text-left">
                  <span className="font-display font-extrabold text-[var(--brand-lime)] leading-none text-[1.75rem]">
                    {stat.value}
                  </span>
                  <span className="text-white/50 text-[0.8125rem] font-body leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-5 hero-animate hero-animate-d4">
            <ContactForm idPrefix="hero-contact" />
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 bg-background"
        style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
      />
    </section>
  );
}
