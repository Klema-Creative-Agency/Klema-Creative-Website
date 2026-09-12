import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ContactForm from "./ContactForm";

const stats = [
  { value: "30,000+", label: "Daily Views Per Wrapped Truck" },
  { value: "One Roof", label: "Designed + Printed In-House" },
  { value: "100% Yours", label: "You Own Every File" },
];

/* Skewed slab: the angular graphic language of the brand.
   Positioned shapes only; content never depends on them. */
function Slab({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      aria-hidden
      className={`absolute pointer-events-none ${className || ""}`}
      style={{ transform: "skewX(-24deg)", ...style }}
    />
  );
}

export default function HeroSection() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section className="relative min-h-[88dvh] flex flex-col lg:min-h-[85dvh] overflow-hidden bg-[var(--brand-charcoal)] diag-texture">
      {/* Angular shape cluster: top right */}
      <Slab className="bg-[var(--brand-gold)] hidden md:block" style={{ top: "-90px", right: "-120px", width: "440px", height: "400px" }} />
      <Slab className="hidden md:block" style={{ top: "-90px", right: "350px", width: "95px", height: "310px", background: "oklch(0.30 0.006 260)" }} />
      <Slab className="hidden md:block" style={{ top: "-90px", right: "478px", width: "26px", height: "230px", background: "oklch(0.55 0.01 260)" }} />
      {/* Mobile-size gold slab so small screens get the same energy */}
      <Slab className="bg-[var(--brand-gold)] md:hidden" style={{ top: "-50px", right: "-70px", width: "200px", height: "190px" }} />
      <Slab className="md:hidden" style={{ top: "-50px", right: "150px", width: "40px", height: "140px", background: "oklch(0.30 0.006 260)" }} />

      {/* Angular shape cluster: bottom left */}
      <Slab className="hidden sm:block" style={{ bottom: "-50px", left: "-60px", width: "280px", height: "130px", background: "oklch(0.26 0.006 260)" }} />
      <Slab className="bg-[var(--brand-gold)] hidden sm:block" style={{ bottom: "-50px", left: "250px", width: "56px", height: "95px" }} />

      <div className="container relative z-10 pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 flex-1 flex flex-col">
        <div className="max-w-3xl flex-1 flex flex-col">
          {/* Eyebrow */}
          <div className="mb-4 sm:mb-6 lg:mb-8 hero-animate hero-animate-d1">
            <span className="section-label text-white lg:text-[0.9375rem] lg:tracking-[0.12em]">
              San Antonio's Branding Studio for the Trades
            </span>
          </div>

          {/* Content stack pushed to bottom */}
          <div className="mt-auto">

          {/* Headline: Archivo Black all-caps via base h1 styles */}
          <h1
            className="text-white mb-4 sm:mb-6 lg:mb-8 hero-animate hero-animate-d2"
            style={{ fontSize: "clamp(1.875rem, 5vw, 3.5rem)" }}
          >
            Stop Looking Like
            <br />
            <span className="relative inline-block">
              <motion.span
                aria-hidden
                className="absolute inset-0 -z-10 bg-[var(--brand-gold)] blur-3xl lg:blur-2xl"
                animate={{
                  opacity: [0.35, 0.6, 0.35],
                  scale: [0.92, 1.15, 0.92],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="relative text-[var(--brand-gold)]">Everyone Else.</span>
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-white/80 font-body mb-6 sm:mb-8 lg:mb-10 max-w-xl text-[0.9375rem] sm:text-base lg:text-[1.125rem] leading-[1.6] sm:leading-[1.65] lg:leading-[1.7] hero-animate hero-animate-d3">
            We build brands homeowners remember: your logo, your trucks, your website.
            Designed and printed under one roof in San Antonio, so you look like the
            company worth calling first.
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
                        className="absolute inset-0 rounded-full bg-[var(--brand-gold)]"
                        animate={{ opacity: [0.6, 0, 0.6], scale: [1, 2.5, 1] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                      />
                      <motion.span
                        className="relative w-2 h-2 rounded-full bg-[var(--brand-gold)]"
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </span>
                    <p className="text-white text-[0.875rem] sm:text-[0.9375rem] font-body font-semibold">
                      Now accepting 5 founding brand clients this month
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormOpen(true)}
                    className="btn-primary w-full sm:w-auto text-base"
                  >
                    Get My Free Brand Audit
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
                  <div key={stat.label} className="flex flex-col gap-0.5 text-center sm:text-left border-l-4 border-[var(--brand-gold)] pl-3">
                    <span className="font-shout text-[var(--brand-gold)] leading-none" style={{ fontSize: "clamp(0.9375rem, 3vw, 1.375rem)" }}>
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
