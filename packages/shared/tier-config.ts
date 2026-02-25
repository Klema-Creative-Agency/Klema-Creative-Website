// ─── Types ───────────────────────────────────────────────────────────────────

export interface TierPortalFeatures {
  dashboard: boolean;
  reports: boolean;
  contentCalendar: boolean;
  contentComments: boolean;
  fileUpload: boolean;
  messaging: boolean;
  scheduling: boolean;
  leadDashboard: boolean;
  leadPipeline: boolean;
  reputation: boolean;
  llmVisibility: boolean;
  llmVisibilityDetailed: boolean;
  whiteLabel: boolean;
}

export interface TierDeliverables {
  keywordsTracked: number;
  blogsPerMonth: number;
  socialPostsPerMonth: number;
  socialPlatforms: number;
  socialFrequency: string;
  leadManagementHours: number;
  reputationManagement: boolean;
  citationBuilding: boolean;
  paidAds: boolean;
}

export interface Tier {
  id: number;
  name: string;
  slug: string;
  price: number;
  setupFee: number;
  hours: string;
  onboardingWeeks: number;
  deliverables: TierDeliverables;
  portalFeatures: TierPortalFeatures;
  description: string;
}

// ─── Tier Definitions ────────────────────────────────────────────────────────

export const TIERS: Record<number, Tier> = {
  1: {
    id: 1,
    name: "Ignition",
    slug: "ignition",
    price: 997,
    setupFee: 2500,
    hours: "10-15",
    onboardingWeeks: 2,
    description:
      "Lead conversion funnel and automation system. Stop losing the leads you already get.",
    deliverables: {
      keywordsTracked: 0,
      blogsPerMonth: 0,
      socialPostsPerMonth: 0,
      socialPlatforms: 0,
      socialFrequency: "N/A",
      leadManagementHours: 0,
      reputationManagement: false,
      citationBuilding: false,
      paidAds: false,
    },
    portalFeatures: {
      dashboard: true,
      reports: true,
      contentCalendar: false,
      contentComments: false,
      fileUpload: false,
      messaging: true,
      scheduling: true,
      leadDashboard: true,
      leadPipeline: true,
      reputation: false,
      llmVisibility: false,
      llmVisibilityDetailed: false,
      whiteLabel: false,
    },
  },

  2: {
    id: 2,
    name: "Foundation",
    slug: "foundation",
    price: 1997,
    setupFee: 2500,
    hours: "20-25",
    onboardingWeeks: 2,
    description:
      "Lead engine plus SEO, reputation management, and local visibility.",
    deliverables: {
      keywordsTracked: 15,
      blogsPerMonth: 0,
      socialPostsPerMonth: 0,
      socialPlatforms: 0,
      socialFrequency: "N/A",
      leadManagementHours: 0,
      reputationManagement: true,
      citationBuilding: true,
      paidAds: false,
    },
    portalFeatures: {
      dashboard: true,
      reports: true,
      contentCalendar: false,
      contentComments: false,
      fileUpload: false,
      messaging: true,
      scheduling: true,
      leadDashboard: true,
      leadPipeline: true,
      reputation: true,
      llmVisibility: true,
      llmVisibilityDetailed: false,
      whiteLabel: false,
    },
  },

  3: {
    id: 3,
    name: "Accelerator",
    slug: "accelerator",
    price: 3997,
    setupFee: 5000,
    hours: "40-50",
    onboardingWeeks: 3,
    description:
      "Full digital presence with custom website, paid ads, and branded reporting.",
    deliverables: {
      keywordsTracked: 30,
      blogsPerMonth: 0,
      socialPostsPerMonth: 0,
      socialPlatforms: 0,
      socialFrequency: "N/A",
      leadManagementHours: 0,
      reputationManagement: true,
      citationBuilding: true,
      paidAds: true,
    },
    portalFeatures: {
      dashboard: true,
      reports: true,
      contentCalendar: true,
      contentComments: true,
      fileUpload: true,
      messaging: true,
      scheduling: true,
      leadDashboard: true,
      leadPipeline: true,
      reputation: true,
      llmVisibility: true,
      llmVisibilityDetailed: false,
      whiteLabel: false,
    },
  },

  4: {
    id: 4,
    name: "Authority",
    slug: "authority",
    price: 7500,
    setupFee: 7500,
    hours: "120-140",
    onboardingWeeks: 3,
    description:
      "Full marketing management — content, social, email, ads, and strategy.",
    deliverables: {
      keywordsTracked: 50,
      blogsPerMonth: 6,
      socialPostsPerMonth: 20,
      socialPlatforms: 2,
      socialFrequency: "5x/week",
      leadManagementHours: 0,
      reputationManagement: true,
      citationBuilding: true,
      paidAds: true,
    },
    portalFeatures: {
      dashboard: true,
      reports: true,
      contentCalendar: true,
      contentComments: true,
      fileUpload: true,
      messaging: true,
      scheduling: true,
      leadDashboard: true,
      leadPipeline: true,
      reputation: true,
      llmVisibility: true,
      llmVisibilityDetailed: true,
      whiteLabel: false,
    },
  },

  5: {
    id: 5,
    name: "Dominator",
    slug: "dominator",
    price: 12000,
    setupFee: 10000,
    hours: "320-340",
    onboardingWeeks: 4,
    description:
      "Complete market domination with dedicated lead team, live hot transfers, and full pipeline management.",
    deliverables: {
      keywordsTracked: 50,
      blogsPerMonth: 8,
      socialPostsPerMonth: 30,
      socialPlatforms: 3,
      socialFrequency: "daily",
      leadManagementHours: 80,
      reputationManagement: true,
      citationBuilding: true,
      paidAds: true,
    },
    portalFeatures: {
      dashboard: true,
      reports: true,
      contentCalendar: true,
      contentComments: true,
      fileUpload: true,
      messaging: true,
      scheduling: true,
      leadDashboard: true,
      leadPipeline: true,
      reputation: true,
      llmVisibility: true,
      llmVisibilityDetailed: true,
      whiteLabel: true,
    },
  },
};

// ─── Helper Functions ────────────────────────────────────────────────────────

export function getTier(tierId: number): Tier {
  const tier = TIERS[tierId];
  if (!tier) throw new Error(`Unknown tier: ${tierId}`);
  return tier;
}

export function getTierDeliverables(tierId: number): TierDeliverables {
  return getTier(tierId).deliverables;
}

export function getTierPortalFeatures(tierId: number): TierPortalFeatures {
  return getTier(tierId).portalFeatures;
}

export function getAllTierNames(): { id: number; name: string }[] {
  return Object.values(TIERS).map((t) => ({ id: t.id, name: t.name }));
}
