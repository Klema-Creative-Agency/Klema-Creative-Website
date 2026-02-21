import type { Metadata } from "next";
import Link from "next/link";
import RevealOnScroll from "../../components/RevealOnScroll";
import AiVisibilityScanner from "../../components/AiVisibilityScanner";

export const metadata: Metadata = {
  title: "Free AI Visibility Scanner | Klema Creative",
  description:
    "Check if your business is visible to ChatGPT, Gemini, Claude, Perplexity, Llama, and Mistral. Free AI visibility scan — see your score in 60 seconds.",
};

export default function AiVisibilityPage() {
  return (
    <>
      {/* Hero + Scanner */}
      <section
        className="pt-[140px] pb-20 max-md:pt-[130px] max-md:pb-14 text-center relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(74,222,128,0.07) 0%, transparent 70%), radial-gradient(ellipse 40% 35% at 55% 40%, rgba(74,222,128,0.04) 0%, transparent 60%)",
        }}
      >
        <div className="hero-glow hero-glow-breathe" />
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 relative z-2">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
              Free Tool
            </p>
            <h1 className="text-[clamp(36px,5.5vw,64px)] font-extrabold leading-[1.08] tracking-[-2px] mb-5 max-md:tracking-[-1.5px]">
              Is your business visible
              <br />
              to <span className="text-accent">AI?</span>
            </h1>
            <p className="text-[clamp(16px,1.8vw,19px)] text-text-dim leading-[1.7] max-w-[540px] mx-auto mb-12">
              ChatGPT, Gemini, Claude, and Perplexity are replacing Google for
              millions of users. Find out if they know your business exists — in
              60 seconds.
            </p>
          </RevealOnScroll>
          <AiVisibilityScanner />
        </div>
      </section>

      {/* Why AI Visibility Matters */}
      <section className="py-30 max-md:py-20 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
                Why this matters
              </p>
              <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
                AI is the new front door
                <br />
                to your business.
              </h2>
              <p className="text-[17px] text-text-dim leading-[1.7] max-w-[540px] mx-auto">
                Customers are asking AI assistants for recommendations instead of
                searching Google. If AI doesn&apos;t know you, you&apos;re invisible to a
                growing segment of your market.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-px bg-border border border-border rounded-2xl overflow-hidden">
              <div className="bg-surface p-10 max-md:p-7 transition-colors duration-400 hover:bg-card-hover accent-top-hover">
                <div className="w-10 h-10 rounded-[10px] bg-accent-dim flex items-center justify-center mb-5 text-xl">
                  🔍
                </div>
                <h3 className="text-lg font-bold tracking-[-0.2px] mb-2.5">
                  40% of Gen Z uses AI over Google
                </h3>
                <p className="text-sm text-text-dim leading-[1.7]">
                  Younger consumers prefer asking ChatGPT and Perplexity for
                  recommendations. If your business isn&apos;t in their training data,
                  you don&apos;t exist to these customers.
                </p>
              </div>
              <div className="bg-surface p-10 max-md:p-7 transition-colors duration-400 hover:bg-card-hover accent-top-hover">
                <div className="w-10 h-10 rounded-[10px] bg-blue-dim flex items-center justify-center mb-5 text-xl">
                  🏆
                </div>
                <h3 className="text-lg font-bold tracking-[-0.2px] mb-2.5">
                  AI recommends your competitors
                </h3>
                <p className="text-sm text-text-dim leading-[1.7]">
                  When AI doesn&apos;t know your business, it recommends others in
                  your space. Every unanswered AI query is a lead going to
                  someone else.
                </p>
              </div>
              <div className="bg-surface p-10 max-md:p-7 transition-colors duration-400 hover:bg-card-hover accent-top-hover">
                <div className="w-10 h-10 rounded-[10px] bg-amber-dim flex items-center justify-center mb-5 text-xl">
                  📈
                </div>
                <h3 className="text-lg font-bold tracking-[-0.2px] mb-2.5">
                  AEO is the new SEO
                </h3>
                <p className="text-sm text-text-dim leading-[1.7]">
                  Answer Engine Optimization ensures AI platforms cite and
                  recommend your business. Early movers are capturing market
                  share that&apos;s hard to get back.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 max-md:py-20 text-center relative overflow-hidden border-t border-border">
        <div className="cta-glow" />
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 relative z-2">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
              We can fix this
            </p>
            <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
              Ready to become visible
              <br />
              to <span className="text-accent">every AI?</span>
            </h2>
            <p className="text-[17px] text-text-dim leading-[1.7] max-w-[540px] mx-auto mb-12">
              Our AEO and content strategy gets your business cited by AI
              platforms — so you show up when customers ask for recommendations.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 bg-accent text-black px-9 py-4 rounded-full text-[15px] font-bold no-underline transition-all duration-300 tracking-[-0.01em] btn-primary-hover"
            >
              Book Your Free Discovery Call
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
