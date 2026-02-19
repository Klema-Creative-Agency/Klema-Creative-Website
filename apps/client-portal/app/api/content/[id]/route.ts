import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { queryOne } from "@klema/db";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const item = await queryOne("SELECT * FROM content_items WHERE id = $1", [id]);
  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (session.user.role === "client" && session.user.clientId !== item.client_id) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  return NextResponse.json(item);
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  const item = await queryOne("SELECT * FROM content_items WHERE id = $1", [id]);
  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (session.user.role === "client" && session.user.clientId !== item.client_id) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  const allowedFields = ["status", "revision_notes"];
  const updates: string[] = [];
  const values: unknown[] = [];

  for (const field of allowedFields) {
    if (body[field] !== undefined) {
      values.push(body[field]);
      updates.push(`${field} = $${values.length}`);
    }
  }

  if (updates.length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  values.push(id);
  const updated = await queryOne(
    `UPDATE content_items SET ${updates.join(", ")} WHERE id = $${values.length} RETURNING *`,
    values,
  );

  return NextResponse.json(updated);
}
