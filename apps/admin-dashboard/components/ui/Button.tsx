import { ButtonHTMLAttributes } from "react";

const variants = {
  primary:
    "bg-accent text-bg hover:bg-accent-hover font-semibold",
  secondary:
    "bg-card border border-border text-text hover:bg-card-hover",
  ghost:
    "text-text-dim hover:text-text hover:bg-sidebar-hover",
  danger:
    "bg-danger-dim text-danger hover:bg-danger/20",
};

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 px-4 h-10 rounded-lg text-[14px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
