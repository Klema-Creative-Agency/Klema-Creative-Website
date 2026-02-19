import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { clientService } from "@klema/db";

export async function PATCH(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string; stepId: string }> },
) {
  const session = await auth();
  if (!session?.user || session.user.role === "client") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { stepId } = await params;
  const step = await clientService.completeOnboardingStep(stepId, session.user.id);
  if (!step) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(step);
}
