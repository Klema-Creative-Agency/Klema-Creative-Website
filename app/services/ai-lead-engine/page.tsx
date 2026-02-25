import type { Metadata } from "next";
import { getTierBySlug } from "@/app/data/tiers";
import TierLandingPage from "@/app/components/tiers/TierLandingPage";
import BusinessesWeWorkWith from "@/app/components/tiers/BusinessesWeWorkWith";

const tier = getTierBySlug("ai-lead-engine")!;

export const metadata: Metadata = {
  title: tier.metaTitle,
  description: tier.metaDescription,
};

export default function IgnitionPage() {
  return (
    <TierLandingPage tier={tier}>
      <BusinessesWeWorkWith />
    </TierLandingPage>
  );
}
