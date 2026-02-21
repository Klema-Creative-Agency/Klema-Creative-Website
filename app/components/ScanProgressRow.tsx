"use client";
import { useEffect, useState } from "react";

const PLATFORM_ICONS: Record<string, string> = {
  chatgpt: "🤖",
  gemini: "✨",
  claude: "🧠",
  perplexity: "🔍",
  llama: "🦙",
};

function Spinner() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" className="animate-spin">
      <circle
        cx="10"
        cy="10"
        r="8"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeDasharray="32 18"
        strokeLinecap="round"
      />
    </svg>
  );
}

function getVisibilityColor(pct: number) {
  if (pct >= 70) return "var(--color-accent)";
  if (pct >= 40) return "var(--color-amber)";
  return "var(--color-red)";
}

function getVisibilityLabel(pct: number) {
  if (pct >= 80) return "Strong";
  if (pct >= 60) return "Good";
  if (pct >= 40) return "Moderate";
  if (pct >= 20) return "Weak";
  return "Not Visible";
}

function VisibilityBar({ visibility }: { visibility: number }) {
  const [animated, setAnimated] = useState(0);
  const color = getVisibilityColor(visibility);
  const label = getVisibilityLabel(visibility);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimated(visibility), 100);
    return () => clearTimeout(timeout);
  }, [visibility]);

  return (
    <div className="mt-3 pt-3 border-t border-border">
      <div className="flex items-center justify-between mb-1.5">
        <span
          className="text-[11px] font-bold tracking-[0.06em] uppercase"
          style={{ color }}
        >
          {label}
        </span>
        <span
          className="text-[13px] font-black tracking-[-0.5px]"
          style={{ color }}
        >
          {visibility}%
        </span>
      </div>
      <div className="w-full h-1.5 rounded-full bg-white-6 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: `${animated}%`,
            background: color,
            transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </div>
    </div>
  );
}

interface ScanProgressRowProps {
  platformId: string;
  platformName: string;
  status: "waiting" | "scanning" | "complete" | "error";
  found?: boolean;
  excerpt?: string;
  competitors?: string[];
  visibility?: number;
  error?: string;
  gated?: boolean;
  collapsed?: boolean;
}

export default function ScanProgressRow({
  platformId,
  platformName,
  status,
  found = false,
  excerpt = "",
  competitors = [],
  visibility = 0,
  error,
  gated = false,
  collapsed = false,
}: ScanProgressRowProps) {
  const icon = PLATFORM_ICONS[platformId] || "🔵";

  return (
    <div
      className={`bg-surface border border-border rounded-2xl transition-all duration-500 overflow-hidden ${
        status === "waiting"
          ? "opacity-40 animate-[scanPulse_2s_ease-in-out_infinite]"
          : "opacity-100"
      } ${collapsed ? "px-5 py-3" : "px-6 py-5"}`}
      style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className={collapsed ? "text-base" : "text-xl"}>{icon}</span>
        <span
          className={`font-bold tracking-[-0.2px] flex-1 ${
            collapsed ? "text-[13px]" : "text-[15px]"
          }`}
        >
          {platformName}
        </span>
        {status === "waiting" && (
          <span className="text-xs text-text-dim font-medium">Waiting...</span>
        )}
        {status === "scanning" && <Spinner />}
        {(status === "complete" || status === "error") && !error && (
          <span
            className={`text-[11px] font-bold tracking-[0.08em] uppercase px-2.5 py-0.5 rounded-full ${
              found
                ? "text-accent bg-accent-dim"
                : "text-red bg-[rgba(248,113,113,0.12)]"
            }`}
          >
            {found ? "Found" : "Not Found"}
          </span>
        )}
      </div>

      {/* Collapsible details */}
      <div
        className="grid transition-[grid-template-rows] duration-500"
        style={{
          gridTemplateRows: collapsed ? "0fr" : "1fr",
          transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div className="overflow-hidden">
          {(status === "complete" || status === "error") && (
            <div className="mt-3 relative">
              {error ? (
                <p className="text-[13px] text-text-dim italic">
                  Unable to check this platform
                </p>
              ) : (
                <div
                  className={`transition-[filter] duration-600 ${
                    gated
                      ? "blur-[5px] select-none pointer-events-none"
                      : "blur-0"
                  }`}
                  style={{
                    transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                  {excerpt && (
                    <p
                      className={`text-[13px] text-text-dim leading-[1.7] ${
                        competitors.length > 0 ? "mb-2" : ""
                      }`}
                    >
                      {excerpt}
                    </p>
                  )}
                  {competitors.length > 0 && (
                    <p className="text-xs text-amber">
                      Competitors mentioned: {competitors.join(", ")}
                    </p>
                  )}
                  <VisibilityBar visibility={visibility} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
