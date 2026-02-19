import { InputHTMLAttributes } from "react";

export function Input({
  label,
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <div>
      {label && (
        <label className="block text-[13px] font-medium text-text-dim mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full h-10 px-3 rounded-lg bg-card border border-border text-text text-[14px] outline-none focus:border-accent/40 transition-colors placeholder:text-text-muted ${className}`}
        {...props}
      />
    </div>
  );
}

export function Textarea({
  label,
  className = "",
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }) {
  return (
    <div>
      {label && (
        <label className="block text-[13px] font-medium text-text-dim mb-2">
          {label}
        </label>
      )}
      <textarea
        className={`w-full px-3 py-2.5 rounded-lg bg-card border border-border text-text text-[14px] outline-none focus:border-accent/40 transition-colors placeholder:text-text-muted resize-none ${className}`}
        {...props}
      />
    </div>
  );
}
