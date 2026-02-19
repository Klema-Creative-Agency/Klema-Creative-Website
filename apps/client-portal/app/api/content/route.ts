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

  const type = req.nextUrl.searchParams.get("type");
  const status = req.nextUrl.searchParams.get("status");

  let sql = "SELECT * FROM content_items WHERE client_id = $1";
  const params: unknown[] = [clientId];

  if (type) {
    params.push(type);
    sql += ` AND type = $${params.length}::content_type`;
  }
  if (status) {
    params.push(status);
    sql += ` AND status = $${params.length}::content_status`;
  }

  sql += " ORDER BY created_at DESC";

  const items = await queryAll(sql, params);
  return NextResponse.json(items);
}
