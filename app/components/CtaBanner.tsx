"use client";

import Link from "next/link";
import RevealOnScroll from "./RevealOnScroll";

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

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden py-16">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(74,222,128,0.08) 0%, rgba(74,222,128,0.04) 50%, rgba(74,222,128,0.08) 100%)",
        }}
      />
      <div className="absolute inset-0 border-t border-b border-accent/10" />
      <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 relative z-2 text-center">
        <RevealOnScroll>
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
            Don&apos;t wait
          </p>
        </RevealOnScroll>
        <RevealOnScroll>
          <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
            Ready to Stop Losing Leads?
          </h2>
        </RevealOnScroll>
        <RevealOnScroll>
          <p className="text-[17px] text-text-dim leading-[1.7] max-w-[480px] mx-auto mb-8">
            Every day without a lead engine is money left on the table.
            Let&apos;s fix that.
          </p>
        </RevealOnScroll>
        <RevealOnScroll>
          <div className="flex items-center justify-center gap-4 max-md:flex-col max-md:gap-3">
            <Link
              href="/contact"
              className="btn-primary-hover inline-flex items-center gap-2.5 bg-accent text-black px-9 py-4 rounded-full text-[15px] font-bold no-underline transition-all duration-300 tracking-[-0.01em] shadow-[0_0_20px_rgba(74,222,128,0.25),0_4px_16px_rgba(0,0,0,0.3)]"
            >
              Get Your Free Marketing Audit
              <ArrowIcon />
            </Link>
            <Link
              href="/packages"
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full text-[15px] font-bold no-underline transition-all duration-300 tracking-[-0.01em] border border-border text-text hover:bg-white/[0.04] hover:border-white/[0.12]"
            >
              See Our Packages
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
