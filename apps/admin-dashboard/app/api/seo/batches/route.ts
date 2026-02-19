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
  const batches = await seoService.listBatches(clientId);
  return NextResponse.json(batches);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role === "client") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { urls, clientId, name, sourceFilename } = body;

  if (!urls || !Array.isArray(urls) || urls.length === 0) {
    return NextResponse.json({ error: "urls array is required" }, { status: 400 });
  }

  // Create batch
  const batch = await seoService.createBatch({
    client_id: clientId,
    name,
    urls,
    source_filename: sourceFilename,
  });

  // Mark batch as running
  await seoService.updateBatch(batch.id, { status: "running" });

  // Create an audit for each URL and spawn runners
  const runnerPath = path.resolve(process.cwd(), "../../tools/seo-runner.mjs");

  for (const url of urls) {
    const audit = await seoService.createAudit({
      url,
      client_id: clientId,
      batch_id: batch.id,
      audit_type: "batch",
    });

    const child = spawn("node", [runnerPath, audit.id, url], {
      detached: true,
      stdio: "ignore",
      env: { ...process.env },
    });
    child.unref();
  }

  return NextResponse.json({ id: batch.id, total: urls.length }, { status: 201 });
}
