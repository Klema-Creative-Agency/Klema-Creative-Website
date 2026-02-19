export function Stat({
  label,
  value,
  change,
  changeLabel,
}: {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
}) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <p className="text-[12px] font-medium text-text-dim uppercase tracking-wider mb-2">
        {label}
      </p>
      <p className="text-[28px] font-bold text-text leading-none mb-1">{value}</p>
      {change !== undefined && (
        <p
          className={`text-[12px] font-medium ${
            isPositive ? "text-accent" : isNegative ? "text-danger" : "text-text-dim"
          }`}
        >
          {isPositive ? "+" : ""}
          {change}%{changeLabel ? ` ${changeLabel}` : ""}
        </p>
      )}
    </div>
  );
}
