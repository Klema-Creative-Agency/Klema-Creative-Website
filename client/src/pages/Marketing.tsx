import { useEffect } from "react";
import {
  Zap,
  ArrowRight,
  EyeOff,
  MousePointerClick,
  PhoneMissed,
  Hammer,
  Rocket,
  Globe,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  ShieldCheck,
  FileText,
  Users,
  Search,
  PlugZap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";
import ContactForm from "@/components/ContactForm";

const problems = [
  {
    icon: EyeOff,
    title: "The Invisible Foundation",
    body: "If your website was built five years ago, loads slowly, or isn't optimized for local search, it is effectively invisible. When potential customers search for your services, they find your competitors instead.",
  },
  {
    icon: MousePointerClick,
    title: "The Leaky Bucket",
    body: "Even if you are driving traffic to your site, if it isn't designed to convert, lacking clear calls-to-action or immediate lead capture forms, that traffic bounces. You are paying for clicks, not customers.",
  },
  {
    icon: PhoneMissed,
    title: "The Follow-Up Failure",
    body: "You are on a job site and your phone rings. You miss the call. By the time you call them back, they have already booked with the next company on Google. 78% of customers buy from the company that responds first. If you aren't first, you are last.",
  },
];

const serviceCategories = [
  {
    icon: Globe,
    title: "Websites",
    subtitle: "Build or refresh your digital storefront",
    body: "Whether you need a single-page presence, a full lead-capture site, or a complete redesign of an outdated website, we build mobile-optimized sites engineered to convert visitors into booked jobs.",
    bullets: ["New builds & redesigns", "Mobile-first, fast-loading", "Built-in lead capture forms"],
    href: "/services#pricing-builds",
    cta: "Explore website packages",
  },
  {
    icon: Rocket,
    title: "Digital Marketing",
    subtitle: "Drive traffic, capture leads, automate follow-up",
    body: "Monthly retainers powered by Search Atlas + GoHighLevel. Local SEO, AI-driven content, automated email nurture, and a visual sales pipeline so every inquiry turns into a booked job.",
    bullets: ["Local SEO & AI content", "CRM automation & email nurture", "Bi-weekly strategy calls"],
    href: "/services#pricing-retainers",
    cta: "Explore marketing retainers",
  },
  {
    icon: Sparkles,
    title: "Add-Ons",
    subtitle: "Customize your growth engine",
    body: "Stack on what you need. Paid ad management, additional blog posts, custom landing pages for campaigns, advanced tracking, full GHL funnel builds, and more — all à la carte.",
    bullets: ["Paid ads management", "Custom landing pages", "Advanced tracking & funnels"],
    href: "/services#add-ons",
    cta: "Browse add-ons",
  },
];

const promises = [
  {
    icon: TrendingUp,
    title: "Predictable Lead Flow",
    body: "Move away from the feast-or-famine cycle of referrals and word-of-mouth. Expect a consistent, measurable stream of inquiries from local customers actively searching for your services.",
  },
  {
    icon: ShieldCheck,
    title: "Zero Missed Opportunities",
    body: "With our CRM automation running in the background, you will never lose a job because you couldn't follow up in time. Our systems engage prospects instantly via automated email sequences.",
  },
  {
    icon: FileText,
    title: "Total Transparency",
    body: "We do not hide behind vanity metrics like impressions or likes. You will receive clear, bottom-line reporting that shows exactly how much traffic we drove, how many leads were captured, and how your sales pipeline is performing.",
  },
  {
    icon: Users,
    title: "A True Partnership",
    body: "Work with a team that understands your industry. We handle the complex digital infrastructure so that you can focus entirely on running your business and serving your customers.",
  },
];

const processSteps = [
  {
    number: "01",
    icon: Search,
    title: "The Audit & Discovery",
    body: "We analyze your current digital footprint. We look at your website, your Google Business Profile, and your local search rankings to identify exactly where you are losing money to competitors.",
  },
  {
    number: "02",
    icon: Hammer,
    title: "The Foundation Build",
    body: "We either build a new, high-converting website from scratch or execute a comprehensive redesign of your existing site. This ensures we have a solid foundation to build upon.",
  },
  {
    number: "03",
    icon: PlugZap,
    title: "The CRM Integration",
    body: "As soon as your site is ready, we integrate our GoHighLevel CRM Suite. We set up your web forms, build your sales pipeline, and configure your automated email nurture sequences.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "The Growth Retainer",
    body: "Once the foundation is built and the CRM is capturing leads, we turn on the traffic engine. SEO, content marketing via Search Atlas, and (if applicable) paid advertising drive massive local traffic to your conversion machine.",
  },
];

export default function Marketing() {
  // Update document title and meta for this page
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Marketing Services | Klema Creative — Websites + AI-Driven Lead Engines";
    return () => {
      document.title = prevTitle;
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ============================================================
          HERO
         ============================================================ */}
      <section className="relative min-h-[88dvh] lg:min-h-[85dvh] flex flex-col overflow-hidden bg-[var(--brand-charcoal)]">
        {/* Background ambient gradient */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 1100px 700px at 80% 30%, oklch(0.74 0.21 50 / 0.18) 0%, oklch(0.18 0.02 240 / 0) 65%), radial-gradient(ellipse 900px 600px at 10% 80%, oklch(0.32 0.10 240 / 0.55) 0%, oklch(0.18 0.02 240 / 0) 60%)",
          }}
        />

        <div className="container relative z-10 pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 flex-1 flex flex-col">
          <div className="max-w-3xl flex-1 flex flex-col">
            {/* Eyebrow */}
            <div className="mb-5 sm:mb-6 lg:mb-8 hero-animate hero-animate-d1">
              <div className="flex items-center gap-3">
                <Zap className="w-3.5 h-3.5 text-[var(--brand-lime)] shrink-0" fill="currentColor" strokeWidth={2.5} />
                <span className="section-label text-white lg:text-[0.9375rem] lg:tracking-[0.12em]" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}>
                  Marketing Services for Local Businesses
                </span>
              </div>
            </div>

            <div className="mt-auto">
              {/* Headline */}
              <h1
                className="text-white mb-5 sm:mb-7 font-extrabold hero-animate hero-animate-d2"
                style={{
                  fontSize: "clamp(2rem, 5.5vw, 4.25rem)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.025em",
                }}
              >
                Stop Chasing Leads.
                <br />
                <span className="text-[var(--brand-lime)]">Start Dominating Your Market.</span>
              </h1>

              {/* Sub-headline */}
              <p className="text-white/80 font-body mb-8 sm:mb-10 max-w-2xl text-[0.9375rem] sm:text-base lg:text-[1.125rem] leading-[1.65] lg:leading-[1.7] hero-animate hero-animate-d3">
                We build high-converting digital foundations and deploy AI-driven marketing engines for local service businesses. No fluff. Just predictable revenue growth.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 hero-animate hero-animate-d4">
                <a href="#contact" className="btn-primary w-full sm:w-auto text-base">
                  Get Your Free Digital Audit
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#pricing-builds" className="btn-outline-white w-full sm:w-auto text-base">
                  View Our Pricing
                </a>
              </div>
              <p className="text-white/45 text-[0.8125rem] font-body mt-4">
                Free audit, no obligation. Takes 2 minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          THE PROBLEM
         ============================================================ */}
      <section className="dark-section py-16 sm:py-24">
        <div className="container">
          <div className="max-w-3xl mb-10 sm:mb-14">
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <Zap className="w-3.5 h-3.5 text-[var(--brand-lime)] shrink-0" fill="currentColor" strokeWidth={2.5} />
              <span className="section-label text-[var(--brand-lime)]">The Problem We Solve</span>
            </div>
            <h2
              className="text-white mb-5 sm:mb-6 font-extrabold"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.625rem)", letterSpacing: "-0.025em", lineHeight: 1.15 }}
            >
              Local Businesses Are Losing Money in
              <span className="text-[var(--brand-lime)]"> Three Distinct Ways</span>
            </h2>
            <p className="text-white/70 font-body text-base sm:text-[1.0625rem] leading-[1.65] sm:leading-[1.7]">
              Most owners don't even realize it is happening. Here is what's actually costing you jobs every single week.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {problems.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="bg-white/[0.04] border border-white/10 rounded-md p-6 sm:p-7 hover:bg-white/[0.06] transition-colors"
                >
                  <div className="w-11 h-11 rounded-md bg-[var(--brand-lime)]/15 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-[var(--brand-lime)]" strokeWidth={2} />
                  </div>
                  <h3 className="text-white text-[1.125rem] sm:text-[1.25rem] font-display font-bold mb-3 leading-tight">
                    {p.title}
                  </h3>
                  <p className="text-white/65 text-[0.875rem] sm:text-[0.9375rem] font-body leading-relaxed">
                    {p.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          THE SOLUTION (TWO PHASES)
         ============================================================ */}
      <section id="solution" className="light-section py-16 sm:py-24">
        <div className="container">
          <div className="max-w-3xl mb-10 sm:mb-14">
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <Zap className="w-3.5 h-3.5 text-[var(--brand-lime)] shrink-0" fill="currentColor" strokeWidth={2.5} />
              <span className="section-label text-[var(--brand-green-mid)]">The Klema Creative Solution</span>
            </div>
            <h2
              className="text-foreground mb-5 sm:mb-6 font-extrabold"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.625rem)", letterSpacing: "-0.025em", lineHeight: 1.15 }}
            >
              Build the Foundation,
              <span className="text-primary"> Then Turn on the Engine</span>
            </h2>
            <p className="text-muted-foreground font-body text-base sm:text-[1.0625rem] leading-[1.65] sm:leading-[1.7]">
              We solve these problems through a two-phased approach. We don't drive traffic to a leaky bucket — first we make sure your digital storefront is built to convert.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
            {/* Phase 1 */}
            <div className="bg-white border border-border rounded-md p-6 sm:p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--brand-lime)]" />
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-md bg-[var(--brand-lime)]/15 flex items-center justify-center">
                  <Hammer className="w-5 h-5 text-[var(--brand-lime)]" strokeWidth={2} />
                </div>
                <span className="font-display font-bold text-[0.75rem] tracking-[0.15em] uppercase text-[var(--brand-lime)]">
                  Phase 1
                </span>
              </div>
              <h3 className="text-foreground text-[1.375rem] sm:text-[1.625rem] font-display font-extrabold mb-3 leading-tight">
                The Digital Foundation
              </h3>
              <p className="text-muted-foreground text-[0.9375rem] font-body leading-relaxed mb-5">
                A one-time setup. We build a high-converting, mobile-optimized site designed specifically to capture leads. If you already have a website that isn't performing, we execute a complete Refresh & Optimize redesign.
              </p>
              <p className="text-foreground/80 text-[0.8125rem] font-body italic">
                One-time investment from $297
              </p>
            </div>

            {/* Phase 2 */}
            <div className="bg-white border border-border rounded-md p-6 sm:p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-md bg-primary/[0.08] flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-primary" strokeWidth={2} />
                </div>
                <span className="font-display font-bold text-[0.75rem] tracking-[0.15em] uppercase text-primary">
                  Phase 2
                </span>
              </div>
              <h3 className="text-foreground text-[1.375rem] sm:text-[1.625rem] font-display font-extrabold mb-3 leading-tight">
                The Growth Engine
              </h3>
              <p className="text-muted-foreground text-[0.9375rem] font-body leading-relaxed mb-5">
                A monthly retainer. We drive targeted, high-intent traffic via Local SEO, Answer Engine Optimization (AEO), and content marketing — backed by our AI CRM Suite so every lead is captured and nurtured automatically.
              </p>
              <p className="text-foreground/80 text-[0.8125rem] font-body italic">
                Monthly investment from $297
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SERVICES OVERVIEW (links to /services for full pricing)
         ============================================================ */}
      <section id="services-overview" className="cream-section py-16 sm:py-24">
        <div className="container">
          <div className="max-w-3xl mb-10 sm:mb-14">
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <Zap className="w-3.5 h-3.5 text-[var(--brand-lime)] shrink-0" fill="currentColor" strokeWidth={2.5} />
              <span className="section-label text-[var(--brand-green-mid)]">What We Offer</span>
            </div>
            <h2
              className="text-foreground mb-5 sm:mb-6 font-extrabold"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.625rem)", letterSpacing: "-0.025em", lineHeight: 1.15 }}
            >
              Three Services.
              <span className="text-primary"> Mix and Match What You Need.</span>
            </h2>
            <p className="text-muted-foreground font-body text-base sm:text-[1.0625rem] leading-[1.65] sm:leading-[1.7]">
              Websites and marketing packages are separate. Need a new site? Start with a build. Already have one that converts? Skip straight to a marketing retainer. Want extras? Stack on à la carte add-ons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mb-10">
            {serviceCategories.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="bg-white border border-border rounded-md p-6 sm:p-7 flex flex-col hover:border-[var(--brand-lime)]/40 hover:shadow-lg hover:shadow-[var(--brand-lime)]/10 transition-all"
                >
                  <div className="w-11 h-11 rounded-md bg-[var(--brand-lime)]/15 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-[var(--brand-lime)]" strokeWidth={2} />
                  </div>
                  <h3 className="text-foreground text-[1.25rem] font-display font-extrabold mb-1.5 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-[var(--brand-lime)] text-[0.8125rem] font-display font-semibold uppercase tracking-wider mb-3">
                    {service.subtitle}
                  </p>
                  <p className="text-muted-foreground text-[0.875rem] sm:text-[0.9375rem] font-body leading-relaxed mb-5">
                    {service.body}
                  </p>
                  <ul className="flex flex-col gap-2 mb-6">
                    {service.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-foreground/80 text-[0.8125rem] font-body">
                        <Zap className="w-3 h-3 text-[var(--brand-lime)] shrink-0 mt-1" fill="currentColor" strokeWidth={2.5} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={service.href}
                    className="mt-auto text-[var(--brand-lime)] text-[0.875rem] font-display font-semibold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
                  >
                    {service.cta}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <a href="/services" className="btn-primary inline-flex">
              View Full Pricing & Packages
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          WHAT YOU CAN EXPECT (THE KLEMA PROMISE)
         ============================================================ */}
      <section id="promise" className="dark-section py-16 sm:py-24">
        <div className="container">
          <div className="max-w-3xl mb-10 sm:mb-14">
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <Zap className="w-3.5 h-3.5 text-[var(--brand-lime)] shrink-0" fill="currentColor" strokeWidth={2.5} />
              <span className="section-label text-[var(--brand-lime)]">The Klema Promise</span>
            </div>
            <h2
              className="text-white mb-5 sm:mb-6 font-extrabold"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.625rem)", letterSpacing: "-0.025em", lineHeight: 1.15 }}
            >
              What You Can
              <span className="text-[var(--brand-lime)]"> Expect</span>
            </h2>
            <p className="text-white/70 font-body text-base sm:text-[1.0625rem] leading-[1.65] sm:leading-[1.7]">
              When you partner with Klema Creative, you can expect a fundamental shift in how your business acquires customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
            {promises.map((promise) => {
              const Icon = promise.icon;
              return (
                <div
                  key={promise.title}
                  className="bg-white/[0.04] border border-white/10 rounded-md p-6 sm:p-8 hover:bg-white/[0.06] transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-md bg-[var(--brand-lime)]/15 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[var(--brand-lime)]" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-white text-[1.125rem] sm:text-[1.25rem] font-display font-bold mb-3 leading-tight">
                        {promise.title}
                      </h3>
                      <p className="text-white/65 text-[0.875rem] sm:text-[0.9375rem] font-body leading-relaxed">
                        {promise.body}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          HOW IT WORKS (4-STEP PROCESS)
         ============================================================ */}
      <section id="process" className="cream-section py-16 sm:py-24">
        <div className="container">
          <div className="max-w-3xl mb-10 sm:mb-14">
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <Zap className="w-3.5 h-3.5 text-[var(--brand-lime)] shrink-0" fill="currentColor" strokeWidth={2.5} />
              <span className="section-label text-[var(--brand-green-mid)]">How It Works</span>
            </div>
            <h2
              className="text-foreground mb-5 sm:mb-6 font-extrabold"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.625rem)", letterSpacing: "-0.025em", lineHeight: 1.15 }}
            >
              Our
              <span className="text-primary"> Four-Step Process</span>
            </h2>
            <p className="text-muted-foreground font-body text-base sm:text-[1.0625rem] leading-[1.65] sm:leading-[1.7]">
              Designed to be seamless, fast, and immediately impactful.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {processSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="bg-white border border-border rounded-md p-6 sm:p-7 relative"
                >
                  <span className="absolute top-5 right-5 font-display font-extrabold text-[2.5rem] text-[var(--brand-lime)]/20 leading-none select-none">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-md bg-primary/[0.08] flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-primary" strokeWidth={2} />
                  </div>
                  <h3 className="text-foreground text-[1.0625rem] sm:text-[1.125rem] font-display font-extrabold mb-3 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-[0.8125rem] sm:text-[0.875rem] font-body leading-relaxed">
                    {step.body}
                  </p>
                </div>
              );
            })}
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
                <span className="section-label text-[var(--brand-lime)]">Ready to Start?</span>
              </div>
              <h2
                className="text-white mb-5 sm:mb-6 font-extrabold"
                style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.625rem)", letterSpacing: "-0.025em", lineHeight: 1.15 }}
              >
                Get Your Free
                <br />
                <span className="text-[var(--brand-lime)]">Digital Audit</span>
              </h2>
              <p className="text-white/75 font-body text-base sm:text-[1.0625rem] leading-[1.65] sm:leading-[1.7] mb-6">
                We'll review your website, your Google Business Profile, and your local search rankings, and show you exactly where you're losing money to competitors. Free, no-obligation, takes 2 minutes to request.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Personalized audit of your current digital footprint",
                  "Specific gaps where competitors are winning your leads",
                  "A clear plan with no high-pressure sales tactics",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/80 text-[0.9375rem] font-body">
                    <CheckCircle2 className="w-5 h-5 text-[var(--brand-lime)] shrink-0 mt-0.5" strokeWidth={2} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-md p-6 sm:p-8 lg:p-10 shadow-2xl shadow-black/30">
              <ContactForm idPrefix="marketing-contact" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileStickyBar />
    </div>
  );
}
