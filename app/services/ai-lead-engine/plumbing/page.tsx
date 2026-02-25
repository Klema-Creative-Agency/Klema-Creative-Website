import type { Metadata } from "next";
import { getNicheBySlug } from "@/app/data/niches";
import NicheServicePage from "@/app/components/lead-engine/NicheServicePage";

const niche = getNicheBySlug("plumbing")!;

export const metadata: Metadata = {
  title: niche.meta_title,
  description: niche.meta_description,
};

export default function PlumbingLeadEnginePage() {
  return <NicheServicePage niche={niche} />;
}
