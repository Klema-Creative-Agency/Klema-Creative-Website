import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { clientService } from "@klema/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user || session.user.role === "client") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const progress = await clientService.getOnboardingProgress(id);
  return NextResponse.json(progress);
}
