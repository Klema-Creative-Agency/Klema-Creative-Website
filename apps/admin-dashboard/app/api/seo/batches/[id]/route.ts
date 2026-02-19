import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { seoService } from "@klema/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user || session.user.role === "client") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const batch = await seoService.getBatch(id);
  if (!batch) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const audits = await seoService.getBatchAudits(id);

  return NextResponse.json({ ...batch, audits });
}
