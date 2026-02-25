"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { NicheData } from "@/app/data/niches";
import ApplicationForm from "./ApplicationForm";

const PROOF_POINTS = [
  "60-second call trigger — your phone rings the moment a lead submits",
  "Exclusive leads — no shared leads, no bidding wars",
  "Full system ownership — you keep everything, even if you cancel",
  "Month-to-month — no contracts, no lock-in, cancel anytime",
];

/** VSL landing page — minimal nav, urgency bar, video embed, application form */
export default function VSLPage({ niche }: { niche: NicheData }) {
  // Hide the global Navbar and Footer on VSL pages
  useEffect(() => {
    document.body.classList.add("vsl-page");
    return () => document.body.classList.remove("vsl-page");
  }, []);

  return (
    <div className="min-h-screen bg-bg">
      {/* URGENCY TOP BAR */}
      <div className="bg-accent text-black text-center py-2.5 px-4 text-[13px] font-bold tracking-[0.02em]">
        Only 3 spots available this month for {niche.service_name.toLowerCase().includes("patient") ? "dental practices" : `${niche.url_slug.replace("-", " ")} companies`}
      </div>

      {/* MINIMAL NAV */}
      <nav className="py-5 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
          <Link
            href="/"
            className="text-[22px] font-bold text-text no-underline tracking-[-0.4px] flex items-center gap-2.5"
          >
            <span className="logo-dot" />
            klema creative
          </Link>
        </div>
      </nav>

      {/* HERO + VIDEO */}
      <section className="pt-20 pb-16 max-md:pt-14 max-md:pb-10">
        <div className="max-w-[800px] mx-auto px-8 max-md:px-5 text-center">
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
            {niche.service_name}
          </p>
          <h1 className="text-[clamp(28px,4.5vw,48px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-5">
            {niche.headline}
          </h1>
          <p className="text-[17px] text-text-dim leading-[1.7] max-w-[560px] mx-auto mb-10">
            Watch the 6-minute demo to see exactly how the system works — from first click to booked appointment.
          </p>

          {/* VIDEO CONTAINER — Replace src with Loom/YouTube embed URL */}
          <div className="relative w-full aspect-video rounded-[20px] overflow-hidden border border-border bg-surface mb-6">
            {/* TODO: Replace this placeholder with your Loom or YouTube embed */}
            {/* Example: <iframe src="https://www.loom.com/embed/YOUR_VIDEO_ID" ... /> */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 rounded-full bg-accent/20 border border-accent-border flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-accent ml-1">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <p className="text-sm text-text-dim">
                Video demo coming soon
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF STRIP */}
      <section className="border-t border-border py-12 max-md:py-8">
        <div className="max-w-[700px] mx-auto px-8 max-md:px-5">
          <div className="flex flex-col gap-4">
            {PROOF_POINTS.map((point, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-accent-dim border border-accent-border flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-accent">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-[14px] text-text-mid leading-[1.6]">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <ApplicationForm
        niche={niche.url_slug}
        serviceName={niche.service_name}
        source="vsl-page"
      />

      {/* MINIMAL FOOTER */}
      <footer className="border-t border-border py-8">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 text-center">
          <p className="text-[12px] text-text-dim">
            &copy; {new Date().getFullYear()} Klema Creative. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
