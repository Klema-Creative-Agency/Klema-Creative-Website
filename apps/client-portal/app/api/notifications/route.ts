import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { queryAll, queryOne } from "@klema/db";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [notifications, unreadCount] = await Promise.all([
    queryAll(
      "SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50",
      [session.user.id],
    ),
    queryOne<{ count: number }>(
      "SELECT COUNT(*)::int as count FROM notifications WHERE user_id = $1 AND is_read = false",
      [session.user.id],
    ),
  ]);

  return NextResponse.json({
    notifications,
    unreadCount: unreadCount?.count ?? 0,
  });
}
