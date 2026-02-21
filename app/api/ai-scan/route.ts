import { NextRequest } from "next/server";

const PLATFORMS = [
  { id: "chatgpt", name: "ChatGPT", model: "openai/gpt-4o" },
  { id: "gemini", name: "Gemini", model: "google/gemini-2.0-flash-001" },
  { id: "claude", name: "Claude", model: "anthropic/claude-3.5-sonnet" },
  { id: "perplexity", name: "Perplexity", model: "perplexity/sonar" },
  { id: "llama", name: "Llama (Meta AI)", model: "meta-llama/llama-3.1-70b-instruct" },
];

// In-memory rate limiting: 3 scans per IP per hour
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW = 60 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

function extractDomain(url: string): string | null {
  try {
    let cleaned = url.trim();
    if (!/^https?:\/\//i.test(cleaned)) cleaned = "https://" + cleaned;
    const parsed = new URL(cleaned);
    return parsed.hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

interface BusinessInfo {
  name: string;
  type: string;
  location: string;
}

interface ScanResult {
  found: boolean;
  visibility: number;
  excerpt: string;
  competitors: string[];
}

async function callOpenRouter(
  model: string,
  prompt: string,
  apiKey: string,
  timeoutMs = 30000
): Promise<{ success: true; content: string } | { success: false; error: string }> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://klemacreative.com",
        "X-Title": "Klema Creative AI Scanner",
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: prompt }],
        max_tokens: 800,
        temperature: 0.1,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      throw new Error(`OpenRouter returned ${res.status}: ${errText.slice(0, 200)}`);
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || "";
    return { success: true, content };
  } catch (err) {
    clearTimeout(timeout);
    const error = err instanceof Error ? err : new Error("Unknown error");
    return {
      success: false,
      error: error.name === "AbortError" ? "Timed out after 30s" : error.message,
    };
  }
}

// Phase 1: Discover what the business is from the domain
async function discoverBusiness(
  domain: string,
  apiKey: string
): Promise<BusinessInfo> {
  const prompt = `Look at this domain name: "${domain}"

Based on the domain name and any knowledge you have about this business, determine:
1. The business name (best guess from the domain)
2. What type of business it is (e.g., "law firm", "plumber", "restaurant", "marketing agency")
3. Where it is located (city and state, if you can determine it — otherwise say "unknown")

Respond ONLY with this JSON, no other text:
{
  "name": "Business Name",
  "type": "business type",
  "location": "City, State"
}

If you cannot determine the business type, use "business".
If you cannot determine the location, use "unknown".`;

  const result = await callOpenRouter("openai/gpt-4o", prompt, apiKey, 15000);

  if (!result.success) {
    // Fallback: just use the domain name
    const nameParts = domain.split(".")[0].replace(/-/g, " ");
    return { name: nameParts, type: "business", location: "unknown" };
  }

  try {
    const jsonMatch = result.content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        name: parsed.name || domain.split(".")[0],
        type: parsed.type || "business",
        location: parsed.location || "unknown",
      };
    }
  } catch {
    // parse failed
  }

  const nameParts = domain.split(".")[0].replace(/-/g, " ");
  return { name: nameParts, type: "business", location: "unknown" };
}

// Phase 2: Ask each platform to recommend businesses and check if the target appears
function buildRecommendationPrompt(
  business: BusinessInfo,
  domain: string
): string {
  const locationClause =
    business.location !== "unknown"
      ? ` in ${business.location}`
      : "";

  return `I'm looking for the best ${business.type}${locationClause}. What do you recommend? Please list your top recommendations with brief reasons for each.

After listing your recommendations, answer these questions:
1. Did you include or mention "${business.name}" or "${domain}" in your recommendations above? (yes/no)
2. If yes, how prominently? (top pick / one of several / brief mention)
3. If no, why not? (never heard of it / heard of it but not enough info to recommend / know it but others are better)

Respond with your recommendations first, then answer the questions in this JSON format at the end:
{
  "mentioned": true/false,
  "prominence": "not_mentioned" | "brief_mention" | "one_of_several" | "top_pick",
  "reason": "brief explanation",
  "competitors_listed": ["name1", "name2", "name3"]
}`;
}

