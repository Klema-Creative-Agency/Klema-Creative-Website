import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { seoService } from "@klema/db";
import { spawn } from "child_process";
import path from "path";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role === "client") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const clientId = req.nextUrl.searchParams.get("clientId") || undefined;
  const status = req.nextUrl.searchParams.get("status") || undefined;
  const limit = req.nextUrl.searchParams.get("limit");

  const audits = await seoService.listAudits({
    client_id: clientId,
    status,
    limit: limit ? parseInt(limit, 10) : undefined,
  });
  return NextResponse.json(audits);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role === "client") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { url, clientId, maxPages, clientName } = body;

  if (!url) {
    return NextResponse.json({ error: "url is required" }, { status: 400 });
  }

  // Create audit record
  const audit = await seoService.createAudit({
    url,
    client_id: clientId,
    audit_type: "quick",
    config: { max_pages: maxPages },
  });

  // Spawn seo-runner detached
  const runnerPath = path.resolve(process.cwd(), "../../tools/seo-runner.mjs");
  const args = [runnerPath, audit.id, url];
  if (maxPages) args.push("--pages", String(maxPages));
  if (clientName) args.push("--client", clientName);

  const child = spawn("node", args, {
    detached: true,
    stdio: "ignore",
    env: { ...process.env },
  });
  child.unref();

  return NextResponse.json({ id: audit.id, status: "queued" }, { status: 201 });
}
