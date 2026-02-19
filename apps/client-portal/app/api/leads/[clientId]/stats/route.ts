import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { queryOne, queryAll } from "@klema/db";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ clientId: string }> },
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { clientId } = await params;

  if (session.user.role === "client" && session.user.clientId !== clientId) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  const [total, thisMonth, avgResponse, byStatus] = await Promise.all([
    queryOne<{ count: number }>(
      "SELECT COUNT(*)::int as count FROM leads WHERE client_id = $1",
      [clientId],
    ),
    queryOne<{ count: number }>(
      `SELECT COUNT(*)::int as count FROM leads
       WHERE client_id = $1
       AND created_at >= date_trunc('month', CURRENT_DATE)`,
      [clientId],
    ),
    queryOne<{ avg: number }>(
      `SELECT COALESCE(AVG(response_time_minutes), 0)::int as avg
       FROM leads WHERE client_id = $1 AND response_time_minutes IS NOT NULL`,
      [clientId],
    ),
    queryAll<{ status: string; count: number }>(
      `SELECT status::text, COUNT(*)::int as count
       FROM leads WHERE client_id = $1
       GROUP BY status`,
      [clientId],
    ),
  ]);

  return NextResponse.json({
    total: total?.count ?? 0,
    thisMonth: thisMonth?.count ?? 0,
    avgResponseMinutes: avgResponse?.avg ?? 0,
    byStatus: Object.fromEntries(byStatus.map((r) => [r.status, r.count])),
  });
}
