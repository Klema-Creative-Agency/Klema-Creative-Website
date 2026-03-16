import type { Metadata } from "next";
import Link from "next/link";
import RevealOnScroll from "../components/RevealOnScroll";

export const metadata: Metadata = {
  title: "Our Work | Klema Creative - San Antonio Marketing Agency",
  description:
    "See real projects built by Klema Creative for local service businesses in San Antonio. Custom websites, lead generation systems, and marketing engines.",
  openGraph: {
    title: "Our Work | Klema Creative",
    description:
      "Real projects built for real businesses. See what Klema Creative delivers.",
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

// TODO: Replace with real project data - screenshots, client names, results
const projects = [
  {
    title: "[Client 1 - Business Name]",
    industry: "[Industry - e.g., Credit Repair]",
    description:
      "[Brief description of what you built - e.g., 'Full website rebuild with VSL funnel, multi-step lead capture, and CRM automation. Designed to convert cold traffic into booked consultations.']",
    results: [
      "[Result 1 - e.g., 'Custom website launched in 2 weeks']",
      "[Result 2 - e.g., 'Lead capture form with automated follow-up']",
      "[Result 3 - e.g., 'Integrated with CRM for real-time lead routing']",
    ],
    // TODO: Add screenshot - save to /public/work/client-1.png
    image: null as string | null,
    link: null as string | null,
  },
  {
    title: "[Client 2 - Business Name]",
    industry: "[Industry - e.g., Debt Settlement]",
    description:
      "[Brief description of what you built - e.g., 'Complete marketing site with scroll-driven storytelling, trust-building sections, and a streamlined booking funnel. Built for speed and conversion on mobile.']",
    results: [
      "[Result 1 - e.g., 'Mobile-first design with sub-2s load times']",
      "[Result 2 - e.g., 'Discovery call booking integrated into every page']",
      "[Result 3 - e.g., 'SEO-optimized for local search terms']",
    ],
    // TODO: Add screenshot - save to /public/work/client-2.png
    image: null as string | null,
    link: null as string | null,
  },
];

export default function WorkPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-20 max-md:pt-32 max-md:pb-14">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
              Our work
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <h1 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-6">
              Built with purpose.
              <br />
              <span className="text-accent">Backed by results.</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll>
            <p className="text-[17px] text-text-dim leading-[1.7] max-w-[620px]">
              Every project we take on is a partnership. Here&apos;s a look at
              what we&apos;ve built for businesses just like yours.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="border-t border-border py-24 max-md:py-16">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <div className="flex flex-col gap-16">
            {projects.map((project, i) => (
              <RevealOnScroll key={i}>
                <div className="grid grid-cols-2 gap-10 items-center max-md:grid-cols-1">
                  {/* Screenshot placeholder */}
                  <div
                    className={`${i % 2 === 1 ? "max-md:order-none order-2" : ""}`}
                  >
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={`${project.title} website screenshot`}
                        className="rounded-2xl border border-border w-full"
                      />
                    ) : (
                      <div className="rounded-2xl border border-border bg-surface aspect-[16/10] flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-12 h-12 rounded-xl bg-accent-dim text-accent flex items-center justify-center mx-auto mb-3">
                            <svg
                              width="22"
                              height="22"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <rect
                                x="3"
                                y="3"
                                width="18"
                                height="18"
                                rx="2"
                              />
                              <circle cx="8.5" cy="8.5" r="1.5" />
                              <polyline points="21 15 16 10 5 21" />
                            </svg>
                          </div>
                          <p className="text-xs text-text-dim">
                            Screenshot coming soon
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div>
                    <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-3">
                      {project.industry}
                    </p>
                    <h2 className="text-[clamp(24px,3vw,36px)] font-extrabold leading-[1.15] tracking-[-1px] mb-4">
                      {project.title}
                    </h2>
                    <p className="text-[15px] text-text-dim leading-[1.8] mb-6">
                      {project.description}
                    </p>
                    <ul className="space-y-2.5 mb-6">
                      {project.results.map((result, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2.5 text-[14px] text-text leading-[1.6]"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#4ade80"
                            strokeWidth="2.5"
                            className="flex-shrink-0 mt-0.5"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {result}
                        </li>
                      ))}
                    </ul>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[14px] font-semibold text-accent no-underline transition-all duration-300 hover:gap-3"
                      >
                        Visit live site
                        <ArrowIcon />
                      </a>
                    )}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 text-center relative overflow-hidden border-t border-border">
        <div className="cta-glow" />
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 relative z-2">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
              Your turn
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
              Ready to be our
              <br />
              <span className="text-accent">next success story?</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll>
            <p className="text-[17px] text-text-dim leading-[1.7] max-w-[540px] mx-auto mb-12">
              We&apos;ll personally review your Google presence, website, and
              competitors, then send you a Loom video with exactly what to fix.
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <Link
              href="/contact"
              className="btn-primary-hover inline-flex items-center gap-2.5 bg-accent text-black px-9 py-4 rounded-full text-[15px] font-bold no-underline transition-all duration-300 tracking-[-0.01em]"
            >
              Get Your Free Marketing Audit
              <ArrowIcon />
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
