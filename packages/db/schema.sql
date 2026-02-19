-- Klema Creative Database Schema
-- Run with: npm run setup

-- ─── Enums ───────────────────────────────────────────────────────────────────

DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('owner', 'team_member', 'client');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE client_status AS ENUM ('onboarding', 'active', 'paused', 'churned');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE task_status AS ENUM ('pending', 'in_progress', 'in_review', 'completed', 'skipped');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE content_status AS ENUM ('brief', 'ai_draft', 'team_review', 'client_review', 'revision', 'approved', 'published');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE content_type AS ENUM ('blog', 'social_post', 'service_page', 'landing_page', 'email', 'sms', 'llm_txt', 'other');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'qualified', 'appointment_set', 'converted', 'lost', 'dormant');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE lead_source AS ENUM ('website_form', 'phone', 'chat', 'referral', 'social', 'email', 'other');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE message_status AS ENUM ('unread', 'read', 'replied', 'closed');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE agent_type AS ENUM ('blog_writer', 'social_media', 'seo_audit', 'llm_txt_generator', 'llm_visibility_checker', 'report_generator', 'review_response', 'lead_followup', 'content_brief');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE agent_run_status AS ENUM ('queued', 'running', 'completed', 'failed', 'cancelled');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE report_status AS ENUM ('generating', 'draft', 'team_review', 'published');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE notification_type AS ENUM ('report_ready', 'content_review', 'message_reply', 'call_reminder', 'new_lead', 'weekly_digest', 'review_alert', 'deliverable_complete', 'task_assigned', 'task_overdue');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ─── Trigger Function ────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ─── Tables ──────────────────────────────────────────────────────────────────

-- Users
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role user_role NOT NULL DEFAULT 'client',
  avatar_url TEXT,
  phone VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Clients
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  tier_id INTEGER NOT NULL CHECK (tier_id BETWEEN 1 AND 3),
  status client_status DEFAULT 'onboarding',
  -- Business info
  business_name VARCHAR(255),
  industry VARCHAR(100),
  website VARCHAR(500),
  phone VARCHAR(50),
  email VARCHAR(255),
  address_line1 VARCHAR(255),
  address_city VARCHAR(100),
  address_state VARCHAR(50),
  address_zip VARCHAR(20),
  service_area TEXT,
  year_founded INTEGER,
  employee_count VARCHAR(50),
  annual_revenue_range VARCHAR(100),
  -- Key contacts
  primary_contact_name VARCHAR(255),
  primary_contact_email VARCHAR(255),
  primary_contact_phone VARCHAR(50),
  -- Website path
  website_path VARCHAR(10) DEFAULT 'A',
  -- Branding
  branding JSONB DEFAULT '{}',
  logo_url TEXT,
  brand_voice TEXT,
  -- External IDs
  ghl_location_id VARCHAR(255),
  ghl_contact_id VARCHAR(255),
  ga_property_id VARCHAR(255),
  gsc_site_url VARCHAR(500),
  gbp_account_id VARCHAR(255),
  semrush_project_id VARCHAR(255),
  clickup_space_id VARCHAR(255),
  buffer_profile_ids JSONB DEFAULT '[]',
  -- Dates & notes
  contract_start_date DATE,
  contract_end_date DATE,
  notes TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Client-User mapping
CREATE TABLE IF NOT EXISTS client_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(client_id, user_id)
);

-- Team assignments
CREATE TABLE IF NOT EXISTS client_team_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role_title VARCHAR(100),
  fte_allocation DECIMAL(3,2) DEFAULT 0.00,
  is_account_manager BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(client_id, user_id)
);

-- Onboarding checklists
CREATE TABLE IF NOT EXISTS onboarding_checklists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  phase INTEGER NOT NULL CHECK (phase BETWEEN 0 AND 5),
  phase_name VARCHAR(100) NOT NULL,
  step_order INTEGER NOT NULL,
  task VARCHAR(500) NOT NULL,
  owner VARCHAR(100),
  target_day INTEGER,
  status task_status DEFAULT 'pending',
  completed_at TIMESTAMPTZ,
  completed_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Monthly periods
