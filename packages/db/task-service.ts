import { queryAll, db } from "./connection";

export const taskService = {
  async getByClient(clientId: string, filters?: { week?: number; status?: string; periodId?: string }) {
    let sql = "SELECT * FROM tasks WHERE client_id = $1";
    const params: unknown[] = [clientId];

    if (filters?.week) {
      params.push(filters.week);
      sql += ` AND week = $${params.length}`;
    }
    if (filters?.status) {
      params.push(filters.status);
      sql += ` AND status = $${params.length}`;
    }
    if (filters?.periodId) {
      params.push(filters.periodId);
      sql += ` AND monthly_period_id = $${params.length}`;
    }

    sql += " ORDER BY week, priority DESC, created_at";
    return queryAll(sql, params);
  },

  async update(id: string, data: Record<string, unknown>) {
    const allowed = [
      "status", "assigned_to", "time_logged_minutes", "notes", "priority",
      "completed_at",
    ];
    const filtered: Record<string, unknown> = {};
    for (const key of allowed) {
      if (data[key] !== undefined) filtered[key] = data[key];
    }
    // Auto-set completed_at when marking completed
    if (filtered.status === "completed" && !filtered.completed_at) {
      filtered.completed_at = new Date().toISOString();
    }
    return db.update("tasks", id, filtered);
  },

  async create(data: {
    client_id: string;
    monthly_period_id?: string;
    title: string;
    category: string;
    week?: number;
    assigned_to?: string;
    notes?: string;
  }) {
    return db.insert("tasks", {
      ...data,
      status: "pending",
      week: data.week || 1,
    });
  },
};
