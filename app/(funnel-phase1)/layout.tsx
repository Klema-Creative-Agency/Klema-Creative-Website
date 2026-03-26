import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Call | Klema Creative",
  description:
    "See where AI can save you the most time. Free, no-obligation strategy call.",
  robots: { index: false, follow: false },
};

export default function FunnelPhase1Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Hide the root layout's Navbar only, keep footer */}
      <style>{`
        nav, footer, .scroll-to-top { display: none !important; }
        iframe { touch-action: auto !important; pointer-events: auto !important; }
      `}</style>

      {/* Logo only — not clickable */}
      <div className="fixed top-0 left-0 right-0 z-50 px-5 py-4 bg-bg">
        <span className="inline-flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
          <span className="text-white font-bold text-lg tracking-tight">
            klema creative
          </span>
        </span>
      </div>

      <div className="relative min-h-screen bg-bg">
        <div className="funnel-gradient-mesh" />
        <div className="funnel-spotlight" />
        <div className="funnel-dot-grid" />
        <div className="funnel-noise-overlay" />
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </>
  );
}
