"use client";

import { useState } from "react";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import { FAQ_ITEMS } from "../data/funnel-content";

export default function FunnelFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 max-md:py-14 border-t border-border">
      <div className="max-w-[700px] mx-auto px-8 max-md:px-5">
        <RevealOnScroll>
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4 text-center">
            Questions
          </p>
          <h2 className="text-[clamp(22px,5vw,36px)] font-extrabold leading-[1.15] tracking-[-1px] mb-12 text-center">
            Frequently Asked Questions
          </h2>
        </RevealOnScroll>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <RevealOnScroll key={i}>
              <div className="bg-surface border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-[15px] font-semibold leading-[1.4]">
                    {item.question}
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`text-text-dim shrink-0 transition-transform duration-300 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div className={`faq-answer ${openIndex === i ? "open" : ""}`}>
                  <div>
                    <p className="px-5 pb-4 text-[14px] text-text-dim leading-[1.7]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
