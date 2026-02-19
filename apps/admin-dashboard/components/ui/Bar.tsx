export function Bar({
  value,
  max,
  label,
  showCount = true,
}: {
  value: number;
  max: number;
  label: string;
  showCount?: boolean;
}) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[13px] text-text-dim">{label}</span>
        {showCount && (
          <span className="text-[13px] font-medium text-text">
            {value}/{max}
          </span>
        )}
      </div>
      <div className="h-2 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
