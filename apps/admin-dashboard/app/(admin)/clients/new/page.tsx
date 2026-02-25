"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Card } from "@/components/ui/Card";

const tierOptions = [
  { value: "1", label: "Tier 1 — Ignition ($997/mo)" },
  { value: "2", label: "Tier 2 — Foundation ($1,997/mo)" },
  { value: "3", label: "Tier 3 — Accelerator ($3,997/mo)" },
  { value: "4", label: "Tier 4 — Authority ($7,500/mo)" },
  { value: "5", label: "Tier 5 — Dominator ($12,000/mo)" },
];

export default function NewClientPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const data = {
      name: form.get("name") as string,
      slug: (form.get("name") as string)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
      tierId: Number(form.get("tierId")),
      contactName: form.get("contactName") as string,
      email: form.get("email") as string,
      password: form.get("password") as string,
      industry: form.get("industry") as string,
      phone: form.get("phone") as string,
      website: form.get("website") as string,
      serviceArea: form.get("serviceArea") as string,
    };

    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error ?? "Failed to create client");
      }

      const result = await res.json();
      router.push(`/clients/${result.client.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-[640px]">
      <div className="mb-6">
        <h1 className="text-[24px] font-bold text-text">New Client</h1>
        <p className="text-[14px] text-text-dim mt-1">
          Spin up a new client with onboarding, tasks, and portal access.
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input name="name" label="Business Name" placeholder="SA Plumbing Co" required />

          <Select name="tierId" label="Tier" options={tierOptions} required />

          <div className="grid grid-cols-2 gap-4">
            <Input name="contactName" label="Primary Contact" placeholder="John Smith" required />
            <Input name="email" label="Contact Email" type="email" placeholder="john@saplumbing.com" required />
          </div>

          <Input
            name="password"
            label="Portal Password"
            type="text"
            placeholder="Initial password for portal login"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input name="industry" label="Industry" placeholder="Plumbing" />
            <Input name="phone" label="Phone" placeholder="(210) 555-0100" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input name="website" label="Website" placeholder="https://saplumbing.com" />
            <Input name="serviceArea" label="Service Area" placeholder="San Antonio, TX" />
          </div>

          {error && (
            <div className="bg-danger-dim border border-danger/20 rounded-lg px-4 py-3 text-[13px] text-danger">
              {error}
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Client"}
            </Button>
            <Button type="button" variant="ghost" onClick={() => router.push("/clients")}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
