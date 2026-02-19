import { queryAll, db } from "./connection";

export const periodService = {
  async getByClient(clientId: string) {
    return queryAll(
      "SELECT * FROM monthly_periods WHERE client_id = $1 ORDER BY year DESC, month DESC",
      [clientId],
    );
  },

  async updateActuals(periodId: string, data: {
    actual_blogs?: number;
    actual_social_posts?: number;
    actual_lead_hours?: number;
  }) {
    const allowed = ["actual_blogs", "actual_social_posts", "actual_lead_hours"];
    const filtered: Record<string, unknown> = {};
    for (const key of allowed) {
      if (data[key as keyof typeof data] !== undefined) {
        filtered[key] = data[key as keyof typeof data];
      }
    }
    return db.update("monthly_periods", periodId, filtered);
  },
};
