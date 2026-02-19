"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Modal } from "@/components/ui/Modal";

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "blocked", label: "Blocked" },
];

const categoryOptions = [
  { value: "content", label: "Content" },
  { value: "social", label: "Social" },
  { value: "seo", label: "SEO" },
  { value: "leads", label: "Leads" },
  { value: "reputation", label: "Reputation" },
  { value: "reporting", label: "Reporting" },
  { value: "account", label: "Account" },
  { value: "other", label: "Other" },
];

interface Task {
  id: string;
  title: string;
  category: string;
  week: number;
  status: string;
  assigned_to: string | null;
  time_logged_minutes: number;
  notes: string | null;
}

export default function ClientTasksPage() {
  const { id: clientId } = useParams<{ id: string }>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const res = await fetch(`/api/tasks?clientId=${clientId}`);
      if (res.ok && !cancelled) setTasks(await res.json());
      if (!cancelled) setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, [clientId, refreshKey]);

  function refresh() { setRefreshKey((k) => k + 1); }

  async function handleStatusChange(taskId: string, status: string) {
    await fetch(`/api/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    refresh();
  }

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        title: form.get("title"),
        category: form.get("category"),
        week: Number(form.get("week")) || 1,
      }),
    });
    setShowCreate(false);
    refresh();
  }

  // Group tasks by week
  const byWeek: Record<number, Task[]> = {};
  tasks.forEach((t) => {
    if (!byWeek[t.week]) byWeek[t.week] = [];
    byWeek[t.week].push(t);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/clients/${clientId}`} className="text-text-dim hover:text-text text-[13px]">&larr; Overview</Link>
          <h1 className="text-[24px] font-bold text-text">Tasks</h1>
        </div>
        <Button onClick={() => setShowCreate(true)}>+ Ad-hoc Task</Button>
      </div>

      {loading ? (
        <p className="text-text-dim text-[14px]">Loading...</p>
      ) : tasks.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-text-dim text-[14px]">No tasks for this period.</p>
        </Card>
      ) : (
        <div className="space-y-6">
          {[1, 2, 3, 4].map((week) => {
            const weekTasks = byWeek[week];
            if (!weekTasks?.length) return null;
            const completed = weekTasks.filter((t) => t.status === "completed").length;
            return (
              <Card key={week} className="!p-0 overflow-hidden">
                <CardHeader className="!mb-0 px-6 py-4 border-b border-border flex items-center justify-between">
                  <CardTitle>Week {week}</CardTitle>
                  <span className="text-[12px] text-text-dim">
                    {completed}/{weekTasks.length} complete
                  </span>
                </CardHeader>
                <div>
                  {weekTasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-4 px-6 py-3 border-b border-border last:border-0 hover:bg-card-hover transition-colors">
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] text-text truncate">{task.title}</p>
                        <p className="text-[12px] text-text-dim capitalize">{task.category}</p>
                      </div>
                      <Badge variant={task.status}>{task.status.replace("_", " ")}</Badge>
                      <select
                        value={task.status}
                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                        className="h-8 px-2 rounded-lg bg-card border border-border text-text text-[12px] outline-none focus:border-accent/40"
                      >
                        {statusOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="New Task">
        <form onSubmit={handleCreate} className="space-y-4">
          <Input name="title" label="Task Title" placeholder="Review client website" required />
          <div className="grid grid-cols-2 gap-4">
            <Select name="category" label="Category" options={categoryOptions} required />
            <Select
              name="week"
              label="Week"
              options={[
                { value: "1", label: "Week 1" },
                { value: "2", label: "Week 2" },
                { value: "3", label: "Week 3" },
                { value: "4", label: "Week 4" },
              ]}
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button type="submit">Create Task</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
