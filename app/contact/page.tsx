import RevealOnScroll from "../components/RevealOnScroll";

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
            <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4 text-center">
              Let&apos;s talk about<br />your <span className="text-accent">growth.</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll>
            <p className="text-[17px] text-text-dim leading-[1.7] max-w-[540px] mx-auto text-center">
              The fastest way to see if we can help is to book a free 30-minute Discovery Call. There&apos;s no pressure and no obligation. We&apos;ll analyze your current marketing and give you a clear, honest assessment.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="pt-0 pb-30 max-md:pb-20">
        <div className="max-w-[560px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <div className="mt-12 p-12 rounded-[20px] border border-border bg-surface text-center min-h-[360px] flex flex-col items-center justify-center">
              <div className="text-[2.5rem] mb-4">&#x1F4C5;</div>
              <h3 className="text-xl font-bold mb-2.5 tracking-[-0.3px]">Schedule Your Discovery Call</h3>
              <p className="text-sm text-text-dim mb-7">Choose a time that works for you. Your Calendly booking widget goes here.</p>
              <a
                className="btn-primary-hover inline-flex items-center gap-2.5 bg-accent text-black px-9 py-4 rounded-full text-[15px] font-bold no-underline transition-all duration-300 tracking-[-0.01em]"
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Scheduling Page
                <ArrowIcon />
              </a>
              <p className="mt-5 text-xs text-text-dim">Replace this section with your Calendly embed code.</p>
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
                <a href="tel:+12105551234" className="text-text-mid no-underline text-sm font-medium transition-colors duration-200 hover:text-accent">
                  (210) 555-1234
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
