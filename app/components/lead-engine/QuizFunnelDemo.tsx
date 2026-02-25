"use client";

import { useState, useCallback } from "react";
import type { NicheData } from "@/app/data/niches";
import RevealOnScroll from "@/app/components/RevealOnScroll";

interface Props {
  niche: NicheData;
  compact?: boolean;
}

export default function QuizFunnelDemo({ niche, compact = false }: Props) {
  const funnelScreens = 2;
  const totalSteps = funnelScreens + niche.quizSteps.length + 2;
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [showSms, setShowSms] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleOptionTap = useCallback(
    (optionIndex: number) => {
      if (selectedOption !== null) return;
      setSelectedOption(optionIndex);
      setTimeout(() => {
        setSelectedOption(null);
        setCurrentStep((s) => s + 1);
      }, 400);
    },
    [selectedOption]
  );

  const handleSubmit = useCallback(() => {
    setCurrentStep(funnelScreens + niche.quizSteps.length + 1);
    setShowNotification(true);
    setTimeout(() => setShowSms(true), 1500);
    setTimeout(() => setFinished(true), 3000);
  }, [niche.quizSteps.length]);

  const handleReplay = useCallback(() => {
    setCurrentStep(0);
    setSelectedOption(null);
    setShowNotification(false);
    setShowSms(false);
    setFinished(false);
  }, []);

  const nicheLabel = niche.service_name
    .replace(/ Lead Engine/i, "")
    .replace(/ Patient Engine/i, "");

  const onFunnelPage = currentStep < funnelScreens;
  const quizIndex = currentStep - funnelScreens;
  const contactStep = funnelScreens + niche.quizSteps.length;
  const confirmStep = contactStep + 1;

  /* ============================================================
   *  PHONE MOCKUP
   * ============================================================ */
  const phone = (
    <div className="relative mx-auto shrink-0" style={{ width: 260, height: 540 }}>
      <div className="absolute inset-0 rounded-[36px] border-2 border-white-15 bg-[#0a0a0a] overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.5)]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[24px] bg-[#0a0a0a] rounded-b-[12px] z-20" />
        <div className="absolute top-0 left-0 right-0 h-[42px] flex items-end justify-between px-5 pb-1 z-10">
          <span className="text-[10px] text-white-25 font-semibold">9:41</span>
          <div className="w-[14px] h-[9px] rounded-sm border border-white-25 relative">
            <div className="absolute inset-[1.5px] right-[2px] bg-accent rounded-[1px]" />
          </div>
        </div>

        <div className="absolute top-[42px] left-0 right-0 bottom-0 overflow-hidden">
          {/* Progress bar */}
          <div
            className="flex items-center justify-center gap-1.5 pt-3 pb-2 transition-all duration-400"
            style={{ opacity: onFunnelPage ? 0 : 1, height: onFunnelPage ? 0 : "auto" }}
          >
            {Array.from({ length: niche.quizSteps.length + 1 }).map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i < quizIndex ? "bg-accent w-5" : i === quizIndex ? "bg-accent w-7" : "bg-white-10 w-5"
                }`}
              />
            ))}
          </div>

          {/* Sliding screens */}
          <div className="relative h-[calc(100%-8px)]">
            <div
              className="absolute inset-0 flex transition-transform duration-400 ease-out"
              style={{
                transform: `translateX(-${currentStep * (100 / totalSteps)}%)`,
                width: `${totalSteps * 100}%`,
              }}
            >
              {/* PHONE: Landing */}
              <div className="flex flex-col" style={{ width: `${100 / totalSteps}%` }}>
                <div className="relative px-4 pt-4 pb-3" style={{ background: "linear-gradient(180deg, rgba(74,222,128,0.12) 0%, transparent 100%)" }}>
                  <p className="text-[9px] text-accent font-bold tracking-widest uppercase mb-1.5">
                    {nicheLabel} Pros
                  </p>
                  <h3 className="text-[18px] font-extrabold text-text leading-[1.15] tracking-[-0.5px] mb-1.5">
                    Get Your Free<br />{nicheLabel} Estimate
                  </h3>
                  <p className="text-[10px] text-text-dim leading-[1.5]">
                    See pricing in 60 seconds.
                  </p>
                </div>
                <div className="px-4 pt-3 flex flex-col flex-1">
                  <div className="flex flex-col gap-2 mb-4">
                    {[
                      { icon: "⚡", text: "Instant pricing" },
                      { icon: "📱", text: "Works on any device" },
                      { icon: "🔒", text: "Your info stays private" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-[11px]">{item.icon}</span>
                        <span className="text-[11px] text-text-mid font-medium">{item.text}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 mb-4">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map((i) => (
                        <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="#4ade80">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-[9px] text-text-dim"><span className="text-text font-semibold">4.9</span> · 200+ reviews</span>
                  </div>
                  <button
                    onClick={() => currentStep === 0 ? setCurrentStep(1) : undefined}
                    className="w-full bg-accent text-black font-bold text-[13px] py-3 rounded-xl transition-all duration-200 hover:brightness-110 shadow-[0_0_20px_rgba(74,222,128,0.2)]"
                  >
                    Get My Free Estimate →
                  </button>
                  <p className="text-[8px] text-text-dim text-center mt-2">Free · 60 seconds · No obligation</p>
                </div>
              </div>

              {/* PHONE: Benefits */}
              <div className="flex flex-col px-4 pt-3" style={{ width: `${100 / totalSteps}%` }}>
                <p className="text-[9px] text-accent font-bold tracking-widest uppercase mb-2">How it works</p>
                <h3 className="text-[15px] font-bold text-text leading-tight mb-4 tracking-[-0.3px]">
                  Your estimate in<br />3 simple steps
                </h3>
                <div className="flex flex-col gap-3 mb-5">
                  {[
                    { num: "1", title: "Quick questions", desc: "60 seconds" },
                    { num: "2", title: "Instant match", desc: "Best local pro" },
                    { num: "3", title: "Free estimate", desc: "No strings attached" },
                  ].map((s) => (
                    <div key={s.num} className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-accent/15 border border-accent/20 flex items-center justify-center text-[11px] font-black text-accent shrink-0">{s.num}</div>
                      <div>
                        <p className="text-[11px] font-bold text-text leading-tight">{s.title}</p>
                        <p className="text-[9px] text-text-dim">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg bg-accent/[0.06] border border-accent/10 px-3 py-2 mb-4">
                  <p className="text-[9px] text-text-mid"><span className="text-accent font-bold">12 homeowners</span> requested estimates this week</p>
                </div>
                <button
                  onClick={() => currentStep === 1 ? setCurrentStep(2) : undefined}
                  className="w-full bg-accent text-black font-bold text-[13px] py-3 rounded-xl transition-all duration-200 hover:brightness-110"
                >
                  Let&apos;s Go →
                </button>
              </div>

              {/* PHONE: Quiz steps */}
              {niche.quizSteps.map((step, stepIndex) => (
                <div key={stepIndex} className="flex flex-col px-4 pt-3" style={{ width: `${100 / totalSteps}%` }}>
                  <p className="text-[9px] text-accent font-bold tracking-widest uppercase mb-1.5">
                    Question {stepIndex + 1} of {niche.quizSteps.length}
                  </p>
                  <h3 className="text-[14px] font-bold text-text leading-tight mb-4">{step.question}</h3>
                  <div className="flex flex-col gap-2">
                    {step.options.map((option, optIndex) => (
                      <button
                        key={optIndex}
                        onClick={() => currentStep === stepIndex + funnelScreens ? handleOptionTap(optIndex) : undefined}
                        className={`text-left px-3 py-3 rounded-xl border text-[12px] font-medium transition-all duration-200 ${
                          currentStep === stepIndex + funnelScreens && selectedOption === optIndex
                            ? "border-accent bg-accent-dim text-accent"
                            : "border-white-10 bg-white-6 text-text-mid hover:border-white-15"
                        }`}
                      >
                        {option.emoji && <span className="mr-1.5">{option.emoji}</span>}
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* PHONE: Contact form */}
              <div className="flex flex-col px-4 pt-3" style={{ width: `${100 / totalSteps}%` }}>
                <p className="text-[9px] text-accent font-bold tracking-widest uppercase mb-1.5">Almost done</p>
                <h3 className="text-[14px] font-bold text-text leading-tight mb-1">Where should we send your estimate?</h3>
                <p className="text-[9px] text-text-dim mb-3">No spam — just your free quote.</p>
                <div className="flex flex-col gap-2">
                  <div className="px-3 py-2.5 rounded-xl border border-white-10 bg-white-6 text-[12px] text-text-mid">John Smith</div>
                  <div className="px-3 py-2.5 rounded-xl border border-white-10 bg-white-6 text-[12px] text-text-mid">(214) 555-0193</div>
                  <div className="px-3 py-2.5 rounded-xl border border-white-10 bg-white-6 text-[12px] text-text-mid">john@email.com</div>
                  <button
                    onClick={() => currentStep === contactStep ? handleSubmit() : undefined}
                    className="mt-1 bg-accent text-black font-bold text-[12px] py-3 rounded-xl transition-all duration-200 hover:brightness-110"
                  >
                    Get My Free Estimate
                  </button>
                </div>
              </div>

              {/* PHONE: Confirmation */}
              <div className="flex flex-col items-center justify-start pt-6 px-4 relative" style={{ width: `${100 / totalSteps}%` }}>
                <div className="absolute inset-0 bg-black/60 z-0" />
                <div className={`relative z-10 w-full rounded-2xl bg-[#1c1c1e] border border-accent/20 p-3 mb-2 text-center transition-all ${showNotification ? "phone-notification-slide" : "opacity-0 -translate-y-full"}`}>
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-1.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <p className="text-[11px] font-bold text-text">Estimate received</p>
                  <p className="text-[9px] text-text-dim">Calling you now...</p>
                </div>
                <div className={`relative z-10 w-full rounded-2xl bg-[#1c1c1e] border border-white-15 p-3 mb-2 transition-all ${showNotification ? "phone-notification-slide" : "opacity-0 -translate-y-full"}`} style={{ transitionDelay: showNotification ? "400ms" : "0ms" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center phone-ring-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-[11px] font-bold text-text">Incoming Call</p>
                      <p className="text-[10px] text-accent">{niche.demoNotification}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 py-1.5 rounded-lg bg-red/20 text-center text-[10px] font-semibold text-red">Decline</div>
                    <div className="flex-1 py-1.5 rounded-lg bg-accent/20 text-center text-[10px] font-semibold text-accent">Accept</div>
                  </div>
                </div>
                <div className={`relative z-10 w-full rounded-2xl bg-[#1c1c1e] border border-white-15 p-3 transition-all ${showSms ? "phone-notification-slide" : "opacity-0 -translate-y-4"}`}>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-text">SMS Follow-up</p>
                      <p className="text-[9px] text-text-dim">&quot;Hi John, your estimate is ready...&quot;</p>
                    </div>
                  </div>
                </div>
                {finished && (
                  <div className="relative z-10 mt-4 flex flex-col items-center gap-1.5">
                    <p className="text-[10px] text-accent font-semibold">All within 60 seconds.</p>
                    <button onClick={handleReplay} className="text-[11px] font-semibold text-text-dim hover:text-text transition-colors">↺ Replay</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /* ============================================================
   *  DESKTOP BROWSER MOCKUP — mirrors currentStep
   * ============================================================ */
  const desktop = (
    <div className="relative w-full" style={{ maxWidth: 520 }}>
      {/* Browser chrome */}
      <div className="rounded-t-xl bg-[#1a1a1a] border border-white-10 border-b-0 px-4 py-2.5 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 bg-white-6 rounded-md px-3 py-1 text-[10px] text-text-dim font-mono truncate">
          get-estimate.{nicheLabel.toLowerCase().replace(/\s+/g, "")}-pros.com
        </div>
      </div>

      {/* Browser content */}
      <div className="rounded-b-xl border border-white-10 bg-[#0a0a0a] overflow-hidden" style={{ height: 380 }}>
        <div className="h-full overflow-hidden relative">

          {/* Landing */}
          <div
            className="absolute inset-0 flex transition-all duration-400 ease-out"
            style={{ opacity: currentStep === 0 ? 1 : 0, transform: currentStep === 0 ? "translateY(0)" : "translateY(-20px)", pointerEvents: currentStep === 0 ? "auto" : "none" }}
          >
            <div className="flex-1 p-8 flex flex-col justify-center" style={{ background: "linear-gradient(135deg, rgba(74,222,128,0.08) 0%, transparent 60%)" }}>
              <p className="text-[10px] text-accent font-bold tracking-widest uppercase mb-2">{nicheLabel} Pros · Your Area</p>
              <h3 className="text-[24px] font-extrabold text-text leading-[1.15] tracking-[-0.5px] mb-3">
                Get Your Free<br />{nicheLabel} Estimate
              </h3>
              <p className="text-[12px] text-text-dim leading-[1.6] mb-4 max-w-[240px]">
                See pricing in 60 seconds. No phone calls, no pressure. Answer a few quick questions.
              </p>
              <div className="flex items-center gap-1.5 mb-5">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((i) => (
                    <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="#4ade80"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                  ))}
                </div>
                <span className="text-[9px] text-text-dim"><span className="text-text font-semibold">4.9</span> · 200+ reviews</span>
              </div>
              <button
                onClick={() => currentStep === 0 ? setCurrentStep(1) : undefined}
                className="w-fit bg-accent text-black font-bold text-[13px] px-6 py-3 rounded-xl transition-all duration-200 hover:brightness-110 shadow-[0_0_24px_rgba(74,222,128,0.2)]"
              >
                Get My Free Estimate →
              </button>
            </div>
            {/* Right side visual */}
            <div className="w-[180px] shrink-0 flex items-center justify-center border-l border-white-6">
              <div className="flex flex-col items-center gap-3 text-center px-4">
                {[
                  { icon: "⚡", text: "Instant pricing" },
                  { icon: "✓", text: "Licensed & insured" },
                  { icon: "📞", text: "Call within 60s" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-[12px] text-accent">{item.icon}</span>
                    <span className="text-[10px] text-text-mid font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div
            className="absolute inset-0 flex transition-all duration-400 ease-out"
            style={{ opacity: currentStep === 1 ? 1 : 0, transform: currentStep === 1 ? "translateY(0)" : "translateY(20px)", pointerEvents: currentStep === 1 ? "auto" : "none" }}
          >
            <div className="flex-1 p-8 flex flex-col justify-center">
              <p className="text-[10px] text-accent font-bold tracking-widest uppercase mb-2">How it works</p>
              <h3 className="text-[20px] font-extrabold text-text leading-tight tracking-[-0.5px] mb-6">Your estimate in 3 simple steps</h3>
              <div className="flex gap-5 mb-6">
                {[
                  { num: "1", title: "Quick questions", desc: "Tell us what you need" },
                  { num: "2", title: "Instant match", desc: "Best local pro" },
                  { num: "3", title: "Free estimate", desc: "No strings attached" },
                ].map((s) => (
                  <div key={s.num} className="flex-1">
                    <div className="w-8 h-8 rounded-full bg-accent/15 border border-accent/20 flex items-center justify-center text-[12px] font-black text-accent mb-2">{s.num}</div>
                    <p className="text-[11px] font-bold text-text">{s.title}</p>
                    <p className="text-[9px] text-text-dim">{s.desc}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-lg bg-accent/[0.06] border border-accent/10 px-3 py-2 mb-5 w-fit">
                <p className="text-[10px] text-text-mid"><span className="text-accent font-bold">12 homeowners</span> requested estimates this week</p>
              </div>
              <button
                onClick={() => currentStep === 1 ? setCurrentStep(2) : undefined}
                className="w-fit bg-accent text-black font-bold text-[13px] px-6 py-3 rounded-xl transition-all duration-200 hover:brightness-110"
              >
                Let&apos;s Go →
              </button>
            </div>
          </div>

          {/* Quiz steps */}
          {niche.quizSteps.map((step, stepIndex) => {
            const stepNum = stepIndex + funnelScreens;
            return (
              <div
                key={stepIndex}
                className="absolute inset-0 flex flex-col items-center justify-center p-8 transition-all duration-400 ease-out"
                style={{ opacity: currentStep === stepNum ? 1 : 0, transform: currentStep === stepNum ? "translateY(0)" : "translateY(20px)", pointerEvents: currentStep === stepNum ? "auto" : "none" }}
              >
                {/* Progress bar */}
                <div className="flex items-center gap-1.5 mb-5">
                  {Array.from({ length: niche.quizSteps.length }).map((_, i) => (
                    <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i <= stepIndex ? "bg-accent w-10" : "bg-white-10 w-10"}`} />
                  ))}
                </div>
                <p className="text-[10px] text-accent font-bold tracking-widest uppercase mb-2">Question {stepIndex + 1} of {niche.quizSteps.length}</p>
                <h3 className="text-[18px] font-bold text-text leading-tight mb-5 text-center">{step.question}</h3>
                <div className="grid grid-cols-2 gap-2.5 w-full max-w-[380px]">
                  {step.options.map((option, optIndex) => (
                    <button
                      key={optIndex}
                      onClick={() => currentStep === stepNum ? handleOptionTap(optIndex) : undefined}
                      className={`text-left px-4 py-3.5 rounded-xl border text-[13px] font-medium transition-all duration-200 ${
                        currentStep === stepNum && selectedOption === optIndex
                          ? "border-accent bg-accent-dim text-accent"
                          : "border-white-10 bg-white-6 text-text-mid hover:border-white-15"
                      }`}
                    >
                      {option.emoji && <span className="mr-1.5">{option.emoji}</span>}
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Contact form */}
          <div
            className="absolute inset-0 flex items-center justify-center p-8 transition-all duration-400 ease-out"
            style={{ opacity: currentStep === contactStep ? 1 : 0, transform: currentStep === contactStep ? "translateY(0)" : "translateY(20px)", pointerEvents: currentStep === contactStep ? "auto" : "none" }}
          >
            <div className="w-full max-w-[340px]">
              <p className="text-[10px] text-accent font-bold tracking-widest uppercase mb-2 text-center">Almost done</p>
              <h3 className="text-[18px] font-bold text-text leading-tight mb-1 text-center">Where should we send your estimate?</h3>
              <p className="text-[10px] text-text-dim mb-5 text-center">No spam — just your free quote.</p>
              <div className="grid grid-cols-2 gap-2.5 mb-2.5">
                <div className="px-3 py-2.5 rounded-xl border border-white-10 bg-white-6 text-[12px] text-text-mid">John Smith</div>
                <div className="px-3 py-2.5 rounded-xl border border-white-10 bg-white-6 text-[12px] text-text-mid">(214) 555-0193</div>
              </div>
              <div className="px-3 py-2.5 rounded-xl border border-white-10 bg-white-6 text-[12px] text-text-mid mb-3">john@email.com</div>
              <button
                onClick={() => currentStep === contactStep ? handleSubmit() : undefined}
                className="w-full bg-accent text-black font-bold text-[13px] py-3 rounded-xl transition-all duration-200 hover:brightness-110"
              >
                Get My Free Estimate
              </button>
            </div>
          </div>

          {/* Confirmation */}
          <div
            className="absolute inset-0 flex items-center justify-center p-8 transition-all duration-400 ease-out"
            style={{ opacity: currentStep === confirmStep ? 1 : 0, pointerEvents: currentStep === confirmStep ? "auto" : "none" }}
          >
            <div className="absolute inset-0 bg-black/40 z-0" />
            <div className="relative z-10 flex flex-col items-center gap-4 w-full max-w-[380px]">
              <div className={`w-full rounded-2xl bg-[#1c1c1e] border border-accent/20 p-5 text-center transition-all ${showNotification ? "phone-notification-slide" : "opacity-0 -translate-y-full"}`}>
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-2">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <p className="text-[14px] font-bold text-text mb-0.5">Estimate request received</p>
                <p className="text-[11px] text-text-dim">A local pro is calling you now...</p>
              </div>
              <div className="flex gap-3 w-full">
                <div className={`flex-1 rounded-2xl bg-[#1c1c1e] border border-white-15 p-4 transition-all ${showNotification ? "phone-notification-slide" : "opacity-0 -translate-y-4"}`} style={{ transitionDelay: showNotification ? "400ms" : "0ms" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center phone-ring-icon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-text">Incoming Call</p>
                      <p className="text-[10px] text-accent">{niche.demoNotification}</p>
                    </div>
                  </div>
                </div>
                <div className={`flex-1 rounded-2xl bg-[#1c1c1e] border border-white-15 p-4 transition-all ${showSms ? "phone-notification-slide" : "opacity-0 -translate-y-4"}`}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-text">SMS Sent</p>
                      <p className="text-[9px] text-text-dim">&quot;Hi John...&quot;</p>
                    </div>
                  </div>
                </div>
              </div>
              {finished && (
                <div className="flex flex-col items-center gap-1.5 mt-2">
                  <p className="text-[11px] text-accent font-semibold">All within 60 seconds.</p>
                  <button onClick={handleReplay} className="text-[12px] font-semibold text-text-dim hover:text-text transition-colors">↺ Replay Demo</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /* ============================================================
   *  LAYOUTS
   * ============================================================ */

  if (compact) {
    return (
      <section className="py-20 max-md:py-14">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <p className="text-center text-xs font-bold tracking-[0.15em] uppercase text-accent mb-3">
              See what your customers experience
            </p>
            <p className="text-center text-[15px] text-text-mid font-semibold flex items-center justify-center gap-2 mb-10">
              <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
              Tap through the live demo
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="flex items-center justify-center gap-8 max-lg:flex-col max-lg:gap-6">
              <div className="shrink-0">{phone}</div>
              <div className="hidden md:block flex-1 max-w-[520px]">{desktop}</div>
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="text-center mt-10">
              <a
                href="#apply"
                className="btn-primary-hover inline-flex items-center gap-2.5 bg-accent text-black px-8 py-3.5 rounded-full text-[14px] font-bold no-underline transition-all duration-300"
              >
                Get this system for your business
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    );
  }

  return (
    <section className="py-30 max-md:py-20">
      <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
        <div className="text-center mb-14">
          <RevealOnScroll>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
              See it in action
            </p>
            <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
              This is what your<br />customers experience.
            </h2>
            <p className="text-[17px] text-text-dim leading-[1.7] max-w-[540px] mx-auto">
              A complete lead funnel — from first click to your phone ringing. Landing page, qualifier, instant call trigger, and automated follow-up.
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <p className="text-[14px] text-text-mid font-semibold flex items-center justify-center gap-2 mt-4">
              <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
              Tap through the demo on either device
            </p>
          </RevealOnScroll>
        </div>
        <RevealOnScroll>
          <div className="flex items-center justify-center gap-10 max-lg:flex-col max-lg:gap-8">
            <div className="shrink-0">{phone}</div>
            <div className="hidden md:block flex-1 max-w-[520px]">{desktop}</div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
