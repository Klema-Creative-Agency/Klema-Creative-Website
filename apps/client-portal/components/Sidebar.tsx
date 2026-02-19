"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { TierPortalFeatures } from "@klema/shared";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  featureKey?: keyof TierPortalFeatures;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <GridIcon />,
    featureKey: "dashboard",
  },
  {
    label: "Messages",
    href: "/messages",
    icon: <MsgIcon />,
    featureKey: "messaging",
  },
  {
    label: "Content",
    href: "/content",
    icon: <FileIcon />,
    featureKey: "contentCalendar",
  },
  {
    label: "Reports",
    href: "/reports",
    icon: <ChartIcon />,
    featureKey: "reports",
  },
  {
    label: "Leads",
    href: "/leads",
    icon: <UsersIcon />,
    featureKey: "leadDashboard",
  },
  {
    label: "LLM Visibility",
    href: "/llm-visibility",
    icon: <EyeIcon />,
    featureKey: "llmVisibility",
  },
  {
    label: "Schedule",
    href: "/schedule",
    icon: <CalIcon />,
    featureKey: "scheduling",
  },
];

export function Sidebar({
  features,
  clientName,
  tierName,
}: {
  features: TierPortalFeatures;
  clientName: string;
  tierName: string;
}) {
  const pathname = usePathname();

  const visibleItems = navItems.filter(
    (item) => !item.featureKey || features[item.featureKey],
  );

  return (
    <aside className="fixed left-0 top-0 h-screen w-[240px] bg-sidebar border-r border-border flex flex-col">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-accent" />
          <span className="text-[16px] font-semibold tracking-[-0.02em] text-text">
            klema creative
          </span>
        </div>
      </div>

      {/* Client info */}
      <div className="px-5 py-4 border-b border-border">
        <p className="text-[13px] font-medium text-text truncate">{clientName}</p>
        <p className="text-[11px] text-text-dim mt-0.5">{tierName}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {visibleItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] transition-colors ${
                isActive
                  ? "bg-sidebar-active text-accent font-medium"
                  : "text-text-dim hover:text-text hover:bg-sidebar-hover"
              }`}
            >
              <span className={isActive ? "text-accent" : "text-text-dim"}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-5 py-4 border-t border-border">
        <p className="text-[11px] text-text-muted">Klema Creative Portal</p>
      </div>
    </aside>
  );
}

// ─── Icons (inline SVG, 18px) ────────────────────────────────────────────────

function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

function MsgIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function CalIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
