import Link from "next/link";
import { niches } from "@/app/data/niches";
import RevealOnScroll from "@/app/components/RevealOnScroll";

const NICHE_ICONS: Record<string, string> = {
  roofing: "🏠",
  "tree-removal": "🌳",
  hvac: "❄️",
  plumbing: "🔧",
  dental: "🦷",
};

export default function BusinessesWeWorkWith() {
  return (
    <section className="py-30 max-md:py-20 border-t border-border">
      <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
        <RevealOnScroll>
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
            Businesses we work with
          </p>
          <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
            Built for any local service business.
          </h2>
          <p className="text-[17px] text-text-dim leading-[1.7] max-w-[600px] mb-16">
            The Ignition system works for any local service business. Here are a few industries where we&apos;ve built proven funnels.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-5 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2">
          {niches.map((niche) => (
            <RevealOnScroll key={niche.url_slug}>
              <Link
                href={`/services/ai-lead-engine/${niche.url_slug}`}
                className="group bg-surface border border-border rounded-[20px] p-6 flex flex-col items-center text-center gap-3 no-underline transition-all duration-400 hover:border-border-hover hover:bg-[#121212] h-full"
              >
                <div className="text-3xl">{NICHE_ICONS[niche.url_slug]}</div>
                <h3 className="text-[15px] font-bold text-text tracking-[-0.2px]">
                  {niche.service_name.replace(" Lead Engine", "").replace(" Patient Engine", "")}
                </h3>
                <span className="text-[12px] font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 inline-flex items-center gap-1">
                  See how it works
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
