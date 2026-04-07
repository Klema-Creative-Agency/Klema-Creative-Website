const trades = [
  "HVAC", "Plumbing", "Roofing", "Electrical", "Landscaping",
  "Pest Control", "General Contracting", "Garage Doors", "Gutters", "Windows & Doors",
];

export default function NicheBar() {
  return (
    <div className="py-3.5 overflow-hidden" style={{ background: "oklch(0.22 0.07 145)" }}>
      <div className="flex items-center w-max animate-marquee">
        {[...trades, ...trades, ...trades].map((trade, i) => (
          <div key={i} className="flex items-center gap-4 px-7">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--brand-lime)]" />
            <span className="text-white/50 text-[0.8125rem] uppercase tracking-[0.08em] whitespace-nowrap font-body font-semibold">
              {trade}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
