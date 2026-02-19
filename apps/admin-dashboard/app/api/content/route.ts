import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { contentService } from "@klema/db";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role === "client") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const clientId = req.nextUrl.searchParams.get("clientId");
  if (!clientId) {
    return NextResponse.json({ error: "clientId required" }, { status: 400 });
  }

  const type = req.nextUrl.searchParams.get("type") ?? undefined;
  const status = req.nextUrl.searchParams.get("status") ?? undefined;

  const items = await contentService.getByClient(clientId, { type, status });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role === "client") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  if (!body.client_id || !body.title || !body.content_type) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const item = await contentService.create(body);
  return NextResponse.json(item, { status: 201 });
}
