import { getTier, getTierDeliverables } from "@klema/shared";
import { query, queryOne, queryAll, transaction, db } from "./connection";
import type pg from "pg";

// ─── Types ───────────────────────────────────────────────────────────────────

interface SpinUpInput {
  name: string;
  slug: string;
  tierId: number;
  email: string;
  contactName: string;
  passwordHash: string;
  industry?: string;
  phone?: string;
  website?: string;
  serviceArea?: string;
}

interface OnboardingStep {
  phase: number;
  phaseName: string;
  stepOrder: number;
  task: string;
  owner: string;
  targetDay: number;
}

interface MonthlyTask {
  title: string;
  category: string;
  week: number;
  tierRequired: number;
}

// ─── Onboarding Generator ────────────────────────────────────────────────────

export function generateOnboardingSteps(tierNumber: number): OnboardingStep[] {
  const steps: OnboardingStep[] = [
    // Phase 0: Pre-Kickoff
    { phase: 0, phaseName: "Pre-Kickoff", stepOrder: 1, task: "Send welcome email + portal credentials", owner: "account_manager", targetDay: 0 },
    { phase: 0, phaseName: "Pre-Kickoff", stepOrder: 2, task: "Collect business info questionnaire", owner: "client", targetDay: 1 },
    { phase: 0, phaseName: "Pre-Kickoff", stepOrder: 3, task: "Gather brand assets (logo, colors, fonts)", owner: "client", targetDay: 2 },
    { phase: 0, phaseName: "Pre-Kickoff", stepOrder: 4, task: "Get access to Google Analytics / Search Console", owner: "account_manager", targetDay: 2 },
    // Phase 1: Discovery & Audit
    { phase: 1, phaseName: "Discovery & Audit", stepOrder: 1, task: "Kickoff call (30 min)", owner: "account_manager", targetDay: 3 },
    { phase: 1, phaseName: "Discovery & Audit", stepOrder: 2, task: "Run SEO audit", owner: "seo_specialist", targetDay: 4 },
    { phase: 1, phaseName: "Discovery & Audit", stepOrder: 3, task: "Competitor analysis", owner: "seo_specialist", targetDay: 5 },
    { phase: 1, phaseName: "Discovery & Audit", stepOrder: 4, task: "Keyword research (initial set)", owner: "seo_specialist", targetDay: 5 },
    // Phase 2: Strategy & Setup
    { phase: 2, phaseName: "Strategy & Setup", stepOrder: 1, task: "Create content strategy document", owner: "content_lead", targetDay: 7 },
    { phase: 2, phaseName: "Strategy & Setup", stepOrder: 2, task: "Set up social media accounts/profiles", owner: "social_specialist", targetDay: 7 },
    { phase: 2, phaseName: "Strategy & Setup", stepOrder: 3, task: "Configure tracking & reporting", owner: "seo_specialist", targetDay: 8 },
    // Phase 3: Build
    { phase: 3, phaseName: "Build", stepOrder: 1, task: "Website optimization / build (if applicable)", owner: "developer", targetDay: 10 },
    { phase: 3, phaseName: "Build", stepOrder: 2, task: "Create first month content calendar", owner: "content_lead", targetDay: 10 },
    { phase: 3, phaseName: "Build", stepOrder: 3, task: "Write first blog post", owner: "content_lead", targetDay: 12 },
    // Phase 4: Launch
    { phase: 4, phaseName: "Launch", stepOrder: 1, task: "Publish first content pieces", owner: "content_lead", targetDay: 14 },
    { phase: 4, phaseName: "Launch", stepOrder: 2, task: "Activate social posting schedule", owner: "social_specialist", targetDay: 14 },
    // Phase 5: Handoff
    { phase: 5, phaseName: "Handoff to Ongoing", stepOrder: 1, task: "Week 2 check-in call", owner: "account_manager", targetDay: 14 },
    { phase: 5, phaseName: "Handoff to Ongoing", stepOrder: 2, task: "Review portal walkthrough with client", owner: "account_manager", targetDay: 14 },
  ];

  // Tier 2+: add lead management steps
  if (tierNumber >= 2) {
    steps.push(
      { phase: 1, phaseName: "Discovery & Audit", stepOrder: 5, task: "Audit current lead flow / CRM", owner: "lead_specialist", targetDay: 4 },
      { phase: 2, phaseName: "Strategy & Setup", stepOrder: 4, task: "Set up GHL lead pipeline", owner: "lead_specialist", targetDay: 8 },
      { phase: 3, phaseName: "Build", stepOrder: 4, task: "Configure lead follow-up automations", owner: "lead_specialist", targetDay: 11 },
      { phase: 2, phaseName: "Strategy & Setup", stepOrder: 5, task: "Set up reputation monitoring", owner: "account_manager", targetDay: 9 },
    );
  }

  // Tier 3: add advanced steps
  if (tierNumber >= 3) {
    steps.push(
      { phase: 2, phaseName: "Strategy & Setup", stepOrder: 6, task: "LLM visibility baseline scan", owner: "seo_specialist", targetDay: 6 },
      { phase: 3, phaseName: "Build", stepOrder: 5, task: "Create llms.txt and structured data", owner: "developer", targetDay: 10 },
      { phase: 3, phaseName: "Build", stepOrder: 6, task: "Set up white-label portal branding", owner: "developer", targetDay: 12 },
    );
  }

  return steps.sort((a, b) => a.phase - b.phase || a.stepOrder - b.stepOrder);
}

