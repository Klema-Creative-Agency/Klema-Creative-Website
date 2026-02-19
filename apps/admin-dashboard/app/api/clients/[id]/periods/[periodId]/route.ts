import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { periodService } from "@klema/db";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; periodId: string }> },
) {
  const session = await auth();
  if (!session?.user || session.user.role === "client") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { periodId } = await params;
  const body = await req.json();

  const updated = await periodService.updateActuals(periodId, body);
  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}
