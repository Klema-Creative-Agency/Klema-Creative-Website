import { useEffect } from "react";
import {
  Zap,
  ArrowRight,
  Check,
  Hammer,
  Sparkles,
  Truck,
  Globe,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";

const addOns = [
  {
    name: "Additional Vehicle Design",
    price: "$350",
    note: "per vehicle",
    detail: "Adapt your wrap design to another truck, van, or trailer so the whole fleet matches.",
  },
  {
    name: "Yard Signs + Job Site Signage",
    price: "$250+",
    note: "per run",
    detail: "Branded yard signs and site signage that keep selling after the crew leaves.",
  },
  {
    name: "Print Collateral Pack",
    price: "$300",
    note: "one-time",
    detail: "Business cards, door hangers, and leave-behinds designed in your brand and print-ready.",
  },
  {
    name: "Social Media Brand Kit",
    price: "$250",
    note: "one-time",
    detail: "Profile graphics, post templates, and cover images so your pages match your trucks.",
  },
  {
    name: "Extra Website Pages",
    price: "$150",
    note: "per page",
    detail: "Service or city pages added to your site, written and built to match the original design.",
  },
];

export default function Services() {
  useEffect(() => {
    const prevTitle = document.title;
    const prevDesc = document.querySelector('meta[name="description"]')?.getAttribute("content") || "";
    document.title =
      "Services & Pricing | Branding, Vehicle Wraps & Websites | Klema Creative";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "Straightforward pricing for San Antonio contractors. Brand identity, vehicle wraps printed under one roof, and brand-matched websites. Get your free brand audit."
      );
    return () => {
      document.title = prevTitle;
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute("content", prevDesc);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ============================================================
          PAGE HEADER
         ============================================================ */}
      <section className="relative overflow-hidden bg-[var(--brand-charcoal)] pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 1100px 700px at 80% 30%, oklch(0.79 0.17 70 / 0.18) 0%, oklch(0.18 0.004 260 / 0) 65%), radial-gradient(ellipse 900px 600px at 10% 80%, oklch(0.32 0.03 260 / 0.55) 0%, oklch(0.18 0.004 260 / 0) 60%)",
          }}
        />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <Zap className="w-3.5 h-3.5 text-[var(--brand-gold)] shrink-0" fill="currentColor" strokeWidth={2.5} />
              <span
                className="section-label text-white lg:text-[0.9375rem] lg:tracking-[0.12em]"
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}
              >
                Services & Pricing
              </span>
            </div>
            <h1
              className="text-white mb-5 sm:mb-7 font-extrabold"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1, letterSpacing: "0" }}
            >
              Branding, Wraps + Websites.
              <br />
              <span className="text-[var(--brand-gold)]">Priced Straight.</span>
            </h1>
            <p className="text-white/80 font-body text-base sm:text-[1.0625rem] lg:text-[1.125rem] leading-[1.65] lg:leading-[1.7] max-w-2xl">
              Three core services, designed and printed under one roof in San Antonio.
              Start with the piece you need most, or launch the whole brand at once.
              Every project gets a written quote before work begins.
            </p>

            <div className="flex flex-wrap gap-3 mt-7">
              <a
                href="#start-here"
                className="px-4 py-2 rounded-md border border-white/20 text-white/80 hover:text-white hover:border-white/40 text-[0.8125rem] font-display font-semibold transition-colors"
              >
                Where Do I Start?
              </a>
              <a
                href="#pricing"
                className="px-4 py-2 rounded-md border border-white/20 text-white/80 hover:text-white hover:border-white/40 text-[0.8125rem] font-display font-semibold transition-colors"
              >
                Packages
              </a>
              <a
                href="#add-ons"
                className="px-4 py-2 rounded-md border border-white/20 text-white/80 hover:text-white hover:border-white/40 text-[0.8125rem] font-display font-semibold transition-colors"
              >
                Add-Ons
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          WHERE SHOULD YOU START? (PATH SELECTOR)
         ============================================================ */}
      <section id="start-here" className="darker-section py-14 sm:py-20">
        <div className="container">
          <div className="max-w-3xl mb-10 sm:mb-12">
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <Zap className="w-3.5 h-3.5 text-[var(--brand-gold)] shrink-0" fill="currentColor" strokeWidth={2.5} />
              <span className="section-label text-[var(--brand-gold)]">Where Should You Start?</span>
            </div>
            <h2
              className="text-white mb-5 sm:mb-6 font-extrabold"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.625rem)", letterSpacing: "0", lineHeight: 1.15 }}
            >
              Three Paths.
              <span className="text-[var(--brand-gold)]"> Pick the One That Fits You.</span>
            </h2>
            <p className="text-white/70 font-body text-base sm:text-[1.0625rem] leading-[1.65] sm:leading-[1.7]">
              The brand comes first, because the wrap and the website are only as good
              as the logo printed on them. Here's the honest starting point for where
              you are today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Path 1: Starting fresh or rebranding */}
            <div className="bg-white text-foreground rounded-md p-6 sm:p-7 flex flex-col shadow-2xl shadow-[var(--brand-gold)]/10 border-2 border-[var(--brand-gold)] relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--brand-gold)] text-[var(--brand-charcoal)] text-[0.6875rem] font-display font-bold tracking-wider uppercase px-3 py-1 rounded-sm whitespace-nowrap">
                Best Value
              </div>
              <div className="w-11 h-11 rounded-md bg-[var(--brand-gold)]/15 flex items-center justify-center mb-5">
                <Hammer className="w-5 h-5 text-[var(--brand-gold)]" strokeWidth={2} />
              </div>
              <h3 className="text-foreground text-[1.125rem] font-display font-extrabold mb-2 leading-tight">
                Starting fresh or rebranding?
              </h3>
              <p className="text-muted-foreground text-[0.8125rem] font-body italic mb-3">
                New business, or a brand that's holding you back
              </p>
              <p className="text-foreground/75 text-[0.875rem] font-body leading-relaxed mb-6 flex-1">
                The Full Rebrand launches your logo, wrap, and website together, so
                everything a homeowner sees tells the same story.
              </p>
              <a
                href="#pricing"
                className="text-[var(--brand-gold)] text-[0.875rem] font-display font-semibold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
              >
                See the Full Rebrand
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Path 2: Brand is fine, trucks are plain */}
            <div className="bg-white/[0.04] border border-white/10 rounded-md p-6 sm:p-7 flex flex-col hover:bg-white/[0.06] transition-colors">
              <div className="w-11 h-11 rounded-md bg-[var(--brand-gold)]/15 flex items-center justify-center mb-5">
                <Truck className="w-5 h-5 text-[var(--brand-gold)]" strokeWidth={2} />
              </div>
              <h3 className="text-white text-[1.125rem] font-display font-extrabold mb-2 leading-tight">
                Happy with your logo?
              </h3>
              <p className="text-white/55 text-[0.8125rem] font-body italic mb-3">
                But your trucks are still plain
              </p>
              <p className="text-white/70 text-[0.875rem] font-body leading-relaxed mb-6 flex-1">
                Start with a vehicle wrap. We design it around your existing brand and
                print it in-house, and your truck starts selling everywhere it drives.
              </p>
              <a
                href="#pricing"
                className="text-[var(--brand-gold)] text-[0.875rem] font-display font-semibold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
              >
                Start with a wrap
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Path 3: Website is the weak link */}
            <div className="bg-white/[0.04] border border-white/10 rounded-md p-6 sm:p-7 flex flex-col hover:bg-white/[0.06] transition-colors">
              <div className="w-11 h-11 rounded-md bg-[var(--brand-gold)]/15 flex items-center justify-center mb-5">
                <Globe className="w-5 h-5 text-[var(--brand-gold)]" strokeWidth={2} />
              </div>
              <h3 className="text-white text-[1.125rem] font-display font-extrabold mb-2 leading-tight">
                Website letting you down?
              </h3>
              <p className="text-white/55 text-[0.8125rem] font-body italic mb-3">
                The trucks look good but the site doesn't match
              </p>
              <p className="text-white/70 text-[0.875rem] font-body leading-relaxed mb-6 flex-1">
                Start with a brand-matched website. Fast, mobile-first, and built so the
                people who saw your truck actually book the job.
              </p>
              <a
                href="#pricing"
                className="text-[var(--brand-gold)] text-[0.875rem] font-display font-semibold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
              >
                Start with a website
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          FOUNDING CLIENT SCARCITY STRIP
         ============================================================ */}
      <section className="bg-[var(--brand-charcoal)] py-6 sm:py-7 border-y border-white/10">
        <div className="container">
          <div className="flex items-center justify-center gap-3 text-center">
            <span className="text-[1.125rem] leading-none" aria-hidden>🟠</span>
            <p className="text-white/85 font-body text-[0.875rem] sm:text-[0.9375rem] leading-snug">
              <span className="font-display font-bold text-white">Now accepting 5 founding brand clients this month.</span>{" "}
              <span className="text-white/65">Founding client pricing is locked in for as long as you're a customer.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          PACKAGES (PricingSection embedded, same data as homepage)
         ============================================================ */}
      <PricingSection eyebrow="Packages" />

      {/* ============================================================
          ADD-ONS
         ============================================================ */}
      <section id="add-ons" className="light-section py-16 sm:py-24">
        <div className="container">
          <div className="max-w-3xl mb-10 sm:mb-14">
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <Zap className="w-3.5 h-3.5 text-[var(--brand-gold)] shrink-0" fill="currentColor" strokeWidth={2.5} />
              <span className="section-label text-[var(--brand-mid)]">Add-Ons</span>
            </div>
            <h2
              className="text-foreground mb-5 sm:mb-6 font-extrabold"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.625rem)", letterSpacing: "0", lineHeight: 1.15 }}
            >
              Stack On What
              <span className="text-primary"> You Need</span>
            </h2>
            <p className="text-muted-foreground font-body text-base sm:text-[1.0625rem] leading-[1.65] sm:leading-[1.7]">
              Everything below is designed in your brand and printed under the same roof,
              so it all matches the trucks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {addOns.map((item) => (
              <div
                key={item.name}
                className="bg-white border border-border rounded-md p-5 sm:p-6 hover:border-[var(--brand-gold)]/40 transition-colors flex flex-col"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-foreground text-[0.9375rem] sm:text-[1rem] font-display font-bold leading-tight">
                    {item.name}
                  </h3>
                  <div className="text-right shrink-0">
                    <span className="font-display font-extrabold text-[1.125rem] text-[var(--brand-gold)] leading-none block">
                      {item.price}
                    </span>
                    <span className="text-muted-foreground text-[0.6875rem] font-body">{item.note}</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-[0.8125rem] font-body leading-snug">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          BRAND AUDIT FORM (identical to homepage ContactSection)
         ============================================================ */}
      <ContactSection />

      <Footer />
      <MobileStickyBar />
    </div>
  );
}
