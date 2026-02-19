"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ScoreRing } from "@/components/seo/ScoreRing";
import { CategoryCard } from "@/components/seo/CategoryCard";
import { RecommendationList } from "@/components/seo/RecommendationList";

interface AuditDetail {
  id: string;
  url: string;
  status: string;
  overall_score: number;
  overall_grade: string;
  total_checks: number;
  total_passed: number;
  total_failed: number;
  total_critical: number;
  pages_crawled: number;
  crawl_duration_ms: number;
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
  created_at: string;
}

export default function AuditDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [audit, setAudit] = useState<AuditDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const res = await fetch(`/api/seo/audits/${id}`);
      if (res.ok && !cancelled) setAudit(await res.json());
      if (!cancelled) setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, [id]);

  if (loading) {
    return <p className="text-text-dim text-[14px]">Loading audit...</p>;
  }

  if (!audit) {
    return (
      <Card className="text-center py-12">
        <p className="text-text-dim text-[14px]">Audit not found.</p>
        <Link href="/seo/history" className="text-accent text-[14px] mt-2 inline-block">
          ← Back to history
        </Link>
      </Card>
    );
  }

  if (audit.status === "failed") {
    return (
      <div className="space-y-4">
        <Link href="/seo/history" className="text-text-dim hover:text-text text-[13px]">← Audit History</Link>
        <Card className="border-danger/30">
          <p className="text-[16px] font-bold text-danger">Audit Failed</p>
          <p className="text-[14px] text-text-dim mt-1">{audit.url}</p>
          <p className="text-[13px] text-text-dim mt-2">{audit.error_message}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1000px]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3">
        <Link href="/seo/history" className="text-text-dim hover:text-text text-[13px]">← Audit History</Link>
        <span className="text-text-muted text-[13px]">/</span>
        <span className="text-text text-[13px] font-medium truncate max-w-[300px]">{audit.url}</span>
      </div>

      {/* Hero score */}
      <Card>
        <div className="flex items-center gap-8 flex-wrap">
          <ScoreRing score={audit.overall_score} grade={audit.overall_grade} />
          <div className="flex-1 min-w-[240px]">
            <p className="text-[18px] font-bold text-text break-all">{audit.url}</p>
            <p className="text-[13px] text-text-dim mt-1">
              {audit.pages_crawled} pages crawled · {Math.round((audit.audit_duration_ms || 0) / 1000)}s
              · {new Date(audit.created_at).toLocaleDateString()}
            </p>
            <div className="grid grid-cols-4 gap-3 mt-4">
              <StatBox value={audit.total_checks} label="Checks" />
              <StatBox value={audit.total_passed} label="Passed" className="text-accent" />
              <StatBox value={audit.total_failed} label="Failed" className="text-danger" />
              <StatBox value={audit.total_critical} label="Critical" className="text-danger" />
            </div>
          </div>
          <a
            href={`/api/seo/audits/${audit.id}/report`}
            className="inline-flex items-center gap-2 px-4 h-10 rounded-lg text-[14px] bg-card border border-border text-text hover:bg-card-hover transition-colors"
          >
            Export Report
          </a>
        </div>
      </Card>

      {/* Priority Recommendations */}
      <div>
        <h2 className="text-[11px] font-bold text-accent uppercase tracking-[0.15em] mb-3 pb-2 border-b border-border">
          Priority Recommendations
        </h2>
        <RecommendationList recommendations={audit.recommendations || []} />
      </div>

      {/* Category Scores */}
      <div>
        <h2 className="text-[11px] font-bold text-accent uppercase tracking-[0.15em] mb-3 pb-2 border-b border-border">
          Category Scores
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(audit.category_results || {}).map(([key, cat]) => (
            <CategoryCard key={key} categoryKey={key} result={cat} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StatBox({ value, label, className = "text-text" }: { value: number; label: string; className?: string }) {
  return (
    <div className="text-center">
      <p className={`text-[20px] font-extrabold ${className}`}>{value}</p>
      <p className="text-[11px] text-text-dim font-medium uppercase tracking-wider">{label}</p>
    </div>
  );
}