// ─── Monthly Task Generator ──────────────────────────────────────────────────

export function generateMonthlyTasks(tierNumber: number): MonthlyTask[] {
  const deliverables = getTierDeliverables(tierNumber);
  const tasks: MonthlyTask[] = [];

  // Content tasks
  for (let i = 0; i < deliverables.blogsPerMonth; i++) {
    const week = (i % 4) + 1;
    tasks.push({ title: `Blog post #${i + 1}`, category: "content", week, tierRequired: 1 });
  }

  // Social posts spread across weeks
  const postsPerWeek = Math.ceil(deliverables.socialPostsPerMonth / 4);
  for (let w = 1; w <= 4; w++) {
    tasks.push({ title: `Social posts — Week ${w} (${postsPerWeek} posts)`, category: "social", week: w, tierRequired: 1 });
  }

  // SEO tasks
  tasks.push(
    { title: "Keyword tracking update", category: "seo", week: 1, tierRequired: 1 },
    { title: "On-page SEO optimizations", category: "seo", week: 2, tierRequired: 1 },
    { title: "Citation building", category: "seo", week: 3, tierRequired: 1 },
  );

  // Lead management (Tier 2+)
  if (tierNumber >= 2) {
    tasks.push(
      { title: "Lead pipeline review", category: "leads", week: 1, tierRequired: 2 },
      { title: "Lead follow-up audit", category: "leads", week: 2, tierRequired: 2 },
      { title: "Lead response time check", category: "leads", week: 3, tierRequired: 2 },
      { title: "Lead conversion analysis", category: "leads", week: 4, tierRequired: 2 },
    );
  }

  // Reputation (Tier 2+)
  if (tierNumber >= 2) {
    tasks.push(
      { title: "Review monitoring & responses", category: "reputation", week: 2, tierRequired: 2 },
    );
  }

  // Reporting
  tasks.push(
    { title: "Monthly report generation", category: "reporting", week: 4, tierRequired: 1 },
    { title: "Client check-in call", category: "account", week: 2, tierRequired: 1 },
  );

  // Tier 3 extras
  if (tierNumber >= 3) {
    tasks.push(
      { title: "LLM visibility scan", category: "seo", week: 1, tierRequired: 3 },
      { title: "Competitor LLM analysis", category: "seo", week: 3, tierRequired: 3 },
    );
  }

  return tasks.sort((a, b) => a.week - b.week);
}

// ─── Client Service ──────────────────────────────────────────────────────────

