"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface Batch {
  id: string;
  name: string;
  status: string;
  total_urls: number;
  completed_urls: number;
  failed_urls: number;
  source_filename: string | null;
  created_at: string;
}

export default function BatchAuditsPage() {
  const [urls, setUrls] = useState("");
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const res = await fetch("/api/seo/batches");
      if (res.ok && !cancelled) setBatches(await res.json());
      if (!cancelled) setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, [refreshKey]);

  // Auto-refresh while any batch is running
  useEffect(() => {
    const hasRunning = batches.some((b) => b.status === "queued" || b.status === "running");
    if (!hasRunning) return;
    const interval = setInterval(() => setRefreshKey((k) => k + 1), 5000);
    return () => clearInterval(interval);
  }, [batches]);

  async function handleSubmit() {
    const urlList = urls
      .split("\n")
      .map((u) => u.trim())
      .filter(Boolean)
      .map((u) => (u.startsWith("http") ? u : `https://${u}`));

    if (!urlList.length) return;
    setSubmitting(true);

    const res = await fetch("/api/seo/batches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ urls: urlList }),
    });

    if (res.ok) {
      setUrls("");
      setRefreshKey((k) => k + 1);
    }
    setSubmitting(false);
  }

  const urlCount = urls.split("\n").map((u) => u.trim()).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[24px] font-bold text-text">Batch Audits</h1>
        <p className="text-[14px] text-text-dim mt-1">
          Audit multiple websites at once. Enter one URL per line.
        </p>
      </div>

      {/* Input */}
      <Card>
        <textarea
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          rows={8}
          placeholder={"https://example.com\nhttps://example2.com\nhttps://example3.com"}
          className="w-full px-3 py-2.5 rounded-lg bg-bg border border-border text-text text-[13px] font-mono outline-none focus:border-accent/40 transition-colors placeholder:text-text-muted resize-none"
          disabled={submitting}
        />
        <div className="flex items-center justify-between mt-3">
          <p className="text-[13px] text-text-dim">{urlCount} URL{urlCount !== 1 ? "s" : ""}</p>
          <Button onClick={handleSubmit} disabled={!urlCount || submitting}>
            {submitting ? "Starting..." : `Audit ${urlCount} URL${urlCount !== 1 ? "s" : ""}`}
          </Button>
        </div>
      </Card>

      {/* Batch history */}
      <div>
        <h2 className="text-[11px] font-bold text-accent uppercase tracking-[0.15em] mb-3 pb-2 border-b border-border">
          Batch History
        </h2>
        {loading ? (
          <p className="text-text-dim text-[14px]">Loading...</p>
        ) : batches.length === 0 ? (
          <Card className="text-center py-8">
            <p className="text-text-dim text-[14px]">No batch audits yet.</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {batches.map((batch) => {
              const progress = batch.total_urls > 0
                ? Math.round(((batch.completed_urls + batch.failed_urls) / batch.total_urls) * 100)
                : 0;

              return (
                <Card key={batch.id} className="!p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-semibold text-text">{batch.name}</p>
                      <p className="text-[12px] text-text-dim mt-0.5">
                        {batch.completed_urls}/{batch.total_urls} completed
                        {batch.failed_urls > 0 && ` · ${batch.failed_urls} failed`}
                        {" · "}{new Date(batch.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant={
                      batch.status === "completed" ? "accent"
                        : batch.status === "running" ? "info"
                          : batch.status === "failed" ? "danger"
                            : "default"
                    }>
                      {batch.status === "running" ? `${progress}%` : batch.status}
                    </Badge>
                    <Link
                      href={`/seo/batch/${batch.id}`}
                      className="text-[13px] text-accent hover:underline"
                    >
                      View
                    </Link>
                  </div>
                  {(batch.status === "running" || batch.status === "queued") && (
                    <div className="mt-3 h-1.5 bg-card rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
