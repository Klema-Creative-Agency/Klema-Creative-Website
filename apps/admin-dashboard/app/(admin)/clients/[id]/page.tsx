"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Stat } from "@/components/ui/Stat";
import { Bar } from "@/components/ui/Bar";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Modal } from "@/components/ui/Modal";

const TIER_MAP: Record<number, string> = { 1: "Starter", 2: "Growth", 3: "Scale" };

const STATUS_OPTIONS = [
  { value: "onboarding", label: "Onboarding" },
  { value: "active", label: "Active" },
  { value: "paused", label: "Paused" },
  { value: "churned", label: "Churned" },
];

const DELIVERABLES: Record<number, { blogsPerMonth: number; socialPostsPerMonth: number; keywordsTracked: number; socialPlatforms: number; leadManagementHours: number }> = {
  1: { blogsPerMonth: 4, socialPostsPerMonth: 12, keywordsTracked: 20, socialPlatforms: 2, leadManagementHours: 0 },
  2: { blogsPerMonth: 8, socialPostsPerMonth: 20, keywordsTracked: 50, socialPlatforms: 3, leadManagementHours: 5 },
  3: { blogsPerMonth: 12, socialPostsPerMonth: 30, keywordsTracked: 100, socialPlatforms: 4, leadManagementHours: 10 },
};

interface Client {
  id: string;
  name: string;
  business_name: string;
  status: string;
  tier_id: number;
  primary_contact_name: string;
  primary_contact_email: string;
  phone: string;
  website: string;
  industry: string;
  service_area: string;
  created_at: string;
}

interface Period {
  id: string;
  month: number;
  year: number;
  actual_blogs: number;
  actual_social_posts: number;
}

interface OnboardingProgress {
  percentage: number;
  completed: number;
  total: number;
}

export default function ClientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [client, setClient] = useState<Client | null>(null);
  const [period, setPeriod] = useState<Period | null>(null);
  const [onboarding, setOnboarding] = useState<OnboardingProgress>({ percentage: 0, completed: 0, total: 0 });
  const [refreshKey, setRefreshKey] = useState(0);
  const [editOpen, setEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Edit form state
  const [form, setForm] = useState({
    name: "",
    business_name: "",
    primary_contact_name: "",
    primary_contact_email: "",
    phone: "",
    website: "",
    industry: "",
    service_area: "",
  });

  useEffect(() => {
    async function load() {
      const [clientRes, onboardingRes] = await Promise.all([
        fetch(`/api/clients/${id}`),
        fetch(`/api/clients/${id}/onboarding/list`),
      ]);
      if (!clientRes.ok) {
        router.push("/clients");
        return;
      }
      const clientData = await clientRes.json();
      setClient(clientData);

      // Set current period from client data
      if (clientData.current_period) {
        setPeriod(clientData.current_period);
      }

      if (onboardingRes.ok) {
        const onboardingData = await onboardingRes.json();
        setOnboarding(onboardingData);
      }
    }
    load();
  }, [id, refreshKey, router]);

  function openEdit() {
    if (!client) return;
    setForm({
      name: client.name || "",
      business_name: client.business_name || "",
      primary_contact_name: client.primary_contact_name || "",
      primary_contact_email: client.primary_contact_email || "",
      phone: client.phone || "",
      website: client.website || "",
      industry: client.industry || "",
      service_area: client.service_area || "",
    });
    setEditOpen(true);
  }

  async function saveEdit() {
    setSaving(true);
    const res = await fetch(`/api/clients/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      setEditOpen(false);
      setRefreshKey((k) => k + 1);
    }
  }

  async function changeStatus(newStatus: string) {
    await fetch(`/api/clients/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    setRefreshKey((k) => k + 1);
  }

  if (!client) {
    return (
      <div className="flex items-center justify-center py-24 text-text-dim text-[14px]">
        Loading…
      </div>
    );
  }

  const tierName = TIER_MAP[client.tier_id] || `Tier ${client.tier_id}`;
  const deliverables = DELIVERABLES[client.tier_id] || DELIVERABLES[1];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-[24px] font-bold text-text">{client.name}</h1>
            <Badge variant={client.status}>{client.status.replace("_", " ")}</Badge>
          </div>
          <p className="text-[14px] text-text-dim">
            {tierName} &middot; {client.primary_contact_email}
            {client.phone ? ` · ${client.phone}` : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={openEdit}>
            Edit Client
          </Button>
          <Select
            value={client.status}
            options={STATUS_OPTIONS}
            onChange={(e) => changeStatus(e.target.value)}
            className="!w-auto"
          />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4">
        <Stat label="Tier" value={tierName} />
        <Stat label="Status" value={client.status.replace("_", " ")} />
        <Stat label="Onboarding" value={`${onboarding.percentage}%`} />
        <Stat
          label="Current Period"
          value={
            period
              ? `${new Date(0, period.month - 1).toLocaleString("en", { month: "short" })} ${period.year}`
              : "None"
          }
        />
      </div>

      {/* Client details + deliverables */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Client Info</CardTitle>
          </CardHeader>
          <dl className="space-y-3 text-[14px]">
            <InfoRow label="Business" value={client.business_name || client.name} />
            <InfoRow label="Industry" value={client.industry || "—"} />
            <InfoRow label="Service Area" value={client.service_area || "—"} />
            <InfoRow label="Website" value={client.website || "—"} />
            <InfoRow label="Primary Contact" value={client.primary_contact_name} />
            <InfoRow label="Email" value={client.primary_contact_email} />
            <InfoRow label="Phone" value={client.phone || "—"} />
            <InfoRow label="Created" value={new Date(client.created_at).toLocaleDateString()} />
          </dl>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Deliverables ({tierName})</CardTitle>
          </CardHeader>
          <div className="space-y-4">
            <Bar
              label="Blog Posts"
              value={period?.actual_blogs ?? 0}
              max={deliverables.blogsPerMonth}
            />
            <Bar
              label="Social Posts"
              value={period?.actual_social_posts ?? 0}
              max={deliverables.socialPostsPerMonth}
            />
            <div className="pt-2 space-y-2 text-[13px]">
              <div className="flex justify-between text-text-dim">
                <span>Keywords Tracked</span>
                <span className="text-text">{deliverables.keywordsTracked}</span>
              </div>
              <div className="flex justify-between text-text-dim">
                <span>Social Platforms</span>
                <span className="text-text">{deliverables.socialPlatforms}</span>
              </div>
              {deliverables.leadManagementHours > 0 && (
                <div className="flex justify-between text-text-dim">
                  <span>Lead Mgmt Hours</span>
                  <span className="text-text">{deliverables.leadManagementHours}h/mo</span>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Edit Modal */}
      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit Client">
        <div className="space-y-4">
          <Input
            label="Business Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            label="Legal / Display Name"
            value={form.business_name}
            onChange={(e) => setForm({ ...form, business_name: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Contact Name"
              value={form.primary_contact_name}
              onChange={(e) => setForm({ ...form, primary_contact_name: e.target.value })}
            />
            <Input
              label="Contact Email"
              value={form.primary_contact_email}
              onChange={(e) => setForm({ ...form, primary_contact_email: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <Input
              label="Website"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Industry"
              value={form.industry}
              onChange={(e) => setForm({ ...form, industry: e.target.value })}
            />
            <Input
              label="Service Area"
              value={form.service_area}
              onChange={(e) => setForm({ ...form, service_area: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveEdit} disabled={saving}>
              {saving ? "Saving…" : "Save Changes"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-text-dim">{label}</dt>
      <dd className="text-text text-right">{value}</dd>
    </div>
  );
}
