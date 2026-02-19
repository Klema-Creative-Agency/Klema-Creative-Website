"use client";

import { useState, useEffect } from "react";

const FULL_TEXT = "Stop wasting money\non marketing that\n";
const ACCENT_TEXT = "doesn\u2019t work.";
const TOTAL = FULL_TEXT.length + ACCENT_TEXT.length;
const TICK = 55;
const EMPHASIS_DURATION = 3000;
export default function TypewriterHeading({ onComplete }: { onComplete?: () => void }) {
  const [count, setCount] = useState(0);
  const [emphasis, setEmphasis] = useState(false);
  const [cursorBlink, setCursorBlink] = useState(false);

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

  const mainVisible = FULL_TEXT.slice(0, Math.min(count, FULL_TEXT.length));
  const accentVisible = count > FULL_TEXT.length
    ? ACCENT_TEXT.slice(0, count - FULL_TEXT.length)
    : "";

  return (
    <h1 className="text-[clamp(48px,7.5vw,88px)] font-extrabold leading-[1.05] tracking-[-2.5px] mb-8 max-md:text-[36px] max-md:tracking-[-1.2px] max-md:leading-[1.1] max-md:text-center">
      {mainVisible.split("\n").map((line, i, arr) => (
        <span key={i}>
          {line}
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
