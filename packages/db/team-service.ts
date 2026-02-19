import { queryAll, queryOne, query, db } from "./connection";

export const teamService = {
  async getByClient(clientId: string) {
    return queryAll(
      `SELECT ct.*, u.name as user_name, u.email as user_email, u.role as user_role
       FROM client_team ct
       JOIN users u ON u.id = ct.user_id
       WHERE ct.client_id = $1
       ORDER BY ct.role`,
      [clientId],
    );
  },

  async assign(clientId: string, userId: string, role: string) {
    // Check if already assigned
    const existing = await queryOne(
      "SELECT * FROM client_team WHERE client_id = $1 AND user_id = $2",
      [clientId, userId],
    );
    if (existing) {
      return db.update("client_team", existing.id, { role });
    }
    return db.insert("client_team", { client_id: clientId, user_id: userId, role });
  },

  async remove(clientId: string, userId: string) {
    const result = await query(
      "DELETE FROM client_team WHERE client_id = $1 AND user_id = $2",
      [clientId, userId],
    );
    return (result.rowCount ?? 0) > 0;
  },

  async getAllTeamMembers() {
    return queryAll(
      "SELECT id, name, email, role FROM users WHERE role IN ('owner', 'team_member') AND is_active = true ORDER BY name",
    );
  },
};
