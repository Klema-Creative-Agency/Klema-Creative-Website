/* ─── Funnel Content Data ─── */

export interface FunnelNiche {
  slug: string;
  displayName: string;
  painHeadline: string;
  painSubheadline: string;
  painPoints: string[];
  avgJobValue: string;
  competitorCallTime: string;
  heroCtaText: string;
  urgencyBar: string;
}

export const DEFAULT_NICHE: FunnelNiche = {
  slug: "default",
  displayName: "Local Service Businesses",
  painHeadline: "Your Leads Are Calling Your Competitors While You Sleep",
  painSubheadline:
    "Most service businesses lose 60%+ of their leads because they take too long to respond. We fix that with Facebook Ads that generate calls and an AI that books them instantly.",
  painPoints: [
    "78% of customers hire the first business that responds",
    "The average service business takes 47 hours to follow up on a lead",
    "After 5 minutes, your odds of reaching a lead drop by 80%",
    "You are paying for ads but letting leads slip through the cracks",
  ],
  avgJobValue: "$2,500",
  competitorCallTime: "47 hours",
  heroCtaText: "See If Your Area Is Available",
  urgencyBar: "Only accepting 5 businesses in your area this month",
};

export const NICHE_MAP: Record<string, FunnelNiche> = {
  hvac: {
    slug: "hvac",
    displayName: "HVAC Companies",
    painHeadline: "Your HVAC Leads Are Calling Your Competitors While You Sleep",
    painSubheadline:
      "Most HVAC companies lose 60%+ of their leads because they take too long to respond. We fix that with Facebook Ads that generate calls and an AI that books them instantly.",
    painPoints: [
      "78% of homeowners hire the first HVAC company that responds",
      "The average HVAC company takes 47 hours to follow up on a lead",
      "After 5 minutes, your odds of booking that AC repair drop by 80%",
      "You are paying for ads but letting $3,500+ jobs slip away",
    ],
    avgJobValue: "$3,500",
    competitorCallTime: "47 hours",
    heroCtaText: "See If Your Area Is Available",
    urgencyBar: "Only accepting 5 HVAC companies this month",
  },
  roofing: {
    slug: "roofing",
    displayName: "Roofing Companies",
    painHeadline: "Your Roofing Leads Are Calling Your Competitors While You Sleep",
    painSubheadline:
      "Most roofing companies lose 60%+ of their leads because they take too long to respond. We fix that with Facebook Ads that generate calls and an AI that books them instantly.",
    painPoints: [
      "78% of homeowners hire the first roofer that responds",
      "The average roofing company takes 47 hours to follow up",
      "After 5 minutes, your odds of booking that roof replacement drop by 80%",
      "You are paying for ads but letting $8,000+ jobs walk away",
    ],
    avgJobValue: "$8,500",
    competitorCallTime: "47 hours",
    heroCtaText: "See If Your Area Is Available",
    urgencyBar: "Only accepting 5 roofing companies this month",
  },
  plumbing: {
    slug: "plumbing",
    displayName: "Plumbing Companies",
    painHeadline: "Your Plumbing Leads Are Calling Your Competitors While You Sleep",
    painSubheadline:
      "Most plumbing companies lose 60%+ of their leads because they take too long to respond. We fix that with Facebook Ads that generate calls and an AI that books them instantly.",
    painPoints: [
      "78% of homeowners hire the first plumber that responds",
      "The average plumbing company takes 47 hours to follow up",
      "After 5 minutes, your odds of booking that service call drop by 80%",
      "You are paying for ads but letting $1,500+ jobs go to competitors",
    ],
    avgJobValue: "$1,500",
    competitorCallTime: "47 hours",
    heroCtaText: "See If Your Area Is Available",
    urgencyBar: "Only accepting 5 plumbing companies this month",
  },
  cleaning: {
    slug: "cleaning",
    displayName: "Cleaning Companies",
    painHeadline: "Your Cleaning Leads Are Calling Your Competitors While You Sleep",
    painSubheadline:
      "Most cleaning companies lose 60%+ of their leads because they take too long to respond. We fix that with Facebook Ads that generate calls and an AI that books them instantly.",
    painPoints: [
      "78% of customers hire the first cleaning company that responds",
      "The average cleaning company takes 47 hours to follow up",
      "After 5 minutes, your odds of booking that recurring client drop by 80%",
      "You are paying for ads but letting $200+/month recurring clients walk away",
    ],
    avgJobValue: "$200/mo",
    competitorCallTime: "47 hours",
    heroCtaText: "See If Your Area Is Available",
    urgencyBar: "Only accepting 5 cleaning companies this month",
  },
  dental: {
    slug: "dental",
    displayName: "Dental Practices",
    painHeadline: "Your New Patient Leads Are Calling Other Dentists While You Wait",
    painSubheadline:
      "Most dental practices lose 60%+ of their leads because they take too long to respond. We fix that with Facebook Ads that generate calls and an AI that books them instantly.",
    painPoints: [
      "78% of patients book with the first practice that responds",
      "The average dental office takes 47 hours to follow up on an inquiry",
      "After 5 minutes, your odds of reaching that patient drop by 80%",
      "You are paying for ads but letting $3,000+ lifetime-value patients walk",
    ],
    avgJobValue: "$3,000",
    competitorCallTime: "47 hours",
    heroCtaText: "See If Your Area Is Available",
    urgencyBar: "Only accepting 5 dental practices this month",
  },
};

