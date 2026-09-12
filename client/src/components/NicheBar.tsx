const trades = [
  "HVAC", "Plumbing", "Roofing", "Electrical", "Landscaping",
  "Pest Control", "General Contracting", "Garage Doors", "Gutters", "Windows & Doors",
];

export default function NicheBar() {
  return (
    <div className="py-3.5 overflow-hidden bg-[var(--brand-gold)]">
      <div className="flex items-center w-max animate-marquee">
        {[...trades, ...trades, ...trades].map((trade, i) => (
          <div key={i} className="flex items-center gap-4 px-7">
            <div
              className="w-2 h-3 bg-[var(--brand-charcoal)]"
              style={{ transform: "skewX(-24deg)" }}
            />
            <span className="text-[var(--brand-charcoal)] text-[0.8125rem] uppercase tracking-[0.08em] whitespace-nowrap font-display font-extrabold">
              {trade}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
