import { SelectHTMLAttributes } from "react";

export function Select({
  label,
  options,
  className = "",
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      {label && (
        <label className="block text-[13px] font-medium text-text-dim mb-2">
          {label}
        </label>
      )}
      <select
        className={`w-full h-10 px-3 rounded-lg bg-card border border-border text-text text-[14px] outline-none focus:border-accent/40 transition-colors ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
