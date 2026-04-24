import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ============================================================
// DATA
// ============================================================

type Block = { id: string; label: string; kind: "nav" | "hero" | "features" | "pricing" | "footer"; h: number };

const HERO_BLOCKS_DEFAULT: Block[] = [
  { id: "nav", label: "Navigation", kind: "nav", h: 70 },
  { id: "hero", label: "Hero section", kind: "hero", h: 120 },
  { id: "feat", label: "Features grid", kind: "features", h: 110 },
  { id: "price", label: "Pricing", kind: "pricing", h: 110 },
  { id: "foot", label: "Footer", kind: "footer", h: 80 },
];

const FRIENDS = [
  { id: "a", name: "Mara", color: "#c2410c" },
  { id: "b", name: "Theo", color: "#1e3a8a" },
  { id: "c", name: "Ines", color: "#5a6b2b" },
];

const STACK_RIBBON = [
  "React 18", "TypeScript", "Tailwind v4", "Vite",
  "Framer Motion", "Wouter", "shadcn/ui",
  "Vercel", "Cloudflare", "Resend",
  "GoHighLevel", "Search Atlas",
  "Plausible", "GA4", "Stripe",
  "Claude Code",
];

const HOW_STEPS = [
  { n: "01", t: "Intake call", s: "30 minutes. We map the site against your goals, your audience, and your launch date.", d: "Day 1" },
  { n: "02", t: "Design sprint", s: "Wireframes and hi-fi mockups in real components. You watch it happen, give feedback, lock direction.", d: "Day 2-5" },
  { n: "03", t: "Build & polish", s: "Production code on a stack you can hand off. CMS wired, analytics in place, performance green.", d: "Day 6-10" },
  { n: "04", t: "Launch & hand-off", s: "You get the live site, the repo, the CMS, the docs. Free GoHighLevel CRM trial included.", d: "Day 11-14" },
];

const FEATURES = [
  { k: "Mobile-first", t: "Designed for the device most of your customers actually use", tags: ["Responsive", "Touch-friendly"], tone: "ochre" },
  { k: "Lead capture", t: "Forms wired into a CRM so every inquiry hits your inbox in seconds", tags: ["GHL", "Email alerts"], tone: "sea" },
  { k: "Local SEO ready", t: "Schema markup, meta tags, sitemap, and Google Business Profile integration", tags: ["Schema", "GBP"], tone: "copper" },
  { k: "Speed first", t: "Built on a fast modern stack, optimized images, minimal JavaScript bloat", tags: ["Vite", "Edge CDN"], tone: "forest" },
  { k: "Hosting handoff", t: "Domain registration, DNS, hosting, SSL — we set it all up, you control it", tags: ["Vercel", "Cloudflare"], tone: "plum" },
  { k: "Yours forever", t: "You own the code, the CMS, the assets. No vendor lock-in, no leash", tags: ["Repo", "Full handoff"], tone: "cobalt" },
];

const TERM_LINES = [
  { type: "prompt", text: "klema ~ $ site init lead-gen-engine" },
  { type: "out", text: "✓ React 18 + TypeScript + Vite" },
  { type: "out", text: "✓ Tailwind v4 design tokens" },
  { type: "out", text: "✓ GoHighLevel CRM webhook wired" },
  { type: "out", text: "✓ Resend transactional email" },
  { type: "out", text: "✓ Vercel edge deploy + preview branches" },
  { type: "out", text: "✓ Plausible analytics, no cookie banner" },
  { type: "prompt", text: "klema ~ $ npm run deploy --env=production" },
  { type: "accent", text: "▲ Deployed to yourbusiness.com in 28s" },
  { type: "out", text: "  · Core Web Vitals: 100 / 99 / 100" },
  { type: "out", text: "  · Lighthouse a11y: 100" },
  { type: "out", text: "  · Repo, docs, CMS seat: handed off" },
];

const STACK_CATS = [
  { h: "Core", items: ["React 18", "TypeScript", "Tailwind v4", "Vite"] },
  { h: "Hosting", items: ["Vercel", "Cloudflare"] },
  { h: "Forms + CRM", items: ["GoHighLevel", "Resend"] },
  { h: "SEO + Analytics", items: ["Search Atlas", "Plausible", "GA4"] },
  { h: "Motion", items: ["Framer Motion", "CSS transitions"] },
  { h: "Ops", items: ["Claude Code", "Linear"] },
];

const TIERS = [
  {
    k: "Digital Business Card",
    price: "$297",
    sub: "Flat fee · one-time",
    best: false,
    desc: "For businesses with zero web presence who need to exist online immediately.",
    features: [
      "Single-page landing site",
      "Basic contact information",
      "Service overview",
      "Simple contact form",
      "Mobile-responsive",
    ],
    cta: "Request a quote",
  },
  {
    k: "Lead Generation Engine",
    price: "$447",
    sub: "Flat fee · one-time",
    best: true,
    desc: "The recommended starting point for local service businesses ready to capture leads.",
    features: [
      "Three pages (Home, Services, Contact)",
      "Integrated lead capture form",
      "Inquiries routed to your email",
      "Mobile-optimized design",
      "Free 1-month GHL CRM trial",
    ],
    cta: "Start with this",
  },
  {
    k: "Refresh & Optimize",
    price: "$697+",
    sub: "Starting at · redesign",
    best: false,
    desc: "For clients who already have a website that's outdated, slow, or fails to convert.",
    features: [
      "Visual overhaul (up to 5 pages)",
      "Mobile-responsive redesign",
      "Speed optimization",
      "High-converting lead forms",
      "SEO basics included",
    ],
    cta: "Request a quote",
  },
  {
    k: "Custom Build",
    price: "$1,500+",
    sub: "Starting at · scoped",
    best: false,
    desc: "For e-commerce, complex integrations, or extensive page counts (6+ pages).",
    features: [
      "Discovery + scoping meeting",
      "E-commerce or integrations",
      "6+ pages",
      "Tailored to your exact needs",
      "Quoted after discovery",
    ],
    cta: "Book discovery call",
  },
];

const FAQS = [
  {
    q: "Will I own my website when it's done?",
    a: "Yes, 100%. You get the code, the CMS, the hosting account, and the assets. No leash, no retainer required. You can hire any contractor in the world to maintain it after we hand off.",
  },
  {
    q: "Do you handle the domain and hosting setup?",
    a: "Yes — we set up the domain, DNS, SSL, and hosting on your account so you keep ownership. You'll pay the hosting and domain fees directly (typically $20-30/month for hosting, ~$15/year for the domain) but everything is registered to you.",
  },
  {
    q: "Can you redesign my existing website?",
    a: "Absolutely. The Refresh & Optimize package is built exactly for this — we keep what works, modernize what doesn't, and rebuild it on a fast, conversion-focused foundation.",
  },
  {
    q: "How long does a typical build take?",
    a: "Digital Business Card ships in about a week. Lead Generation Engine takes around two weeks. Refresh & Optimize and Custom Build are scoped on a per-project basis but typically run 2-4 weeks. We give you a fixed launch date before we start.",
  },
  {
    q: "Do I need a marketing package too?",
    a: "Not at all. Websites and marketing retainers are completely separate. Many clients launch a site and run it themselves for months before adding marketing. If you ever want to drive paid traffic or rank locally, our marketing packages are there when you're ready.",
  },
  {
    q: "What if I need changes after launch?",
    a: "Every website project includes 30 days of post-launch tweaks at no charge. After that, small updates run $97-197 each, or you can self-edit through the CMS. Nothing is hidden behind a contract.",
  },
];

// ============================================================
// HERO MINI BLOCK PREVIEWS
// ============================================================

