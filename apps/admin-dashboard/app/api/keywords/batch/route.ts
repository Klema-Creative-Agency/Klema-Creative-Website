import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { keywordService } from "@klema/db";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role === "client") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const clientId = req.nextUrl.searchParams.get("clientId");
  if (!clientId) {
    return NextResponse.json({ error: "clientId required" }, { status: 400 });
  }

  const keywords = await keywordService.getByClient(clientId);
  return NextResponse.json(keywords);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role === "client") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  if (!body.clientId || !body.keywords?.length) {
    return NextResponse.json({ error: "clientId and keywords required" }, { status: 400 });
  }

  const results = await keywordService.batchInsert(body.clientId, body.keywords);
  return NextResponse.json(results, { status: 201 });
}
