"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";

interface Report {
  id: string;
  month: number;
  year: number;
  status: string;
  summary: string | null;
  highlights: string | null;
  insights: string | null;
  traffic_sessions: number | null;
  traffic_users: number | null;
  traffic_pageviews: number | null;
  published_at: string | null;
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function ClientReportsPage() {
  const { id: clientId } = useParams<{ id: string }>();
  const [reports, setReports] = useState<Report[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [editReport, setEditReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const res = await fetch(`/api/reports?clientId=${clientId}`);
      if (res.ok && !cancelled) setReports(await res.json());
      if (!cancelled) setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, [clientId, refreshKey]);

  function refresh() { setRefreshKey((k) => k + 1); }

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        month: Number(form.get("month")),
        year: Number(form.get("year")),
        summary: form.get("summary") || null,
      }),
    });
    setShowCreate(false);
    refresh();
  }

  async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editReport) return;
    const form = new FormData(e.currentTarget);
    await fetch(`/api/reports/${editReport.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        summary: form.get("summary"),
        highlights: form.get("highlights"),
        insights: form.get("insights"),
        traffic_sessions: Number(form.get("traffic_sessions")) || null,
        traffic_users: Number(form.get("traffic_users")) || null,
        traffic_pageviews: Number(form.get("traffic_pageviews")) || null,
      }),
    });
    setEditReport(null);
    refresh();
  }

  async function handlePublish(reportId: string) {
    await fetch(`/api/reports/${reportId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "published" }),
    });
    refresh();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/clients/${clientId}`} className="text-text-dim hover:text-text text-[13px]">&larr; Overview</Link>
          <h1 className="text-[24px] font-bold text-text">Reports</h1>
        </div>
        <Button onClick={() => setShowCreate(true)}>+ New Report</Button>
      </div>

      {loading ? (
        <p className="text-text-dim text-[14px]">Loading...</p>
      ) : reports.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-text-dim text-[14px]">No reports yet.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-[16px] font-semibold text-text">
                    {monthNames[report.month - 1]} {report.year}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={report.status}>{report.status}</Badge>
                    {report.published_at && (
                      <span className="text-[12px] text-text-dim">
                        Published {new Date(report.published_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" className="!h-8 !px-3 !text-[12px]" onClick={() => setEditReport(report)}>
                    Edit
                  </Button>
                  {report.status === "draft" && (
                    <Button className="!h-8 !px-3 !text-[12px]" onClick={() => handlePublish(report.id)}>
                      Publish
                    </Button>
                  )}
                </div>
              </div>

              {report.summary && (
                <p className="text-[14px] text-text-dim mb-3">{report.summary}</p>
              )}

              {(report.traffic_sessions || report.traffic_users || report.traffic_pageviews) && (
                <div className="grid grid-cols-3 gap-4 mt-3 pt-3 border-t border-border">
                  <div>
                    <p className="text-[11px] text-text-dim uppercase">Sessions</p>
                    <p className="text-[18px] font-bold text-text">{report.traffic_sessions?.toLocaleString() ?? "—"}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-text-dim uppercase">Users</p>
                    <p className="text-[18px] font-bold text-text">{report.traffic_users?.toLocaleString() ?? "—"}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-text-dim uppercase">Pageviews</p>
                    <p className="text-[18px] font-bold text-text">{report.traffic_pageviews?.toLocaleString() ?? "—"}</p>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Create modal */}
      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="New Report">
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input name="month" label="Month" type="number" min={1} max={12} defaultValue={new Date().getMonth() + 1} required />
            <Input name="year" label="Year" type="number" defaultValue={new Date().getFullYear()} required />
          </div>
          <Textarea name="summary" label="Summary" rows={3} placeholder="Monthly performance summary..." />
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button type="submit">Create Report</Button>
          </div>
        </form>
      </Modal>

      {/* Edit modal */}
      <Modal open={!!editReport} onClose={() => setEditReport(null)} title={editReport ? `Edit ${monthNames[editReport.month - 1]} ${editReport.year} Report` : ""}>
        {editReport && (
          <form onSubmit={handleEdit} className="space-y-4">
            <Textarea name="summary" label="Summary" rows={3} defaultValue={editReport.summary ?? ""} />
            <Textarea name="highlights" label="Highlights" rows={3} defaultValue={editReport.highlights ?? ""} placeholder="Key wins this month..." />
            <Textarea name="insights" label="Insights" rows={3} defaultValue={editReport.insights ?? ""} placeholder="Recommendations and next steps..." />
            <div className="grid grid-cols-3 gap-4">
              <Input name="traffic_sessions" label="Sessions" type="number" defaultValue={editReport.traffic_sessions ?? ""} />
              <Input name="traffic_users" label="Users" type="number" defaultValue={editReport.traffic_users ?? ""} />
              <Input name="traffic_pageviews" label="Pageviews" type="number" defaultValue={editReport.traffic_pageviews ?? ""} />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="ghost" onClick={() => setEditReport(null)}>Cancel</Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
