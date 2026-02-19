import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { queryAll, queryOne } from "@klema/db";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: threadId } = await params;

  const replies = await queryAll(
    `SELECT m.*, u.name as sender_name, u.role as sender_role
     FROM messages m
     JOIN users u ON u.id = m.sender_id
     WHERE m.thread_id = $1
     ORDER BY m.created_at ASC`,
    [threadId],
  );

  return NextResponse.json(replies);
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: threadId } = await params;
  const body = await req.json();

  // Get parent thread to find client_id
  const thread = await queryOne<{ client_id: string }>(
    "SELECT client_id FROM messages WHERE id = $1",
    [threadId],
  );

  if (!thread) {
    return NextResponse.json({ error: "Thread not found" }, { status: 404 });
  }

  if (session.user.role === "client" && session.user.clientId !== thread.client_id) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  const reply = await queryOne(
    `INSERT INTO messages (client_id, body, sender_id, parent_id, thread_id)
     VALUES ($1, $2, $3, $4, $4)
     RETURNING *`,
    [thread.client_id, body.body, session.user.id, threadId],
  );

  // Mark thread as replied
  await queryOne(
    "UPDATE messages SET status = 'replied' WHERE id = $1 RETURNING id",
    [threadId],
  );

  return NextResponse.json(reply, { status: 201 });
}
