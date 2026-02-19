import { queryOne, queryAll, db } from "./connection";

export const contentService = {
  async getByClient(clientId: string, filters?: { type?: string; status?: string }) {
    let sql = "SELECT * FROM content_items WHERE client_id = $1";
    const params: unknown[] = [clientId];

    if (filters?.type) {
      params.push(filters.type);
      sql += ` AND content_type = $${params.length}`;
    }
    if (filters?.status) {
      params.push(filters.status);
      sql += ` AND status = $${params.length}`;
    }

    sql += " ORDER BY created_at DESC";
    return queryAll(sql, params);
  },

  async getById(id: string) {
    return queryOne("SELECT * FROM content_items WHERE id = $1", [id]);
  },

  async create(data: {
    client_id: string;
    title: string;
    content_type: string;
    status?: string;
    platform?: string;
    body?: string;
    notes?: string;
    assigned_to?: string;
    scheduled_date?: string;
  }) {
    return db.insert("content_items", {
      ...data,
      status: data.status || "brief",
    });
  },

  async update(id: string, data: Record<string, unknown>) {
    // Filter to only content_items columns
    const allowed = [
      "title", "content_type", "status", "platform", "body", "notes",
      "assigned_to", "scheduled_date", "published_date", "published_url",
    ];
    const filtered: Record<string, unknown> = {};
    for (const key of allowed) {
      if (data[key] !== undefined) filtered[key] = data[key];
    }
    return db.update("content_items", id, filtered);
  },

  async delete(id: string) {
    return db.delete("content_items", id);
  },
};
