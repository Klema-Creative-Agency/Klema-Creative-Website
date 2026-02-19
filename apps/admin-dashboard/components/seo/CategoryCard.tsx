"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";

const CATEGORY_META: Record<string, { label: string; icon: string }> = {
  technical:  { label: "Technical SEO",        icon: "⚙" },
  onpage:     { label: "On-Page SEO",          icon: "📄" },
  local_seo:  { label: "Local SEO",            icon: "📍" },
  schema:     { label: "Schema Markup",        icon: "📚" },
  content:    { label: "Content & E-E-A-T",    icon: "✍" },
  images:     { label: "Image Optimization",   icon: "📷" },
  sitemap:    { label: "Sitemap",              icon: "🗺" },
  geo:        { label: "AI Search (GEO)",      icon: "🤖" },
  competitor: { label: "Competitive Analysis", icon: "⚔" },
  pagespeed:  { label: "Page Speed",           icon: "⚡" },
  mobile:     { label: "Mobile UX",            icon: "📱" },
  reputation: { label: "Reputation & Reviews", icon: "⭐" },
};

function scoreColor(score: number): string {
  if (score >= 90) return "text-accent";
  if (score >= 70) return "text-info";
  if (score >= 50) return "text-warning";
  return "text-danger";
}

function barColor(score: number): string {
  if (score >= 90) return "bg-accent";
  if (score >= 70) return "bg-info";
  if (score >= 50) return "bg-warning";
  return "bg-danger";
}

interface Check {
  name: string;
  passed: boolean;
  severity: string;
  message: string;
  recommendation?: string;
}

interface CategoryResult {
  score: number;
  grade: string;
  passed: number;
  failed: number;
  critical_issues: number;
  checks: Check[];
}

export function CategoryCard({
  categoryKey,
  result,
}: {
  categoryKey: string;
  result: CategoryResult;
}) {
  const [expanded, setExpanded] = useState(false);
  const meta = CATEGORY_META[categoryKey] || { label: categoryKey, icon: "●" };

  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden transition-colors hover:border-border-hover">
      {/* Header — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left"
      >
        <span className="text-[1.2rem] w-10 h-10 rounded-xl bg-accent-dim flex items-center justify-center flex-shrink-0">
          {meta.icon}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-semibold text-text">{meta.label}</p>
          <p className="text-[12px] text-text-dim">
            {result.passed} passed · {result.failed} failed
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <span className={`text-[1.3rem] font-extrabold tracking-tight ${scoreColor(result.score)}`}>
            {result.score}
          </span>
          <div className="w-[50px] h-[3px] bg-card rounded-full mt-1">
            <div
              className={`h-full rounded-full ${barColor(result.score)} transition-all duration-700`}
              style={{ width: `${result.score}%` }}
            />
          </div>
        </div>
        <svg
          width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
          className={`text-text-dim transition-transform ${expanded ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Expanded checks */}
      {expanded && (
        <div className="px-5 pb-5 space-y-2 border-t border-border pt-4">
          {[...result.checks]
            .sort((a, b) => {
              const order = { critical: 0, warning: 1, info: 2 };
              const aPassed = a.passed ? 1 : 0;
              const bPassed = b.passed ? 1 : 0;
              if (aPassed !== bPassed) return aPassed - bPassed;
              return (order[a.severity as keyof typeof order] ?? 3) - (order[b.severity as keyof typeof order] ?? 3);
            })
            .map((check, i) => (
              <div
                key={i}
                className={`flex gap-3 px-4 py-3 rounded-xl bg-bg border border-border ${
                  check.passed
                    ? "border-l-[3px] border-l-accent"
                    : check.severity === "critical"
                      ? "border-l-[3px] border-l-danger bg-danger/[0.03]"
                      : check.severity === "warning"
                        ? "border-l-[3px] border-l-warning bg-warning/[0.03]"
                        : "border-l-[3px] border-l-info"
                }`}
              >
                <span className={`text-[14px] flex-shrink-0 mt-0.5 ${
                  check.passed ? "text-accent" : check.severity === "critical" ? "text-danger" : check.severity === "warning" ? "text-warning" : "text-info"
                }`}>
                  {check.passed ? "✓" : check.severity === "critical" ? "✗" : "⚠"}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-text">{check.name}</p>
                  <p className="text-[12px] text-text-dim mt-0.5">{check.message}</p>
                  {!check.passed && check.recommendation && (
                    <p className="text-[12px] text-accent mt-2 px-3 py-2 bg-accent/[0.06] rounded-lg border border-accent/10 leading-relaxed">
                      {check.recommendation}
                    </p>
                  )}
                </div>
                {!check.passed && (
                  <Badge variant={check.severity === "critical" ? "danger" : check.severity === "warning" ? "warning" : "info"}>
                    {check.severity}
                  </Badge>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
