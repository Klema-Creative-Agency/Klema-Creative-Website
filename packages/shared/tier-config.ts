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
    name: "Digital Foundation",
    slug: "digital-foundation",
    price: 4000,
    hours: "50-55",
    onboardingWeeks: 2,
    description:
      "Essential digital presence for businesses getting started with professional marketing.",
    deliverables: {
      keywordsTracked: 15,
      blogsPerMonth: 2,
      socialPostsPerMonth: 12,
      socialPlatforms: 1,
      socialFrequency: "3x/week",
      leadManagementHours: 0,
      reputationManagement: false,
      citationBuilding: true,
      paidAds: false,
    },
    portalFeatures: {
      dashboard: true,
      reports: true,
      contentCalendar: true,
      contentComments: false,
      fileUpload: false,
      messaging: true,
      scheduling: true,
      leadDashboard: false,
      leadPipeline: false,
      reputation: false,
      llmVisibility: false,
      llmVisibilityDetailed: false,
      whiteLabel: false,
    },
  },

  2: {
    id: 2,
    name: "Growth Accelerator",
    slug: "growth-accelerator",
    price: 8500,
    hours: "120-130",
    onboardingWeeks: 3,
    description:
      "Full-service marketing engine with lead management and reputation building.",
    deliverables: {
      keywordsTracked: 30,
      blogsPerMonth: 4,
      socialPostsPerMonth: 20,
      socialPlatforms: 2,
      socialFrequency: "5x/week",
      leadManagementHours: 20,
      reputationManagement: true,
      citationBuilding: true,
      paidAds: false,
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
      leadPipeline: false,
      reputation: true,
      llmVisibility: true,
      llmVisibilityDetailed: false,
      whiteLabel: false,
    },
  },

  3: {
    id: 3,
    name: "Market Dominator",
    slug: "market-dominator",
    price: 12000,
    hours: "320-340",
    onboardingWeeks: 4,
    description:
      "Complete market domination with full pipeline visibility and white-label options.",
    deliverables: {
      keywordsTracked: 50,
      blogsPerMonth: 8,
      socialPostsPerMonth: 30,
      socialPlatforms: 3,
      socialFrequency: "daily",
      leadManagementHours: 80,
      reputationManagement: true,
      citationBuilding: true,
      paidAds: false,
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
