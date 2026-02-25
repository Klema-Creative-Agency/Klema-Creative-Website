import RevealOnScroll from "@/app/components/RevealOnScroll";

const STEPS = [
  {
    num: 1,
    title: "Apply Below",
    body: "Fill out the short application. Takes 2 minutes. We review every submission and respond within 1 business day.",
  },
  {
    num: 2,
    title: "Strategy Call",
    body: "We learn your market, current lead sources, and goals. If we're a fit, we map your custom system.",
  },
  {
    num: 3,
    title: "We Build It",
    body: "We build your GoHighLevel account with all automations pre-configured — funnel, call trigger, SMS/email sequences, and CRM pipeline. Ready in 10 business days.",
  },
  {
    num: 4,
    title: "Your Phone Rings",
    body: "System goes live on your existing traffic sources. Leads from Google, referrals, ads, and anywhere else hit your funnel — and get followed up instantly. We optimize every month.",
  },
];

/** 4-step How It Works section — shared across all niches */
export default function HowItWorksSection() {
  return (
    <section className="py-30 max-md:py-20 relative overflow-hidden">
      <div className="cta-glow" />
      <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 relative z-2">
        <RevealOnScroll>
          <div className="text-center">
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
              How it works
            </p>
            <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
              From application to<br />leads in 10 days.
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-4 gap-px bg-border border border-border rounded-[20px] overflow-hidden mt-16 max-lg:grid-cols-2 max-md:grid-cols-1">
          {STEPS.map((step) => (
            <RevealOnScroll
              key={step.num}
              className="bg-surface p-10 px-7 text-center transition-[background] duration-400 hover:bg-[#121212] group"
            >
              <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center text-[22px] font-black text-accent mx-auto mb-5 transition-all duration-300 group-hover:border-accent-border-dim group-hover:bg-accent-dim group-hover:shadow-[0_0_24px_rgba(74,222,128,0.1)]">
                {step.num}
              </div>
              <h3 className="text-base font-bold mb-2 tracking-[-0.2px]">
                {step.title}
              </h3>
              <p className="text-[13px] text-text-dim leading-[1.7]">
                {step.body}
              </p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
