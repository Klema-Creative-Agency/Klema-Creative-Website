import { useState } from "react";
import { Plus, Minus, Zap } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const faqs = [
  {
    q: "Do I own my logo, brand files, and website?",
    a: "Yes, 100%. Every logo file, wrap design, and website we create belongs to you, including the source files. Unlike agencies that hold your assets hostage, you take everything with you if you ever leave.",
  },
  {
    q: "Do you design AND print the wraps?",
    a: "Yes, and that's the difference. Most branding agencies design your wrap and mail the files to a print shop that has never seen your brand. We design and print under one roof in San Antonio, so what rolls out matches what you approved, and there's one team accountable for the whole thing.",
  },
  {
    q: "Can you help me name my company or write a tagline?",
    a: "Yes. The right name and tagline come before the logo, and it's some of the most valuable work we do. If your current name works, we keep it. If it's holding you back, we'll tell you honestly and help you find one worth painting on a truck.",
  },
  {
    q: "What trades do you work with?",
    a: "We focus on local home services in San Antonio and surrounding areas: HVAC, plumbing, roofing, electrical, landscaping, pest control, remodeling, and general contracting.",
  },
  {
    q: "How long does a full rebrand take?",
    a: "A typical timeline: brand identity in 2 to 3 weeks, wrap design and printing in 1 to 2 weeks after you approve the proof, and the website in about 2 weeks. Most full rebrands are on the road in 6 to 8 weeks.",
  },
  {
    q: "Is there a long-term contract?",
    a: "No. Brand, wrap, and website projects are one-time purchases that you own outright. The website care plan is month-to-month and you can cancel anytime.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { ref, visible } = useReveal();

  return (
    <section id="faq" className="cream-section py-16 sm:py-24">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left column */}
          <div className="lg:sticky lg:top-24">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-3.5 h-3.5 text-[var(--brand-gold)] shrink-0" fill="currentColor" strokeWidth={2.5} />
              <span className="section-label text-[var(--brand-mid)]">
                FAQ
              </span>
            </div>
            <h2
              className="text-foreground mb-4 sm:mb-6 font-extrabold"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.625rem)", letterSpacing: "0", lineHeight: 1.15 }}
            >
              Got Questions?
              <br className="hidden sm:block" />
              <span className="text-primary"> We've Got Answers.</span>
            </h2>
            <p className="text-muted-foreground mb-6 sm:mb-8 font-body text-[0.875rem] sm:text-base leading-[1.65] sm:leading-[1.7]">
              Here are the most common questions we get from San Antonio contractors before they sign on.
            </p>
            <a href="#contact" className="btn-primary hidden lg:inline-flex">
              Get My Free Brand Audit
            </a>
          </div>

          {/* Right column: accordion */}
          <div ref={ref} className="flex flex-col gap-2.5 sm:gap-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`bg-white border border-border rounded-md overflow-hidden reveal-up stagger-${Math.min(index + 1, 6)} ${visible ? "revealed" : ""}`}
                >
                  <button
                    className="w-full flex items-center justify-between p-4 sm:p-6 text-left gap-3 sm:gap-4 min-h-[56px] active:bg-muted/30 transition-colors"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-foreground font-display font-bold text-[0.9375rem] sm:text-[1rem] leading-snug">
                      {faq.q}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-colors duration-200 ${
                        isOpen ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5 text-[var(--brand-gold)]" strokeWidth={2.5} />
                      ) : (
                        <Plus className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={2.5} />
                      )}
                    </div>
                  </button>
                  <div className="faq-answer" data-open={isOpen}>
                    <div>
                      <div className="px-4 pb-4 sm:px-6 sm:pb-6">
                        <p className="text-muted-foreground font-body text-[0.875rem] sm:text-[0.9375rem] leading-[1.65] sm:leading-[1.7]">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Soft text link instead of fat CTA button */}
            <p className="text-center text-muted-foreground text-[0.875rem] font-body mt-4 lg:hidden">
              Ready to get started?{" "}
              <a href="#contact" className="text-primary font-semibold hover:underline">
                Get your free brand audit
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
