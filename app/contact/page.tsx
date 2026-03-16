import type { Metadata } from "next";
import RevealOnScroll from "../components/RevealOnScroll";

export const metadata: Metadata = {
  title: "Contact Klema Creative | Get Your Free Marketing Audit",
  description:
    "Get a free marketing audit from Klema Creative. We'll review your Google presence, website, and competitors and send you a personalized Loom video with findings. No pressure, no obligation.",
  openGraph: {
    title: "Contact Klema Creative | Get Your Free Marketing Audit",
    description:
      "Get a free marketing audit. We'll review your online presence and send you a personalized video with findings.",
  },
};

// TODO: Replace with your real Calendly URL (e.g., "https://calendly.com/klema-creative/discovery")
const CALENDLY_URL = "https://calendly.com/klema-creative/discovery";

// TODO: Replace with your real phone number
const PHONE_NUMBER = "(210) 555-1234";
const PHONE_HREF = "tel:+12105551234";

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* CONTACT HERO */}
      <section className="pt-40 pb-10 text-center">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">Contact</p>
          </RevealOnScroll>
          <RevealOnScroll>
            <h1 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4 text-center">
              Get your free<br /><span className="text-accent">marketing audit.</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll>
            <p className="text-[17px] text-text-dim leading-[1.7] max-w-[540px] mx-auto text-center">
              Book a quick call or just drop your info below. We&apos;ll personally review your Google presence, website, and competitors, then send you a Loom video with exactly what to fix. Free. No strings attached.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* CALENDLY EMBED */}
      <section className="pt-0 pb-30 max-md:pb-20">
        <div className="max-w-[700px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <div className="mt-12 rounded-[20px] border border-border bg-surface overflow-hidden">
              <iframe
                src={`${CALENDLY_URL}?hide_gdpr_banner=1&background_color=0a0a0a&text_color=e0e0e0&primary_color=4ade80`}
                width="100%"
                height="660"
                frameBorder="0"
                title="Schedule your free marketing audit with Klema Creative"
                className="w-full"
              />
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="flex justify-center gap-12 mt-12 pt-8 border-t border-border max-md:flex-col max-md:gap-6">
              <div className="text-center">
                <div className="text-[11px] uppercase tracking-[0.12em] text-text-dim mb-2 font-bold">Email</div>
                <a href="mailto:contact@klemacreative.com" className="text-text-mid no-underline text-sm font-medium transition-colors duration-200 hover:text-accent">
                  contact@klemacreative.com
                </a>
              </div>
              <div className="text-center">
                <div className="text-[11px] uppercase tracking-[0.12em] text-text-dim mb-2 font-bold">Phone</div>
                <a href={PHONE_HREF} className="text-text-mid no-underline text-sm font-medium transition-colors duration-200 hover:text-accent">
                  {PHONE_NUMBER}
                </a>
              </div>
              <div className="text-center">
                <div className="text-[11px] uppercase tracking-[0.12em] text-text-dim mb-2 font-bold">Location</div>
                <span className="text-text-mid text-sm font-medium">San Antonio, Texas</span>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
