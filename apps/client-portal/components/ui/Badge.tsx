const variants: Record<string, string> = {
  default: "bg-border text-text-dim",
  accent: "bg-accent-dim text-accent",
  danger: "bg-danger-dim text-danger",
  warning: "bg-warning-dim text-warning",
  info: "bg-info-dim text-info",
  // Content statuses
  brief: "bg-border text-text-dim",
  ai_draft: "bg-info-dim text-info",
  team_review: "bg-warning-dim text-warning",
  client_review: "bg-warning-dim text-warning",
  revision: "bg-danger-dim text-danger",
  approved: "bg-accent-dim text-accent",
  published: "bg-accent-dim text-accent",
  // Lead statuses
  new: "bg-info-dim text-info",
  contacted: "bg-warning-dim text-warning",
  qualified: "bg-accent-dim text-accent",
  appointment_set: "bg-accent-dim text-accent",
  converted: "bg-accent-dim text-accent",
  lost: "bg-danger-dim text-danger",
  dormant: "bg-border text-text-dim",
};

export function Badge({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: string;
}) {
  const classes = variants[variant] ?? variants.default;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium capitalize ${classes}`}
    >
      {children}
    </span>
  );
}
