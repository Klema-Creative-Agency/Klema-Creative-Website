import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { clientService, db } from "@klema/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user || session.user.role === "client") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const client = await clientService.getById(id);
  if (!client) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Include current period for the overview page
  const currentPeriod = await clientService.getCurrentPeriod(id);

  return NextResponse.json({ ...client, current_period: currentPeriod || null });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user || session.user.role === "client") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  // Only allow updating specific fields
  const allowedFields = [
    "name", "business_name", "status", "industry", "phone",
    "website", "service_area", "primary_contact_name", "primary_contact_email",
  ];
  const updates: Record<string, unknown> = {};
  for (const key of allowedFields) {
    if (body[key] !== undefined) {
      updates[key] = body[key];
    }
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  const updated = await db.update("clients", id, updates);
  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}