export const clientService = {
  async getAll() {
    return queryAll(`
      SELECT c.*,
        (SELECT COUNT(*) FROM monthly_periods mp WHERE mp.client_id = c.id AND mp.status = 'active')::int as active_periods,
        (SELECT COUNT(*) FROM tasks t WHERE t.client_id = c.id AND t.status != 'completed')::int as open_tasks
      FROM clients c
      ORDER BY c.created_at DESC
    `);
  },

  async getById(id: string) {
    return queryOne("SELECT * FROM clients WHERE id = $1", [id]);
  },

  async getBySlug(slug: string) {
    return queryOne("SELECT * FROM clients WHERE slug = $1", [slug]);
  },

  async getDashboard(clientId: string) {
    const [client, currentPeriod, tasks, leads, latestReport, keywords, llmVisibility] =
      await Promise.all([
        queryOne("SELECT * FROM clients WHERE id = $1", [clientId]),
        queryOne(
          "SELECT * FROM monthly_periods WHERE client_id = $1 ORDER BY year DESC, month DESC LIMIT 1",
          [clientId],
        ),
        queryAll(
          "SELECT * FROM tasks WHERE client_id = $1 AND status != 'completed' ORDER BY week, priority DESC LIMIT 20",
          [clientId],
        ),
        queryAll(
          "SELECT * FROM leads WHERE client_id = $1 ORDER BY created_at DESC LIMIT 10",
          [clientId],
        ),
        queryOne(
          "SELECT * FROM reports WHERE client_id = $1 ORDER BY created_at DESC LIMIT 1",
          [clientId],
        ),
        queryAll(
          "SELECT * FROM keyword_rankings WHERE client_id = $1 ORDER BY tracked_at DESC LIMIT 15",
          [clientId],
        ),
        queryOne(
          "SELECT * FROM llm_visibility_scores WHERE client_id = $1 ORDER BY test_date DESC LIMIT 1",
          [clientId],
        ),
      ]);

    return { client, currentPeriod, tasks, leads, latestReport, keywords, llmVisibility };
  },

  async spinUp(input: SpinUpInput) {
    return transaction(async (client: pg.PoolClient) => {
      // 1. Create client record
      const clientResult = await client.query(
        `INSERT INTO clients (name, slug, tier_id, status, business_name, industry, phone, website, service_area, primary_contact_name, primary_contact_email)
         VALUES ($1, $2, $3, 'onboarding', $1, $4, $5, $6, $7, $8, $9)
         RETURNING *`,
        [input.name, input.slug, input.tierId, input.industry ?? null, input.phone ?? null, input.website ?? null, input.serviceArea ?? null, input.contactName, input.email],
      );
      const newClient = clientResult.rows[0];

      // 2. Create portal user
      const userResult = await client.query(
        `INSERT INTO users (email, password_hash, name, role)
         VALUES ($1, $2, $3, 'client')
         RETURNING *`,
        [input.email, input.passwordHash, input.contactName],
      );
      const user = userResult.rows[0];

      // 3. Link user to client
      await client.query(
        "INSERT INTO client_users (client_id, user_id, is_primary) VALUES ($1, $2, true)",
        [newClient.id, user.id],
      );

      // 4. Generate onboarding checklist
      const steps = generateOnboardingSteps(input.tierId);
      for (const step of steps) {
        await client.query(
          `INSERT INTO onboarding_checklists (client_id, phase, phase_name, step_order, task, owner, target_day)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [newClient.id, step.phase, step.phaseName, step.stepOrder, step.task, step.owner, step.targetDay],
        );
      }

      // 5. Create first monthly period
      const now = new Date();
      const deliverables = getTierDeliverables(input.tierId);
      const periodResult = await client.query(
        `INSERT INTO monthly_periods (client_id, month, year, target_blogs, target_social_posts, target_lead_hours)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [newClient.id, now.getMonth() + 1, now.getFullYear(), deliverables.blogsPerMonth, deliverables.socialPostsPerMonth, deliverables.leadManagementHours],
      );
      const period = periodResult.rows[0];

      // 6. Generate monthly tasks
      const monthlyTasks = generateMonthlyTasks(input.tierId);
      for (const task of monthlyTasks) {
        await client.query(
          `INSERT INTO tasks (client_id, monthly_period_id, title, category, week, tier_required)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [newClient.id, period.id, task.title, task.category, task.week, task.tierRequired],
        );
      }

      // 7. Log activity
      await client.query(
        `INSERT INTO activity_log (user_id, client_id, action, entity_type, entity_id, details)
         VALUES ($1, $2, 'client_created', 'client', $2, $3)`,
        [user.id, newClient.id, JSON.stringify({ tier: input.tierId, name: input.name })],
      );

      return { client: newClient, user, period };
    });
  },

  async updateStatus(clientId: string, status: string) {
    return db.update("clients", clientId, { status });
  },

  async getOnboardingProgress(clientId: string) {
    const steps = await queryAll(
      "SELECT * FROM onboarding_checklists WHERE client_id = $1 ORDER BY phase, step_order",
      [clientId],
    );
    const total = steps.length;
    const completed = steps.filter((s) => s.status === "completed").length;
    return { steps, total, completed, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 };
  },

  async completeOnboardingStep(stepId: string, userId: string) {
    return queryOne(
      "UPDATE onboarding_checklists SET status = 'completed', completed_at = NOW(), completed_by = $2 WHERE id = $1 RETURNING *",
      [stepId, userId],
    );
  },

  async getCurrentPeriod(clientId: string) {
    return queryOne(
      "SELECT * FROM monthly_periods WHERE client_id = $1 ORDER BY year DESC, month DESC LIMIT 1",
      [clientId],
    );
  },

  async startNewMonth(clientId: string, month: number, year: number) {
    const client = await queryOne<{ tier_id: number }>("SELECT tier_id FROM clients WHERE id = $1", [clientId]);
    if (!client) throw new Error("Client not found");

    const deliverables = getTierDeliverables(client.tier_id);

    return transaction(async (txClient: pg.PoolClient) => {
      // Close previous period
      await txClient.query(
        "UPDATE monthly_periods SET status = 'completed' WHERE client_id = $1 AND status = 'active'",
        [clientId],
      );

      // Create new period
      const periodResult = await txClient.query(
        `INSERT INTO monthly_periods (client_id, month, year, target_blogs, target_social_posts, target_lead_hours)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [clientId, month, year, deliverables.blogsPerMonth, deliverables.socialPostsPerMonth, deliverables.leadManagementHours],
      );
      const period = periodResult.rows[0];

      // Generate tasks
      const tasks = generateMonthlyTasks(client.tier_id);
      for (const task of tasks) {
        await txClient.query(
          `INSERT INTO tasks (client_id, monthly_period_id, title, category, week, tier_required)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [clientId, period.id, task.title, task.category, task.week, task.tierRequired],
        );
      }

      return period;
    });
  },
};
