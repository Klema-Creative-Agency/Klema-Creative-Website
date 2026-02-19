import { queryAll, query } from "./connection";

export const keywordService = {
  async getByClient(clientId: string) {
    return queryAll(
      `SELECT * FROM keyword_rankings
       WHERE client_id = $1
       ORDER BY tracked_at DESC, keyword`,
      [clientId],
    );
  },

  async batchInsert(
    clientId: string,
    keywords: { keyword: string; position: number; previous_position?: number; url?: string }[],
  ) {
    const results = [];
    for (const kw of keywords) {
      const result = await query(
        `INSERT INTO keyword_rankings (client_id, keyword, position, previous_position, url, tracked_at)
         VALUES ($1, $2, $3, $4, $5, NOW())
         RETURNING *`,
        [clientId, kw.keyword, kw.position, kw.previous_position ?? null, kw.url ?? null],
      );
      results.push(result.rows[0]);
    }
    return results;
  },
};
