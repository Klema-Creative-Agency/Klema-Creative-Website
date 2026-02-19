"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const leads = [
  { type: "call", icon: "\u{1F4DE}", name: "Inbound Call \u2014 Sarah M.", detail: "Requesting HVAC service quote", status: "hot", statusLabel: "Hot Lead" },
  { type: "email", icon: "\u{1F4E7}", name: "New Email Lead", detail: 'mike.torres@gmail.com \u2014 "Need a new roof estimate"', status: "new", statusLabel: "New" },
  { type: "form", icon: "\u{1F4CB}", name: "Website Form Submission", detail: "Jennifer K. \u2014 Kitchen remodel inquiry", status: "hot", statusLabel: "Hot Lead" },
  { type: "call", icon: "\u{1F4DE}", name: "Missed Call \u2192 Callback Sent", detail: "+1 (512) 555-0147 \u2014 Follow-up scheduled", status: "warm", statusLabel: "Warm" },
  { type: "review", icon: "\u{2B50}", name: "New 5-Star Google Review", detail: '\u201CBest plumbing service in town! Highly recommend.\u201D', status: "new", statusLabel: "New" },
  { type: "email", icon: "\u{1F4E7}", name: "Email Inquiry", detail: 'david.chen@outlook.com \u2014 "Do you serve Austin area?"', status: "new", statusLabel: "New" },
  { type: "sms", icon: "\u{1F4AC}", name: "SMS Lead Response", detail: 'Lead replied: "Yes, Thursday at 2pm works great"', status: "hot", statusLabel: "Booked" },
  { type: "form", icon: "\u{1F4CB}", name: "Landing Page Conversion", detail: "Robert A. \u2014 Emergency AC repair request", status: "hot", statusLabel: "Hot Lead" },
  { type: "call", icon: "\u{1F4DE}", name: "Hot Transfer Completed", detail: "Connected Maria G. directly to sales team", status: "hot", statusLabel: "Transferred" },
  { type: "email", icon: "\u{1F4E7}", name: "Nurture Sequence Reply", detail: 'james.wilson@yahoo.com \u2014 "Ready to move forward"', status: "hot", statusLabel: "Hot Lead" },
  { type: "review", icon: "\u{2B50}", name: "New 5-Star Yelp Review", detail: '\u201CKlema helped us double our calls in 2 months!\u201D', status: "new", statusLabel: "New" },
  { type: "form", icon: "\u{1F4CB}", name: "Contact Form \u2014 Lisa P.", detail: "Electrical inspection for new build", status: "warm", statusLabel: "Warm" },
  { type: "call", icon: "\u{1F4DE}", name: "Inbound Call \u2014 Tony R.", detail: "Wants quote for full home rewiring", status: "new", statusLabel: "New" },
  { type: "sms", icon: "\u{1F4AC}", name: "Appointment Confirmed", detail: "Chris B. confirmed tomorrow 10am service call", status: "hot", statusLabel: "Booked" },
  { type: "email", icon: "\u{1F4E7}", name: "Referral Lead", detail: "sandra.k@gmail.com \u2014 Referred by existing client", status: "warm", statusLabel: "Warm" },
  { type: "form", icon: "\u{1F4CB}", name: "Free Estimate Request", detail: 'Mark D. \u2014 "Need windows replaced, 12 windows"', status: "new", statusLabel: "New" },
];

const iconColorMap: Record<string, string> = {
  call: "bg-accent-dim text-accent",
  email: "bg-blue-dim text-blue",
  form: "bg-purple-dim text-purple",
  review: "bg-amber-dim text-amber",
  sms: "bg-pink-dim text-pink",
};

const statusColorMap: Record<string, string> = {
  hot: "bg-accent-dim text-accent",
  new: "bg-blue-dim text-blue",
  warm: "bg-amber-dim text-amber",
};

