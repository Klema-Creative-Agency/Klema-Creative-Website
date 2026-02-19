import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";
import { hash } from "bcryptjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const shouldSeed = args.includes("--seed");
const seedOnly = args.includes("--seed-only");

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes("neon.tech")
    ? { rejectUnauthorized: false }
    : undefined,
});

async function runSchema() {
  console.log("📦 Running schema...");
  const schemaPath = path.join(__dirname, "..", "packages", "db", "schema.sql");
  const sql = fs.readFileSync(schemaPath, "utf-8");

  // Split by semicolons, respecting $$ dollar-quoted blocks
  const statements: string[] = [];
  let current = "";
  let inDollarQuote = false;

  for (const line of sql.split("\n")) {
    const trimmed = line.trim();

    // Track $$ blocks
    const dollarMatches = trimmed.match(/\$\$/g);
    if (dollarMatches) {
      for (const _ of dollarMatches) {
        inDollarQuote = !inDollarQuote;
      }
    }

    current += line + "\n";

    // Only split on semicolons when not inside a $$ block
    if (!inDollarQuote && trimmed.endsWith(";")) {
      // Strip leading comment-only lines, keep the actual SQL
      const lines = current.split("\n");
      const sqlLines = lines.filter((l) => {
        const t = l.trim();
        return t.length > 0 && !t.startsWith("--");
      });
      const stmt = sqlLines.join("\n").trim().replace(/;$/, "").trim();
      if (stmt.length > 0) {
        statements.push(stmt);
      }
      current = "";
    }
  }
  // Catch any trailing statement
  const lines = current.split("\n");
  const sqlLines = lines.filter((l) => {
    const t = l.trim();
    return t.length > 0 && !t.startsWith("--");
  });
  const remaining = sqlLines.join("\n").trim().replace(/;$/, "").trim();
  if (remaining.length > 0) {
    statements.push(remaining);
  }

  for (const stmt of statements) {
    try {
      await pool.query(stmt);
    } catch (err: unknown) {
      const pgErr = err as { code?: string; message?: string };
      // Ignore "already exists" errors
      if (pgErr.code === "42710" || pgErr.code === "42P07") continue;
      console.error("Schema error:", pgErr.message);
      console.error("Statement:", stmt.substring(0, 100));
    }
  }
  console.log("✅ Schema applied");
}

async function createOwner() {
  const email = "owner@klemacreative.com";
  const existing = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
  if (existing.rows.length > 0) {
    console.log("👤 Owner account already exists");
    return existing.rows[0].id;
  }

  const passwordHash = await hash("changeme123!", 12);
  const result = await pool.query(
    `INSERT INTO users (email, password_hash, name, role)
     VALUES ($1, $2, 'Klema Admin', 'owner')
     RETURNING id`,
    [email, passwordHash],
  );
  console.log("👤 Owner account created: owner@klemacreative.com / changeme123!");
  return result.rows[0].id;
}

