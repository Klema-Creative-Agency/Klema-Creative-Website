import type { Metadata } from "next";
import { getTierBySlug } from "@/app/data/tiers";
import TierVSLPage from "@/app/components/tiers/TierVSLPage";

const tier = getTierBySlug("accelerator")!;

export const metadata: Metadata = {
  title: `Watch Walkthrough | ${tier.name} | Klema Creative`,
  description: tier.metaDescription,
};

export default function AcceleratorVSLPage() {
  return <TierVSLPage tier={tier} />;
}
