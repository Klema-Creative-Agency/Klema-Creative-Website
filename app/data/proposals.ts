/** Proposal data for dynamic client proposal pages with Stripe checkout */

export interface ProposalFlowStep {
  num: number;
  title: string;
  body: string;
}

export interface ProposalDeliverable {
  title: string;
  body: string;
}

export interface ProposalPilotTerms {
  setupFee: number;
  monthlyRate: number;
  pilotMonths: number;
  standardRate: number;
}

export interface ProposalStripeConfig {
  priceAmountCents: number;
  description: string;
  currency: string;
}

export interface ProposalNextStep {
  num: number;
  title: string;
  body: string;
}

export interface ProposalData {
  slug: string;
  clientName: string;
  clientFirstName: string;
  clientBusinessName: string;
  projectName: string;
  flowSteps: ProposalFlowStep[];
  deliverables: ProposalDeliverable[];
  pilotTerms: ProposalPilotTerms;
  stripeConfig: ProposalStripeConfig;
  nextSteps: ProposalNextStep[];
  status: "active" | "paid" | "expired";
  metaTitle: string;
  metaDescription: string;
}

export const proposals: ProposalData[] = [
  {
    slug: "gwe-credit-repair",
    clientName: "Bria",
    clientFirstName: "Bria",
    clientBusinessName: "GWE Credit Repair",
    projectName: "Stripe Checkout Integration",
    flowSteps: [
      {
        num: 1,
        title: "Customer picks a package",
        body: "Your clients visit your site, see your credit repair packages, and choose the one that fits their needs.",
      },
      {
        num: 2,
        title: "They check out right on your site",
        body: "No redirects, no third-party pages. A clean, secure payment form embedded directly on your website.",
      },
      {
        num: 3,
        title: "Instant confirmation",
        body: "Your customer gets an immediate confirmation and receipt. No waiting, no confusion.",
      },
      {
        num: 4,
        title: "You get notified instantly",
        body: "Every payment triggers a notification to you. You always know when money hits your account.",
      },
    ],
    deliverables: [
      {
        title: "Embedded Stripe Checkout",
        body: "A seamless payment form built directly into your website. Your customers never leave your site to pay.",
      },
      {
        title: "Mobile Optimized",
        body: "The checkout experience works perfectly on every device. Most of your customers will pay from their phone.",
      },
      {
        title: "Instant Payment Notifications",
        body: "Get notified the moment a payment goes through. Email, SMS, or both \u2014 your choice.",
      },
      {
        title: "Automatic Receipts",
        body: "Every customer gets a professional receipt automatically. No manual follow-up needed.",
      },
      {
        title: "CRM Automation",
        body: "Every payment triggers your GHL workflow automatically. New paying clients get onboarded without you lifting a finger.",
      },
      {
        title: "Ongoing Support",
        body: "We monitor your checkout, handle Stripe updates, and keep everything running smoothly month over month.",
      },
    ],
    pilotTerms: {
      setupFee: 750,
      monthlyRate: 350,
      pilotMonths: 6,
      standardRate: 997,
    },
    stripeConfig: {
      priceAmountCents: 110000,
      description: "GWE Credit Repair \u2014 Stripe Checkout Setup ($750) + First Month ($350)",
      currency: "usd",
    },
    nextSteps: [
      {
        num: 1,
        title: "Create your Stripe account",
        body: "If you don't have one yet, we'll walk you through it. Takes about 10 minutes.",
      },
      {
        num: 2,
        title: "Share your Stripe keys with us",
        body: "We'll send you a simple guide. Copy two keys, send them over, done.",
      },
      {
        num: 3,
        title: "We build and test everything",
        body: "We integrate Stripe into your site, test every scenario, and make sure it's bulletproof.",
      },
      {
        num: 4,
        title: "Go live",
        body: "Your customers can start paying directly on your website. You start getting paid faster.",
      },
    ],
    status: "active",
    metaTitle: "Proposal \u2014 GWE Credit Repair | Klema Creative",
    metaDescription: "Custom Stripe checkout integration proposal for GWE Credit Repair.",
  },
];

/** Look up a proposal by its URL slug */
export function getProposalBySlug(slug: string): ProposalData | undefined {
  return proposals.find((p) => p.slug === slug);
}
