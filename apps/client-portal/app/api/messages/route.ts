import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { queryAll, queryOne } from "@klema/db";

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

  // Get thread starters (messages with no parent)
  const threads = await queryAll(
    `SELECT m.*, u.name as sender_name, u.role as sender_role,
       (SELECT COUNT(*) FROM messages r WHERE r.thread_id = m.id)::int as reply_count,
       (SELECT MAX(r.created_at) FROM messages r WHERE r.thread_id = m.id) as last_reply_at
     FROM messages m
     JOIN users u ON u.id = m.sender_id
     WHERE m.client_id = $1 AND m.parent_id IS NULL
     ORDER BY COALESCE((SELECT MAX(r.created_at) FROM messages r WHERE r.thread_id = m.id), m.created_at) DESC`,
    [clientId],
  );

  return NextResponse.json(threads);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const clientId = body.clientId ?? session.user.clientId;

  if (!clientId) {
    return NextResponse.json({ error: "Client ID required" }, { status: 400 });
  }

  if (session.user.role === "client" && session.user.clientId !== clientId) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  const message = await queryOne(
    `INSERT INTO messages (client_id, subject, body, sender_id, thread_id)
     VALUES ($1, $2, $3, $4, NULL)
     RETURNING *`,
    [clientId, body.subject, body.body, session.user.id],
  );

  // Set thread_id to own id for new threads
  const updated = await queryOne(
    "UPDATE messages SET thread_id = id WHERE id = $1 RETURNING *",
    [message!.id],
  );

  return NextResponse.json(updated, { status: 201 });
}
