import type { Metadata } from "next";
import { archivedIgnition } from "@/app/data/tiers";
import TierVSLPage from "@/app/components/tiers/TierVSLPage";

const tier = archivedIgnition;

export const metadata: Metadata = {
  title: `Watch Walkthrough | ${tier.name} | Klema Creative`,
  description: tier.metaDescription,
};

export default function LeadEngineVSLPage() {
  return <TierVSLPage tier={tier} />;
}
