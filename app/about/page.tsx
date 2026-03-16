import type { Metadata } from "next";
import Link from "next/link";
import RevealOnScroll from "../components/RevealOnScroll";

export const metadata: Metadata = {
  title: "About Klema Creative | San Antonio Marketing Agency",
  description:
    "I started Klema Creative because I was tired of watching San Antonio businesses get ripped off by agencies that charge for vanity metrics. I build marketing engines measured by one thing: did your phone ring?",
  openGraph: {
    title: "About Klema Creative | San Antonio Marketing Agency",
    description:
      "I started Klema Creative because local businesses deserve better than vanity metrics and cookie-cutter campaigns.",
  },
};

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

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-20 max-md:pt-32 max-md:pb-14">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
              About Klema Creative
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <h1 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-6">
              I started Klema Creative because I was tired of watching San Antonio businesses{" "}
              <span className="text-accent">get ripped off.</span>
            </h1>
          </RevealOnScroll>
        </div>
      </section>

      {/* FOUNDER STORY */}
      <section className="border-t border-border py-24 max-md:py-16">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <div className="grid grid-cols-[300px_1fr] gap-16 items-start max-md:grid-cols-1 max-md:gap-10">
            {/* Headshot placeholder */}
            <RevealOnScroll>
              <div className="sticky top-32">
                {/* TODO: Replace with real headshot - save to /public/about/headshot.jpg */}
                <div className="aspect-[3/4] rounded-2xl border border-border bg-surface flex items-center justify-center overflow-hidden">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-accent-dim text-accent flex items-center justify-center mx-auto mb-3">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <p className="text-xs text-text-dim">Headshot coming soon</p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-lg font-bold tracking-[-0.3px]">Tomas Amaya</p>
                  <p className="text-[13px] text-text-dim">Founder, Klema Creative</p>
                  <p className="text-[12px] text-text-dim mt-1">San Antonio, TX</p>
                </div>
              </div>
            </RevealOnScroll>

            {/* Story */}
            <div>
              <RevealOnScroll>
                <p className="text-[15px] text-text-dim leading-[1.8] mb-5">
                  I&apos;m Tomas Amaya, and here&apos;s the truth: I&apos;ve seen too many
                  local business owners (plumbers, roofers, HVAC techs,
                  dentists) hand over $3,000 a month to marketing agencies and get
                  nothing but a PDF full of &ldquo;impressions&rdquo; and &ldquo;clicks&rdquo;
                  that don&apos;t mean a damn thing.
                </p>
              </RevealOnScroll>
              <RevealOnScroll>
                <p className="text-[15px] text-text-dim leading-[1.8] mb-5">
                  No leads. No booked jobs. No accountability. Just a contract they
                  can&apos;t get out of.
                </p>
              </RevealOnScroll>
              <RevealOnScroll>
                <p className="text-[15px] text-text-dim leading-[1.8] mb-5 italic">
                  That&apos;s not marketing. That&apos;s a subscription to disappointment.
                </p>
              </RevealOnScroll>
              <RevealOnScroll>
                <p className="text-[15px] text-text-dim leading-[1.8] mb-5">
                  So I built something different.
                </p>
              </RevealOnScroll>
              <RevealOnScroll>
                <p className="text-[15px] text-text leading-[1.8] font-medium mb-5">
                  Klema Creative is a marketing engine, not an agency. Every system
                  I build is measured by one number: did your phone ring with a qualified
                  lead? Not clicks. Not impressions. Revenue.
                </p>
              </RevealOnScroll>
              <RevealOnScroll>
                <p className="text-[15px] text-text-dim leading-[1.8] mb-5">
                  Here&apos;s how it works: I build your entire lead generation
                  system (your website, your Google rankings, your follow-up
                  automation) so that when someone searches for your service in San
                  Antonio, they find you first. And when they reach out, my system
                  responds within 60 seconds. Calls, texts, emails, all automatic,
                  even at 2am on a Saturday.
                </p>
              </RevealOnScroll>
              <RevealOnScroll>
                <p className="text-[15px] text-text leading-[1.8] font-bold mb-8">
                  You don&apos;t chase leads. You close them.
                </p>
              </RevealOnScroll>

              {/* WHY FOUNDING CLIENT */}
              <RevealOnScroll>
                <div className="border-t border-border pt-8 mb-8">
                  <h2 className="text-[clamp(24px,3vw,32px)] font-extrabold leading-[1.15] tracking-[-1px] mb-5">
                    Why &ldquo;founding client&rdquo;?
                  </h2>
                  <p className="text-[15px] text-text-dim leading-[1.8] mb-5">
                    I&apos;m going to be straight with you: Klema Creative is new. I
                    don&apos;t have a wall of logos or a decade of agency awards.
                  </p>
                  <p className="text-[15px] text-text-dim leading-[1.8] mb-5">
                    What I do have is a system I believe in enough to bet on. That&apos;s
                    why I&apos;m offering a small number of founding client
                    partnerships. I build your entire marketing engine, you see real
                    results, and we grow together.
                  </p>
                </div>
              </RevealOnScroll>

              <div className="grid grid-cols-2 gap-6 mb-8 max-md:grid-cols-1">
                <RevealOnScroll>
                  <div className="bg-surface border border-border rounded-2xl p-6">
                    <h3 className="text-[15px] font-bold mb-4">What founding clients get:</h3>
                    <ul className="flex flex-col gap-2.5">
                      {[
                        "Full system build at reduced rates (locked in for life)",
                        "Direct access to me. No account managers, no runaround",
                        "Priority support and white-glove onboarding",
                        "A say in how the system evolves (your feedback shapes the product)",
                        "Month-to-month, no contracts. I earn your business every single month",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-[13.5px] text-text-mid leading-[1.5]">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3" className="shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12" /></svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </RevealOnScroll>
                <RevealOnScroll>
                  <div className="bg-surface border border-border rounded-2xl p-6">
                    <h3 className="text-[15px] font-bold mb-4">What I ask in return:</h3>
                    <ul className="flex flex-col gap-2.5">
                      {[
                        "Be willing to share your results as a case study",
                        "Give me an honest testimonial if the system works",
                        "Tell other business owners about Klema if you're happy",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-[13.5px] text-text-mid leading-[1.5]">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3" className="shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12" /></svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="text-[13px] text-text-dim mt-5 pt-4 border-t border-border">
                      That&apos;s it. No catch.
                    </p>
                  </div>
                </RevealOnScroll>
              </div>

              {/* THE BOTTOM LINE */}
              <RevealOnScroll>
                <div className="border-t border-border pt-8">
                  <h2 className="text-[clamp(24px,3vw,32px)] font-extrabold leading-[1.15] tracking-[-1px] mb-5">
                    The bottom line
                  </h2>
                  <p className="text-[15px] text-text-dim leading-[1.8] mb-5">
                    Big agencies treat you like an account number. I&apos;ll treat your
                    business like my own, because right now, your success IS my
                    success.
                  </p>
                  <p className="text-[15px] text-text leading-[1.8] font-medium">
                    I&apos;m not here to collect a check and send you a report.
                    I&apos;m here to make your phone ring.
                  </p>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 text-center relative overflow-hidden border-t border-border">
        <div className="cta-glow" />
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 relative z-2">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
              Ready to be a founding client?
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
              I&apos;m accepting 5 founding client
              <br />
              partnerships <span className="text-accent">this quarter.</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll>
            <p className="text-[17px] text-text-dim leading-[1.7] max-w-[540px] mx-auto mb-8">
              If you&apos;re a local service business in San Antonio and you want a
              marketing system that&apos;s built around results, not
              contracts, let&apos;s talk.
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <Link
              href="/contact"
              className="btn-primary-hover inline-flex items-center gap-2.5 bg-accent text-black px-9 py-4 rounded-full text-[15px] font-bold no-underline transition-all duration-300 tracking-[-0.01em]"
            >
              Book a Free 15-Minute Call
              <ArrowIcon />
            </Link>
            <p className="text-[13px] text-text-dim mt-4">
              No sales pitch. Just an honest look at where your leads are falling through the cracks.
            </p>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
