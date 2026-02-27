"use client";

import { useState, useCallback, useRef, useEffect } from "react";

interface Props {
  clientFirstName: string;
  clientBusinessName: string;
}

const packages = [
  { name: "Credit Starter", price: 99, tag: null },
  { name: "Credit Repair Pro", price: 149, tag: "Recommended" },
  { name: "Credit Premium", price: 249, tag: null },
];

export default function CheckoutFlowDemo({
  clientFirstName,
  clientBusinessName,
}: Props) {
  const [step, setStep] = useState(0);
  const [selectedPkg, setSelectedPkg] = useState(1); // default to Pro
  const [revenueCount, setRevenueCount] = useState(0);
  const [paymentCount, setPaymentCount] = useState(0);
  const [revenuePulse, setRevenuePulse] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const addTimer = useCallback((fn: () => void, ms: number) => {
    timersRef.current.push(setTimeout(fn, ms));
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  /* ---- Step handlers ---- */
  const handlePackageSelect = useCallback(
    (index: number) => {
      if (step !== 0) return;
      setSelectedPkg(index);
      setStep(1);
      // Auto-advance to checkout form
      addTimer(() => setStep(2), 600);
    },
    [step, addTimer]
  );

  const handlePay = useCallback(() => {
    if (step !== 2) return;
    setStep(3); // Processing
    addTimer(() => {
      setStep(4); // Confirmation
      setRevenuePulse(true);
      // Animate counter
      const price = packages[selectedPkg].price;
      const steps = 20;
      const interval = 1200 / steps;
      let s = 0;
      const timer = setInterval(() => {
        s++;
        setRevenueCount(Math.round(price * (s / steps)));
        setPaymentCount(Math.round(1 * (s / steps)));
        if (s >= steps) clearInterval(timer);
      }, interval);
      timersRef.current.push(timer as unknown as ReturnType<typeof setTimeout>);

      // Step 5: CRM notification
      addTimer(() => setStep(5), 1200);
      // Step 6: Finished
      addTimer(() => {
        setStep(6);
        setRevenuePulse(false);
      }, 2700);
    }, 1200);
  }, [step, selectedPkg, addTimer]);

  const handleReplay = useCallback(() => {
    clearTimers();
    setStep(0);
    setSelectedPkg(1);
    setRevenueCount(0);
    setPaymentCount(0);
    setRevenuePulse(false);
  }, [clearTimers]);

  const price = packages[selectedPkg].price;

  /* =============================================================
   *  PANEL 1 — Customer's Phone (260×540)
   * ============================================================= */
  const customerPhone = (
    <div className="flex flex-col items-center">
      <p className="text-[11px] font-bold text-text-dim uppercase tracking-widest mb-3">
        Your Customer
      </p>
      <div
        className="relative mx-auto shrink-0"
        style={{ width: 260, height: 540 }}
      >
        <div className="absolute inset-0 rounded-[36px] border-2 border-white-15 bg-[#0a0a0a] overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.5)]">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[24px] bg-[#0a0a0a] rounded-b-[12px] z-20" />
          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 h-[42px] flex items-end justify-between px-5 pb-1 z-10">
            <span className="text-[10px] text-white-25 font-semibold">
              9:41
            </span>
            <div className="w-[14px] h-[9px] rounded-sm border border-white-25 relative">
              <div className="absolute inset-[1.5px] right-[2px] bg-accent rounded-[1px]" />
            </div>
          </div>

          {/* Screen area */}
          <div className="absolute top-[42px] left-0 right-0 bottom-0 overflow-hidden">
            <div className="relative h-full w-full">
              {/* Screen 1: Package Selection */}
              <div
                className="absolute inset-0 flex flex-col px-4 pt-3 transition-all duration-400 ease-out"
                style={{
                  opacity: step <= 1 ? 1 : 0,
                  transform:
                    step <= 1 ? "translateX(0)" : "translateX(-100%)",
                  pointerEvents: step === 0 ? "auto" : "none",
                }}
              >
                <div
                  className="px-0 pt-2 pb-3"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(74,222,128,0.08) 0%, transparent 100%)",
                  }}
                >
                  <p className="text-[9px] text-accent font-bold tracking-widest uppercase mb-1">
                    {clientBusinessName}
                  </p>
                  <h3 className="text-[16px] font-extrabold text-text leading-[1.15] tracking-[-0.5px] mb-1">
                    Choose Your Plan
                  </h3>
                  <p className="text-[10px] text-text-dim leading-[1.5]">
                    Select a credit repair package.
                  </p>
                </div>

                <div className="flex flex-col gap-2.5 mt-3">
                  {packages.map((pkg, i) => (
                    <button
                      key={i}
                      onClick={() => handlePackageSelect(i)}
                      className={`relative text-left px-3.5 py-3 rounded-xl border text-[12px] font-medium transition-all duration-200 ${
                        step >= 1 && selectedPkg === i
                          ? "border-accent bg-accent-dim text-accent"
                          : "border-white-10 bg-white-6 text-text-mid hover:border-white-15"
                      }`}
                    >
                      {pkg.tag && (
                        <span className="absolute -top-2 right-3 text-[8px] font-bold bg-accent text-black px-1.5 py-0.5 rounded-full">
                          {pkg.tag}
                        </span>
                      )}
                      <span className="block font-bold text-[13px]">
                        {pkg.name}
                      </span>
                      <span className="text-[11px] opacity-70">
                        ${pkg.price}/mo
                      </span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 mt-4">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4ade80"
                    strokeWidth="2"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span className="text-[9px] text-text-dim">
                    Secured by Stripe
                  </span>
                </div>
              </div>

              {/* Screen 2: Checkout Form */}
              <div
                className="absolute inset-0 flex flex-col px-4 pt-3 transition-all duration-400 ease-out"
                style={{
                  opacity: step === 2 ? 1 : 0,
                  transform:
                    step < 2
                      ? "translateX(100%)"
                      : step === 2
                      ? "translateX(0)"
                      : "translateX(-100%)",
                  pointerEvents: step === 2 ? "auto" : "none",
                }}
              >
                <p className="text-[9px] text-accent font-bold tracking-widest uppercase mb-1.5">
                  Checkout
                </p>
                <h3 className="text-[14px] font-bold text-text leading-tight mb-3">
                  Payment Details
                </h3>

                <div className="flex flex-col gap-2">
                  <div className="px-3 py-2.5 rounded-xl border border-white-10 bg-white-6">
                    <p className="text-[9px] text-text-dim mb-0.5">
                      Card Number
                    </p>
                    <p className="text-[12px] text-text-mid font-mono">
                      4242 •••• •••• 4242
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 px-3 py-2.5 rounded-xl border border-white-10 bg-white-6">
                      <p className="text-[9px] text-text-dim mb-0.5">
                        Expiry
                      </p>
                      <p className="text-[12px] text-text-mid font-mono">
                        12/27
                      </p>
                    </div>
                    <div className="flex-1 px-3 py-2.5 rounded-xl border border-white-10 bg-white-6">
                      <p className="text-[9px] text-text-dim mb-0.5">CVC</p>
                      <p className="text-[12px] text-text-mid font-mono">
                        •••
                      </p>
                    </div>
                  </div>
                  <div className="px-3 py-2.5 rounded-xl border border-white-10 bg-white-6">
                    <p className="text-[9px] text-text-dim mb-0.5">
                      Cardholder Name
                    </p>
                    <p className="text-[12px] text-text-mid">Sarah Mitchell</p>
                  </div>
                </div>

                <button
                  onClick={handlePay}
                  className="mt-4 w-full bg-accent text-black font-bold text-[13px] py-3 rounded-xl transition-all duration-200 hover:brightness-110 shadow-[0_0_20px_rgba(74,222,128,0.2)]"
                >
                  Pay ${price}
                </button>

                <div className="flex items-center justify-center gap-1.5 mt-3">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4ade80"
                    strokeWidth="2"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span className="text-[9px] text-text-dim">
                    Secured by Stripe
                  </span>
                </div>
              </div>

              {/* Screen 3: Processing */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center px-4 transition-all duration-400 ease-out"
                style={{
                  opacity: step === 3 ? 1 : 0,
                  transform:
                    step < 3
                      ? "translateX(100%)"
                      : step === 3
                      ? "translateX(0)"
                      : "translateX(-100%)",
                  pointerEvents: "none",
                }}
              >
                <div className="w-10 h-10 border-2 border-accent/30 border-t-accent rounded-full animate-spin mb-4" />
                <p className="text-[13px] font-semibold text-text">
                  Processing payment...
                </p>
                <p className="text-[10px] text-text-dim mt-1">
                  Please wait
                </p>
              </div>

              {/* Screen 4: Confirmation */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center px-4 transition-all duration-400 ease-out"
                style={{
                  opacity: step >= 4 ? 1 : 0,
                  transform:
                    step < 4 ? "translateX(100%)" : "translateX(0)",
                  pointerEvents: "none",
                }}
              >
                <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                  {step >= 4 && (
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#4ade80"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline
                        points="20 6 9 17 4 12"
                        className="checkout-check-draw"
                      />
                    </svg>
                  )}
                </div>
                <p className="text-[16px] font-bold text-text mb-1">
                  Payment Successful!
                </p>
                <p className="text-[11px] text-text-dim text-center leading-[1.6]">
                  ${price} charged to •••• 4242
                  <br />
                  Receipt sent to sarah@email.com
                </p>
                <div className="mt-5 w-full rounded-xl border border-white-10 bg-white-6 p-3">
                  <div className="flex justify-between text-[10px] mb-1.5">
                    <span className="text-text-dim">Package</span>
                    <span className="text-text font-semibold">
                      {packages[selectedPkg].name}
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] mb-1.5">
                    <span className="text-text-dim">Amount</span>
                    <span className="text-text font-semibold">
                      ${price}/mo
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-text-dim">Status</span>
                    <span className="text-accent font-semibold">Paid</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /* =============================================================
   *  PANEL 2 — Bria's Phone (220×440)
   * ============================================================= */
  const ownerPhone = (
    <div className="flex flex-col items-center">
      <p className="text-[11px] font-bold text-text-dim uppercase tracking-widest mb-3">
        {clientFirstName}&apos;s Phone
      </p>
      <div
        className={`relative mx-auto ${step === 4 ? "phone-vibrate" : ""}`}
        style={{ width: 220, height: 440 }}
      >
        <div className="absolute inset-0 rounded-[30px] border-2 border-white-15 bg-[#0a0a0a] overflow-hidden">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90px] h-[22px] bg-[#0a0a0a] rounded-b-[11px] z-20" />

          {/* Lock screen */}
          <div className="absolute inset-0 flex flex-col items-center justify-start pt-14 px-4">
            <p className="text-[32px] font-thin text-text tracking-tight">
              9:41
            </p>
            <p className="text-[11px] text-text-dim mt-1">
              Wednesday, February 26
            </p>
          </div>

          {/* Payment notification */}
          <div
            className={`absolute top-10 left-3 right-3 z-10 rounded-2xl bg-[#1c1c1e] border border-accent/20 p-3 transition-all duration-500 ${
              step >= 4
                ? "opacity-100 translate-y-0 phone-notification-slide"
                : "opacity-0 -translate-y-full"
            }`}
          >
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth="2"
                >
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-bold text-text">
                  New Payment: ${price}
                </p>
                <p className="text-[10px] text-accent">
                  from Sarah M. · Just now
                </p>
              </div>
            </div>
          </div>

          {/* CRM automation notification */}
          <div
            className={`absolute top-[115px] left-3 right-3 z-10 rounded-2xl bg-[#1c1c1e] border border-white-15 p-3 transition-all duration-500 ${
              step >= 5
                ? "opacity-100 translate-y-0 phone-notification-slide"
                : "opacity-0 -translate-y-4"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-dim flex items-center justify-center">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-bold text-text">
                  CRM Automation
                </p>
                <p className="text-[9px] text-text-dim">
                  Sarah M. added to onboarding workflow
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /* =============================================================
   *  PANEL 3 — Mini Dashboard
   * ============================================================= */
  const dashboard = (
    <div className="flex flex-col items-center">
      <p className="text-[11px] font-bold text-text-dim uppercase tracking-widest mb-3">
        Your Dashboard
      </p>
      <div className="w-full max-w-[320px] bg-surface border border-border rounded-2xl p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-[13px] font-bold text-text">
            {clientBusinessName}
          </p>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[9px] text-accent font-semibold">Live</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <div className="text-center py-3 rounded-xl bg-white-6">
            <div className="text-[10px] text-text-dim mb-1">Payments</div>
            <div className="text-[22px] font-black text-text">
              {paymentCount}
            </div>
          </div>
          <div className="text-center py-3 rounded-xl bg-white-6">
            <div className="text-[10px] text-text-dim mb-1">Revenue</div>
            <div
              className={`text-[22px] font-black text-accent ${
                revenuePulse ? "revenue-pulse" : ""
              }`}
            >
              ${revenueCount}
            </div>
          </div>
        </div>

        {/* Recent activity */}
        <p className="text-[10px] font-bold text-text-dim uppercase tracking-widest mb-2.5">
          Recent Activity
        </p>
        <div className="flex flex-col gap-2">
          {/* Payment row */}
          <div
            className="flex items-center justify-between py-2 px-3 rounded-lg bg-white-6"
            style={{
              opacity: step >= 4 ? 1 : 0,
              transform:
                step >= 4 ? "translateX(0)" : "translateX(-20px)",
              transition: "all 0.5s ease 200ms",
            }}
          >
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth="2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-text">
                  Sarah M.
                </p>
                <p className="text-[9px] text-text-dim">Payment received</p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-accent">
              +${price}
            </span>
          </div>

          {/* CRM row */}
          <div
            className="flex items-center justify-between py-2 px-3 rounded-lg bg-white-6"
            style={{
              opacity: step >= 5 ? 1 : 0,
              transform:
                step >= 5 ? "translateX(0)" : "translateX(-20px)",
              transition: "all 0.5s ease 400ms",
            }}
          >
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-blue-dim flex items-center justify-center">
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth="2.5"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-text">
                  Sarah M.
                </p>
                <p className="text-[9px] text-text-dim">
                  Added to onboarding
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-blue">Auto</span>
          </div>

          {/* Empty state rows */}
          {step < 4 && (
            <>
              <div className="py-2.5 px-3 rounded-lg bg-white-6 flex items-center justify-center">
                <span className="text-[10px] text-text-dim">
                  Waiting for first payment...
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  /* =============================================================
   *  RENDER
   * ============================================================= */
  return (
    <section className="py-20 max-md:py-14 border-t border-border">
      <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
        {/* Section header */}
        <div className="mb-14">
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
            How it works
          </p>
          <h2 className="text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
            What your customers will experience.
          </h2>
          <p className="text-[17px] text-text-dim leading-[1.7] max-w-[540px] mb-4">
            A seamless payment flow built into your website. No redirects, no
            friction — and you see everything in real time.
          </p>
          <p className="text-[14px] text-text-mid font-semibold flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
            Tap through the demo below
          </p>
        </div>

        {/* 3-panel grid */}
        <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-1 items-start">
          <div className="flex justify-center">{customerPhone}</div>
          <div className="flex justify-center">{ownerPhone}</div>
          <div className="flex justify-center">{dashboard}</div>
        </div>

        {/* Finished state */}
        {step >= 6 && (
          <div className="flex flex-col items-center mt-10 gap-3">
            <p className="text-[15px] font-semibold text-accent text-center">
              All of this. Automated. Every time.
            </p>
            <button
              onClick={handleReplay}
              className="text-[13px] font-semibold text-text-dim hover:text-text transition-colors"
            >
              ↺ Replay Demo
            </button>
          </div>
        )}

        {/* Deliverable pills */}
        <div className="flex flex-wrap justify-center gap-2.5 mt-12">
          {[
            "Embedded Checkout",
            "Mobile Optimized",
            "Instant Notifications",
            "Auto Receipts",
            "CRM Automation",
            "Ongoing Support",
          ].map((item) => (
            <span
              key={item}
              className="text-[12px] font-medium text-text-mid bg-white-6 border border-white-10 rounded-full px-4 py-1.5"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
