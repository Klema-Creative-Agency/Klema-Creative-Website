import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { leadService } from "@klema/db";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role === "client") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const clientId = req.nextUrl.searchParams.get("clientId");
  if (!clientId) {
    return NextResponse.json({ error: "clientId required" }, { status: 400 });
  }

  const status = req.nextUrl.searchParams.get("status") ?? undefined;
  const leads = await leadService.getByClient(clientId, { status });
  return NextResponse.json(leads);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role === "client") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  if (!body.client_id || !body.name) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const lead = await leadService.create(body);
  return NextResponse.json(lead, { status: 201 });
}
