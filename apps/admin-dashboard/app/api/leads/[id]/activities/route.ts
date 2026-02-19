import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { leadService } from "@klema/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user || session.user.role === "client") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const activities = await leadService.getActivities(id);
  return NextResponse.json(activities);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user || session.user.role === "client") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  const activity = await leadService.addActivity({
    lead_id: id,
    user_id: session.user.id,
    activity_type: body.activity_type,
    notes: body.notes,
  });

  return NextResponse.json(activity, { status: 201 });
}