function LeadNotification({ lead }: { lead: (typeof leads)[0] }) {
  return (
    <div className="lead-card-enter bg-card border border-border rounded-2xl px-5 max-md:px-3.5 py-[18px] max-md:py-3 flex items-center gap-3.5 max-md:gap-2.5 shrink-0">

      <div
        className={`w-11 h-11 max-md:w-9 max-md:h-9 rounded-xl flex items-center justify-center shrink-0 text-lg max-md:text-base ${iconColorMap[lead.type]}`}
      >
        {lead.icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-text mb-[3px] whitespace-nowrap overflow-hidden text-ellipsis">
          {lead.name}
        </h4>
        <p className="text-xs text-text-dim whitespace-nowrap overflow-hidden text-ellipsis">
          {lead.detail}
        </p>
      </div>
      <span
        className={`text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap shrink-0 ${statusColorMap[lead.status]}`}
      >
        {lead.statusLabel}
      </span>
    </div>
  );
}

const MAX_VISIBLE = 8;

function staggerClass(isInView: boolean, delayMs: number) {
  return {
    className: `transition-all duration-[1.2s] ease-out ${
      isInView ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-16 blur-[6px]"
    }`,
    style: { transitionDelay: isInView ? `${delayMs}ms` : "0ms" },
  };
}

export default function LeadFeed() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [headerInView, setHeaderInView] = useState(false);
  const [metalPos, setMetalPos] = useState(100); // background-position %
  const [visibleCards, setVisibleCards] = useState<
    Array<{ lead: (typeof leads)[0]; key: number }>
  >([]);

  // One-shot observer for cards/stats
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Toggle observer for header text — animates in and out
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeaderInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Scroll-linked metallic refraction on heading
  const handleMetalScroll = useCallback(() => {
    const el = headerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const windowH = window.innerHeight;
    // 0 = section at bottom of viewport, 1 = section at top
    const raw = (windowH - rect.top) / (windowH + rect.height);
    const clamped = Math.max(0, Math.min(1, raw));
    // Map to background-position: 100% (left) → 0% (right) as you scroll down
    setMetalPos(100 - clamped * 100);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleMetalScroll, { passive: true });
    handleMetalScroll();
    return () => window.removeEventListener("scroll", handleMetalScroll);
  }, [handleMetalScroll]);

  useEffect(() => {
    if (!isInView) return;

    let counter = 0;
    let intervalId: ReturnType<typeof setInterval>;

    const addCard = () => {
      const leadIndex = counter % leads.length;
      const key = counter;
      setVisibleCards((prev) => {
        const next = [...prev, { lead: leads[leadIndex], key }];
        return next.length > MAX_VISIBLE ? next.slice(-MAX_VISIBLE) : next;
      });
      counter++;
    };

    const timeoutId = setTimeout(() => {
      addCard();
      intervalId = setInterval(addCard, 1500);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative pt-32 pb-24 max-md:pt-20 max-md:pb-14 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 relative z-[1]">
        {/* Header — viewport-triggered stagger (reverses on scroll out) */}
        <div ref={headerRef} className="text-center mb-14 max-md:mb-8">
          <p
            className={`text-sm font-bold tracking-[0.15em] uppercase text-accent mb-4 ${staggerClass(headerInView, 0).className}`}
            style={staggerClass(headerInView, 0).style}
          >
            Your growth engine in action
          </p>
          <h2
            className={`text-[clamp(28px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4 ${staggerClass(headerInView, 300).className}`}
            style={{
              ...staggerClass(headerInView, 300).style,
              background: "linear-gradient(120deg, #aaa 0%, #c0c0c0 6%, #d6d6d6 12%, #ededed 18%, #ffffff 24%, #c8c8c8 30%, #aaa 38%, #c0c0c0 46%, #e0e0e0 52%, #f6f6f6 58%, #ffffff 63%, #d4d4d4 68%, #b2b2b2 76%, #c8c8c8 84%, #e4e4e4 90%, #b8b8b8 96%, #aaa 100%)",
              backgroundSize: "400% 100%",
              backgroundPosition: `${metalPos}% center`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
              transitionProperty: "opacity, transform, filter",
            }}
          >
            This is what a Tuesday looks like
            <span className="max-md:hidden"><br /></span>{" "}
            with Klema.
          </h2>
          <p
            className={`text-[17px] max-md:text-[15px] text-text-dim leading-[1.7] max-w-[600px] mx-auto ${staggerClass(headerInView, 600).className}`}
            style={staggerClass(headerInView, 600).style}
          >
            Real-time leads, booked appointments, and revenue flowing &mdash;
            all on autopilot.
          </p>
        </div>

        {/* Live Feed */}
        <div className="lead-feed-area relative h-[520px] max-md:h-[360px] overflow-hidden">
          <div className="flex flex-col gap-3.5 max-md:gap-2.5 h-full justify-end px-1">
            {visibleCards.map((card) => (
              <LeadNotification key={card.key} lead={card.lead} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
