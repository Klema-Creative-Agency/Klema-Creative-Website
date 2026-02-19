"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Modal } from "@/components/ui/Modal";

const statusFlow = ["brief", "ai_draft", "team_review", "client_review", "revision", "approved", "published"];
const typeOptions = [
  { value: "blog", label: "Blog Post" },
  { value: "social", label: "Social Post" },
];
const platformOptions = [
  { value: "", label: "None" },
  { value: "website", label: "Website" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "google_business", label: "Google Business" },
];

interface ContentItem {
  id: string;
  title: string;
  content_type: string;
  status: string;
  platform: string;
  scheduled_date: string | null;
  created_at: string;
}

export default function ClientContentPage() {
  const { id: clientId } = useParams<{ id: string }>();
  const [items, setItems] = useState<ContentItem[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const res = await fetch(`/api/content?clientId=${clientId}`);
      if (res.ok && !cancelled) setItems(await res.json());
      if (!cancelled) setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, [clientId, refreshKey]);

  function refresh() { setRefreshKey((k) => k + 1); }

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        title: form.get("title"),
        content_type: form.get("content_type"),
        platform: form.get("platform") || null,
        scheduled_date: form.get("scheduled_date") || null,
      }),
    });
    setShowCreate(false);
    refresh();
  }

  async function advanceStatus(item: ContentItem) {
    const idx = statusFlow.indexOf(item.status);
    if (idx < statusFlow.length - 1) {
      const nextStatus = statusFlow[idx + 1];
      const updates: Record<string, unknown> = { status: nextStatus };
      if (nextStatus === "published") {
        updates.published_date = new Date().toISOString().split("T")[0];
      }
      await fetch(`/api/content/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      refresh();
    }
  }

  async function handleDelete(itemId: string) {
    await fetch(`/api/content/${itemId}`, { method: "DELETE" });
    refresh();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/clients/${clientId}`} className="text-text-dim hover:text-text text-[13px]">&larr; Overview</Link>
          <h1 className="text-[24px] font-bold text-text">Content</h1>
        </div>
        <Button onClick={() => setShowCreate(true)}>+ New Content</Button>
      </div>

      {loading ? (
        <p className="text-text-dim text-[14px]">Loading...</p>
      ) : items.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-text-dim text-[14px]">No content items yet.</p>
        </Card>
      ) : (
        <Card className="!p-0 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-[12px] font-medium text-text-dim uppercase tracking-wider px-6 py-3">Title</th>
                <th className="text-left text-[12px] font-medium text-text-dim uppercase tracking-wider px-6 py-3">Type</th>
                <th className="text-left text-[12px] font-medium text-text-dim uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-left text-[12px] font-medium text-text-dim uppercase tracking-wider px-6 py-3">Platform</th>
                <th className="text-left text-[12px] font-medium text-text-dim uppercase tracking-wider px-6 py-3">Scheduled</th>
                <th className="text-right text-[12px] font-medium text-text-dim uppercase tracking-wider px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-border last:border-0 hover:bg-card-hover transition-colors">
                  <td className="px-6 py-3 text-[14px] text-text">{item.title}</td>
                  <td className="px-6 py-3 text-[13px] text-text-dim capitalize">{item.content_type}</td>
                  <td className="px-6 py-3">
                    <Badge variant={item.status}>{item.status.replace("_", " ")}</Badge>
                  </td>
                  <td className="px-6 py-3 text-[13px] text-text-dim capitalize">{item.platform || "—"}</td>
                  <td className="px-6 py-3 text-[13px] text-text-dim">
                    {item.scheduled_date ? new Date(item.scheduled_date).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {item.status !== "published" && (
                        <Button variant="ghost" className="!h-8 !px-3 !text-[12px]" onClick={() => advanceStatus(item)}>
                          Advance &rarr;
                        </Button>
                      )}
                      <Button variant="ghost" className="!h-8 !px-3 !text-[12px] !text-danger" onClick={() => handleDelete(item.id)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="New Content Item">
        <form onSubmit={handleCreate} className="space-y-4">
          <Input name="title" label="Title" placeholder="Blog: 5 Tips for..." required />
          <div className="grid grid-cols-2 gap-4">
            <Select name="content_type" label="Type" options={typeOptions} required />
            <Select name="platform" label="Platform" options={platformOptions} />
          </div>
          <Input name="scheduled_date" label="Scheduled Date" type="date" />
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
