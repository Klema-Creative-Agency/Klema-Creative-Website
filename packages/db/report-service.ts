import { queryAll, queryOne, db } from "./connection";

export const reportService = {
  async getByClient(clientId: string) {
    return queryAll(
      "SELECT * FROM reports WHERE client_id = $1 ORDER BY year DESC, month DESC",
      [clientId],
    );
  },

  async getById(id: string) {
    return queryOne("SELECT * FROM reports WHERE id = $1", [id]);
  },

  async create(data: {
    client_id: string;
    month: number;
    year: number;
    summary?: string;
    highlights?: string;
    insights?: string;
    traffic_sessions?: number;
    traffic_users?: number;
    traffic_pageviews?: number;
  }) {
    return db.insert("reports", {
      ...data,
      status: "draft",
    });
  },

  async update(id: string, data: Record<string, unknown>) {
    const allowed = [
      "summary", "highlights", "insights", "status",
      "traffic_sessions", "traffic_users", "traffic_pageviews",
      "leads_generated", "conversion_rate",
    ];
    const filtered: Record<string, unknown> = {};
    for (const key of allowed) {
      if (data[key] !== undefined) filtered[key] = data[key];
    }
    return db.update("reports", id, filtered);
  },

  async publish(id: string) {
    return db.update("reports", id, {
      status: "published",
      published_at: new Date().toISOString(),
    });
  },
};
