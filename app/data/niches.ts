/** Niche data for the AI Lead Engine service pages */

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
  cpl_google: string;
  cpl_our_system: string;
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
    headline: "Stop Paying $350 Per Lead to Google.",
    sub: "We build a done-for-you AI lead system for roofing contractors. Mobile-first funnel, instant call trigger, automated follow-up. Your phone rings within 60 seconds of a lead submitting.",
    pain_stat_1: { value: "$350", label: "Average Google Ads cost per roofing lead (2025)" },
    pain_stat_2: { value: "78%", label: "Of jobs go to the first contractor who calls" },
    pain_stat_3: { value: "5 Roofers", label: "Call the same HomeAdvisor lead simultaneously" },
    avg_job_value: 13500,
    setup_fee: 2500,
    monthly_fee: 997,
    break_even_jobs: 1.1,
    cpl_google: "$228–$350",
    cpl_our_system: "$40–$80",
    problems: [
      { icon: "💸", title: "Shared leads from HomeAdvisor", body: "You're 1 of 5 contractors calling the same homeowner. Race to the bottom on price before you've said hello." },
      { icon: "📉", title: "Google Ads bleeding margin", body: "$228–$350 average cost per roofing lead. Stop paying and the leads stop. You own nothing." },
      { icon: "⏰", title: "Slow follow-up kills deals", body: "78% of roofing jobs go to the first contractor who calls. Your crew is on the roof, not the phone." },
      { icon: "📱", title: "Website not built for mobile", body: "Homeowners find you on their phone, hit a slow desktop site, bounce in 8 seconds. You paid for that click." },
    ],
    target_audience: "Roofing contractors doing $300K–$5M/year",
    traffic_sources: "Facebook ads, Google, door hangers with QR code, truck wraps",
    seasonal_note: "Storm season (spring/fall) dramatically increases demand — system captures surge automatically",
    meta_title: "Roofing Lead Engine | AI Lead Generation for Contractors | Klema Creative",
    meta_description: "Done-for-you lead generation for roofing contractors. Mobile funnel + instant call trigger. Stop paying $350/lead. $2,500 setup + $997/mo.",
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
    headline: "Stop Letting Storm Season Pass You By.",
    sub: "We build a done-for-you AI lead system for tree removal companies. Mobile-first funnel, instant call trigger, automated follow-up. Your phone rings within 60 seconds of a homeowner submitting.",
    pain_stat_1: { value: "$75–$150", label: "Average cost per exclusive tree removal lead" },
    pain_stat_2: { value: "$4,000–$12,000", label: "Average tree removal job value" },
    pain_stat_3: { value: "38%", label: "Increase in storm damage events over the last decade — demand is only growing" },
    avg_job_value: 6500,
    setup_fee: 2500,
    monthly_fee: 997,
    break_even_jobs: 2.2,
    cpl_google: "$45–$150",
    cpl_our_system: "$20–$55",
    problems: [
      { icon: "🌪️", title: "Storm season overwhelms you — or passes you by", body: "When demand spikes, your phone should be ringing non-stop. Instead, homeowners call whoever ranks first on Google — not the best company." },
      { icon: "💸", title: "Angi and Thumbtack share your leads", body: "You pay $75+ per lead and compete with 3–4 other companies for the same homeowner. Low close rates, high frustration." },
      { icon: "⏰", title: "Emergency jobs go to the fastest responder", body: "A fallen tree on a house is urgent. Homeowners call 3 companies and hire the first one to answer. You need to be that company." },
      { icon: "📱", title: "Your online presence doesn't reflect your quality", body: "Great crews, slow website. Homeowners see your truck but can't find you online or trust what they see." },
    ],
    target_audience: "Tree removal companies doing $200K–$3M/year",
    traffic_sources: "Facebook ads targeting homeowners post-storm, Google LSAs, neighborhood Nextdoor posts, yard signs with QR codes",
    seasonal_note: "Spring and fall storm seasons are peak — system should be live before storm season hits your region",
    meta_title: "Tree Removal Lead Engine | AI Lead Generation | Klema Creative",
    meta_description: "Done-for-you lead system for tree removal companies. Capture storm season demand automatically. $2,500 setup + $997/mo.",
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
    headline: "Stop Losing Summer Installs to Whoever Calls Back First.",
    sub: "We build a done-for-you AI lead system for HVAC contractors. Mobile-first funnel, instant call trigger, automated follow-up. Your phone rings within 60 seconds of a homeowner submitting — even at peak season.",
    pain_stat_1: { value: "$80–$150", label: "Average Google Ads cost per HVAC lead in 2025" },
    pain_stat_2: { value: "$5,000–$12,000", label: "Average AC replacement job value" },
    pain_stat_3: { value: "$104", label: "Blended average Google Ads CPL across 816 HVAC contractors tracked (Jan 2026)" },
    avg_job_value: 7500,
    setup_fee: 2500,
    monthly_fee: 997,
    break_even_jobs: 1.9,
    cpl_google: "$80–$149",
    cpl_our_system: "$25–$60",
    problems: [
      { icon: "🌡️", title: "Peak season demand — no system to handle it", body: "When it's 100°F, your phone rings off the hook. But without a system, leads fall through the cracks and competitors get the jobs." },
      { icon: "💸", title: "Google Ads costs hitting $149/lead for new customers", body: "Non-branded HVAC search campaigns average $149 per lead. A slow response rate means you're paying for leads your competitors are closing." },
      { icon: "⏰", title: "Homeowners with broken AC don't wait", body: "A homeowner with no AC in July calls 3 companies. The first one to respond gets the job — period. Speed is the entire game." },
      { icon: "📅", title: "Shoulder season is feast or famine", body: "Spring tune-ups and fall system checks keep revenue consistent. Without a proactive lead system, you lose those months completely." },
    ],
    target_audience: "HVAC contractors doing $400K–$8M/year",
    traffic_sources: "Facebook ads targeting homeowners (home age 10+ years), Google LSAs, seasonal email campaigns to past customers",
    seasonal_note: "Summer (AC) and winter (heating) are peak — build system before season to capture the surge",
    meta_title: "HVAC Lead Engine | AI Lead Generation for HVAC Contractors | Klema Creative",
    meta_description: "Done-for-you lead generation for HVAC contractors. Mobile funnel, instant call trigger, peak season ready. $2,500 setup + $997/mo.",
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
    headline: "Stop Competing With 4 Other Plumbers for the Same Lead.",
    sub: "We build a done-for-you AI lead system for plumbing companies. Mobile-first funnel, instant call trigger, automated follow-up. When a homeowner has a burst pipe, your phone rings first.",
    pain_stat_1: { value: "$69–$129", label: "Average Google Ads cost per plumbing lead (2025)" },
    pain_stat_2: { value: "$300–$3,000+", label: "Plumbing job value range — emergency jobs at the top" },
    pain_stat_3: { value: "41.5%", label: "LSA book rate for plumbing — highest of all home service trades" },
    avg_job_value: 850,
    setup_fee: 2500,
    monthly_fee: 997,
    break_even_jobs: 17,
    cpl_google: "$69–$129",
    cpl_our_system: "$15–$45",
    problems: [
      { icon: "🚿", title: "Emergency leads go to whoever answers first", body: "A burst pipe at 9pm is not a 'submit a form and wait' situation. Homeowners call 3 plumbers and hire the first human they reach." },
      { icon: "💸", title: "Shared leads from Thumbtack and Angi", body: "You pay $40–$80 per lead and so do 3 other plumbers — all calling the same homeowner within 60 seconds of each other." },
      { icon: "🔄", title: "High volume, low margin without a system", body: "Plumbing is a volume game. Without a system that qualifies leads and books jobs automatically, you're trading time for money with no scale." },
      { icon: "📱", title: "After-hours leads are lost revenue", body: "Most plumbing emergencies happen nights and weekends. Your system should be capturing and responding to those leads even when your office is closed." },
    ],
    target_audience: "Plumbing companies doing $300K–$5M/year",
    traffic_sources: "Google LSAs (highest intent), Facebook retargeting, Google Business Profile, neighborhood apps",
    seasonal_note: "Winter pipe bursts and spring plumbing prep are peak emergency periods — system captures 24/7",
    special_note: "Plumbing has lower avg job values but very high volume. Emphasize volume + 24/7 automation angle. Break-even is higher but the system pays off through volume.",
    meta_title: "Plumbing Lead Engine | AI Lead Generation | Klema Creative",
    meta_description: "Done-for-you lead system for plumbing companies. 24/7 automated follow-up. Emergency leads captured instantly. $2,500 setup + $997/mo.",
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
    headline: "Stop Paying $84 Per Click for Patients Who Don't Show Up.",
    sub: "We build a done-for-you AI patient acquisition system for dental practices. Mobile-first quiz funnel, instant follow-up, automated appointment reminders. New patients booked directly into your schedule.",
    pain_stat_1: { value: "$84", label: "Average Google Ads cost per dental lead (2025)" },
    pain_stat_2: { value: "$1,200–$5,000+", label: "New patient lifetime value for a dental practice" },
    pain_stat_3: { value: "77%", label: "Of patients search online before booking a dentist" },
    avg_job_value: 2800,
    setup_fee: 2500,
    monthly_fee: 997,
    break_even_jobs: 5.2,
    cpl_google: "$84–$200",
    cpl_our_system: "$20–$55",
    problems: [
      { icon: "🦷", title: "New patient acquisition is expensive and unreliable", body: "Google Ads for dentists average $84–$200 per lead. Insurance directories give you low-quality leads you compete for on price alone." },
      { icon: "📅", title: "No-shows cost you thousands per month", body: "The average dental practice loses $1,000–$3,000/month to no-shows. A proper follow-up and reminder system reduces that by 60%+" },
      { icon: "💻", title: "Your website isn't built to convert mobile traffic", body: "77% of patients search on mobile before booking. If your site takes more than 3 seconds to load or doesn't have a clear booking path, they're gone." },
      { icon: "🔁", title: "No system to reactivate lapsed patients", body: "Most practices have hundreds of patients who haven't been in 18+ months. A targeted automated sequence can reactivate 10–20% of them within 90 days." },
    ],
    target_audience: "Dental practices with 1–3 dentists, $500K–$3M/year revenue",
    traffic_sources: "Facebook/Instagram ads (family demographic targeting), Google Ads, Google Business Profile, insurance directories retargeting",
    seasonal_note: "January (new year resolutions + new insurance), August/September (back to school) are peak new patient months",
    special_note: "Use 'Patient Engine' not 'Lead Engine' in all copy for dental. More professional. Emphasize no-shows + LTV angle.",
    meta_title: "Dental Patient Engine | New Patient Acquisition | Klema Creative",
    meta_description: "Done-for-you new patient acquisition for dental practices. Reduce no-shows, fill your schedule, reactivate lapsed patients. $2,500 setup + $997/mo.",
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
