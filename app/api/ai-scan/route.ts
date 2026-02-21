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

interface ScanResult {
  found: boolean;
  visibility: number;
  excerpt: string;
  competitors: string[];
}

function parseStructuredResponse(text: string): ScanResult {
  // Try to extract JSON from the response (it may be wrapped in markdown code blocks)
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        found: parsed.knows_business === true,
        visibility: Math.max(0, Math.min(100, parseInt(parsed.visibility_score, 10) || 0)),
        excerpt: (parsed.summary || "").slice(0, 300),
        competitors: Array.isArray(parsed.competitors)
          ? parsed.competitors.filter((c: unknown) => typeof c === "string" && c.length > 1).slice(0, 5)
          : [],
      };
    } catch {
      // JSON parse failed, fall through to fallback
    }
  }

  // Fallback: if JSON parsing fails, be conservative
  return {
    found: false,
    visibility: 0,
    excerpt: text.split(/(?<=[.!?])\s+/).slice(0, 2).join(" ").slice(0, 300),
    competitors: [],
  };
}

async function queryPlatform(
  platform: (typeof PLATFORMS)[number],
  domain: string,
  apiKey: string
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  const prompt = `I need you to honestly evaluate whether you have real, specific knowledge about the business at "${domain}".

Be brutally honest. Do NOT make up information. Do NOT guess. If you don't specifically know this business, say so.

Respond ONLY with this JSON format, no other text:
{
  "knows_business": true/false,
  "visibility_score": 0-100,
  "summary": "What you actually know (or 'I have no specific knowledge of this business' if you don't)",
  "competitors": ["list", "of", "competitors", "mentioned", "if any"]
}

Scoring guide for visibility_score:
- 0-10: You have never heard of this business and have no information about it
- 11-30: You have vague or uncertain awareness, possibly confusing it with something else
- 31-50: You know the business name and general industry but lack specific details
- 51-70: You know key details like their services, location, or specialties
- 71-90: You have detailed knowledge including reputation, specific offerings, and differentiators
- 91-100: You have comprehensive, detailed, accurate knowledge of this business

If knows_business is false, set visibility_score between 0-15.
If you're guessing or uncertain, keep the score under 30.
List competitors only if you would genuinely recommend them as alternatives.`;

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
        model: platform.model,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 500,
        temperature: 0.1,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      throw new Error(
        `OpenRouter returned ${res.status}: ${errText.slice(0, 200)}`
      );
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || "";
    return { success: true as const, content };
  } catch (err) {
    clearTimeout(timeout);
    const error = err instanceof Error ? err : new Error("Unknown error");
    return {
      success: false as const,
      error:
        error.name === "AbortError" ? "Timed out after 30s" : error.message,
    };
  }
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

      const results: Record<string, unknown>[] = [];
      let score = 0;

      for (const platform of PLATFORMS) {
        send("scanning", {
          platformId: platform.id,
          platformName: platform.name,
        });

        const response = await queryPlatform(platform, domain, apiKey);

        if (response.success) {
          const parsed = parseStructuredResponse(response.content);
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
