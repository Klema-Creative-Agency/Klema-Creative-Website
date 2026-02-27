"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ProposalData } from "@/app/data/proposals";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import ProposalCheckout from "@/app/components/proposals/ProposalCheckout";
import ProposalSuccess from "@/app/components/proposals/ProposalSuccess";
import CheckoutFlowDemo from "@/app/components/proposals/CheckoutFlowDemo";

export default function ProposalPageClient({
  proposal,
}: {
  proposal: ProposalData;
}) {
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "loading" | "success"
  >("idle");
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  // Hide global nav/footer (same pattern as TierVSLPage)
  useEffect(() => {
    document.body.classList.add("vsl-page");
    return () => document.body.classList.remove("vsl-page");
  }, []);

  const todayTotal =
    proposal.pilotTerms.setupFee + proposal.pilotTerms.monthlyRate;

  return (
    <div className="min-h-screen bg-bg">
      {/* MINIMAL NAV */}
      <nav className="py-5 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 flex items-center justify-between">
          <Link
            href="/"
            className="text-[22px] font-bold text-text no-underline tracking-[-0.4px] flex items-center gap-2.5"
          >
            <span className="logo-dot" />
            klema creative
          </Link>
          <span className="text-sm text-text-dim">
            Prepared for {proposal.clientBusinessName}
          </span>
        </div>
      </nav>

      {/* ============================================================
       *  HERO — Lead with the outcome, not the feature
       * ============================================================ */}
      <section className="relative pt-24 pb-16 max-md:pt-16 max-md:pb-12 overflow-hidden">
        {/* Subtle radial glow behind hero */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(74,222,128,0.06) 0%, rgba(74,222,128,0.02) 40%, transparent 70%)",
          }}
        />
        <div className="relative max-w-[760px] mx-auto px-8 max-md:px-5 text-center">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-accent mb-5">
              Proposal for {proposal.clientBusinessName}
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <h1 className="text-[clamp(34px,5.5vw,60px)] font-extrabold leading-[1.08] tracking-[-1.5px] mb-6 text-text">
              Stop chasing payments.<br />
              <span className="text-accent">Start collecting them.</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll>
            <p className="text-[18px] text-text-dim leading-[1.75] max-w-[540px] mx-auto mb-10">
              We build a professional checkout directly into your website so
              customers can pick a package, pay, and get onboarded &mdash; all
              without you lifting a finger.
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#checkout"
                className="btn-primary-hover inline-flex items-center gap-2 bg-accent text-black font-bold text-[15px] px-8 py-3.5 rounded-full transition-all duration-300 hover:shadow-[0_0_32px_rgba(74,222,128,0.3)] hover:-translate-y-px"
              >
                Get Started for ${todayTotal.toLocaleString()}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
              <a
                href="#demo"
                className="inline-flex items-center gap-2 text-[14px] font-semibold text-text-mid hover:text-accent transition-colors"
              >
                See it in action
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============================================================
       *  THE PROBLEM — Compact, emotional, scannable
       * ============================================================ */}
      <section className="py-16 max-md:py-10">
        <div className="max-w-[700px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <div className="proposal-problem-card rounded-[20px] p-8 max-md:p-6">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-red/70 mb-3">
                The problem
              </p>
              <h2 className="text-[clamp(22px,3vw,30px)] font-extrabold leading-[1.2] tracking-[-0.8px] mb-5 text-text">
                Every day without a checkout, you&apos;re losing customers.
              </h2>
              <div className="space-y-3">
                {[
                  "Visitors see your packages but have no way to pay on the spot.",
                  "Every extra step \u2014 DMs, invoices, phone calls \u2014 is a chance for them to drop off.",
                  "No automated receipts, no CRM triggers, no onboarding workflow.",
                  "It doesn\u2019t look professional \u2014 and in credit repair, trust is everything.",
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-red/60" />
                    <p className="text-[14px] text-text-mid leading-[1.65]">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============================================================
       *  THE SOLUTION — Three clean steps
       * ============================================================ */}
      <section className="py-16 max-md:py-10">
        <div className="max-w-[800px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
              The solution
            </p>
            <h2 className="text-[clamp(24px,3.5vw,36px)] font-extrabold leading-[1.15] tracking-[-1px] mb-4">
              A complete checkout system,<br />
              built into your website.
            </h2>
            <p className="text-[16px] text-text-dim leading-[1.7] max-w-[580px] mb-10">
              Your customers pick a package, enter their card, and pay &mdash;
              all without leaving your site. You get notified, they get a
              receipt, and your CRM handles the rest.
            </p>
          </RevealOnScroll>
          <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
            {[
              {
                num: "01",
                title: "They see it",
                body: "Your packages, your pricing, your brand \u2014 right on your site.",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                ),
              },
              {
                num: "02",
                title: "They pay it",
                body: "Secure Stripe checkout. No redirects, no friction. 30 seconds.",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                ),
              },
              {
                num: "03",
                title: "You get paid",
                body: "Instant notification. Auto receipt. CRM onboarding triggered.",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                ),
              },
            ].map((s) => (
              <RevealOnScroll key={s.num}>
                <div className="bg-surface border border-border rounded-[16px] p-6 h-full transition-all duration-300 hover:border-accent-border">
                  <div className="w-10 h-10 rounded-xl bg-accent-dim border border-accent-border flex items-center justify-center mb-4">
                    {s.icon}
                  </div>
                  <h3 className="text-[15px] font-bold mb-1.5 tracking-[-0.2px]">
                    {s.title}
                  </h3>
                  <p className="text-[13px] text-text-dim leading-[1.6]">
                    {s.body}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
       *  INTERACTIVE DEMO — The star of the page
       * ============================================================ */}
      <div id="demo">
        <CheckoutFlowDemo
          clientFirstName={proposal.clientFirstName}
          clientBusinessName={proposal.clientBusinessName}
        />
      </div>

      {/* ============================================================
       *  THE MATH / ROI — Moved up before pricing to build conviction
       * ============================================================ */}
      <section className="py-20 max-md:py-14">
        <div className="max-w-[800px] mx-auto px-8 max-md:px-5 text-center">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
              The math
            </p>
            <h2 className="text-[clamp(26px,3.5vw,38px)] font-extrabold leading-[1.15] tracking-[-1px] mb-3">
              This pays for itself with 3 clients.
            </h2>
            <p className="text-[15px] text-text-dim leading-[1.7] max-w-[480px] mx-auto mb-10">
              Here&apos;s how quickly the checkout recoups your investment &mdash;
              and starts putting money in your pocket.
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="proposal-roi-card rounded-[24px] p-8 max-md:p-6 max-w-[580px] mx-auto">
              <div className="grid grid-cols-3 gap-4 mb-8 max-md:grid-cols-1 max-md:gap-3">
                <div className="text-center py-5 rounded-2xl bg-white-6 border border-border">
                  <div className="text-[32px] font-black text-accent leading-none">$149</div>
                  <div className="text-[11px] text-text-dim mt-2 leading-tight">
                    Your avg.<br />package price
                  </div>
                </div>
                <div className="text-center py-5 rounded-2xl bg-white-6 border border-border flex flex-col items-center justify-center">
                  <div className="text-[32px] font-black text-text leading-none">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="inline -mt-1 mr-1 opacity-40"><line x1="18" y1="6" x2="6" y2="18"/></svg>
                    3
                  </div>
                  <div className="text-[11px] text-text-dim mt-2 leading-tight">
                    Extra clients<br />per month
                  </div>
                </div>
                <div className="text-center py-5 rounded-2xl bg-accent-dim border border-accent-border">
                  <div className="text-[32px] font-black text-accent leading-none">$447</div>
                  <div className="text-[11px] text-accent/70 mt-2 leading-tight">
                    New monthly<br />revenue
                  </div>
                </div>
              </div>
              <div className="h-px bg-border mb-6" />
              <p className="text-[15px] text-text-mid leading-[1.8]">
                If the checkout converts just <span className="text-accent font-bold">3 extra
                clients per month</span> at your average package price, that&apos;s{" "}
                <span className="text-accent font-bold">$447/mo in new revenue</span> &mdash;
                more than covering your $350/mo investment.{" "}
                <span className="text-text font-semibold">Everything above that is profit.</span>
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============================================================
       *  PRICING + CHECKOUT — Unified section (the decision point)
       * ============================================================ */}
      <section id="checkout" className="py-20 max-md:py-14">
        <div className="max-w-[640px] mx-auto px-8 max-md:px-5">
          {paymentStatus === "success" ? (
            <ProposalSuccess proposal={proposal} />
          ) : (
            <>
              <RevealOnScroll>
                <div className="text-center mb-12">
                  <p className="text-xs font-bold tracking-[0.18em] uppercase text-accent mb-4">
                    Your Investment
                  </p>
                  <h2 className="text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-3">
                    Let&apos;s get you paid faster.
                  </h2>
                  <p className="text-[15px] text-text-dim leading-[1.7] max-w-[440px] mx-auto">
                    Secure your pilot spot and we&apos;ll have your checkout
                    live within 48 hours.
                  </p>
                </div>
              </RevealOnScroll>

              {/* Pricing breakdown */}
              <RevealOnScroll>
                <div className="price-card-featured border rounded-[24px] p-8 max-md:p-6 mb-8">
                  {/* Pilot badge */}
                  <div className="flex items-center justify-center mb-6">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.1em] uppercase text-accent bg-accent-dim border border-accent-border rounded-full px-4 py-1.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"/></svg>
                      Pilot Program &mdash; Reduced Rate
                    </span>
                  </div>

                  {/* Price lines */}
                  <div className="space-y-0">
                    <div className="flex justify-between items-baseline py-4 border-b border-border">
                      <div>
                        <span className="text-[15px] text-text font-medium">Setup &amp; Integration</span>
                        <p className="text-[12px] text-text-dim mt-0.5">One-time build fee</p>
                      </div>
                      <span className="text-[20px] font-bold text-text tabular-nums">
                        ${proposal.pilotTerms.setupFee.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline py-4 border-b border-border">
                      <div>
                        <span className="text-[15px] text-text font-medium">Monthly Monitoring &amp; Support</span>
                        <p className="text-[12px] text-text-dim mt-0.5">
                          ${proposal.pilotTerms.monthlyRate}/mo for {proposal.pilotTerms.pilotMonths} months
                          <span className="text-accent/70 ml-1.5">
                            (saves ${((proposal.pilotTerms.standardRate - proposal.pilotTerms.monthlyRate) * proposal.pilotTerms.pilotMonths).toLocaleString()})
                          </span>
                        </p>
                      </div>
                      <span className="text-[20px] font-bold text-text tabular-nums">
                        ${proposal.pilotTerms.monthlyRate}/mo
                      </span>
                    </div>
                  </div>

                  {/* Today's total */}
                  <div className="mt-6 mb-2 text-center">
                    <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-text-dim mb-2">
                      Due today
                    </p>
                    <div className="flex items-baseline justify-center gap-1.5">
                      <span className="text-[clamp(44px,6vw,60px)] font-black tracking-[-2px] text-accent">
                        ${todayTotal.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-[13px] text-text-dim mt-1">
                      Setup + first month
                    </p>
                  </div>
                </div>
              </RevealOnScroll>

              {/* Stripe Checkout Form */}
              <RevealOnScroll>
                <ProposalCheckout
                  proposal={proposal}
                  onSuccess={() => setPaymentStatus("success")}
                />
              </RevealOnScroll>
            </>
          )}
        </div>
      </section>

      {/* ============================================================
       *  WHAT'S INCLUDED — Lighter, scannable, expandable
       * ============================================================ */}
      <section className="py-16 max-md:py-10 border-t border-border">
        <div className="max-w-[700px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
              What&apos;s included
            </p>
            <h2 className="text-[clamp(24px,3vw,32px)] font-extrabold leading-[1.15] tracking-[-0.8px] mb-8">
              Everything you need. Nothing you don&apos;t.
            </h2>
          </RevealOnScroll>

          {/* First 3 always visible, rest toggle */}
          <div className="space-y-3">
            {[
              {
                title: "Embedded Stripe Checkout",
                body: "A real payment form built into your website. Your customers stay on your site the entire time.",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
                ),
              },
              {
                title: "Mobile Optimized",
                body: "Large buttons, easy inputs, fast load. Designed for phones first because that\u2019s where your customers are.",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>
                ),
              },
              {
                title: "Instant Payment Notifications",
                body: "Email, SMS, or both \u2014 the second a payment goes through, you know.",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                ),
              },
              {
                title: "Automatic Receipts",
                body: "Every customer gets a professional receipt the moment they pay. No manual follow-up.",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                ),
              },
              {
                title: "CRM Automation (GHL)",
                body: "Payments trigger your workflow automatically. Clients get tagged, pipelined, and onboarded.",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
                ),
              },
              {
                title: "Ongoing Monitoring & Support",
                body: "We don\u2019t build it and disappear. We monitor, update, and fix issues month over month.",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                ),
              },
            ].slice(0, showAllFeatures ? 6 : 3).map((item, i) => (
              <RevealOnScroll key={i}>
                <div className="flex items-start gap-4 py-4 px-5 rounded-2xl bg-surface border border-border transition-all duration-300 hover:border-accent-border-light">
                  <div className="w-9 h-9 rounded-xl bg-accent-dim border border-accent-border flex items-center justify-center shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-bold tracking-[-0.2px] mb-0.5">
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-text-dim leading-[1.6]">
                      {item.body}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {!showAllFeatures && (
            <button
              onClick={() => setShowAllFeatures(true)}
              className="mt-4 w-full py-3 text-[13px] font-semibold text-text-mid hover:text-accent transition-colors flex items-center justify-center gap-1.5"
            >
              Show all 6 features
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
          )}
        </div>
      </section>

      {/* ============================================================
       *  NEXT STEPS — What happens after payment
       * ============================================================ */}
      <section className="py-20 max-md:py-14 border-t border-border">
        <div className="max-w-[800px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
                After you pay
              </p>
              <h2 className="text-[clamp(26px,3.5vw,36px)] font-extrabold leading-[1.1] tracking-[-1px] mb-3">
                Live in 48 hours. Here&apos;s how.
              </h2>
              <p className="text-[15px] text-text-dim leading-[1.7] max-w-[480px] mx-auto">
                Four simple steps from payment to a working checkout on your site.
              </p>
            </div>
          </RevealOnScroll>
          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            {proposal.nextSteps.map((step) => (
              <RevealOnScroll key={step.num}>
                <div className="bg-surface border border-border rounded-[20px] p-7 h-full transition-all duration-300 hover:border-accent-border-light">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-accent-dim border border-accent-border flex items-center justify-center shrink-0">
                      <span className="text-accent text-[13px] font-bold">
                        {step.num}
                      </span>
                    </div>
                    <h3 className="text-[16px] font-bold tracking-[-0.2px]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-[13px] text-text-dim leading-[1.7] pl-11">
                    {step.body}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* Final CTA */}
          <RevealOnScroll>
            <div className="text-center mt-14">
              <a
                href="#checkout"
                className="btn-primary-hover inline-flex items-center gap-2 bg-accent text-black font-bold text-[15px] px-8 py-3.5 rounded-full transition-all duration-300 hover:shadow-[0_0_32px_rgba(74,222,128,0.3)] hover:-translate-y-px"
              >
                Get Started Today
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* MINIMAL FOOTER */}
      <footer className="border-t border-border py-8">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 text-center">
          <p className="text-[12px] text-text-dim">
            &copy; {new Date().getFullYear()} Klema Creative. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
