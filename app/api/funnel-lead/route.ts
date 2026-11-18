import { NextRequest, NextResponse } from "next/server";

const GHL_WEBHOOK_URL = process.env.GHL_FUNNEL_WEBHOOK_URL;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NOTIFY_EMAIL = process.env.LEAD_NOTIFY_EMAIL || "hello@klemacreative.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, businessType, city, niche, source } = body;

    // Basic validation
    if (!name || !phone || !businessType || !city) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const leadData = {
      name,
      phone,
      businessType,
      city,
      niche: niche || "default",
      source: source || "ai-funnel",
      submittedAt: new Date().toISOString(),
    };

    // Fire GHL webhook (non-blocking)
    if (GHL_WEBHOOK_URL) {
      fetch(GHL_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      }).catch((err) => console.error("GHL webhook error:", err));
    }

    // Send notification email via Resend
    if (RESEND_API_KEY) {
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Klema Funnel <leads@klemacreative.com>",
          to: [NOTIFY_EMAIL],
          subject: `New AI Funnel Lead: ${name} - ${businessType} in ${city}`,
          html: `
            <h2>New AI Funnel Lead</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Business Type:</strong> ${businessType}</p>
            <p><strong>City:</strong> ${city}</p>
            <p><strong>Niche:</strong> ${niche || "default"}</p>
            <p><strong>Source:</strong> ${source}</p>
            <p><strong>Submitted:</strong> ${leadData.submittedAt}</p>
          `,
        }),
      }).catch((err) => console.error("Resend email error:", err));
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
