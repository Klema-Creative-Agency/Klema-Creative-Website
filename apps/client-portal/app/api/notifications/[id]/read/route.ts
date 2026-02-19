import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { queryOne } from "@klema/db";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const updated = await queryOne(
    "UPDATE notifications SET is_read = true WHERE id = $1 AND user_id = $2 RETURNING *",
    [id, session.user.id],
  );

  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}
