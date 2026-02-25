"use client";

import { useState, useCallback } from "react";
import type { NicheData } from "@/app/data/niches";
import RevealOnScroll from "@/app/components/RevealOnScroll";

interface Props {
  niche: NicheData;
  compact?: boolean;
}

export default function QuizFunnelDemo({ niche, compact = false }: Props) {
  const totalSteps = niche.quizSteps.length + 2; // quiz steps + contact + notification
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
    setCurrentStep(niche.quizSteps.length + 1);
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

  const phoneScale = compact ? "scale-[0.85]" : "";

  const phone = (
    <div className={`relative mx-auto ${phoneScale}`} style={{ width: 300, height: 620 }}>
      {/* Phone frame */}
      <div className="absolute inset-0 rounded-[40px] border-2 border-white-15 bg-[#0a0a0a] overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.5)]">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-[#0a0a0a] rounded-b-[14px] z-20" />
        {/* Status bar */}
        <div className="absolute top-0 left-0 right-0 h-[48px] flex items-end justify-between px-6 pb-1 z-10">
          <span className="text-[11px] text-white-25 font-semibold">9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-[16px] h-[10px] rounded-sm border border-white-25 relative">
              <div className="absolute inset-[1.5px] right-[2px] bg-accent rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="absolute top-[48px] left-0 right-0 bottom-0 overflow-hidden">
          {/* Progress dots */}
          <div className="flex items-center justify-center gap-2 pt-4 pb-3">
            {Array.from({ length: niche.quizSteps.length + 1 }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i < currentStep
                    ? "bg-accent"
                    : i === currentStep
                    ? "bg-accent w-5"
                    : "bg-white-10"
                }`}
              />
            ))}
          </div>

          {/* Sliding screens container */}
          <div className="relative h-[calc(100%-40px)]">
            <div
              className="absolute inset-0 flex transition-transform duration-400 ease-out"
              style={{ transform: `translateX(-${currentStep * 100}%)`, width: `${totalSteps * 100}%` }}
            >
              {/* Quiz step screens */}
              {niche.quizSteps.map((step, stepIndex) => (
                <div
                  key={stepIndex}
                  className="flex flex-col px-5 pt-4"
                  style={{ width: `${100 / totalSteps}%` }}
                >
                  <p className="text-[10px] text-accent font-bold tracking-widest uppercase mb-2">
                    {niche.quizHeadline}
                  </p>
                  <h3 className="text-[16px] font-bold text-text leading-tight mb-5">
                    {step.question}
                  </h3>
                  <div className="flex flex-col gap-2.5">
                    {step.options.map((option, optIndex) => (
                      <button
                        key={optIndex}
                        onClick={() =>
                          currentStep === stepIndex
                            ? handleOptionTap(optIndex)
                            : undefined
                        }
                        className={`text-left px-4 py-3.5 rounded-xl border text-[14px] font-medium transition-all duration-200 ${
                          currentStep === stepIndex && selectedOption === optIndex
                            ? "border-accent bg-accent-dim text-accent"
                            : "border-white-10 bg-white-6 text-text-mid hover:border-white-15"
                        }`}
                      >
                        {option.emoji && (
                          <span className="mr-2">{option.emoji}</span>
                        )}
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Contact form screen (pre-filled mockup) */}
              <div
                className="flex flex-col px-5 pt-4"
                style={{ width: `${100 / totalSteps}%` }}
              >
                <p className="text-[10px] text-accent font-bold tracking-widest uppercase mb-2">
                  Almost done
                </p>
                <h3 className="text-[16px] font-bold text-text leading-tight mb-5">
                  Enter your info for a free estimate
                </h3>
                <div className="flex flex-col gap-3">
                  <div className="px-4 py-3 rounded-xl border border-white-10 bg-white-6 text-[14px] text-text-mid">
                    John Smith
                  </div>
                  <div className="px-4 py-3 rounded-xl border border-white-10 bg-white-6 text-[14px] text-text-mid">
                    (214) 555-0193
                  </div>
                  <div className="px-4 py-3 rounded-xl border border-white-10 bg-white-6 text-[14px] text-text-mid">
                    john@email.com
                  </div>
                  <button
                    onClick={() =>
                      currentStep === niche.quizSteps.length
                        ? handleSubmit()
                        : undefined
                    }
                    className="mt-2 bg-accent text-black font-bold text-[14px] py-3.5 rounded-xl transition-all duration-200 hover:brightness-110"
                  >
                    Get My Free Estimate
                  </button>
                </div>
              </div>

              {/* Notification screen */}
              <div
                className="flex flex-col items-center justify-start pt-12 px-5 relative"
                style={{ width: `${100 / totalSteps}%` }}
              >
                {/* Dimmed overlay */}
                <div className="absolute inset-0 bg-black/60 z-0" />

                {/* Incoming call notification */}
                <div
                  className={`relative z-10 w-full rounded-2xl bg-[#1c1c1e] border border-white-15 p-4 mb-3 transition-all ${
                    showNotification
                      ? "phone-notification-slide"
                      : "opacity-0 -translate-y-full"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center phone-ring-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-[13px] font-bold text-text">Incoming Call</p>
                      <p className="text-[12px] text-accent">{niche.demoNotification}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 py-2 rounded-lg bg-red/20 text-center text-[12px] font-semibold text-red">
                      Decline
                    </div>
                    <div className="flex-1 py-2 rounded-lg bg-accent/20 text-center text-[12px] font-semibold text-accent">
                      Accept
                    </div>
                  </div>
                </div>

                {/* SMS notification */}
                <div
                  className={`relative z-10 w-full rounded-2xl bg-[#1c1c1e] border border-white-15 p-4 transition-all ${
                    showSms
                      ? "phone-notification-slide"
                      : "opacity-0 -translate-y-4"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-text">SMS Confirmation</p>
                      <p className="text-[11px] text-text-dim">Your phone rings in under 60 seconds</p>
                    </div>
                  </div>
                </div>

                {/* Bottom controls */}
                {finished && (
                  <div className="relative z-10 mt-8 flex flex-col items-center gap-3">
                    <button
                      onClick={handleReplay}
                      className="text-[13px] font-semibold text-text-dim hover:text-text transition-colors"
                    >
                      Replay Demo
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (compact) {
    return (
      <section className="border-t border-border py-20 max-md:py-14">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <RevealOnScroll>
            <p className="text-center text-xs font-bold tracking-[0.15em] uppercase text-accent mb-8">
              See what your customers experience
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="flex justify-center">{phone}</div>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="text-center mt-8">
              <a
                href="#apply"
                className="btn-primary-hover inline-flex items-center gap-2.5 bg-accent text-black px-8 py-3.5 rounded-full text-[14px] font-bold no-underline transition-all duration-300"
              >
                Get this system
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
    <section className="border-t border-border py-30 max-md:py-20">
      <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
        <div className="grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1 max-lg:gap-12">
          {/* Left — copy */}
          <div>
            <RevealOnScroll>
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
                See it in action
              </p>
              <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
                This is what your<br />customers experience.
              </h2>
              <p className="text-[17px] text-text-dim leading-[1.7] max-w-[460px] mb-6">
                A mobile-first quiz funnel that qualifies leads and triggers a call to your phone in under 60 seconds. No forms buried on page 3. No waiting for a callback.
              </p>
              <p className="text-[14px] text-text-mid font-semibold flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
                Tap through the demo
              </p>
            </RevealOnScroll>
          </div>

          {/* Right — phone mockup */}
          <RevealOnScroll>
            <div className="flex justify-center max-lg:justify-center">
              {phone}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
