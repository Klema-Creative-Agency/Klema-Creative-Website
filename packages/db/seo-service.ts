import { queryAll, queryOne, db } from "./connection";

export const seoService = {
  // ─── Audits ────────────────────────────────────────────

  async createAudit(data: {
    url: string;
    client_id?: string;
    batch_id?: string;
    audit_type?: string;
    config?: Record<string, unknown>;
  }) {
    return db.insert("seo_audits", {
      url: data.url,
      client_id: data.client_id || null,
      batch_id: data.batch_id || null,
      audit_type: data.audit_type || "quick",
      status: "queued",
      config: JSON.stringify(data.config || {}),
    });
  },

  async getAudit(id: string) {
    return queryOne("SELECT * FROM seo_audits WHERE id = $1", [id]);
  },

  async getAuditStatus(id: string) {
    return queryOne(
      "SELECT id, status, overall_score, overall_grade, error_message, started_at, completed_at FROM seo_audits WHERE id = $1",
      [id],
    );
  },

  async listAudits(filters?: { client_id?: string; status?: string; limit?: number }) {
    let text = "SELECT id, client_id, url, audit_type, status, overall_score, overall_grade, pages_crawled, audit_duration_ms, created_at FROM seo_audits";
    const params: unknown[] = [];
    const conditions: string[] = [];

    if (filters?.client_id) {
      conditions.push(`client_id = $${params.length + 1}`);
      params.push(filters.client_id);
    }
    if (filters?.status) {
      conditions.push(`status = $${params.length + 1}`);
      params.push(filters.status);
    }
    if (conditions.length) {
      text += " WHERE " + conditions.join(" AND ");
    }
    text += " ORDER BY created_at DESC";
    if (filters?.limit) {
      text += ` LIMIT $${params.length + 1}`;
      params.push(filters.limit);
    }
    return queryAll(text, params);
  },

  async updateAudit(id: string, data: Record<string, unknown>) {
    const allowed = [
      "status", "overall_score", "overall_grade",
      "total_checks", "total_passed", "total_failed", "total_critical",
      "category_results", "recommendations",
      "pages_crawled", "crawl_duration_ms", "audit_duration_ms",
      "html_report_path", "error_message",
      "started_at", "completed_at",
    ];
    const filtered: Record<string, unknown> = {};
    for (const key of allowed) {
      if (data[key] !== undefined) {
        filtered[key] = key === "category_results" || key === "recommendations"
          ? JSON.stringify(data[key])
          : data[key];
      }
    }
    return db.update("seo_audits", id, filtered);
  },

  async deleteAudit(id: string) {
    return db.delete("seo_audits", id);
  },

  // ─── Batches ───────────────────────────────────────────

  async createBatch(data: {
    client_id?: string;
    name?: string;
    urls: string[];
    source_filename?: string;
  }) {
    return db.insert("seo_audit_batches", {
      client_id: data.client_id || null,
      name: data.name || `Batch ${new Date().toLocaleDateString()}`,
      status: "queued",
      total_urls: data.urls.length,
      source_filename: data.source_filename || null,
    });
  },

  async getBatch(id: string) {
    return queryOne("SELECT * FROM seo_audit_batches WHERE id = $1", [id]);
  },

  async listBatches(clientId?: string) {
    if (clientId) {
      return queryAll(
        "SELECT * FROM seo_audit_batches WHERE client_id = $1 ORDER BY created_at DESC",
        [clientId],
      );
    }
    return queryAll("SELECT * FROM seo_audit_batches ORDER BY created_at DESC");
  },

  async updateBatch(id: string, data: Record<string, unknown>) {
    const allowed = ["status", "completed_urls", "failed_urls", "name"];
    const filtered: Record<string, unknown> = {};
    for (const key of allowed) {
      if (data[key] !== undefined) filtered[key] = data[key];
    }
    return db.update("seo_audit_batches", id, filtered);
  },

  async getBatchAudits(batchId: string) {
    return queryAll(
      "SELECT id, url, status, overall_score, overall_grade, error_message, created_at FROM seo_audits WHERE batch_id = $1 ORDER BY created_at",
      [batchId],
    );
  },

  // ─── Fixes ────────────────────────────────────────────

  async createFixes(auditId: string, clientId: string | null, recommendations: Array<{
    category: string;
    severity: string;
    title: string;
    description: string;
    page_url?: string;
  }>) {
    const fixes = [];
    for (const rec of recommendations) {
      const fix = await db.insert("seo_fixes", {
        audit_id: auditId,
        client_id: clientId,
        category: rec.category,
        severity: rec.severity,
        title: rec.title,
        description: rec.description,
        page_url: rec.page_url || null,
        status: "open",
        auto_fixable: false,
      });
      fixes.push(fix);
    }
    return fixes;
  },

  async getFixesByAudit(auditId: string) {
    return queryAll(
      "SELECT * FROM seo_fixes WHERE audit_id = $1 ORDER BY CASE severity WHEN 'critical' THEN 0 WHEN 'warning' THEN 1 ELSE 2 END, created_at",
      [auditId],
    );
  },

  async updateFix(id: string, data: Record<string, unknown>) {
    const allowed = ["status", "fix_code", "fix_explanation", "fixed_by", "fixed_at"];
    const filtered: Record<string, unknown> = {};
    for (const key of allowed) {
      if (data[key] !== undefined) filtered[key] = data[key];
    }
    return db.update("seo_fixes", id, filtered);
  },
};
