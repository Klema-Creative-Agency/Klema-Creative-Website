"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface ContentItem {
  id: string;
  type: string;
  title: string;
  status: string;
  platform: string | null;
  scheduled_date: string | null;
  published_at: string | null;
  created_at: string;
}

const TABS = [
  { key: "all", label: "All" },
  { key: "blog", label: "Blogs" },
  { key: "social_post", label: "Social" },
];

export default function ContentPage() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = activeTab !== "all" ? `?type=${activeTab}` : "";
    fetch(`/api/content${params}`)
      .then((r) => r.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, [activeTab]);

  function formatDate(dateStr: string | null) {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div className="space-y-6">
      <h1 className="text-[24px] font-bold text-text">Content Calendar</h1>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface border border-border rounded-xl p-1 w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => { setActiveTab(tab.key); setLoading(true); }}
            className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-card text-text"
                : "text-text-dim hover:text-text"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content List */}
      {loading ? (
        <p className="text-text-dim text-[14px]">Loading content...</p>
      ) : items.length === 0 ? (
        <Card className="py-12 text-center">
          <p className="text-[14px] text-text-dim">No content items yet</p>
        </Card>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <Card key={item.id} className="!p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    item.type === "blog" ? "bg-info-dim" : "bg-accent-dim"
                  }`}>
                    <span className={`text-[11px] font-bold ${
                      item.type === "blog" ? "text-info" : "text-accent"
                    }`}>
                      {item.type === "blog" ? "B" : "S"}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14px] font-medium text-text truncate">{item.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      {item.platform && (
                        <span className="text-[11px] text-text-dim capitalize">{item.platform}</span>
                      )}
                      <span className="text-[11px] text-text-muted">
                        {item.scheduled_date ? `Scheduled: ${formatDate(item.scheduled_date)}` : formatDate(item.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
                <Badge variant={item.status}>
                  {item.status.replace("_", " ")}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
