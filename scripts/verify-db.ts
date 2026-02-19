import "dotenv/config";
import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function verify() {
  const tables = await pool.query("SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename");
  console.log("Tables (" + tables.rows.length + "):", tables.rows.map((r: { tablename: string }) => r.tablename).join(", "));

  const users = await pool.query("SELECT email, role FROM users ORDER BY role");
  console.log("\nUsers:");
  users.rows.forEach((u: { role: string; email: string }) => console.log("  " + u.role + " — " + u.email));

  const clients = await pool.query("SELECT name, tier_id, status FROM clients ORDER BY tier_id");
  console.log("\nClients:");
  clients.rows.forEach((c: { tier_id: number; name: string; status: string }) =>
    console.log("  Tier " + c.tier_id + " — " + c.name + " (" + c.status + ")"),
  );

  const counts = await pool.query(`
    SELECT
      (SELECT COUNT(*)::int FROM keyword_rankings) as keywords,
      (SELECT COUNT(*)::int FROM leads) as leads,
      (SELECT COUNT(*)::int FROM content_items) as content,
      (SELECT COUNT(*)::int FROM messages) as messages,
      (SELECT COUNT(*)::int FROM reports) as reports,
      (SELECT overall_score FROM llm_visibility_scores LIMIT 1) as llm_score
  `);
  const c = counts.rows[0];
  console.log("\nSeed data:");
  console.log("  Keywords:", c.keywords);
  console.log("  Leads:", c.leads);
  console.log("  Content items:", c.content);
  console.log("  Messages:", c.messages);
  console.log("  Reports:", c.reports);
  console.log("  LLM visibility score:", c.llm_score);

  await pool.end();
}

verify().catch(console.error);
