"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface Report {
  id: string;
  status: string;
  month: number;
  year: number;
  executive_summary: string | null;
  insights: string | null;
  report_data: {
    traffic?: { sessions?: number; users?: number; pageviews?: number };
    highlights?: string[];
  };
  published_at: string | null;
  created_at: string;
}

const MONTH_NAMES = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reports")
      .then((r) => r.json())
      .then((data) => {
        setReports(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-text-dim text-[14px]">Loading reports...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-[24px] font-bold text-text">Monthly Reports</h1>

      {reports.length === 0 ? (
        <Card className="py-12 text-center">
          <p className="text-[14px] text-text-dim">No reports yet</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {reports.map((report) => (
            <Card key={report.id} className="!p-0 overflow-hidden">
              <button
                onClick={() => setExpandedId(expandedId === report.id ? null : report.id)}
                className="w-full text-left p-5 flex items-center justify-between hover:bg-card-hover transition-colors"
              >
                <div>
                  <p className="text-[15px] font-semibold text-text">
                    {report.month ? `${MONTH_NAMES[report.month]} ${report.year}` : "Report"}
                  </p>
                  {report.executive_summary && (
                    <p className="text-[13px] text-text-dim mt-1 line-clamp-1">
                      {report.executive_summary}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={report.status === "published" ? "accent" : "warning"}>
                    {report.status}
                  </Badge>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`text-text-dim transition-transform ${expandedId === report.id ? "rotate-180" : ""}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </button>

              {expandedId === report.id && (
                <div className="px-5 pb-5 border-t border-border pt-4 space-y-4">
                  {report.executive_summary && (
                    <div>
                      <p className="text-[12px] font-medium text-text-dim uppercase tracking-wider mb-2">Executive Summary</p>
                      <p className="text-[14px] text-text leading-relaxed">{report.executive_summary}</p>
                    </div>
                  )}

                  {report.report_data.highlights && report.report_data.highlights.length > 0 && (
                    <div>
                      <p className="text-[12px] font-medium text-text-dim uppercase tracking-wider mb-2">Highlights</p>
                      <ul className="space-y-1.5">
                        {report.report_data.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2 text-[13px] text-text">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {report.insights && (
                    <div>
                      <p className="text-[12px] font-medium text-text-dim uppercase tracking-wider mb-2">Insights</p>
                      <p className="text-[14px] text-text leading-relaxed">{report.insights}</p>
                    </div>
                  )}

                  {report.report_data.traffic && (
                    <div>
                      <p className="text-[12px] font-medium text-text-dim uppercase tracking-wider mb-2">Traffic</p>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-surface rounded-xl p-3">
                          <p className="text-[11px] text-text-dim">Sessions</p>
                          <p className="text-[18px] font-bold text-text">{report.report_data.traffic.sessions?.toLocaleString()}</p>
                        </div>
                        <div className="bg-surface rounded-xl p-3">
                          <p className="text-[11px] text-text-dim">Users</p>
                          <p className="text-[18px] font-bold text-text">{report.report_data.traffic.users?.toLocaleString()}</p>
                        </div>
                        <div className="bg-surface rounded-xl p-3">
                          <p className="text-[11px] text-text-dim">Pageviews</p>
                          <p className="text-[18px] font-bold text-text">{report.report_data.traffic.pageviews?.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
