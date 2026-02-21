"use client";

import {
  useEffect,
  useState,
  useRef,
  useCallback,
  KeyboardEvent,
  FormEvent,
} from "react";
import ChatMockup from "./ChatMockup";
import VisibilityScoreRing from "./VisibilityScoreRing";
import ScanProgressRow from "./ScanProgressRow";

const SESSION_KEY = "scanner-popup-dismissed";

const PLATFORMS = [
  { id: "chatgpt", name: "ChatGPT" },
  { id: "gemini", name: "Gemini" },
  { id: "claude", name: "Claude" },
  { id: "perplexity", name: "Perplexity" },
  { id: "llama", name: "Llama (Meta AI)" },
];

// Steps: url → scanning → gated → unlocked
type Step = "url" | "scanning" | "gated" | "unlocked";

interface PlatformState {
  status: "waiting" | "scanning" | "complete" | "error";
  found?: boolean;
  excerpt?: string;
  competitors?: string[];
  visibility?: number;
  error?: string;
}

export default function ScannerPopup() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<Step>("url");

  // URL step
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState("");

  // Lead capture (shown in gated step)
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [leadError, setLeadError] = useState("");
  const [leadLoading, setLeadLoading] = useState(false);

  // Scan state
  const [platformStates, setPlatformStates] = useState<
    Record<string, PlatformState>
  >({});
  const [results, setResults] = useState<unknown[]>([]);
  const [score, setScore] = useState(0);
  const [scanError, setScanError] = useState("");
  const [collapsedSet, setCollapsedSet] = useState<Set<string>>(new Set());
  const abortRef = useRef<AbortController | null>(null);

  const hasTriggered = useRef(false);

  // Trigger: fires when #problem-section scrolls out of viewport going down
  useEffect(() => {
    if (typeof window === "undefined") return;
    // TODO: Re-enable for production
    // if (sessionStorage.getItem(SESSION_KEY)) return;

    const target = document.getElementById("problem-section");
    if (!target) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (
          !entry.isIntersecting &&
          entry.boundingClientRect.top < 0 &&
          !hasTriggered.current
        ) {
          hasTriggered.current = true;
          setOpen(true);
          requestAnimationFrame(() => {
            requestAnimationFrame(() => setVisible(true));
          });
          obs.disconnect();
        }
      },
      { threshold: 0 }
    );

    obs.observe(target);
    return () => obs.disconnect();
  }, []);

  // Collapse cards stagger when entering gated step
  useEffect(() => {
    if (step === "gated") {
      const reversed = [...PLATFORMS].reverse();
      reversed.forEach((p, i) => {
        setTimeout(() => {
          setCollapsedSet((prev) => new Set([...prev, p.id]));
        }, i * 150);
      });
    } else if (step === "unlocked") {
      setCollapsedSet(new Set());
    } else if (step === "url") {
      setCollapsedSet(new Set());
    }
  }, [step]);

  // Body scroll lock
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const dismiss = useCallback(() => {
    setVisible(false);
    sessionStorage.setItem(SESSION_KEY, "1");
    if (abortRef.current) abortRef.current.abort();
    setTimeout(() => setOpen(false), 400);
  }, []);

  // Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, dismiss]);

  // Step 1 → 2: Submit URL, start scan immediately
  const handleUrlSubmit = () => {
    const trimmed = url.trim();
    if (!trimmed) {
      setUrlError("Please enter a website URL");
      return;
    }
    setUrlError("");
    setStep("scanning");
    startScan();
  };

  const handleUrlKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleUrlSubmit();
  };

  // Run the scan via SSE
  const startScan = useCallback(async () => {
    setScanError("");
    setResults([]);
    setScore(0);

    const initial: Record<string, PlatformState> = {};
    PLATFORMS.forEach((p) => {
      initial[p.id] = { status: "waiting" };
    });
    setPlatformStates(initial);

    try {
      abortRef.current = new AbortController();

      const res = await fetch("/api/ai-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        setScanError(
          (errData as { error?: string }).error ||
            `Scan failed (${res.status})`
        );
        return;
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        let eventType = "";
        for (const line of lines) {
          if (line.startsWith("event: ")) {
            eventType = line.slice(7).trim();
          } else if (line.startsWith("data: ") && eventType) {
            try {
              const data = JSON.parse(line.slice(6));

              if (eventType === "scanning") {
                setPlatformStates((prev) => ({
                  ...prev,
                  [data.platformId]: { status: "scanning" },
                }));
              } else if (eventType === "result") {
                setPlatformStates((prev) => ({
                  ...prev,
                  [data.platformId]: {
                    status: data.status,
                    found: data.found,
                    excerpt: data.excerpt,
                    competitors: data.competitors,
                    visibility: data.visibility,
                    error: data.error,
                  },
                }));
              } else if (eventType === "complete") {
                setScore(data.score);
                setResults(data.results);
                setStep("gated");
              }
            } catch {
              /* malformed SSE data */
            }
            eventType = "";
          }
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        setScanError(
          "Scan failed — please check your connection and try again."
        );
      }
    }
  }, [url]);

  // Gated → Unlocked: submit lead info
  const handleLeadSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLeadError("");

    if (!name.trim()) {
      setLeadError("Please enter your name");
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setLeadError("Please enter a valid email address");
      return;
    }

    setLeadLoading(true);

    try {
      const res = await fetch("/api/capture-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          websiteUrl: url.trim(),
          scanResults: results,
          score,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setLeadError(
          (data as { error?: string }).error || "Something went wrong"
        );
        setLeadLoading(false);
        return;
      }

      setLeadLoading(false);
      setStep("unlocked");
    } catch {
      setLeadError("Network error — please try again");
      setLeadLoading(false);
    }
  };

  // Blur logic: during scanning only ChatGPT visible, gated = all blurred, unlocked = none
  function isGated(platformId: string): boolean {
    if (step === "unlocked") return false;
    if (step === "gated") return true;
    // During scanning: only ChatGPT is visible
    return platformId !== "chatgpt";
  }

  if (!open) return null;

  const showScanUI = step === "scanning" || step === "gated" || step === "unlocked";

  return (
    <div
      className="fixed inset-0 z-[1100] flex items-center justify-center px-5 py-5"
      style={{
        backgroundColor: visible ? "rgba(0,0,0,0.70)" : "rgba(0,0,0,0)",
        backdropFilter: visible ? "blur(4px)" : "blur(0)",
        transition: "background-color 0.4s ease, backdrop-filter 0.4s ease",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
    >
      {/* Modal */}
      <div
        className="relative w-full rounded-2xl border border-border overflow-hidden overflow-y-auto max-h-[90vh]"
        style={{
          maxWidth: showScanUI ? 680 : 900,
          background:
            "linear-gradient(135deg, rgba(74,222,128,0.03) 0%, #0d0d0d 50%, rgba(74,222,128,0.01) 100%)",
          opacity: visible ? 1 : 0,
          transform: visible
            ? "scale(1) translateY(0)"
            : "scale(0.95) translateY(12px)",
          transition:
            "opacity 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1), max-width 0.5s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.06] text-white/40 hover:text-white/80 hover:bg-white/[0.1] transition-all duration-200 cursor-pointer border-none"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="1" y1="1" x2="13" y2="13" />
            <line x1="13" y1="1" x2="1" y2="13" />
          </svg>
        </button>

        {/* ====== STEP 1: URL Input + ChatMockup ====== */}
        {step === "url" && (
          <div className="flex max-md:flex-col">
            <div className="flex-shrink-0 flex items-center justify-center py-10 px-8 max-md:py-6 max-md:px-4">
              <ChatMockup play={visible} />
            </div>
            <div className="flex-1 flex flex-col justify-center py-10 pr-10 pl-2 max-md:px-6 max-md:py-8 max-md:pt-0">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-3">
                Free AI Visibility Scanner
              </p>
              <h3 className="text-[clamp(22px,3vw,30px)] font-extrabold leading-[1.15] tracking-[-0.8px] mb-3">
                Is your business visible
                <br />
                to AI?
              </h3>
              <p className="text-[14px] text-text-dim leading-[1.7] mb-6">
                ChatGPT, Gemini, and Perplexity are replacing Google for
                millions of users. See if AI recommends you — or only your
                competitors. Takes 60 seconds.
              </p>
              <div className="flex flex-col gap-2.5">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    setUrlError("");
                  }}
                  onKeyDown={handleUrlKeyDown}
                  placeholder="Enter your website URL"
                  className="w-full px-5 py-3.5 rounded-xl border border-border bg-[#050505] text-text text-[14px] font-sans outline-none transition-colors duration-300 focus:border-accent-border-dim placeholder:text-text-dim/50"
                />
                <button
                  onClick={handleUrlSubmit}
                  className="w-full px-6 py-3.5 rounded-xl border-none bg-accent text-black text-[14px] font-bold font-sans tracking-[-0.01em] cursor-pointer transition-all duration-300 btn-primary-hover"
                >
                  Scan Now — It&apos;s Free
                </button>
              </div>
              {urlError && (
                <p className="text-[13px] text-red mt-2">{urlError}</p>
              )}
              <p className="text-[11px] text-text-dim/50 mt-3">
                No credit card required. Results in under 60 seconds.
              </p>
            </div>
          </div>
        )}

        {/* ====== STEP 2: Scanning (ChatGPT visible, rest blurred) ====== */}
        {step === "scanning" && (
          <div className="px-8 py-10 max-md:px-5 max-md:py-8">
            <div className="text-center mb-8">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-3">
                Scanning {url.trim()}
              </p>
              <h3 className="text-[clamp(20px,3vw,26px)] font-extrabold leading-[1.15] tracking-[-0.8px]">
                Checking 5 AI platforms...
              </h3>
            </div>

            <div className="flex flex-col gap-3 max-w-[560px] mx-auto">
              {PLATFORMS.map((p) => {
                const state = platformStates[p.id] || {
                  status: "waiting" as const,
                };
                return (
                  <ScanProgressRow
                    key={p.id}
                    platformId={p.id}
                    platformName={p.name}
                    status={state.status}
                    found={state.found}
                    excerpt={state.excerpt}
                    competitors={state.competitors}
                    visibility={state.visibility}
                    error={state.error}
                    gated={isGated(p.id)}
                    collapsed={false}
                  />
                );
              })}
            </div>

            {scanError && (
              <p className="text-[13px] text-red text-center mt-4">
                {scanError}
              </p>
            )}
          </div>
        )}

        {/* ====== STEP 3: Gated — score + lead form + collapsed/blurred cards ====== */}
        {step === "gated" && (
          <div className="px-8 py-10 max-md:px-5 max-md:py-8">
            <div className="flex justify-center mb-8">
              <VisibilityScoreRing score={score} total={5} />
            </div>

            {/* Lead capture form */}
            <div className="bg-surface border border-border rounded-2xl p-8 max-w-[480px] mx-auto mb-8">
              <div className="text-center mb-5">
                <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-accent mb-2">
                  Unlock Full Results
                </p>
                <h3 className="text-xl font-extrabold tracking-[-0.3px] mb-2">
                  See the full picture
                </h3>
                <p className="text-sm text-text-dim leading-relaxed">
                  Enter your details to reveal detailed AI insights, competitor
                  mentions, and personalized recommendations.
                </p>
              </div>

              <form
                onSubmit={handleLeadSubmit}
                className="flex flex-col gap-3 max-w-[400px] mx-auto"
              >
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  disabled={leadLoading}
                  className="w-full px-5 py-3.5 rounded-xl border border-border bg-card text-text text-sm font-sans outline-none transition-colors duration-300 focus:border-accent-border-dim placeholder:text-text-dim/50 disabled:opacity-50"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number (optional)"
                  disabled={leadLoading}
                  className="w-full px-5 py-3.5 rounded-xl border border-border bg-card text-text text-sm font-sans outline-none transition-colors duration-300 focus:border-accent-border-dim placeholder:text-text-dim/50 disabled:opacity-50"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  disabled={leadLoading}
                  className="w-full px-5 py-3.5 rounded-xl border border-border bg-card text-text text-sm font-sans outline-none transition-colors duration-300 focus:border-accent-border-dim placeholder:text-text-dim/50 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={leadLoading}
                  className="w-full px-8 py-3.5 rounded-xl border-none bg-accent text-black text-sm font-bold font-sans cursor-pointer transition-all duration-300 tracking-[-0.01em] btn-primary-hover disabled:opacity-70 disabled:cursor-wait"
                >
                  {leadLoading ? "Unlocking..." : "Unlock My Results"}
                </button>
              </form>

              {leadError && (
                <p className="text-[13px] text-red text-center mt-3">
                  {leadError}
                </p>
              )}

              <p className="text-[11px] text-white-25 text-center mt-4">
                No spam. Just your free AI visibility report + tips to improve
                it.
              </p>
            </div>

            {/* Collapsed/blurred platform cards */}
            <div className="flex flex-col gap-3 max-w-[560px] mx-auto">
              {PLATFORMS.map((p) => {
                const state = platformStates[p.id] || {
                  status: "waiting" as const,
                };
                return (
                  <ScanProgressRow
                    key={p.id}
                    platformId={p.id}
                    platformName={p.name}
                    status={state.status}
                    found={state.found}
                    excerpt={state.excerpt}
                    competitors={state.competitors}
                    visibility={state.visibility}
                    error={state.error}
                    gated={true}
                    collapsed={collapsedSet.has(p.id)}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* ====== STEP 4: Unlocked — full results ====== */}
        {step === "unlocked" && (
          <div className="px-8 py-10 max-md:px-5 max-md:py-8">
            <div className="flex justify-center mb-8">
              <VisibilityScoreRing score={score} total={5} />
            </div>

            <div className="flex flex-col gap-3 max-w-[560px] mx-auto mb-8">
              {PLATFORMS.map((p) => {
                const state = platformStates[p.id] || {
                  status: "waiting" as const,
                };
                return (
                  <ScanProgressRow
                    key={p.id}
                    platformId={p.id}
                    platformName={p.name}
                    status={state.status}
                    found={state.found}
                    excerpt={state.excerpt}
                    competitors={state.competitors}
                    visibility={state.visibility}
                    error={state.error}
                    gated={false}
                    collapsed={false}
                  />
                );
              })}
            </div>

            <div className="text-center">
              <p className="text-[13px] text-text-dim mb-4">
                A detailed report has been sent to{" "}
                <span className="text-text font-medium">{email}</span>
              </p>
              <button
                onClick={dismiss}
                className="px-7 py-3 rounded-full border-none bg-accent text-black text-sm font-bold font-sans cursor-pointer transition-all duration-300 btn-primary-hover"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
