import { useEffect } from "react";
import {
  Zap,
  ArrowRight,
  Globe,
  Building2,
  RefreshCw,
  Cog,
  Eye,
  MessageSquare,
  TrendingUp,
  CheckCircle2,
  Search,
  Wrench,
  Check,
  Hammer,
  Rocket,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";
import ContactForm from "@/components/ContactForm";

const websiteBuilds = [
  {
    name: "The Digital Business Card",
    price: "$297",
    priceSuffix: "flat fee",
    description: "For businesses with zero web presence who need to exist online immediately.",
    icon: Globe,
    features: [
      "Single-page landing site",
      "Basic contact information",
      "Service overview",
      "Simple contact form",
    ],
  },
  {
    name: "The Lead Generation Engine",
    price: "$447",
    priceSuffix: "flat fee",
    description: "The recommended starting point for local service businesses needing a functional structure to capture leads.",
    icon: Building2,
    featured: true,
    features: [
      "Three-page website (Home, Services, Contact)",
      "Integrated lead capture form",
      "Inquiries routed directly to your email",
      "Mobile-optimized design",
    ],
  },
  {
    name: "The Refresh & Optimize Redesign",
    price: "$697",
    priceSuffix: "starting at",
    description: "For clients who already have a website, but it is outdated, slow, or fails to convert traffic into leads.",
    icon: RefreshCw,
    features: [
      "Complete visual overhaul (up to 5 pages)",
      "Mobile-responsive redesign",
      "Speed optimization",
      "High-converting lead forms",
    ],
  },
  {
    name: "The Custom Build",
    price: "$1,500+",
    priceSuffix: "starting at",
    description: "For clients requiring e-commerce, complex integrations, or extensive page counts (6+ pages).",
    icon: Cog,
    features: [
      "Mandatory discovery and scoping meeting",
      "E-commerce or custom integrations",
      "6+ pages",
      "Tailored to your exact requirements",
    ],
  },
];

const retainers = [
  {
    name: "Visibility",
    tagline: "The Visibility Package",
    price: "$297",
    priceSuffix: "/month",
    bestFor: "Businesses building their online presence.",
    icon: Eye,
    platform: "Search Atlas",
    features: [
      { text: "Google Business Profile optimization & updates", included: true },
      { text: "AI Content Creation (2 blog posts/month)", included: true },
      { text: "Local Citations & NAP consistency", included: true },
      { text: "Monthly white-label report", included: true },
      { text: "CRM Setup & Sales Pipeline", included: false },
      { text: "Automated Email Nurture", included: false },
      { text: "Web Form Integration & Auto-Routing", included: false },
      { text: "Automated Review Requests", included: false },
      { text: "Bi-weekly Email Broadcasts", included: false },
      { text: "Database Reactivation Campaigns", included: false },
      { text: "Social Media Management", included: false },
    ],
  },
  {
    name: "Conversion",
    tagline: "The Conversion Package",
    price: "$697",
    priceSuffix: "/month",
    bestFor: "Businesses ready to capture and nurture leads.",
    icon: MessageSquare,
    platform: "Search Atlas + GoHighLevel",
    featured: true,
    features: [
      { text: "Google Business Profile optimization & updates", included: true },
      { text: "AI Content Creation (2 blog posts/month)", included: true },
      { text: "Local Citations & NAP consistency", included: true },
      { text: "30-minute monthly strategy review", included: true },
      { text: "Visual sales pipeline to track leads", included: true },
      { text: "5-7 step automated email drip", included: true },
      { text: "Web form auto-routing to CRM", included: true },
      { text: "Automated post-service review requests", included: true },
      { text: "Bi-weekly Email Broadcasts", included: false },
      { text: "Database Reactivation Campaigns", included: false },
      { text: "Social Media Management", included: false },
    ],
  },
  {
    name: "Growth",
    tagline: "The Growth Package",
    price: "$1,297",
    priceSuffix: "/month",
    bestFor: "Businesses ready to scale aggressively.",
    icon: TrendingUp,
    platform: "Search Atlas + GoHighLevel",
    features: [
      { text: "Google Business Profile optimization & updates", included: true },
      { text: "AI Content Creation (4 blog posts/month)", included: true },
      { text: "Local Citations & NAP consistency", included: true },
      { text: "Bi-weekly strategy calls", included: true },
      { text: "Visual sales pipeline to track leads", included: true },
      { text: "5-7 step automated email drip", included: true },
      { text: "Web form auto-routing to CRM", included: true },
      { text: "Automated post-service review requests", included: true },
      { text: "Bi-weekly broadcast emails", included: true },
      { text: "Quarterly database reactivation campaign", included: true },
      { text: "Social media management (3x/week, 2 platforms)", included: true },
    ],
  },
];

const trafficAddOns = [
  { name: "Advanced SEO Optimization", price: "$500", note: "one-time setup", detail: "Meta titles, descriptions, on-page content" },
  { name: "AEO & GEO Optimization", price: "$400", note: "one-time setup", detail: "Optimize for ChatGPT and LLMs" },
  { name: "Paid Advertising Management", price: "$497", note: "/month", detail: "Google or Meta Ads (ad spend billed separately)" },
  { name: "Extra Blog Posts (2 / month)", price: "$97", note: "/month", detail: "Add 2 more posts to your retainer" },
  { name: "Extra Blog Posts (4 / month)", price: "$197", note: "/month", detail: "Add 4 more posts to your retainer" },
  { name: "Social Media Posting (Standalone)", price: "$197", note: "/month", detail: "3x/week across 2 platforms" },
  { name: "Additional Social Platform", price: "$147", note: "/month", detail: "Add LinkedIn, TikTok, etc." },
  { name: "GBP Photo & Post Management", price: "$97", note: "/month", detail: "Weekly Google Business Profile updates" },
];

const conversionAddOns = [
  { name: "Custom Landing Pages (For Ads)", price: "$250", note: "per page", detail: "High-converting LPs for paid traffic" },
  { name: "Advanced Tracking Setup", price: "$350", note: "one-time", detail: "GA4 and Google Tag Manager" },
  { name: "Full GHL Funnel Build", price: "$497", note: "one-time", detail: "Complete funnel inside GoHighLevel" },
  { name: "Additional Email Campaign", price: "$97", note: "/month", detail: "Broadcast or promotional campaign" },
  { name: "Weekly Email Broadcast Upgrade", price: "$147", note: "/month", detail: "Upgrade from bi-weekly to weekly" },
  { name: "Database Reactivation (Standalone)", price: "$197", note: "/month", detail: "Quarterly email-only campaign" },
];

export default function Services() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Services & Pricing | Klema Creative";
    return () => {
      document.title = prevTitle;
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
              <span className="section-label text-white lg:text-[0.9375rem] lg:tracking-[0.12em]" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}>
                Services & Pricing
              </span>
            </div>
            <h1
              className="text-white mb-5 sm:mb-7 font-extrabold"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1, letterSpacing: "-0.025em" }}
            >
              Pick Your Path.
              <br />
              <span className="text-[var(--brand-lime)]">Build, Market, or Both.</span>
            </h1>
            <p className="text-white/80 font-body text-base sm:text-[1.0625rem] lg:text-[1.125rem] leading-[1.65] lg:leading-[1.7] max-w-2xl">
              Websites and marketing packages are separate. Start where you are: build a new site, redesign your current one, or skip straight to marketing if your site already converts. Transparent pricing, no long-term retainer contracts, no surprises.
            </p>

            <div className="flex flex-wrap gap-3 mt-7">
              <a href="#start-here" className="px-4 py-2 rounded-md border border-white/20 text-white/80 hover:text-white hover:border-white/40 text-[0.8125rem] font-display font-semibold transition-colors">
                Where Do I Start?
              </a>
              <a href="#pricing-builds" className="px-4 py-2 rounded-md border border-white/20 text-white/80 hover:text-white hover:border-white/40 text-[0.8125rem] font-display font-semibold transition-colors">
                Website Builds
              </a>
              <a href="#pricing-retainers" className="px-4 py-2 rounded-md border border-white/20 text-white/80 hover:text-white hover:border-white/40 text-[0.8125rem] font-display font-semibold transition-colors">
                Marketing Retainers
              </a>
              <a href="#add-ons" className="px-4 py-2 rounded-md border border-white/20 text-white/80 hover:text-white hover:border-white/40 text-[0.8125rem] font-display font-semibold transition-colors">
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
              Marketing packages assume you already have a high-converting website. If you don't, no problem — start with Phase 1 first. If you already have one that works, skip straight to marketing.
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
                Start with a professional, lead-capturing website. Once it's live, you can layer in a marketing retainer whenever you're ready.
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
                Skip the build entirely. Jump straight to a marketing retainer and we'll start driving high-intent traffic to the site you already have.
              </p>
              <a
                href="#pricing-retainers"
                className="text-[var(--brand-lime)] text-[0.875rem] font-display font-semibold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
              >
                Skip to marketing packages
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
                Modernize and optimize what you've got with our Refresh & Optimize package, then add a marketing retainer to drive traffic to your improved site.
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
          WEBSITE BUILDS
         ============================================================ */}
      <section id="pricing-builds" className="cream-section py-16 sm:py-24">
        <div className="container">
          <div className="max-w-3xl mb-10 sm:mb-14">
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <Zap className="w-3.5 h-3.5 text-[var(--brand-lime)] shrink-0" fill="currentColor" strokeWidth={2.5} />
              <span className="section-label text-[var(--brand-green-mid)]">Phase 1 — One-Time Projects</span>
            </div>
            <h2
              className="text-foreground mb-5 sm:mb-6 font-extrabold"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.625rem)", letterSpacing: "-0.025em", lineHeight: 1.15 }}
            >
              Build Your
              <span className="text-primary"> Digital Foundation</span>
            </h2>
            <p className="text-muted-foreground font-body text-base sm:text-[1.0625rem] leading-[1.65] sm:leading-[1.7]">
              High-converting websites designed to turn visitors into booked jobs. Every website project includes a free 1-month trial of our AI CRM (GoHighLevel) to capture your leads automatically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
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
                    Request a Quote
                  </a>
                </div>
              );
            })}
          </div>

          <p className="mt-8 text-muted-foreground text-[0.8125rem] font-body italic text-center">
            Note: Domain registration and monthly hosting fees are required and paid directly by the client.
          </p>
        </div>
      </section>

      {/* ============================================================
          DIGITAL MARKETING RETAINERS
         ============================================================ */}
      <section id="pricing-retainers" className="dark-section py-16 sm:py-24">
        <div className="container">
          <div className="max-w-3xl mb-10 sm:mb-14">
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <Zap className="w-3.5 h-3.5 text-[var(--brand-lime)] shrink-0" fill="currentColor" strokeWidth={2.5} />
              <span className="section-label text-[var(--brand-lime)]">Phase 2 — Monthly Packages</span>
            </div>
            <h2
              className="text-white mb-5 sm:mb-6 font-extrabold"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.625rem)", letterSpacing: "-0.025em", lineHeight: 1.15 }}
            >
              Fuel Your
              <span className="text-[var(--brand-lime)]"> Growth Engine</span>
            </h2>
            <p className="text-white/70 font-body text-base sm:text-[1.0625rem] leading-[1.65] sm:leading-[1.7]">
              Predictable lead flow and automated follow-up. These packages assume you already have a high-converting website ready to receive traffic.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
            {retainers.map((tier) => {
              const Icon = tier.icon;
              return (
                <div
                  key={tier.name}
                  className={`relative rounded-md p-6 sm:p-8 flex flex-col ${
                    tier.featured
                      ? "bg-white text-foreground shadow-2xl shadow-[var(--brand-lime)]/20 border-2 border-[var(--brand-lime)]"
                      : "bg-white/[0.04] border border-white/10 text-white"
                  }`}
                >
                  {tier.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--brand-lime)] text-white text-[0.6875rem] font-display font-bold tracking-wider uppercase px-3 py-1 rounded-sm whitespace-nowrap">
                      Most Popular
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-md bg-[var(--brand-lime)]/15 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[var(--brand-lime)]" strokeWidth={2} />
                    </div>
                    <span className="font-display font-bold text-[0.75rem] tracking-[0.15em] uppercase text-[var(--brand-lime)]">
                      Tier {tier.name === "Visibility" ? "1" : tier.name === "Conversion" ? "2" : "3"}
                    </span>
                  </div>
                  <h3
                    className={`text-[1.375rem] font-display font-extrabold mb-1 leading-tight ${
                      tier.featured ? "text-foreground" : "text-white"
                    }`}
                  >
                    {tier.tagline}
                  </h3>
                  <p className={`text-[0.8125rem] font-body mb-5 ${tier.featured ? "text-muted-foreground" : "text-white/55"}`}>
                    {tier.bestFor}
                  </p>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="font-display font-extrabold text-[2.25rem] text-[var(--brand-lime)] leading-none">
                      {tier.price}
                    </span>
                    <span className={`text-[0.875rem] font-body ${tier.featured ? "text-muted-foreground" : "text-white/55"}`}>
                      {tier.priceSuffix}
                    </span>
                  </div>
                  <p className={`text-[0.75rem] font-body italic mb-6 ${tier.featured ? "text-muted-foreground" : "text-white/45"}`}>
                    Platform: {tier.platform}
                  </p>

                  <ul className="flex flex-col gap-2.5 mb-7 flex-1">
                    {tier.features.map((f) => (
                      <li
                        key={f.text}
                        className={`flex items-start gap-2 text-[0.8125rem] font-body leading-snug ${
                          f.included
                            ? tier.featured
                              ? "text-foreground/85"
                              : "text-white/85"
                            : tier.featured
                            ? "text-muted-foreground/50 line-through"
                            : "text-white/30 line-through"
                        }`}
                      >
                        {f.included ? (
                          <Check className="w-3.5 h-3.5 text-[var(--brand-lime)] shrink-0 mt-1" strokeWidth={3} />
                        ) : (
                          <span className="w-3.5 h-3.5 shrink-0 mt-1 flex items-center justify-center">
                            <span className="w-2 h-px bg-current opacity-40" />
                          </span>
                        )}
                        <span>{f.text}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className={`mt-auto w-full text-center py-3 rounded-md font-display font-semibold text-[0.875rem] transition-colors ${
                      tier.featured
                        ? "btn-primary"
                        : "border border-white/20 text-white hover:bg-white/10"
                    }`}
                  >
                    Get Started
                  </a>
                </div>
              );
            })}
          </div>

          <p className="mt-8 text-white/55 text-[0.8125rem] font-body italic text-center">
            One-time onboarding fee applies to all retainer packages ($297–$497 for Tiers 1 & 2; $497–$997 for Tier 3) to cover initial setup, CRM configuration, and account integration.
          </p>
        </div>
      </section>

      {/* ============================================================
          À LA CARTE ADD-ONS
         ============================================================ */}
      <section id="add-ons" className="light-section py-16 sm:py-24">
        <div className="container">
          <div className="max-w-3xl mb-10 sm:mb-14">
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <Zap className="w-3.5 h-3.5 text-[var(--brand-lime)] shrink-0" fill="currentColor" strokeWidth={2.5} />
              <span className="section-label text-[var(--brand-green-mid)]">À La Carte Add-Ons</span>
            </div>
            <h2
              className="text-foreground mb-5 sm:mb-6 font-extrabold"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.625rem)", letterSpacing: "-0.025em", lineHeight: 1.15 }}
            >
              Customize
              <span className="text-primary"> Your Growth</span>
            </h2>
            <p className="text-muted-foreground font-body text-base sm:text-[1.0625rem] leading-[1.65] sm:leading-[1.7]">
              Enhance your marketing retainer with specific add-ons designed to accelerate your results.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Traffic & Visibility */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <Search className="w-4 h-4 text-[var(--brand-lime)] shrink-0" strokeWidth={2.5} />
                <h3 className="text-foreground text-[1.125rem] font-display font-extrabold">
                  Traffic & Visibility
                </h3>
              </div>
              <div className="flex flex-col gap-3">
                {trafficAddOns.map((item) => (
                  <div
                    key={item.name}
                    className="bg-white border border-border rounded-md p-4 sm:p-5 hover:border-[var(--brand-lime)]/40 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4 mb-1.5">
                      <h4 className="text-foreground text-[0.9375rem] font-display font-bold leading-tight">
                        {item.name}
                      </h4>
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

            {/* Conversion & CRM */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <Wrench className="w-4 h-4 text-[var(--brand-lime)] shrink-0" strokeWidth={2.5} />
                <h3 className="text-foreground text-[1.125rem] font-display font-extrabold">
                  Conversion & CRM (GoHighLevel)
                </h3>
              </div>
              <div className="flex flex-col gap-3">
                {conversionAddOns.map((item) => (
                  <div
                    key={item.name}
                    className="bg-white border border-border rounded-md p-4 sm:p-5 hover:border-[var(--brand-lime)]/40 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4 mb-1.5">
                      <h4 className="text-foreground text-[0.9375rem] font-display font-bold leading-tight">
                        {item.name}
                      </h4>
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
          </div>
        </div>
      </section>

      {/* ============================================================
          FINAL CTA + FORM
         ============================================================ */}
      <section id="contact" className="darker-section py-16 sm:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <Zap className="w-3.5 h-3.5 text-[var(--brand-lime)] shrink-0" fill="currentColor" strokeWidth={2.5} />
                <span className="section-label text-[var(--brand-lime)]">Not Sure Which Plan Fits?</span>
              </div>
              <h2
                className="text-white mb-5 sm:mb-6 font-extrabold"
                style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.625rem)", letterSpacing: "-0.025em", lineHeight: 1.15 }}
              >
                Get a Free
                <br />
                <span className="text-[var(--brand-lime)]">Personalized Recommendation</span>
              </h2>
              <p className="text-white/75 font-body text-base sm:text-[1.0625rem] leading-[1.65] sm:leading-[1.7] mb-6">
                Tell us about your business and we will recommend the exact combination of build + retainer + add-ons that fits your goals and budget. No high-pressure sales calls.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Personalized recommendation based on your business",
                  "Clear breakdown of pricing and timeline",
                  "No long-term retainer contracts ever",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/80 text-[0.9375rem] font-body">
                    <CheckCircle2 className="w-5 h-5 text-[var(--brand-lime)] shrink-0 mt-0.5" strokeWidth={2} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-md p-6 sm:p-8 lg:p-10 shadow-2xl shadow-black/30">
              <ContactForm idPrefix="services-contact" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileStickyBar />
    </div>
  );
}
