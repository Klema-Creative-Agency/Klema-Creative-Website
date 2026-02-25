# AI Lead Engine — 10-Day Client Delivery Workflow

## Trigger
New client pays $2,500 setup fee → this workflow begins immediately.

---

## Delivery Timeline

### Day 1–2: Research Phase
**Owner:** Research Agent

**Deliverables:**
- Local market intel brief (client's specific city/region)
- Competitor teardown (top 3 local competitors, their funnels, ad spend estimates)
- CPL benchmarks for client's specific area and niche
- Recommended traffic sources ranked by expected ROI

**Handoff:** Research brief → Copywriter + Funnel Builder (parallel)

---

### Day 2–4: Copy + Funnel Design (Parallel)
**Owner:** Copywriter + Funnel Builder (work simultaneously)

**Copywriter Deliverables:**
- Quiz funnel copy (all questions, options, headlines, CTAs)
- SMS follow-up sequence (5 messages over 7 days)
- Email follow-up sequence (5 emails over 14 days)
- Headline variants for A/B testing (3 options)

**Funnel Builder Deliverables:**
- Quiz wireframe adapted to client's specific service area
- Question logic flow (including disqualification paths)
- A/B test plan (first 3 tests to run)

**Handoff:** Copy + wireframes → Software Engineer

---

### Day 4–8: Technical Build
**Owner:** Software Engineer

**GHL Sub-Account Setup (Phase A — Agency model):**
1. Create sub-account in Klema's GHL Unlimited account
   - Business name, timezone, client email
2. Provision local phone number (match client's area code)
3. Build pipeline: New → Contacted → Estimate Sent → Booked → Completed → Lost → Nurture → Disqualified
4. Import all tags from Funnel Architect's GHL Build Spec (service, urgency, qualification, source, system tags)
5. Create custom fields (quiz_service_type, quiz_urgency, quiz_property_owner, quiz_detail, lead_score, funnel_source)
6. Create client login with limited permissions (dashboard + pipeline view only)

**Automation Build:**
- Workflow 1: Instant Call Trigger (contact created with hot/warm tag → call client → bridge to lead)
- Workflow 2: SMS Sequence (5 messages from Copy Engine, timing: immediate, D1, D3, D5, D7)
- Workflow 3: Email Sequence (5 emails from Copy Engine, timing: immediate, D2, D5, D9, D14)
- Workflow 4: Missed Call Alert (SMS to client + SMS to lead + 4hr reminder)
- Workflow 5: After-Hours Handler (if applicable — SMS to lead, alert to client, scheduled callback)

**Funnel Build:**
- Build mobile quiz funnel (client-specific copy + branding from Copy Engine)
- Apply lead routing logic from Funnel Architect spec
- Configure lead scoring (auto-tag hot/warm/cool based on quiz answers)
- Calendar integration (if client uses one)
- Dashboard widgets: new leads today, leads this week, booked this week, conversion rate

**QA:**
- Full mobile QA (375px, 768px, 1024px, 1440px)
- Test complete flow: quiz → form submit → GHL contact created → call fires → SMS sends → email sends → dashboard shows lead

**GHL cost tracking:** Log the client's phone number cost ($1.15/mo) and estimate monthly SMS/call usage.

**Handoff:** Built system → Klema Team Coordinator (QA)

---

### Day 8–9: Quality Assurance
**Owner:** Team Coordinator

**QA Checklist (all 11 must pass):**
- [ ] Submit test lead → call fires to client's phone
- [ ] SMS sequence triggers correctly after lead submission
- [ ] Email sequence triggers correctly after lead submission
- [ ] Full SMS sequence delivers over 7 days (verify in GHL)
- [ ] Full email sequence delivers over 14 days (verify in GHL)
- [ ] Calendar booking works (if applicable)
- [ ] Dashboard shows lead with correct data
- [ ] Funnel loads in <1.5 seconds on mobile
- [ ] All copy is client-specific (not template/placeholder)
- [ ] Client's phone number is correct in call trigger
- [ ] SSL certificate active and domain resolves correctly

- [ ] GHL sub-account login works for client (limited permissions)
- [ ] Local phone number is provisioned and active
- [ ] Lead scoring tags apply correctly (hot/warm/cool)
- [ ] After-hours routing works (if applicable)

**Handoff:** QA passed → Client Onboarding Agent (launch)

---

### Day 9–10: Launch
**Owner:** Marketing Director

**Deliverables:**
- Client onboarding call (30 min walkthrough):
  - Dashboard tour
  - How leads will come in
  - What to expect in first 7 days
  - How to handle incoming calls
  - Monthly reporting cadence
- Welcome email with:
  - Dashboard login credentials
  - Funnel URL
  - Support contact
  - Quick-start guide
- UTM tracking setup for all traffic sources
- Traffic source recommendations (ranked by budget and expected ROI)

---

### Day 30+: Monthly Optimization Cycle
**Owner:** Marketing Director + Software Engineer

**Monthly cadence:**
1. Review data (leads, CPL, conversion rates, call answer rate)
2. Design A/B test based on data
3. Software Engineer implements test
4. Monitor for 2 weeks
5. Pick winner, implement permanently
6. Send monthly report to client

---

## Handoff Chain
```
Client Onboarding Agent (intake) → Research Agent → Copy Engine + Funnel Architect (parallel) → Software Engineer (GHL build) → Klema Team Coordinator (QA) → Client Onboarding Agent (launch) → Lead Ops Monitor + Client Report Writer (ongoing) → Retention Agent (churn prevention)
```

## Escalation Rules
- **Client doesn't provide intake form by Day 2** → Team Coordinator follows up (email + SMS)
- **Build extends past Day 8** → Escalate to Tomas immediately
- **Call trigger fails QA** → 24-hour SLA to fix (Software Engineer priority)
- **Client unresponsive for onboarding call** → 3 attempts over 5 days, then escalate to Tomas
- **Any system down post-launch** → Software Engineer has 2-hour SLA

## Client Intake Requirements
Before Day 1 can begin, client must provide:
1. Business name and address
2. Phone number for call trigger
3. Service area (cities/zip codes)
4. Logo and brand colors (optional — we can work without)
5. Calendar link (if they want booking integration)
6. Any specific services they want to highlight
