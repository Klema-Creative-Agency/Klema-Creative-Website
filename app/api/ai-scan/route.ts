import { NextRequest } from "next/server";

const PLATFORMS = [
  { id: "chatgpt", name: "ChatGPT", model: "openai/gpt-4o" },
  { id: "gemini", name: "Gemini", model: "google/gemini-2.5-flash" },
  { id: "claude", name: "Claude", model: "anthropic/claude-haiku-4.5" },
  { id: "perplexity", name: "Perplexity", model: "perplexity/sonar" },
  {
    id: "llama",
    name: "Llama (Meta AI)",
    model: "meta-llama/llama-3.3-70b-instruct",
  },
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
  description: string;
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
        max_tokens: 1000,
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
  const prompt = `Given the domain "${domain}", determine what business this is.

Respond ONLY with JSON in this exact format (no markdown, no code fences):
{"name": "Business Name", "type": "business type", "location": "City, State", "description": "one sentence about what they do"}

Rules:
- "name": The business name (infer from domain if unknown). Example: "acmeplumbing.com" → "Acme Plumbing"
- "type": Category like "restaurant", "law firm", "marketing agency", "plumber". Use "business" if unsure.
- "location": City and state if known, otherwise "unknown"
- "description": Brief description of their services. Use "General business services" if unsure.`;

  const result = await callOpenRouter("openai/gpt-4o", prompt, apiKey, 15000);

  if (!result.success) {
    return fallbackBusinessInfo(domain);
  }

  try {
    // Strip markdown code fences if present
    const cleaned = result.content.replace(/```(?:json)?\s*/g, "").replace(/```/g, "").trim();
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        name: parsed.name || fallbackName(domain),
        type: parsed.type || "business",
        location: parsed.location || "unknown",
        description: parsed.description || "General business services",
      };
    }
  } catch {
    // parse failed
  }

  return fallbackBusinessInfo(domain);
}

