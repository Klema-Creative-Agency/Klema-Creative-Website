import type { Metadata } from "next";
import { getNicheBySlug } from "@/app/data/niches";
import NicheServicePage from "@/app/components/lead-engine/NicheServicePage";

const niche = getNicheBySlug("tree-removal")!;

export const metadata: Metadata = {
  title: niche.meta_title,
  description: niche.meta_description,
};

export default function TreeRemovalLeadEnginePage() {
  return <NicheServicePage niche={niche} />;
}