function MiniBlock({ block, accent }: { block: Block; accent: string }) {
  const { kind } = block;
  if (kind === "nav") {
    return (
      <div className="kc-mini kc-mini-nav">
        <div className="kc-mini-logo" />
        <div className="kc-mini-nav-links">
          <span /><span /><span /><span />
        </div>
        <div className="kc-mini-nav-cta" style={{ background: accent }} />
      </div>
    );
  }
  if (kind === "hero") {
    return (
      <div className="kc-mini kc-mini-hero">
        <div className="kc-mini-hero-eyebrow" />
        <div className="kc-mini-hero-title">
          <div /><div style={{ width: "65%" }} /><div style={{ width: "40%" }} className="kc-mini-hero-italic" />
        </div>
        <div className="kc-mini-hero-cta">
          <div style={{ background: accent }} />
          <div />
        </div>
      </div>
    );
  }
  if (kind === "features") {
    return (
      <div className="kc-mini kc-mini-features">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="kc-mini-feat-card">
            <div className="kc-mini-feat-ic" style={{ background: i === 1 ? accent : undefined }} />
            <div className="kc-mini-feat-ln" />
            <div className="kc-mini-feat-ln sm" />
          </div>
        ))}
      </div>
    );
  }
  if (kind === "pricing") {
    return (
      <div className="kc-mini kc-mini-pricing">
        {[0, 1, 2].map((i) => (
          <div key={i} className={"kc-mini-price-card " + (i === 1 ? "featured" : "")} style={i === 1 ? { borderColor: accent } : undefined}>
            <div className="kc-mini-price-title" />
            <div className="kc-mini-price-num" />
            <div className="kc-mini-price-ln" />
            <div className="kc-mini-price-ln" />
            <div className="kc-mini-price-cta" style={i === 1 ? { background: accent } : undefined} />
          </div>
        ))}
      </div>
    );
  }
  if (kind === "footer") {
    return (
      <div className="kc-mini kc-mini-footer">
        <div className="kc-mini-foot-col"><div /><div /><div /></div>
        <div className="kc-mini-foot-col"><div /><div /><div /></div>
        <div className="kc-mini-foot-col"><div /><div /></div>
        <div className="kc-mini-foot-logo" />
      </div>
    );
  }
  return null;
}

// ============================================================
// LIVE CURSORS
// ============================================================

type Cursor = { id: string; name: string; color: string; x: number; y: number; tx: number; ty: number };

