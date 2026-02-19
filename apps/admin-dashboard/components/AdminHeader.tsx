"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

export function AdminHeader({ userName }: { userName: string }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="h-[60px] border-b border-border bg-bg/80 backdrop-blur-sm flex items-center justify-between px-6">
      <div />

      <div className="flex items-center gap-4">
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
            <span className="text-[13px] text-text-dim">{userName}</span>
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
