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
    answer: "We specialize in local service businesses like HVAC, plumbing, roofing, dental, tree removal, and similar industries. If you serve customers in a specific geographic area and want more booked jobs, we\u2019re built for you.",
  },
  {
    question: "How is Klema different from other marketing agencies?",
    answer: "Most agencies sell you individual services. We build a complete system: lead funnel, automated follow-up, CRM, SEO, reputation, and more, all working together. Everything is tracked, transparent, and tied to revenue.",
  },
  {
    question: "Do I need to sign a long-term contract?",
    answer: "No. All packages are month-to-month. We earn your business every month with measurable results, not lock-in contracts.",
  },
  {
    question: "How quickly will I see results?",
    answer: "Foundation clients see results in 10 days. Your funnel goes live and your phone starts ringing. SEO and reputation results compound over 3-6 months. By month 6, you\u2019ll have a full growth engine running.",
  },
  {
    question: "What is the Lead Engine?",
    answer: "It\u2019s our core product, a done-for-you lead conversion funnel and automation system. When someone inquires about your services, the system triggers a call in 60 seconds, then follows up with SMS and email automatically. It\u2019s included in every tier.",
  },
  {
    question: "Do you run ads for me?",
    answer: "Starting at the Accelerator tier ($3,997/mo), yes. We build, manage, and optimize your Google and Meta ad campaigns. Your ad spend is billed directly to you. Our fee covers the strategy and management.",
  },
  {
    question: "What does the Dominator tier include that others don\u2019t?",
    answer: "A dedicated lead team that calls every lead within 60 seconds, qualifies them, and either transfers them live to your team or books an appointment. Your phone only rings when someone is ready to buy.",
  },
  {
    question: "Can I switch tiers later?",
    answer: "Absolutely. You can upgrade at any time. Most clients start with Foundation and move up as the results justify it, and that\u2019s exactly how the system is designed.",
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
              Standalone services.<br />Buy exactly what you need.
            </h2>
            <p className="text-[17px] text-text-dim leading-[1.7] max-w-[540px]">
              Not ready for a full package? Start with an individual service. Each one is designed to deliver results on its own.
            </p>
          </RevealOnScroll>
          <div className="max-w-[480px] mt-16">
            {/* Web Engineering - Primary */}
            <RevealOnScroll>
              <Link href="/services/web-engineering" className="group bg-surface border border-accent-border rounded-[20px] p-8 flex flex-col no-underline transition-all duration-400 hover:border-border-hover hover:bg-[#121212] relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent" />
                <div className="w-10 h-10 rounded-[10px] bg-accent-dim text-accent flex items-center justify-center mb-5 text-xl">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
                </div>
                <h3 className="text-[20px] font-bold mb-2.5 tracking-[-0.3px] text-text">Web Engineering</h3>
                <p className="text-sm text-text-dim leading-[1.7] mb-4 flex-1">High-performance, custom-designed websites built to convert. 3 tiers from single-page funnels to full platforms with CRM.</p>
                <div className="flex items-center gap-1.5 text-[13px] font-semibold text-accent">
                  <span>From $397/mo</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* WHY KLEMA */}
      <section className="border-t border-border py-30 max-md:py-20">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">Why Klema</p>
            <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
              You run the business.<br />We make the phone <span className="text-accent">ring.</span>
            </h2>
            <p className="text-[17px] text-text-dim leading-[1.7] max-w-[580px]">
              Most agencies sell you clicks and impressions. We build systems that put qualified leads on your phone, then follow up automatically when you&apos;re on the job.
            </p>
          </RevealOnScroll>

          <div className="grid grid-cols-2 gap-6 mt-16 max-md:grid-cols-1">
            {/* Card 1 - You keep everything */}
            <RevealOnScroll>
              <div className="accent-top-hover bg-surface border border-border rounded-[20px] p-8 transition-all duration-400 hover:bg-[#121212] h-full">
                <div className="w-10 h-10 rounded-[10px] bg-accent-dim text-accent flex items-center justify-center mb-5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <h3 className="text-[18px] font-bold mb-2.5 tracking-[-0.3px]">You own it, even if you leave</h3>
                <p className="text-[14.5px] text-text-dim leading-[1.7]">Your website, your funnel, your CRM data. It&apos;s all yours. Cancel anytime, take everything with you. No strings attached, no rebuilding from scratch.</p>
              </div>
            </RevealOnScroll>

            {/* Card 2 - 60-second response */}
            <RevealOnScroll>
              <div className="accent-top-hover bg-surface border border-border rounded-[20px] p-8 transition-all duration-400 hover:bg-[#121212] h-full">
                <div className="w-10 h-10 rounded-[10px] bg-accent-dim text-accent flex items-center justify-center mb-5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <h3 className="text-[18px] font-bold mb-2.5 tracking-[-0.3px]">Every lead gets a response in 60 seconds</h3>
                <p className="text-[14.5px] text-text-dim leading-[1.7]">78% of jobs go to whoever calls back first. Our system triggers an instant call, then follows up with SMS and email automatically, even at 2am on a Saturday.</p>
              </div>
            </RevealOnScroll>

            {/* Card 3 - No vanity metrics */}
            <RevealOnScroll>
              <div className="accent-top-hover bg-surface border border-border rounded-[20px] p-8 transition-all duration-400 hover:bg-[#121212] h-full">
                <div className="w-10 h-10 rounded-[10px] bg-accent-dim text-accent flex items-center justify-center mb-5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20V10M18 20V4M6 20v-4"/></svg>
                </div>
                <h3 className="text-[18px] font-bold mb-2.5 tracking-[-0.3px]">We report revenue, not impressions</h3>
                <p className="text-[14.5px] text-text-dim leading-[1.7]">No fluff reports full of vanity numbers. You see exactly how many leads came in, how many were contacted, and how many turned into booked jobs. Every dollar tracked.</p>
              </div>
            </RevealOnScroll>

            {/* Card 4 - Built for service businesses */}
            <RevealOnScroll>
              <div className="accent-top-hover bg-surface border border-border rounded-[20px] p-8 transition-all duration-400 hover:bg-[#121212] h-full">
                <div className="w-10 h-10 rounded-[10px] bg-accent-dim text-accent flex items-center justify-center mb-5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                </div>
                <h3 className="text-[18px] font-bold mb-2.5 tracking-[-0.3px]">Built specifically for local service businesses</h3>
                <p className="text-[14.5px] text-text-dim leading-[1.7]">We don&apos;t work with e-commerce brands or tech startups. Every funnel, every automation, every playbook is designed for businesses that serve customers in a specific area like HVAC, roofing, plumbing, dental, and more.</p>
              </div>
            </RevealOnScroll>
          </div>

          {/* Trust strip */}
          <RevealOnScroll>
            <div className="mt-12 flex items-center gap-8 flex-wrap max-md:gap-4 max-md:justify-center">
              {[
                "Month-to-month, no contracts",
                "You keep everything if you cancel",
                "Real reporting tied to revenue",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-[13px] text-text-mid">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-accent shrink-0">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-t border-border py-30 max-md:py-20">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">How it works</p>
            <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
              From discovery call to<br />results in 10 days.
            </h2>
          </RevealOnScroll>
          <div className="grid grid-cols-4 gap-10 mt-16 max-lg:grid-cols-2 max-lg:gap-8 max-md:grid-cols-1 max-md:gap-10 relative">
            {/* Connecting line - desktop only */}
            <div className="absolute top-7 left-[calc(12.5%+7px)] right-[calc(12.5%+7px)] h-px bg-border max-lg:hidden" />
            {[
              { num: 1, title: "Discovery Call", body: "We learn your business, goals, and challenges inside and out. No cookie-cutter approaches." },
              { num: 2, title: "Strategy Blueprint", body: "A custom roadmap tailored to your industry, audience, and growth targets with clear milestones." },
              { num: 3, title: "Build & Launch", body: "Your system goes live: funnel, automations, CRM, and everything in your package, built and tested." },
              { num: 4, title: "Optimize & Report", body: "We monitor, optimize, and report every month. Real data, clear results, continuous improvement." },
            ].map((step) => (
              <RevealOnScroll key={step.num}>
                <div className="relative z-1">
                  <div className="w-14 h-14 rounded-full bg-surface border border-border flex items-center justify-center text-[20px] font-black text-accent mb-5">
                    {step.num}
                  </div>
                  <h3 className="text-[17px] font-bold mb-2 tracking-[-0.2px]">{step.title}</h3>
                  <p className="text-[14px] text-text-dim leading-[1.7]">{step.body}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="border-t border-border py-30 max-md:py-20">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">Pricing</p>
            <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
              Choose the package<br />that fits your business.
            </h2>
            <p className="text-[17px] text-text-dim leading-[1.7] max-w-[540px]">
              Four packages built for different stages of growth. Pick the one that matches where you are today. No contracts, no hidden fees.
            </p>
          </RevealOnScroll>
          <div className="grid grid-cols-4 gap-4 mt-16 items-start max-xl:grid-cols-2 max-md:grid-cols-1 max-md:max-w-[440px] max-md:mx-auto">
            {/* Foundation */}
            <RevealOnScroll>
              <div className="bg-surface border border-border rounded-[20px] p-7 transition-all duration-400 hover:border-border-hover relative">
                <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-accent mb-1.5">Tier 1</p>
                <h3 className="text-lg font-extrabold mb-1 tracking-[-0.5px]">Foundation</h3>
                <div className="text-3xl font-black tracking-[-1.5px] mb-0.5 leading-none">
                  <span className="text-base font-semibold align-super mr-0.5">$</span>1,997
                </div>
                <p className="text-[12px] text-text-dim mb-5">/mo + $2,500 setup</p>
                <div className="h-px bg-border mb-4" />
                <ul className="price-features list-none mb-6 flex flex-col gap-2">
                  <li className="text-[12.5px] text-text-mid leading-[1.4]">Lead Engine included</li>
                  <li className="text-[12.5px] text-text-mid leading-[1.4]">SEO &amp; local rankings</li>
                  <li className="text-[12.5px] text-text-mid leading-[1.4]">Google Business Profile</li>
                  <li className="text-[12.5px] text-text-mid leading-[1.4]">Reputation engine</li>
                </ul>
                <Link href="/services/foundation" className="block w-full py-3 rounded-full text-[13px] font-bold text-center no-underline transition-all duration-300 bg-white-6 text-text hover:bg-white-10 hover:-translate-y-px">
                  Get Started
                </Link>
              </div>
            </RevealOnScroll>
            {/* Accelerator - Featured */}
            <RevealOnScroll>
              <div className="price-card-featured bg-surface border border-border rounded-[20px] p-7 transition-all duration-400 hover:border-border-hover relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-black px-3 py-1 rounded-full text-[10px] font-extrabold tracking-[0.06em] uppercase whitespace-nowrap">
                  Most Popular
                </div>
                <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-accent mb-1.5">Tier 2</p>
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
                <Link href="/services/accelerator" className="block w-full py-3 rounded-full text-[13px] font-bold text-center no-underline transition-all duration-300 bg-accent text-black hover:shadow-[0_0_32px_rgba(74,222,128,0.3)] hover:-translate-y-px">
                  Get Started
                </Link>
              </div>
            </RevealOnScroll>
            {/* Authority */}
            <RevealOnScroll>
              <div className="bg-surface border border-border rounded-[20px] p-7 transition-all duration-400 hover:border-border-hover relative">
                <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-accent mb-1.5">Tier 3</p>
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
                <Link href="/services/authority" className="block w-full py-3 rounded-full text-[13px] font-bold text-center no-underline transition-all duration-300 bg-white-6 text-text hover:bg-white-10 hover:-translate-y-px">
                  Book a Call
                </Link>
              </div>
            </RevealOnScroll>
            {/* Dominator */}
            <RevealOnScroll>
              <div className="bg-surface border border-border rounded-[20px] p-7 transition-all duration-400 hover:border-border-hover relative">
                <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-accent mb-1.5">Tier 4</p>
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
                <Link href="/services/dominator" className="block w-full py-3 rounded-full text-[13px] font-bold text-center no-underline transition-all duration-300 bg-white-6 text-text hover:bg-white-10 hover:-translate-y-px">
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
              We&apos;ll review your Google presence, website, and competitors, then send you a personalized Loom video with exactly what to fix.
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <Link href="/contact" className="btn-primary-hover inline-flex items-center gap-2.5 bg-accent text-black px-9 py-4 rounded-full text-[15px] font-bold no-underline transition-all duration-300 tracking-[-0.01em]">
              Get Your Free Marketing Audit
              <ArrowIcon />
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
