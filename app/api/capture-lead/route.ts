interface PlatformResult {
  platformId: string;
  platformName: string;
  found: boolean;
  visibility: number;
  excerpt: string;
  competitors: string[];
  status: string;
}

function getScoreLabel(score: number, total: number): string {
  const ratio = score / total;
  if (ratio === 0) return "Invisible";
  if (ratio <= 0.2) return "Critical";
  if (ratio <= 0.4) return "Weak";
  if (ratio <= 0.6) return "Moderate";
  if (ratio <= 0.8) return "Good";
  return "Strong";
}

function getScoreColor(score: number, total: number): string {
  const ratio = score / total;
  if (ratio <= 0.33) return "#f87171";
  if (ratio <= 0.66) return "#fbbf24";
  return "#4ade80";
}

function generateRecommendations(
  score: number,
  total: number,
  results: PlatformResult[]
): string[] {
  const recs: string[] = [];
  const notFound = results.filter((r) => !r.found);
  const found = results.filter((r) => r.found);
  const hasCompetitors = results.some((r) => r.competitors?.length > 0);

  if (score === 0) {
    recs.push(
      "Your business is completely invisible to AI. This is urgent — 40% of consumers now use AI instead of Google to find businesses like yours."
    );
    recs.push(
      "Create and optimize your Google Business Profile immediately. AI models pull heavily from Google's structured data."
    );
    recs.push(
      "Build out detailed service pages on your website with location-specific content (e.g., 'plumbing services in San Antonio'). AI needs clear, structured content to learn about your business."
    );
    recs.push(
      "Get listed on authoritative directories in your industry (Yelp, BBB, industry-specific directories). Multiple consistent citations help AI models recognize your business."
    );
    recs.push(
      "Start generating reviews on Google and other platforms. AI models weight businesses with strong review signals higher in recommendations."
    );
  } else if (score <= 2) {
    if (found.length > 0) {
      recs.push(
        `${found.map((r) => r.platformName).join(" and ")} ${found.length === 1 ? "knows" : "know"} about your business, but ${notFound.map((r) => r.platformName).join(", ")} ${notFound.length === 1 ? "does" : "do"} not. You need broader coverage across all major AI platforms.`
      );
    }
    recs.push(
      "Publish FAQ-style content that directly answers questions customers ask (e.g., 'What does a marketing agency in San Antonio charge?'). AI models love structured Q&A content."
    );
    recs.push(
      "Ensure your business name, address, and phone number (NAP) are consistent across every listing online. Inconsistencies confuse AI models."
    );
    recs.push(
      "Create a detailed 'About' page with your founding story, team, credentials, and service area. AI needs rich entity data to recommend you confidently."
    );
    if (hasCompetitors) {
      recs.push(
        "AI is actively recommending your competitors instead of you. Analyze what content and signals they have that you don't, and close the gap."
      );
    }
  } else if (score <= 3) {
    recs.push(
      "You have moderate visibility but there's significant room to improve. Focus on the platforms that don't know you yet."
    );
    recs.push(
      "Build topical authority by publishing in-depth content in your area of expertise. Blog posts, case studies, and guides all help AI associate your brand with your industry."
    );
    recs.push(
      "Earn backlinks and mentions from local news outlets, industry publications, and partner businesses. Third-party mentions are one of the strongest signals for AI recommendations."
    );
    recs.push(
      "Add structured data (Schema markup) to your website — LocalBusiness, Service, FAQ, and Review schemas help AI understand your business programmatically."
    );
  } else {
    recs.push(
      "Great news — your business has strong AI visibility. Focus on maintaining and expanding your presence."
    );
    recs.push(
      "Keep publishing fresh content regularly. AI models update their knowledge, and recent content signals that your business is active and relevant."
    );
    recs.push(
      "Monitor your AI visibility monthly. The landscape changes fast — a competitor investing in AEO could overtake you."
    );
    recs.push(
      "Consider expanding your content to cover adjacent topics and services to capture even more AI recommendations in your market."
    );
  }

  return recs;
}

