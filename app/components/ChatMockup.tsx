"use client";

import { useEffect, useState, useRef } from "react";

const QUERY = "Best lawyers in San Antonio";
const CHAR_SPEED = 50; // ms per character
const QUERY_DELAY = 600; // ms before typing starts
const THINKING_DURATION = 1400; // ms thinking dots show
const RESPONSE_STAGGER = 300; // ms between response lines

const COMPETITORS = [
  "1. Martinez & Associates — highly rated, 200+ reviews",
  "2. Lone Star Legal Group — free consultations available",
  "3. Alamo City Law Firm — specializing in personal injury",
  "4. Heritage Legal Partners — trusted since 1998",
];

export default function ChatMockup({ play }: { play: boolean }) {
  const [typedChars, setTypedChars] = useState(0);
  const [phase, setPhase] = useState<"idle" | "typing" | "thinking" | "response" | "warning">("idle");
  const [visibleLines, setVisibleLines] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const rafRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (!play) return;

    // Start typing after delay
    const startTimer = setTimeout(() => {
      setPhase("typing");
      let charIndex = 0;

      const typeInterval = setInterval(() => {
        charIndex++;
        setTypedChars(charIndex);
        if (charIndex >= QUERY.length) {
          clearInterval(typeInterval);
          // Pause then show thinking
          rafRef.current = setTimeout(() => {
            setPhase("thinking");
            // After thinking, show response
            rafRef.current = setTimeout(() => {
              setPhase("response");
              // Stagger response lines
              let line = 0;
              const lineInterval = setInterval(() => {
                line++;
                setVisibleLines(line);
                if (line >= COMPETITORS.length) {
                  clearInterval(lineInterval);
                  // Show warning after responses
                  rafRef.current = setTimeout(() => {
                    setShowWarning(true);
                    setPhase("warning");
                  }, 800);
                }
              }, RESPONSE_STAGGER);
            }, THINKING_DURATION);
          }, 200);
        }
      }, CHAR_SPEED);

      return () => clearInterval(typeInterval);
    }, QUERY_DELAY);

    return () => {
      clearTimeout(startTimer);
      if (rafRef.current) clearTimeout(rafRef.current);
    };
  }, [play]);

  return (
    <div className="relative mx-auto" style={{ width: 280, height: 500 }}>
      {/* Phone bezel */}
      <div
        className="absolute inset-0 rounded-[40px] border-[3px] border-[#333] overflow-hidden"
        style={{ background: "#1a1a1a" }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-[#1a1a1a] rounded-b-2xl z-10" />

        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pt-[8px] text-[11px] text-white/60 relative z-10">
          <span className="font-medium">9:41</span>
          <div className="flex items-center gap-1.5">
            <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor" opacity="0.6">
              <rect x="0" y="6" width="2.5" height="4" rx="0.5" />
              <rect x="3.5" y="4" width="2.5" height="6" rx="0.5" />
              <rect x="7" y="2" width="2.5" height="8" rx="0.5" />
              <rect x="10.5" y="0" width="2.5" height="10" rx="0.5" />
            </svg>
            <svg width="22" height="10" viewBox="0 0 22 10" fill="none" stroke="currentColor" opacity="0.6" strokeWidth="1">
              <rect x="0.5" y="1" width="18" height="8" rx="2" />
              <rect x="19.5" y="3.5" width="2" height="3" rx="0.5" fill="currentColor" />
              <rect x="1.5" y="2" width="12" height="6" rx="1" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Chat header */}
        <div className="flex items-center gap-2.5 px-5 py-3 border-b border-white/[0.06]">
          <div className="w-7 h-7 rounded-full bg-[#10a37f] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
            </svg>
          </div>
          <span className="text-[13px] font-semibold text-white/90">ChatGPT</span>
        </div>

        {/* Chat body */}
        <div className="px-4 py-4 space-y-3 overflow-hidden" style={{ fontSize: 13 }}>
          {/* User message */}
          {phase !== "idle" && (
            <div className="flex justify-end">
              <div className="bg-[#2f2f2f] rounded-2xl rounded-br-md px-3.5 py-2.5 max-w-[85%] text-white/90 leading-[1.5]">
                {QUERY.slice(0, typedChars)}
                {phase === "typing" && (
                  <span className="inline-block w-[2px] h-[14px] bg-white/70 ml-0.5 align-middle" style={{ animation: "blink 1s step-end infinite" }} />
                )}
              </div>
            </div>
          )}

          {/* Thinking dots */}
          {phase === "thinking" && (
            <div className="flex justify-start">
              <div className="bg-[#2f2f2f] rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-[7px] h-[7px] rounded-full bg-white/50"
                    style={{
                      animation: `thinkingDot 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* AI Response */}
          {(phase === "response" || phase === "warning") && (
            <div className="flex justify-start">
              <div className="bg-transparent max-w-[95%] space-y-1.5">
                <p className="text-white/60 text-[12px] mb-1.5 leading-[1.5]">
                  Here are the top-rated lawyers in San Antonio:
                </p>
                {COMPETITORS.map((line, i) => (
                  <p
                    key={i}
                    className="text-white/80 text-[12px] leading-[1.6]"
                    style={{
                      opacity: i < visibleLines ? 1 : 0,
                      transform: i < visibleLines ? "translateY(0)" : "translateY(6px)",
                      transition: "all 0.4s ease",
                    }}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Warning indicator */}
          {showWarning && (
            <div
              className="flex items-center gap-2 mt-3 px-3 py-2 rounded-lg"
              style={{
                background: "rgba(248, 113, 113, 0.08)",
                border: "1px solid rgba(248, 113, 113, 0.2)",
                opacity: showWarning ? 1 : 0,
                transform: showWarning ? "translateY(0)" : "translateY(4px)",
                transition: "all 0.5s ease",
              }}
            >
              <div className="w-2 h-2 rounded-full bg-red shrink-0" />
              <span className="text-[11px] text-red font-medium">
                Your business isn&apos;t listed
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