async function seed(ownerId: string) {
  console.log("\n🌱 Seeding test data...\n");

  // Helper to create a client + user
  async function createTestClient(
    name: string,
    slug: string,
    tierId: number,
    email: string,
    contactName: string,
    status: string,
  ) {
    // Check if client exists
    const existing = await pool.query("SELECT id FROM clients WHERE slug = $1", [slug]);
    if (existing.rows.length > 0) {
      console.log(`  ⏩ Client "${name}" already exists, skipping`);
      return existing.rows[0].id;
    }

    const passwordHash = await hash("test123!", 12);

    // Create client
    const clientResult = await pool.query(
      `INSERT INTO clients (name, slug, tier_id, status, business_name, industry, service_area, primary_contact_name, primary_contact_email)
       VALUES ($1, $2, $3, $4, $1, $5, 'San Antonio, TX', $6, $7)
       RETURNING id`,
      [name, slug, tierId, status, getIndustry(slug), contactName, email],
    );
    const clientId = clientResult.rows[0].id;

    // Create user
    const userResult = await pool.query(
      `INSERT INTO users (email, password_hash, name, role)
       VALUES ($1, $2, $3, 'client')
       ON CONFLICT (email) DO UPDATE SET name = $3
       RETURNING id`,
      [email, passwordHash, contactName],
    );
    const userId = userResult.rows[0].id;

    // Link user to client
    await pool.query(
      `INSERT INTO client_users (client_id, user_id, is_primary)
       VALUES ($1, $2, true)
       ON CONFLICT (client_id, user_id) DO NOTHING`,
      [clientId, userId],
    );

    // Create monthly period
    const now = new Date();
    const { getTierDeliverables } = await import("@klema/shared");
    const deliverables = getTierDeliverables(tierId);
    await pool.query(
      `INSERT INTO monthly_periods (client_id, month, year, target_blogs, target_social_posts, target_lead_hours)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (client_id, month, year) DO NOTHING`,
      [clientId, now.getMonth() + 1, now.getFullYear(), deliverables.blogsPerMonth, deliverables.socialPostsPerMonth, deliverables.leadManagementHours],
    );

    console.log(`  ✅ ${name} (Tier ${tierId}, ${status}) — ${email} / test123!`);
    return clientId;
  }

  function getIndustry(slug: string): string {
    const map: Record<string, string> = {
      "sa-plumbing-co": "Plumbing",
      "alamo-city-dental": "Dental",
      "hill-country-roofing": "Roofing",
    };
    return map[slug] ?? "General";
  }

  // Client 1: SA Plumbing (Tier 2, active) — full data
  const plumbingId = await createTestClient(
    "San Antonio Plumbing Co",
    "sa-plumbing-co",
    2,
    "mike@saplumbing.com",
    "Mike Rodriguez",
    "active",
  );

  // Add keywords for SA Plumbing
  const keywords = [
    { keyword: "plumber san antonio", position: 4, previous: 7, volume: 2400 },
    { keyword: "emergency plumber sa", position: 2, previous: 5, volume: 1200 },
    { keyword: "water heater repair san antonio", position: 8, previous: 12, volume: 800 },
    { keyword: "drain cleaning near me", position: 6, previous: 9, volume: 1800 },
    { keyword: "san antonio plumbing company", position: 3, previous: 3, volume: 600 },
  ];
  for (const kw of keywords) {
    await pool.query(
      `INSERT INTO keyword_rankings (client_id, keyword, current_position, previous_position, change, search_volume)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [plumbingId, kw.keyword, kw.position, kw.previous, kw.previous - kw.position, kw.volume],
    );
  }

  // Add LLM visibility score
  await pool.query(
    `INSERT INTO llm_visibility_scores (client_id, test_date, overall_score, chatgpt_score, gemini_score, claude_score, perplexity_score, copilot_score)
     VALUES ($1, CURRENT_DATE, 72.5, 78, 65, 70, 80, 69.5)`,
    [plumbingId],
  );

  // Add some leads
  const leadData = [
    { name: "John Smith", email: "john@email.com", phone: "210-555-0101", source: "website_form", status: "qualified", score: 75 },
    { name: "Maria Garcia", email: "maria@email.com", phone: "210-555-0102", source: "phone", status: "appointment_set", score: 90 },
    { name: "David Chen", email: "david@email.com", phone: "210-555-0103", source: "referral", status: "new", score: 40 },
    { name: "Sarah Johnson", email: "sarah@email.com", phone: "210-555-0104", source: "website_form", status: "converted", score: 95 },
  ];
  for (const lead of leadData) {
    await pool.query(
      `INSERT INTO leads (client_id, name, email, phone, source, status, score)
       VALUES ($1, $2, $3, $4, $5::lead_source, $6::lead_status, $7)`,
      [plumbingId, lead.name, lead.email, lead.phone, lead.source, lead.status, lead.score],
    );
  }

  // Add sample content items
  const content = [
    { type: "blog", title: "5 Signs You Need Emergency Plumbing in San Antonio", status: "published" },
    { type: "blog", title: "Water Heater Maintenance Tips for Texas Summers", status: "client_review" },
    { type: "social_post", title: "Before/After: Kitchen Sink Replacement", status: "approved", platform: "instagram" },
    { type: "social_post", title: "Customer Spotlight: The Rodriguez Family", status: "brief", platform: "facebook" },
  ];
  for (const item of content) {
    await pool.query(
      `INSERT INTO content_items (client_id, type, title, status, platform)
       VALUES ($1, $2::content_type, $3, $4::content_status, $5)`,
      [plumbingId, item.type, item.title, item.status, (item as { platform?: string }).platform ?? null],
    );
  }

  // Add a sample message thread
  await pool.query(
    `INSERT INTO messages (client_id, subject, body, sender_id, status)
     VALUES ($1, 'Question about next month''s blog topics', 'Hi team, I wanted to discuss the blog topics for next month. Can we focus more on water heater content?', $2, 'unread')`,
    [plumbingId, ownerId],
  );

  // Add a sample report
  await pool.query(
    `INSERT INTO reports (client_id, status, executive_summary, insights, report_data)
     VALUES ($1, 'published',
       'Strong month with 23% increase in organic traffic. Emergency plumbing keywords showing significant improvement.',
       'Focus on water heater content is paying off. Consider expanding to tankless water heater topics.',
       $2)`,
    [plumbingId, JSON.stringify({
      traffic: { sessions: 1245, users: 890, pageviews: 3200, newUsers: 445 },
      highlights: [
        "Organic traffic up 23% month-over-month",
        "\"emergency plumber sa\" moved to position 2",
        "4 new leads from website forms",
      ],
    })],
  );

  // Client 2: Alamo City Dental (Tier 1, active)
  await createTestClient(
    "Alamo City Dental",
    "alamo-city-dental",
    1,
    "dr.garcia@alamodental.com",
    "Dr. Sofia Garcia",
    "active",
  );

  // Client 3: Hill Country Roofing (Tier 2, onboarding)
  await createTestClient(
    "Hill Country Roofing",
    "hill-country-roofing",
    2,
    "jake@hcroofing.com",
    "Jake Williams",
    "onboarding",
  );

  console.log("\n✅ Seed data complete\n");
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  try {
    // Test connection
    console.log("🔌 Testing database connection...");
    await pool.query("SELECT 1");
    console.log("✅ Connected to database\n");

    if (!seedOnly) {
      await runSchema();
      const ownerId = await createOwner();
      if (shouldSeed) {
        await seed(ownerId);
      }
    } else {
      const ownerResult = await pool.query("SELECT id FROM users WHERE role = 'owner' LIMIT 1");
      if (ownerResult.rows.length > 0) {
        await seed(ownerResult.rows[0].id);
      } else {
        console.error("❌ No owner found. Run `npm run setup` first.");
        process.exit(1);
      }
    }

    console.log("🎉 Setup complete!");
  } catch (err) {
    console.error("❌ Setup failed:", err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
