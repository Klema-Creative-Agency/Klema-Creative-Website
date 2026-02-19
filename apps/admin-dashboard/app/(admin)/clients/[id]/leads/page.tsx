"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Modal } from "@/components/ui/Modal";

const statusOptions = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "appointment_set", label: "Appointment Set" },
  { value: "converted", label: "Converted" },
  { value: "lost", label: "Lost" },
  { value: "dormant", label: "Dormant" },
];

const sourceOptions = [
  { value: "", label: "Unknown" },
  { value: "website", label: "Website" },
  { value: "google_ads", label: "Google Ads" },
  { value: "facebook_ads", label: "Facebook Ads" },
  { value: "referral", label: "Referral" },
  { value: "organic", label: "Organic Search" },
  { value: "social", label: "Social Media" },
  { value: "other", label: "Other" },
];

interface Lead {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  source: string | null;
  status: string;
  score: number;
  created_at: string;
}

export default function ClientLeadsPage() {
  const { id: clientId } = useParams<{ id: string }>();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const res = await fetch(`/api/leads?clientId=${clientId}`);
      if (res.ok && !cancelled) setLeads(await res.json());
      if (!cancelled) setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, [clientId, refreshKey]);

  function refresh() { setRefreshKey((k) => k + 1); }

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        name: form.get("name"),
        email: form.get("email") || null,
        phone: form.get("phone") || null,
        source: form.get("source") || null,
        notes: form.get("notes") || null,
      }),
    });
    setShowCreate(false);
    refresh();
  }

  async function handleStatusChange(leadId: string, status: string) {
    await fetch(`/api/leads/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    refresh();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/clients/${clientId}`} className="text-text-dim hover:text-text text-[13px]">&larr; Overview</Link>
          <h1 className="text-[24px] font-bold text-text">Leads</h1>
          <span className="text-[14px] text-text-dim">{leads.length} total</span>
        </div>
        <Button onClick={() => setShowCreate(true)}>+ New Lead</Button>
      </div>

      {loading ? (
        <p className="text-text-dim text-[14px]">Loading...</p>
      ) : leads.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-text-dim text-[14px]">No leads yet.</p>
        </Card>
      ) : (
        <Card className="!p-0 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-[12px] font-medium text-text-dim uppercase tracking-wider px-6 py-3">Name</th>
                <th className="text-left text-[12px] font-medium text-text-dim uppercase tracking-wider px-6 py-3">Contact</th>
                <th className="text-left text-[12px] font-medium text-text-dim uppercase tracking-wider px-6 py-3">Source</th>
                <th className="text-left text-[12px] font-medium text-text-dim uppercase tracking-wider px-6 py-3">Score</th>
                <th className="text-left text-[12px] font-medium text-text-dim uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-left text-[12px] font-medium text-text-dim uppercase tracking-wider px-6 py-3">Date</th>
                <th className="text-right text-[12px] font-medium text-text-dim uppercase tracking-wider px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-border last:border-0 hover:bg-card-hover transition-colors">
                  <td className="px-6 py-3 text-[14px] text-text font-medium">{lead.name}</td>
                  <td className="px-6 py-3 text-[13px] text-text-dim">
                    {lead.email || lead.phone || "—"}
                  </td>
                  <td className="px-6 py-3 text-[13px] text-text-dim capitalize">{lead.source || "—"}</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full border-2 border-accent flex items-center justify-center">
                        <span className="text-[10px] font-bold text-accent">{lead.score}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <Badge variant={lead.status}>{lead.status.replace("_", " ")}</Badge>
                  </td>
                  <td className="px-6 py-3 text-[13px] text-text-dim">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3 text-right">
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                      className="h-8 px-2 rounded-lg bg-card border border-border text-text text-[12px] outline-none focus:border-accent/40"
                    >
                      {statusOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="New Lead">
        <form onSubmit={handleCreate} className="space-y-4">
          <Input name="name" label="Name" placeholder="John Smith" required />
          <div className="grid grid-cols-2 gap-4">
            <Input name="email" label="Email" type="email" placeholder="john@example.com" />
            <Input name="phone" label="Phone" placeholder="(210) 555-0100" />
          </div>
          <Select name="source" label="Source" options={sourceOptions} />
          <Textarea name="notes" label="Notes" rows={3} placeholder="Initial notes about this lead..." />
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button type="submit">Create Lead</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
