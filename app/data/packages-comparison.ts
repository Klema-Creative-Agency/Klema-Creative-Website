import type { ComparisonTier, ComparisonCategory } from "@/app/components/ComparisonTable";

export const packagesTiers: ComparisonTier[] = [
  { name: "Foundation", price: "$1,997", href: "/services/foundation" },
  { name: "Accelerator", price: "$3,997", href: "/services/accelerator" },
  { name: "Authority", price: "$7,500", href: "/services/authority" },
  { name: "Dominator", price: "$12,000", href: "/services/dominator" },
];

export const packagesCategories: ComparisonCategory[] = [
  {
    name: "Lead Engine",
    features: [
      { name: "Lead Conversion Funnel", values: ["\u2713", "\u2713", "\u2713", "\u2713"] },
      { name: "60-Second Call Trigger", values: ["\u2713", "\u2713", "\u2713", "\u2713"] },
      { name: "Automated SMS & Email", values: ["\u2713", "\u2713", "\u2713", "\u2713"] },
      { name: "CRM & Lead Pipeline", values: ["\u2713", "\u2713", "\u2713", "\u2713"] },
      { name: "Monthly Funnel Optimization", values: ["\u2713", "\u2713", "\u2713", "\u2713"] },
    ],
  },
  {
    name: "SEO & Visibility",
    features: [
      { name: "SEO & Local Rankings", values: ["\u2713", "\u2713", "\u2713", "\u2713"] },
      { name: "Google Business Profile", values: ["\u2713", "\u2713", "\u2713", "\u2713"] },
      { name: "Reputation Engine", values: ["\u2713", "\u2713", "\u2713", "\u2713"] },
      { name: "AI Visibility (AEO)", values: ["Basic", "Basic", "Full", "Full"] },
    ],
  },
  {
    name: "Website & Ads",
    features: [
      { name: "Custom Website", values: ["-", "\u2713", "\u2713", "\u2713"] },
      { name: "Paid Ad Management", values: ["-", "\u2713", "\u2713", "\u2713"] },
      { name: "Branded Dashboard", values: ["-", "\u2713", "\u2713", "\u2713"] },
    ],
  },
  {
    name: "Marketing",
    features: [
      { name: "Blog Articles/Month", values: ["-", "-", "4-6", "6-8"] },
      { name: "Social Media", values: ["-", "-", "2 Platforms", "3 Platforms"] },
      { name: "Email Campaigns", values: ["-", "-", "\u2713", "\u2713"] },
      { name: "Competitor Monitoring", values: ["-", "-", "\u2713", "\u2713"] },
      { name: "A/B Testing", values: ["-", "-", "\u2713", "\u2713"] },
    ],
  },
  {
    name: "Lead Team & Support",
    features: [
      { name: "Dedicated Lead Team", values: ["-", "-", "-", "\u2713"] },
      { name: "Lead Qualification Calls", values: ["-", "-", "-", "\u2713"] },
      { name: "Live Hot Transfers", values: ["-", "-", "-", "\u2713"] },
      { name: "Appointment Setting", values: ["-", "-", "-", "\u2713"] },
      { name: "Strategy Calls", values: ["Monthly", "Monthly", "Bi-weekly", "Weekly"] },
      { name: "Business Reviews", values: ["-", "-", "Quarterly", "Quarterly"] },
    ],
  },
];
