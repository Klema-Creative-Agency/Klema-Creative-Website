import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { queryOne } from "@klema/db";

export async function PATCH(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const updated = await queryOne(
    "UPDATE messages SET status = 'read' WHERE id = $1 AND status = 'unread' RETURNING *",
    [id],
  );

  if (!updated) {
    return NextResponse.json({ error: "Message not found or already read" }, { status: 404 });
  }

  return NextResponse.json(updated);
}
