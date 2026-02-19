#!/usr/bin/env node
/**
 * SEO Runner — Node.js bridge between the admin dashboard and the Python audit toolkit.
 *
 * Usage (called by the API route, not directly):
 *   node tools/seo-runner.mjs <audit-id> <url> [--pages N] [--client "Name"]
 *
 * Workflow:
 *   1. Updates DB row → 'running'
 *   2. Spawns: python3 tools/klema-seo/run_audit.py <url> --json
 *   3. Captures stdout JSON
 *   4. Writes results to DB → 'completed'
 *   5. Extracts recommendations → seo_fixes rows
 */

import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import pg from "pg";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const TOOLKIT_DIR = join(__dirname, "klema-seo");
const PYTHON = "python3";

// ─── Database ────────────────────────────────────────────────────────────────

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  max: 2,
  ssl: process.env.DATABASE_URL?.includes("neon.tech")
    ? { rejectUnauthorized: false }
    : undefined,
});

async function dbUpdate(auditId, data) {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const sets = keys.map((k, i) => `${k} = $${i + 1}`);
  await pool.query(
    `UPDATE seo_audits SET ${sets.join(", ")} WHERE id = $${keys.length + 1}`,
    [...values, auditId],
  );
}

async function insertFix(data) {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const placeholders = keys.map((_, i) => `$${i + 1}`);
  await pool.query(
    `INSERT INTO seo_fixes (${keys.join(", ")}) VALUES (${placeholders.join(", ")})`,
    values,
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const auditId = args[0];
  const url = args[1];

  if (!auditId || !url) {
    console.error("Usage: seo-runner.mjs <audit-id> <url> [--pages N] [--client Name]");
    process.exit(1);
  }

  // Parse optional args
  let maxPages = null;
  let clientName = "";
  for (let i = 2; i < args.length; i++) {
    if (args[i] === "--pages" && args[i + 1]) {
      maxPages = parseInt(args[++i], 10);
    } else if (args[i] === "--client" && args[i + 1]) {
      clientName = args[++i];
    }
  }

  console.log(`[seo-runner] Starting audit ${auditId} for ${url}`);

  // Mark as running
  await dbUpdate(auditId, {
    status: "running",
    started_at: new Date().toISOString(),
  });

  // Build python command
  const pyArgs = [join(TOOLKIT_DIR, "run_audit.py"), url, "--json"];
  if (maxPages) pyArgs.push("--pages", String(maxPages));
  if (clientName) pyArgs.push("--client", clientName);

  try {
    const result = await runPython(pyArgs);

    // Parse JSON from stdout
    const data = JSON.parse(result.stdout);

    if (data.error) {
      throw new Error(data.error);
    }

    // Update audit row with results
    await dbUpdate(auditId, {
      status: "completed",
      overall_score: data.overall_score,
      overall_grade: data.overall_grade,
      total_checks: data.total_checks,
      total_passed: data.total_passed,
      total_failed: data.total_failed,
      total_critical: data.total_critical,
      pages_crawled: data.pages_crawled,
      crawl_duration_ms: data.crawl_duration_ms,
      audit_duration_ms: data.audit_duration_ms,
      category_results: JSON.stringify(data.category_results),
      recommendations: JSON.stringify(data.recommendations),
      completed_at: new Date().toISOString(),
    });

    // Get the audit row to check for client_id
    const auditRow = await pool.query("SELECT client_id FROM seo_audits WHERE id = $1", [auditId]);
    const clientId = auditRow.rows[0]?.client_id || null;

    // Insert seo_fixes from recommendations
    for (const rec of data.recommendations || []) {
      await insertFix({
        audit_id: auditId,
        client_id: clientId,
        category: rec.category,
        severity: rec.severity,
        title: rec.title,
        description: rec.description || rec.recommendation,
        page_url: rec.page_url || null,
        status: "open",
        auto_fixable: false,
      });
    }

    // Update batch progress if this is a batch audit
    const batchCheck = await pool.query("SELECT batch_id FROM seo_audits WHERE id = $1", [auditId]);
    const batchId = batchCheck.rows[0]?.batch_id;
    if (batchId) {
      await pool.query(
        "UPDATE seo_audit_batches SET completed_urls = completed_urls + 1 WHERE id = $1",
        [batchId],
      );
      // Check if batch is complete
      const batch = await pool.query("SELECT total_urls, completed_urls, failed_urls FROM seo_audit_batches WHERE id = $1", [batchId]);
      const b = batch.rows[0];
      if (b && b.completed_urls + b.failed_urls >= b.total_urls) {
        await pool.query("UPDATE seo_audit_batches SET status = 'completed' WHERE id = $1", [batchId]);
      }
    }

    console.log(`[seo-runner] Audit ${auditId} completed: ${data.overall_score}/100 (${data.overall_grade})`);
  } catch (err) {
    console.error(`[seo-runner] Audit ${auditId} failed:`, err.message);

    await dbUpdate(auditId, {
      status: "failed",
      error_message: err.message,
      completed_at: new Date().toISOString(),
    });

    // Update batch failed count if applicable
    const batchCheck = await pool.query("SELECT batch_id FROM seo_audits WHERE id = $1", [auditId]);
    const batchId = batchCheck.rows[0]?.batch_id;
    if (batchId) {
      await pool.query(
        "UPDATE seo_audit_batches SET failed_urls = failed_urls + 1 WHERE id = $1",
        [batchId],
      );
    }
  } finally {
    await pool.end();
  }
}

// ─── Python subprocess ───────────────────────────────────────────────────────

function runPython(args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(PYTHON, args, {
      cwd: TOOLKIT_DIR,
      env: { ...process.env },
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";

    proc.stdout.on("data", (chunk) => { stdout += chunk.toString(); });
    proc.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
      // Stream stderr to console for progress visibility
      process.stderr.write(chunk);
    });

    proc.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Python exited with code ${code}: ${stderr.slice(-500)}`));
      } else {
        resolve({ stdout, stderr });
      }
    });

    proc.on("error", (err) => {
      reject(new Error(`Failed to start Python: ${err.message}`));
    });
  });
}

main().catch((err) => {
  console.error("[seo-runner] Fatal:", err);
  process.exit(1);
});
