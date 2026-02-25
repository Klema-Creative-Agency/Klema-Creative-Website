import type { Metadata } from "next";
import { getNicheBySlug } from "@/app/data/niches";
import VSLPage from "@/app/components/lead-engine/VSLPage";

const niche = getNicheBySlug("plumbing")!;

export const metadata: Metadata = {
  title: `Watch Demo | ${niche.service_name} | Klema Creative`,
  description: niche.meta_description,
};

export default function PlumbingVSLPage() {
  return <VSLPage niche={niche} />;
}
