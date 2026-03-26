# GHL Workflows — Phase 1 Funnel

Manual setup reference for GoHighLevel. These workflows power the `/book` → `/book-call` → `/booked` funnel.

---

## Workflow 1: Form Submitted, No Booking

**Name:** Phase 1 — Form Submitted, No Booking
**Trigger:** Tag `phase1-form-submitted` applied
**Logic:** Wait 5 min → Check if tag `phase1-booked` exists → If NO:

**SMS #1 (at +5 min):**
> "Hey {{contact.first_name}}, it's [Founder Name] from Klema Creative. I saw you were checking out times — want me to just pick one and send you a link? Reply YES."

**SMS #2 (at +45 min, if no reply):**
> "Totally fine if now's not the right time. When you're ready, here's the link to grab a spot: {{booking_link}}"

Stop after 2 touches.

---

## Workflow 2: Booking → Not Confirmed

**Name:** Phase 1 — Collect Website Before Confirming
**Trigger:** Appointment booked event
**Actions:**

1. Apply tag `phase1-booked`
2. Set appointment status → UNCONFIRMED
3. Immediate SMS:

> "Hey {{contact.first_name}}, you're almost locked in! One quick thing — drop your website link so [Founder Name] can look at your business before your call. It helps us make the 15 minutes count. Reply with your URL, or type NONE if you don't have one."

**If no reply after 2 hours:**
> "Hey {{contact.first_name}}, just a heads up — your meeting is reserved but not confirmed yet. Reply with your website (or NONE) and you're locked in."

**If no reply after 12 hours:** AUTO-CONFIRM anyway. Never lose a booked call. Send standard confirmation SMS + email.

---

## Workflow 3: Website Reply → Confirmed

**Name:** Phase 1 — Website Received, Confirm Meeting
**Trigger:** Inbound SMS from contact
**Condition:** Contact has tag `phase1-booked` AND appointment status = UNCONFIRMED
**Actions:**

1. Save reply to custom field "Website URL"
2. Flip appointment status → CONFIRMED
3. Confirmation SMS:

> "You're confirmed for {{appointment.date_time}}. [Founder Name] will take a look at your business beforehand so we can jump right into what matters. Talk soon."

4. Confirmation email:
   - **Subject:** "You're confirmed — here's what to expect"
   - **Body:** Calendar details + 3 bullets (same as /booked page) + founder photo/signature

---

## Workflow 4: Appointment Reminders

**Name:** Phase 1 — Appointment Reminders
**Trigger:** Appointment status = CONFIRMED
**Actions:**

**-24 hours:**
> "Hey {{contact.first_name}}, just a heads up — we're on for tomorrow at {{appointment.time}}. Looking forward to it."

**-1 hour:**
> "See you in an hour! Here's the Zoom link: {{zoom_link}}"

**-5 minutes:**
> "Jumping on now — {{zoom_link}}"

---

## Facebook Pixel / CAPI Tracking Plan

| Page | URL | FB Pixel Event | Retarget Segment |
|------|-----|---------------|-----------------|
| Homepage | `/` | PageView | Visited, didn't click CTA |
| Form | `/book` | ViewContent | Clicked CTA, didn't submit form |
| Calendar | `/book-call` | Lead | Submitted form, didn't book |
| Confirmation | `/booked` | Schedule | Booked — exclude from prospecting or seed lookalike |

**Note:** All events fire server-side through GHL's native CAPI integration. Configure at the sub-account level in GHL Settings → Integrations → Facebook.
