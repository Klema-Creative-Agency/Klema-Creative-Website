import { useEffect, useRef, useState } from "react";
import { ArrowRight, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ContactForm from "./ContactForm";

// Cycling hero background images (crossfade between them every CYCLE_MS)
// mobilePos = override bg-position on mobile only (desktop always uses right center via CSS var fallback)
const HERO_IMAGES: { src: string; mobilePos?: string }[] = [
  { src: "/hero_hvac_desktop.jpg", mobilePos: "28% center" },
  { src: "/hero_plumber_desktop.jpg" },
  { src: "/hero_construction_desktop.jpg" },
  { src: "/hero_cleaning_woman_desktop.jpg" },
  { src: "/hero_fencing_desktop.jpg", mobilePos: "60% 30%" },
  { src: "/hero_landscaper_desktop.jpg" },
];
const CYCLE_MS = 14000;
const FADE_MS = 2000;

const stats = [
  { value: "3-5x", label: "Typical ROI" },
  { value: "< 14 Days", label: "To First Lead" },
  { value: "Month-to-Month", label: "No Contracts" },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [blur, setBlur] = useState(0);
  const [formOpen, setFormOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const scrollY = window.scrollY;
      const amount = Math.min(scrollY / 300, 1) * 12;
      setBlur(amount);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, CYCLE_MS);
    return () => clearInterval(interval);
  }, []);

  const blurStyle = { filter: `blur(${blur}px)`, transition: "filter 0.1s linear" };

  return (
    <section ref={sectionRef} className="relative min-h-[88dvh] flex flex-col lg:min-h-[85dvh] overflow-hidden bg-[var(--brand-charcoal)]">
      {/* Cycling background images (crossfade) */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={imageIndex}
            className="absolute inset-0 bg-cover bg-no-repeat hero-bg-image"
            style={{
              backgroundImage: `url(${HERO_IMAGES[imageIndex].src})`,
              ["--hero-pos-mobile" as string]: HERO_IMAGES[imageIndex].mobilePos || "center center",
              ["--hero-pos-desktop" as string]: "right center",
              ...blurStyle,
            } as React.CSSProperties}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: FADE_MS / 1000, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>

      {/* Gradient overlays — sit above the cycling photos */}
      {/* Desktop: soft left-scrim for text legibility + subtle bottom fade — keeps photo visible */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            "linear-gradient(to right, oklch(0.18 0.02 240 / 0.82) 0%, oklch(0.18 0.02 240 / 0.62) 30%, oklch(0.18 0.02 240 / 0.28) 60%, oklch(0.18 0.02 240 / 0.05) 100%), linear-gradient(to bottom, oklch(0.18 0.02 240 / 0.10) 0%, oklch(0.18 0.02 240 / 0.0) 35%, oklch(0.18 0.02 240 / 0.45) 100%)",
        }}
      />
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.20 0.07 240 / 0.50) 0%, oklch(0.20 0.07 240 / 0.65) 40%, oklch(0.20 0.07 240 / 0.92) 70%, oklch(0.18 0.02 240) 100%)",
        }}
      />
      {/* Desktop-only radial spotlight under text column — adds legibility depth without re-darkening the photo zone */}
      <div
        aria-hidden
        className="absolute inset-0 hidden lg:block pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 700px 600px at 22% 70%, oklch(0.15 0.02 240 / 0.55) 0%, oklch(0.15 0.02 240 / 0.25) 45%, oklch(0.15 0.02 240 / 0) 75%)",
        }}
      />

      <div className="container relative z-10 pt-20 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24 flex-1 flex flex-col">
        <div className="max-w-2xl flex-1 flex flex-col">
          {/* Eyebrow — anchored top on mobile + desktop */}
          <div className="mb-4 sm:mb-6 lg:mb-8 hero-animate hero-animate-d1">
            <span className="section-label text-white lg:text-[0.9375rem] lg:tracking-[0.12em]" style={{ textShadow: "0 1px 8px rgba(0, 0, 0, 0.6)" }}>
              San Antonio's Marketing Agency for Contractors
            </span>
          </div>

          {/* Content stack — pushed to bottom on all sizes to match mobile feel */}
          <div className="mt-auto">

          {/* Headline */}
          <h1
            className="text-white mb-4 sm:mb-6 lg:mb-8 font-extrabold hero-animate hero-animate-d2"
            style={{
              fontSize: "clamp(2rem, 5.5vw, 4.25rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
            }}
          >
            Stop Losing Jobs
            <br />
            <span className="relative inline-block">
              <motion.span
                aria-hidden
                className="absolute inset-0 -z-10 bg-[var(--brand-lime)] blur-3xl lg:blur-2xl rounded-full"
                animate={{
                  opacity: [0.45, 0.75, 0.45],
                  scale: [0.92, 1.18, 0.92],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="relative text-[var(--brand-lime)]">To Missed Calls.</span>
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-white/80 font-body mb-6 sm:mb-8 lg:mb-10 max-w-xl text-[0.9375rem] sm:text-base lg:text-[1.125rem] leading-[1.6] sm:leading-[1.65] lg:leading-[1.7] hero-animate hero-animate-d3">
            We build lead systems that respond to every call, rank you on Google,
            and keep your calendar full. No shared leads. No long-term contracts.
          </p>

          {/* CTA → Form (animated swap) */}
          <motion.div
            layout
            transition={{ layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
            className="hero-animate hero-animate-d4"
          >
            <AnimatePresence mode="wait" initial={false}>
              {!formOpen ? (
                <motion.div
                  key="cta"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex items-center gap-2.5 mb-4 w-fit">
                    <span className="relative flex shrink-0 w-2 h-2">
                      <motion.span
                        aria-hidden
                        className="absolute inset-0 rounded-full bg-[var(--brand-lime)]"
                        animate={{ opacity: [0.6, 0, 0.6], scale: [1, 2.5, 1] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                      />
                      <motion.span
                        className="relative w-2 h-2 rounded-full bg-[var(--brand-lime)]"
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </span>
                    <p className="text-white text-[0.875rem] sm:text-[0.9375rem] font-body font-semibold">
                      Now accepting 5 founding clients this month
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormOpen(true)}
                    className="btn-primary w-full sm:w-auto text-base"
                  >
                    Get My Free Lead Audit
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-white/40 text-[0.8125rem] font-body mt-3">
                    Free audit, no obligation. Takes 2 minutes.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, scale: 0.96, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                  className="origin-top"
                >
                  <ContactForm idPrefix="hero-contact" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Stats — hidden once form opens to keep hero focused */}
          <AnimatePresence>
            {!formOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-8 sm:mt-10 lg:mt-12 hidden sm:grid sm:grid-cols-3 sm:gap-8 lg:gap-6 hero-animate hero-animate-d5 overflow-hidden"
              >
                {stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-0.5 text-center sm:text-left">
                    <span className="font-display font-extrabold text-[var(--brand-lime)] leading-none" style={{ fontSize: "clamp(0.9375rem, 3vw, 1.375rem)" }}>
                      {stat.value}
                    </span>
                    <span className="text-white/50 text-[0.6875rem] sm:text-[0.8125rem] font-body leading-tight">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          </div>
        </div>
      </div>

    </section>
  );
}
