import type { Metadata } from "next";
import { getNicheBySlug } from "@/app/data/niches";
import VSLPage from "@/app/components/lead-engine/VSLPage";

const niche = getNicheBySlug("dental")!;

export const metadata: Metadata = {
  title: `Watch Demo | ${niche.service_name} | Klema Creative`,
  description: niche.meta_description,
};

export default function DentalVSLPage() {
  return <VSLPage niche={niche} />;
}
