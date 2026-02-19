"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";

interface Step {
  id: string;
  phase: number;
  phase_name: string;
  step_order: number;
  task: string;
  owner: string;
  target_day: number;
  status: string;
  completed_at: string | null;
}

export default function ClientOnboardingPage() {
  const { id: clientId } = useParams<{ id: string }>();
  const [steps, setSteps] = useState<Step[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const res = await fetch(`/api/clients/${clientId}/onboarding/list`);
      if (res.ok && !cancelled) {
        const data = await res.json();
        setSteps(data.steps);
      }
      if (!cancelled) setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, [clientId, refreshKey]);

  function refresh() { setRefreshKey((k) => k + 1); }

  async function toggleStep(stepId: string) {
    await fetch(`/api/clients/${clientId}/onboarding/${stepId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "completed" }),
    });
    refresh();
  }

  // Group by phase
  const byPhase: Record<number, { name: string; steps: Step[] }> = {};
  steps.forEach((step) => {
    if (!byPhase[step.phase]) {
      byPhase[step.phase] = { name: step.phase_name, steps: [] };
    }
    byPhase[step.phase].steps.push(step);
  });

  const totalSteps = steps.length;
  const completedSteps = steps.filter((s) => s.status === "completed").length;
  const pct = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/clients/${clientId}`} className="text-text-dim hover:text-text text-[13px]">&larr; Overview</Link>
          <h1 className="text-[24px] font-bold text-text">Onboarding</h1>
        </div>
        <div className="text-right">
          <p className="text-[24px] font-bold text-accent">{pct}%</p>
          <p className="text-[12px] text-text-dim">{completedSteps}/{totalSteps} steps</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      {loading ? (
        <p className="text-text-dim text-[14px]">Loading...</p>
      ) : (
        <div className="space-y-6">
          {Object.entries(byPhase)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([phase, group]) => {
              const phaseCompleted = group.steps.filter((s) => s.status === "completed").length;
              return (
                <Card key={phase} className="!p-0 overflow-hidden">
                  <CardHeader className="!mb-0 px-6 py-4 border-b border-border flex items-center justify-between">
                    <CardTitle>Phase {phase}: {group.name}</CardTitle>
                    <span className="text-[12px] text-text-dim">
                      {phaseCompleted}/{group.steps.length}
                    </span>
                  </CardHeader>
                  <div>
                    {group.steps.map((step) => (
                      <div
                        key={step.id}
                        className="flex items-center gap-4 px-6 py-3 border-b border-border last:border-0 hover:bg-card-hover transition-colors"
                      >
                        <button
                          onClick={() => {
                            if (step.status !== "completed") toggleStep(step.id);
                          }}
                          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors shrink-0 ${
                            step.status === "completed"
                              ? "bg-accent border-accent"
                              : "border-border hover:border-accent/40"
                          }`}
                        >
                          {step.status === "completed" && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-bg">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </button>
                        <div className="flex-1 min-w-0">
                          <p className={`text-[14px] ${step.status === "completed" ? "text-text-dim line-through" : "text-text"}`}>
                            {step.task}
                          </p>
                          <p className="text-[12px] text-text-muted capitalize">
                            {step.owner.replace("_", " ")} &middot; Day {step.target_day}
                          </p>
                        </div>
                        <Badge variant={step.status === "completed" ? "completed" : "pending"}>
                          {step.status === "completed" ? "Done" : "Pending"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
        </div>
      )}
    </div>
  );
}
