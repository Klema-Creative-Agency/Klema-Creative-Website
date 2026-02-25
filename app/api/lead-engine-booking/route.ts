import { NextRequest, NextResponse } from "next/server";

interface LeadPayload {
  firstName: string;
  lastName: string;
  businessName: string;
  city: string;
  phone: string;
  email: string;
  niche: string;
  leadVolume?: string;
  marketingSpend: string;
  frustration?: string;
  source: string;
}

const REQUIRED_FIELDS: (keyof LeadPayload)[] = [
  "firstName",
  "lastName",
  "businessName",
  "city",
  "phone",
  "email",
  "marketingSpend",
];

export async function POST(request: NextRequest) {
  try {
    const body: LeadPayload = await request.json();

    // Validate required fields
    for (const field of REQUIRED_FIELDS) {
      if (!body[field] || String(body[field]).trim() === "") {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const {
      firstName,
      lastName,
      businessName,
      city,
      phone,
      email,
      niche,
      leadVolume,
      marketingSpend,
      frustration,
      source,
    } = body;

    const ghlApiKey = process.env.GHL_API_KEY;
    if (!ghlApiKey) {
      console.error("[lead-engine-booking] GHL_API_KEY not configured");
      return NextResponse.json(
        { success: false, error: "Server configuration error" },
        { status: 500 }
      );
    }

    // POST to GoHighLevel
    const ghlResponse = await fetch(
      "https://rest.gohighlevel.com/v1/contacts/",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ghlApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          name: `${firstName} ${lastName}`,
          phone,
          email,
          city,
          tags: ["AI-Lead-Engine", `niche-${niche}`, `source-${source}`],
          customField: {
            business_name: businessName,
            marketing_spend: marketingSpend,
            lead_volume: leadVolume || "",
            frustration: frustration || "",
            niche,
          },
        }),
      }
    );

    if (!ghlResponse.ok) {
      const errorText = await ghlResponse.text();
      console.error(
        `[lead-engine-booking] GHL error ${ghlResponse.status}:`,
        errorText
      );
      return NextResponse.json(
        { success: false, error: "Failed to submit application" },
        { status: 502 }
      );
    }

    console.log(
      `[lead-engine-booking] ${new Date().toISOString()} | New lead: ${firstName} ${lastName} | Niche: ${niche} | Source: ${source} | Business: ${businessName}`
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[lead-engine-booking] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
