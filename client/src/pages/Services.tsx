import { useEffect } from "react";
import {
  Zap,
  ArrowRight,
  Building2,
  RefreshCw,
  Cog,
  Check,
  Hammer,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";

const websiteBuilds = [
  {
    name: "Lead Capture Site",
    price: "$697",
    priceSuffix: "flat fee",
    description:
      "The starting point for contractors who need a fast, conversion-focused site to capture leads from day one.",
    icon: Building2,
    featured: true,
    features: [
      "Up to 5 pages (Home, Services, About, Contact, Reviews)",
      "Mobile-first design, fast load times",
      "Built-in lead capture forms",
      "Conversion-optimized for contractor trades",
      "1-month GHL CRM trial included",
    ],
  },
  {
    name: "Refresh & Optimize",
    price: "$997",
    priceSuffix: "starting at",
    description:
      "For contractors with an existing site that's outdated, slow, or not converting visitors into booked jobs.",
    icon: RefreshCw,
    features: [
      "Complete visual overhaul of existing site (up to 5 pages)",
      "Mobile-responsive redesign",
      "Speed and SEO optimization",
      "New high-converting lead forms",
      "1-month GHL CRM trial included",
    ],
  },
  {
    name: "Custom Build",
    price: "$1,997+",
    priceSuffix: "starting at",
    description:
      "For contractors needing 6+ pages, advanced integrations, or multi-location support.",
    icon: Cog,
    features: [
      "For contractors needing 6+ pages, advanced integrations, or multi-location",
      "Discovery and scoping meeting included",
      "Custom-tailored to your business",
      "1-month GHL CRM trial included",
    ],
  },
];

const addOns = [
  {
    name: "Paid Ads Management",
    price: "$497",
    note: "/mo",
    detail: "Google Ads or Meta. Ad spend billed separately, paid directly to platform.",
  },
  {
    name: "Custom Landing Page (for ads)",
    price: "$250",
    note: "per page",
    detail: "High-converting landing pages tailored to a specific paid traffic campaign.",
  },
  {
    name: "Full GHL Funnel Build",
    price: "$497",
    note: "one-time",
    detail: "Complete multi-step funnel built inside GoHighLevel, mapped to your sales process.",
  },
  {
    name: "Extra Blog Posts",
    price: "$97 / $197",
    note: "/mo",
    detail: "$97/mo for 2 additional posts, $197/mo for 4 additional posts.",
  },
  {
    name: "Advanced Tracking Setup",
    price: "$350",
    note: "one-time",
    detail: "GA4 + Google Tag Manager configured and tested across the site and funnels.",
  },
];

export default function Services() {
  useEffect(() => {
    const prevTitle = document.title;
    const prevDesc = document.querySelector('meta[name="description"]')?.getAttribute("content") || "";
    document.title =
      "Pricing & Plans | San Antonio Contractor Marketing | Klema Creative";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "Transparent pricing for San Antonio home service contractors. Lead-capture websites, exclusive lead generation, and CRM automation. Month-to-month, cancel anytime."
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
              "radial-gradient(ellipse 1100px 700px at 80% 30%, oklch(0.74 0.21 50 / 0.18) 0%, oklch(0.18 0.02 240 / 0) 65%), radial-gradient(ellipse 900px 600px at 10% 80%, oklch(0.32 0.10 240 / 0.55) 0%, oklch(0.18 0.02 240 / 0) 60%)",
          }}
        />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <Zap className="w-3.5 h-3.5 text-[var(--brand-lime)] shrink-0" fill="currentColor" strokeWidth={2.5} />
              <span
                className="section-label text-white lg:text-[0.9375rem] lg:tracking-[0.12em]"
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}
              >
                Services & Pricing
              </span>
            </div>
            <h1
              className="text-white mb-5 sm:mb-7 font-extrabold"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1, letterSpacing: "-0.025em" }}
            >
              Plans Built for
              <br />
              <span className="text-[var(--brand-lime)]">San Antonio Contractors.</span>
            </h1>
            <p className="text-white/80 font-body text-base sm:text-[1.0625rem] lg:text-[1.125rem] leading-[1.65] lg:leading-[1.7] max-w-2xl">
              Everything you need to capture, convert, and book more local jobs. No long-term contracts. No shared leads. Month-to-month, cancel anytime.
            </p>

            <div className="flex flex-wrap gap-3 mt-7">
              <a
                href="#start-here"
                className="px-4 py-2 rounded-md border border-white/20 text-white/80 hover:text-white hover:border-white/40 text-[0.8125rem] font-display font-semibold transition-colors"
              >
                Where Do I Start?
              </a>
              <a
                href="#pricing-builds"
                className="px-4 py-2 rounded-md border border-white/20 text-white/80 hover:text-white hover:border-white/40 text-[0.8125rem] font-display font-semibold transition-colors"
              >
                Website Builds
              </a>
              <a
                href="#pricing"
                className="px-4 py-2 rounded-md border border-white/20 text-white/80 hover:text-white hover:border-white/40 text-[0.8125rem] font-display font-semibold transition-colors"
              >
                Marketing Plans
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
              <Zap className="w-3.5 h-3.5 text-[var(--brand-lime)] shrink-0" fill="currentColor" strokeWidth={2.5} />
              <span className="section-label text-[var(--brand-lime)]">Where Should You Start?</span>
            </div>
            <h2
              className="text-white mb-5 sm:mb-6 font-extrabold"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.625rem)", letterSpacing: "-0.025em", lineHeight: 1.15 }}
            >
              Three Paths.
              <span className="text-[var(--brand-lime)]"> Pick the One That Fits You.</span>
            </h2>
            <p className="text-white/70 font-body text-base sm:text-[1.0625rem] leading-[1.65] sm:leading-[1.7]">
              Marketing plans assume you already have a high-converting website. If you don't, start with a Lead Capture Site first. If you already have one that works, skip straight to a marketing plan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Path 1: Building from scratch */}
            <div className="bg-white/[0.04] border border-white/10 rounded-md p-6 sm:p-7 flex flex-col hover:bg-white/[0.06] transition-colors">
              <div className="w-11 h-11 rounded-md bg-[var(--brand-lime)]/15 flex items-center justify-center mb-5">
                <Hammer className="w-5 h-5 text-[var(--brand-lime)]" strokeWidth={2} />
              </div>
              <h3 className="text-white text-[1.125rem] font-display font-extrabold mb-2 leading-tight">
                Building from scratch?
              </h3>
              <p className="text-white/55 text-[0.8125rem] font-body italic mb-3">
                You don't have a website yet
              </p>
              <p className="text-white/70 text-[0.875rem] font-body leading-relaxed mb-6 flex-1">
                Start with a Lead Capture Site. Once it's live, add a marketing retainer when you're ready.
              </p>
              <a
                href="#pricing-builds"
                className="text-[var(--brand-lime)] text-[0.875rem] font-display font-semibold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
              >
                Start with a website
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Path 2: Already have a website */}
            <div className="bg-white text-foreground rounded-md p-6 sm:p-7 flex flex-col shadow-2xl shadow-[var(--brand-lime)]/10 border-2 border-[var(--brand-lime)] relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--brand-lime)] text-white text-[0.6875rem] font-display font-bold tracking-wider uppercase px-3 py-1 rounded-sm whitespace-nowrap">
                Most Common
              </div>
              <div className="w-11 h-11 rounded-md bg-[var(--brand-lime)]/15 flex items-center justify-center mb-5">
                <Sparkles className="w-5 h-5 text-[var(--brand-lime)]" strokeWidth={2} />
              </div>
              <h3 className="text-foreground text-[1.125rem] font-display font-extrabold mb-2 leading-tight">
                Have a great website?
              </h3>
              <p className="text-muted-foreground text-[0.8125rem] font-body italic mb-3">
                Your site already converts visitors
              </p>
              <p className="text-foreground/75 text-[0.875rem] font-body leading-relaxed mb-6 flex-1">
                Skip the build. Start with Speed to Lead and start capturing every call.
              </p>
              <a
                href="#pricing"
                className="text-[var(--brand-lime)] text-[0.875rem] font-display font-semibold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
              >
                Skip to marketing plans
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Path 3: Website needs help */}
            <div className="bg-white/[0.04] border border-white/10 rounded-md p-6 sm:p-7 flex flex-col hover:bg-white/[0.06] transition-colors">
              <div className="w-11 h-11 rounded-md bg-[var(--brand-lime)]/15 flex items-center justify-center mb-5">
                <RefreshCw className="w-5 h-5 text-[var(--brand-lime)]" strokeWidth={2} />
              </div>
              <h3 className="text-white text-[1.125rem] font-display font-extrabold mb-2 leading-tight">
                Website needs a refresh?
              </h3>
              <p className="text-white/55 text-[0.8125rem] font-body italic mb-3">
                You have one but it's not converting
              </p>
              <p className="text-white/70 text-[0.875rem] font-body leading-relaxed mb-6 flex-1">
                Start with Refresh & Optimize, then layer in a marketing retainer.
              </p>
              <a
                href="#pricing-builds"
                className="text-[var(--brand-lime)] text-[0.875rem] font-display font-semibold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
              >
                Start with a redesign
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
              <span className="font-display font-bold text-white">Now accepting 5 founding clients this month.</span>{" "}
              <span className="text-white/65">Founding client pricing is locked in for as long as you're a customer.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          STEP 1: WEBSITE BUILDS
         ============================================================ */}
      <section id="pricing-builds" className="cream-section py-16 sm:py-24">
        <div className="container">
          <div className="max-w-3xl mb-10 sm:mb-14">
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <Zap className="w-3.5 h-3.5 text-[var(--brand-lime)] shrink-0" fill="currentColor" strokeWidth={2.5} />
              <span className="section-label text-[var(--brand-green-mid)]">Step 1: Build Your Foundation</span>
            </div>
            <h2
              className="text-foreground mb-5 sm:mb-6 font-extrabold"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.625rem)", letterSpacing: "-0.025em", lineHeight: 1.15 }}
            >
              Build Your
              <span className="text-primary"> Digital Foundation</span>
            </h2>
            <p className="text-muted-foreground font-body text-base sm:text-[1.0625rem] leading-[1.65] sm:leading-[1.7]">
              High-converting websites designed to turn local visitors into booked jobs. Every build includes a 1-month trial of our GoHighLevel CRM to start capturing leads from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {websiteBuilds.map((pkg) => {
              const Icon = pkg.icon;
              return (
                <div
                  key={pkg.name}
                  className={`relative bg-white border rounded-md p-6 sm:p-7 flex flex-col ${
                    pkg.featured
                      ? "border-[var(--brand-lime)]/60 shadow-lg shadow-[var(--brand-lime)]/10"
                      : "border-border"
                  }`}
                >
                  {pkg.featured && (
                    <div className="absolute -top-3 left-6 bg-[var(--brand-lime)] text-white text-[0.6875rem] font-display font-bold tracking-wider uppercase px-2.5 py-1 rounded-sm">
                      Recommended
                    </div>
                  )}
                  <div className="w-10 h-10 rounded-md bg-primary/[0.08] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" strokeWidth={2} />
                  </div>
                  <h3 className="text-foreground text-[1.0625rem] font-display font-extrabold mb-2 leading-tight">
                    {pkg.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="font-display font-extrabold text-[1.75rem] text-[var(--brand-lime)] leading-none">
                      {pkg.price}
                    </span>
                    <span className="text-muted-foreground text-[0.75rem] font-body">{pkg.priceSuffix}</span>
                  </div>
                  <p className="text-muted-foreground text-[0.8125rem] font-body leading-relaxed mb-5">
                    {pkg.description}
                  </p>
                  <ul className="flex flex-col gap-2 mb-6">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-foreground/80 text-[0.8125rem] font-body">
                        <Check className="w-3.5 h-3.5 text-[var(--brand-lime)] shrink-0 mt-1" strokeWidth={3} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="mt-auto w-full text-center py-2.5 rounded-md border border-border text-foreground text-[0.8125rem] font-display font-semibold hover:bg-foreground hover:text-white transition-colors"
                  >
                    Get My Free Audit
                  </a>
                </div>
              );
            })}
          </div>

          <p className="mt-8 text-muted-foreground text-[0.8125rem] font-body italic text-center">
            Domain registration and monthly hosting are paid directly by the client.
          </p>
        </div>
      </section>

      {/* ============================================================
          STEP 2: MARKETING PLANS (PricingSection embedded)
          Eyebrow overridden to "Step 2: Turn on the Lead Engine".
          Tier names, prices, and features are byte-identical to homepage.
         ============================================================ */}
      <PricingSection eyebrow="Step 2: Turn on the Lead Engine" />

      {/* ============================================================
          ADD-ONS (5 only)
         ============================================================ */}
      <section id="add-ons" className="light-section py-16 sm:py-24">
        <div className="container">
          <div className="max-w-3xl mb-10 sm:mb-14">
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <Zap className="w-3.5 h-3.5 text-[var(--brand-lime)] shrink-0" fill="currentColor" strokeWidth={2.5} />
              <span className="section-label text-[var(--brand-green-mid)]">Add-Ons</span>
            </div>
            <h2
              className="text-foreground mb-5 sm:mb-6 font-extrabold"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.625rem)", letterSpacing: "-0.025em", lineHeight: 1.15 }}
            >
              Stack On What
              <span className="text-primary"> You Need</span>
            </h2>
            <p className="text-muted-foreground font-body text-base sm:text-[1.0625rem] leading-[1.65] sm:leading-[1.7]">
              Optional add-ons that pair cleanly with any marketing plan. Layer them in as you grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {addOns.map((item) => (
              <div
                key={item.name}
                className="bg-white border border-border rounded-md p-5 sm:p-6 hover:border-[var(--brand-lime)]/40 transition-colors flex flex-col"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-foreground text-[0.9375rem] sm:text-[1rem] font-display font-bold leading-tight">
                    {item.name}
                  </h3>
                  <div className="text-right shrink-0">
                    <span className="font-display font-extrabold text-[1.125rem] text-[var(--brand-lime)] leading-none block">
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
          AUDIT FORM (identical to homepage ContactSection)
         ============================================================ */}
      <ContactSection />

      <Footer />
      <MobileStickyBar />
    </div>
  );
}
