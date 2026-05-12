import { useState, useRef, useEffect } from "react";
import { ArrowRight, Shield, ChevronDown, Check } from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";

const trades = [
  { value: "hvac", label: "HVAC" },
  { value: "plumbing", label: "Plumbing" },
  { value: "roofing", label: "Roofing" },
  { value: "electrical", label: "Electrical" },
  { value: "landscaping", label: "Landscaping" },
  { value: "pest", label: "Pest Control" },
  { value: "other", label: "Other" },
];

function TradeDropdown({ value, onChange, idPrefix }: { value: string; onChange: (val: string) => void; idPrefix: string }) {
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
      <label className="text-[0.8125rem] mb-2 block font-body font-medium" style={{ color: "#334155" }}>
        Your Trade *
      </label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full rounded-md px-4 py-3.5 text-left font-body text-base leading-normal min-h-[48px] flex items-center justify-between transition-colors ${
          open
            ? "border-[var(--brand-lime)] ring-1 ring-[var(--brand-lime)]/30"
            : "border-[#cbd5e1]"
        }`}
        style={{ backgroundColor: "#f1f5f9", borderWidth: "1.5px", borderStyle: "solid" }}
      >
        <span style={{ color: selected ? "#1e293b" : "#94a3b8" }}>
          {selected ? selected.label : "Select your trade"}
        </span>
        <ChevronDown className="w-4 h-4 transition-transform duration-200" style={{ color: "#94a3b8", transform: open ? "rotate(180deg)" : undefined }} />
      </button>

      {open && (
        <div
          className="absolute z-20 left-0 right-0 mt-1.5 rounded-md overflow-hidden shadow-xl"
          style={{ background: "#ffffff", border: "1.5px solid #e2e8f0" }}
        >
          {trades.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => { onChange(t.value); setOpen(false); }}
              className="w-full px-4 py-3 text-left text-[0.875rem] font-body font-medium flex items-center justify-between transition-colors min-h-[44px]"
              style={{
                color: value === t.value ? "var(--brand-lime)" : "#334155",
                backgroundColor: value === t.value ? "#f1f5f9" : undefined,
              }}
              onMouseEnter={(e) => { if (value !== t.value) e.currentTarget.style.backgroundColor = "#f1f5f9"; }}
              onMouseLeave={(e) => { if (value !== t.value) e.currentTarget.style.backgroundColor = ""; }}
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

export default function ContactForm({ idPrefix = "contact" }: { idPrefix?: string }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    trade: "",
    email: "",
    message: "",
  });
  // A2P 10DLC / TCPA compliance:
  //  - Transactional SMS consent: REQUIRED (we need it to confirm the audit/appointment).
  //  - Marketing SMS consent: OPTIONAL (TCPA prohibits making marketing a condition of service).
  // Both unchecked by default. Both captured on Step 1 alongside the phone field.
  // Both values are sent to the backend so the opt-in record is provable in a TCPA dispute.
  const [smsTransactionalConsent, setSmsTransactionalConsent] = useState(false);
  const [smsMarketingConsent, setSmsMarketingConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!smsTransactionalConsent) {
      toast.error("Please confirm the transactional SMS consent to continue.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          smsTransactionalConsent,
          smsMarketingConsent,
          consentTimestamp: new Date().toISOString(),
          consentSource: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("We'll email your custom audit within 24 hours and give you a call to walk through it.");
      setForm({ name: "", phone: "", trade: "", email: "", message: "" });
      setSmsTransactionalConsent(false);
      setSmsMarketingConsent(false);
      setStep(1);
    } catch {
      toast.error("Something went wrong. Please call us at (210) 974-9386.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!smsTransactionalConsent) {
      toast.error("Please confirm the transactional SMS consent to continue.");
      return;
    }
    setStep(2);
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const inputClass =
    "w-full rounded-md px-4 py-3.5 focus:outline-none focus:border-[var(--brand-lime)] focus:ring-1 focus:ring-[var(--brand-lime)]/30 transition-colors text-base font-body leading-normal min-h-[48px]";

  const inputStyle = {
    backgroundColor: "#f1f5f9",
    border: "1.5px solid #cbd5e1",
    color: "#1e293b",
  };

  return (
    <div className="rounded-2xl p-7 sm:p-9" style={{ backgroundColor: "#ffffff", boxShadow: "0 8px 32px rgba(0,0,0,0.25)" }}>
      {/* Progress indicator */}
      <div className="flex items-center gap-3 mb-6 sm:mb-7">
        <div className="flex items-center gap-2 flex-1">
          <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[0.75rem] sm:text-[0.8125rem] font-display font-bold shrink-0 ${
            step >= 1 ? "bg-[var(--brand-lime)] text-[var(--brand-charcoal)]" : ""
          }`} style={step < 1 ? { backgroundColor: "#e2e8f0", color: "#94a3b8" } : undefined}>
            1
          </div>
          <div className="h-px flex-1 transition-colors duration-300" style={{ backgroundColor: step >= 2 ? "var(--brand-lime)" : "#e2e8f0" }} />
        </div>
        <div className="flex items-center gap-2 flex-1">
          <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[0.75rem] sm:text-[0.8125rem] font-display font-bold shrink-0 transition-colors duration-300 ${
            step >= 2 ? "bg-[var(--brand-lime)] text-[var(--brand-charcoal)]" : ""
          }`} style={step < 2 ? { backgroundColor: "#e2e8f0", color: "#94a3b8" } : undefined}>
            2
          </div>
          <div className="h-px flex-1" style={{ backgroundColor: "#e2e8f0" }} />
        </div>
      </div>

      <h3 className="mb-1.5 font-bold text-[1.125rem] sm:text-[1.3125rem] leading-tight" style={{ color: "#0f172a" }}>
        {step === 1 ? "Apply for Your Free Audit" : "Almost Done"}
      </h3>
      <p className="text-[0.75rem] sm:text-[0.8125rem] font-body mb-5 sm:mb-6" style={{ color: "#64748b" }}>
        {step === 1 ? "Step 1 of 2: Tell us who you are" : "Step 2 of 2: How can we reach you?"}
      </p>

      {step === 1 ? (
        <form onSubmit={handleStep1} className="flex flex-col gap-4 sm:gap-5">
          <div>
            <label htmlFor={`${idPrefix}-name`} className="text-[0.8125rem] mb-2 block font-body font-medium" style={{ color: "#334155" }}>
              Your Name *
            </label>
            <input
              id={`${idPrefix}-name`}
              type="text"
              required
              placeholder="John Smith"
              className={inputClass}
              style={inputStyle}
              value={form.name}
              onChange={handleChange("name")}
            />
          </div>

          <div>
            <label htmlFor={`${idPrefix}-phone`} className="text-[0.8125rem] mb-2 block font-body font-medium" style={{ color: "#334155" }}>
              Phone Number *
            </label>
            <input
              id={`${idPrefix}-phone`}
              type="tel"
              inputMode="tel"
              required
              placeholder="(210) 555-0000"
              className={inputClass}
              style={inputStyle}
              value={form.phone}
              onChange={handleChange("phone")}
            />
          </div>

          <TradeDropdown
            value={form.trade}
            onChange={(val) => setForm((prev) => ({ ...prev, trade: val }))}
            idPrefix={idPrefix}
          />

          {/* A2P 10DLC / TCPA compliance: TRANSACTIONAL SMS consent (unchecked by default, REQUIRED). */}
          <label
            htmlFor={`${idPrefix}-sms-transactional-consent`}
            className="flex items-start gap-3 p-4 rounded-md cursor-pointer transition-colors"
            style={{
              backgroundColor: "#f8fafc",
              border: `1.5px solid ${smsTransactionalConsent ? "var(--brand-lime)" : "#cbd5e1"}`,
            }}
          >
            <input
              id={`${idPrefix}-sms-transactional-consent`}
              type="checkbox"
              required
              checked={smsTransactionalConsent}
              onChange={(e) => setSmsTransactionalConsent(e.target.checked)}
              className="mt-0.5 w-[18px] h-[18px] shrink-0 cursor-pointer accent-[var(--brand-lime)]"
              aria-required="true"
            />
            <span className="text-[0.75rem] sm:text-[0.8125rem] font-body leading-[1.55]" style={{ color: "#475569" }}>
              By checking this box, I consent to receive appointment reminders, scheduled call confirmations, and account-related SMS messages from Klema Creative at the phone number provided. Messaging frequency may vary. Message and data rates may apply. You can opt out any time by texting <strong style={{ color: "#0f172a" }}>STOP</strong>. For assistance, text <strong style={{ color: "#0f172a" }}>HELP</strong> or visit our website at klemacreative.com. Visit{" "}
              <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: "#0f172a", fontWeight: 600 }}>https://klemacreative.com/privacy-policy</a>
              {" "}for privacy policy and{" "}
              <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" style={{ color: "#0f172a", fontWeight: 600 }}>https://klemacreative.com/terms-and-conditions</a>
              {" "}for Terms of Service.
            </span>
          </label>

          {/* A2P 10DLC / TCPA compliance: MARKETING SMS consent (unchecked by default, OPTIONAL).
              Marketing opt-in CANNOT be made a condition of submitting the form. */}
          <label
            htmlFor={`${idPrefix}-sms-marketing-consent`}
            className="flex items-start gap-3 p-4 rounded-md cursor-pointer transition-colors"
            style={{
              backgroundColor: "#f8fafc",
              border: `1.5px solid ${smsMarketingConsent ? "var(--brand-lime)" : "#cbd5e1"}`,
            }}
          >
            <input
              id={`${idPrefix}-sms-marketing-consent`}
              type="checkbox"
              checked={smsMarketingConsent}
              onChange={(e) => setSmsMarketingConsent(e.target.checked)}
              className="mt-0.5 w-[18px] h-[18px] shrink-0 cursor-pointer accent-[var(--brand-lime)]"
            />
            <span className="text-[0.75rem] sm:text-[0.8125rem] font-body leading-[1.55]" style={{ color: "#475569" }}>
              <span style={{ color: "#64748b", fontWeight: 600 }}>(Optional) </span>By checking this box, I consent to receive promotional offers, service updates, and marketing SMS messages from Klema Creative at the phone number provided. Messaging frequency may vary. Message and data rates may apply. You can opt out any time by texting <strong style={{ color: "#0f172a" }}>STOP</strong>. For assistance, text <strong style={{ color: "#0f172a" }}>HELP</strong> or visit our website at klemacreative.com. Visit{" "}
              <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: "#0f172a", fontWeight: 600 }}>https://klemacreative.com/privacy-policy</a>
              {" "}for privacy policy and{" "}
              <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" style={{ color: "#0f172a", fontWeight: 600 }}>https://klemacreative.com/terms-and-conditions</a>
              {" "}for Terms of Service.
            </span>
          </label>

          {/* Privacy Policy and Terms hyperlinks shown as plain text (not a checkbox). */}
          <p className="text-[0.6875rem] sm:text-[0.75rem] font-body leading-snug -mt-1" style={{ color: "#64748b" }}>
            For more information, view our{" "}
            <Link
              href="/privacy-policy"
              className="hover:underline"
              style={{ color: "#0f172a", fontWeight: 600 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link
              href="/terms"
              className="hover:underline"
              style={{ color: "#0f172a", fontWeight: 600 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </Link>
            .
          </p>

          <button
            type="submit"
            disabled={!form.name || !form.phone || !form.trade || !smsTransactionalConsent}
            className="btn-primary w-full justify-center mt-1 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
          <div>
            <label htmlFor={`${idPrefix}-email`} className="text-[0.8125rem] mb-2 block font-body font-medium" style={{ color: "#334155" }}>
              Email Address *
            </label>
            <input
              id={`${idPrefix}-email`}
              type="email"
              required
              placeholder="john@smithplumbing.com"
              className={inputClass}
              style={inputStyle}
              value={form.email}
              onChange={handleChange("email")}
            />
          </div>

          <div>
            <label htmlFor={`${idPrefix}-message`} className="text-[0.8125rem] mb-2 block font-body font-medium" style={{ color: "#334155" }}>
              Biggest marketing challenge? (optional)
            </label>
            <textarea
              id={`${idPrefix}-message`}
              rows={3}
              placeholder="e.g., low quality leads, not showing up on Google..."
              className={`${inputClass} resize-none`}
              style={inputStyle}
              value={form.message}
              onChange={handleChange("message")}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="justify-center py-3 flex-1 text-sm rounded-md font-semibold transition-colors"
              style={{ border: "1.5px solid #cbd5e1", color: "#334155", backgroundColor: "transparent" }}
            >
              Back
            </button>
            <button type="submit" disabled={submitting || !smsTransactionalConsent} className="btn-primary justify-center py-3 flex-[2] text-sm disabled:opacity-60 disabled:cursor-not-allowed">
              {submitting ? "Sending..." : "Get My Free Audit"}
              {!submitting && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </form>
      )}

      {/* Trust element */}
      <div className="flex items-start sm:items-center gap-2.5 mt-5 sm:mt-6 pt-4 sm:pt-5" style={{ borderTop: "1px solid #e2e8f0" }}>
        <Shield className="w-4 h-4 text-[var(--brand-lime)] shrink-0 mt-0.5 sm:mt-0" strokeWidth={2} />
        <p className="text-[0.75rem] sm:text-[0.8125rem] font-body leading-snug" style={{ color: "#64748b" }}>
          We'll email your custom audit within 24 hours and follow up with a quick call.
        </p>
      </div>
    </div>
  );
}
