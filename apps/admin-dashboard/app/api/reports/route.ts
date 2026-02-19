import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { reportService } from "@klema/db";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role === "client") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const clientId = req.nextUrl.searchParams.get("clientId");
  if (!clientId) {
    return NextResponse.json({ error: "clientId required" }, { status: 400 });
  }

  const reports = await reportService.getByClient(clientId);
  return NextResponse.json(reports);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role === "client") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  if (!body.client_id || !body.month || !body.year) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const report = await reportService.create(body);
  return NextResponse.json(report, { status: 201 });
}
