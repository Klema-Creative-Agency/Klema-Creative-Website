"use client";

import { Badge } from "@/components/ui/Badge";

interface Recommendation {
  category: string;
  severity: string;
  title: string;
  description: string;
  recommendation?: string;
  page_url?: string;
}

export function RecommendationList({
  recommendations,
  limit = 15,
}: {
  recommendations: Recommendation[];
  limit?: number;
}) {
  if (!recommendations.length) {
    return (
      <p className="text-text-dim text-[14px] py-6 text-center">
        No issues found — great job!
      </p>
    );
  }

  const sorted = [...recommendations].sort((a, b) => {
    const order = { critical: 0, warning: 1, info: 2 };
    return (order[a.severity as keyof typeof order] ?? 3) - (order[b.severity as keyof typeof order] ?? 3);
  });

  return (
    <div className="space-y-2">
      {sorted.slice(0, limit).map((rec, i) => (
        <div
          key={i}
          className={`flex gap-3 px-4 py-3.5 bg-surface border border-border rounded-xl ${
            rec.severity === "critical"
              ? "border-l-[3px] border-l-danger"
              : rec.severity === "warning"
                ? "border-l-[3px] border-l-warning"
                : "border-l-[3px] border-l-info"
          }`}
        >
          <span className="text-[15px] font-extrabold text-text-dim w-6 text-center flex-shrink-0">
            {i + 1}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={rec.severity === "critical" ? "danger" : rec.severity === "warning" ? "warning" : "info"}>
                {rec.severity}
              </Badge>
              <span className="text-[13px] font-semibold text-text">{rec.title}</span>
              <span className="text-[11px] text-text-muted">({rec.category})</span>
            </div>
            <p className="text-[12px] text-text-dim mt-1 leading-relaxed">
              {rec.recommendation || rec.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
