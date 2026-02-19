import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { seoService } from "@klema/db";
import { spawn } from "child_process";
import { writeFileSync, unlinkSync } from "fs";
import { tmpdir } from "os";
import path from "path";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user || session.user.role === "client") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const audit = await seoService.getAudit(id);
  if (!audit) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (audit.status !== "completed") {
    return NextResponse.json({ error: "Audit not completed" }, { status: 400 });
  }

  try {
    // Write category_results to a temp JSON file for the Python reporter
    const tempJson = path.join(tmpdir(), `seo-audit-${id}.json`);
    const auditData = {
      score: audit.overall_score,
      grade: audit.overall_grade,
      total_checks: audit.total_checks,
      total_passed: audit.total_passed,
      total_failed: audit.total_failed,
      total_critical: audit.total_critical,
      categories: audit.category_results,
    };
    writeFileSync(tempJson, JSON.stringify(auditData));

    const toolkitDir = path.resolve(process.cwd(), "../../tools/klema-seo");

    // Generate HTML via Python
    const html = await new Promise<string>((resolve, reject) => {
      const pyCode = `
import sys, json
sys.path.insert(0, "${toolkitDir}")
from utils.reporter import generate_dashboard
with open("${tempJson}") as f:
    audit = json.load(f)
html = generate_dashboard(audit, "${audit.url}", "${audit.client_name || ""}")
sys.stdout.write(html)
`;
      const proc = spawn("python3", ["-c", pyCode], {
        cwd: toolkitDir,
        stdio: ["ignore", "pipe", "pipe"],
      });

      let stdout = "";
      let stderr = "";
      proc.stdout.on("data", (c) => { stdout += c.toString(); });
      proc.stderr.on("data", (c) => { stderr += c.toString(); });
      proc.on("close", (code) => {
        if (code !== 0) reject(new Error(stderr.slice(-500)));
        else resolve(stdout);
      });
    });

    // Clean up temp file
    try { unlinkSync(tempJson); } catch { /* ignore */ }

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": `attachment; filename="seo-audit-${id}.html"`,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Report generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
