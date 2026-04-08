import { useState, useRef, useEffect } from "react";
import { ArrowRight, Phone, Mail, MapPin, Shield, Clock, Users, Star, ChevronDown, Check } from "lucide-react";
import { toast } from "sonner";
import { useReveal } from "@/hooks/useReveal";

const trades = [
  { value: "hvac", label: "HVAC" },
  { value: "plumbing", label: "Plumbing" },
  { value: "roofing", label: "Roofing" },
  { value: "electrical", label: "Electrical" },
  { value: "landscaping", label: "Landscaping" },
  { value: "pest", label: "Pest Control" },
  { value: "other", label: "Other" },
];

const foundingBenefits = [
  { icon: Shield, text: "Locked-in founding pricing" },
  { icon: Clock, text: "Direct founder access" },
  { icon: Users, text: "Only 5 spots per month" },
  { icon: Star, text: "Shape the service with us" },
];

function TradeDropdown({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = trades.find((t) => t.value === value);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <label className="text-white/60 text-[0.8125rem] mb-2 block font-body font-medium">
        Your Trade *
      </label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full bg-white/[0.08] border rounded-md px-4 py-3.5 text-left font-body text-base leading-normal min-h-[48px] flex items-center justify-between transition-colors ${
          open
            ? "border-[var(--brand-lime)] ring-1 ring-[var(--brand-lime)]/30"
            : "border-white/15"
        }`}
      >
        <span className={selected ? "text-white" : "text-white/35"}>
          {selected ? selected.label : "Select your trade"}
        </span>
        <ChevronDown className={`w-4 h-4 text-white/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          className="absolute z-20 left-0 right-0 mt-1.5 rounded-md border border-white/15 overflow-hidden shadow-xl"
          style={{ background: "oklch(0.22 0.07 145)" }}
        >
          {trades.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => { onChange(t.value); setOpen(false); }}
              className={`w-full px-4 py-3 text-left text-[0.875rem] font-body font-medium flex items-center justify-between transition-colors min-h-[44px] ${
                value === t.value
                  ? "text-[var(--brand-lime)] bg-white/[0.06]"
                  : "text-white/70 hover:bg-white/[0.06] active:bg-white/[0.1]"
              }`}
            >
              {t.label}
              {value === t.value && <Check className="w-4 h-4 text-[var(--brand-lime)]" strokeWidth={2.5} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ContactSection() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    trade: "",
    email: "",
    message: "",
  });
  const { ref, visible } = useReveal();

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("We'll email your custom audit within 24 hours and give you a call to walk through it.");
      setForm({ name: "", phone: "", trade: "", email: "", message: "" });
      setStep(1);
    } catch {
      toast.error("Something went wrong. Please call us at (210) 974-9386.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const inputClass =
    "w-full bg-white/[0.08] border border-white/15 rounded-md px-4 py-3.5 text-white placeholder-white/35 focus:outline-none focus:border-[var(--brand-lime)] focus:ring-1 focus:ring-[var(--brand-lime)]/30 transition-colors text-base font-body leading-normal min-h-[48px]";

  return (
    <section id="contact" className="dark-section py-16 sm:py-24">
      <div className="container">
        {/* Founding Client intro -- visible on all screens */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-6 sm:w-8 h-px bg-[var(--brand-lime)]" />
            <span className="section-label text-[var(--brand-lime)]">
              Limited Availability
            </span>
            <div className="w-6 sm:w-8 h-px bg-[var(--brand-lime)]" />
          </div>
          <h2
            className="text-white font-extrabold mb-4 sm:mb-5"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.625rem)", letterSpacing: "-0.025em", lineHeight: 1.15 }}
          >
            Founding Client Program
          </h2>
          <p className="text-white/70 font-body text-[0.9375rem] sm:text-[1.0625rem] leading-[1.65] sm:leading-[1.7] max-w-2xl mx-auto mb-8 sm:mb-10">
            We're looking for a small group of founding clients to grow with. You get our best
            pricing and direct attention. We get partners who help us refine the service.
          </p>

          {/* Founding benefits -- compact horizontal strip */}
          <div className="grid grid-cols-2 sm:flex sm:justify-center gap-3 sm:gap-6 max-w-2xl mx-auto">
            {foundingBenefits.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 sm:gap-2.5">
                <Icon className="w-4 h-4 sm:w-[1.125rem] sm:h-[1.125rem] text-[var(--brand-lime)] shrink-0" strokeWidth={2} />
                <span className="text-white/60 text-[0.75rem] sm:text-[0.8125rem] font-body font-medium text-left leading-tight">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form area */}
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start max-w-5xl mx-auto">
          {/* Left: details -- desktop only */}
          <div className={`hidden lg:block reveal-left ${visible ? "revealed" : ""}`}>
            <h3
              className="text-white mb-5 font-extrabold"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", letterSpacing: "-0.025em", lineHeight: 1.15 }}
            >
              Get Your Free
              <br />
              <span className="text-[var(--brand-lime)]">Lead Audit Today</span>
            </h3>

            <p className="text-white/70 mb-8 font-body text-[1.0625rem] leading-[1.7]">
              Fill out the form and we'll run a complete analysis of your online
              presence: your Google rankings, ad performance, website speed,
              and where your competitors are beating you. No cost, no obligation.
            </p>

            <div className="flex flex-col gap-4 mb-8">
              {[
                "A full SEO audit of your website and local rankings",
                "Analysis of your Google Business Profile",
                "Competitor gap analysis for the San Antonio market",
                "A custom growth roadmap with clear next steps",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-sm flex items-center justify-center shrink-0 mt-0.5 bg-[oklch(0.74_0.21_130_/_0.2)]">
                    <ArrowRight className="w-3 h-3 text-[var(--brand-lime)]" strokeWidth={2.5} />
                  </div>
                  <span className="text-white/70 text-[0.9375rem] font-body leading-snug">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3.5 border-t border-white/10 pt-8">
              {[
                { icon: Phone, text: "(210) 974-9386", href: "tel:+1-210-974-9386" },
                { icon: Mail, text: "tamaya@klemacreative.com", href: "mailto:tamaya@klemacreative.com" },
                { icon: MapPin, text: "Based in San Antonio, TX", href: undefined },
              ].map(({ icon: Icon, text, href }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-[var(--brand-lime)]" strokeWidth={2} />
                  {href ? (
                    <a href={href} className="text-white/55 hover:text-white/80 text-[0.875rem] font-body transition-colors">
                      {text}
                    </a>
                  ) : (
                    <span className="text-white/55 text-[0.875rem] font-body">{text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: 2-Step Form */}
          <div className={`reveal-up ${visible ? "revealed" : ""}`} style={{ transitionDelay: "0.15s" }}>
            <div className="rounded-lg p-6 sm:p-8 lg:p-9" style={{ background: "oklch(0.24 0.08 145)" }}>
              {/* Progress indicator */}
              <div className="flex items-center gap-3 mb-6 sm:mb-7">
                <div className="flex items-center gap-2 flex-1">
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[0.75rem] sm:text-[0.8125rem] font-display font-bold shrink-0 ${
                    step >= 1 ? "bg-[var(--brand-lime)] text-[var(--brand-charcoal)]" : "bg-white/10 text-white/40"
                  }`}>
                    1
                  </div>
                  <div className={`h-px flex-1 transition-colors duration-300 ${step >= 2 ? "bg-[var(--brand-lime)]" : "bg-white/10"}`} />
                </div>
                <div className="flex items-center gap-2 flex-1">
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[0.75rem] sm:text-[0.8125rem] font-display font-bold shrink-0 transition-colors duration-300 ${
                    step >= 2 ? "bg-[var(--brand-lime)] text-[var(--brand-charcoal)]" : "bg-white/10 text-white/40"
                  }`}>
                    2
                  </div>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
              </div>

              <h3 className="text-white mb-1.5 font-bold text-[1.125rem] sm:text-[1.3125rem] leading-tight">
                {step === 1 ? "Apply for Your Free Audit" : "Almost Done"}
              </h3>
              <p className="text-white/40 text-[0.75rem] sm:text-[0.8125rem] font-body mb-5 sm:mb-6">
                {step === 1 ? "Step 1 of 2: Tell us who you are" : "Step 2 of 2: How can we reach you?"}
              </p>

              {step === 1 ? (
                <form onSubmit={handleStep1} className="flex flex-col gap-4 sm:gap-5">
                  <div>
                    <label htmlFor="contact-name" className="text-white/60 text-[0.8125rem] mb-2 block font-body font-medium">
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="John Smith"
                      className={inputClass}
                      value={form.name}
                      onChange={handleChange("name")}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="text-white/60 text-[0.8125rem] mb-2 block font-body font-medium">
                      Phone Number *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      inputMode="tel"
                      required
                      placeholder="(210) 555-0000"
                      className={inputClass}
                      value={form.phone}
                      onChange={handleChange("phone")}
                    />
                  </div>

                  <TradeDropdown
                    value={form.trade}
                    onChange={(val) => setForm((prev) => ({ ...prev, trade: val }))}
                  />

                  <button
                    type="submit"
                    disabled={!form.name || !form.phone || !form.trade}
                    className="btn-primary w-full justify-center mt-1 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
                  <div>
                    <label htmlFor="contact-email" className="text-white/60 text-[0.8125rem] mb-2 block font-body font-medium">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="john@smithplumbing.com"
                      className={inputClass}
                      value={form.email}
                      onChange={handleChange("email")}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="text-white/60 text-[0.8125rem] mb-2 block font-body font-medium">
                      Biggest marketing challenge? (optional)
                    </label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      placeholder="e.g., low quality leads, not showing up on Google..."
                      className={`${inputClass} resize-none`}
                      value={form.message}
                      onChange={handleChange("message")}
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="btn-outline-white justify-center py-3 flex-1 text-sm"
                    >
                      Back
                    </button>
                    <button type="submit" disabled={submitting} className="btn-primary justify-center py-3 flex-[2] text-sm disabled:opacity-60 disabled:cursor-not-allowed">
                      {submitting ? "Sending..." : "Get My Free Audit"}
                      {!submitting && <ArrowRight className="w-4 h-4" />}
                    </button>
                  </div>
                </form>
              )}

              {/* Trust element */}
              <div className="flex items-start sm:items-center gap-2.5 mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-white/[0.06]">
                <Shield className="w-4 h-4 text-[var(--brand-lime)] shrink-0 mt-0.5 sm:mt-0" strokeWidth={2} />
                <p className="text-white/35 text-[0.75rem] sm:text-[0.8125rem] font-body leading-snug">
                  We'll email your custom audit within 24 hours and follow up with a quick call.
                </p>
              </div>
            </div>

            {/* Mobile-only contact info below form */}
            <div className="lg:hidden flex items-center justify-center gap-6 mt-6 pt-6 border-t border-white/10">
              <a href="tel:+1-210-974-9386" className="flex items-center gap-2 text-white/50 text-[0.8125rem] font-body">
                <Phone className="w-3.5 h-3.5 text-[var(--brand-lime)]" strokeWidth={2} />
                (210) 974-9386
              </a>
              <a href="mailto:tamaya@klemacreative.com" className="flex items-center gap-2 text-white/50 text-[0.8125rem] font-body">
                <Mail className="w-3.5 h-3.5 text-[var(--brand-lime)]" strokeWidth={2} />
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
