"use client";

import RevealOnScroll from "@/app/components/RevealOnScroll";

interface CompetitorCell {
  icon: "check" | "x" | "dash";
  text: string;
}

interface ComparisonRow {
  category: string;
  aiLeadEngine: CompetitorCell;
  diySaas: CompetitorCell;
  googleAds: CompetitorCell;
  homeAdvisor: CompetitorCell;
}

const rows: ComparisonRow[] = [
  {
    category: "Lead exclusivity",
    aiLeadEngine: { icon: "check", text: "100% exclusive" },
    diySaas: { icon: "check", text: "Depends on you" },
    googleAds: { icon: "check", text: "Exclusive" },
    homeAdvisor: { icon: "x", text: "Shared 3-5x" },
  },
  {
    category: "Setup time",
    aiLeadEngine: { icon: "check", text: "10 days, we do all" },
    diySaas: { icon: "x", text: "Weeks of DIY" },
    googleAds: { icon: "x", text: "Weeks of campaigns" },
    homeAdvisor: { icon: "check", text: "Instant but no system" },
  },
  {
    category: "Monthly cost",
    aiLeadEngine: { icon: "dash", text: "$997/mo all-in" },
    diySaas: { icon: "check", text: "$63-$401 + your time" },
    googleAds: { icon: "x", text: "$2K-$10K+ ad spend" },
    homeAdvisor: { icon: "dash", text: "$50-$200/lead" },
  },
  {
    category: "Call trigger speed",
    aiLeadEngine: { icon: "check", text: "60 seconds" },
    diySaas: { icon: "x", text: "Not included" },
    googleAds: { icon: "x", text: "Not included" },
    homeAdvisor: { icon: "x", text: "Not included" },
  },
  {
    category: "Follow-up automation",
    aiLeadEngine: { icon: "check", text: "SMS + email auto" },
    diySaas: { icon: "dash", text: "Basic, you build it" },
    googleAds: { icon: "x", text: "None" },
    homeAdvisor: { icon: "x", text: "None" },
  },
  {
    category: "Mobile optimization",
    aiLeadEngine: { icon: "check", text: "Built mobile-first" },
    diySaas: { icon: "check", text: "Templates available" },
    googleAds: { icon: "dash", text: "Depends on LP" },
    homeAdvisor: { icon: "dash", text: "Their app" },
  },
  {
    category: "Ongoing optimization",
    aiLeadEngine: { icon: "check", text: "Monthly by our team" },
    diySaas: { icon: "x", text: "You do it" },
    googleAds: { icon: "x", text: "You manage" },
    homeAdvisor: { icon: "x", text: "No optimization" },
  },
  {
    category: "System ownership",
    aiLeadEngine: { icon: "check", text: "You keep everything" },
    diySaas: { icon: "x", text: "Locked to platform" },
    googleAds: { icon: "x", text: "Nothing to keep" },
    homeAdvisor: { icon: "x", text: "No system" },
  },
];

const columnHeaders = [
  { label: "AI Lead Engine", highlight: true },
  { label: "Perspective / ClickFunnels", highlight: false },
  { label: "Google Ads Alone", highlight: false },
  { label: "HomeAdvisor / Angi", highlight: false },
];

function CellIcon({ icon }: { icon: "check" | "x" | "dash" }) {
  if (icon === "check") return <span className="text-accent font-bold">&#10003;</span>;
  if (icon === "x") return <span className="text-red font-bold">&#10007;</span>;
  return <span className="text-amber font-bold">&mdash;</span>;
}

function CellValue({ cell }: { cell: CompetitorCell }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <CellIcon icon={cell.icon} />
      <span className="text-text-mid text-[13px]">{cell.text}</span>
    </span>
  );
}

export default function LeadEngineComparison() {
  return (
    <section className="border-t border-border py-30 max-md:py-20">
      <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
        <RevealOnScroll>
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
            How we compare
          </p>
          <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
            Not all lead gen is created equal.
          </h2>
          <p className="text-[17px] text-text-dim leading-[1.7] max-w-[540px] mb-16">
            See how the AI Lead Engine stacks up against the alternatives you&apos;re probably already paying for.
          </p>
        </RevealOnScroll>

        {/* Desktop table */}
        <RevealOnScroll>
          <div className="hidden md:block overflow-x-auto">
            <table className="comparison-table w-full border-collapse text-sm min-w-[700px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-5 py-4 text-text-dim font-semibold text-[13px]">
                    Category
                  </th>
                  {columnHeaders.map((col, i) => (
                    <th
                      key={i}
                      className={`text-center px-5 py-4 font-bold text-[13px] ${
                        col.highlight ? "text-accent" : "text-text-dim"
                      }`}
                      style={
                        col.highlight
                          ? { background: "rgba(74,222,128,0.06)" }
                          : undefined
                      }
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-b border-border">
                    <td className="px-5 py-3.5 text-text-mid font-medium">
                      {row.category}
                    </td>
                    <td
                      className="px-5 py-3.5 text-center"
                      style={{ background: "rgba(74,222,128,0.06)" }}
                    >
                      <CellValue cell={row.aiLeadEngine} />
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <CellValue cell={row.diySaas} />
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <CellValue cell={row.googleAds} />
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <CellValue cell={row.homeAdvisor} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </RevealOnScroll>

        {/* Mobile cards */}
        <div className="md:hidden flex flex-col gap-4">
          {rows.map((row, i) => (
            <RevealOnScroll key={i}>
              <div className="bg-surface border border-border rounded-2xl p-5">
                <h3 className="text-[15px] font-bold text-text mb-4">
                  {row.category}
                </h3>
                <div className="flex flex-col gap-3">
                  {[
                    { label: "AI Lead Engine", cell: row.aiLeadEngine, highlight: true },
                    { label: "DIY SaaS", cell: row.diySaas, highlight: false },
                    { label: "Google Ads", cell: row.googleAds, highlight: false },
                    { label: "HomeAdvisor", cell: row.homeAdvisor, highlight: false },
                  ].map((item, j) => (
                    <div
                      key={j}
                      className={`flex items-center justify-between py-2 px-3 rounded-lg ${
                        item.highlight
                          ? "bg-accent-dim border border-accent-border-light"
                          : "bg-white-6"
                      }`}
                    >
                      <span
                        className={`text-[12px] font-semibold ${
                          item.highlight ? "text-accent" : "text-text-dim"
                        }`}
                      >
                        {item.label}
                      </span>
                      <CellValue cell={item.cell} />
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
