export async function POST(request: Request) {
  let body: {
    email?: string;
    websiteUrl?: string;
    scanResults?: unknown;
    score?: number;
  };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { email, websiteUrl, scanResults, score } = body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json(
      { error: "Valid email is required" },
      { status: 400 }
    );
  }

  const webhookUrl = process.env.GHL_WEBHOOK_URL;
  if (!webhookUrl || webhookUrl.includes("REPLACE")) {
    console.log(
      "[capture-lead] GHL webhook not configured. Lead data:",
      JSON.stringify({ email, websiteUrl, score })
    );
    return Response.json({ success: true });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        website: websiteUrl,
        score: `${score}/6`,
        scan_results: JSON.stringify(scanResults),
        source: "ai-scanner-lead",
        timestamp: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      console.error("[capture-lead] GHL webhook error:", res.status);
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error(
      "[capture-lead] GHL webhook fetch error:",
      err instanceof Error ? err.message : err
    );
    return Response.json({ success: true });
  }
}
