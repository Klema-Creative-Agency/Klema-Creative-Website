"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminSidebar() {
  const pathname = usePathname();

  // Extract client ID from path like /clients/abc-123/content
  const clientMatch = pathname.match(/^\/clients\/([^/]+)/);
  const clientId = clientMatch?.[1];
  const isClientSubpage = clientId && clientId !== "new";

  return (
    <aside className="fixed left-0 top-0 h-screen w-[240px] bg-sidebar border-r border-border flex flex-col">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-border">
        <Link href="/clients" className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-accent" />
          <span className="text-[16px] font-semibold tracking-[-0.02em] text-text">
            klema creative
          </span>
        </Link>
      </div>

      {/* Dashboard label */}
      <div className="px-5 py-4 border-b border-border">
        <p className="text-[13px] font-medium text-text">Admin Dashboard</p>
        <p className="text-[11px] text-text-dim mt-0.5">Internal Team</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <Link
          href="/clients"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] transition-colors ${
            pathname === "/clients"
              ? "bg-sidebar-active text-accent font-medium"
              : "text-text-dim hover:text-text hover:bg-sidebar-hover"
          }`}
        >
          <span className={pathname === "/clients" ? "text-accent" : "text-text-dim"}>
            <UsersIcon />
          </span>
          All Clients
        </Link>

        {/* SEO Tools */}
        <div className="pt-3 pb-1 px-3">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider">
            SEO Tools
          </p>
        </div>

        {seoNavItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] transition-colors ${
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

        {isClientSubpage && (
          <>
            <div className="pt-3 pb-1 px-3">
              <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider">
                Client
              </p>
            </div>

            {clientNavItems.map((item) => {
              const href = `/clients/${clientId}${item.path}`;
              const isActive =
                item.path === ""
                  ? pathname === `/clients/${clientId}`
                  : pathname.startsWith(href);
              return (
                <Link
                  key={item.path}
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] transition-colors ${
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
          </>
        )}
      </nav>

      {/* Bottom */}
      <div className="px-5 py-4 border-t border-border">
        <p className="text-[11px] text-text-muted">Klema Creative Admin</p>
      </div>
    </aside>
  );
}

const seoNavItems = [
  { label: "Quick Audit", href: "/seo/quick", icon: <ScanIcon /> },
  { label: "Audit History", href: "/seo/history", icon: <HistoryIcon /> },
  { label: "Batch Audits", href: "/seo/batch", icon: <LayersIcon /> },
];

const clientNavItems = [
  { label: "Overview", path: "", icon: <GridIcon /> },
  { label: "Content", path: "/content", icon: <FileIcon /> },
  { label: "Tasks", path: "/tasks", icon: <CheckIcon /> },
  { label: "Leads", path: "/leads", icon: <LeadIcon /> },
  { label: "Reports", path: "/reports", icon: <ChartIcon /> },
  { label: "Keywords", path: "/keywords", icon: <SearchIcon /> },
  { label: "SEO Audits", path: "/seo", icon: <ScanIcon /> },
  { label: "Onboarding", path: "/onboarding", icon: <ListIcon /> },
];

// ─── Icons ──────────────────────────────────────────────────────────────────

function UsersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function LeadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}

function ScanIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7V5a2 2 0 012-2h2" /><path d="M17 3h2a2 2 0 012 2v2" /><path d="M21 17v2a2 2 0 01-2 2h-2" /><path d="M7 21H5a2 2 0 01-2-2v-2" /><line x1="7" y1="12" x2="17" y2="12" />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
    </svg>
  );
}
