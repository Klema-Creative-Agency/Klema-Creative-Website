import Link from "next/link";
import LeadFeed from "./components/LeadFeed";
import RevealOnScroll from "./components/RevealOnScroll";
import HeroSection from "./components/HeroSection";
import ProblemSection from "./components/ProblemSection";
import SplitHeading from "./components/SplitHeading";

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

export default function Home() {
  return (
    <>
      {/* HERO */}
      <HeroSection />

      {/* LEAD FEED */}
      <LeadFeed />

      {/* PROBLEM */}
      <ProblemSection />

      {/* SOLUTION / PILLARS */}
      <section className="py-30 max-md:py-20">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <div className="text-center mb-16">
            <RevealOnScroll>
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-2">
                The solution
              </p>
              <span className="block mx-auto h-[2px] w-[140px] rounded-full animate-[beamPulse_3s_ease-in-out_infinite] mb-4" style={{ background: "linear-gradient(90deg, transparent, #4ade80, transparent)" }} />
            </RevealOnScroll>
            <SplitHeading />
            <RevealOnScroll>
              <p className="text-[17px] text-text-dim leading-[1.7] max-w-[540px] mx-auto">
                We combine cutting-edge technology with a dedicated team to
                deliver a complete, done-for-you marketing solution.
              </p>
            </RevealOnScroll>
          </div>
          <div className="grid grid-cols-3 gap-3 max-lg:grid-cols-2 max-md:grid-cols-1">
            <RevealOnScroll className="bg-surface border border-border rounded-2xl p-10 px-8 max-md:p-7 transition-[background] duration-400 hover:bg-[#121212] group">
              <div className="w-12 h-12 rounded-xl bg-accent-dim text-accent flex items-center justify-center mb-6 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(74,222,128,0.15)]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2.5 tracking-[-0.3px]">
                Presence
              </h3>
              <p className="text-[14.5px] text-text-dim leading-[1.7]">
                We make you the #1 choice in your market on Google and social
                media. SEO, AEO, content, and reputation — all handled.
              </p>
            </RevealOnScroll>
            <RevealOnScroll className="bg-surface border border-border rounded-2xl p-10 px-8 max-md:p-7 transition-[background] duration-400 hover:bg-[#121212] group">
              <div className="w-12 h-12 rounded-xl bg-accent-dim text-accent flex items-center justify-center mb-6 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(74,222,128,0.15)]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2.5 tracking-[-0.3px]">
                Performance
              </h3>
              <p className="text-[14.5px] text-text-dim leading-[1.7]">
                We build high-performance websites that turn visitors into
                leads. Blazing-fast, conversion-optimized, built on modern tech.
              </p>
            </RevealOnScroll>
            <RevealOnScroll className="bg-surface border border-border rounded-2xl p-10 px-8 max-md:p-7 transition-[background] duration-400 hover:bg-[#121212] group">
              <div className="w-12 h-12 rounded-xl bg-accent-dim text-accent flex items-center justify-center mb-6 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(74,222,128,0.15)]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.88.36 1.74.7 2.55" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2.5 tracking-[-0.3px]">
                Persistence
              </h3>
              <p className="text-[14.5px] text-text-dim leading-[1.7]">
                Our lead nurturing team contacts every lead so you never miss an
                opportunity. Speed-to-lead is everything.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-border py-30 max-md:py-20">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <div className="text-center mb-16">
            <RevealOnScroll>
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
                How it works
              </p>
            </RevealOnScroll>
            <RevealOnScroll>
              <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
                Three steps to a marketing
                <br />
                engine that runs itself.
              </h2>
            </RevealOnScroll>
          </div>
          <div className="grid grid-cols-3 gap-px bg-border border border-border rounded-[20px] overflow-hidden max-md:grid-cols-1">
            <RevealOnScroll className="bg-surface p-10 px-7 text-center transition-[background] duration-400 hover:bg-[#121212] group">
              <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center text-[22px] font-black text-accent mx-auto mb-5 transition-all duration-300 group-hover:border-accent-border-dim group-hover:bg-accent-dim group-hover:shadow-[0_0_24px_rgba(74,222,128,0.1)]">
                1
              </div>
              <h3 className="text-base font-bold mb-2 tracking-[-0.2px]">
                Discovery Call
              </h3>
              <p className="text-[13.5px] text-text-dim leading-[1.7]">
                A 30-minute call where we find out exactly where leads are
                dying and what&apos;s leaving money on the table. Free, no
                strings attached.
              </p>
            </RevealOnScroll>
            <RevealOnScroll className="bg-surface p-10 px-7 text-center transition-[background] duration-400 hover:bg-[#121212] group">
              <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center text-[22px] font-black text-accent mx-auto mb-5 transition-all duration-300 group-hover:border-accent-border-dim group-hover:bg-accent-dim group-hover:shadow-[0_0_24px_rgba(74,222,128,0.1)]">
                2
              </div>
              <h3 className="text-base font-bold mb-2 tracking-[-0.2px]">
                Build Your Engine
              </h3>
              <p className="text-[13.5px] text-text-dim leading-[1.7]">
                We don&apos;t hand you a template. Our team custom-builds your
                entire marketing operation — from website to ad campaigns to
                lead follow-up — around how your business actually works.
              </p>
            </RevealOnScroll>
            <RevealOnScroll className="bg-surface p-10 px-7 text-center transition-[background] duration-400 hover:bg-[#121212] group">
              <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center text-[22px] font-black text-accent mx-auto mb-5 transition-all duration-300 group-hover:border-accent-border-dim group-hover:bg-accent-dim group-hover:shadow-[0_0_24px_rgba(74,222,128,0.1)]">
                3
              </div>
              <h3 className="text-base font-bold mb-2 tracking-[-0.2px]">
                Optimize &amp; Scale
              </h3>
              <p className="text-[13.5px] text-text-dim leading-[1.7]">
                Our team watches the data, cuts what doesn&apos;t work, and
                doubles down on what does. Your marketing gets sharper every
                month — and so do your results.
              </p>
            </RevealOnScroll>
          </div>
          <RevealOnScroll>
            <div className="text-center mt-10">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-text-mid text-[14px] font-semibold no-underline transition-all duration-300 hover:text-accent"
              >
                See the full process
                <ArrowIcon />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-40 text-center relative overflow-hidden border-t border-border">
        <div className="cta-glow" />
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 relative z-2">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
              Ready to grow?
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
              Ready to build your
              <br />
              <span className="text-accent">growth engine?</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll>
            <p className="text-[17px] text-text-dim leading-[1.7] max-w-[540px] mx-auto mb-12">
              Stop guessing and start growing. Book a free, no-obligation
              discovery call to see if we&apos;re the right fit for your
              business.
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <Link
              href="/contact"
              className="btn-primary-hover inline-flex items-center gap-2.5 bg-accent text-black px-9 py-4 rounded-full text-[15px] font-bold no-underline transition-all duration-300 tracking-[-0.01em]"
            >
              Book Your Free Call
              <ArrowIcon />
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
