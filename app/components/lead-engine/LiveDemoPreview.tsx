"use client";

import { useEffect, useRef, useState } from "react";
import RevealOnScroll from "@/app/components/RevealOnScroll";

/* ---- Panel 1: Before vs After ---- */
function BeforeAfterPanel() {
  return (
    <div className="bg-surface border border-border rounded-2xl p-6 h-full">
      <h3 className="text-[15px] font-bold text-text mb-5">Before vs. After</h3>
      <div className="flex flex-col gap-4">
        {/* Before */}
        <div className="rounded-xl border border-red/20 bg-red/[0.04] p-4">
          <p className="text-[11px] font-bold text-red/70 uppercase tracking-widest mb-3">Before</p>
          {/* Mini wireframe — cluttered contractor site */}
          <div className="space-y-2">
            <div className="h-3 w-full rounded bg-white-6" />
            <div className="h-16 w-full rounded bg-white-6" />
            <div className="flex gap-2">
              <div className="h-3 flex-1 rounded bg-white-6" />
              <div className="h-3 flex-1 rounded bg-white-6" />
            </div>
            <div className="h-3 w-3/4 rounded bg-white-6" />
            <div className="h-3 w-1/2 rounded bg-white-6" />
            <div className="h-3 w-2/3 rounded bg-white-6" />
            <div className="h-6 w-20 rounded bg-white-6 mt-2 ml-auto" />
          </div>
          <p className="text-[10px] text-text-dim mt-2">Slow, cluttered, CTA buried</p>
        </div>
        {/* After */}
        <div className="rounded-xl border border-accent-border-light bg-accent-dim p-4">
          <p className="text-[11px] font-bold text-accent/70 uppercase tracking-widest mb-3">After</p>
          {/* Mini wireframe — clean quiz funnel */}
          <div className="space-y-2">
            <div className="flex justify-center gap-1.5 mb-3">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <div className="w-2 h-2 rounded-full bg-accent/30" />
              <div className="w-2 h-2 rounded-full bg-accent/30" />
              <div className="w-2 h-2 rounded-full bg-accent/30" />
            </div>
            <div className="h-4 w-3/4 mx-auto rounded bg-accent/20" />
            <div className="space-y-2 mt-3">
              <div className="h-8 w-full rounded-lg border border-accent/20 bg-accent/[0.06]" />
              <div className="h-8 w-full rounded-lg border border-accent/20 bg-accent/[0.06]" />
              <div className="h-8 w-full rounded-lg border border-accent/20 bg-accent/[0.06]" />
            </div>
            <div className="flex items-center justify-center gap-1 mt-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-[9px] text-accent font-semibold">Loads in &lt;1.5s</span>
            </div>
          </div>
          <p className="text-[10px] text-accent/80 mt-2">Clean, mobile-first, big CTA</p>
        </div>
      </div>
    </div>
  );
}

