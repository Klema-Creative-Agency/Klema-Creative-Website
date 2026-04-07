import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const faqs = [
  {
    q: "How quickly will I start seeing leads?",
    a: "Most clients see their first leads within 14 days of onboarding. The automation (Missed Call Text-Back, review requests) goes live within 48 hours. Google Ads campaigns typically generate leads within the first week once approved.",
  },
  {
    q: "Do I own my website and CRM account?",
    a: "Yes, 100%. Unlike some agencies that hold your assets hostage, everything we build belongs to you. Your website, your CRM account, your ad accounts. You take them with you if you ever leave.",
  },
  {
    q: "What trades do you specialize in?",
    a: "We focus exclusively on local home services in San Antonio and surrounding areas: HVAC, plumbing, roofing, electrical, landscaping, pest control, and general contracting.",
  },
  {
    q: "How is this different from Angi or HomeAdvisor?",
    a: "Angi and HomeAdvisor sell the same lead to 5-10 contractors simultaneously. We build a system that generates exclusive leads directly for your business. You're the only one who gets that lead.",
  },
  {
    q: "What tools do you use for automation?",
    a: "We use an industry-leading CRM and automation platform that we fully customize for your business. We handle the entire setup and management. You get a simple dashboard to see your leads and pipeline.",
  },
  {
    q: "Is there a long-term contract?",
    a: "No. All plans are month-to-month. We recommend 90 days to see full results, but you can cancel anytime. No lock-in.",
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
              <div className="w-6 sm:w-8 h-px bg-[var(--brand-lime)]" />
              <span className="section-label text-[var(--brand-green-mid)]">
                FAQ
              </span>
            </div>
            <h2
              className="text-foreground mb-4 sm:mb-6 font-extrabold"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.625rem)", letterSpacing: "-0.025em", lineHeight: 1.15 }}
            >
              Got Questions?
              <br className="hidden sm:block" />
              <span className="text-primary"> We've Got Answers.</span>
            </h2>
            <p className="text-muted-foreground mb-6 sm:mb-8 font-body text-[0.875rem] sm:text-base leading-[1.65] sm:leading-[1.7]">
              Here are the most common questions we get from San Antonio contractors before they sign on.
            </p>
            <a href="#contact" className="btn-primary hidden lg:inline-flex">
              Get My Free Audit
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
                        <Minus className="w-3.5 h-3.5 text-[var(--brand-lime)]" strokeWidth={2.5} />
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
                Get your free audit
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
