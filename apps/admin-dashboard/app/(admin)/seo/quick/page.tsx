"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ScoreRing } from "@/components/seo/ScoreRing";
import { CategoryCard } from "@/components/seo/CategoryCard";
import { RecommendationList } from "@/components/seo/RecommendationList";
import { AuditProgress } from "@/components/seo/AuditProgress";

type AuditState = "idle" | "running" | "complete" | "error";

interface AuditResult {
  id: string;
  url: string;
  overall_score: number;
  overall_grade: string;
  total_checks: number;
  total_passed: number;
  total_failed: number;
  total_critical: number;
  pages_crawled: number;
  audit_duration_ms: number;
  category_results: Record<string, {
    score: number;
    grade: string;
    passed: number;
    failed: number;
    critical_issues: number;
    checks: Array<{
      name: string;
      passed: boolean;
      severity: string;
      message: string;
      recommendation?: string;
    }>;
  }>;
  recommendations: Array<{
    category: string;
    severity: string;
    title: string;
    description: string;
    recommendation?: string;
    page_url?: string;
  }>;
  error_message?: string;
}

export default function QuickAuditPage() {
  const [url, setUrl] = useState("");
  const [state, setState] = useState<AuditState>("idle");
  const [auditId, setAuditId] = useState<string | null>(null);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;

    setState("running");
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/seo/audits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to start audit");
      }

      const data = await res.json();
      setAuditId(data.id);
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  }

  const handleComplete = useCallback(async () => {
    if (!auditId) return;
    try {
      const res = await fetch(`/api/seo/audits/${auditId}`);
      if (!res.ok) throw new Error("Failed to fetch results");
      const data = await res.json();

      if (data.status === "failed") {
        setState("error");
        setError(data.error_message || "Audit failed");
        return;
      }

      setResult(data);
      setState("complete");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  }, [auditId]);

  return (
    <div className="space-y-6 max-w-[1000px]">
      <div>
        <h1 className="text-[24px] font-bold text-text">Quick SEO Audit</h1>
        <p className="text-[14px] text-text-dim mt-1">
          Enter a URL to run a comprehensive 12-category SEO analysis.
        </p>
      </div>

      {/* Input form */}
      <Card>
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 px-4 h-10 rounded-lg bg-bg border border-border text-text text-[14px] outline-none focus:border-accent/40 transition-colors placeholder:text-text-muted"
            disabled={state === "running"}
          />
          <Button type="submit" disabled={!url.trim() || state === "running"}>
            {state === "running" ? "Auditing..." : "Run Audit"}
          </Button>
        </form>
      </Card>

      {/* Progress */}
      {state === "running" && auditId && (
        <Card>
          <AuditProgress auditId={auditId} onComplete={handleComplete} />
        </Card>
      )}

      {/* Error */}
      {state === "error" && error && (
        <Card className="border-danger/30">
          <div className="flex items-center gap-3">
            <span className="text-danger text-[18px]">✗</span>
            <div>
              <p className="text-[14px] font-medium text-danger">Audit Failed</p>
              <p className="text-[13px] text-text-dim mt-0.5">{error}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Results */}
      {state === "complete" && result && (
        <>
          {/* Hero score */}
          <Card>
            <div className="flex items-center gap-8 flex-wrap">
              <ScoreRing score={result.overall_score} grade={result.overall_grade} />
              <div className="flex-1 min-w-[240px]">
                <p className="text-[18px] font-bold text-text break-all">{result.url}</p>
                <p className="text-[13px] text-text-dim mt-1">
                  {result.pages_crawled} pages crawled · {Math.round((result.audit_duration_ms || 0) / 1000)}s
                </p>
                <div className="grid grid-cols-4 gap-3 mt-4">
                  <div className="text-center">
                    <p className="text-[20px] font-extrabold text-text">{result.total_checks}</p>
                    <p className="text-[11px] text-text-dim font-medium uppercase tracking-wider">Checks</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[20px] font-extrabold text-accent">{result.total_passed}</p>
                    <p className="text-[11px] text-text-dim font-medium uppercase tracking-wider">Passed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[20px] font-extrabold text-danger">{result.total_failed}</p>
                    <p className="text-[11px] text-text-dim font-medium uppercase tracking-wider">Failed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[20px] font-extrabold text-danger">{result.total_critical}</p>
                    <p className="text-[11px] text-text-dim font-medium uppercase tracking-wider">Critical</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <a
                  href={`/api/seo/audits/${result.id}/report`}
                  className="inline-flex items-center gap-2 px-4 h-10 rounded-lg text-[14px] bg-card border border-border text-text hover:bg-card-hover transition-colors"
                >
                  <DownloadIcon />
                  Export Report
                </a>
                <a
                  href={`/seo/audits/${result.id}`}
                  className="inline-flex items-center gap-2 px-4 h-10 rounded-lg text-[14px] bg-accent text-bg hover:bg-accent-hover font-semibold transition-colors"
                >
                  Full Details
                </a>
              </div>
            </div>
          </Card>

          {/* Priority Recommendations */}
          <div>
            <h2 className="text-[11px] font-bold text-accent uppercase tracking-[0.15em] mb-3 pb-2 border-b border-border">
              Priority Recommendations
            </h2>
            <RecommendationList recommendations={result.recommendations} />
          </div>

          {/* Category Scores */}
          <div>
            <h2 className="text-[11px] font-bold text-accent uppercase tracking-[0.15em] mb-3 pb-2 border-b border-border">
              Category Scores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(result.category_results).map(([key, cat]) => (
                <CategoryCard key={key} categoryKey={key} result={cat} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
