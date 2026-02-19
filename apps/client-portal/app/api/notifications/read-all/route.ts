import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { query } from "@klema/db";

export async function POST() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await query(
    "UPDATE notifications SET is_read = true WHERE user_id = $1 AND is_read = false",
    [session.user.id],
  );

  return NextResponse.json({ success: true });
}
