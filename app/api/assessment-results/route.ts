import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

interface AssessmentPayload {
  name: string;
  email: string;
  phone?: string;
  traits: Record<string, number>;
  primaryCompany: string;
  altCompany: string;
  companyWhy: string;
  altCompanyWhy: string;
  primaryRole: string;
  secondaryRole: string;
  roleWhy: string;
  altRoleWhy: string;
  mgmtLevel: string;
  mgmtScore: number;
  mgmtText: string;
  verdict: string;
  verdictLabel: string;
  verdictText: string;
  verdictAdminNote: string;
  redFlags: string[];
  traitAvg: number;
  flags: { label: string; description: string; variant: string }[];
  sdFlagged: boolean;
  companyScores: { name: string; pct: number }[];
  roleScores: { name: string; pct: number }[];
}

const ADMIN_EMAIL = "tamaya@klemacreative.com";

function buildAdminEmailHtml(data: AssessmentPayload): string {
  const verdictColors: Record<string, string> = {
    strong: "#4ade80",
    potential: "#60a5fa",
    conditional: "#fbbf24",
    "not-recommended": "#ef4444",
  };
  const verdictColor = verdictColors[data.verdict] || "#888";

  const traitLabels: Record<string, string> = {
    ss: "Self-Sufficiency", ps: "Problem Solving", sm: "Self-Motivation",
    lead: "Leadership", del: "Delegation",
  };

  const traitBars = Object.entries(traitLabels)
    .map(([key, label]) => {
      const val = data.traits[key] || 0;
      return `
        <tr>
          <td style="padding:6px 12px;color:#ccc;font-size:13px;width:140px;">${label}</td>
          <td style="padding:6px 12px;width:60px;text-align:right;font-family:monospace;color:#fff;font-size:13px;">${val}%</td>
          <td style="padding:6px 12px;">
            <div style="background:#1a1a2e;border-radius:4px;overflow:hidden;height:10px;">
              <div style="height:100%;width:${val}%;background:${verdictColor};border-radius:4px;"></div>
            </div>
          </td>
        </tr>`;
    })
    .join("");

  const flagsHtml = data.flags.length > 0
    ? data.flags.map(f => {
        const fColor = f.variant === "warning" ? "#fbbf24" : f.variant === "positive" ? "#4ade80" : "#60a5fa";
        const icon = f.variant === "warning" ? "\u26A0" : f.variant === "positive" ? "\u2713" : "\u2139";
        return `<div style="padding:10px 14px;margin-bottom:6px;border-radius:8px;background:#1a1a2e;border-left:3px solid ${fColor};">
          <span style="color:${fColor};font-weight:600;font-size:13px;">${icon} ${f.label}</span>
          <p style="color:#999;font-size:12px;margin:4px 0 0;">${f.description}</p>
        </div>`;
      }).join("")
    : '<p style="color:#666;font-size:13px;">No behavioral flags detected.</p>';

  const redFlagsHtml = data.redFlags.length > 0
    ? data.redFlags.map(rf =>
        `<div style="padding:8px 12px;margin-bottom:4px;border-radius:6px;background:#2a1010;border-left:3px solid #ef4444;">
          <p style="color:#fca5a5;font-size:12px;margin:0;">${rf}</p>
        </div>`
      ).join("")
    : "";

  const companyBars = data.companyScores
    .map(c => `
      <tr>
        <td style="padding:4px 12px;color:#ccc;font-size:13px;width:140px;">${c.name}</td>
        <td style="padding:4px 12px;width:50px;text-align:right;font-family:monospace;color:#fff;font-size:13px;">${c.pct}%</td>
        <td style="padding:4px 12px;">
          <div style="background:#1a1a2e;border-radius:4px;overflow:hidden;height:8px;">
            <div style="height:100%;width:${c.pct}%;background:${verdictColor};border-radius:4px;"></div>
          </div>
        </td>
      </tr>`)
    .join("");

  const roleBars = data.roleScores
    .map(r => `
      <tr>
        <td style="padding:4px 12px;color:#ccc;font-size:13px;width:140px;">${r.name}</td>
        <td style="padding:4px 12px;width:50px;text-align:right;font-family:monospace;color:#fff;font-size:13px;">${r.pct}%</td>
        <td style="padding:4px 12px;">
          <div style="background:#1a1a2e;border-radius:4px;overflow:hidden;height:8px;">
            <div style="height:100%;width:${r.pct}%;background:#4ade80;border-radius:4px;"></div>
          </div>
        </td>
      </tr>`)
    .join("");

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0a0a14;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:640px;margin:0 auto;padding:32px 20px;">

    <!-- HEADER -->
    <div style="text-align:center;padding-bottom:24px;border-bottom:1px solid #1a1a2e;">
      <h1 style="color:#fff;font-size:22px;margin:0 0 4px;">Assessment Report</h1>
      <p style="color:#4ade80;font-size:14px;margin:0;letter-spacing:2px;text-transform:uppercase;">Klema Talent Assessment</p>
    </div>

    <!-- APPLICANT INFO -->
    <div style="padding:20px 0;border-bottom:1px solid #1a1a2e;">
      <table style="width:100%;">
        <tr><td style="color:#888;font-size:12px;padding:3px 0;">Name</td><td style="color:#fff;font-size:14px;text-align:right;">${data.name}</td></tr>
        <tr><td style="color:#888;font-size:12px;padding:3px 0;">Email</td><td style="color:#fff;font-size:14px;text-align:right;">${data.email}</td></tr>
        ${data.phone ? `<tr><td style="color:#888;font-size:12px;padding:3px 0;">Phone</td><td style="color:#fff;font-size:14px;text-align:right;">${data.phone}</td></tr>` : ""}
        <tr><td style="color:#888;font-size:12px;padding:3px 0;">Trait Average</td><td style="color:#fff;font-size:14px;text-align:right;">${Math.round(data.traitAvg)}%</td></tr>
      </table>
    </div>

    <!-- VERDICT -->
    <div style="margin:24px 0;padding:20px;border-radius:12px;background:#111122;border:1px solid ${verdictColor}40;">
      <h2 style="color:${verdictColor};font-size:18px;margin:0 0 8px;">${data.verdictLabel}</h2>
      <p style="color:#ccc;font-size:13px;margin:0 0 12px;line-height:1.5;">${data.verdictAdminNote}</p>
      ${redFlagsHtml}
    </div>

    <!-- PRIMARY PLACEMENT -->
    <div style="margin:20px 0;padding:20px;border-radius:12px;background:#111122;">
      <h3 style="color:#fff;font-size:15px;margin:0 0 12px;">Primary Placement</h3>
      <div style="margin-bottom:12px;">
        <span style="display:inline-block;padding:4px 12px;border-radius:20px;background:#4ade8020;color:#4ade80;font-size:12px;font-weight:600;border:1px solid #4ade8040;">${data.primaryCompany}</span>
        <span style="display:inline-block;padding:4px 12px;border-radius:20px;background:#4ade8020;color:#4ade80;font-size:12px;margin-left:6px;border:1px solid #4ade8040;">${data.primaryRole}</span>
      </div>
      <p style="color:#999;font-size:13px;line-height:1.5;margin:0 0 6px;">${data.companyWhy}</p>
      <p style="color:#999;font-size:13px;line-height:1.5;margin:0;">${data.roleWhy}</p>
    </div>

    <!-- ALTERNATIVE PATH -->
    <div style="margin:20px 0;padding:20px;border-radius:12px;background:#111122;">
      <h3 style="color:#fff;font-size:15px;margin:0 0 12px;">Alternative Path (Option B)</h3>
      <div style="margin-bottom:12px;">
        <span style="display:inline-block;padding:4px 12px;border-radius:20px;background:#ffffff10;color:#999;font-size:12px;border:1px solid #ffffff15;">${data.altCompany}</span>
        <span style="display:inline-block;padding:4px 12px;border-radius:20px;background:#ffffff10;color:#999;font-size:12px;margin-left:6px;border:1px solid #ffffff15;">${data.secondaryRole}</span>
      </div>
      <p style="color:#888;font-size:13px;line-height:1.5;margin:0 0 6px;">${data.altCompanyWhy}</p>
      <p style="color:#888;font-size:13px;line-height:1.5;margin:0;">${data.altRoleWhy}</p>
    </div>

    <!-- COMPANY SCORES -->
    <div style="margin:20px 0;padding:20px;border-radius:12px;background:#111122;">
      <h3 style="color:#fff;font-size:15px;margin:0 0 12px;">Company Alignment</h3>
      <table style="width:100%;">${companyBars}</table>
    </div>

    <!-- ROLE SCORES -->
    <div style="margin:20px 0;padding:20px;border-radius:12px;background:#111122;">
      <h3 style="color:#fff;font-size:15px;margin:0 0 12px;">Role Fit</h3>
      <table style="width:100%;">${roleBars}</table>
    </div>

    <!-- TRAIT SCORES -->
    <div style="margin:20px 0;padding:20px;border-radius:12px;background:#111122;">
      <h3 style="color:#fff;font-size:15px;margin:0 0 12px;">Core Traits</h3>
      <table style="width:100%;">${traitBars}</table>
    </div>

    <!-- MANAGEMENT READINESS -->
    <div style="margin:20px 0;padding:20px;border-radius:12px;background:#111122;">
      <h3 style="color:#fff;font-size:15px;margin:0 0 8px;">Management Readiness: ${data.mgmtLevel}</h3>
      <p style="color:#999;font-size:13px;margin:0;line-height:1.5;">${data.mgmtText}</p>
    </div>

    <!-- BEHAVIORAL FLAGS -->
    <div style="margin:20px 0;padding:20px;border-radius:12px;background:#111122;">
      <h3 style="color:#fff;font-size:15px;margin:0 0 12px;">Behavioral Flags</h3>
      ${flagsHtml}
      ${data.sdFlagged ? '<div style="padding:10px 14px;margin-top:8px;border-radius:8px;background:#2a2010;border-left:3px solid #fbbf24;"><span style="color:#fbbf24;font-weight:600;font-size:13px;">\u26A0 Social Desirability Flagged</span><p style="color:#999;font-size:12px;margin:4px 0 0;">Responses suggest an overly positive self-assessment pattern. Validate with interview.</p></div>' : ""}
    </div>

    <!-- FOOTER -->
    <div style="text-align:center;padding-top:24px;border-top:1px solid #1a1a2e;">
      <p style="color:#555;font-size:11px;margin:0;">Klema Talent Assessment &mdash; ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  try {
    const body: AssessmentPayload = await request.json();

    // Validate required fields
    if (!body.name?.trim() || !body.email?.trim()) {
      return NextResponse.json(
        { success: false, error: "Name and email are required" },
        { status: 400 }
      );
    }

    const results: { ghl: boolean; email: boolean } = { ghl: false, email: false };

    // ── 1. POST TO GHL WEBHOOK ──
    const ghlWebhookUrl = process.env.GHL_ASSESSMENT_WEBHOOK_URL;
    if (ghlWebhookUrl) {
      try {
        const nameParts = body.name.trim().split(/\s+/);
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(" ") || "";

        const ghlResponse = await fetch(ghlWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            // Contact info
            firstName,
            lastName,
            full_name: body.name,
            phone: body.phone || "",
            email: body.email,

            // Verdict
            verdict: body.verdict,
            verdict_label: body.verdictLabel,
            admin_note: body.verdictAdminNote,
            red_flags: body.redFlags.length > 0 ? body.redFlags.join(" | ") : "None",

            // Placement
            primary_company: body.primaryCompany,
            primary_role: body.primaryRole,
            company_why: body.companyWhy,
            role_why: body.roleWhy,

            // Alternative path
            alt_company: body.altCompany,
            alt_company_why: body.altCompanyWhy,
            secondary_role: body.secondaryRole,
            alt_role_why: body.altRoleWhy,

            // Management
            mgmt_level: body.mgmtLevel,
            mgmt_score: Math.round(body.mgmtScore),
            mgmt_text: body.mgmtText,

            // Trait scores
            trait_avg: Math.round(body.traitAvg),
            self_sufficiency: body.traits.ss,
            problem_solving: body.traits.ps,
            self_motivation: body.traits.sm,
            leadership: body.traits.lead,
            delegation: body.traits.del,

            // Flags
            behavioral_flags: body.flags.length > 0
              ? body.flags.map(f => f.label).join(", ")
              : "None",
            sd_flagged: body.sdFlagged,

            // Tags for GHL workflow
            tags: [
              "Talent-Assessment",
              `verdict-${body.verdict}`,
              `company-${body.primaryCompany.toLowerCase().replace(/\s+/g, "-")}`,
              `role-${body.primaryRole.toLowerCase().replace(/[\s/]+/g, "-")}`,
              body.mgmtLevel === "Strong" ? "mgmt-ready" : "",
              body.sdFlagged ? "sd-flagged" : "",
            ].filter(Boolean).join(", "),

            // Timestamp
            submitted_at: new Date().toISOString(),
          }),
        });

        if (ghlResponse.ok) {
          results.ghl = true;
        } else {
          console.error(`[assessment-results] GHL webhook error ${ghlResponse.status}:`, await ghlResponse.text());
        }
      } catch (ghlErr) {
        console.error("[assessment-results] GHL webhook request failed:", ghlErr);
      }
    } else {
      console.log("[assessment-results] GHL_ASSESSMENT_WEBHOOK_URL not configured — skipping GHL");
    }

    // ── 2. SEND EMAIL REPORT ──
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const html = buildAdminEmailHtml(body);

        await resend.emails.send({
          from: "Klema Assessment <assessments@contact.klemacreative.com>",
          to: [ADMIN_EMAIL],
          subject: `[${body.verdictLabel}] Assessment: ${body.name} → ${body.primaryCompany} / ${body.primaryRole}`,
          html,
        });

        results.email = true;
      } catch (emailErr) {
        console.error("[assessment-results] Email send failed:", emailErr);
      }
    } else {
      console.log("[assessment-results] RESEND_API_KEY not configured — skipping email");
      console.log("[assessment-results] Report data:", JSON.stringify({
        name: body.name,
        email: body.email,
        verdict: body.verdictLabel,
        primaryCompany: body.primaryCompany,
        primaryRole: body.primaryRole,
        traitAvg: Math.round(body.traitAvg),
        redFlags: body.redFlags,
      }));
    }

    console.log(
      `[assessment-results] ${new Date().toISOString()} | ${body.name} | ${body.verdictLabel} | ${body.primaryCompany} / ${body.primaryRole} | GHL:${results.ghl} Email:${results.email}`
    );

    return NextResponse.json({ success: true, ...results });
  } catch (err) {
    console.error("[assessment-results] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
