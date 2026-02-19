"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";

interface Keyword {
  id: string;
  keyword: string;
  position: number;
  previous_position: number | null;
  url: string | null;
  tracked_at: string;
}

export default function ClientKeywordsPage() {
  const { id: clientId } = useParams<{ id: string }>();
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [showBatch, setShowBatch] = useState(false);
  const [batchText, setBatchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const res = await fetch(`/api/keywords/batch?clientId=${clientId}`);
      if (res.ok && !cancelled) setKeywords(await res.json());
      if (!cancelled) setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, [clientId, refreshKey]);

  function refresh() { setRefreshKey((k) => k + 1); }

  async function handleBatchUpdate() {
    // Parse format: "keyword, position" per line
    const lines = batchText.trim().split("\n").filter(Boolean);
    const parsed = lines.map((line) => {
      const parts = line.split(",").map((s) => s.trim());
      return {
        keyword: parts[0],
        position: Number(parts[1]) || 0,
        url: parts[2] || undefined,
      };
    });

    // For each new entry, find previous position from existing data
    const withPrevious = parsed.map((kw) => {
      const existing = keywords.find((k) => k.keyword.toLowerCase() === kw.keyword.toLowerCase());
      return {
        ...kw,
        previous_position: existing?.position,
      };
    });

    await fetch("/api/keywords/batch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientId, keywords: withPrevious }),
    });
    setShowBatch(false);
    setBatchText("");
    refresh();
  }

  // Deduplicate to latest per keyword
  const latestByKeyword = new Map<string, Keyword>();
  keywords.forEach((kw) => {
    if (!latestByKeyword.has(kw.keyword)) {
      latestByKeyword.set(kw.keyword, kw);
    }
  });
  const uniqueKeywords = Array.from(latestByKeyword.values());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/clients/${clientId}`} className="text-text-dim hover:text-text text-[13px]">&larr; Overview</Link>
          <h1 className="text-[24px] font-bold text-text">Keywords</h1>
          <span className="text-[14px] text-text-dim">{uniqueKeywords.length} tracked</span>
        </div>
        <Button onClick={() => setShowBatch(true)}>Batch Update</Button>
      </div>

      {loading ? (
        <p className="text-text-dim text-[14px]">Loading...</p>
      ) : uniqueKeywords.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-text-dim text-[14px]">No keywords tracked yet.</p>
        </Card>
      ) : (
        <Card className="!p-0 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-[12px] font-medium text-text-dim uppercase tracking-wider px-6 py-3">Keyword</th>
                <th className="text-left text-[12px] font-medium text-text-dim uppercase tracking-wider px-6 py-3">Position</th>
                <th className="text-left text-[12px] font-medium text-text-dim uppercase tracking-wider px-6 py-3">Change</th>
                <th className="text-left text-[12px] font-medium text-text-dim uppercase tracking-wider px-6 py-3">URL</th>
                <th className="text-left text-[12px] font-medium text-text-dim uppercase tracking-wider px-6 py-3">Tracked</th>
              </tr>
            </thead>
            <tbody>
              {uniqueKeywords.map((kw) => {
                const change = kw.previous_position ? kw.previous_position - kw.position : null;
                return (
                  <tr key={kw.id} className="border-b border-border last:border-0 hover:bg-card-hover transition-colors">
                    <td className="px-6 py-3 text-[14px] text-text font-medium">{kw.keyword}</td>
                    <td className="px-6 py-3">
                      <span className="text-[18px] font-bold text-text">{kw.position}</span>
                    </td>
                    <td className="px-6 py-3">
                      {change !== null ? (
                        <span className={`text-[14px] font-medium ${change > 0 ? "text-accent" : change < 0 ? "text-danger" : "text-text-dim"}`}>
                          {change > 0 ? `+${change}` : change === 0 ? "—" : change}
                        </span>
                      ) : (
                        <span className="text-[13px] text-text-dim">New</span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-[13px] text-text-dim truncate max-w-[200px]">{kw.url || "—"}</td>
                    <td className="px-6 py-3 text-[13px] text-text-dim">
                      {new Date(kw.tracked_at).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      )}

      <Modal open={showBatch} onClose={() => setShowBatch(false)} title="Batch Keyword Update">
        <div className="space-y-4">
          <p className="text-[13px] text-text-dim">
            Enter one keyword per line in format: <code className="text-accent">keyword, position, url (optional)</code>
          </p>
          <textarea
            value={batchText}
            onChange={(e) => setBatchText(e.target.value)}
            rows={10}
            placeholder={"plumber san antonio, 3, /plumbing-services\nemergency plumber, 7\nplumbing repair, 12"}
            className="w-full px-3 py-2.5 rounded-lg bg-card border border-border text-text text-[13px] font-mono outline-none focus:border-accent/40 transition-colors placeholder:text-text-muted resize-none"
          />
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setShowBatch(false)}>Cancel</Button>
            <Button onClick={handleBatchUpdate} disabled={!batchText.trim()}>
              Update {batchText.trim().split("\n").filter(Boolean).length} Keywords
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
