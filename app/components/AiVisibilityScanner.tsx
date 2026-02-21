"use client";
import { useState, useRef, useCallback, useEffect, KeyboardEvent } from "react";
import VisibilityScoreRing from "./VisibilityScoreRing";
import ScanProgressRow from "./ScanProgressRow";
import EmailGateForm from "./EmailGateForm";

const PLATFORMS = [
  { id: "chatgpt", name: "ChatGPT" },
  { id: "gemini", name: "Gemini" },
  { id: "claude", name: "Claude" },
  { id: "perplexity", name: "Perplexity" },
  { id: "llama", name: "Llama (Meta AI)" },
];

const COOLDOWN_KEY = "ai-scan-last";
const COOLDOWN_MS = 60 * 60 * 1000;

function getCooldownRemaining(): number {
  try {
    const last = localStorage.getItem(COOLDOWN_KEY);
    if (!last) return 0;
    const remaining = parseInt(last, 10) + COOLDOWN_MS - Date.now();
    return remaining > 0 ? remaining : 0;
  } catch {
    return 0;
  }
}

function setCooldown() {
  try {
    localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
  } catch {
    /* noop */
  }
}

function formatCooldown(ms: number): string {
  const min = Math.ceil(ms / 60000);
  return `${min} minute${min !== 1 ? "s" : ""}`;
}

type Phase = "idle" | "scanning" | "results-gated" | "results-unlocked";

interface PlatformState {
  status: "waiting" | "scanning" | "complete" | "error";
  found?: boolean;
  excerpt?: string;
  competitors?: string[];
  visibility?: number;
  error?: string;
}

export default function AiVisibilityScanner() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [platformStates, setPlatformStates] = useState<
    Record<string, PlatformState>
  >({});
  const [results, setResults] = useState<unknown[]>([]);
  const [score, setScore] = useState(0);
  const [collapsedSet, setCollapsedSet] = useState<Set<string>>(new Set());
  const abortRef = useRef<AbortController | null>(null);

  // When phase goes to results-gated, stagger collapse from bottom up
  useEffect(() => {
    if (phase === "results-gated") {
      const reversed = [...PLATFORMS].reverse();
      reversed.forEach((p, i) => {
        setTimeout(() => {
          setCollapsedSet((prev) => new Set([...prev, p.id]));
        }, i * 150); // 150ms stagger between each card
      });
    } else if (phase === "results-unlocked") {
      // Expand all when unlocked
      setCollapsedSet(new Set());
    } else if (phase === "idle") {
      setCollapsedSet(new Set());
    }
  }, [phase]);

  const startScan = useCallback(async () => {
    // TODO: Re-enable cooldown for production
    // const remaining = getCooldownRemaining();
    // if (remaining > 0) {
    //   setError(
    //     `Please wait ${formatCooldown(remaining)} before scanning again.`
    //   );
    //   return;
    // }

    if (!url.trim()) {
      setError("Please enter a website URL");
      return;
    }

    setError("");
    setPhase("scanning");
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
        setError(
          (errData as { error?: string }).error || `Scan failed (${res.status})`
        );
        setPhase("idle");
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
                setCooldown();
                setPhase("results-gated");
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
        setError(
          "Scan failed — please check your connection and try again."
        );
        setPhase("idle");
      }
    }
  }, [url]);

  const handleUnlock = useCallback(() => {
    setPhase("results-unlocked");
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") startScan();
  };

  const showResults = phase === "results-gated" || phase === "results-unlocked";

  // Blur logic per platform:
  // - scanning: ChatGPT visible, everything else blurred as results come in
  // - results-gated: ALL blurred (including ChatGPT)
  // - results-unlocked: nothing blurred
  function isGated(platformId: string): boolean {
    if (phase === "results-unlocked") return false;
    if (phase === "results-gated") return true;
    // During scanning: only ChatGPT is visible
    return platformId !== "chatgpt";
  }

  return (
    <div>
      {/* URL Input */}
      {(phase === "idle" || phase === "scanning") && (
        <div className="max-w-[600px] mx-auto mb-12">
          <div className="flex gap-2.5 flex-wrap">
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError("");
              }}
              onKeyDown={handleKeyDown}
              placeholder="Enter your website URL (e.g. mybusiness.com)"
              disabled={phase === "scanning"}
              className="flex-1 min-w-[240px] px-6 py-4 rounded-full border border-border bg-card text-text text-[15px] font-sans outline-none transition-colors duration-300 focus:border-accent-border-dim"
            />
            <button
              onClick={startScan}
              disabled={phase === "scanning"}
              className={`px-9 py-4 rounded-full border-none text-[15px] font-bold font-sans tracking-[-0.01em] transition-all duration-300 ${
                phase === "scanning"
                  ? "bg-accent/50 text-black cursor-wait"
                  : "bg-accent text-black cursor-pointer btn-primary-hover"
              }`}
            >
              {phase === "scanning" ? "Scanning..." : "Scan Now"}
            </button>
          </div>
          {error && (
            <p className="text-[13px] text-red text-center mt-3">{error}</p>
          )}
        </div>
      )}

      {/* Scanning / Results */}
      {(phase === "scanning" || showResults) && (
        <div className="max-w-[640px] mx-auto">
          {showResults && (
            <div className="flex justify-center mb-10">
              <VisibilityScoreRing score={score} total={5} />
            </div>
          )}

          {/* Email gate — above cards when gated */}
          {phase === "results-gated" && (
            <div className="mb-8">
              <EmailGateForm
                websiteUrl={url}
                scanResults={results}
                score={score}
                onUnlock={handleUnlock}
              />
            </div>
          )}

          <div className="flex flex-col gap-3 mb-8">
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
                  collapsed={collapsedSet.has(p.id)}
                />
              );
            })}
          </div>

          {phase === "results-unlocked" && (
            <div className="text-center mt-6">
              <button
                onClick={() => {
                  setPhase("idle");
                  setUrl("");
                  setPlatformStates({});
                  setResults([]);
                  setScore(0);
                  setError("");
                }}
                className="px-7 py-3 rounded-full border-none bg-white-6 text-text text-sm font-semibold font-sans cursor-pointer transition-all duration-300 hover:bg-white-10 hover:-translate-y-px"
              >
                Scan Another Website
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