function LiveCursors({ containerRef, enabled }: { containerRef: React.RefObject<HTMLDivElement | null>; enabled: boolean }) {
  const [positions, setPositions] = useState<Cursor[]>(() =>
    FRIENDS.map((f, i) => ({ ...f, x: 100 + i * 120, y: 80 + i * 60, tx: 100 + i * 120, ty: 80 + i * 60 }))
  );
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const container = containerRef.current;
    if (!container) return;

    const retarget = (c: Cursor) => {
      const rect = container.getBoundingClientRect();
      c.tx = 40 + Math.random() * (rect.width - 80);
      c.ty = 40 + Math.random() * (rect.height - 80);
    };

    const intervals = FRIENDS.map((_, i) =>
      setInterval(() => setPositions((ps) => {
        const copy = ps.slice();
        retarget(copy[i]);
        return copy;
      }), 2200 + i * 700)
    );

    const tick = () => {
      setPositions((ps) =>
        ps.map((c) => ({
          ...c,
          x: c.x + (c.tx - c.x) * 0.04,
          y: c.y + (c.ty - c.y) * 0.04,
        }))
      );
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      intervals.forEach(clearInterval);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [enabled, containerRef]);

  if (!enabled) return null;

  return (
    <div className="kc-cursors">
      {positions.map((c) => (
        <div key={c.id} className="kc-cursor" style={{ transform: `translate(${c.x}px, ${c.y}px)` }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M5 3 L5 20 L10 15 L13 22 L16 21 L13 14 L20 14 Z" fill={c.color} stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
          </svg>
          <span className="kc-cursor-tag" style={{ background: c.color }}>{c.name}</span>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// DRAGGABLE BLOCK LIST
// ============================================================

function DraggableList({ blocks, setBlocks, accent }: { blocks: Block[]; setBlocks: (b: Block[]) => void; accent: string }) {
  const [dragId, setDragId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDragId(id);
    e.dataTransfer.effectAllowed = "move";
    const img = document.createElement("div");
    img.style.width = "1px";
    img.style.height = "1px";
    document.body.appendChild(img);
    e.dataTransfer.setDragImage(img, 0, 0);
    setTimeout(() => document.body.removeChild(img), 0);
  };
  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    setOverId(id);
  };
  const handleDrop = () => {
    if (!dragId || !overId || dragId === overId) {
      setDragId(null);
      setOverId(null);
      return;
    }
    const from = blocks.findIndex((b) => b.id === dragId);
    const to = blocks.findIndex((b) => b.id === overId);
    const next = blocks.slice();
    const [m] = next.splice(from, 1);
    next.splice(to, 0, m);
    setBlocks(next);
    setDragId(null);
    setOverId(null);
  };

  return (
    <div className="kc-block-stack" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      {blocks.map((b, i) => (
        <div
          key={b.id}
          className={"kc-block " + (dragId === b.id ? "dragging " : "") + (overId === b.id && dragId !== b.id ? "drop-target " : "")}
          draggable
          onDragStart={(e) => handleDragStart(e, b.id)}
          onDragOver={(e) => handleDragOver(e, b.id)}
          onDragEnd={() => { setDragId(null); setOverId(null); }}
          style={{ minHeight: b.h }}
        >
          <div className="kc-block-gutter">
            <div className="kc-block-handle" title="Drag to reorder">
              <svg width="10" height="14" viewBox="0 0 10 14"><g fill="currentColor"><circle cx="2" cy="2" r="1.2" /><circle cx="8" cy="2" r="1.2" /><circle cx="2" cy="7" r="1.2" /><circle cx="8" cy="7" r="1.2" /><circle cx="2" cy="12" r="1.2" /><circle cx="8" cy="12" r="1.2" /></g></svg>
            </div>
            <div className="kc-block-index">{String(i + 1).padStart(2, "0")}</div>
          </div>
          <div className="kc-block-body">
            <div className="kc-block-meta">
              <span className="kc-block-label">{b.label}</span>
              <span className="kc-block-kind">{b.kind}</span>
            </div>
            <div className="kc-block-preview">
              <MiniBlock block={b} accent={accent} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function Hero() {
  const [blocks, setBlocks] = useState<Block[]>(HERO_BLOCKS_DEFAULT);
  const [accent, setAccent] = useState("oklch(0.72 0.18 50)");
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Read --accent after CSS is applied
    const v = getComputedStyle(document.documentElement.querySelector(".kc-websites") as Element).getPropertyValue("--accent").trim();
    if (v) setAccent(v);
  }, []);

  return (
    <section className="kc-hero">
      <div className="kc-wrap kc-hero-grid">
        <div className="kc-hero-copy">
          <div className="kc-eyebrow"><span className="kc-dot" /> A studio, not a template factory</div>
          <h1 className="kc-display kc-hero-title">
            Websites that ship.<br />
            <em>Without the agency<br />price.</em>
          </h1>
          <p className="kc-hero-sub">
            We design, build and deploy production-grade marketing sites for local businesses. Real code, real CMS, launched in weeks.
          </p>
          <div className="kc-hero-cta">
            <a href="#contact" className="kc-btn kc-btn-primary">Start a project <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
            <a href="#pricing" className="kc-btn">See pricing</a>
          </div>
          <div className="kc-hero-meta">
            <div><strong>14 days</strong><span>median to launch</span></div>
            <div className="kc-vr" />
            <div><strong>100%</strong><span>code you own</span></div>
            <div className="kc-vr" />
            <div><strong>$297+</strong><span>flat-fee builds</span></div>
          </div>
        </div>

        <div className="kc-hero-canvas">
          <div className="kc-canvas-chrome">
            <div className="kc-chrome-dots"><span /><span /><span /></div>
            <div className="kc-chrome-url">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              <span>klemacreative.com<span className="kc-url-draft">/draft/your-site</span></span>
            </div>
            <div className="kc-chrome-right">
              <span className="kc-tag"><span className="kc-dot" /> Live</span>
            </div>
          </div>

          <div className="kc-canvas-body" ref={previewRef}>
            <div className="kc-canvas-toolbar">
              <div className="kc-toolbar-left">
                <span className="kc-tb-chip"><svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M3 7h18v2H3zM3 11h12v2H3zM3 15h18v2H3z" /></svg> Blocks</span>
                <span className="kc-tb-chip muted">5 sections</span>
              </div>
              <div className="kc-toolbar-right">
                <span className="kc-tb-chip kc-chip-hint">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/><path d="M9 8l-4 4 4 4M15 8l4 4-4 4"/></svg>
                  Try it · drag any block
                </span>
              </div>
            </div>

            <div className="kc-canvas-inner">
              <DraggableList blocks={blocks} setBlocks={setBlocks} accent={accent} />
            </div>

          </div>

          <div className="kc-canvas-foot">
            <div className="kc-foot-left">
              <span className="kc-tag"><span className="kc-dot" style={{ background: "#22c55e" }} /> Live preview</span>
            </div>
            <div className="kc-foot-right">
              <span className="kc-tb-chip muted">5 sections · drag to reorder</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kc-hero-marquee">
        <div className="kc-marquee-track">
          {STACK_RIBBON.concat(STACK_RIBBON).map((s, i) => (
            <span key={i} className="kc-marquee-item"><span className="kc-dot" /> {s}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// HOW IT WORKS
// ============================================================

function HowItWorks() {
  return (
    <section id="how" className="kc-how">
      <div className="kc-wrap">
        <div className="kc-section-head kc-reveal">
          <div className="kc-eyebrow">§ 01 · How it works</div>
          <div>
            <h2>From kickoff to <em>public launch</em> in two weeks.</h2>
            <p>Fixed scope, fixed price, fixed date. No open-ended retainers, no scope creep — just a predictable process that gets you to live.</p>
          </div>
        </div>
        <div className="kc-steps">
          {HOW_STEPS.map((s) => (
            <div key={s.n} className="kc-step kc-reveal">
              <div className="kc-step-n">{s.n}</div>
              <div className="kc-step-title kc-display">{s.t}</div>
              <div className="kc-step-s">{s.s}</div>
              <div className="kc-step-d kc-tag">{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// WHAT YOU GET (replaces Recent Work)
// ============================================================

function WhatYouGet() {
  return (
    <section id="features" className="kc-work">
      <div className="kc-wrap">
        <div className="kc-section-head kc-reveal">
          <div className="kc-eyebrow">§ 02 · What you get</div>
          <div>
            <h2>Every site ships <em>with all of this baked in.</em></h2>
            <p>No upcharge for the basics. Mobile-first design, lead capture, local SEO, fast hosting, and full ownership are included in every package.</p>
          </div>
        </div>

        <div className="kc-work-grid">
          {FEATURES.map((w, i) => (
            <div key={w.k} className={"kc-work-card kc-reveal kc-tone-" + w.tone}>
              <div className="kc-work-top">
                <div className="kc-work-meta">
                  <span className="kc-tag">Included</span>
                  <span className="kc-tb-chip muted">{String(i + 1).padStart(2, "0")} / 06</span>
                </div>
                <div className="kc-work-hero">
                  <div className="kc-work-chrome"><span /><span /><span /></div>
                  <div className="kc-work-screen">
                    <div className="kc-work-screen-title">{w.k}</div>
                    <div className="kc-work-screen-stripes">
                      <div /><div /><div /><div />
                    </div>
                  </div>
                </div>
              </div>
              <div className="kc-work-bot">
                <div className="kc-work-title kc-display">{w.k}</div>
                <div className="kc-work-desc">{w.t}</div>
                <div className="kc-work-tags">
                  {w.tags.map((t) => <span key={t} className="kc-work-tag">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PROCESS TIMELINE (CALENDAR)
// ============================================================

function ProcessTimeline() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const daysToMon = (8 - today.getDay()) % 7;
  const monOffset = daysToMon === 0 ? 0 : daysToMon;
  const start = new Date(today);
  start.setDate(today.getDate() + monOffset);

  const addDays = (d: Date, n: number) => {
    const x = new Date(d);
    x.setDate(d.getDate() + n);
    return x;
  };
  const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  const dayMeta = [
    { dow: "Mon", e: "Kickoff call", s: "Brief locked, goals mapped", phase: "Discover" },
    { dow: "Tue", e: "Moodboard", s: "Type + visual exploration", phase: "Discover" },
    { dow: "Wed", e: "Wireframes", s: "All pages, low-fi layout", phase: "Design" },
    { dow: "Thu", e: "Hi-fi v1", s: "Home + 2 sub-pages", phase: "Design" },
    { dow: "Fri", e: "Review", s: "Revisions locked", phase: "Design" },
    { dow: "Mon", e: "Scaffold", s: "Vite + Tailwind + Vercel", phase: "Build" },
    { dow: "Tue", e: "CMS + content", s: "GHL forms, copy migration", phase: "Build" },
    { dow: "Wed", e: "Motion + a11y", s: "Interactions, AA pass", phase: "Build" },
    { dow: "Thu", e: "QA", s: "Performance, cross-browser", phase: "Ship", important: true },
    { dow: "Fri", e: "Launch", s: "Live + handoff docs", phase: "Ship", important: true, milestone: true },
  ];

  type Day = typeof dayMeta[number] & { date: Date; num: number; isToday: boolean; milestone?: boolean; important?: boolean };
  const days: Day[] = dayMeta.map((m, i) => {
    const offset = i < 5 ? i : i + 2;
    const date = addDays(start, offset);
    return { ...m, date, num: date.getDate(), isToday: sameDay(date, today) };
  });

  const weeks = [
    { label: "Week 1 · Discover & Design", days: days.slice(0, 5) },
    { label: "Week 2 · Build & Ship", days: days.slice(5, 10) },
  ];

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const endDate = days[days.length - 1].date;
  const titleMonth = monthNames[start.getMonth()];
  const titleYear = start.getFullYear();
  const crossesMonth = start.getMonth() !== endDate.getMonth();
  const calTitle = crossesMonth
    ? `${titleMonth} – ${monthNames[endDate.getMonth()]} ${titleYear} · Klema engagement`
    : `${titleMonth} ${titleYear} · Klema engagement`;

  const dows = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="kc-process">
      <div className="kc-wrap">
        <div className="kc-section-head kc-reveal">
          <div className="kc-eyebrow">§ 03 · Process timeline</div>
          <div>
            <h2>A <em>two-week</em> sprint — not a two-quarter project.</h2>
            <p>Here's what a typical Lead Generation Engine build looks like, day by day. Dates update to your next available sprint.</p>
          </div>
        </div>

        <div className="kc-cal kc-reveal">
          <div className="kc-cal-chrome">
            <div className="kc-cal-chrome-l">
              <div className="kc-cal-dots"><span /><span /><span /></div>
              <div className="kc-cal-title">{calTitle}</div>
            </div>
            <div className="kc-cal-legend">
              <span><i className="kc-lg kc-lg-discover" />Discover</span>
              <span><i className="kc-lg kc-lg-design" />Design</span>
              <span><i className="kc-lg kc-lg-build" />Build</span>
              <span><i className="kc-lg kc-lg-ship" />Ship</span>
            </div>
          </div>

          <div className="kc-cal-dowrow">
            {dows.map((d) => <div key={d} className="kc-cal-dow">{d}</div>)}
          </div>

          {weeks.map((w, wi) => (
            <div key={wi} className="kc-cal-week">
              <div className="kc-cal-weeklabel">
                <span className="kc-cal-weeknum">W{wi + 1}</span>
                <span className="kc-cal-weektext">{w.label}</span>
              </div>
              <div className="kc-cal-grid">
                {w.days.map((d, i) => {
                  const key = wi + "-" + i;
                  return (
                    <div
                      key={i}
                      className={"kc-cal-cell phase-" + d.phase.toLowerCase() + (d.milestone ? " kc-cal-cell-milestone" : "") + (d.isToday ? " kc-cal-cell-today" : "") + (hovered === key ? " kc-cal-cell-hover" : "")}
                      onMouseEnter={() => setHovered(key)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <div className="kc-cal-cell-top">
                        <span className="kc-cal-num">{d.num}</span>
                        <span className={"kc-cal-pill kc-lg kc-lg-" + d.phase.toLowerCase()}>{d.phase}</span>
                      </div>
                      <div className="kc-cal-event">{d.e}</div>
                      <div className="kc-cal-sub">{d.s}</div>
                      {d.isToday && <div className="kc-cal-today-badge">Today</div>}
                      {d.milestone && !d.isToday && <div className="kc-cal-milestone">▲ Launch</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TECH STACK (TERMINAL)
// ============================================================

function TechStack() {
  const [shown, setShown] = useState(0);
  const [typed, setTyped] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setStarted(true); }),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started || shown >= TERM_LINES.length) return;
    const line = TERM_LINES[shown];
    if (typed.length < line.text.length) {
      const speed = line.type === "prompt" ? 22 : line.type === "accent" ? 14 : 9;
      const t = setTimeout(() => setTyped(line.text.slice(0, typed.length + 1)), speed);
      return () => clearTimeout(t);
    } else {
      const pause = line.type === "prompt" ? 300 : 80;
      const t = setTimeout(() => { setShown(shown + 1); setTyped(""); }, pause);
      return () => clearTimeout(t);
    }
  }, [shown, typed, started]);

  useEffect(() => {
    if (shown >= TERM_LINES.length) {
      const t = setTimeout(() => { setShown(0); setTyped(""); }, 3200);
      return () => clearTimeout(t);
    }
  }, [shown]);

  return (
    <section id="stack" className="kc-stack">
      <div className="kc-wrap kc-stack-grid">
        <div className="kc-reveal">
          <div className="kc-eyebrow">§ 04 · Stack we use</div>
          <h2 className="kc-display kc-stack-h">A stack you'd <em>actually want to own.</em></h2>
          <p className="kc-stack-p">
            Every site ships on a boring, battle-tested stack — the kind any developer can maintain. Nothing proprietary, nothing clever, no vendor lock-in.
          </p>
          <div className="kc-stack-cats">
            {STACK_CATS.map((c) => (
              <div key={c.h} className="kc-stack-cat">
                <div className="kc-stack-cat-h">{c.h}</div>
                <div className="kc-stack-cat-items">
                  {c.items.map((i) => <span key={i} className="kc-stack-chip">{i}</span>)}
                </div>
              </div>
            ))}
          </div>
          <div className="kc-stack-note">
            <span className="kc-stack-note-dot" />
            <div>
              <strong>Built for Claude Code.</strong> Every project includes a <code>CLAUDE.md</code> that documents tokens, conventions, and guard-rails — so anyone who picks up the codebase ships faster on day one.
            </div>
          </div>
        </div>

        <div className="kc-terminal kc-reveal" ref={containerRef}>
          <div className="kc-terminal-chrome">
            <div className="kc-chrome-dots"><span /><span /><span /></div>
            <div className="kc-terminal-title">klema ~ zsh — 98×24</div>
            <div></div>
          </div>
          <div className="kc-terminal-body">
            {TERM_LINES.slice(0, shown).map((l, i) => (
              <div key={i} className={"kc-term-line kc-term-" + l.type}>
                {l.type === "prompt" ? <span className="kc-prompt">➜</span> : null}
                <span>{l.text}</span>
              </div>
            ))}
            {shown < TERM_LINES.length && (
              <div className={"kc-term-line kc-term-" + TERM_LINES[shown].type}>
                {TERM_LINES[shown].type === "prompt" ? <span className="kc-prompt">➜</span> : null}
                <span>{typed}<span className="kc-cursor-blink">▋</span></span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PRICING
// ============================================================

function Pricing() {
  return (
    <section id="pricing" className="kc-pricing">
      <div className="kc-wrap">
        <div className="kc-section-head kc-reveal">
          <div className="kc-eyebrow">§ 05 · Pricing</div>
          <div>
            <h2>Four ways to <em>work with us.</em></h2>
            <p>Flat fees with a clear scope. No billable hours, no surprise invoices. Domain and hosting fees are paid by you directly so you keep ownership.</p>
          </div>
        </div>
        <div className="kc-tiers">
          {TIERS.map((t) => (
            <div key={t.k} className={"kc-tier kc-reveal " + (t.best ? "kc-tier-best" : "")}>
              {t.best && <div className="kc-tier-badge">Most picked</div>}
              <div className="kc-tier-top">
                <div className="kc-tier-name kc-display">{t.k}</div>
                <div className="kc-tier-price kc-display">{t.price}</div>
                <div className="kc-tier-sub">{t.sub}</div>
                <p className="kc-tier-desc">{t.desc}</p>
              </div>
              <ul className="kc-tier-features">
                {t.features.map((f) => (
                  <li key={f}>
                    <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 10l4 4 8-8" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#contact" className={"kc-btn " + (t.best ? "kc-btn-accent" : "kc-btn-primary")} style={{ width: "100%", justifyContent: "center" }}>{t.cta}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FAQ
// ============================================================

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="kc-faq">
      <div className="kc-wrap kc-faq-grid">
        <div className="kc-reveal">
          <div className="kc-eyebrow">§ 06 · Frequently asked</div>
          <h2 className="kc-display kc-faq-h">Before you ask — <em>probably this.</em></h2>
          <p className="kc-faq-p">Don't see your question? Email <a href="mailto:tamaya@klemacreative.com" className="kc-link-underline">tamaya@klemacreative.com</a> — we reply within a business day.</p>
        </div>
        <div className="kc-reveal">
          {FAQS.map((item, i) => (
            <div key={i} className={"kc-faq-item " + (open === i ? "open" : "")}>
              <button className="kc-faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span className="kc-faq-num">{String(i + 1).padStart(2, "0")}</span>
                <span>{item.q}</span>
                <span className="kc-faq-plus">{open === i ? "–" : "+"}</span>
              </button>
              <div className="kc-faq-a">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CTA / CONTACT FORM
// ============================================================

function CTA() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [trade, setTrade] = useState("Lead Generation Engine");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, trade, message }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please email us directly at tamaya@klemacreative.com.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="kc-cta">
      <div className="kc-wrap">
        <div className="kc-cta-card kc-reveal">
          <div className="kc-cta-left">
            <div className="kc-eyebrow">§ 07 · Start a project</div>
            <h2 className="kc-display kc-cta-h">Have a site in mind? <em>Let's build it.</em></h2>
            <p className="kc-cta-p">Tell us about your project. We'll reply within one business day with a time to talk and a rough scope.</p>
            <div className="kc-cta-meta">
              <div><span className="kc-tb-chip"><span className="kc-dot" style={{ background: "#22c55e" }} /> Booking now</span></div>
              <div className="kc-tb-chip muted">avg. reply &lt; 6 hours</div>
            </div>
          </div>
          <form className="kc-cta-form" onSubmit={handleSubmit}>
            {submitted ? (
              <div className="kc-cta-success">
                <div className="kc-display" style={{ fontSize: "40px" }}>Got it.</div>
                <p>We'll reply within a business day. In the meantime, you can reply to the confirmation email with anything else we should know.</p>
              </div>
            ) : (
              <>
                <div className="kc-form-row">
                  <label>Your name</label>
                  <input type="text" placeholder="Jane Doe" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="kc-form-row">
                  <label>Email</label>
                  <input type="email" placeholder="jane@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="kc-form-row">
                  <label>Phone</label>
                  <input type="tel" placeholder="(210) 555-0100" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div className="kc-form-row">
                  <label>What are we building?</label>
                  <textarea rows={4} placeholder="A new site for our local business. Three pages, contact form, GBP integration..." value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                </div>
                <div className="kc-form-row">
                  <label>Package interest</label>
                  <div className="kc-form-chips">
                    {TIERS.map((t) => (
                      <label key={t.k} className="kc-form-chip">
                        <input type="radio" name="package" checked={trade === t.k} onChange={() => setTrade(t.k)} />
                        <span>{t.k} · {t.price}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {error && <p className="kc-form-error">{error}</p>}
                <button className="kc-btn kc-btn-accent" style={{ width: "100%", justifyContent: "center", padding: "14px" }} type="submit" disabled={submitting}>
                  {submitting ? "Sending..." : <>Send brief <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg></>}
                </button>
                <p className="kc-form-fine">We keep your brief private. We'll only use it to prepare for our call.</p>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SCROLL REVEALS
// ============================================================

function useScrollReveals(deps: unknown[] = []) {
  useEffect(() => {
    const els = document.querySelectorAll(".kc-reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

// ============================================================
// PAGE
// ============================================================

export default function Websites() {
  useScrollReveals([]);

  useEffect(() => {
    const prev = document.title;
    document.title = "Websites | Klema Creative — Production-grade builds for local businesses";
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="kc-websites">
        <Hero />
        <HowItWorks />
        <WhatYouGet />
        <ProcessTimeline />
        <TechStack />
        <Pricing />
        <FAQ />
        <CTA />
      </div>
      <Footer />
      <WebsitesStyles />
    </>
  );
}

// ============================================================
// SCOPED STYLES (everything prefixed .kc-)
// ============================================================

function WebsitesStyles() {
  return (
    <style>{`
.kc-websites {
  --paper: oklch(0.15 0.02 240);
  --paper-2: oklch(0.20 0.02 240);
  --ink: oklch(0.98 0.005 80);
  --ink-2: oklch(0.85 0.01 240);
  --muted: oklch(0.55 0.02 240);
  --line: oklch(0.28 0.02 240);
  --line-2: oklch(0.34 0.02 240);
  --accent: oklch(0.72 0.18 50);
  --accent-ink: oklch(1 0 0);
  --surface: oklch(0.22 0.02 240);
  --kc-font-display: "Geist", ui-sans-serif, system-ui, sans-serif;
  --kc-font-sans: "Geist", ui-sans-serif, system-ui, sans-serif;
  --kc-font-mono: "Geist Mono", ui-monospace, monospace;
  --kc-radius: 10px;
  --kc-radius-sm: 6px;
  --kc-maxw: 1280px;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--kc-font-sans);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
.kc-websites * { box-sizing: border-box; }
.kc-websites a { color: inherit; text-decoration: none; }
.kc-websites button { font-family: inherit; cursor: pointer; }
.kc-websites ::selection { background: var(--accent); color: var(--accent-ink); }

.kc-wrap { max-width: var(--kc-maxw); margin: 0 auto; padding: 0 clamp(20px, 4vw, 48px); }

.kc-eyebrow { font-family: var(--kc-font-mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); display: inline-flex; align-items: center; gap: 8px; }
.kc-display { font-family: var(--kc-font-display); font-weight: 600; letter-spacing: -0.035em; line-height: 1.0; }
.kc-display em { font-style: normal; color: var(--accent); font-weight: 400; }
.kc-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 20%, transparent); }
.kc-tag { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; font-family: var(--kc-font-mono); font-size: 11px; letter-spacing: 0.02em; color: var(--ink-2); border: 1px solid var(--line); border-radius: 6px; background: var(--surface); }

.kc-websites section { padding: 96px 0; position: relative; }
.kc-section-head { display: grid; grid-template-columns: 1fr 2fr; gap: 48px; margin-bottom: 56px; align-items: end; }
.kc-section-head h2 { font-family: var(--kc-font-display); font-size: clamp(40px, 5vw, 72px); margin: 14px 0 0; letter-spacing: -0.035em; line-height: 1; font-weight: 600; }
.kc-section-head h2 em { font-style: normal; color: var(--accent); font-weight: 400; }
.kc-section-head p { color: var(--ink-2); font-size: 16px; line-height: 1.55; max-width: 48ch; }
@media (max-width: 860px) { .kc-section-head { grid-template-columns: 1fr; gap: 20px; } }

.kc-reveal { opacity: 0; transform: translateY(18px); transition: opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1); }
.kc-reveal.in { opacity: 1; transform: none; }

.kc-websites .kc-btn { display: inline-flex; align-items: center; gap: 8px; padding: 9px 14px; border-radius: 8px; font-size: 13px; font-weight: 500; border: 1px solid var(--line-2); background: transparent; color: var(--ink); transition: all .15s ease; font-family: var(--kc-font-sans); }
.kc-websites .kc-btn:hover { border-color: var(--ink-2); background: var(--paper-2); }
.kc-websites .kc-btn-primary { background: var(--ink); color: var(--paper); border-color: var(--ink); }
.kc-websites .kc-btn-primary:hover { background: var(--ink-2); border-color: var(--ink-2); color: var(--paper); }
.kc-websites .kc-btn-accent { background: var(--accent); color: var(--accent-ink); border-color: var(--accent); font-weight: 600; }
.kc-websites .kc-btn-accent:hover { filter: brightness(1.1); }
.kc-websites .kc-btn svg { width: 14px; height: 14px; }

/* HERO */
.kc-hero { padding-top: 96px !important; padding-bottom: 0 !important; }
.kc-hero-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 56px; align-items: start; }
@media (max-width: 1060px) { .kc-hero-grid { grid-template-columns: 1fr; } }
.kc-hero-title { font-size: clamp(40px, 5.5vw, 60px); margin: 20px 0 28px; font-weight: 700; letter-spacing: -0.035em; line-height: 1.05; }
.kc-hero-sub { font-size: 17px; line-height: 1.55; color: var(--ink-2); max-width: 44ch; margin: 0 0 32px; }
.kc-hero-cta { display: flex; gap: 10px; align-items: center; margin-bottom: 48px; flex-wrap: wrap; }
.kc-hero-meta { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; font-family: var(--kc-font-mono); font-size: 11px; color: var(--muted); }
.kc-hero-meta strong { display: block; font-family: var(--kc-font-display); font-size: 26px; color: var(--ink); font-weight: 600; letter-spacing: -0.025em; }
.kc-hero-meta span { display: block; margin-top: 2px; }
.kc-hero-meta .kc-vr { width: 1px; height: 36px; background: var(--line); }

.kc-hero-canvas { border: 1px solid var(--line-2); border-radius: 12px; overflow: hidden; background: var(--surface); box-shadow: 0 40px 80px -40px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.02) inset; position: relative; }

.kc-canvas-chrome { display: grid; grid-template-columns: auto 1fr auto; gap: 14px; align-items: center; padding: 10px 14px; border-bottom: 1px solid var(--line); background: var(--paper-2); }
.kc-chrome-dots { display: flex; gap: 6px; }
.kc-chrome-dots span { width: 10px; height: 10px; border-radius: 50%; background: var(--line-2); }
.kc-chrome-dots span:nth-child(1) { background: #ff5f56; }
.kc-chrome-dots span:nth-child(2) { background: #ffbd2e; }
.kc-chrome-dots span:nth-child(3) { background: #27c93f; }
.kc-chrome-url { display: flex; align-items: center; gap: 8px; font-family: var(--kc-font-mono); font-size: 11px; color: var(--ink-2); background: var(--paper); border: 1px solid var(--line); border-radius: 6px; padding: 5px 12px; justify-self: center; min-width: 260px; justify-content: center; }
.kc-url-draft { color: var(--muted); }

.kc-canvas-toolbar { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; border-bottom: 1px solid var(--line); background: var(--surface); }
.kc-toolbar-left, .kc-toolbar-right { display: flex; gap: 8px; align-items: center; }
.kc-tb-chip { font-family: var(--kc-font-mono); font-size: 10px; color: var(--ink-2); display: inline-flex; align-items: center; gap: 6px; padding: 4px 8px; background: var(--paper-2); border: 1px solid var(--line); border-radius: 5px; }
.kc-tb-chip.muted { color: var(--muted); background: transparent; border-color: transparent; }
.kc-tb-chip.kc-chip-hint { color: var(--accent); background: color-mix(in srgb, var(--accent) 12%, transparent); border-color: color-mix(in srgb, var(--accent) 35%, transparent); font-weight: 600; }

.kc-canvas-body { position: relative; padding: 18px; background: radial-gradient(circle at 1px 1px, var(--line-2) 1px, transparent 1px) 0 0 / 22px 22px; container-type: inline-size; }

/* Blocks lay 2-up at narrower canvas widths */
@container (min-width: 460px) {
  .kc-block-stack { grid-template-columns: 1fr 1fr; gap: 10px; }
}
/* 3-up once canvas is wide enough (desktop with widened grid + tablet full-width) */
@container (min-width: 600px) {
  .kc-block-stack { grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
}

/* Mobile compaction: shrink canvas dramatically, hide block previews */
@media (max-width: 1060px) {
  .kc-canvas-body { min-height: auto; padding: 12px; }
  .kc-block { min-height: 0 !important; grid-template-columns: 32px 1fr; }
  .kc-block-preview { display: none; }
  .kc-block-body { padding: 10px 12px; }
  .kc-block-meta { margin-bottom: 0; }
  .kc-block-gutter { padding: 8px 0; }
  .kc-canvas-toolbar { padding: 8px 12px; }
  .kc-canvas-foot { padding: 8px 12px; }
  .kc-hero-marquee { margin-top: 48px; }
  .kc-hero { padding-top: 64px !important; }
  .kc-hero-title { font-size: clamp(40px, 9vw, 56px); }
}
.kc-canvas-inner { padding-top: 6px; }
.kc-block-stack { display: grid; gap: 10px; }
.kc-block { position: relative; display: grid; grid-template-columns: 42px 1fr; background: var(--paper); border: 1px solid var(--line); border-radius: 10px; transition: transform .2s ease, box-shadow .2s ease, border-color .2s; cursor: grab; }
.kc-block:hover { border-color: var(--accent); box-shadow: 0 6px 22px color-mix(in srgb, var(--accent) 22%, transparent); transform: translateY(-2px); }
.kc-block:hover .kc-block-handle { color: var(--accent); }
.kc-block.dragging { opacity: 0.4; cursor: grabbing; }
.kc-block.drop-target { border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent); }
.kc-block-gutter { border-right: 1px dashed var(--line); display: grid; place-items: center; gap: 8px; padding: 10px 0; color: var(--ink-2); }
.kc-block-handle { color: var(--ink-2); transition: color .15s ease; }

/* One-time wiggle on the first block to demonstrate drag affordance */
.kc-block-stack > .kc-block:first-child { animation: kc-block-hint 1.4s ease-in-out 1.6s 1 both; }
@keyframes kc-block-hint {
  0%, 100% { transform: translateX(0); }
  18% { transform: translateX(-7px); }
  36% { transform: translateX(7px); }
  54% { transform: translateX(-4px); }
  72% { transform: translateX(4px); }
  90% { transform: translateX(0); }
}
.kc-block-index { font-family: var(--kc-font-mono); font-size: 10px; color: var(--muted); }
.kc-block-body { padding: 10px 14px 14px; min-width: 0; }
.kc-block-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.kc-block-label { font-family: var(--kc-font-sans); font-size: 14px; font-weight: 600; letter-spacing: -0.01em; color: var(--ink); }
.kc-block-kind { font-family: var(--kc-font-mono); font-size: 10px; color: var(--muted); }
.kc-block-preview { background: var(--surface); border: 1px solid var(--line); border-radius: 6px; padding: 10px; overflow: hidden; }

/* Mini block previews */
.kc-mini { display: grid; gap: 6px; }
.kc-mini > div { background: var(--line); border-radius: 3px; }
.kc-mini-nav { grid-template-columns: 20px 1fr auto; align-items: center; gap: 12px; padding: 2px; }
.kc-mini-logo { width: 16px; height: 16px; border-radius: 4px; background: var(--ink) !important; }
.kc-mini-nav-links { display: flex; gap: 10px; }
.kc-mini-nav-links span { display: block; width: 28px; height: 6px; background: var(--line-2); border-radius: 2px; }
.kc-mini-nav-cta { width: 42px; height: 14px; border-radius: 999px; }
.kc-mini-hero-eyebrow { width: 80px; height: 6px; }
.kc-mini-hero-title { display: grid; gap: 6px; padding: 4px 0; }
.kc-mini-hero-title > div { height: 12px; width: 86%; background: var(--ink) !important; border-radius: 3px; }
.kc-mini-hero-italic { background: var(--accent) !important; }
.kc-mini-hero-cta { display: flex; gap: 6px; margin-top: 4px; }
.kc-mini-hero-cta > div { width: 56px; height: 16px; border-radius: 999px; background: var(--line-2); }
.kc-mini-features { grid-template-columns: repeat(4, 1fr); gap: 8px; background: none !important; }
.kc-mini-feat-card { background: var(--paper-2) !important; border: 1px solid var(--line); border-radius: 4px; padding: 8px 6px; display: grid; gap: 5px; }
.kc-mini-feat-ic { width: 14px; height: 14px; border-radius: 3px; background: var(--line-2); }
.kc-mini-feat-ln { height: 6px; background: var(--ink-2) !important; opacity: .4; border-radius: 2px; }
.kc-mini-feat-ln.sm { width: 60%; opacity: .2; }
.kc-mini-pricing { grid-template-columns: repeat(3, 1fr); gap: 8px; background: none !important; }
.kc-mini-price-card { background: var(--paper-2) !important; border: 1px solid var(--line); border-radius: 6px; padding: 8px; display: grid; gap: 5px; }
.kc-mini-price-card.featured { background: var(--paper) !important; }
.kc-mini-price-title { height: 6px; width: 50%; background: var(--ink-2) !important; opacity: .5; }
.kc-mini-price-num { height: 14px; width: 60%; background: var(--ink) !important; }
.kc-mini-price-ln { height: 4px; width: 80%; background: var(--line-2) !important; }
.kc-mini-price-cta { height: 12px; width: 100%; border-radius: 999px; background: var(--line-2); margin-top: 3px; }
.kc-mini-footer { grid-template-columns: 1fr 1fr 1fr auto; gap: 12px; align-items: end; background: none !important; padding-top: 4px; }
.kc-mini-foot-col { display: grid; gap: 4px; background: none !important; }
.kc-mini-foot-col div { height: 4px; background: var(--line-2) !important; border-radius: 2px; width: 80%; }
.kc-mini-foot-logo { width: 14px; height: 14px; border-radius: 4px; background: var(--ink) !important; }

.kc-canvas-foot { display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; border-top: 1px solid var(--line); background: var(--paper-2); }
.kc-avatars { display: flex; margin-left: 8px; }
.kc-avatar { width: 22px; height: 22px; border-radius: 50%; color: white; font-size: 10px; font-weight: 600; display: grid; place-items: center; margin-left: -6px; border: 2px solid var(--paper-2); font-family: var(--kc-font-mono); }

.kc-cursors { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.kc-cursor { position: absolute; top: 0; left: 0; transition: transform .08s linear; }
.kc-cursor-tag { position: absolute; top: 16px; left: 14px; color: white; font-size: 10px; font-family: var(--kc-font-mono); padding: 2px 6px; border-radius: 4px; white-space: nowrap; }

.kc-hero-marquee { margin-top: 80px; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); background: var(--paper-2); overflow: hidden; }
.kc-marquee-track { display: flex; gap: 40px; padding: 16px 0; white-space: nowrap; animation: kc-marquee 50s linear infinite; font-family: var(--kc-font-mono); font-size: 12px; color: var(--ink-2); }
.kc-marquee-item { display: inline-flex; align-items: center; gap: 8px; }
@keyframes kc-marquee { to { transform: translateX(-50%); } }

/* HOW */
.kc-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; border-top: 1px solid var(--line); }
.kc-step { padding: 32px 24px 36px; border-right: 1px solid var(--line); position: relative; min-height: 240px; display: grid; grid-template-rows: auto auto 1fr auto; gap: 14px; }
.kc-step:last-child { border-right: none; }
.kc-step-n { font-family: var(--kc-font-mono); font-size: 11px; color: var(--muted); letter-spacing: 0.12em; }
.kc-step-title { font-size: 26px; letter-spacing: -0.025em; font-weight: 600; color: var(--ink); }
.kc-step-s { color: var(--ink-2); font-size: 14px; line-height: 1.55; }
.kc-step-d { justify-self: start; }
@media (max-width: 860px) { .kc-steps { grid-template-columns: 1fr; } .kc-step { border-right: none; border-bottom: 1px solid var(--line); min-height: 0; } .kc-step:last-child { border-bottom: none; } }

/* WHAT YOU GET */
.kc-work-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
@media (max-width: 980px) { .kc-work-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .kc-work-grid { grid-template-columns: 1fr; } }
.kc-work-card { display: grid; grid-template-rows: auto auto; background: var(--surface); border: 1px solid var(--line); border-radius: 10px; overflow: hidden; transition: transform .3s ease, border-color .2s, box-shadow .3s; }
.kc-work-card:hover { transform: translateY(-3px); border-color: var(--line-2); box-shadow: 0 20px 40px -20px rgba(0,0,0,.4); }
.kc-work-top { padding: 14px 14px 0; }
.kc-work-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.kc-work-hero { position: relative; aspect-ratio: 4/3; border-radius: 6px; overflow: hidden; border: 1px solid var(--line); background: var(--paper-2); display: grid; grid-template-rows: 24px 1fr; }
.kc-tone-ochre .kc-work-hero { background: linear-gradient(135deg, #e9d6a3, #d4a44b); }
.kc-tone-sea .kc-work-hero { background: linear-gradient(135deg, #bfd4d8, #6f8f96); }
.kc-tone-copper .kc-work-hero { background: linear-gradient(135deg, #e8c4aa, #b4673e); }
.kc-tone-forest .kc-work-hero { background: linear-gradient(135deg, #bccab4, #586b4b); }
.kc-tone-plum .kc-work-hero { background: linear-gradient(135deg, #c8aab4, #7a4859); }
.kc-tone-cobalt .kc-work-hero { background: linear-gradient(135deg, #b6c0db, #4a5a82); }
.kc-work-chrome { display: flex; gap: 4px; align-items: center; padding: 0 10px; background: rgba(0,0,0,.12); }
.kc-work-chrome span { width: 7px; height: 7px; border-radius: 50%; background: rgba(0,0,0,.25); }
.kc-work-screen { padding: 18px; display: grid; gap: 8px; align-content: center; justify-items: center; color: rgba(0,0,0,.8); }
.kc-work-screen-title { font-family: var(--kc-font-display); font-size: 26px; font-weight: 700; letter-spacing: -0.03em; text-align: center; }
.kc-work-screen-stripes { display: grid; gap: 4px; width: 70%; }
.kc-work-screen-stripes div { height: 4px; background: rgba(0,0,0,.25); border-radius: 2px; }
.kc-work-screen-stripes div:nth-child(2) { width: 70%; }
.kc-work-screen-stripes div:nth-child(3) { width: 85%; }
.kc-work-screen-stripes div:nth-child(4) { width: 50%; }
.kc-work-bot { padding: 18px; }
.kc-work-title { font-size: 22px; margin-bottom: 4px; font-weight: 600; letter-spacing: -0.025em; color: var(--ink); }
.kc-work-desc { color: var(--ink-2); font-size: 13px; margin-bottom: 12px; line-height: 1.5; }
.kc-work-tags { display: flex; gap: 6px; flex-wrap: wrap; }
.kc-work-tag { font-family: var(--kc-font-mono); font-size: 10px; color: var(--muted); padding: 3px 8px; border: 1px solid var(--line); border-radius: 5px; }

/* PROCESS / CALENDAR */
.kc-cal { border: 1px solid var(--line); border-radius: 12px; overflow: hidden; background: var(--surface); box-shadow: 0 30px 60px -40px rgba(0,0,0,.5); }
.kc-cal-chrome { display: flex; justify-content: space-between; align-items: center; padding: 12px 18px; border-bottom: 1px solid var(--line); background: var(--paper-2); }
.kc-cal-chrome-l { display: flex; align-items: center; gap: 14px; }
.kc-cal-dots { display: flex; gap: 6px; }
.kc-cal-dots span { width: 10px; height: 10px; border-radius: 50%; background: var(--line-2); }
.kc-cal-dots span:nth-child(1) { background: #ff5f57; }
.kc-cal-dots span:nth-child(2) { background: #febc2e; }
.kc-cal-dots span:nth-child(3) { background: #28c840; }
.kc-cal-title { font-family: var(--kc-font-mono); font-size: 11px; color: var(--muted); }
.kc-cal-legend { display: flex; gap: 14px; font-family: var(--kc-font-mono); font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--muted); }
.kc-cal-legend span { display: inline-flex; align-items: center; gap: 6px; }
.kc-lg { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
.kc-lg-discover { background: color-mix(in srgb, var(--ink-2) 50%, transparent); }
.kc-lg-design { background: color-mix(in srgb, var(--accent) 55%, var(--ink-2)); }
.kc-lg-build { background: var(--accent); }
.kc-lg-ship { background: var(--accent); box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent) 25%, transparent); }
.kc-cal-dowrow { display: grid; grid-template-columns: 120px repeat(5, 1fr); border-bottom: 1px solid var(--line); background: var(--paper-2); }
.kc-cal-dow { padding: 10px 14px; font-family: var(--kc-font-mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); border-right: 1px solid var(--line); }
.kc-cal-dow:last-child { border-right: none; }
.kc-cal-dowrow::before { content: "Week"; padding: 10px 14px; font-family: var(--kc-font-mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); border-right: 1px solid var(--line); }
.kc-cal-week { display: grid; grid-template-columns: 120px 1fr; border-bottom: 1px solid var(--line); }
.kc-cal-week:last-child { border-bottom: none; }
.kc-cal-weeklabel { padding: 18px 14px; border-right: 1px solid var(--line); background: var(--paper-2); display: grid; gap: 6px; align-content: start; }
.kc-cal-weeknum { font-family: var(--kc-font-mono); font-size: 22px; font-weight: 600; color: var(--ink); letter-spacing: -0.02em; }
.kc-cal-weektext { font-family: var(--kc-font-mono); font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--muted); line-height: 1.4; }
.kc-cal-grid { display: grid; grid-template-columns: repeat(5, 1fr); }
.kc-cal-cell { padding: 14px 14px 16px; border-right: 1px solid var(--line); min-height: 150px; display: grid; grid-template-rows: auto auto 1fr auto; gap: 8px; position: relative; transition: background .2s; cursor: default; }
.kc-cal-cell:last-child { border-right: none; }
.kc-cal-cell.phase-ship { background: color-mix(in srgb, var(--accent) 7%, var(--surface)); }
.kc-cal-cell-milestone { background: color-mix(in srgb, var(--accent) 12%, var(--surface)); }
.kc-cal-cell-hover { background: color-mix(in srgb, var(--accent) 8%, var(--surface)); }
.kc-cal-cell-today { box-shadow: inset 0 0 0 2px var(--accent); }
.kc-cal-today-badge { font-family: var(--kc-font-mono); font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--accent); font-weight: 600; }
.kc-cal-cell-top { display: flex; justify-content: space-between; align-items: center; }
.kc-cal-num { font-family: var(--kc-font-mono); font-size: 20px; color: var(--ink); font-weight: 500; letter-spacing: -0.02em; }
.kc-cal-pill { font-family: var(--kc-font-mono); font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); padding: 3px 7px 3px 16px; border: 1px solid var(--line); border-radius: 999px; background: var(--paper); width: auto; height: auto; position: relative; }
.kc-cal-pill::before { content: ""; position: absolute; left: 6px; top: 50%; transform: translateY(-50%); width: 6px; height: 6px; border-radius: 50%; }
.kc-cal-pill.kc-lg-discover::before { background: color-mix(in srgb, var(--ink-2) 50%, transparent); }
.kc-cal-pill.kc-lg-design::before { background: color-mix(in srgb, var(--accent) 55%, var(--ink-2)); }
.kc-cal-pill.kc-lg-build::before { background: var(--accent); }
.kc-cal-pill.kc-lg-ship::before { background: var(--accent); box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent) 25%, transparent); }
.kc-cal-event { font-family: var(--kc-font-sans); font-size: 15px; font-weight: 600; letter-spacing: -0.015em; line-height: 1.25; color: var(--ink); }
.kc-cal-sub { font-size: 12px; line-height: 1.45; color: var(--ink-2); }
.kc-cal-milestone { font-family: var(--kc-font-mono); font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--accent); font-weight: 600; }
@media (max-width: 900px) {
  .kc-cal-dowrow, .kc-cal-week { grid-template-columns: 1fr; }
  .kc-cal-dowrow { display: none; }
  .kc-cal-weeklabel { border-right: none; border-bottom: 1px solid var(--line); }
  .kc-cal-grid { grid-template-columns: repeat(5, 1fr); }
  .kc-cal-cell { min-height: 130px; }
}
@media (max-width: 640px) {
  .kc-cal-grid { grid-template-columns: 1fr 1fr; }
  .kc-cal-cell { border-bottom: 1px solid var(--line); }
  .kc-cal-cell:nth-child(2n) { border-right: none; }
}

/* TECH STACK / TERMINAL */
.kc-stack-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 56px; align-items: center; }
@media (max-width: 960px) { .kc-stack-grid { grid-template-columns: 1fr; } }
.kc-stack-h { font-size: clamp(40px, 5vw, 72px); margin: 14px 0 20px; font-weight: 600; letter-spacing: -0.035em; }
.kc-stack-p { color: var(--ink-2); font-size: 16px; line-height: 1.55; max-width: 44ch; margin-bottom: 28px; }
.kc-stack-cats { display: grid; grid-template-columns: 1fr 1fr; gap: 22px 32px; margin-bottom: 28px; }
@media (max-width: 520px) { .kc-stack-cats { grid-template-columns: 1fr; } }
.kc-stack-cat-h { font-family: var(--kc-font-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid var(--line); }
.kc-stack-cat-items { display: flex; flex-wrap: wrap; gap: 5px; }
.kc-stack-chip { font-family: var(--kc-font-mono); font-size: 11px; padding: 4px 9px; border: 1px solid var(--line); border-radius: 4px; color: var(--ink-2); background: var(--surface); }
.kc-stack-note { display: grid; grid-template-columns: auto 1fr; gap: 12px; align-items: start; padding: 16px 18px; border: 1px solid var(--line); border-radius: 10px; background: color-mix(in srgb, var(--accent) 6%, var(--surface)); font-size: 13px; color: var(--ink-2); line-height: 1.55; max-width: 52ch; }
.kc-stack-note strong { color: var(--ink); font-weight: 600; }
.kc-stack-note code { font-family: var(--kc-font-mono); font-size: 11px; background: var(--paper-2); padding: 1px 5px; border-radius: 3px; border: 1px solid var(--line); }
.kc-stack-note-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); margin-top: 6px; box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 25%, transparent); }

.kc-terminal { background: #0a0a0a; color: #e6e6e6; border-radius: 10px; overflow: hidden; border: 1px solid #1f1f1f; box-shadow: 0 30px 60px -30px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.02) inset; font-family: var(--kc-font-mono); }
.kc-terminal-chrome { display: grid; grid-template-columns: auto 1fr auto; gap: 12px; align-items: center; padding: 10px 14px; background: #151515; border-bottom: 1px solid #000; }
.kc-terminal-title { text-align: center; font-size: 11px; color: #666; font-family: var(--kc-font-mono); }
.kc-terminal-body { padding: 18px 20px 22px; min-height: 380px; font-size: 12.5px; line-height: 1.75; }
.kc-term-line { display: flex; gap: 10px; }
.kc-term-out { color: #8a8a8a; }
.kc-term-prompt { color: #e6e6e6; }
.kc-term-accent { color: var(--accent); }
.kc-prompt { color: #34d399; font-weight: 600; }
.kc-cursor-blink { animation: kc-blink 1.1s steps(2) infinite; margin-left: 2px; color: var(--accent); }
@keyframes kc-blink { 50% { opacity: 0; } }

/* PRICING */
.kc-tiers { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; align-items: stretch; }
@media (max-width: 1100px) { .kc-tiers { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .kc-tiers { grid-template-columns: 1fr; } }
.kc-tier { background: var(--surface); border: 1px solid var(--line); border-radius: 12px; padding: 28px 26px 26px; display: grid; grid-template-rows: auto 1fr auto; gap: 20px; position: relative; }
.kc-tier-best { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 5%, var(--surface)); box-shadow: 0 30px 60px -30px rgba(0,0,0,.5); padding-top: 40px; }
.kc-tier-badge { position: absolute; top: -12px; left: 24px; font-family: var(--kc-font-mono); font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; background: var(--accent); color: var(--accent-ink); padding: 5px 10px; border-radius: 5px; font-weight: 600; white-space: nowrap; }
.kc-tier-top { display: grid; gap: 4px; }
.kc-tier-name { font-size: 16px; color: var(--ink-2); font-weight: 500; letter-spacing: -0.01em; }
.kc-tier-price { font-size: 48px; letter-spacing: -0.04em; line-height: 1.05; margin-top: 6px; font-weight: 600; color: var(--ink); }
.kc-tier-sub { font-family: var(--kc-font-mono); font-size: 10px; color: var(--muted); letter-spacing: 0.06em; text-transform: uppercase; margin-top: 6px; }
.kc-tier-desc { color: var(--ink-2); font-size: 13px; line-height: 1.5; margin-top: 12px; }
.kc-tier-features { list-style: none; padding: 0; margin: 0; display: grid; gap: 10px; border-top: 1px solid var(--line); padding-top: 20px; }
.kc-tier-features li { display: flex; gap: 10px; align-items: start; font-size: 13px; color: var(--ink-2); }
.kc-tier-features svg { margin-top: 3px; flex-shrink: 0; color: var(--accent); }

/* FAQ */
.kc-faq-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 56px; }
@media (max-width: 900px) { .kc-faq-grid { grid-template-columns: 1fr; } }
.kc-faq-h { font-size: clamp(40px, 5vw, 64px); margin: 14px 0 16px; font-weight: 600; letter-spacing: -0.035em; }
.kc-faq-p { color: var(--ink-2); font-size: 15px; line-height: 1.55; max-width: 38ch; }
.kc-link-underline { border-bottom: 1px solid var(--ink-2); }
.kc-link-underline:hover { color: var(--accent); border-color: var(--accent); }
.kc-faq-item { border-top: 1px solid var(--line); }
.kc-faq-item:last-child { border-bottom: 1px solid var(--line); }
.kc-faq-q { width: 100%; text-align: left; background: none; border: none; padding: 20px 0; display: grid; grid-template-columns: 36px 1fr auto; gap: 16px; align-items: center; font-family: var(--kc-font-sans); font-size: 18px; color: var(--ink); letter-spacing: -0.01em; font-weight: 500; cursor: pointer; }
.kc-faq-q:hover { color: var(--accent); }
.kc-faq-num { font-family: var(--kc-font-mono); font-size: 10px; color: var(--muted); letter-spacing: 0.06em; }
.kc-faq-plus { font-family: var(--kc-font-sans); font-size: 22px; color: var(--muted); width: 24px; text-align: center; font-weight: 300; }
.kc-faq-a { max-height: 0; overflow: hidden; transition: max-height .35s ease; }
.kc-faq-item.open .kc-faq-a { max-height: 400px; }
.kc-faq-a p { padding: 0 0 24px 52px; color: var(--ink-2); font-size: 14px; line-height: 1.65; margin: 0; max-width: 60ch; }

/* CTA */
.kc-cta-card { display: grid; grid-template-columns: 1fr 1.1fr; gap: 56px; background: var(--surface); border: 1px solid var(--line-2); border-radius: 14px; padding: 48px; }
@media (max-width: 900px) { .kc-cta-card { grid-template-columns: 1fr; padding: 32px 24px; gap: 32px; } }
.kc-cta-h { font-size: clamp(36px, 4.5vw, 56px); margin: 14px 0 18px; font-weight: 600; letter-spacing: -0.035em; }
.kc-cta-p { color: var(--ink-2); font-size: 15px; line-height: 1.55; max-width: 40ch; margin-bottom: 24px; }
.kc-cta-meta { display: flex; gap: 10px; flex-wrap: wrap; }
.kc-cta-form { display: grid; gap: 16px; }
.kc-form-row { display: grid; gap: 6px; }
.kc-form-row label { font-family: var(--kc-font-mono); font-size: 10px; color: var(--muted); letter-spacing: 0.06em; text-transform: uppercase; }
.kc-form-row input, .kc-form-row textarea { font-family: var(--kc-font-sans); font-size: 14px; background: var(--paper); border: 1px solid var(--line); border-radius: 8px; padding: 12px 14px; color: var(--ink); resize: vertical; }
.kc-form-row input:focus, .kc-form-row textarea:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 20%, transparent); }
.kc-form-chips { display: flex; gap: 8px; flex-wrap: wrap; }
.kc-form-chip { display: inline-flex; align-items: center; gap: 6px; padding: 8px 12px; border-radius: 6px; border: 1px solid var(--line); cursor: pointer; font-size: 13px; color: var(--ink-2); }
.kc-form-chip input { appearance: none; width: 12px; height: 12px; border-radius: 50%; border: 1px solid var(--line-2); margin: 0; }
.kc-form-chip input:checked { background: var(--accent); border-color: var(--accent); box-shadow: inset 0 0 0 2px var(--paper); }
.kc-form-chip:has(input:checked) { border-color: var(--accent); color: var(--ink); }
.kc-form-fine { font-family: var(--kc-font-mono); font-size: 10px; color: var(--muted); text-align: center; margin: 0; }
.kc-form-error { font-size: 13px; color: #ef4444; text-align: center; margin: 0; }
.kc-cta-success { padding: 40px 20px; text-align: center; display: grid; gap: 16px; }
.kc-cta-success p { color: var(--ink-2); max-width: 36ch; margin: 0 auto; line-height: 1.6; }
    `}</style>
  );
}
