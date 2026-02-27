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

      {/* HEADER — personalized */}
      <section className="pt-20 pb-10 max-md:pt-14 max-md:pb-8">
        <div className="max-w-[800px] mx-auto px-8 max-md:px-5 text-center">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
              Built for {proposal.clientBusinessName}
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <h1 className="font-serif text-[clamp(32px,5vw,56px)] font-medium leading-[1.1] tracking-[-1.5px] mb-5 text-text">
              Let your customers pay you<br />
              <span className="text-accent">directly from your website.</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll>
            <p className="text-[17px] text-text-dim leading-[1.7] max-w-[560px] mx-auto">
              No more chasing payments. No more back-and-forth. A professional
              checkout experience that turns website visitors into paying
              clients — automatically.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="py-16 max-md:py-10 border-t border-border">
        <div className="max-w-[800px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-red/70 mb-4">
              The problem
            </p>
            <h2 className="text-[clamp(24px,3.5vw,36px)] font-extrabold leading-[1.15] tracking-[-1px] mb-6">
              Right now, you&apos;re leaving money on the table.
            </h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 gap-4">
            {[
              {
                text: "Customers visit your site, see your packages, but there's no way to pay right there.",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                ),
              },
              {
                text: "Every extra step — DMs, invoices, phone calls to collect payment — is a chance for them to drop off.",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                ),
              },
              {
                text: "You have no automated way to confirm payments, send receipts, or trigger onboarding when someone pays.",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                ),
              },
              {
                text: "It doesn't look professional — and in credit repair, trust is everything.",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                ),
              },
            ].map((item, i) => (
              <RevealOnScroll key={i}>
                <div className="flex items-start gap-4 py-3">
                  <div className="mt-0.5 shrink-0">{item.icon}</div>
                  <p className="text-[15px] text-text-mid leading-[1.7]">
                    {item.text}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* THE SOLUTION */}
      <section className="py-16 max-md:py-10 border-t border-border">
        <div className="max-w-[800px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
              The solution
            </p>
            <h2 className="text-[clamp(24px,3.5vw,36px)] font-extrabold leading-[1.15] tracking-[-1px] mb-6">
              We embed a complete checkout system<br />
              directly into your website.
            </h2>
            <p className="text-[17px] text-text-dim leading-[1.7] max-w-[620px] mb-8">
              Your customers pick a package, enter their card, and pay — all
              without leaving your site. You get notified instantly, they get a
              receipt, and your CRM starts the onboarding workflow
              automatically. No manual work. No follow-up needed.
            </p>
          </RevealOnScroll>
          <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
            {[
              {
                num: "01",
                title: "They see it",
                body: "Your packages, your pricing, your brand — right on your site.",
              },
              {
                num: "02",
                title: "They pay it",
                body: "Secure Stripe checkout. No redirects, no friction. 30 seconds.",
              },
              {
                num: "03",
                title: "You get paid",
                body: "Instant notification. Auto receipt. CRM onboarding triggered.",
              },
            ].map((s) => (
              <RevealOnScroll key={s.num}>
                <div className="bg-surface border border-border rounded-[16px] p-6">
                  <div className="text-[28px] font-black text-accent/20 leading-none mb-3">
                    {s.num}
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

      {/* INTERACTIVE DEMO */}
      <CheckoutFlowDemo
        clientFirstName={proposal.clientFirstName}
        clientBusinessName={proposal.clientBusinessName}
      />

      {/* WHAT'S INCLUDED — detailed */}
      <section className="py-20 max-md:py-14 border-t border-border">
        <div className="max-w-[900px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
              What&apos;s included
            </p>
            <h2 className="text-[clamp(24px,3.5vw,36px)] font-extrabold leading-[1.15] tracking-[-1px] mb-12">
              Everything you need. Nothing you don&apos;t.
            </h2>
          </RevealOnScroll>
          <div className="flex flex-col gap-5">
            {[
              {
                title: "Embedded Stripe Checkout",
                body: "A real payment form built into your website — not a link to some other page. Your customers stay on your site the entire time. Builds trust and increases conversions.",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
                ),
              },
              {
                title: "Mobile Optimized",
                body: "Most of your customers will pay from their phone. The checkout is designed for mobile first — large buttons, easy inputs, fast load. No pinching or zooming.",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>
                ),
              },
              {
                title: "Instant Payment Notifications",
                body: "The second a payment goes through, you know about it. Email, SMS, or both. No more checking your Stripe dashboard manually.",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                ),
              },
              {
                title: "Automatic Receipts",
                body: "Every customer gets a professional receipt the moment they pay. No manual follow-up, no forgetting. It just works.",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                ),
              },
              {
                title: "CRM Automation (GHL)",
                body: "Every payment triggers your GHL workflow. New paying clients get tagged, added to pipelines, and start your onboarding sequence — without you lifting a finger.",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
                ),
              },
              {
                title: "Ongoing Monitoring & Support",
                body: "We don't build it and disappear. We monitor your checkout, handle Stripe updates, fix issues, and keep everything running month over month.",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                ),
              },
            ].map((item, i) => (
              <RevealOnScroll key={i}>
                <div className="flex items-start gap-5 bg-surface border border-border rounded-[16px] p-6 max-md:p-5">
                  <div className="w-10 h-10 rounded-xl bg-accent-dim border border-accent-border flex items-center justify-center shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold mb-1.5 tracking-[-0.2px]">
                      {item.title}
                    </h3>
                    <p className="text-[14px] text-text-dim leading-[1.7]">
                      {item.body}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* THE MATH — ROI */}
      <section className="py-16 max-md:py-10 border-t border-border">
        <div className="max-w-[800px] mx-auto px-8 max-md:px-5 text-center">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
              The math
            </p>
            <h2 className="text-[clamp(24px,3.5vw,36px)] font-extrabold leading-[1.15] tracking-[-1px] mb-6">
              This pays for itself fast.
            </h2>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="bg-surface border border-border rounded-[20px] p-8 max-md:p-6 max-w-[600px] mx-auto">
              <div className="grid grid-cols-3 gap-4 mb-6 max-md:grid-cols-1 max-md:gap-3">
                <div className="text-center py-4 rounded-xl bg-white-6">
                  <div className="text-[28px] font-black text-accent">$149</div>
                  <div className="text-[11px] text-text-dim mt-1">
                    Avg package price
                  </div>
                </div>
                <div className="text-center py-4 rounded-xl bg-white-6">
                  <div className="text-[28px] font-black text-text">3</div>
                  <div className="text-[11px] text-text-dim mt-1">
                    Extra clients / month
                  </div>
                </div>
                <div className="text-center py-4 rounded-xl bg-white-6">
                  <div className="text-[28px] font-black text-accent">$447</div>
                  <div className="text-[11px] text-text-dim mt-1">
                    Extra monthly revenue
                  </div>
                </div>
              </div>
              <p className="text-[14px] text-text-mid leading-[1.7]">
                If the checkout converts just <span className="text-accent font-bold">3 extra
                clients per month</span> at your average package price, that&apos;s{" "}
                <span className="text-accent font-bold">$447/mo in new revenue</span> —
                more than covering your $350/mo investment. Everything above that
                is profit.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* PILOT PROGRAM TERMS */}
      <section className="py-20 max-md:py-14 border-t border-border">
        <div className="max-w-[700px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <div className="price-card-featured border rounded-[20px] p-10 max-md:p-7 text-center">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-6">
                Pilot Program — Limited Offer
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-baseline border-b border-border pb-4">
                  <span className="text-[15px] text-text-mid">Setup Fee</span>
                  <span className="text-[20px] font-bold text-text">
                    ${proposal.pilotTerms.setupFee.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-baseline border-b border-border pb-4">
                  <span className="text-[15px] text-text-mid">Monthly</span>
                  <span className="text-[20px] font-bold text-text">
                    ${proposal.pilotTerms.monthlyRate}/mo{" "}
                    <span className="text-sm text-text-dim font-normal">
                      for {proposal.pilotTerms.pilotMonths} months
                    </span>
                  </span>
                </div>
                <div className="flex justify-between items-baseline border-b border-border pb-4">
                  <span className="text-[15px] text-text-dim">
                    After Pilot
                  </span>
                  <span className="text-[17px] text-text-dim">
                    ${proposal.pilotTerms.standardRate.toLocaleString()}/mo{" "}
                    <span className="text-sm">(standard rate)</span>
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs font-bold tracking-[0.15em] uppercase text-text-dim mb-2">
                  Today&apos;s Total
                </p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-[clamp(40px,5vw,56px)] font-black tracking-[-2px] text-accent">
                    ${todayTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <p className="text-[13px] text-accent/80 font-semibold mb-4">
                You&apos;re saving ${((proposal.pilotTerms.standardRate - proposal.pilotTerms.monthlyRate) * proposal.pilotTerms.pilotMonths).toLocaleString()} over {proposal.pilotTerms.pilotMonths} months
                vs. our standard rate.
              </p>

              <p className="text-[13px] text-text-dim leading-[1.7] max-w-[480px] mx-auto">
                This is a {proposal.pilotTerms.pilotMonths}-month pilot at a
                reduced rate. After {proposal.pilotTerms.pilotMonths} months,
                your monthly rate transitions to $
                {proposal.pilotTerms.standardRate.toLocaleString()}/mo — our
                standard Tier 1 rate.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* STRIPE CHECKOUT or SUCCESS */}
      <section id="checkout" className="py-20 max-md:py-14 border-t border-border">
        <div className="max-w-[600px] mx-auto px-8 max-md:px-5">
          {paymentStatus === "success" ? (
            <ProposalSuccess proposal={proposal} />
          ) : (
            <>
              <RevealOnScroll>
                <div className="text-center mb-10">
                  <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
                    Ready to go
                  </p>
                  <h2 className="text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-3">
                    Let&apos;s get you paid faster.
                  </h2>
                  <p className="text-[15px] text-text-dim leading-[1.7] max-w-[460px] mx-auto">
                    Secure your pilot spot and we&apos;ll have your checkout
                    live within 48 hours.
                  </p>
                </div>
              </RevealOnScroll>
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

      {/* TIMELINE */}
      <section className="py-16 max-md:py-10 border-t border-border">
        <div className="max-w-[800px] mx-auto px-8 max-md:px-5 text-center">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
              Timeline
            </p>
            <h2 className="text-[clamp(24px,3.5vw,36px)] font-extrabold leading-[1.1] tracking-[-1px] mb-3">
              48 hours from go.
            </h2>
            <p className="text-[15px] text-text-dim leading-[1.7] max-w-[520px] mx-auto">
              Pay today, send us your Stripe keys, and your checkout goes live
              within two business days. That&apos;s how fast we move.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* NEXT STEPS */}
      <section className="py-20 max-md:py-14 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
              What happens next
            </p>
            <h2 className="text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-16">
              Your next steps.
            </h2>
          </RevealOnScroll>
          <div className="grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
            {proposal.nextSteps.map((step) => (
              <RevealOnScroll key={step.num}>
                <div className="bg-surface border border-border rounded-[20px] p-8 h-full">
                  <div className="text-[clamp(36px,4vw,48px)] font-black text-accent/20 leading-none mb-4">
                    {String(step.num).padStart(2, "0")}
                  </div>
                  <h3 className="text-[17px] font-bold mb-2.5 tracking-[-0.2px]">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-dim leading-[1.7]">
                    {step.body}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
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
