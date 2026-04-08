import type { VercelRequest, VercelResponse } from "@vercel/node";

const GHL_WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/MFEIp7HVoKxeA83V9Bmg/webhook-trigger/3c9c59be-b8de-434e-9d57-7989637e380d";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, phone, trade, email, message } = req.body;

  if (!name || !phone || !trade || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const response = await fetch(GHL_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        trade,
        email,
        message: message || "",
        source: "klemacreative.com",
      }),
    });

    if (!response.ok) throw new Error(`GHL responded ${response.status}`);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("GHL webhook error:", error);
    return res.status(500).json({ error: "Failed to submit lead" });
  }
}