CREATE TABLE IF NOT EXISTS monthly_periods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  month INTEGER NOT NULL CHECK (month BETWEEN 1 AND 12),
  year INTEGER NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  -- Deliverable targets
  target_blogs INTEGER DEFAULT 0,
  target_social_posts INTEGER DEFAULT 0,
  target_seo_pages INTEGER DEFAULT 0,
  target_lead_hours DECIMAL(5,1) DEFAULT 0,
  target_citations INTEGER DEFAULT 0,
  -- Actual counts
  actual_blogs INTEGER DEFAULT 0,
  actual_social_posts INTEGER DEFAULT 0,
  actual_seo_pages INTEGER DEFAULT 0,
  actual_lead_hours DECIMAL(5,1) DEFAULT 0,
  actual_citations INTEGER DEFAULT 0,
  -- Report
  report_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(client_id, month, year)
);

-- Tasks
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  monthly_period_id UUID REFERENCES monthly_periods(id),
  title VARCHAR(500) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  week INTEGER CHECK (week BETWEEN 1 AND 4),
  status task_status DEFAULT 'pending',
  priority INTEGER DEFAULT 0,
  assigned_to UUID REFERENCES users(id),
  due_date DATE,
  estimated_minutes INTEGER,
  actual_minutes INTEGER,
  is_recurring BOOLEAN DEFAULT false,
  tier_required INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Content items
CREATE TABLE IF NOT EXISTS content_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  monthly_period_id UUID REFERENCES monthly_periods(id),
  type content_type NOT NULL,
  title VARCHAR(500) NOT NULL,
  status content_status DEFAULT 'brief',
  brief TEXT,
  ai_draft TEXT,
  current_draft TEXT,
  final_content TEXT,
  -- Blog-specific
  word_count INTEGER,
  target_keywords TEXT[],
  meta_description VARCHAR(320),
  slug VARCHAR(255),
  -- Social-specific
  platform VARCHAR(50),
  scheduled_date DATE,
  scheduled_time TIME,
  -- Publishing
  published_url TEXT,
  published_at TIMESTAMPTZ,
  -- Revision tracking
  revision_count INTEGER DEFAULT 0,
  revision_notes TEXT,
  -- Assignments
  assigned_to UUID REFERENCES users(id),
  reviewed_by UUID REFERENCES users(id),
  agent_run_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  company VARCHAR(255),
  source lead_source DEFAULT 'other',
  status lead_status DEFAULT 'new',
  score INTEGER DEFAULT 0 CHECK (score BETWEEN 0 AND 100),
  -- Tracking
  first_contact_at TIMESTAMPTZ,
  response_time_minutes INTEGER,
  appointment_date TIMESTAMPTZ,
  converted_at TIMESTAMPTZ,
  lost_reason TEXT,
  -- Assignments
  assigned_to UUID REFERENCES users(id),
  ghl_contact_id VARCHAR(255),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lead activities
CREATE TABLE IF NOT EXISTS lead_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  activity_type VARCHAR(50) NOT NULL,
  description TEXT,
  outcome TEXT,
  performed_by UUID REFERENCES users(id),
  performed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Call logs
CREATE TABLE IF NOT EXISTS call_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id),
  call_type VARCHAR(50),
  duration_minutes INTEGER,
  direction VARCHAR(20),
  caller_id VARCHAR(100),
  notes TEXT,
  recording_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Agent runs
