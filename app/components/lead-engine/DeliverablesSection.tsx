import RevealOnScroll from "@/app/components/RevealOnScroll";

const DELIVERABLES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12" y2="18.01" />
      </svg>
    ),
    title: "Mobile-First Lead Funnel",
    body: "Quiz-style, app-like, loads under 1 second. Built to convert on the device your leads actually use.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.88.36 1.74.7 2.55" />
      </svg>
    ),
    title: "Instant Call Trigger",
    body: "Phone rings within 60 seconds of submission. First to call wins the job — this makes sure that's you.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "Automated Follow-Up",
    body: "SMS + email sequence fires automatically. No lead sits unanswered, even nights and weekends.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: "Calendar Booking",
    body: "Direct booking into your schedule. No phone tag, no missed callbacks. Leads pick a time and show up.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Done-for-You GoHighLevel Account",
    body: "Your own GoHighLevel CRM — fully configured. Every lead tracked, every follow-up automated, full visibility from day one.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 20V10" />
        <path d="M18 20V4" />
        <path d="M6 20v-4" />
      </svg>
    ),
    title: "Monthly Optimization",
    body: "We monitor automation performance, review funnel metrics, and optimize your sequences every month. You close jobs — we tune the system.",
  },
];

/** 6-item deliverables grid — shared across all niches */
export default function DeliverablesSection() {
  return (
    <section className="py-30 max-md:py-20">
      <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
        <RevealOnScroll>
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4">
            What you get
          </p>
          <h2 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
            A complete lead system,<br />not just a funnel.
          </h2>
          <p className="text-[17px] text-text-dim leading-[1.7] max-w-[540px]">
            Six integrated pieces working together. From first click to booked appointment — fully automated.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-3 gap-px bg-border border border-border rounded-[20px] overflow-hidden mt-16 max-lg:grid-cols-2 max-md:grid-cols-1">
          {DELIVERABLES.map((d, i) => (
            <RevealOnScroll
              key={i}
              className="accent-top-hover bg-surface p-10 px-8 transition-[background] duration-400 hover:bg-[#121212]"
            >
              <div className="w-10 h-10 rounded-[10px] bg-accent-dim text-accent flex items-center justify-center mb-5">
                {d.icon}
              </div>
              <h3 className="text-[17px] font-bold mb-2.5 tracking-[-0.2px]">
                {d.title}
              </h3>
              <p className="text-sm text-text-dim leading-[1.7]">{d.body}</p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
