"use client";

const features: [string, ...string[]][] = [
  ["Lead Conversion Funnel", "\u2713", "\u2713", "\u2713", "\u2713", "\u2713"],
  ["60-Second Call Trigger", "\u2713", "\u2713", "\u2713", "\u2713", "\u2713"],
  ["Automated SMS & Email", "\u2713", "\u2713", "\u2713", "\u2713", "\u2713"],
  ["CRM & Lead Pipeline", "\u2713", "\u2713", "\u2713", "\u2713", "\u2713"],
  ["Monthly Funnel Optimization", "\u2713", "\u2713", "\u2713", "\u2713", "\u2713"],
  ["SEO & Local Rankings", "\u2014", "\u2713", "\u2713", "\u2713", "\u2713"],
  ["Google Business Profile", "\u2014", "\u2713", "\u2713", "\u2713", "\u2713"],
  ["Reputation Engine", "\u2014", "\u2713", "\u2713", "\u2713", "\u2713"],
  ["Custom Website", "\u2014", "\u2014", "\u2713", "\u2713", "\u2713"],
  ["Paid Ad Management", "\u2014", "\u2014", "\u2713", "\u2713", "\u2713"],
  ["Branded Dashboard", "\u2014", "\u2014", "\u2713", "\u2713", "\u2713"],
  ["Blog Articles / Month", "\u2014", "\u2014", "\u2014", "4\u20136", "6\u20138"],
  ["Social Media", "\u2014", "\u2014", "\u2014", "2 Platforms", "3 Platforms"],
  ["Email Campaigns", "\u2014", "\u2014", "\u2014", "\u2713", "\u2713"],
  ["Competitor Monitoring", "\u2014", "\u2014", "\u2014", "\u2713", "\u2713"],
  ["A/B Testing", "\u2014", "\u2014", "\u2014", "\u2713", "\u2713"],
  ["Dedicated Lead Team", "\u2014", "\u2014", "\u2014", "\u2014", "\u2713"],
  ["Lead Qualification Calls", "\u2014", "\u2014", "\u2014", "\u2014", "\u2713"],
  ["Live Hot Transfers", "\u2014", "\u2014", "\u2014", "\u2014", "\u2713"],
  ["Appointment Setting", "\u2014", "\u2014", "\u2014", "\u2014", "\u2713"],
  ["Strategy Calls", "Monthly", "Monthly", "Monthly", "Bi-weekly", "Weekly"],
  ["Business Reviews", "\u2014", "\u2014", "\u2014", "Quarterly", "Quarterly"],
];

const HEADERS = [
  { name: "Ignition", price: "$997" },
  { name: "Foundation", price: "$1,997" },
  { name: "Accelerator", price: "$3,997" },
  { name: "Authority", price: "$7,500" },
  { name: "Dominator", price: "$12,000" },
];

const HIGHLIGHT_COL = 2; // Accelerator (0-indexed)

function renderValue(val: string) {
  if (val === "\u2713")
    return <span className="text-accent font-bold">{val}</span>;
  if (val === "\u2014")
    return <span className="text-white-15">{val}</span>;
  return <span className="text-text-mid text-[12px]">{val}</span>;
}

export default function ComparisonTable() {
  return (
    <div className="mt-12 overflow-x-auto">
      <table className="comparison-table w-full border-collapse text-sm min-w-[800px]">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left px-4 py-4 text-text-dim font-semibold text-[13px] w-[200px]">
              Feature
            </th>
            {HEADERS.map((h, i) => (
              <th
                key={i}
                className={`text-center px-3 py-4 font-bold text-[12px] ${
                  i === HIGHLIGHT_COL ? "text-accent" : "text-text"
                }`}
                style={
                  i === HIGHLIGHT_COL
                    ? { background: "rgba(74,222,128,0.05)" }
                    : undefined
                }
              >
                {h.name}
                <br />
                <span className="text-text-dim font-medium text-[11px]">{h.price}/mo</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((row, i) => (
            <tr key={i} className="border-b border-border">
              <td className="px-4 py-3 text-text-mid text-[13px]">{row[0]}</td>
              {[1, 2, 3, 4, 5].map((colIdx) => (
                <td
                  key={colIdx}
                  className="px-3 py-3 text-center text-[13px]"
                  style={
                    colIdx - 1 === HIGHLIGHT_COL
                      ? { background: "rgba(74,222,128,0.05)" }
                      : undefined
                  }
                >
                  {renderValue(row[colIdx])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