function buildReportHtml(
  firstName: string,
  website: string,
  score: number,
  total: number,
  results: PlatformResult[],
  recommendations: string[]
): string {
  const scoreColor = getScoreColor(score, total);
  const scoreLabel = getScoreLabel(score, total);

  const platformRows = results
    .map((r) => {
      const statusColor = r.found ? "#4ade80" : "#f87171";
      const statusText = r.found ? "Visible" : "Not Found";
      const visBar = r.found
        ? `<div style="background:#1a1a1a;border-radius:4px;height:6px;width:100%;margin-top:6px;">
            <div style="background:${getScoreColor(r.visibility, 100)};border-radius:4px;height:6px;width:${r.visibility}%;"></div>
          </div>`
        : "";
      const excerpt = r.excerpt
        ? `<p style="color:#999;font-size:13px;line-height:1.6;margin:6px 0 0;">${r.excerpt}</p>`
        : "";
      const competitors =
        r.competitors?.length > 0
          ? `<p style="color:#fbbf24;font-size:12px;margin:4px 0 0;">Competitors mentioned: ${r.competitors.join(", ")}</p>`
          : "";

      return `
        <tr>
          <td style="padding:16px 20px;border-bottom:1px solid #1a1a1a;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span style="font-weight:700;font-size:15px;color:#f0eeeb;">${r.platformName}</span>
              <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:${statusColor};background:${statusColor}15;padding:3px 10px;border-radius:20px;">${statusText}</span>
            </div>
            ${visBar}
            ${excerpt}
            ${competitors}
          </td>
        </tr>`;
    })
    .join("");

  const recItems = recommendations
    .map(
      (rec, i) =>
        `<tr>
          <td style="padding:12px 0;border-bottom:1px solid #1a1a1a;">
            <span style="display:inline-block;width:24px;height:24px;background:#4ade8018;color:#4ade80;border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:700;margin-right:12px;vertical-align:top;">${i + 1}</span>
            <span style="color:#ccc;font-size:14px;line-height:1.6;display:inline-block;width:calc(100% - 40px);vertical-align:top;">${rec}</span>
          </td>
        </tr>`
    )
    .join("");

  return `
<div style="max-width:600px;margin:0 auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">

  <!-- Header -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050505;border-radius:16px 16px 0 0;overflow:hidden;">
    <tr>
      <td style="padding:40px 32px 24px;text-align:center;">
        <div style="display:inline-flex;align-items:center;gap:8px;margin-bottom:20px;">
          <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:#4ade80;box-shadow:0 0 12px #4ade80,0 0 40px rgba(74,222,128,0.2);"></span>
          <span style="color:#f0eeeb;font-size:18px;font-weight:700;letter-spacing:-0.3px;">klema creative</span>
        </div>
        <h1 style="color:#f0eeeb;font-size:24px;font-weight:800;letter-spacing:-0.8px;margin:0 0 6px;">Your AI Visibility Report</h1>
        <p style="color:#999;font-size:14px;margin:0;">${website}</p>
      </td>
    </tr>
  </table>

  <!-- Score -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;">
    <tr>
      <td style="padding:32px;text-align:center;">
        <div style="display:inline-block;width:120px;height:120px;border-radius:50%;border:6px solid ${scoreColor};position:relative;line-height:108px;">
          <span style="font-size:44px;font-weight:900;color:${scoreColor};letter-spacing:-2px;">${score}</span>
          <span style="font-size:18px;font-weight:600;color:#666;">/${total}</span>
        </div>
        <p style="color:${scoreColor};font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;margin:16px 0 0;">${scoreLabel}</p>
        <p style="color:#999;font-size:14px;margin:8px 0 0;">AI platforms that know your business</p>
      </td>
    </tr>
  </table>

  <!-- Platform Results -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0d0d;">
    <tr>
      <td style="padding:24px 32px 8px;">
        <h2 style="color:#f0eeeb;font-size:18px;font-weight:700;margin:0 0 4px;letter-spacing:-0.3px;">Platform Breakdown</h2>
        <p style="color:#666;font-size:13px;margin:0 0 16px;">How visible you are on each AI platform</p>
      </td>
    </tr>
    <tr>
      <td style="padding:0 32px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#111;border-radius:12px;overflow:hidden;">
          ${platformRows}
        </table>
      </td>
    </tr>
  </table>

  <!-- Recommendations -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;">
    <tr>
      <td style="padding:24px 32px 8px;">
        <h2 style="color:#f0eeeb;font-size:18px;font-weight:700;margin:0 0 4px;letter-spacing:-0.3px;">Your Action Plan</h2>
        <p style="color:#666;font-size:13px;margin:0 0 16px;">Practical steps to improve your AI visibility</p>
      </td>
    </tr>
    <tr>
      <td style="padding:0 32px 32px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          ${recItems}
        </table>
      </td>
    </tr>
  </table>

  <!-- CTA -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050505;border-radius:0 0 16px 16px;">
    <tr>
      <td style="padding:32px;text-align:center;">
        <p style="color:#f0eeeb;font-size:16px;font-weight:700;margin:0 0 8px;">Want us to fix this for you?</p>
        <p style="color:#999;font-size:14px;margin:0 0 20px;line-height:1.6;">We build complete marketing engines that make your business visible everywhere — Google, AI, social, and beyond.</p>
        <a href="https://klemacreative.com/contact" style="display:inline-block;background:#4ade80;color:#000;font-size:15px;font-weight:700;padding:14px 32px;border-radius:50px;text-decoration:none;letter-spacing:-0.01em;">Book Your Free Discovery Call</a>
        <p style="color:#666;font-size:12px;margin:16px 0 0;">Free 30-min strategy session &middot; No strings attached</p>
      </td>
    </tr>
  </table>

  <!-- Footer -->
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td style="padding:24px 32px;text-align:center;">
        <p style="color:#444;font-size:11px;margin:0;">Klema Creative &middot; San Antonio, TX</p>
        <p style="color:#444;font-size:11px;margin:4px 0 0;">This report was generated by our free AI Visibility Scanner</p>
      </td>
    </tr>
  </table>

</div>`;
}

