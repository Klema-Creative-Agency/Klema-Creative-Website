/** Web Engineering service data — standalone one-off website tiers */

import type { ComparisonTier } from "@/app/components/ComparisonTable";

export interface WebTier {
  id: string;
  name: string;
  monthly: string;
  monthlyNum: number;
  setup: string;
  setupNum: number;
  pages: string;
  crm: string;
  featured: boolean;
  tagline: string;
  bestFor: string;
  features: string[];
}

export interface WebAddon {
  name: string;
  setup: string;
  monthly: string;
  description: string;
}

export interface WebFeatureCategory {
  name: string;
  features: { name: string; values: string[] }[];
}

export const webTiers: WebTier[] = [
  {
    id: "launchpad",
    name: "Launchpad",
    monthly: "$397",
    monthlyNum: 397,
    setup: "$500",
    setupNum: 500,
    pages: "1 page (funnel)",
    crm: "No",
    featured: false,
    tagline: "One high-converting page to start capturing leads.",
    bestFor: "New businesses or side hustles that need a single landing page fast.",
    features: [
      "1 custom-designed page",
      "Mobile-first, fast-loading",
      "Lead capture form",
      "Basic SEO setup",
      "SSL & hosting included",
      "Monthly maintenance & updates",
    ],
  },
  {
    id: "growth-site",
    name: "Growth Site",
    monthly: "$497",
    monthlyNum: 497,
    setup: "$1,000",
    setupNum: 1000,
    pages: "Up to 5 pages",
    crm: "Yes",
    featured: true,
    tagline: "A full website with CRM — built to grow with you.",
    bestFor: "Established businesses ready for a professional online presence with lead management.",
    features: [
      "Up to 5 custom pages",
      "Mobile-first, fast-loading",
      "Lead capture forms",
      "CRM integration (Klema CRM)",
      "On-page SEO for all pages",
      "SSL & hosting included",
      "Monthly maintenance & updates",
      "Analytics dashboard",
    ],
  },
  {
    id: "command-center",
    name: "Command Center",
    monthly: "$997",
    monthlyNum: 997,
    setup: "$2,500",
    setupNum: 2500,
    pages: "Up to 10 pages",
    crm: "Yes + automations & rules",
    featured: false,
    tagline: "A full-scale web platform with automations and advanced CRM.",
    bestFor: "Growing businesses that need a serious web presence with automation built in.",
    features: [
      "Up to 10 custom pages",
      "Mobile-first, fast-loading",
      "Advanced lead capture & forms",
      "CRM with automations & rules",
      "Full on-page & technical SEO",
      "SSL & hosting included",
      "Monthly maintenance & updates",
      "Analytics dashboard",
      "Priority support",
    ],
  },
];

export const stripeAddon: WebAddon = {
  name: "Stripe Integration",
  setup: "$1,000",
  monthly: "$67/mo",
  description:
    "Accept payments directly on your site. We integrate Stripe, set up your checkout flow, and handle ongoing maintenance so you get paid seamlessly.",
};

export const webFeatures: WebFeatureCategory[] = [
  {
    name: "Design & Build",
    features: [
      { name: "Custom pages", values: ["1", "Up to 5", "Up to 10"] },
      { name: "Mobile-first responsive", values: ["\u2713", "\u2713", "\u2713"] },
      { name: "Custom design (not a template)", values: ["\u2713", "\u2713", "\u2713"] },
      { name: "Page speed optimization", values: ["\u2713", "\u2713", "\u2713"] },
    ],
  },
  {
    name: "Lead Capture & CRM",
    features: [
      { name: "Lead capture form", values: ["\u2713", "\u2713", "\u2713"] },
      { name: "CRM integration", values: ["\u2014", "\u2713", "\u2713"] },
      { name: "CRM automations & rules", values: ["\u2014", "\u2014", "\u2713"] },
      { name: "Multi-step forms", values: ["\u2014", "\u2014", "\u2713"] },
    ],
  },
  {
    name: "SEO & Performance",
    features: [
      { name: "Basic SEO setup", values: ["\u2713", "\u2713", "\u2713"] },
      { name: "On-page SEO (all pages)", values: ["\u2014", "\u2713", "\u2713"] },
      { name: "Technical SEO audit", values: ["\u2014", "\u2014", "\u2713"] },
      { name: "Schema markup", values: ["\u2014", "\u2014", "\u2713"] },
    ],
  },
  {
    name: "Support & Hosting",
    features: [
      { name: "SSL & hosting", values: ["\u2713", "\u2713", "\u2713"] },
      { name: "Monthly maintenance", values: ["\u2713", "\u2713", "\u2713"] },
      { name: "Analytics dashboard", values: ["\u2014", "\u2713", "\u2713"] },
      { name: "Priority support", values: ["\u2014", "\u2014", "\u2713"] },
    ],
  },
];

export const webComparisonTiers: ComparisonTier[] = webTiers.map((t) => ({
  name: t.name,
  price: t.monthly,
  href: "#apply",
}));

export const webMeta = {
  title: "Web Engineering — Custom Websites for Local Businesses | Klema Creative",
  description:
    "High-performance, custom-designed websites built to convert. 3 tiers from single-page funnels to full web platforms with CRM and automations.",
};