CREATE TABLE IF NOT EXISTS agent_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  agent_type agent_type NOT NULL,
  status agent_run_status DEFAULT 'queued',
  input_data JSONB DEFAULT '{}',
  output_data JSONB DEFAULT '{}',
  model VARCHAR(100),
  input_tokens INTEGER,
  output_tokens INTEGER,
  cost_usd DECIMAL(10,6),
  duration_ms INTEGER,
  error_message TEXT,
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reports
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  monthly_period_id UUID REFERENCES monthly_periods(id),
  status report_status DEFAULT 'generating',
  report_data JSONB DEFAULT '{}',
  executive_summary TEXT,
  insights TEXT,
  next_month_plan TEXT,
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  agent_run_id UUID REFERENCES agent_runs(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- LLM Visibility Scores
CREATE TABLE IF NOT EXISTS llm_visibility_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  test_date DATE NOT NULL,
  overall_score DECIMAL(5,2),
  chatgpt_score DECIMAL(5,2),
  gemini_score DECIMAL(5,2),
  claude_score DECIMAL(5,2),
  perplexity_score DECIMAL(5,2),
  copilot_score DECIMAL(5,2),
  prompt_results JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  subject VARCHAR(500),
  body TEXT NOT NULL,
  sender_id UUID NOT NULL REFERENCES users(id),
  status message_status DEFAULT 'unread',
  parent_id UUID REFERENCES messages(id),
  thread_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  title VARCHAR(255) NOT NULL,
  body TEXT,
  link TEXT,
  is_read BOOLEAN DEFAULT false,
  is_emailed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Keyword Rankings
CREATE TABLE IF NOT EXISTS keyword_rankings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  keyword VARCHAR(255) NOT NULL,
  current_position INTEGER,
  previous_position INTEGER,
  change INTEGER DEFAULT 0,
  search_volume INTEGER,
  difficulty INTEGER,
  tracked_at TIMESTAMPTZ DEFAULT NOW(),
  source VARCHAR(50) DEFAULT 'semrush'
);

-- Reviews
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL,
  reviewer_name VARCHAR(255),
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT,
  response_text TEXT,
  responded_at TIMESTAMPTZ,
  platform_review_id VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activity Log (audit trail)
CREATE TABLE IF NOT EXISTS activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  client_id UUID REFERENCES clients(id),
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50),
  entity_id UUID,
  details JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Indexes ─────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_clients_slug ON clients(slug);
CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);
CREATE INDEX IF NOT EXISTS idx_client_users_user ON client_users(user_id);
CREATE INDEX IF NOT EXISTS idx_client_users_client ON client_users(client_id);
CREATE INDEX IF NOT EXISTS idx_tasks_client ON tasks(client_id);
CREATE INDEX IF NOT EXISTS idx_tasks_period ON tasks(monthly_period_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_content_client ON content_items(client_id);
CREATE INDEX IF NOT EXISTS idx_content_status ON content_items(status);
CREATE INDEX IF NOT EXISTS idx_leads_client ON leads(client_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_messages_client ON messages(client_id);
CREATE INDEX IF NOT EXISTS idx_messages_thread ON messages(thread_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON notifications(user_id, is_read) WHERE NOT is_read;
CREATE INDEX IF NOT EXISTS idx_keyword_rankings_client ON keyword_rankings(client_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_client ON activity_log(client_id);

-- ─── Triggers ────────────────────────────────────────────────────────────────

DROP TRIGGER IF EXISTS set_updated_at_users ON users;
CREATE TRIGGER set_updated_at_users BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_clients ON clients;
CREATE TRIGGER set_updated_at_clients BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_monthly_periods ON monthly_periods;
CREATE TRIGGER set_updated_at_monthly_periods BEFORE UPDATE ON monthly_periods FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_tasks ON tasks;
CREATE TRIGGER set_updated_at_tasks BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_content_items ON content_items;
CREATE TRIGGER set_updated_at_content_items BEFORE UPDATE ON content_items FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_leads ON leads;
CREATE TRIGGER set_updated_at_leads BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_reports ON reports;
CREATE TRIGGER set_updated_at_reports BEFORE UPDATE ON reports FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── SEO Audit Tables ──────────────────────────────────────────────────────

DO $$ BEGIN
  CREATE TYPE seo_audit_status AS ENUM ('queued', 'running', 'completed', 'failed');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE seo_audit_type AS ENUM ('quick', 'guided', 'batch');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE seo_fix_status AS ENUM ('open', 'in_progress', 'fixed', 'wont_fix');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- SEO Audits
CREATE TABLE IF NOT EXISTS seo_audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  batch_id UUID,
  url TEXT NOT NULL,
  audit_type seo_audit_type DEFAULT 'quick',
  status seo_audit_status DEFAULT 'queued',
  -- Scores
  overall_score INTEGER,
  overall_grade VARCHAR(5),
  total_checks INTEGER DEFAULT 0,
  total_passed INTEGER DEFAULT 0,
  total_failed INTEGER DEFAULT 0,
  total_critical INTEGER DEFAULT 0,
  -- Results
  category_results JSONB DEFAULT '{}',
  recommendations JSONB DEFAULT '[]',
  -- Crawl stats
  pages_crawled INTEGER DEFAULT 0,
  crawl_duration_ms INTEGER,
  audit_duration_ms INTEGER,
  -- Report
  html_report_path TEXT,
  error_message TEXT,
  -- Config used
  config JSONB DEFAULT '{}',
  -- Timestamps
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SEO Audit Batches
CREATE TABLE IF NOT EXISTS seo_audit_batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  name VARCHAR(255),
  status seo_audit_status DEFAULT 'queued',
  total_urls INTEGER DEFAULT 0,
  completed_urls INTEGER DEFAULT 0,
  failed_urls INTEGER DEFAULT 0,
  source_filename VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add FK now that batches table exists
ALTER TABLE seo_audits DROP CONSTRAINT IF EXISTS seo_audits_batch_id_fkey;
ALTER TABLE seo_audits ADD CONSTRAINT seo_audits_batch_id_fkey
  FOREIGN KEY (batch_id) REFERENCES seo_audit_batches(id) ON DELETE SET NULL;

-- SEO Fixes
CREATE TABLE IF NOT EXISTS seo_fixes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id UUID NOT NULL REFERENCES seo_audits(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  category VARCHAR(50),
  severity VARCHAR(20),
  title VARCHAR(500),
  description TEXT,
  page_url TEXT,
  status seo_fix_status DEFAULT 'open',
  fix_code TEXT,
  fix_explanation TEXT,
  auto_fixable BOOLEAN DEFAULT false,
  fix_script JSONB,
  fixed_by UUID REFERENCES users(id),
  fixed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SEO Indexes
CREATE INDEX IF NOT EXISTS idx_seo_audits_client ON seo_audits(client_id);
CREATE INDEX IF NOT EXISTS idx_seo_audits_status ON seo_audits(status);
CREATE INDEX IF NOT EXISTS idx_seo_audits_batch ON seo_audits(batch_id);
CREATE INDEX IF NOT EXISTS idx_seo_audit_batches_client ON seo_audit_batches(client_id);
CREATE INDEX IF NOT EXISTS idx_seo_fixes_audit ON seo_fixes(audit_id);
CREATE INDEX IF NOT EXISTS idx_seo_fixes_client ON seo_fixes(client_id);
CREATE INDEX IF NOT EXISTS idx_seo_fixes_status ON seo_fixes(status);

-- SEO Triggers
DROP TRIGGER IF EXISTS set_updated_at_seo_audits ON seo_audits;
CREATE TRIGGER set_updated_at_seo_audits BEFORE UPDATE ON seo_audits FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_seo_audit_batches ON seo_audit_batches;
CREATE TRIGGER set_updated_at_seo_audit_batches BEFORE UPDATE ON seo_audit_batches FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_seo_fixes ON seo_fixes;
CREATE TRIGGER set_updated_at_seo_fixes BEFORE UPDATE ON seo_fixes FOR EACH ROW EXECUTE FUNCTION update_updated_at();
