import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { proposals, getProposalBySlug } from "@/app/data/proposals";
import ProposalPageClient from "./ProposalPageClient";

export function generateStaticParams() {
  return proposals.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const proposal = getProposalBySlug(slug);
  if (!proposal) return {};
  return {
    title: proposal.metaTitle,
    description: proposal.metaDescription,
    robots: { index: false, follow: false },
  };
}

export default async function ProposalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const proposal = getProposalBySlug(slug);
  if (!proposal) notFound();
  return <ProposalPageClient proposal={proposal} />;
}
