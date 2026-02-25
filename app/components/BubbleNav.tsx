"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import "./BubbleNav.css";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/services/ai-lead-engine", label: "Lead Engine", badge: true },
  { href: "/packages", label: "Packages" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const LEAD_ENGINE_NICHES = [
  { href: "/services/ai-lead-engine", label: "All Industries" },
  { href: "/services/ai-lead-engine/roofing", label: "Roofing" },
  { href: "/services/ai-lead-engine/tree-removal", label: "Tree Removal" },
  { href: "/services/ai-lead-engine/hvac", label: "HVAC" },
  { href: "/services/ai-lead-engine/plumbing", label: "Plumbing" },
  { href: "/services/ai-lead-engine/dental", label: "Dental" },
];

export default function BubbleNav({ collapsed = false }: { collapsed?: boolean }) {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const activeBubbleRef = useRef<HTMLDivElement>(null);
  const hoverBubbleRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // ── Move a bubble to match a link's position ──
  const moveBubble = useCallback(
    (linkEl: HTMLElement, bubble: HTMLDivElement) => {
      const nav = navRef.current;
      if (!nav) return;
      const navRect = nav.getBoundingClientRect();
      const linkRect = linkEl.getBoundingClientRect();
      bubble.style.setProperty("--left", `${linkRect.left - navRect.left}px`);
      bubble.style.setProperty("--width", `${linkRect.width}px`);
    },
    []
  );

  // ── Position the active bubble whenever the route changes ──
  useEffect(() => {
    const nav = navRef.current;
    const bubble = activeBubbleRef.current;
    if (!nav || !bubble) return;

    const activeLink = nav.querySelector<HTMLAnchorElement>("a.active");
    if (activeLink) {
      // Disable transition for the very first paint so it doesn't slide in from 0,0
      bubble.style.transition = "none";
      moveBubble(activeLink, bubble);
      // Force reflow, then re-enable transitions
      bubble.getBoundingClientRect();
      bubble.style.transition = "";
    }
  }, [pathname, moveBubble]);

  // ── Re-measure on resize so the bubbles don't drift ──
  useEffect(() => {
    const nav = navRef.current;
    const bubble = activeBubbleRef.current;
    if (!nav || !bubble) return;

    const observer = new ResizeObserver(() => {
      const activeLink = nav.querySelector<HTMLAnchorElement>("a.active");
      if (activeLink) moveBubble(activeLink, bubble);
    });
    observer.observe(nav);
    return () => observer.disconnect();
  }, [moveBubble]);

  // ── Cleanup dropdown timeout on unmount ──
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  // ── Hover handlers ──
  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const bubble = hoverBubbleRef.current;
    if (bubble) moveBubble(e.currentTarget, bubble);
  };

  const handleMouseLeave = () => {
    // The CSS rule `.nav-wrap:hover .bubble.hover { opacity: 1 }` handles
    // fade-in / fade-out automatically — nothing extra needed here.
  };

  // ── Dropdown hover handlers (with delay to prevent flicker) ──
  const openDropdown = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setDropdownOpen(true);
  };

  const closeDropdown = () => {
    dropdownTimeoutRef.current = setTimeout(() => setDropdownOpen(false), 200);
  };

  return (
    <div className={`bubble-nav-wrap ${collapsed ? "collapsed" : ""}`}>
      {/* The two sliding pill indicators */}
      <div ref={activeBubbleRef} className="bubble active" />
      <div ref={hoverBubbleRef} className="bubble hover" />

      {/* The actual links */}
      <nav ref={navRef} className="bubble-nav">
        {/* Inner logo — visible when collapsed */}
        <Link href="/" className="bubble-nav-inner-logo">
          <span className="logo-dot" />
          klema creative
        </Link>

        {NAV_ITEMS.map(({ href, label, badge }) => {
          const isActive =
            href === "/"
              ? pathname === "/"
              : href === "/services"
                ? pathname === "/services"
                : pathname.startsWith(href);

          if (badge) {
            return (
              <div
                key={href}
                className="lead-engine-dropdown-wrap"
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
              >
                <Link
                  href={href}
                  className={`${isActive ? "active" : ""} lead-engine-link`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {label}
                </Link>
                <div className={`lead-engine-dropdown ${dropdownOpen ? "open" : ""}`}>
                  {LEAD_ENGINE_NICHES.map((niche) => (
                    <Link
                      key={niche.href}
                      href={niche.href}
                      className={`lead-engine-dropdown-item ${pathname === niche.href ? "active" : ""}`}
                    >
                      {niche.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <Link
              key={href}
              href={href}
              className={isActive ? "active" : ""}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
