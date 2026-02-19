import Link from "next/link";
import RevealOnScroll from "../components/RevealOnScroll";

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export default function ServicesPage() {
  return (
    <>
      {/* SERVICES GRID */}
      <section className="border-t border-border pt-[140px] pb-30 max-md:pb-20">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">What we build</p>
            <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
              Everything your brand<br />needs to grow.
            </h2>
            <p className="text-[17px] text-text-dim leading-[1.7] max-w-[540px]">
              Strategy, design, development, and lead management — under one roof, working as one engine.
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="grid grid-cols-3 gap-px bg-border border border-border rounded-[20px] overflow-hidden mt-16 max-lg:grid-cols-2 max-md:grid-cols-1">
              {/* Website Design & Dev */}
              <div className="accent-top-hover bg-surface p-10 px-8 transition-[background] duration-400 hover:bg-[#121212]">
                <div className="w-10 h-10 rounded-[10px] bg-accent-dim text-accent flex items-center justify-center mb-5 text-xl">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
                </div>
                <h3 className="text-[17px] font-bold mb-2.5 tracking-[-0.2px]">Website Design &amp; Dev</h3>
                <p className="text-sm text-text-dim leading-[1.7]">Conversion-optimized sites built for speed, mobile performance, and turning visitors into paying customers.</p>
              </div>
              {/* SEO & AI Optimization */}
              <div className="accent-top-hover bg-surface p-10 px-8 transition-[background] duration-400 hover:bg-[#121212]">
                <div className="w-10 h-10 rounded-[10px] bg-accent-dim text-accent flex items-center justify-center mb-5 text-xl">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </div>
                <h3 className="text-[17px] font-bold mb-2.5 tracking-[-0.2px]">SEO &amp; AI Optimization</h3>
                <p className="text-sm text-text-dim leading-[1.7]">Data-driven SEO plus AEO optimization so you get found by Google and AI assistants alike.</p>
              </div>
              {/* Content Marketing */}
              <div className="accent-top-hover bg-surface p-10 px-8 transition-[background] duration-400 hover:bg-[#121212]">
                <div className="w-10 h-10 rounded-[10px] bg-blue-dim text-blue flex items-center justify-center mb-5 text-xl">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                </div>
                <h3 className="text-[17px] font-bold mb-2.5 tracking-[-0.2px]">Content Marketing</h3>
                <p className="text-sm text-text-dim leading-[1.7]">SEO-optimized articles and topic clusters that rank on Google and build authority in your market.</p>
              </div>
              {/* Social Media */}
              <div className="accent-top-hover bg-surface p-10 px-8 transition-[background] duration-400 hover:bg-[#121212]">
                <div className="w-10 h-10 rounded-[10px] bg-blue-dim text-blue flex items-center justify-center mb-5 text-xl">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                </div>
                <h3 className="text-[17px] font-bold mb-2.5 tracking-[-0.2px]">Social Media</h3>
                <p className="text-sm text-text-dim leading-[1.7]">Professional content, branded graphics, and consistent posting that builds loyal local audiences.</p>
              </div>
              {/* Lead Nurturing */}
              <div className="accent-top-hover bg-surface p-10 px-8 transition-[background] duration-400 hover:bg-[#121212]">
                <div className="w-10 h-10 rounded-[10px] bg-purple-dim text-purple flex items-center justify-center mb-5 text-xl">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.88.36 1.74.7 2.55"/></svg>
                </div>
                <h3 className="text-[17px] font-bold mb-2.5 tracking-[-0.2px]">Lead Nurturing</h3>
                <p className="text-sm text-text-dim leading-[1.7]">Every lead called, emailed, and followed up on a proven cadence — no opportunity falls through the cracks.</p>
              </div>
              {/* Reputation Mgmt */}
              <div className="accent-top-hover bg-surface p-10 px-8 transition-[background] duration-400 hover:bg-[#121212]">
                <div className="w-10 h-10 rounded-[10px] bg-purple-dim text-purple flex items-center justify-center mb-5 text-xl">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </div>
                <h3 className="text-[17px] font-bold mb-2.5 tracking-[-0.2px]">Reputation Mgmt</h3>
                <p className="text-sm text-text-dim leading-[1.7]">Automated review generation, 24-hour responses, and sentiment tracking for a 5-star reputation.</p>
              </div>
              {/* CRM & Automation */}
              <div className="accent-top-hover bg-surface p-10 px-8 transition-[background] duration-400 hover:bg-[#121212]">
                <div className="w-10 h-10 rounded-[10px] bg-accent-dim text-accent flex items-center justify-center mb-5 text-xl">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
                </div>
                <h3 className="text-[17px] font-bold mb-2.5 tracking-[-0.2px]">CRM &amp; Automation</h3>
                <p className="text-sm text-text-dim leading-[1.7]">Smart lead capture, contact management, and automated workflows that never let a lead slip through.</p>
              </div>
              {/* Analytics & Reporting */}
              <div className="accent-top-hover bg-surface p-10 px-8 transition-[background] duration-400 hover:bg-[#121212]">
                <div className="w-10 h-10 rounded-[10px] bg-blue-dim text-blue flex items-center justify-center mb-5 text-xl">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                </div>
                <h3 className="text-[17px] font-bold mb-2.5 tracking-[-0.2px]">Analytics &amp; Reporting</h3>
                <p className="text-sm text-text-dim leading-[1.7]">Full tracking setup with transparent monthly reports that show exactly what&apos;s working and why.</p>
              </div>
              {/* Live Hot Transfers */}
              <div className="accent-top-hover bg-surface p-10 px-8 transition-[background] duration-400 hover:bg-[#121212]">
                <div className="w-10 h-10 rounded-[10px] bg-purple-dim text-purple flex items-center justify-center mb-5 text-xl">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
                <h3 className="text-[17px] font-bold mb-2.5 tracking-[-0.2px]">Live Hot Transfers</h3>
                <p className="text-sm text-text-dim leading-[1.7]">Qualified leads connected directly to your team in real-time — inquiry to appointment in minutes.</p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* VALUES */}
      <section className="border-t border-border py-30 max-md:py-20">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">Why Klema</p>
            <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
              Not an agency.<br />Your growth engine.
            </h2>
          </RevealOnScroll>
          <div className="grid grid-cols-3 gap-12 mt-16 max-lg:grid-cols-1 max-lg:gap-9">
            <RevealOnScroll>
              <div className="value-num text-[64px] font-black leading-none mb-4 tracking-[-3px]">01</div>
              <h3 className="text-xl font-bold mb-2.5 tracking-[-0.3px]">Zero wasted spend</h3>
              <p className="text-[14.5px] text-text-dim leading-[1.7]">Every dollar tracked and accountable. No vanity metrics — just real returns you can measure.</p>
            </RevealOnScroll>
            <RevealOnScroll>
              <div className="value-num text-[64px] font-black leading-none mb-4 tracking-[-3px]">02</div>
              <h3 className="text-xl font-bold mb-2.5 tracking-[-0.3px]">Revenue-first thinking</h3>
              <p className="text-[14.5px] text-text-dim leading-[1.7]">Every decision — from pixel to campaign — is engineered to grow your bottom line.</p>
            </RevealOnScroll>
            <RevealOnScroll>
              <div className="value-num text-[64px] font-black leading-none mb-4 tracking-[-3px]">03</div>
              <h3 className="text-xl font-bold mb-2.5 tracking-[-0.3px]">Radical transparency</h3>
              <p className="text-[14.5px] text-text-dim leading-[1.7]">Real-time dashboards, honest reporting, and a team that communicates like partners.</p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-t border-border py-30 max-md:py-20">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <div className="text-center">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">How it works</p>
              <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
                From vision to velocity<br />in 4 steps.
              </h2>
            </div>
          </RevealOnScroll>
          <div className="grid grid-cols-4 gap-px bg-border border border-border rounded-[20px] overflow-hidden mt-16 max-lg:grid-cols-2 max-md:grid-cols-1">
            <RevealOnScroll className="bg-surface p-10 px-7 text-center transition-[background] duration-400 hover:bg-[#121212] group">
              <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center text-[22px] font-black text-accent mx-auto mb-5 transition-all duration-300 group-hover:border-accent-border-dim group-hover:bg-accent-dim group-hover:shadow-[0_0_24px_rgba(74,222,128,0.1)]">
                1
              </div>
              <h3 className="text-base font-bold mb-2 tracking-[-0.2px]">Discovery Call</h3>
              <p className="text-[13px] text-text-dim leading-[1.7]">We learn your business, goals, and challenges inside and out — no cookie-cutter approaches.</p>
            </RevealOnScroll>
            <RevealOnScroll className="bg-surface p-10 px-7 text-center transition-[background] duration-400 hover:bg-[#121212] group">
              <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center text-[22px] font-black text-accent mx-auto mb-5 transition-all duration-300 group-hover:border-accent-border-dim group-hover:bg-accent-dim group-hover:shadow-[0_0_24px_rgba(74,222,128,0.1)]">
                2
              </div>
              <h3 className="text-base font-bold mb-2 tracking-[-0.2px]">Strategy Blueprint</h3>
              <p className="text-[13px] text-text-dim leading-[1.7]">A custom roadmap tailored to your industry, audience, and growth targets with clear milestones.</p>
            </RevealOnScroll>
            <RevealOnScroll className="bg-surface p-10 px-7 text-center transition-[background] duration-400 hover:bg-[#121212] group">
              <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center text-[22px] font-black text-accent mx-auto mb-5 transition-all duration-300 group-hover:border-accent-border-dim group-hover:bg-accent-dim group-hover:shadow-[0_0_24px_rgba(74,222,128,0.1)]">
                3
              </div>
              <h3 className="text-base font-bold mb-2 tracking-[-0.2px]">Build &amp; Launch</h3>
              <p className="text-[13px] text-text-dim leading-[1.7]">Our team executes with precision — design, development, content, and campaigns go live.</p>
            </RevealOnScroll>
            <RevealOnScroll className="bg-surface p-10 px-7 text-center transition-[background] duration-400 hover:bg-[#121212] group">
              <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center text-[22px] font-black text-accent mx-auto mb-5 transition-all duration-300 group-hover:border-accent-border-dim group-hover:bg-accent-dim group-hover:shadow-[0_0_24px_rgba(74,222,128,0.1)]">
                4
              </div>
              <h3 className="text-base font-bold mb-2 tracking-[-0.2px]">Optimize &amp; Scale</h3>
              <p className="text-[13px] text-text-dim leading-[1.7]">Continuous data analysis, A/B testing, and refinement to compound results month over month.</p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="border-t border-border py-30 max-md:py-20">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">Pricing</p>
            <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
              Pick your path<br />to growth.
            </h2>
            <p className="text-[17px] text-text-dim leading-[1.7] max-w-[540px]">
              Three tiers designed to meet you where you are — and take you where you want to go. No hidden fees, no long-term contracts.
            </p>
          </RevealOnScroll>
          <div className="grid grid-cols-3 gap-5 mt-16 items-start max-lg:grid-cols-1 max-lg:max-w-[440px] max-lg:mx-auto">
            {/* Tier 1 */}
            <RevealOnScroll>
              <div className="bg-surface border border-border rounded-[20px] p-10 px-8 transition-all duration-400 hover:border-border-hover relative">
                <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-accent mb-2">Tier 1</p>
                <h3 className="text-2xl font-extrabold mb-1.5 tracking-[-0.5px]">Digital Foundation</h3>
                <p className="text-[13px] text-text-dim leading-[1.6] mb-7">Build your online presence from the ground up — the essential infrastructure every growing business needs.</p>
                <div className="text-5xl font-black tracking-[-2px] mb-1 leading-none">
                  <span className="text-xl font-semibold align-super mr-0.5">$</span>3,500
                </div>
                <p className="text-[13px] text-text-dim mb-7">per month</p>
                <div className="h-px bg-border mb-6" />
                <ul className="price-features list-none mb-8 flex flex-col gap-3">
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">Professional website built for conversions</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">SEO foundation &amp; keyword targeting</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">2 blog articles per month</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">Social media management (1 platform)</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">CRM setup with lead capture forms</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">AI search optimization (AEO)</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">Google Analytics &amp; Search Console</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">Monthly report &amp; strategy call</li>
                </ul>
                <Link href="/contact" className="block w-full py-3.5 rounded-full text-sm font-bold text-center no-underline transition-all duration-300 bg-white-6 text-text tracking-[0.01em] hover:bg-white-10 hover:-translate-y-px">
                  Get Started
                </Link>
              </div>
            </RevealOnScroll>
            {/* Tier 2 - Featured */}
            <RevealOnScroll>
              <div className="price-card-featured bg-surface border border-border rounded-[20px] p-10 px-8 transition-all duration-400 hover:border-border-hover relative">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-black px-[18px] py-[5px] rounded-full text-[11px] font-extrabold tracking-[0.06em] uppercase whitespace-nowrap">
                  Most Popular
                </div>
                <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-accent mb-2">Tier 2</p>
                <h3 className="text-2xl font-extrabold mb-1.5 tracking-[-0.5px]">Growth Accelerator</h3>
                <p className="text-[13px] text-text-dim leading-[1.6] mb-7">Everything in Foundation plus lead nurturing, reputation management, and advanced SEO.</p>
                <div className="text-5xl font-black tracking-[-2px] mb-1 leading-none">
                  <span className="text-xl font-semibold align-super mr-0.5">$</span>8,000
                </div>
                <p className="text-[13px] text-text-dim mb-7">per month</p>
                <div className="h-px bg-border mb-6" />
                <ul className="price-features list-none mb-8 flex flex-col gap-3">
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">Everything in Digital Foundation</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">High-Performance Next.js Website</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">4 blog articles per month</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">20 hours/month lead nurturing</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">Reputation management &amp; review generation</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">Automated email nurture sequences</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">Advanced reporting &amp; strategy calls</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">Bi-weekly strategy calls</li>
                </ul>
                <Link href="/contact" className="block w-full py-3.5 rounded-full text-sm font-bold text-center no-underline transition-all duration-300 bg-accent text-black tracking-[0.01em] hover:shadow-[0_0_32px_rgba(74,222,128,0.3)] hover:-translate-y-px">
                  Get Started
                </Link>
              </div>
            </RevealOnScroll>
            {/* Tier 3 */}
            <RevealOnScroll>
              <div className="bg-surface border border-border rounded-[20px] p-10 px-8 transition-all duration-400 hover:border-border-hover relative">
                <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-accent mb-2">Tier 3</p>
                <h3 className="text-2xl font-extrabold mb-1.5 tracking-[-0.5px]">Market Dominator</h3>
                <p className="text-[13px] text-text-dim leading-[1.6] mb-7">White-glove, full-team engagement for businesses ready to own their market.</p>
                <div className="text-5xl font-black tracking-[-2px] mb-1 leading-none">
                  <span className="text-xl font-semibold align-super mr-0.5">$</span>10,000
                </div>
                <p className="text-[13px] text-text-dim mb-7">per month</p>
                <div className="h-px bg-border mb-6" />
                <ul className="price-features list-none mb-8 flex flex-col gap-3">
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">Everything in Growth Accelerator</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">Fully custom Next.js website</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">6–8 blog articles per month</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">80+ hours/month full lead management</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">Live hot transfers to your sales team</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">White-glove account management</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">Daily updates &amp; weekly strategy calls</li>
                  <li className="text-[13.5px] text-text-mid flex items-center gap-2.5 leading-[1.4]">Quarterly business reviews</li>
                </ul>
                <Link href="/contact" className="block w-full py-3.5 rounded-full text-sm font-bold text-center no-underline transition-all duration-300 bg-white-6 text-text tracking-[0.01em] hover:bg-white-10 hover:-translate-y-px">
                  Book a Call
                </Link>
              </div>
            </RevealOnScroll>
          </div>
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
              Not sure which plan<br />is <span className="text-accent">right?</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll>
            <p className="text-[17px] text-text-dim leading-[1.7] max-w-[540px] mx-auto mb-12">
              Book a free discovery call and we&apos;ll give you an honest recommendation — even if it&apos;s not us.
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
