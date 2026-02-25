import Link from "next/link";
import RevealOnScroll from "../components/RevealOnScroll";
import FAQ from "../components/FAQ";

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

const faqData = [
  {
    question: "What types of businesses do you work with?",
    answer: "We specialize in local service businesses \u2014 HVAC, plumbing, roofing, dental, tree removal, and similar industries. If you serve customers in a specific geographic area and want more booked jobs, we\u2019re built for you.",
  },
  {
    question: "How is Klema different from other marketing agencies?",
    answer: "Most agencies sell you individual services. We build a complete system \u2014 lead funnel, automated follow-up, CRM, SEO, reputation, and more \u2014 all working together. Everything is tracked, transparent, and tied to revenue.",
  },
  {
    question: "Do I need to sign a long-term contract?",
    answer: "No. All packages are month-to-month. We earn your business every month with measurable results, not lock-in contracts.",
  },
  {
    question: "How quickly will I see results?",
    answer: "Ignition clients see results in 10 days \u2014 your funnel goes live and your phone starts ringing. SEO and reputation results compound over 3\u20136 months. By month 6, you\u2019ll have a full growth engine running.",
  },
  {
    question: "What is the Lead Engine?",
    answer: "It\u2019s our core product \u2014 a done-for-you lead conversion funnel and automation system. When someone inquires about your services, the system triggers a call in 60 seconds, then follows up with SMS and email automatically. It\u2019s included in every tier.",
  },
  {
    question: "Do you run ads for me?",
    answer: "Starting at the Accelerator tier ($3,997/mo), yes. We build, manage, and optimize your Google and Meta ad campaigns. Your ad spend is billed directly to you \u2014 our fee covers the strategy and management.",
  },
  {
    question: "What does the Dominator tier include that others don\u2019t?",
    answer: "A dedicated lead team that calls every lead within 60 seconds, qualifies them, and either transfers them live to your team or books an appointment. Your phone only rings when someone is ready to buy.",
  },
  {
    question: "Can I switch tiers later?",
    answer: "Absolutely. You can upgrade at any time. Most clients start with Ignition and move up as the results justify it \u2014 that\u2019s exactly how the system is designed.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* SERVICES GRID */}
      <section className="border-t border-border pt-[140px] pb-30 max-md:pb-20">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">What we build</p>
            <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
              Everything your business<br />needs to grow.
            </h2>
            <p className="text-[17px] text-text-dim leading-[1.7] max-w-[540px]">
              Lead conversion, SEO, reputation, content, ads, and dedicated follow-up — under one roof, working as one system.
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="grid grid-cols-3 gap-px bg-border border border-border rounded-[20px] overflow-hidden mt-16 max-lg:grid-cols-2 max-md:grid-cols-1">
              {/* Lead Conversion Funnel */}
              <div className="accent-top-hover bg-surface p-10 px-8 transition-[background] duration-400 hover:bg-[#121212]">
                <div className="w-10 h-10 rounded-[10px] bg-accent-dim text-accent flex items-center justify-center mb-5 text-xl">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12" y2="18.01" /></svg>
                </div>
                <h3 className="text-[17px] font-bold mb-2.5 tracking-[-0.2px]">Lead Conversion Funnel</h3>
                <p className="text-sm text-text-dim leading-[1.7]">Custom quiz-style funnel built to convert mobile visitors into leads. Loads instantly, works on any device.</p>
              </div>
              {/* Automated Follow-Up */}
              <div className="accent-top-hover bg-surface p-10 px-8 transition-[background] duration-400 hover:bg-[#121212]">
                <div className="w-10 h-10 rounded-[10px] bg-accent-dim text-accent flex items-center justify-center mb-5 text-xl">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.88.36 1.74.7 2.55"/></svg>
                </div>
                <h3 className="text-[17px] font-bold mb-2.5 tracking-[-0.2px]">Automated Follow-Up</h3>
                <p className="text-sm text-text-dim leading-[1.7]">60-second call trigger, SMS sequences, and email drips that work leads for days — without you touching a thing.</p>
              </div>
              {/* SEO & Local Visibility */}
              <div className="accent-top-hover bg-surface p-10 px-8 transition-[background] duration-400 hover:bg-[#121212]">
                <div className="w-10 h-10 rounded-[10px] bg-accent-dim text-accent flex items-center justify-center mb-5 text-xl">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </div>
                <h3 className="text-[17px] font-bold mb-2.5 tracking-[-0.2px]">SEO &amp; Local Visibility</h3>
                <p className="text-sm text-text-dim leading-[1.7]">Rank higher in your city for the services you offer. Google Business Profile, local SEO, and visibility tracking.</p>
              </div>
              {/* Reputation Engine */}
              <div className="accent-top-hover bg-surface p-10 px-8 transition-[background] duration-400 hover:bg-[#121212]">
                <div className="w-10 h-10 rounded-[10px] bg-blue-dim text-blue flex items-center justify-center mb-5 text-xl">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </div>
                <h3 className="text-[17px] font-bold mb-2.5 tracking-[-0.2px]">Reputation Engine</h3>
                <p className="text-sm text-text-dim leading-[1.7]">Automated review requests after every job, monitoring, and alerts. Build a 5-star reputation on autopilot.</p>
              </div>
              {/* Website Design & Dev */}
              <div className="accent-top-hover bg-surface p-10 px-8 transition-[background] duration-400 hover:bg-[#121212]">
                <div className="w-10 h-10 rounded-[10px] bg-blue-dim text-blue flex items-center justify-center mb-5 text-xl">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
                </div>
                <h3 className="text-[17px] font-bold mb-2.5 tracking-[-0.2px]">Website Design &amp; Dev</h3>
                <p className="text-sm text-text-dim leading-[1.7]">High-performance, custom-designed websites built to convert visitors into leads and look like a million bucks.</p>
              </div>
              {/* Paid Advertising */}
              <div className="accent-top-hover bg-surface p-10 px-8 transition-[background] duration-400 hover:bg-[#121212]">
                <div className="w-10 h-10 rounded-[10px] bg-blue-dim text-blue flex items-center justify-center mb-5 text-xl">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
                </div>
                <h3 className="text-[17px] font-bold mb-2.5 tracking-[-0.2px]">Paid Advertising</h3>
                <p className="text-sm text-text-dim leading-[1.7]">Google and Meta ad campaigns — built, managed, and optimized by our team. Your ad spend drives leads into your funnel.</p>
              </div>
              {/* Content & Social */}
              <div className="accent-top-hover bg-surface p-10 px-8 transition-[background] duration-400 hover:bg-[#121212]">
                <div className="w-10 h-10 rounded-[10px] bg-purple-dim text-purple flex items-center justify-center mb-5 text-xl">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                </div>
                <h3 className="text-[17px] font-bold mb-2.5 tracking-[-0.2px]">Content &amp; Social</h3>
                <p className="text-sm text-text-dim leading-[1.7]">SEO-optimized blog articles, social media management, and email campaigns that keep your pipeline full.</p>
              </div>
              {/* CRM & Automation */}
              <div className="accent-top-hover bg-surface p-10 px-8 transition-[background] duration-400 hover:bg-[#121212]">
                <div className="w-10 h-10 rounded-[10px] bg-purple-dim text-purple flex items-center justify-center mb-5 text-xl">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                </div>
                <h3 className="text-[17px] font-bold mb-2.5 tracking-[-0.2px]">CRM &amp; Automation</h3>
                <p className="text-sm text-text-dim leading-[1.7]">Your own Klema CRM — fully configured. Every lead tracked, every follow-up automated, full visibility from day one.</p>
              </div>
              {/* Live Hot Transfers */}
              <div className="accent-top-hover bg-surface p-10 px-8 transition-[background] duration-400 hover:bg-[#121212]">
                <div className="w-10 h-10 rounded-[10px] bg-purple-dim text-purple flex items-center justify-center mb-5 text-xl">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
                <h3 className="text-[17px] font-bold mb-2.5 tracking-[-0.2px]">Live Hot Transfers</h3>
                <p className="text-sm text-text-dim leading-[1.7]">Our team calls, qualifies, and transfers ready-to-book leads directly to you in real-time. You just close.</p>
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
              <p className="text-[14.5px] text-text-dim leading-[1.7]">Every decision — from funnel to campaign — is engineered to grow your bottom line.</p>
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
                From discovery call to<br />results in 10 days.
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
              <p className="text-[13px] text-text-dim leading-[1.7]">Your system goes live — funnel, automations, CRM, and everything in your tier, built and tested.</p>
            </RevealOnScroll>
            <RevealOnScroll className="bg-surface p-10 px-7 text-center transition-[background] duration-400 hover:bg-[#121212] group">
              <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center text-[22px] font-black text-accent mx-auto mb-5 transition-all duration-300 group-hover:border-accent-border-dim group-hover:bg-accent-dim group-hover:shadow-[0_0_24px_rgba(74,222,128,0.1)]">
                4
              </div>
              <h3 className="text-base font-bold mb-2 tracking-[-0.2px]">Optimize &amp; Scale</h3>
              <p className="text-[13px] text-text-dim leading-[1.7]">We monitor, optimize, and report every month. Results compound — and when you&apos;re ready, you level up.</p>
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
              Pick your tier.<br />Climb when you&apos;re ready.
            </h2>
            <p className="text-[17px] text-text-dim leading-[1.7] max-w-[540px]">
              Five tiers designed as a ladder. Start where you are — each level&apos;s results make the next one a no-brainer. No contracts, no hidden fees.
            </p>
          </RevealOnScroll>
          <div className="grid grid-cols-5 gap-4 mt-16 items-start max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:max-w-[440px] max-md:mx-auto">
            {/* Ignition */}
            <RevealOnScroll>
              <div className="bg-surface border border-border rounded-[20px] p-7 transition-all duration-400 hover:border-border-hover relative">
                <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-accent mb-1.5">Tier 1</p>
                <h3 className="text-lg font-extrabold mb-1 tracking-[-0.5px]">Ignition</h3>
                <div className="text-3xl font-black tracking-[-1.5px] mb-0.5 leading-none">
                  <span className="text-base font-semibold align-super mr-0.5">$</span>997
                </div>
                <p className="text-[12px] text-text-dim mb-5">/mo + $2,500 setup</p>
                <div className="h-px bg-border mb-4" />
                <ul className="price-features list-none mb-6 flex flex-col gap-2">
                  <li className="text-[12.5px] text-text-mid leading-[1.4]">Lead conversion funnel</li>
                  <li className="text-[12.5px] text-text-mid leading-[1.4]">60-second call trigger</li>
                  <li className="text-[12.5px] text-text-mid leading-[1.4]">SMS &amp; email automation</li>
                  <li className="text-[12.5px] text-text-mid leading-[1.4]">CRM &amp; pipeline</li>
                </ul>
                <Link href="/contact" className="block w-full py-3 rounded-full text-[13px] font-bold text-center no-underline transition-all duration-300 bg-white-6 text-text hover:bg-white-10 hover:-translate-y-px">
                  Get Started
                </Link>
              </div>
            </RevealOnScroll>
            {/* Foundation */}
            <RevealOnScroll>
              <div className="bg-surface border border-border rounded-[20px] p-7 transition-all duration-400 hover:border-border-hover relative">
                <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-accent mb-1.5">Tier 2</p>
                <h3 className="text-lg font-extrabold mb-1 tracking-[-0.5px]">Foundation</h3>
                <div className="text-3xl font-black tracking-[-1.5px] mb-0.5 leading-none">
                  <span className="text-base font-semibold align-super mr-0.5">$</span>1,997
                </div>
                <p className="text-[12px] text-text-dim mb-5">/mo + $2,500 setup</p>
                <div className="h-px bg-border mb-4" />
                <ul className="price-features list-none mb-6 flex flex-col gap-2">
                  <li className="text-[12.5px] text-text-mid leading-[1.4]">Everything in Ignition</li>
                  <li className="text-[12.5px] text-text-mid leading-[1.4]">SEO &amp; local rankings</li>
                  <li className="text-[12.5px] text-text-mid leading-[1.4]">Google Business Profile</li>
                  <li className="text-[12.5px] text-text-mid leading-[1.4]">Reputation engine</li>
                </ul>
                <Link href="/contact" className="block w-full py-3 rounded-full text-[13px] font-bold text-center no-underline transition-all duration-300 bg-white-6 text-text hover:bg-white-10 hover:-translate-y-px">
                  Get Started
                </Link>
              </div>
            </RevealOnScroll>
            {/* Accelerator — Featured */}
            <RevealOnScroll>
              <div className="price-card-featured bg-surface border border-border rounded-[20px] p-7 transition-all duration-400 hover:border-border-hover relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-black px-3 py-1 rounded-full text-[10px] font-extrabold tracking-[0.06em] uppercase whitespace-nowrap">
                  Most Popular
                </div>
                <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-accent mb-1.5">Tier 3</p>
                <h3 className="text-lg font-extrabold mb-1 tracking-[-0.5px]">Accelerator</h3>
                <div className="text-3xl font-black tracking-[-1.5px] mb-0.5 leading-none">
                  <span className="text-base font-semibold align-super mr-0.5">$</span>3,997
                </div>
                <p className="text-[12px] text-text-dim mb-5">/mo + $5K–$7.5K setup</p>
                <div className="h-px bg-border mb-4" />
                <ul className="price-features list-none mb-6 flex flex-col gap-2">
                  <li className="text-[12.5px] text-text-mid leading-[1.4]">Everything in Foundation</li>
                  <li className="text-[12.5px] text-text-mid leading-[1.4]">Custom website</li>
                  <li className="text-[12.5px] text-text-mid leading-[1.4]">Paid ad management</li>
                  <li className="text-[12.5px] text-text-mid leading-[1.4]">Branded dashboard</li>
                </ul>
                <Link href="/contact" className="block w-full py-3 rounded-full text-[13px] font-bold text-center no-underline transition-all duration-300 bg-accent text-black hover:shadow-[0_0_32px_rgba(74,222,128,0.3)] hover:-translate-y-px">
                  Get Started
                </Link>
              </div>
            </RevealOnScroll>
            {/* Authority */}
            <RevealOnScroll>
              <div className="bg-surface border border-border rounded-[20px] p-7 transition-all duration-400 hover:border-border-hover relative">
                <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-accent mb-1.5">Tier 4</p>
                <h3 className="text-lg font-extrabold mb-1 tracking-[-0.5px]">Authority</h3>
                <div className="text-3xl font-black tracking-[-1.5px] mb-0.5 leading-none">
                  <span className="text-base font-semibold align-super mr-0.5">$</span>7,500
                </div>
                <p className="text-[12px] text-text-dim mb-5">/mo + $7,500 setup</p>
                <div className="h-px bg-border mb-4" />
                <ul className="price-features list-none mb-6 flex flex-col gap-2">
                  <li className="text-[12.5px] text-text-mid leading-[1.4]">Everything in Accelerator</li>
                  <li className="text-[12.5px] text-text-mid leading-[1.4]">Content &amp; social media</li>
                  <li className="text-[12.5px] text-text-mid leading-[1.4]">Email marketing</li>
                  <li className="text-[12.5px] text-text-mid leading-[1.4]">Full marketing mgmt</li>
                </ul>
                <Link href="/contact" className="block w-full py-3 rounded-full text-[13px] font-bold text-center no-underline transition-all duration-300 bg-white-6 text-text hover:bg-white-10 hover:-translate-y-px">
                  Book a Call
                </Link>
              </div>
            </RevealOnScroll>
            {/* Dominator */}
            <RevealOnScroll>
              <div className="bg-surface border border-border rounded-[20px] p-7 transition-all duration-400 hover:border-border-hover relative">
                <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-accent mb-1.5">Tier 5</p>
                <h3 className="text-lg font-extrabold mb-1 tracking-[-0.5px]">Dominator</h3>
                <div className="text-3xl font-black tracking-[-1.5px] mb-0.5 leading-none">
                  <span className="text-base font-semibold align-super mr-0.5">$</span>12,000
                </div>
                <p className="text-[12px] text-text-dim mb-5">/mo + $10,000 setup</p>
                <div className="h-px bg-border mb-4" />
                <ul className="price-features list-none mb-6 flex flex-col gap-2">
                  <li className="text-[12.5px] text-text-mid leading-[1.4]">Everything in Authority</li>
                  <li className="text-[12.5px] text-text-mid leading-[1.4]">Dedicated lead team</li>
                  <li className="text-[12.5px] text-text-mid leading-[1.4]">Live hot transfers</li>
                  <li className="text-[12.5px] text-text-mid leading-[1.4]">You just close</li>
                </ul>
                <Link href="/contact" className="block w-full py-3 rounded-full text-[13px] font-bold text-center no-underline transition-all duration-300 bg-white-6 text-text hover:bg-white-10 hover:-translate-y-px">
                  Book a Call
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border py-30 max-md:py-20">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">Frequently asked</p>
            <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
              Common questions,<br />straight answers.
            </h2>
          </RevealOnScroll>
          <div className="max-w-[720px] mx-auto mt-16">
            <RevealOnScroll>
              <FAQ items={faqData} />
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
              Not sure which tier<br />is <span className="text-accent">right?</span>
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
