"use client";

import { useEffect, useState } from "react";

function Confetti() {
  const colors = ["#22c55e", "#4ade80", "#86efac", "#ffffff", "#fbbf24"];
  const pieces = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2,
    size: 4 + Math.random() * 6,
    color: colors[Math.floor(Math.random() * colors.length)],
    rotation: Math.random() * 360,
    drift: -30 + Math.random() * 60,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute confetti-piece"
          style={{
            left: `${p.left}%`,
            top: "-10px",
            width: `${p.size}px`,
            height: `${p.size * 1.5}px`,
            backgroundColor: p.color,
            borderRadius: "2px",
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            ["--drift" as string]: `${p.drift}px`,
            ["--rotation" as string]: `${p.rotation + 720}deg`,
          }}
        />
      ))}
    </div>
  );
}

export default function BookedPage() {
  const [firstName, setFirstName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [show, setShow] = useState(false);
  const [showItems, setShowItems] = useState(false);

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("klema-phase1") || "{}");
      if (data.firstName) setFirstName(data.firstName);
      if (data.business) setBusinessType(data.business);
    } catch {}

    // Stagger the reveal
    setTimeout(() => setShow(true), 100);
    setTimeout(() => setShowItems(true), 800);
  }, []);

  const headline = firstName
    ? `Almost locked in, ${firstName}!`
    : "Almost locked in!";

  const businessLabel = businessType || "business";

  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-16 overflow-hidden">
      <Confetti />

      <div className="w-full max-w-[520px] text-center relative z-10">
        {/* Animated checkmark */}
        <div
          className="mx-auto mb-6 transition-all duration-700 ease-out"
          style={{
            opacity: show ? 1 : 0,
            transform: show ? "scale(1)" : "scale(0.3)",
          }}
        >
          <div className="w-20 h-20 rounded-full bg-[#22c55e]/15 border-2 border-[#22c55e]/30 flex items-center justify-center mx-auto booked-glow">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="booked-check"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        {/* Headline */}
        <h1
          className="text-[clamp(28px,5vw,40px)] font-bold text-white leading-[1.15] tracking-[-1px] mb-4 transition-all duration-700 ease-out"
          style={{
            opacity: show ? 1 : 0,
            transform: show ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "200ms",
          }}
        >
          {headline}
        </h1>

        {/* Check your phone line with vibrating phone */}
        <div
          className="mb-10 transition-all duration-700 ease-out"
          style={{
            opacity: show ? 1 : 0,
            transform: show ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "400ms",
          }}
        >
          <p className="text-white text-[18px] font-semibold mb-1 flex items-center justify-center gap-2">
            Check your phone
            <span className="inline-block booked-phone-vibrate text-[22px]">📱</span>
          </p>
          <p className="text-[#9ca3af] text-[15px]">
            One quick step to confirm your spot.
          </p>
        </div>

        {/* Call preview card */}
        <div
          className="bg-[#1a1a1a] border border-[#333333] rounded-2xl p-8 max-md:p-6 text-left transition-all duration-700 ease-out"
          style={{
            opacity: showItems ? 1 : 0,
            transform: showItems ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <p className="text-white font-semibold text-[15px] mb-5">
            Here&apos;s what we&apos;ll cover on your call:
          </p>
          <ul className="flex flex-col gap-4">
            {[
              `Where your ${businessLabel} is losing time right now`,
              "Which AI automations would have the biggest impact",
              "A realistic timeline to get them running",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-[#9ca3af] text-[14px] leading-relaxed transition-all duration-500 ease-out"
                style={{
                  opacity: showItems ? 1 : 0,
                  transform: showItems ? "translateX(0)" : "translateX(-16px)",
                  transitionDelay: `${i * 150 + 200}ms`,
                }}
              >
                <div className="w-5 h-5 rounded-full bg-[#22c55e]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
