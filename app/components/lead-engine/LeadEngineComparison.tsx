"use client";

import RevealOnScroll from "@/app/components/RevealOnScroll";

interface CompetitorCell {
  icon: "check" | "x" | "dash";
  text: string;
}

interface ComparisonRow {
  category: string;
  leadFunnel: CompetitorCell;
  diyGhl: CompetitorCell;
  agency: CompetitorCell;
  doNothing: CompetitorCell;
}

const rows: ComparisonRow[] = [
  {
    category: "Setup effort",
    leadFunnel: { icon: "check", text: "Done for you in 10 days" },
    diyGhl: { icon: "x", text: "Weeks of learning" },
    agency: { icon: "dash", text: "Weeks + discovery" },
    doNothing: { icon: "x", text: "N/A" },
  },
  {
    category: "Follow-up speed",
    leadFunnel: { icon: "check", text: "60-second auto call" },
    diyGhl: { icon: "x", text: "Manual" },
    agency: { icon: "dash", text: "Depends" },
    doNothing: { icon: "x", text: "Whenever you remember" },
  },
  {
    category: "SMS / Email automation",
    leadFunnel: { icon: "check", text: "Pre-built sequences" },
    diyGhl: { icon: "dash", text: "You build it" },
    agency: { icon: "dash", text: "Extra cost" },
    doNothing: { icon: "x", text: "None" },
  },
  {
    category: "Monthly cost",
    leadFunnel: { icon: "dash", text: "$997/mo all-in" },
    diyGhl: { icon: "check", text: "$97–$497 + your time" },
    agency: { icon: "x", text: "$2K–$5K/mo retainer" },
    doNothing: { icon: "check", text: "$0 (but lost revenue)" },
  },
  {
    category: "Funnel included",
    leadFunnel: { icon: "check", text: "Custom quiz funnel" },
    diyGhl: { icon: "dash", text: "Templates" },
    agency: { icon: "dash", text: "Usually extra" },
    doNothing: { icon: "x", text: "No" },
  },
  {
    category: "System ownership",
    leadFunnel: { icon: "check", text: "You keep everything" },
    diyGhl: { icon: "x", text: "Locked to platform" },
    agency: { icon: "x", text: "They own it" },
    doNothing: { icon: "x", text: "N/A" },
  },
  {
    category: "Ongoing optimization",
    leadFunnel: { icon: "check", text: "Monthly by our team" },
    diyGhl: { icon: "x", text: "You do it" },
    agency: { icon: "check", text: "Included (usually)" },
    doNothing: { icon: "x", text: "None" },
  },
];

const columnHeaders = [
  { label: "Lead Funnel System", highlight: true },
  { label: "DIY GoHighLevel", highlight: false },
  { label: "Hire a Marketing Agency", highlight: false },
  { label: "Do Nothing", highlight: false },
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
    <section className="py-30 max-md:py-20">
      <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
        <RevealOnScroll>
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
            How we compare
          </p>
          <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
            Not all lead systems are created equal.
          </h2>
          <p className="text-[17px] text-text-dim leading-[1.7] max-w-[540px] mb-16">
            See how a done-for-you lead funnel stacks up against the alternatives.
          </p>
        </RevealOnScroll>

        {/* Desktop table */}
        <RevealOnScroll>
          <div className="hidden md:block overflow-x-auto">
            <table className="comparison-table w-full border-collapse text-sm min-w-[700px]">
              <thead>
                <tr className="border-b border-white-6">
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
                      <CellValue cell={row.leadFunnel} />
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <CellValue cell={row.diyGhl} />
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <CellValue cell={row.agency} />
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <CellValue cell={row.doNothing} />
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
                    { label: "Lead Funnel System", cell: row.leadFunnel, highlight: true },
                    { label: "DIY GoHighLevel", cell: row.diyGhl, highlight: false },
                    { label: "Marketing Agency", cell: row.agency, highlight: false },
                    { label: "Do Nothing", cell: row.doNothing, highlight: false },
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
