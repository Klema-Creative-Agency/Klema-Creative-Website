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
  const verdictStyles: Record<string, { bg: string; border: string; text: string; label: string }> = {
    strong: { bg: "#ecfdf5", border: "#10b981", text: "#065f46", label: "STRONG FIT" },
    potential: { bg: "#eff6ff", border: "#3b82f6", text: "#1e40af", label: "POTENTIAL FIT" },
    conditional: { bg: "#fffbeb", border: "#f59e0b", text: "#92400e", label: "CONDITIONAL" },
    "not-recommended": { bg: "#fef2f2", border: "#ef4444", text: "#991b1b", label: "NOT RECOMMENDED" },
  };
  const v = verdictStyles[data.verdict] || verdictStyles.potential;

  const traitLabels: Record<string, string> = {
    ss: "Self-Sufficiency", ps: "Problem Solving", sm: "Self-Motivation",
    lead: "Leadership", del: "Delegation",
  };
  const traitColors: Record<string, string> = {
    ss: "#3b82f6", ps: "#8b5cf6", sm: "#10b981", lead: "#f59e0b", del: "#06b6d4",
  };

  const companyColors: Record<string, string> = {
    "Klema Creative": "#10b981",
    "Klema Labs": "#8b5cf6",
    "InlineGraphics": "#3b82f6",
  };

  function bar(label: string, val: number, color: string) {
    return `<tr>
      <td style="padding:8px 0;color:#374151;font-size:13px;width:150px;">${label}</td>
      <td style="padding:8px 0;width:50px;text-align:right;font-family:monospace;color:#111;font-size:13px;font-weight:600;">${val}%</td>
      <td style="padding:8px 0 8px 12px;">
        <div style="background:#e5e7eb;border-radius:6px;overflow:hidden;height:12px;">
          <div style="height:100%;width:${val}%;background:${color};border-radius:6px;"></div>
        </div>
      </td>
    </tr>`;
  }

  const traitBars = Object.entries(traitLabels).map(([key, label]) => bar(label, data.traits[key] || 0, traitColors[key] || "#6b7280")).join("");
  const companyBars = data.companyScores.map(c => bar(c.name, c.pct, companyColors[c.name] || "#6b7280")).join("");
  const roleBars = data.roleScores.map(r => bar(r.name, r.pct, "#6366f1")).join("");

  const flagsHtml = data.flags.length > 0
    ? data.flags.map(f => {
        const isWarn = f.variant === "warning";
        const isPos = f.variant === "positive";
        const bg = isWarn ? "#fffbeb" : isPos ? "#ecfdf5" : "#eff6ff";
        const border = isWarn ? "#f59e0b" : isPos ? "#10b981" : "#3b82f6";
        const text = isWarn ? "#92400e" : isPos ? "#065f46" : "#1e40af";
        const icon = isWarn ? "\u26A0" : isPos ? "\u2713" : "\u2139";
        return `<div style="padding:12px 16px;margin-bottom:8px;border-radius:8px;background:${bg};border-left:4px solid ${border};">
          <span style="color:${text};font-weight:700;font-size:13px;">${icon} ${f.label}</span>
          <p style="color:#4b5563;font-size:12px;margin:4px 0 0;line-height:1.4;">${f.description}</p>
        </div>`;
      }).join("")
    : '<p style="color:#9ca3af;font-size:13px;">No behavioral flags detected.</p>';

  const redFlagsHtml = data.redFlags.length > 0
    ? data.redFlags.map(rf =>
        `<div style="padding:10px 14px;margin-bottom:6px;border-radius:8px;background:#fef2f2;border-left:4px solid #ef4444;">
          <p style="color:#991b1b;font-size:12px;margin:0;line-height:1.4;">${rf}</p>
        </div>`
      ).join("")
    : "";

  const mgmtColor = data.mgmtLevel === "Strong" ? "#10b981" : data.mgmtLevel === "Developing" ? "#f59e0b" : "#6b7280";

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#111827;">
  <div style="max-width:640px;margin:0 auto;padding:24px 16px;">

    <!-- HEADER -->
    <div style="background:#111827;border-radius:16px 16px 0 0;padding:28px 24px;text-align:center;">
      <h1 style="color:#fff;font-size:20px;margin:0 0 4px;font-weight:700;">Assessment Report</h1>
      <p style="color:#10b981;font-size:11px;margin:0;letter-spacing:3px;text-transform:uppercase;font-weight:600;">Klema Talent Assessment</p>
    </div>

    <!-- MAIN CARD -->
    <div style="background:#ffffff;border-radius:0 0 16px 16px;padding:0;border:1px solid #e5e7eb;border-top:none;">

      <!-- APPLICANT INFO -->
      <div style="padding:24px;border-bottom:1px solid #f3f4f6;">
        <table style="width:100%;">
          <tr><td style="color:#6b7280;font-size:12px;padding:4px 0;text-transform:uppercase;letter-spacing:1px;">Name</td><td style="color:#111827;font-size:14px;text-align:right;font-weight:600;">${data.name}</td></tr>
          <tr><td style="color:#6b7280;font-size:12px;padding:4px 0;text-transform:uppercase;letter-spacing:1px;">Email</td><td style="color:#111827;font-size:14px;text-align:right;">${data.email}</td></tr>
          ${data.phone ? `<tr><td style="color:#6b7280;font-size:12px;padding:4px 0;text-transform:uppercase;letter-spacing:1px;">Phone</td><td style="color:#111827;font-size:14px;text-align:right;">${data.phone}</td></tr>` : ""}
          <tr><td style="color:#6b7280;font-size:12px;padding:4px 0;text-transform:uppercase;letter-spacing:1px;">Trait Avg</td><td style="color:#111827;font-size:14px;text-align:right;font-weight:600;">${Math.round(data.traitAvg)}%</td></tr>
        </table>
      </div>

      <!-- VERDICT -->
      <div style="margin:20px;padding:20px;border-radius:12px;background:${v.bg};border:2px solid ${v.border};">
        <h2 style="color:${v.text};font-size:18px;margin:0 0 6px;font-weight:800;">${v.label}</h2>
        <p style="color:#374151;font-size:13px;margin:0 0 12px;line-height:1.5;">${data.verdictAdminNote}</p>
        ${redFlagsHtml}
      </div>

      <!-- PRIMARY PLACEMENT -->
      <div style="padding:20px 24px;border-bottom:1px solid #f3f4f6;">
        <h3 style="color:#111827;font-size:14px;margin:0 0 12px;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Primary Placement</h3>
        <div style="margin-bottom:12px;">
          <span style="display:inline-block;padding:6px 14px;border-radius:20px;background:#ecfdf5;color:#065f46;font-size:13px;font-weight:700;">${data.primaryCompany}</span>
          <span style="display:inline-block;padding:6px 14px;border-radius:20px;background:#eff6ff;color:#1e40af;font-size:13px;font-weight:600;margin-left:6px;">${data.primaryRole}</span>
        </div>
        <p style="color:#374151;font-size:13px;line-height:1.6;margin:0 0 4px;">${data.companyWhy}</p>
        <p style="color:#6b7280;font-size:13px;line-height:1.6;margin:0;">${data.roleWhy}</p>
      </div>

      <!-- ALTERNATIVE PATH -->
      <div style="padding:20px 24px;border-bottom:1px solid #f3f4f6;">
        <h3 style="color:#111827;font-size:14px;margin:0 0 12px;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Alternative Path</h3>
        <div style="margin-bottom:12px;">
          <span style="display:inline-block;padding:6px 14px;border-radius:20px;background:#f3f4f6;color:#374151;font-size:13px;font-weight:600;">${data.altCompany}</span>
          <span style="display:inline-block;padding:6px 14px;border-radius:20px;background:#f3f4f6;color:#374151;font-size:13px;margin-left:6px;">${data.secondaryRole}</span>
        </div>
        <p style="color:#6b7280;font-size:13px;line-height:1.6;margin:0 0 4px;">${data.altCompanyWhy}</p>
        <p style="color:#6b7280;font-size:13px;line-height:1.6;margin:0;">${data.altRoleWhy}</p>
      </div>

      <!-- COMPANY ALIGNMENT -->
      <div style="padding:20px 24px;border-bottom:1px solid #f3f4f6;">
        <h3 style="color:#111827;font-size:14px;margin:0 0 12px;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Company Alignment</h3>
        <table style="width:100%;">${companyBars}</table>
      </div>

      <!-- ROLE FIT -->
      <div style="padding:20px 24px;border-bottom:1px solid #f3f4f6;">
        <h3 style="color:#111827;font-size:14px;margin:0 0 12px;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Role Fit</h3>
        <table style="width:100%;">${roleBars}</table>
      </div>

      <!-- CORE TRAITS -->
      <div style="padding:20px 24px;border-bottom:1px solid #f3f4f6;">
        <h3 style="color:#111827;font-size:14px;margin:0 0 12px;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Core Traits</h3>
        <table style="width:100%;">${traitBars}</table>
      </div>

      <!-- MANAGEMENT READINESS -->
      <div style="padding:20px 24px;border-bottom:1px solid #f3f4f6;">
        <h3 style="color:#111827;font-size:14px;margin:0 0 10px;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Management Readiness</h3>
        <span style="display:inline-block;padding:5px 12px;border-radius:20px;font-size:12px;font-weight:700;color:${mgmtColor};background:${mgmtColor}15;border:1px solid ${mgmtColor}40;">${data.mgmtLevel}</span>
        <p style="color:#6b7280;font-size:13px;margin:10px 0 0;line-height:1.5;">${data.mgmtText}</p>
      </div>

      <!-- BEHAVIORAL FLAGS -->
      <div style="padding:20px 24px;">
        <h3 style="color:#111827;font-size:14px;margin:0 0 12px;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Behavioral Flags</h3>
        ${flagsHtml}
        ${data.sdFlagged ? '<div style="padding:12px 16px;margin-top:8px;border-radius:8px;background:#fffbeb;border-left:4px solid #f59e0b;"><span style="color:#92400e;font-weight:700;font-size:13px;">\u26A0 Social Desirability Flagged</span><p style="color:#4b5563;font-size:12px;margin:4px 0 0;">Responses suggest an overly positive self-assessment pattern. Validate with interview.</p></div>' : ""}
      </div>

    </div><!-- end main card -->

    <!-- FOOTER -->
    <div style="text-align:center;padding:20px 0 8px;">
      <p style="color:#9ca3af;font-size:11px;margin:0;">Klema Talent Assessment - ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
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
      console.log("[assessment-results] GHL_ASSESSMENT_WEBHOOK_URL not configured - skipping GHL");
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
      console.log("[assessment-results] RESEND_API_KEY not configured - skipping email");
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
