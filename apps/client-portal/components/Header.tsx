"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

export function Header({
  userName,
  unreadCount,
}: {
  userName: string;
  unreadCount: number;
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="h-[60px] border-b border-border bg-bg/80 backdrop-blur-sm flex items-center justify-between px-6">
      <div />

      <div className="flex items-center gap-4">
        {/* Notification bell */}
        <button className="relative p-2 rounded-lg hover:bg-sidebar-hover transition-colors">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-text-dim"
          >
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-bg text-[10px] font-bold rounded-full flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {/* User avatar */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-sidebar-hover transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-accent-dim flex items-center justify-center">
              <span className="text-[13px] font-semibold text-accent">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-[13px] text-text-dim hidden sm:block">{userName}</span>
          </button>

          {showMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-xl py-2 shadow-lg z-50">
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="w-full text-left px-4 py-2 text-[13px] text-text-dim hover:text-text hover:bg-sidebar-hover transition-colors"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