function parseRecommendationResponse(
  text: string,
  businessName: string,
  domain: string
): ScanResult {
  // Try to parse the JSON block
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  let mentioned = false;
  let prominence = "not_mentioned";
  let reason = "";
  let competitors: string[] = [];

  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[0]);
      mentioned = parsed.mentioned === true;
      prominence = parsed.prominence || "not_mentioned";
      reason = parsed.reason || "";
      competitors = Array.isArray(parsed.competitors_listed)
        ? parsed.competitors_listed
            .filter((c: unknown) => typeof c === "string" && c.length > 1)
            .slice(0, 5)
        : [];
    } catch {
      // JSON parse failed, do text-based detection
    }
  }

  // Also do a direct text scan as backup — check if the business name or domain
  // actually appears in the recommendation text (before the JSON)
  const textBeforeJson = jsonMatch ? text.slice(0, text.indexOf(jsonMatch[0])) : text;
  const lowerText = textBeforeJson.toLowerCase();
  const nameInText =
    lowerText.includes(businessName.toLowerCase()) ||
    lowerText.includes(domain.toLowerCase());

  // If the AI said not mentioned but the name IS in the text, trust the text
  if (!mentioned && nameInText) {
    mentioned = true;
    prominence = "brief_mention";
  }
  // If the AI said mentioned but the name is NOT in the text, be skeptical
  if (mentioned && !nameInText && prominence !== "top_pick") {
    // Could be a hallucination — downgrade confidence
    prominence = "brief_mention";
  }

  // Calculate visibility score based on prominence
  let visibility = 0;
  if (mentioned) {
    switch (prominence) {
      case "top_pick":
        visibility = 85 + Math.floor(Math.random() * 10); // 85-94
        break;
      case "one_of_several":
        visibility = 55 + Math.floor(Math.random() * 15); // 55-69
        break;
      case "brief_mention":
        visibility = 25 + Math.floor(Math.random() * 15); // 25-39
        break;
      default:
        visibility = 20;
    }
  } else {
    visibility = Math.floor(Math.random() * 8); // 0-7
  }

  // Build excerpt — use the reason or pull from the recommendation text
  let excerpt = reason;
  if (!excerpt && mentioned) {
    excerpt = `Your business was ${
      prominence === "top_pick"
        ? "a top recommendation"
        : prominence === "one_of_several"
        ? "listed among several options"
        : "briefly mentioned"
    } when this AI was asked for ${businessName}-type recommendations.`;
  } else if (!excerpt) {
    excerpt =
      "Your business was not mentioned when this AI was asked for recommendations in your category.";
  }

  // Filter out the target business from the competitors list
  const filteredCompetitors = competitors.filter(
    (c) =>
      !c.toLowerCase().includes(businessName.toLowerCase()) &&
      !c.toLowerCase().includes(domain.toLowerCase())
  );

  return {
    found: mentioned,
    visibility,
    excerpt: excerpt.slice(0, 300),
    competitors: filteredCompetitors,
  };
}

export async function POST(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  if (!checkRateLimit(ip)) {
    return Response.json(
      { error: "Rate limit exceeded. Try again in an hour." },
      { status: 429 }
    );
  }

  let body: { url?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { url } = body;
  if (!url || typeof url !== "string") {
    return Response.json({ error: "URL is required" }, { status: 400 });
  }

  const domain = extractDomain(url);
  if (!domain) {
    return Response.json({ error: "Invalid URL format" }, { status: 400 });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey || apiKey.includes("REPLACE")) {
    return Response.json(
      { error: "API key not configured" },
      { status: 500 }
    );
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      function send(event: string, data: Record<string, unknown>) {
        controller.enqueue(
          encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
        );
      }

      // Phase 1: Discover the business
      send("scanning", {
        platformId: "discovery",
        platformName: "Identifying your business...",
      });

      const business = await discoverBusiness(domain, apiKey);

      // Phase 2: Query each platform with a realistic recommendation prompt
      const prompt = buildRecommendationPrompt(business, domain);
      const results: Record<string, unknown>[] = [];
      let score = 0;

      for (const platform of PLATFORMS) {
        send("scanning", {
          platformId: platform.id,
          platformName: platform.name,
        });

        const response = await callOpenRouter(platform.model, prompt, apiKey);

        if (response.success) {
          const parsed = parseRecommendationResponse(
            response.content,
            business.name,
            domain
          );
          const result = {
            platformId: platform.id,
            platformName: platform.name,
            found: parsed.found,
            excerpt: parsed.excerpt,
            competitors: parsed.competitors,
            visibility: parsed.visibility,
            status: "complete",
          };
          if (parsed.found) score++;
          results.push(result);
          send("result", result);
        } else {
          const result = {
            platformId: platform.id,
            platformName: platform.name,
            found: false,
            excerpt: "",
            competitors: [],
            visibility: 0,
            status: "error",
            error: "Unable to check this platform",
          };
          results.push(result);
          send("result", result);
        }
      }

      send("complete", { score, total: PLATFORMS.length, domain, results });
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
