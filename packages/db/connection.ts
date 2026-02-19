import pg from "pg";
const { Pool } = pg;

// ─── Connection Pool ─────────────────────────────────────────────────────────

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : process.env.DATABASE_URL?.includes("neon.tech")
        ? { rejectUnauthorized: false }
        : undefined,
});

pool.on("error", (err) => {
  console.error("Unexpected pool error:", err);
});

// ─── Query Helpers ───────────────────────────────────────────────────────────

export async function query<T extends pg.QueryResultRow = pg.QueryResultRow>(
  text: string,
  params?: unknown[],
): Promise<pg.QueryResult<T>> {
  const start = Date.now();
  const result = await pool.query<T>(text, params);
  const duration = Date.now() - start;
  if (process.env.DB_LOG === "true") {
    console.log("query", { text: text.substring(0, 80), duration, rows: result.rowCount });
  }
  return result;
}

export async function queryOne<T extends pg.QueryResultRow = pg.QueryResultRow>(
  text: string,
  params?: unknown[],
): Promise<T | null> {
  const result = await query<T>(text, params);
  return result.rows[0] ?? null;
}

export async function queryAll<T extends pg.QueryResultRow = pg.QueryResultRow>(
  text: string,
  params?: unknown[],
): Promise<T[]> {
  const result = await query<T>(text, params);
  return result.rows;
}

export async function transaction<T>(
  fn: (client: pg.PoolClient) => Promise<T>,
): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await fn(client);
    await client.query("COMMIT");
    return result;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

// ─── Query Builder ───────────────────────────────────────────────────────────

export const db = {
  async insert<T extends pg.QueryResultRow = pg.QueryResultRow>(
    table: string,
    data: Record<string, unknown>,
  ): Promise<T> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map((_, i) => `$${i + 1}`);
    const text = `INSERT INTO ${table} (${keys.join(", ")}) VALUES (${placeholders.join(", ")}) RETURNING *`;
    const result = await query<T>(text, values);
    return result.rows[0];
  },

  async update<T extends pg.QueryResultRow = pg.QueryResultRow>(
    table: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<T | null> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const sets = keys.map((k, i) => `${k} = $${i + 1}`);
    const text = `UPDATE ${table} SET ${sets.join(", ")} WHERE id = $${keys.length + 1} RETURNING *`;
    const result = await query<T>(text, [...values, id]);
    return result.rows[0] ?? null;
  },

  async findOne<T extends pg.QueryResultRow = pg.QueryResultRow>(
    table: string,
    where: Record<string, unknown>,
  ): Promise<T | null> {
    const keys = Object.keys(where);
    const values = Object.values(where);
    const conditions = keys.map((k, i) => `${k} = $${i + 1}`);
    const text = `SELECT * FROM ${table} WHERE ${conditions.join(" AND ")} LIMIT 1`;
    return queryOne<T>(text, values);
  },

  async findAll<T extends pg.QueryResultRow = pg.QueryResultRow>(
    table: string,
    where?: Record<string, unknown>,
    orderBy?: string,
  ): Promise<T[]> {
    let text = `SELECT * FROM ${table}`;
    const values: unknown[] = [];
    if (where && Object.keys(where).length > 0) {
      const keys = Object.keys(where);
      const conditions = keys.map((k, i) => `${k} = $${i + 1}`);
      values.push(...Object.values(where));
      text += ` WHERE ${conditions.join(" AND ")}`;
    }
    if (orderBy) text += ` ORDER BY ${orderBy}`;
    return queryAll<T>(text, values);
  },

  async delete(table: string, id: string): Promise<boolean> {
    const result = await query(`DELETE FROM ${table} WHERE id = $1`, [id]);
    return (result.rowCount ?? 0) > 0;
  },

  async count(table: string, where?: Record<string, unknown>): Promise<number> {
    let text = `SELECT COUNT(*)::int as count FROM ${table}`;
    const values: unknown[] = [];
    if (where && Object.keys(where).length > 0) {
      const keys = Object.keys(where);
      const conditions = keys.map((k, i) => `${k} = $${i + 1}`);
      values.push(...Object.values(where));
      text += ` WHERE ${conditions.join(" AND ")}`;
    }
    const row = await queryOne<{ count: number }>(text, values);
    return row?.count ?? 0;
  },
};

// ─── Health Check ────────────────────────────────────────────────────────────

export async function healthCheck(): Promise<boolean> {
  try {
    await query("SELECT 1");
    return true;
  } catch {
    return false;
  }
}

export async function closePool(): Promise<void> {
  await pool.end();
}

export { pool };
