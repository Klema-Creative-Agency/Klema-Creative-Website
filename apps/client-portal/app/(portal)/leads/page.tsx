"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Stat } from "@/components/ui/Stat";
import { Badge } from "@/components/ui/Badge";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  source: string;
  status: string;
  score: number;
  created_at: string;
}

interface LeadStats {
  total: number;
  thisMonth: number;
  avgResponseMinutes: number;
  byStatus: Record<string, number>;
}

const FUNNEL_STAGES = [
  { key: "new", label: "New", color: "bg-info" },
  { key: "contacted", label: "Contacted", color: "bg-warning" },
  { key: "qualified", label: "Qualified", color: "bg-accent" },
  { key: "appointment_set", label: "Appointment", color: "bg-accent" },
  { key: "converted", label: "Converted", color: "bg-accent" },
  { key: "lost", label: "Lost", color: "bg-danger" },
];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<LeadStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/leads").then((r) => r.json()),
      // Stats endpoint needs clientId — we'll get it from the session via a simple approach
      fetch("/api/leads").then((r) => r.json()),
    ]).then(([leadsData]) => {
      setLeads(leadsData);
      setLoading(false);
    });
  }, []);

  // Calculate stats from leads data
  useEffect(() => {
    if (leads.length === 0) return;
    const now = new Date();
    const thisMonthLeads = leads.filter((l) => {
      const d = new Date(l.created_at);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
    const byStatus: Record<string, number> = {};
    leads.forEach((l) => {
      byStatus[l.status] = (byStatus[l.status] || 0) + 1;
    });
    setStats({
      total: leads.length,
      thisMonth: thisMonthLeads.length,
      avgResponseMinutes: 0,
      byStatus,
    });
  }, [leads]);

  if (loading) {
    return <div className="text-text-dim text-[14px]">Loading leads...</div>;
  }

  const maxFunnel = stats ? Math.max(...Object.values(stats.byStatus), 1) : 1;

  return (
    <div className="space-y-6">
      <h1 className="text-[24px] font-bold text-text">Leads</h1>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Stat label="Total Leads" value={stats.total} />
          <Stat label="This Month" value={stats.thisMonth} />
          <Stat label="Converted" value={stats.byStatus.converted ?? 0} />
          <Stat label="Active" value={stats.total - (stats.byStatus.converted ?? 0) - (stats.byStatus.lost ?? 0)} />
        </div>
      )}

      {/* Funnel Viz */}
      {stats && (
        <Card>
          <CardHeader>
            <CardTitle>Lead Funnel</CardTitle>
          </CardHeader>
          <div className="space-y-3">
            {FUNNEL_STAGES.map((stage) => {
              const count = stats.byStatus[stage.key] ?? 0;
              const width = (count / maxFunnel) * 100;
              return (
                <div key={stage.key} className="flex items-center gap-3">
                  <span className="text-[12px] text-text-dim w-24 text-right">{stage.label}</span>
                  <div className="flex-1 h-7 bg-surface rounded-lg overflow-hidden relative">
                    <div
                      className={`h-full ${stage.color} rounded-lg transition-all duration-500 flex items-center px-3`}
                      style={{ width: `${Math.max(width, count > 0 ? 8 : 0)}%` }}
                    >
                      {count > 0 && (
                        <span className="text-[11px] font-bold text-bg">{count}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Lead List */}
      <Card>
        <CardHeader>
          <CardTitle>All Leads</CardTitle>
        </CardHeader>
        {leads.length === 0 ? (
          <p className="text-[14px] text-text-dim text-center py-8">No leads yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-[11px] font-medium text-text-dim uppercase tracking-wider py-2 pr-4">Name</th>
                  <th className="text-left text-[11px] font-medium text-text-dim uppercase tracking-wider py-2 pr-4">Source</th>
                  <th className="text-left text-[11px] font-medium text-text-dim uppercase tracking-wider py-2 pr-4">Score</th>
                  <th className="text-left text-[11px] font-medium text-text-dim uppercase tracking-wider py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-border last:border-0">
                    <td className="py-3 pr-4">
                      <p className="text-[13px] font-medium text-text">{lead.name}</p>
                      <p className="text-[11px] text-text-dim">{lead.email}</p>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="text-[12px] text-text-dim capitalize">{lead.source.replace("_", " ")}</span>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{
                          background: `conic-gradient(#4ade80 ${lead.score * 3.6}deg, rgba(255,255,255,0.06) 0deg)`,
                        }}>
                          <span className="text-[10px] font-bold text-text">{lead.score}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <Badge variant={lead.status}>{lead.status.replace("_", " ")}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
