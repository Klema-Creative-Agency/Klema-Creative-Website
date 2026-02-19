"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { AuditProgress } from "@/components/seo/AuditProgress";

interface Audit {
  id: string;
  url: string;
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

export default function ClientSeoPage() {
  const { id: clientId } = useParams<{ id: string }>();
  const [audits, setAudits] = useState<Audit[]>([]);
  const [loading, setLoading] = useState(true);
  const [runningId, setRunningId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const res = await fetch(`/api/seo/audits?clientId=${clientId}`);
      if (res.ok && !cancelled) setAudits(await res.json());
      if (!cancelled) setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, [clientId, refreshKey]);

  function refresh() { setRefreshKey((k) => k + 1); }

  async function handleRunAudit() {
    // Get client info to find their website URL
    const clientRes = await fetch(`/api/clients/${clientId}`);
    if (!clientRes.ok) return;
    const client = await clientRes.json();

    if (!client.website) {
      alert("This client doesn't have a website URL set. Add one in their profile first.");
      return;
    }

    const res = await fetch("/api/seo/audits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: client.website,
        clientId,
        clientName: client.name,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      setRunningId(data.id);
    }
  }

  const handleComplete = useCallback(() => {
    setRunningId(null);
    refresh();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/clients/${clientId}`} className="text-text-dim hover:text-text text-[13px]">← Overview</Link>
          <h1 className="text-[24px] font-bold text-text">SEO Audits</h1>
          <span className="text-[14px] text-text-dim">{audits.length} audit{audits.length !== 1 ? "s" : ""}</span>
        </div>
        <Button onClick={handleRunAudit} disabled={!!runningId}>
          {runningId ? "Running..." : "Run Audit"}
        </Button>
      </div>

      {/* In-progress audit */}
      {runningId && (
        <Card>
          <AuditProgress auditId={runningId} onComplete={handleComplete} />
        </Card>
      )}

      {/* Audit list */}
      {loading ? (
        <p className="text-text-dim text-[14px]">Loading...</p>
      ) : audits.length === 0 && !runningId ? (
        <Card className="text-center py-12">
          <p className="text-text-dim text-[14px]">No SEO audits yet for this client.</p>
          <p className="text-[13px] text-text-muted mt-1">Click "Run Audit" to start the first one.</p>
        </Card>
      ) : (
        <Card className="!p-0 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-[12px] font-medium text-text-dim uppercase tracking-wider px-6 py-3">URL</th>
                <th className="text-left text-[12px] font-medium text-text-dim uppercase tracking-wider px-6 py-3">Score</th>
                <th className="text-left text-[12px] font-medium text-text-dim uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-left text-[12px] font-medium text-text-dim uppercase tracking-wider px-6 py-3">Date</th>
                <th className="text-left text-[12px] font-medium text-text-dim uppercase tracking-wider px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {audits.map((audit) => (
                <tr key={audit.id} className="border-b border-border last:border-0 hover:bg-card-hover transition-colors">
                  <td className="px-6 py-3 text-[14px] text-text font-medium truncate max-w-[300px]">
                    {audit.url}
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
                    {new Date(audit.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3">
                    {audit.status === "completed" && (
                      <Link href={`/seo/audits/${audit.id}`} className="text-[13px] text-accent hover:underline">
                        View →
                      </Link>
                    )}
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
