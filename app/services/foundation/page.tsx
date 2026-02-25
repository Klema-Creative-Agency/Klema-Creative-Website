import type { Metadata } from "next";
import { getTierBySlug } from "@/app/data/tiers";
import TierLandingPage from "@/app/components/tiers/TierLandingPage";

const tier = getTierBySlug("foundation")!;

export const metadata: Metadata = {
  title: tier.metaTitle,
  description: tier.metaDescription,
};

export default function FoundationPage() {
  return <TierLandingPage tier={tier} />;
}