export async function POST(request: Request) {
  let body: {
    name?: string;
    phone?: string;
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

  const { name, phone, email, websiteUrl, scanResults, score } = body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json(
      { error: "Valid email is required" },
      { status: 400 }
    );
  }

  const results = Array.isArray(scanResults)
    ? (scanResults as PlatformResult[])
    : [];
  const total = 5;
  const scoreNum = typeof score === "number" ? score : 0;
  const firstName = (name || "").split(" ")[0] || "there";
  const website = websiteUrl || "";

  const scoreLabel = getScoreLabel(scoreNum, total);
  const recommendations = generateRecommendations(scoreNum, total, results);
  const reportHtml = buildReportHtml(
    firstName,
    website,
    scoreNum,
    total,
    results,
    recommendations
  );

  const platformsFound = results
    .filter((r) => r.found)
    .map((r) => r.platformName)
    .join(", ") || "None";
  const platformsNotFound = results
    .filter((r) => !r.found)
    .map((r) => r.platformName)
    .join(", ") || "None";

  const webhookUrl = process.env.GHL_WEBHOOK_URL;
  if (!webhookUrl || webhookUrl.includes("REPLACE")) {
    console.log(
      "[capture-lead] GHL webhook not configured. Lead data:",
      JSON.stringify({ name, phone, email, websiteUrl, score })
    );
    return Response.json({ success: true });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name || "",
        phone: phone || "",
        email,
        website,
        score: `${scoreNum}/${total}`,
        score_label: scoreLabel,
        platforms_found: platformsFound,
        platforms_not_found: platformsNotFound,
        recommendations: recommendations.join(" | "),
        report_html: reportHtml,
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
