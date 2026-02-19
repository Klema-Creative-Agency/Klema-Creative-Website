import { queryAll, queryOne, db } from "./connection";

export const leadService = {
  async getByClient(clientId: string, filters?: { status?: string }) {
    let sql = "SELECT * FROM leads WHERE client_id = $1";
    const params: unknown[] = [clientId];

    if (filters?.status) {
      params.push(filters.status);
      sql += ` AND status = $${params.length}`;
    }

    sql += " ORDER BY created_at DESC";
    return queryAll(sql, params);
  },

  async getById(id: string) {
    return queryOne("SELECT * FROM leads WHERE id = $1", [id]);
  },

  async create(data: {
    client_id: string;
    name: string;
    email?: string;
    phone?: string;
    source?: string;
    status?: string;
    score?: number;
    notes?: string;
  }) {
    return db.insert("leads", {
      ...data,
      status: data.status || "new",
      score: data.score ?? 0,
    });
  },

  async update(id: string, data: Record<string, unknown>) {
    const allowed = [
      "name", "email", "phone", "source", "status", "score", "notes",
      "converted_at", "lost_reason",
    ];
    const filtered: Record<string, unknown> = {};
    for (const key of allowed) {
      if (data[key] !== undefined) filtered[key] = data[key];
    }
    // Auto-set converted_at
    if (filtered.status === "converted" && !filtered.converted_at) {
      filtered.converted_at = new Date().toISOString();
    }
    return db.update("leads", id, filtered);
  },

  async getActivities(leadId: string) {
    return queryAll(
      "SELECT * FROM lead_activities WHERE lead_id = $1 ORDER BY created_at DESC",
      [leadId],
    );
  },

  async addActivity(data: {
    lead_id: string;
    user_id: string;
    activity_type: string;
    notes?: string;
  }) {
    return db.insert("lead_activities", data);
  },
};
