/** Niche data for the Lead Funnel System service pages */

export interface PainStat {
  value: string;
  label: string;
}

export interface Problem {
  icon: string;
  title: string;
  body: string;
}

export interface QuizOption {
  label: string;
  emoji?: string;
}

export interface QuizStep {
  question: string;
  options: QuizOption[];
}

export interface NicheData {
  service_name: string;
  url_slug: string;
  headline: string;
  sub: string;
  pain_stat_1: PainStat;
  pain_stat_2: PainStat;
  pain_stat_3: PainStat;
  avg_job_value: number;
  setup_fee: number;
  monthly_fee: number;
  break_even_jobs: number;
  conversion_rate_before: string;
  conversion_rate_after: string;
  avg_monthly_leads_missed: number;
  problems: Problem[];
  target_audience: string;
  traffic_sources: string;
  seasonal_note: string;
  special_note?: string;
  meta_title: string;
  meta_description: string;
  quizSteps: QuizStep[];
  quizHeadline: string;
  quizSubline: string;
  demoNotification: string;
}

export const niches: NicheData[] = [
  {
    service_name: "Roofing Lead Engine",
    url_slug: "roofing",
    headline: "You're Getting Leads. You're Just Not Converting Them.",
    sub: "We build a done-for-you lead conversion funnel and GoHighLevel automation account for roofing contractors. Instant call trigger, automated SMS and email follow-up — so every lead gets a response in 60 seconds, even when your crew is on the roof.",
    pain_stat_1: { value: "78%", label: "Of jobs go to the first contractor who responds" },
    pain_stat_2: { value: "48%", label: "Of home service businesses never follow up with a lead" },
    pain_stat_3: { value: "10–15", label: "Leads per month lost to slow or no follow-up (avg roofing co.)" },
    avg_job_value: 13500,
    setup_fee: 2500,
    monthly_fee: 997,
    break_even_jobs: 1.1,
    conversion_rate_before: "8%",
    conversion_rate_after: "25%",
    avg_monthly_leads_missed: 12,
    problems: [
      { icon: "🕳️", title: "Leads fall through the cracks", body: "You're busy on job sites. By the time you call back, the homeowner already booked someone else. No system means no second chances." },
      { icon: "⏰", title: "Slow follow-up is killing your close rate", body: "78% of roofing jobs go to the first contractor who responds. Without automation, you're always a step behind the competition." },
      { icon: "📱", title: "No follow-up system after the first call", body: "Lead doesn't answer? Most roofers move on. An automated SMS and email sequence keeps working the lead for days without you lifting a finger." },
      { icon: "🔄", title: "Losing to faster competitors", body: "The company with the best follow-up system wins — not the best roofer. If your competitor responds in 60 seconds and you respond in 6 hours, they get the job." },
    ],
    target_audience: "Roofing contractors doing $300K–$5M/year",
    traffic_sources: "Facebook ads, Google, door hangers with QR code, truck wraps",
    seasonal_note: "Storm season (spring/fall) dramatically increases lead volume — your funnel captures and converts the surge automatically",
    meta_title: "Roofing Lead Funnel & Automation System | Klema Creative",
    meta_description: "Done-for-you lead conversion funnel and GoHighLevel automation for roofing contractors. Convert more of the leads you already get. $2,500 setup + $997/mo.",
    quizHeadline: "Get Your Free Roofing Estimate",
    quizSubline: "Answer 4 quick questions",
    demoNotification: "New roofing lead: John S. in Dallas, TX",
    quizSteps: [
      { question: "What type of roofing issue do you have?", options: [{ label: "Repair", emoji: "🔧" }, { label: "Full Replacement", emoji: "🏠" }, { label: "Storm Damage", emoji: "⛈️" }, { label: "Inspection", emoji: "🔍" }] },
      { question: "How old is your current roof?", options: [{ label: "Under 10 years" }, { label: "10–20 years" }, { label: "20+ years" }, { label: "I don't know" }] },
      { question: "Do you own the property?", options: [{ label: "Yes", emoji: "✓" }, { label: "No", emoji: "✗" }] },
      { question: "When are you looking to get this done?", options: [{ label: "ASAP", emoji: "⚡" }, { label: "Within 1 month" }, { label: "Just getting quotes" }] },
    ],
  },
  {
    service_name: "Tree Removal Lead Engine",
    url_slug: "tree-removal",
    headline: "Your Leads Are Calling Someone Else First.",
    sub: "We build a done-for-you lead conversion funnel and GoHighLevel automation account for tree removal companies. 60-second call trigger, automated follow-up sequences — so you close more of the leads you already get.",
    pain_stat_1: { value: "78%", label: "Of jobs go to the first company that responds" },
    pain_stat_2: { value: "48%", label: "Of service businesses never follow up after first contact" },
    pain_stat_3: { value: "8–12", label: "Leads per month lost to slow or zero follow-up (avg tree co.)" },
    avg_job_value: 6500,
    setup_fee: 2500,
    monthly_fee: 997,
    break_even_jobs: 2.2,
    conversion_rate_before: "10%",
    conversion_rate_after: "28%",
    avg_monthly_leads_missed: 10,
    problems: [
      { icon: "🕳️", title: "Leads come in — and nobody follows up", body: "You get calls, form fills, and messages from multiple sources. Without a system, half of them never get a response." },
      { icon: "⏰", title: "Emergency jobs go to the fastest responder", body: "A fallen tree on a house is urgent. Homeowners call 3 companies and hire the first one to answer. You need to be that company — automatically." },
      { icon: "📱", title: "No automated follow-up after the first attempt", body: "Lead doesn't pick up? Without an automated SMS and email sequence running in the background, that lead is gone forever." },
      { icon: "🔄", title: "No centralized system to track leads", body: "Leads come from Google, referrals, yard signs, and Nextdoor — but there's no single place to see them all and no automation to work them." },
    ],
    target_audience: "Tree removal companies doing $200K–$3M/year",
    traffic_sources: "Facebook ads targeting homeowners post-storm, Google LSAs, neighborhood Nextdoor posts, yard signs with QR codes",
    seasonal_note: "Spring and fall storm seasons spike lead volume — your funnel should be live before the surge hits your region",
    meta_title: "Tree Removal Lead Funnel & Automation System | Klema Creative",
    meta_description: "Done-for-you lead conversion funnel and automation for tree removal companies. Convert more leads into booked jobs. $2,500 setup + $997/mo.",
    quizHeadline: "Get Your Free Tree Removal Estimate",
    quizSubline: "Answer 4 quick questions",
    demoNotification: "New tree removal lead: Sarah M. in Austin, TX",
    quizSteps: [
      { question: "What type of tree service do you need?", options: [{ label: "Emergency removal", emoji: "🚨" }, { label: "Scheduled removal", emoji: "🪓" }, { label: "Trimming & pruning", emoji: "✂️" }, { label: "Storm damage", emoji: "🌪️" }] },
      { question: "How many trees need attention?", options: [{ label: "1 tree" }, { label: "2–3 trees" }, { label: "4+ trees" }, { label: "Unsure" }] },
      { question: "Do you own the property?", options: [{ label: "Yes", emoji: "✓" }, { label: "No", emoji: "✗" }] },
      { question: "How urgently do you need service?", options: [{ label: "Emergency (24h)", emoji: "⚡" }, { label: "This week" }, { label: "This month" }, { label: "Just planning" }] },
    ],
  },
  {
    service_name: "HVAC Lead Engine",
    url_slug: "hvac",
    headline: "You're Losing Installs to Whoever Follows Up First.",
    sub: "We build a done-for-you lead conversion funnel and GoHighLevel automation account for HVAC contractors. Instant call trigger, automated SMS and email sequences — so every lead gets a response in 60 seconds, even at peak season.",
    pain_stat_1: { value: "78%", label: "Of HVAC jobs go to the first contractor who responds" },
    pain_stat_2: { value: "48%", label: "Of HVAC companies have no automated follow-up system" },
    pain_stat_3: { value: "10–20", label: "Leads per month lost to slow follow-up during peak season" },
    avg_job_value: 7500,
    setup_fee: 2500,
    monthly_fee: 997,
    break_even_jobs: 1.9,
    conversion_rate_before: "9%",
    conversion_rate_after: "26%",
    avg_monthly_leads_missed: 15,
    problems: [
      { icon: "🌡️", title: "Peak season overwhelms your follow-up", body: "When it's 100°F, leads pour in. Without automation, half of them never get a callback — and your competitors close them instead." },
      { icon: "🕳️", title: "Leads fall through the cracks year-round", body: "Between job sites, paperwork, and your crew — following up with every lead is impossible without a system doing it for you." },
      { icon: "⏰", title: "Homeowners with broken AC don't wait", body: "A homeowner with no AC in July calls 3 companies. The first one to respond gets the job — period. Speed is the entire game." },
      { icon: "📅", title: "No system to nurture shoulder-season leads", body: "Spring tune-ups and fall system checks keep revenue consistent. Without automated follow-up, those opportunities slip away quietly." },
    ],
    target_audience: "HVAC contractors doing $400K–$8M/year",
    traffic_sources: "Facebook ads targeting homeowners (home age 10+ years), Google LSAs, seasonal email campaigns to past customers",
    seasonal_note: "Summer and winter are peak — build your funnel before the season to capture and convert the surge",
    meta_title: "HVAC Lead Funnel & Automation System | Klema Creative",
    meta_description: "Done-for-you lead conversion funnel and GoHighLevel automation for HVAC contractors. Stop losing leads to slow follow-up. $2,500 setup + $997/mo.",
    quizHeadline: "Get Your Free HVAC Assessment",
    quizSubline: "Answer 4 quick questions",
    demoNotification: "New HVAC lead: Mike R. in Phoenix, AZ",
    quizSteps: [
      { question: "What type of HVAC service do you need?", options: [{ label: "Emergency repair", emoji: "🚨" }, { label: "AC replacement", emoji: "❄️" }, { label: "Heating system", emoji: "🔥" }, { label: "Tune-up / maintenance", emoji: "🔧" }] },
      { question: "How old is your current system?", options: [{ label: "Under 5 years" }, { label: "5–10 years" }, { label: "10–15 years" }, { label: "15+ years" }] },
      { question: "Do you own the property?", options: [{ label: "Yes", emoji: "✓" }, { label: "No", emoji: "✗" }] },
      { question: "When do you need service?", options: [{ label: "Today", emoji: "⚡" }, { label: "This week" }, { label: "This month" }, { label: "Planning ahead" }] },
    ],
  },
  {
    service_name: "Plumbing Lead Engine",
    url_slug: "plumbing",
    headline: "Your Leads Are Hiring Whoever Calls Back First.",
    sub: "We build a done-for-you lead conversion funnel and GoHighLevel automation account for plumbing companies. 60-second call trigger, automated follow-up — so you convert emergency and scheduled leads 24/7, even when your office is closed.",
    pain_stat_1: { value: "78%", label: "Of plumbing jobs go to the first company that responds" },
    pain_stat_2: { value: "48%", label: "Of service businesses never follow up after first contact" },
    pain_stat_3: { value: "15–25", label: "Leads per month lost to slow or no follow-up (avg plumbing co.)" },
    avg_job_value: 850,
    setup_fee: 2500,
    monthly_fee: 997,
    break_even_jobs: 17,
    conversion_rate_before: "12%",
    conversion_rate_after: "30%",
    avg_monthly_leads_missed: 20,
    problems: [
      { icon: "🚿", title: "Emergency leads go unanswered after hours", body: "Most plumbing emergencies happen nights and weekends. Without automation, those leads call someone else before your office opens." },
      { icon: "🕳️", title: "Leads fall through the cracks at volume", body: "Plumbing is a volume game. Without a system catching every lead and triggering follow-up automatically, you're leaving revenue on the table every day." },
      { icon: "⏰", title: "No automated follow-up after missed calls", body: "Lead calls and you miss it? Without an instant SMS and email sequence, that homeowner is already calling the next plumber on the list." },
      { icon: "📱", title: "No centralized lead tracking", body: "Leads come from Google, referrals, Angi, and Thumbtack — but there's no single system to track them all and no automation to convert them." },
    ],
    target_audience: "Plumbing companies doing $300K–$5M/year",
    traffic_sources: "Google LSAs (highest intent), Facebook retargeting, Google Business Profile, neighborhood apps",
    seasonal_note: "Winter pipe bursts and spring plumbing prep spike lead volume — your funnel captures and converts 24/7",
    special_note: "Plumbing has lower avg job values but very high volume. Emphasize volume + 24/7 automation angle. Break-even is higher but the system pays off through volume.",
    meta_title: "Plumbing Lead Funnel & Automation System | Klema Creative",
    meta_description: "Done-for-you lead conversion funnel and automation for plumbing companies. 24/7 automated follow-up. Convert more leads into booked jobs. $2,500 setup + $997/mo.",
    quizHeadline: "Get a Plumber on the Phone Now",
    quizSubline: "Answer 3 quick questions",
    demoNotification: "New plumbing lead: Lisa K. in Houston, TX",
    quizSteps: [
      { question: "What's your plumbing situation?", options: [{ label: "Emergency (burst pipe)", emoji: "🚨" }, { label: "Drain issue", emoji: "🚿" }, { label: "Fixture repair / install", emoji: "🔧" }, { label: "Water heater", emoji: "🔥" }] },
      { question: "Is this an emergency?", options: [{ label: "Yes, needs immediate attention", emoji: "⚡" }, { label: "No, scheduled is fine" }] },
      { question: "Do you own the property?", options: [{ label: "Yes", emoji: "✓" }, { label: "Renter with permission" }, { label: "No", emoji: "✗" }] },
    ],
  },
  {
    service_name: "Dental Patient Engine",
    url_slug: "dental",
    headline: "Your Practice Is Losing Patients to Whoever Follows Up First.",
    sub: "We build a done-for-you patient conversion funnel and GoHighLevel automation account for dental practices. Instant follow-up, automated appointment reminders, and reactivation sequences — so more inquiries turn into patients in your chair.",
    pain_stat_1: { value: "48%", label: "Of dental practices have no automated follow-up system" },
    pain_stat_2: { value: "$1,200–$5,000+", label: "Lifetime value of a new dental patient — lost when you don't follow up" },
    pain_stat_3: { value: "10–15", label: "New patient inquiries per month lost to slow or no follow-up (avg practice)" },
    avg_job_value: 2800,
    setup_fee: 2500,
    monthly_fee: 997,
    break_even_jobs: 5.2,
    conversion_rate_before: "15%",
    conversion_rate_after: "35%",
    avg_monthly_leads_missed: 12,
    problems: [
      { icon: "🦷", title: "New patient inquiries go unanswered", body: "Your front desk is busy with patients in-office. Online inquiries and missed calls pile up — and those prospective patients book somewhere else." },
      { icon: "📅", title: "No-shows cost you thousands per month", body: "The average dental practice loses $1,000–$3,000/month to no-shows. Automated reminders via SMS and email reduce that by 60%+." },
      { icon: "🔁", title: "Lapsed patients aren't being reactivated", body: "Most practices have hundreds of patients who haven't been in 18+ months. An automated reactivation sequence can bring back 10–20% of them within 90 days." },
      { icon: "📱", title: "No system to nurture inquiries into bookings", body: "A patient fills out a form or calls and doesn't book immediately. Without automated follow-up, that opportunity is gone." },
    ],
    target_audience: "Dental practices with 1–3 dentists, $500K–$3M/year revenue",
    traffic_sources: "Facebook/Instagram ads (family demographic targeting), Google Ads, Google Business Profile, insurance directories retargeting",
    seasonal_note: "January (new year + new insurance) and August (back to school) are peak inquiry months — your funnel should be converting before the surge",
    special_note: "Use 'Patient Engine' not 'Lead Engine' in all copy for dental. More professional. Emphasize no-shows + LTV angle.",
    meta_title: "Dental Patient Funnel & Automation System | Klema Creative",
    meta_description: "Done-for-you patient conversion funnel and GoHighLevel automation for dental practices. Reduce no-shows, convert more inquiries, reactivate lapsed patients. $2,500 setup + $997/mo.",
    quizHeadline: "Find the Right Dentist for You",
    quizSubline: "Answer 3 quick questions",
    demoNotification: "New patient inquiry: Amanda W. in Denver, CO",
    quizSteps: [
      { question: "What brings you in today?", options: [{ label: "New patient", emoji: "👋" }, { label: "Teeth cleaning", emoji: "✨" }, { label: "Cosmetic", emoji: "💎" }, { label: "Emergency", emoji: "🚨" }] },
      { question: "Do you have dental insurance?", options: [{ label: "Yes", emoji: "✓" }, { label: "No" }, { label: "Not sure" }] },
      { question: "When would you like to be seen?", options: [{ label: "As soon as possible", emoji: "⚡" }, { label: "Within 1 week" }, { label: "This month" }, { label: "Just exploring" }] },
    ],
  },
];

/** Look up a niche by its URL slug */
export function getNicheBySlug(slug: string): NicheData | undefined {
  return niches.find((n) => n.url_slug === slug);
}