/* ---- Panel 2: Dashboard Preview ---- */
function DashboardPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [counts, setCounts] = useState({ newLeads: 0, contacted: 0, booked: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const targets = { newLeads: 12, contacted: 8, booked: 4 };
    const duration = 1200;
    const steps = 20;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounts({
        newLeads: Math.round(targets.newLeads * progress),
        contacted: Math.round(targets.contacted * progress),
        booked: Math.round(targets.booked * progress),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [visible]);

  const leads = [
    { name: "John S.", status: "New", time: "2 min ago" },
    { name: "Sarah M.", status: "Contacted", time: "15 min ago" },
    { name: "Mike R.", status: "Booked", time: "1 hr ago" },
  ];

  return (
    <div ref={ref} className="bg-surface border border-border rounded-2xl p-6 h-full">
      <h3 className="text-[15px] font-bold text-text mb-5">Dashboard Preview</h3>
      <div className="rounded-xl border border-border bg-card p-4">
        <p className="text-[12px] font-bold text-text-dim uppercase tracking-widest mb-3">
          Lead Dashboard
        </p>
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: "New", value: counts.newLeads, color: "text-accent" },
            { label: "Contacted", value: counts.contacted, color: "text-blue" },
            { label: "Booked", value: counts.booked, color: "text-amber" },
          ].map((stat) => (
            <div key={stat.label} className="text-center py-2 rounded-lg bg-white-6">
              <div className={`text-[20px] font-black ${stat.color}`}>{stat.value}</div>
              <div className="text-[10px] text-text-dim">{stat.label}</div>
            </div>
          ))}
        </div>
        {/* Lead rows */}
        <div className="flex flex-col gap-2">
          {leads.map((lead, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-2 px-3 rounded-lg bg-white-6"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-20px)",
                transition: `all 0.5s ease ${300 + i * 200}ms`,
              }}
            >
              <span className="text-[12px] font-semibold text-text">{lead.name}</span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  lead.status === "New"
                    ? "bg-accent-dim text-accent"
                    : lead.status === "Contacted"
                    ? "bg-blue-dim text-blue"
                    : "bg-amber-dim text-amber"
                }`}
              >
                {lead.status}
              </span>
              <span className="text-[10px] text-text-dim">{lead.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- Panel 3: Phone Ring ---- */
function PhoneRingPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0); // 0=lockscreen, 1=call, 2=sms

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setPhase(1), 1000);
          setTimeout(() => setPhase(2), 2000);
          observer.unobserve(el);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="bg-surface border border-border rounded-2xl p-6 h-full flex flex-col items-center">
      <h3 className="text-[15px] font-bold text-text mb-5 self-start">Your Phone Rings</h3>
      {/* Mini phone frame */}
      <div
        className={`relative mx-auto ${phase >= 1 ? "phone-vibrate" : ""}`}
        style={{ width: 220, height: 440 }}
      >
        <div className="absolute inset-0 rounded-[30px] border-2 border-white-15 bg-[#0a0a0a] overflow-hidden">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90px] h-[22px] bg-[#0a0a0a] rounded-b-[11px] z-20" />

          {/* Lock screen */}
          <div className="absolute inset-0 flex flex-col items-center justify-start pt-14 px-4">
            <p className="text-[32px] font-thin text-text tracking-tight">9:41</p>
            <p className="text-[11px] text-text-dim mt-1">Monday, February 24</p>
          </div>

          {/* Incoming call notification */}
          <div
            className={`absolute top-10 left-3 right-3 z-10 rounded-2xl bg-[#1c1c1e] border border-white-15 p-3 transition-all duration-500 ${
              phase >= 1
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-full"
            }`}
          >
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center phone-ring-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-bold text-text">Incoming Call</p>
                <p className="text-[10px] text-accent">New lead calling...</p>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex-1 py-1.5 rounded-lg bg-red/20 text-center text-[10px] font-semibold text-red">Decline</div>
              <div className="flex-1 py-1.5 rounded-lg bg-accent/20 text-center text-[10px] font-semibold text-accent">Accept</div>
            </div>
          </div>

          {/* SMS notification */}
          <div
            className={`absolute top-[140px] left-3 right-3 z-10 rounded-2xl bg-[#1c1c1e] border border-white-15 p-3 transition-all duration-500 ${
              phase >= 2
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-bold text-text">SMS Sent</p>
                <p className="text-[9px] text-text-dim">Follow-up sequence started</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-[13px] font-semibold text-accent mt-5 text-center">
        Within 60 seconds. Every time.
      </p>
    </div>
  );
}

/* ---- Main Component ---- */
export default function LiveDemoPreview() {
  return (
    <section className="py-30 max-md:py-20">
      <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
        <RevealOnScroll>
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
            The full system
          </p>
          <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
            See everything working together.
          </h2>
          <p className="text-[17px] text-text-dim leading-[1.7] max-w-[540px] mb-16">
            Quiz funnel captures the lead. Your phone rings. Dashboard tracks everything. All automated.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-1">
          <RevealOnScroll>
            <BeforeAfterPanel />
          </RevealOnScroll>
          <RevealOnScroll>
            <DashboardPanel />
          </RevealOnScroll>
          <RevealOnScroll>
            <PhoneRingPanel />
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