export function getNiche(slug?: string | null): FunnelNiche {
  if (!slug) return DEFAULT_NICHE;
  return NICHE_MAP[slug] ?? DEFAULT_NICHE;
}

/* ─── How It Works Steps ─── */
export const HOW_IT_WORKS_STEPS = [
  {
    number: "01",
    title: "We Launch Targeted Ads",
    description:
      "We build and run Facebook ad campaigns designed to reach homeowners in your service area who need what you offer right now.",
    icon: "ads",
  },
  {
    number: "02",
    title: "AI Calls the Lead in Seconds",
    description:
      "The moment someone fills out your ad form, our AI appointment setter calls them within 60 seconds, qualifies them, and books them on your calendar.",
    icon: "ai",
  },
  {
    number: "03",
    title: "You Show Up and Close",
    description:
      "You get a notification with a qualified, booked appointment. No chasing leads, no phone tag, no missed opportunities.",
    icon: "close",
  },
];

/* ─── Value Stack Items ─── */
export const VALUE_STACK = [
  { item: "Custom Facebook Ad Campaigns", value: "$1,500/mo" },
  { item: "AI Appointment Setter (calls in 60 seconds)", value: "$2,000/mo" },
  { item: "Lead Qualification & Booking", value: "$1,000/mo" },
  { item: "Campaign Optimization & Reporting", value: "$500/mo" },
  { item: "Dedicated Account Manager", value: "$500/mo" },
];

/* ─── FAQ Items ─── */
export const FAQ_ITEMS = [
  {
    question: "How fast does the AI actually call my leads?",
    answer:
      "Within 60 seconds of the lead submitting the form. The AI calls, qualifies them based on your criteria, and books them directly onto your calendar. No human delay, no missed calls.",
  },
  {
    question: "What if the lead does not answer the first call?",
    answer:
      "The AI follows up with a strategic sequence of calls and texts over the next 48 hours. Most leads are reached within the first 3 attempts. Nothing falls through the cracks.",
  },
  {
    question: "Do I need to sign a long-term contract?",
    answer:
      "No. We work month-to-month because we believe our results should earn your business every single month. If you want to cancel, you can do so at any time with no penalties.",
  },
  {
    question: "How is this different from other lead generation services?",
    answer:
      "Two things set us apart: speed and exclusivity. Most lead gen services send you a lead and hope you call it in time. We call the lead for you in under a minute. And your leads are exclusively yours. We never sell the same lead to your competitors.",
  },
  {
    question: "What kind of results can I expect?",
    answer:
      "Results vary by market and niche, but our system is built to book 15-30+ qualified appointments per month. Because the AI responds instantly, conversion rates from lead to booked appointment are typically 2-3x higher than manual follow-up.",
  },
  {
    question: "How much ad spend do I need?",
    answer:
      "We recommend a minimum ad budget of $1,000-$1,500/month for Facebook ads. This is separate from our service fee and goes directly to Facebook. We will help you determine the right budget for your market during our strategy call.",
  },
  {
    question: "How quickly can I expect to see results?",
    answer:
      "Most clients start seeing leads within the first 48-72 hours of launching ads. The AI appointment setter is active from day one. By the end of your first month, you will have a clear picture of your cost-per-appointment and ROI.",
  },
  {
    question: "Will the AI sound robotic to my leads?",
    answer:
      "Not at all. Our AI uses advanced conversational technology that sounds natural and professional. It introduces itself, asks qualifying questions, handles objections, and books the appointment just like a trained receptionist would.",
  },
];

/* ─── Trust / Industry Stats ─── */
export const TRUST_STATS = [
  { stat: "78%", label: "of customers hire the first responder" },
  { stat: "60s", label: "average AI response time" },
  { stat: "2-3x", label: "higher booking rate vs manual follow-up" },
  { stat: "0", label: "leads shared with your competitors" },
];
