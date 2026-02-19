"use client";

const features = [
  ["Website", "WordPress", "Next.js", "Fully Custom Next.js"],
  ["Blog Articles / Month", "2", "4", "6\u20138"],
  ["SEO & AEO", "\u2713", "Advanced + Competitor Analysis", "Advanced + Backlink Building"],
  ["Social Media", "1 Platform", "1 Platform", "Multi-Platform"],
  ["CRM & Lead Capture", "\u2713", "\u2713", "\u2713"],
  ["Lead Nurturing", "\u2014", "20 hrs/month", "80+ hrs/month"],
  ["Lead Response Time", "\u2014", "Within 24 hours", "Within 5 minutes"],
  ["Live Hot Transfers", "\u2014", "\u2014", "\u2713"],
  ["Reputation Management", "\u2014", "\u2713", "\u2713"],
  ["Email Nurture Sequences", "\u2014", "\u2713", "\u2713"],
  ["Strategy Calls", "Monthly", "Bi-weekly", "Weekly"],
  ["Dedicated Account Manager", "\u2014", "\u2014", "\u2713"],
  ["Quarterly Business Reviews", "\u2014", "\u2014", "\u2713"],
];

function renderValue(val: string) {
  if (val === "\u2713")
    return <span className="text-accent">{val}</span>;
  if (val === "\u2014")
    return <span className="text-white-15">{val}</span>;
  return <span className="text-text-mid">{val}</span>;
}

export default function ComparisonTable() {
  return (
    <div className="mt-12 overflow-x-auto">
      <table className="comparison-table w-full border-collapse text-sm min-w-[600px]">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left px-5 py-4 text-text-dim font-semibold text-[13px]">
              Feature
            </th>
            <th className="text-center px-5 py-4 font-bold text-[13px]">
              Foundation
              <br />
              <span className="text-text-dim font-medium">$3,500/mo</span>
            </th>
            <th className="text-center px-5 py-4 font-bold text-[13px] text-accent">
              Accelerator
              <br />
              <span className="text-text-dim font-medium">$8,000/mo</span>
            </th>
            <th className="text-center px-5 py-4 font-bold text-[13px]">
              Dominator
              <br />
              <span className="text-text-dim font-medium">$10,000/mo</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {features.map((row, i) => (
            <tr key={i} className="border-b border-border">
              <td className="px-5 py-3.5 text-text-mid">{row[0]}</td>
              <td className="px-5 py-3.5 text-center">{renderValue(row[1])}</td>
              <td className="px-5 py-3.5 text-center">{renderValue(row[2])}</td>
              <td className="px-5 py-3.5 text-center">{renderValue(row[3])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
