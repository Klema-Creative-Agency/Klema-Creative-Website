import type { Metadata } from "next";
import { archivedIgnition } from "@/app/data/tiers";
import TierLandingPage from "@/app/components/tiers/TierLandingPage";
import BusinessesWeWorkWith from "@/app/components/tiers/BusinessesWeWorkWith";

const tier = archivedIgnition;

export const metadata: Metadata = {
  title: tier.metaTitle,
  description: tier.metaDescription,
};

export default function LeadEnginePage() {
  return (
    <TierLandingPage tier={tier}>
      <BusinessesWeWorkWith />
    </TierLandingPage>
  );
}