function fallbackName(domain: string): string {
  return domain
    .split(".")[0]
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function fallbackBusinessInfo(domain: string): BusinessInfo {
  return {
    name: fallbackName(domain),
    type: "business",
    location: "unknown",
    description: "General business services",
  };
}

// Phase 2: Build prompts for each platform
function buildStandardPrompt(business: BusinessInfo, domain: string): string {
  const locationClause =
    business.location !== "unknown" ? ` in ${business.location}` : "";

  return `Tell me what you know about the business "${business.name}" (${domain}). They are a ${business.type}${locationClause}. ${business.description}

Please respond with these three sections using exactly these bold headers:

**Visibility:** Describe what you know about ${business.name}. Include any facts about their services, reputation, history, or online presence. If you have no specific knowledge of this business, say the exact phrase "I have no specific knowledge of this business."

**Competitors:** List up to 5 competing businesses in the same industry${locationClause}. Use a simple list with dashes.

**Action Plan:** Give 2-3 specific, actionable recommendations for how ${business.name} could improve their visibility in AI search results and recommendations.`;
}

function buildPerplexityPrompt(business: BusinessInfo, domain: string): string {
  const locationClause =
    business.location !== "unknown" ? ` in ${business.location}` : "";

  return `Search for information about "${business.name}" (${domain}). They are a ${business.type}${locationClause}. ${business.description}

Please respond with these three sections using exactly these bold headers:

**Visibility:** Describe what you can find about ${business.name} online. Include information about their website, reviews, social media presence, or any other online footprint. If you cannot find any information, say the exact phrase "I have no specific knowledge of this business."

**Competitors:** List up to 5 competing businesses in the same industry${locationClause} that appear in search results. Use a simple list with dashes.

**Action Plan:** Give 2-3 specific, actionable recommendations for how ${business.name} could improve their online presence and visibility in AI-powered search.`;
}

// Deterministic server-side scoring
const NO_KNOWLEDGE_PHRASES = [
  "i have no specific knowledge",
  "i don't have specific information",
  "i don't have any specific",
  "i'm not familiar with",
  "i am not familiar with",
  "i couldn't find any",
  "i could not find any",
  "no specific information",
  "no information available",
  "i don't have details",
  "unable to find information",
  "i cannot find any",
  "i have no information",
];

function scoreVisibility(
  visibilityText: string,
  fullResponse: string,
  businessName: string,
  domain: string
): { score: number; found: boolean } {
  const lower = visibilityText.toLowerCase();

  // Check for "no knowledge" indicators
  if (NO_KNOWLEDGE_PHRASES.some((phrase) => lower.includes(phrase))) {
    return { score: 0, found: false };
  }

  let score = 0;
  const fullLower = fullResponse.toLowerCase();
  const nameLower = businessName.toLowerCase();
  const domainLower = domain.toLowerCase();

  // Multiple mentions of business name (+15)
  const nameMatches = fullLower.split(nameLower).length - 1;
  if (nameMatches >= 3) score += 15;
  else if (nameMatches >= 1) score += 8;

  // Domain mentioned (+10)
  if (fullLower.includes(domainLower)) score += 10;

  // Factual claims — each +10, max 40
  const factualPatterns = [
    /(?:offers?|provides?|specializ\w+|known for)\s+\w/i,
    /(?:founded|established|started|since)\s+\w/i,
    /(?:located|based|headquartered|serves?)\s+(?:in|at)\s+\w/i,
    /(?:team|staff|employees?|crew|professionals?)\s/i,
    /(?:reputation|rated|reviews?|award|recognized)\s*\w/i,
  ];
  let factualCount = 0;
  for (const pattern of factualPatterns) {
    if (pattern.test(visibilityText) && factualCount < 4) {
      score += 10;
      factualCount++;
    }
  }

  // Specific details — numbers, platforms, city names (+8 each, max 24)
  const detailPatterns = [
    /\b\d{4}\b/, // years
    /\b\d+\+?\s*(?:years?|employees?|locations?|clients?|projects?)\b/i,
    /(?:google|yelp|facebook|instagram|linkedin|twitter|tiktok|bbb)\b/i,
    /(?:san antonio|austin|houston|dallas|new york|chicago|los angeles|phoenix|seattle)\b/i,
  ];
  let detailCount = 0;
  for (const pattern of detailPatterns) {
    if (pattern.test(visibilityText) && detailCount < 3) {
      score += 8;
      detailCount++;
    }
  }

  // Response length/detail bonus
  const wordCount = visibilityText.split(/\s+/).length;
  if (wordCount > 150) score += 10;
  else if (wordCount > 80) score += 7;
  else if (wordCount > 30) score += 3;

  // Cap at 99
  score = Math.min(score, 99);

  return { score, found: score >= 20 };
}

// Markdown parsing utilities
function extractSection(text: string, sectionName: string): string {
  // Try **Bold:** format
  const boldPattern = new RegExp(
    `\\*\\*${sectionName}:?\\*\\*[:\\s]*([\\s\\S]*?)(?=\\*\\*(?:Visibility|Competitors|Action Plan):?\\*\\*|$)`,
    "i"
  );
  let match = text.match(boldPattern);
  if (match) return match[1].trim();

  // Try ## Header format
  const headerPattern = new RegExp(
    `##\\s*${sectionName}[:\\s]*([\\s\\S]*?)(?=##\\s*(?:Visibility|Competitors|Action Plan)|$)`,
    "i"
  );
  match = text.match(headerPattern);
  if (match) return match[1].trim();

  // Try plain "Section:" format
  const plainPattern = new RegExp(
    `${sectionName}:\\s*([\\s\\S]*?)(?=(?:Visibility|Competitors|Action Plan):|$)`,
    "i"
  );
  match = text.match(plainPattern);
  if (match) return match[1].trim();

  return "";
}

function buildExcerpt(visibilityText: string, maxLen = 300): string {
  if (!visibilityText) return "";

  let cleaned = visibilityText
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // [text](url) → text
    .replace(/\[\d+\]/g, "") // [1] citations
    .replace(/\*\*/g, "") // bold markers
    .replace(/\*/g, "") // italic markers
    .replace(/#+\s*/g, "") // headers
    .replace(/\s+/g, " ")
    .trim();

  if (cleaned.length <= maxLen) return cleaned;

  // Truncate at word boundary
  const truncated = cleaned.slice(0, maxLen);
  const lastSpace = truncated.lastIndexOf(" ");
  return (lastSpace > maxLen * 0.5 ? truncated.slice(0, lastSpace) : truncated) + "...";
}

function parseCompetitorsList(
  competitorsText: string,
  businessName: string,
  domain: string
): string[] {
  if (!competitorsText) return [];

  const lines = competitorsText.split("\n");
  const competitors: string[] = [];
  const seen = new Set<string>();
  const nameLower = businessName.toLowerCase();
  const domainLower = domain.toLowerCase();

  for (const line of lines) {
    // Match - item, * item, 1. item formats
    const match = line.match(/^(?:\s*[-*]\s*|\s*\d+\.\s*)(.+)/);
    if (!match) continue;

    let name = match[1]
      .replace(/\*\*/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/\s*[-–—:].+$/, "") // Remove descriptions after dash/colon
      .trim();

    if (!name || name.length < 2) continue;

    const lower = name.toLowerCase();
    // Filter out the target business
    if (lower.includes(nameLower) || lower.includes(domainLower)) continue;
    if (nameLower.includes(lower)) continue;

    // Deduplicate
    if (seen.has(lower)) continue;
    seen.add(lower);

    competitors.push(name);
    if (competitors.length >= 5) break;
  }

  return competitors;
}

function parseMarkdownResponse(
  text: string,
  businessName: string,
  domain: string
): ScanResult {
  const visibilityText = extractSection(text, "Visibility");
  const competitorsText = extractSection(text, "Competitors");

  // If no sections found, treat the entire response as visibility text
  const effectiveVisibility = visibilityText || text;

  const { score, found } = scoreVisibility(
    effectiveVisibility,
    text,
    businessName,
    domain
  );

  const excerpt = found
    ? buildExcerpt(effectiveVisibility)
    : "Your business was not found in this AI's knowledge base. It had no specific information to share when asked about your company.";

  const competitors = parseCompetitorsList(competitorsText, businessName, domain);

  return {
    found,
    visibility: score,
    excerpt,
    competitors,
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

      // Phase 2: Query each platform with structured markdown prompt
      const standardPrompt = buildStandardPrompt(business, domain);
      const perplexityPrompt = buildPerplexityPrompt(business, domain);
      const results: Record<string, unknown>[] = [];
      let score = 0;

      for (const platform of PLATFORMS) {
        send("scanning", {
          platformId: platform.id,
          platformName: platform.name,
        });

        const prompt =
          platform.id === "perplexity" ? perplexityPrompt : standardPrompt;
        const response = await callOpenRouter(platform.model, prompt, apiKey);

        if (response.success) {
          const parsed = parseMarkdownResponse(
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
