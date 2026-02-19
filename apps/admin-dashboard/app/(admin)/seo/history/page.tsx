"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface Audit {
  id: string;
  url: string;
  audit_type: string;
  status: string;
  overall_score: number | null;
  overall_grade: string | null;
  pages_crawled: number;
  audit_duration_ms: number | null;
  created_at: string;
}

function scoreVariant(score: number): string {
  if (score >= 90) return "accent";
  if (score >= 70) return "info";
  if (score >= 50) return "warning";
  return "danger";
}

export default function AuditHistoryPage() {
  const [audits, setAudits] = useState<Audit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const res = await fetch("/api/seo/audits");
      if (res.ok && !cancelled) setAudits(await res.json());
      if (!cancelled) setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-bold text-text">Audit History</h1>
          <p className="text-[14px] text-text-dim mt-1">{audits.length} audits total</p>
        </div>
        <Link
          href="/seo/quick"
          className="inline-flex items-center gap-2 px-4 h-10 rounded-lg text-[14px] bg-accent text-bg hover:bg-accent-hover font-semibold transition-colors"
        >
          New Audit
        </Link>
      </div>

      {loading ? (
        <p className="text-text-dim text-[14px]">Loading...</p>
      ) : audits.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-text-dim text-[14px]">No audits yet.</p>
          <Link href="/seo/quick" className="text-accent text-[14px] mt-2 inline-block">
            Run your first audit →
          </Link>
        </Card>
      ) : (
        <Card className="!p-0 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-[12px] font-medium text-text-dim uppercase tracking-wider px-6 py-3">URL</th>
                <th className="text-left text-[12px] font-medium text-text-dim uppercase tracking-wider px-6 py-3">Score</th>
                <th className="text-left text-[12px] font-medium text-text-dim uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-left text-[12px] font-medium text-text-dim uppercase tracking-wider px-6 py-3">Pages</th>
                <th className="text-left text-[12px] font-medium text-text-dim uppercase tracking-wider px-6 py-3">Duration</th>
                <th className="text-left text-[12px] font-medium text-text-dim uppercase tracking-wider px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {audits.map((audit) => (
                <tr key={audit.id} className="border-b border-border last:border-0 hover:bg-card-hover transition-colors">
                  <td className="px-6 py-3">
                    <Link
                      href={audit.status === "completed" ? `/seo/audits/${audit.id}` : "#"}
                      className="text-[14px] text-text font-medium hover:text-accent truncate block max-w-[300px]"
                    >
                      {audit.url}
                    </Link>
                  </td>
                  <td className="px-6 py-3">
                    {audit.overall_score != null ? (
                      <Badge variant={scoreVariant(audit.overall_score)}>
                        {audit.overall_score} ({audit.overall_grade})
                      </Badge>
                    ) : (
                      <span className="text-[13px] text-text-dim">—</span>
                    )}
                  </td>
                  <td className="px-6 py-3">
                    <Badge variant={
                      audit.status === "completed" ? "accent"
                        : audit.status === "running" ? "info"
                          : audit.status === "failed" ? "danger"
                            : "default"
                    }>
                      {audit.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-3 text-[13px] text-text-dim">
                    {audit.pages_crawled || "—"}
                  </td>
                  <td className="px-6 py-3 text-[13px] text-text-dim">
                    {audit.audit_duration_ms ? `${Math.round(audit.audit_duration_ms / 1000)}s` : "—"}
                  </td>
                  <td className="px-6 py-3 text-[13px] text-text-dim">
                    {new Date(audit.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
