"use client";

import RevealOnScroll from "./RevealOnScroll";

const testimonials = [
  {
    quote:
      "Klema Creative didn't just build us a website — they built us a lead machine. We went from maybe 2 calls a week to our phone ringing every day. Best investment we've made.",
    name: "Marcus T.",
    business: "Roofing Contractor",
    stars: 5,
  },
  {
    quote:
      "We tried 3 agencies before Klema. They were the first ones who actually understood our business and didn't just hand us a template. Revenue is up 40% since we started.",
    name: "Sarah L.",
    business: "Dental Practice Owner",
    stars: 5,
  },
  {
    quote:
      "The speed-to-lead system alone was a game changer. We used to lose half our leads because nobody followed up fast enough. Now every lead gets a response in under a minute.",
    name: "David R.",
    business: "HVAC Company Owner",
    stars: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="#4ade80"
          stroke="none"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="border-t border-border py-30 max-md:py-20">
      <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
        <div className="text-center mb-12">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
              Testimonials
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
              What Our Clients
              <br />
              <span className="text-accent">Say.</span>
            </h2>
          </RevealOnScroll>
        </div>

        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
          {testimonials.map((t, i) => (
            <RevealOnScroll
              key={i}
              className="accent-top-hover bg-surface border border-border rounded-2xl p-8 transition-[background] duration-400 hover:bg-[#121212]"
            >
              <StarRating count={t.stars} />
              <p className="text-[14.5px] text-text leading-[1.75] mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="text-[14px] font-bold">{t.name}</p>
                <p className="text-[13px] text-text-dim">{t.business}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
