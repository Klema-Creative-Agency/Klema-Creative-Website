import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { queryAll } from "@klema/db";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const clientId = req.nextUrl.searchParams.get("clientId") ?? session.user.clientId;
  if (!clientId) {
    return NextResponse.json({ error: "Client ID required" }, { status: 400 });
  }

  if (session.user.role === "client" && session.user.clientId !== clientId) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  const reports = await queryAll(
    `SELECT r.*, mp.month, mp.year
     FROM reports r
     LEFT JOIN monthly_periods mp ON mp.id = r.monthly_period_id
     WHERE r.client_id = $1
     ORDER BY r.created_at DESC`,
    [clientId],
  );

  return NextResponse.json(reports);
}
