import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { clientService, queryAll } from "@klema/db";
import { getTierPortalFeatures, getTier } from "@klema/shared";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Stat } from "@/components/ui/Stat";
import { Bar } from "@/components/ui/Bar";
import { Badge } from "@/components/ui/Badge";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ client?: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const params = await searchParams;
  const isInternal = session.user.role === "owner" || session.user.role === "team_member";

  // Determine which client to show
  let clientId = session.user.clientId;

  if (isInternal) {
    // Owner/team: use ?client= param or show client picker
    if (params.client) {
      clientId = params.client;
    } else {
      // Show client list
      const allClients = await clientService.getAll();
      return (
        <div className="space-y-6">
          <h1 className="text-[24px] font-bold text-text">Select a Client</h1>
          <p className="text-[14px] text-text-dim">Choose a client to view their dashboard.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allClients.map((c: Record<string, unknown>) => (
              <a
                key={c.id as string}
                href={`/dashboard?client=${c.id}`}
                className="bg-card border border-border rounded-2xl p-5 hover:bg-card-hover hover:border-accent/20 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-accent-dim flex items-center justify-center">
                    <span className="text-[16px] font-bold text-accent">
                      {(c.name as string).charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-[15px] font-semibold text-text">{c.name as string}</p>
                    <p className="text-[12px] text-text-dim">
                      {getTier(c.tier_id as number).name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[12px]">
                  <Badge variant={c.status === "active" ? "accent" : "warning"}>
                    {c.status as string}
                  </Badge>
                  <span className="text-text-muted">
                    {c.open_tasks as number} open tasks
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      );
    }
  }

  if (!clientId) redirect("/login");

  const data = await clientService.getDashboard(clientId);
  if (!data.client) redirect("/login");

  const tierId = (data.client as Record<string, unknown>).tier_id as number;
  const features = getTierPortalFeatures(tierId);
  const report = data.latestReport as Record<string, unknown> | null;
  const reportData = (report?.report_data ?? {}) as {
    traffic?: { sessions?: number; users?: number; pageviews?: number; newUsers?: number };
  };
  const traffic = reportData.traffic;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] font-bold text-text">Dashboard</h1>
        {isInternal && (
          <a href="/dashboard" className="text-[13px] text-accent hover:underline">
            Switch client
          </a>
        )}
      </div>

      {/* Traffic Stats */}
      {traffic && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Stat label="Sessions" value={traffic.sessions?.toLocaleString() ?? "—"} change={23} changeLabel="vs last month" />
          <Stat label="Users" value={traffic.users?.toLocaleString() ?? "—"} change={18} />
          <Stat label="Pageviews" value={traffic.pageviews?.toLocaleString() ?? "—"} change={31} />
          <Stat label="New Users" value={traffic.newUsers?.toLocaleString() ?? "—"} change={12} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deliverables Progress */}
        {data.currentPeriod && (
          <Card>
            <CardHeader>
              <CardTitle>Deliverables Progress</CardTitle>
            </CardHeader>
            <div className="space-y-4">
              <Bar
                label="Blog Posts"
                value={(data.currentPeriod as Record<string, number>).actual_blogs ?? 0}
                max={(data.currentPeriod as Record<string, number>).target_blogs ?? 0}
              />
              <Bar
                label="Social Posts"
                value={(data.currentPeriod as Record<string, number>).actual_social_posts ?? 0}
                max={(data.currentPeriod as Record<string, number>).target_social_posts ?? 0}
              />
            </div>
          </Card>
        )}

        {/* Top Keywords */}
        {data.keywords.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Top Keywords</CardTitle>
            </CardHeader>
            <div className="space-y-2">
              {data.keywords.slice(0, 5).map((kw: Record<string, unknown>) => (
                <div key={kw.id as string} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-[13px] text-text">{kw.keyword as string}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] font-medium text-text">#{kw.current_position as number}</span>
                    {(kw.change as number) > 0 && (
                      <span className="text-[11px] text-accent">+{kw.change as number}</span>
                    )}
                    {(kw.change as number) < 0 && (
                      <span className="text-[11px] text-danger">{kw.change as number}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Lead Pipeline (Tier 2+) */}
        {features.leadDashboard && data.leads.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Leads</CardTitle>
            </CardHeader>
            <div className="space-y-2">
              {data.leads.slice(0, 5).map((lead: Record<string, unknown>) => (
                <div key={lead.id as string} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-[13px] font-medium text-text">{lead.name as string}</p>
                    <p className="text-[11px] text-text-dim">{(lead.source as string).replace("_", " ")}</p>
                  </div>
                  <Badge variant={lead.status as string}>{(lead.status as string).replace("_", " ")}</Badge>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* LLM Visibility (Tier 2+) */}
        {features.llmVisibility && data.llmVisibility && (
          <Card>
            <CardHeader>
              <CardTitle>LLM Visibility</CardTitle>
            </CardHeader>
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-28 h-28 relative mb-3">
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 112 112">
                  <circle cx="56" cy="56" r="50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                  <circle
                    cx="56" cy="56" r="50"
                    fill="none"
                    stroke="#4ade80"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${((data.llmVisibility as Record<string, number>).overall_score / 100) * 314.2} 314.2`}
                  />
                </svg>
                <span className="text-[20px] font-bold text-accent">
                  {Math.round((data.llmVisibility as Record<string, number>).overall_score)}%
                </span>
              </div>
              <p className="text-[13px] text-text-dim">Overall Visibility Score</p>
            </div>
            <div className="space-y-3 mt-4">
              {(["chatgpt", "gemini", "claude", "perplexity", "copilot"] as const).map((llm) => {
                const score = (data.llmVisibility as Record<string, number>)[`${llm}_score`];
                return score != null ? (
                  <div key={llm} className="flex items-center justify-between">
                    <span className="text-[13px] text-text-dim capitalize">{llm}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-border rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full" style={{ width: `${score}%` }} />
                      </div>
                      <span className="text-[12px] font-medium text-text w-10 text-right">{score}%</span>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
