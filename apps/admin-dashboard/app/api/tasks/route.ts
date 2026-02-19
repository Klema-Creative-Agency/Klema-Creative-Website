import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { taskService } from "@klema/db";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role === "client") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const clientId = req.nextUrl.searchParams.get("clientId");
  if (!clientId) {
    return NextResponse.json({ error: "clientId required" }, { status: 400 });
  }

  const week = req.nextUrl.searchParams.get("week");
  const status = req.nextUrl.searchParams.get("status") ?? undefined;

  const tasks = await taskService.getByClient(clientId, {
    week: week ? Number(week) : undefined,
    status,
  });
  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role === "client") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  if (!body.client_id || !body.title || !body.category) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const task = await taskService.create(body);
  return NextResponse.json(task, { status: 201 });
}
