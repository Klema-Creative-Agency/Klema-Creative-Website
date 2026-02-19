import Link from "next/link";
import RevealOnScroll from "../components/RevealOnScroll";
import ComparisonTable from "../components/ComparisonTable";

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export default function PackagesPage() {
  return (
    <>
      {/* PACKAGES HERO */}
      <section className="packages-hero-bg pt-[140px] pb-20 text-center relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">Packages</p>
          </RevealOnScroll>
          <RevealOnScroll>
            <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
              Everything included.<br />No <span className="text-accent">surprises.</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll>
            <p className="text-[17px] text-text-dim leading-[1.7] max-w-[540px] mx-auto">
              Each package is a complete marketing system — not a menu of add-ons. Pick the tier that matches your growth stage and we handle the rest.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Package 1: Digital Foundation */}
      <section className="pt-10 pb-20">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <div className="grid grid-cols-2 gap-18 items-start max-lg:grid-cols-1 max-lg:gap-10">
            <RevealOnScroll>
              <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-accent mb-2">Tier 1</p>
              <h2 className="text-4xl font-extrabold tracking-[-1px] mb-2">Digital Foundation</h2>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl font-black tracking-[-2px]">
                  <span className="text-xl font-semibold align-super">$</span>3,500
                </span>
              </div>
              <p className="text-sm text-text-dim mb-8">per month &middot; no long-term contract</p>
              <p className="text-base text-text-mid leading-[1.8] mb-8">
                The essential digital infrastructure every growing local business needs. We build your online presence from the ground up — a professional website, SEO foundation, content engine, and the analytics to track it all. Perfect for businesses just getting serious about digital marketing.
              </p>
              <p className="text-[13px] font-bold text-accent uppercase tracking-[0.1em] mb-3">Best for</p>
              <p className="text-[15px] text-text-dim leading-[1.7]">
                Local businesses ready to build a professional online presence and start generating consistent inbound leads.
              </p>
            </RevealOnScroll>
            <RevealOnScroll>
              <div className="bg-surface border border-border rounded-[20px] p-9">
                <p className="text-[13px] font-bold text-text-mid uppercase tracking-[0.1em] mb-5">What&apos;s included</p>
                <ul className="price-features list-none mb-7 flex flex-col gap-3">
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">Professional website optimized for conversions (WordPress)</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">Advanced SEO &amp; AEO (AI search optimization)</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">2 SEO-optimized blog articles per month</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">Social media management — 1 platform</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">CRM setup with lead capture forms</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">Google Analytics &amp; Search Console setup</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">Monthly performance report</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">Monthly strategy call with your account lead</li>
                </ul>
                <Link href="/contact" className="btn-primary-hover flex items-center justify-center gap-2.5 w-full bg-accent text-black py-4 rounded-full text-[15px] font-bold no-underline transition-all duration-300 tracking-[-0.01em]">
                  Get Started
                  <ArrowIcon />
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Package 2: Growth Accelerator */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <div className="growth-card-highlight rounded-[24px] p-10 max-md:p-6">
          <div className="grid grid-cols-2 gap-18 items-start max-lg:grid-cols-1 max-lg:gap-10">
            <RevealOnScroll>
              <div className="flex items-center gap-3 mb-4">
                <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-accent">Tier 2</p>
                <span className="bg-accent text-black px-3.5 py-1 rounded-full text-[10px] font-extrabold tracking-[0.06em] uppercase">Most Popular</span>
              </div>
              <h2 className="text-4xl font-extrabold tracking-[-1px] mb-2">Growth Accelerator</h2>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl font-black tracking-[-2px]">
                  <span className="text-xl font-semibold align-super">$</span>8,000
                </span>
              </div>
              <p className="text-sm text-text-dim mb-8">per month &middot; no long-term contract</p>
              <p className="text-base text-text-mid leading-[1.8] mb-8">
                A complete growth engine. Everything in Digital Foundation plus a high-performance Next.js website, dedicated lead nurturing team, reputation management, and advanced SEO with competitor analysis. This is where the compounding starts.
              </p>
              <p className="text-[13px] font-bold text-accent uppercase tracking-[0.1em] mb-3">Best for</p>
              <p className="text-[15px] text-text-dim leading-[1.7]">
                Growing businesses ready to scale aggressively and become the go-to choice in their local market.
              </p>
            </RevealOnScroll>
            <RevealOnScroll>
              <div className="bg-surface border border-accent-border-light rounded-[20px] p-9">
                <p className="text-[13px] font-bold text-text-mid uppercase tracking-[0.1em] mb-5">What&apos;s included</p>
                <ul className="price-features list-none mb-7 flex flex-col gap-3">
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">Everything in Digital Foundation, plus:</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">High-performance Next.js website</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">4 SEO-optimized blog articles per month</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">20 hours/month dedicated lead nurturing &amp; follow-up</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">Leads contacted within 24 hours</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">Reputation management &amp; review generation</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">Automated email nurture sequences</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">Advanced SEO with competitor analysis</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">Technical site audits &amp; optimization</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">Advanced reporting dashboard</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">Bi-weekly strategy calls</li>
                </ul>
                <Link href="/contact" className="btn-primary-hover flex items-center justify-center gap-2.5 w-full bg-accent text-black py-4 rounded-full text-[15px] font-bold no-underline transition-all duration-300 tracking-[-0.01em]">
                  Get Started
                  <ArrowIcon />
                </Link>
              </div>
            </RevealOnScroll>
          </div>
          </div>
        </div>
      </section>

      {/* Package 3: Market Dominator */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <div className="grid grid-cols-2 gap-18 items-start max-lg:grid-cols-1 max-lg:gap-10">
            <RevealOnScroll>
              <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-accent mb-2">Tier 3</p>
              <h2 className="text-4xl font-extrabold tracking-[-1px] mb-2">Market Dominator</h2>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl font-black tracking-[-2px]">
                  <span className="text-xl font-semibold align-super">$</span>10,000
                </span>
              </div>
              <p className="text-sm text-text-dim mb-8">per month &middot; no long-term contract</p>
              <p className="text-base text-text-mid leading-[1.8] mb-8">
                White-glove, full-team engagement for businesses ready to become the undisputed leader in their market. You get a fully custom website, a full lead management team contacting leads within 5 minutes, live hot transfers to your sales team, and a dedicated account manager who treats your business like their own.
              </p>
              <p className="text-[13px] font-bold text-accent uppercase tracking-[0.1em] mb-3">Best for</p>
              <p className="text-[15px] text-text-dim leading-[1.7]">
                Established businesses that want a full outsourced marketing department without the overhead of building one in-house.
              </p>
            </RevealOnScroll>
            <RevealOnScroll>
              <div className="bg-surface border border-border rounded-[20px] p-9">
                <p className="text-[13px] font-bold text-text-mid uppercase tracking-[0.1em] mb-5">What&apos;s included</p>
                <ul className="price-features list-none mb-7 flex flex-col gap-3">
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">Everything in Growth Accelerator, plus:</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">Fully custom Next.js website</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">6–8 SEO-optimized blog articles per month</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">80+ hours/month full lead management team</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">Leads contacted within 5 minutes</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">Live hot transfers to your sales team</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">Authority content &amp; topic cluster strategy</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">Proactive backlink building campaigns</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">White-glove dedicated account manager</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">Daily updates &amp; weekly strategy calls</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">Quarterly business reviews</li>
                </ul>
                <Link href="/contact" className="btn-primary-hover flex items-center justify-center gap-2.5 w-full bg-accent text-black py-4 rounded-full text-[15px] font-bold no-underline transition-all duration-300 tracking-[-0.01em]">
                  Book a Call
                  <ArrowIcon />
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-20 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <div className="text-center">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">Compare</p>
              <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">Quick comparison.</h2>
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <ComparisonTable />
          </RevealOnScroll>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-40 text-center relative overflow-hidden border-t border-border">
        <div className="cta-glow" />
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 relative z-2">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">Not sure?</p>
          </RevealOnScroll>
          <RevealOnScroll>
            <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
              Let&apos;s find the right<br />fit <span className="text-accent">together.</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll>
            <p className="text-[17px] text-text-dim leading-[1.7] max-w-[540px] mx-auto mb-12">
              Book a free discovery call and we&apos;ll give you an honest recommendation based on your business, goals, and budget — even if it&apos;s not us.
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <Link href="/contact" className="btn-primary-hover inline-flex items-center gap-2.5 bg-accent text-black px-9 py-4 rounded-full text-[15px] font-bold no-underline transition-all duration-300 tracking-[-0.01em]">
              Book a Free Discovery Call
              <ArrowIcon />
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
