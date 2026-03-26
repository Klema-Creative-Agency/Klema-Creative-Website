"use client";

import { useState, useEffect, useCallback } from "react";

const FULL_TEXT = "You\u2019re\nwearing every hat,\nAI can take a few off.\n";
const METALLIC_LINE = 2; // "AI can take a few off," is line index 2
const ACCENT_TEXT = "Let\u2019s fix that.";
const TOTAL = FULL_TEXT.length + ACCENT_TEXT.length;
const TICK = 55;
const EMPHASIS_DURATION = 3000;

// Each hat represents a job/task the business owner is juggling
const HATS = [
  "🧢",  // marketing / social media
  "🎩",  // CEO / sales
  "🎓",  // training / learning
];

const HAT_STAY_MS = 2500;   // how long each hat sits on the Y
const HAT_SWAP_MS = 800;    // time for fall-off + next drop-in

export default function TypewriterHeading({ onComplete }: { onComplete?: () => void }) {
  const [count, setCount] = useState(0);
  const [emphasis, setEmphasis] = useState(false);
  const [cursorBlink, setCursorBlink] = useState(false);
  const [hatIndex, setHatIndex] = useState(0);
  const [hatPhase, setHatPhase] = useState<"hidden" | "dropping" | "landed" | "falling-off">("hidden");
  const [metalPos, setMetalPos] = useState(0);

  // Typewriter effect
  useEffect(() => {
    setCount(0);
    setEmphasis(false);
    setCursorBlink(false);

    let i = 0;
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let t1: ReturnType<typeof setTimeout>;

    const startDelay = setTimeout(() => {
      intervalId = setInterval(() => {
        i++;
        setCount(i);
        if (i >= TOTAL) {
          if (intervalId) clearInterval(intervalId);
          intervalId = null;
          setCursorBlink(true);
          setEmphasis(true);
          onComplete?.();
          t1 = setTimeout(() => setEmphasis(false), EMPHASIS_DURATION);
        }
      }, TICK);
    }, 300);

    return () => {
      clearTimeout(startDelay);
      if (intervalId) clearInterval(intervalId);
      clearTimeout(t1);
    };
  }, []);

  // Hat cycling — starts after typewriter completes
  const typingDone = count >= TOTAL;

  const cycleHat = useCallback(() => {
    // Drop in
    setHatPhase("dropping");
    const t1 = setTimeout(() => setHatPhase("landed"), 800);
    // Stay landed, then fall off
    const t2 = setTimeout(() => setHatPhase("falling-off"), 800 + HAT_STAY_MS);
    // After fall-off animation, advance to next hat and restart
    const t3 = setTimeout(() => {
      setHatIndex((prev) => (prev + 1) % HATS.length);
      setHatPhase("dropping");
      // landed again
      setTimeout(() => setHatPhase("landed"), 800);
    }, 800 + HAT_STAY_MS + HAT_SWAP_MS);

    return [t1, t2, t3];
  }, []);

  useEffect(() => {
    if (!typingDone) return;

    // Initial delay before first hat
    const initDelay = setTimeout(() => {
      setHatPhase("dropping");
      setTimeout(() => setHatPhase("landed"), 800);
    }, 400);

    // Start cycling after first hat lands + stays
    const cycleStart = setTimeout(() => {
      const interval = setInterval(() => {
        setHatPhase("falling-off");
        setTimeout(() => {
          setHatIndex((prev) => (prev + 1) % HATS.length);
          setHatPhase("dropping");
          setTimeout(() => setHatPhase("landed"), 800);
        }, HAT_SWAP_MS);
      }, HAT_STAY_MS + HAT_SWAP_MS + 800);

      return () => clearInterval(interval);
    }, 400 + 800 + HAT_STAY_MS);

    return () => {
      clearTimeout(initDelay);
      clearTimeout(cycleStart);
    };
  }, [typingDone]);

  // Metallic shimmer animation
  useEffect(() => {
    if (!typingDone) return;
    let frame: number;
    let start: number | null = null;
    const duration = 8000; // 8s per sweep

    function animate(ts: number) {
      if (!start) start = ts;
      const elapsed = (ts - start) % duration;
      setMetalPos((elapsed / duration) * 200);
      frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [typingDone]);

  const mainVisible = FULL_TEXT.slice(0, Math.min(count, FULL_TEXT.length));
  const accentVisible = count > FULL_TEXT.length
    ? ACCENT_TEXT.slice(0, count - FULL_TEXT.length)
    : "";

  const hatClass =
    hatPhase === "dropping" ? "hat-land" :
    hatPhase === "landed" ? "hat-settled" :
    hatPhase === "falling-off" ? "hat-fall-off" :
    "hat-ready";

  function renderLine(line: string, lineIndex: number) {
    if (lineIndex === 0 && line.length > 0) {
      return (
        <span>
          <span className="relative inline-block">
            {line[0]}
            <span
              className={`absolute pointer-events-none select-none ${hatClass}`}
              style={{
                top: "-0.55em",
                left: "-0.25em",
                fontSize: "0.75em",
                transformOrigin: "center bottom",
              }}
              aria-hidden="true"
            >
              {HATS[hatIndex]}
            </span>
          </span>
          {line.slice(1)}
        </span>
      );
    }
    if (lineIndex === METALLIC_LINE && line.length > 0 && typingDone) {
      return (
        <span
          className="metallic-text"
          style={{
            background: "linear-gradient(120deg, #aaa 0%, #c0c0c0 6%, #d6d6d6 12%, #ededed 18%, #ffffff 24%, #c8c8c8 30%, #aaa 38%, #c0c0c0 46%, #e0e0e0 52%, #f6f6f6 58%, #ffffff 63%, #d4d4d4 68%, #b2b2b2 76%, #c8c8c8 84%, #e4e4e4 90%, #b8b8b8 96%, #aaa 100%)",
            backgroundSize: "400% 100%",
            backgroundPosition: `${metalPos}% center`,
          }}
        >
          {line}
        </span>
      );
    }
    return <span>{line}</span>;
  }

  return (
    <h1 className="text-[clamp(40px,7.5vw,88px)] font-extrabold leading-[1.05] tracking-[-2.5px] mb-4 max-md:mb-3 max-md:text-[38px] max-md:tracking-[-1.5px] max-md:leading-[1.08] max-md:text-center">
      {mainVisible.split("\n").map((line, i, arr) => (
        <span key={i}>
          {renderLine(line, i)}
          {i < arr.length - 1 && <br />}
        </span>
      ))}
      {accentVisible && (
        <span
          className="typewriter-accent"
          data-emphasis={emphasis ? "" : undefined}
        >
          {accentVisible}
        </span>
      )}
      <span
        className={`typewriter-cursor ${cursorBlink ? "typewriter-cursor-pulse" : ""}`}
        style={{ opacity: count > 0 ? 1 : 0 }}
      />
    </h1>
  );
}
