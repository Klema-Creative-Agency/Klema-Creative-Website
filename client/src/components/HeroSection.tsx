import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

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
    <section ref={sectionRef} className="relative min-h-[100dvh] flex items-center overflow-hidden bg-[var(--brand-charcoal)]">
      {/* Desktop background (landscape) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
        style={{ backgroundImage: `url(${HERO_BG})`, ...blurStyle }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, oklch(0.20 0.07 145) 55%, oklch(0.20 0.07 145 / 0.90) 75%, oklch(0.20 0.07 145 / 0.5) 100%)",
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

      <div className="container relative z-10 pt-24 pb-16 sm:pt-28 sm:pb-20">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6 sm:mb-8 hero-animate hero-animate-d1">
            <div className="w-6 sm:w-8 h-px bg-[var(--brand-lime)]" />
            <span className="section-label text-[var(--brand-lime)]">
              San Antonio's Contractor Marketing Agency
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-white mb-5 sm:mb-8 font-extrabold hero-animate hero-animate-d2"
            style={{
              fontSize: "clamp(2rem, 5.5vw, 4.25rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
            }}
          >
            Stop Losing Jobs
            <br />
            <span className="text-[var(--brand-lime)]">To Missed Calls.</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-white/80 font-body mb-8 sm:mb-10 max-w-xl text-base sm:text-[1.125rem] leading-[1.65] sm:leading-[1.7] hero-animate hero-animate-d3">
            We build lead systems that respond to every call, rank you on Google,
            and keep your calendar full. No shared leads. No long-term contracts.
          </p>

          {/* Urgency proof line + CTA */}
          <div className="hero-animate hero-animate-d4">
            <p className="text-[var(--brand-lime)] text-[0.875rem] sm:text-[0.9375rem] font-body font-semibold mb-4">
              Now accepting 5 founding clients this month
            </p>
            <a href="#contact" className="btn-primary w-full sm:w-auto text-base">
              Get My Free Lead Audit
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-white/40 text-[0.8125rem] font-body mt-3">
              Free audit, no obligation. Takes 2 minutes.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-10 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-8 hero-animate hero-animate-d5">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-0.5 text-center sm:text-left">
                <span className="font-display font-extrabold text-[var(--brand-lime)] leading-none" style={{ fontSize: "clamp(0.9375rem, 3.5vw, 1.75rem)" }}>
                  {stat.value}
                </span>
                <span className="text-white/50 text-[0.6875rem] sm:text-[0.8125rem] font-body leading-tight">
                  {stat.label}
                </span>
              </div>
            ))}
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
