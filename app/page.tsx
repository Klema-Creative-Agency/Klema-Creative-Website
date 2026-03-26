import Link from "next/link";
import HomeBackground from "./components/HomeBackground";
import LeadFeed from "./components/LeadFeed";
import RevealOnScroll from "./components/RevealOnScroll";
import HeroSection from "./components/HeroSection";
import ProblemSection from "./components/ProblemSection";
import SplitHeading from "./components/SplitHeading";
import ScannerPopup from "./components/ScannerPopup";
import CustomerJourney from "./components/CustomerJourney";

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
    <div className="relative">
      {/* Site-wide background — fades in as you scroll */}
      <HomeBackground />

      {/* HERO */}
      <HeroSection />

      {/* LEAD FEED */}
      <LeadFeed />

      {/* PROBLEM */}
      <ProblemSection />
      <ScannerPopup />

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
                Not an agency that sends you reports. A system that sends you customers.
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
                Get Found First
              </h3>
              <p className="text-[14.5px] text-text-dim leading-[1.7]">
                I get your business to the top of Google: search results, map pack, and AI recommendations. SEO, Google Business Profile, reputation management, and AI visibility. When someone needs your service in San Antonio, they find you before anyone else.
              </p>
            </RevealOnScroll>
            <RevealOnScroll className="bg-surface border border-border rounded-2xl p-10 px-8 max-md:p-7 transition-[background] duration-400 hover:bg-[#121212] group">
              <div className="w-12 h-12 rounded-xl bg-accent-dim text-accent flex items-center justify-center mb-6 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(74,222,128,0.15)]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2.5 tracking-[-0.3px]">
                Respond Before Your Competition
              </h3>
              <p className="text-[14.5px] text-text-dim leading-[1.7]">
                When a lead comes in, my system calls them within 60 seconds. Then follows up with texts and emails automatically. At 2am on a Saturday? Still covered. You never lose another job because you were too slow.
              </p>
            </RevealOnScroll>
            <RevealOnScroll className="bg-surface border border-border rounded-2xl p-10 px-8 max-md:p-7 transition-[background] duration-400 hover:bg-[#121212] group">
              <div className="w-12 h-12 rounded-xl bg-accent-dim text-accent flex items-center justify-center mb-6 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(74,222,128,0.15)]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.88.36 1.74.7 2.55" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2.5 tracking-[-0.3px]">
                Close More Jobs
              </h3>
              <p className="text-[14.5px] text-text-dim leading-[1.7]">
                Automated appointment booking, proposal follow-ups, review requests, and referral campaigns. The system doesn&apos;t just get you leads. It helps you close them and turns happy customers into repeat business.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* CUSTOMER JOURNEY */}
      <CustomerJourney />

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-30 max-md:py-20">
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
                Free Marketing Audit
              </h3>
              <p className="text-[13.5px] text-text-dim leading-[1.7]">
                I personally analyze your Google rankings, your website, your
                reviews, and your competitors. You&apos;ll see exactly where leads
                are falling through the cracks, and what it would take to fix
                them. Free, no strings attached.
              </p>
            </RevealOnScroll>
            <RevealOnScroll className="bg-surface p-10 px-7 text-center transition-[background] duration-400 hover:bg-[#121212] group">
              <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center text-[22px] font-black text-accent mx-auto mb-5 transition-all duration-300 group-hover:border-accent-border-dim group-hover:bg-accent-dim group-hover:shadow-[0_0_24px_rgba(74,222,128,0.1)]">
                2
              </div>
              <h3 className="text-base font-bold mb-2 tracking-[-0.2px]">
                I Build Your System
              </h3>
              <p className="text-[13.5px] text-text-dim leading-[1.7]">
                No templates. No cookie-cutter campaigns. I build your entire
                marketing engine around how your business actually works: your
                services, your market, your goals. Website, SEO, lead follow-up,
                CRM, all of it.
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
                I watch the data every week. What&apos;s working gets doubled down.
                What&apos;s not gets cut. Your marketing gets sharper every
                month, and so do your results.
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

      {/* FOUNDING CLIENT OFFER */}
      <section className="relative overflow-hidden py-20 max-md:py-14">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(74,222,128,0.08) 0%, rgba(74,222,128,0.04) 50%, rgba(74,222,128,0.08) 100%)",
          }}
        />
        <div className="absolute inset-0 border-t border-b border-accent/10" />
        <div className="max-w-[800px] mx-auto px-8 max-md:px-5 relative z-2">
          <div className="text-center mb-10">
            <RevealOnScroll>
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
                Founding client program · limited spots
              </p>
            </RevealOnScroll>
            <RevealOnScroll>
              <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
                Now Accepting{" "}
                <span className="text-accent">Founding Clients</span>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll>
              <p className="text-[17px] text-text-dim leading-[1.7] max-w-[620px] mx-auto">
                I&apos;m looking for 5 local service businesses in San Antonio to partner with as founding clients. I build your complete marketing engine (website, Google rankings, lead follow-up, the full system) at a reduced rate, and you help me build my portfolio with a case study and testimonial.
              </p>
            </RevealOnScroll>
          </div>
          <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
            <RevealOnScroll>
              <div className="bg-surface/80 border border-border rounded-2xl p-7">
                <h3 className="text-[15px] font-bold mb-4">What you get:</h3>
                <ul className="flex flex-col gap-2.5">
                  {[
                    "Full system build at a fraction of the normal investment",
                    "Direct access to me. Not an account manager, not a chatbot",
                    "Founding client pricing locked in for as long as you stay",
                    "Month-to-month. No contracts. I earn your business every month",
                    "You keep everything if you ever leave: your website, your data, all of it",
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
              <div className="bg-surface/80 border border-border rounded-2xl p-7">
                <h3 className="text-[15px] font-bold mb-4">What I ask:</h3>
                <ul className="flex flex-col gap-2.5">
                  {[
                    "Be open to sharing your results as a case study (with your approval)",
                    "Leave an honest testimonial if the system delivers",
                    "Refer other business owners if you're happy",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13.5px] text-text-mid leading-[1.5]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3" className="shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-[13px] text-text-dim leading-[1.6] mt-5 pt-5 border-t border-border italic">
                  Why am I doing this? Because I&apos;d rather prove my system works with real results than ask you to take my word for it. Your success is my proof of concept.
                </p>
              </div>
            </RevealOnScroll>
          </div>
          <RevealOnScroll>
            <div className="text-center mt-10">
              <Link
                href="/contact"
                className="btn-primary-hover inline-flex items-center gap-2.5 bg-accent text-black px-9 py-4 rounded-full text-[15px] font-bold no-underline transition-all duration-300 tracking-[-0.01em] shadow-[0_0_20px_rgba(74,222,128,0.25),0_4px_16px_rgba(0,0,0,0.3)]"
              >
                Claim Your Founding Client Spot
                <ArrowIcon />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-40 text-center relative overflow-hidden">
        <div className="cta-glow" />
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 relative z-2">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
              Ready to grow?
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
              Stop losing jobs to the business
              <br />
              that just <span className="text-accent">called back faster.</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll>
            <p className="text-[17px] text-text-dim leading-[1.7] max-w-[540px] mx-auto mb-4">
              Book a free marketing audit. I&apos;ll show you exactly where leads are
              falling through the cracks and what it would take to fix them, even
              if you never hire me.
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <Link
              href="/contact"
              className="btn-primary-hover inline-flex items-center gap-2.5 bg-accent text-black px-9 py-4 rounded-full text-[15px] font-bold no-underline transition-all duration-300 tracking-[-0.01em]"
            >
              Get Your Free Audit
              <ArrowIcon />
            </Link>
            <p className="text-[13px] text-text-dim mt-4">
              Free. No obligation. 15 minutes. You&apos;ll walk away with a clear picture of where you stand.
            </p>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
