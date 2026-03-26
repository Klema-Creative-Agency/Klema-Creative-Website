"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const TIME_EATERS = [
  "Chasing leads",
  "Following up manually",
  "Booking & scheduling",
  "Generating leads",
  "All of the above",
];

function DropdownCheckbox({
  options,
  selected,
  onToggle,
  error,
}: {
  options: string[];
  selected: string[];
  onToggle: (option: string) => void;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: Event) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const label =
    selected.length === 0
      ? "Select all that apply..."
      : selected.length === 1
      ? selected[0]
      : selected.length === 2
      ? "Stretched thin..."
      : selected.length === 3
      ? "Juggling a lot..."
      : selected.length === 4
      ? "Overwhelmed..."
      : "buried-help";

  return (
    <div className="flex flex-col gap-1.5" ref={ref}>
      <label className="text-[13px] text-[#9ca3af] font-medium">
        What eats most of your time?
      </label>
      <div
        className={`bg-[#1a1a1a] border rounded-xl overflow-hidden transition-colors duration-200 ${
          open ? "border-[#22c55e]" : "border-[#333333]"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={`w-full px-4 py-4 text-[16px] outline-none text-left flex items-center justify-between bg-transparent ${
            selected.length > 0 ? "text-white" : "text-[#555]"
          }`}
        >
          <span>
            {label === "buried-help" ? (
              <>
                <span className="font-bold">Buried</span>, <span className="marker-underline">help me fix that</span>
              </>
            ) : (
              label
            )}
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#555"
            strokeWidth="2"
            className={`transition-transform duration-200 shrink-0 ${open ? "rotate-180" : ""}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            maxHeight: open ? `${options.length * 52 + 1}px` : "0px",
            opacity: open ? 1 : 0,
          }}
        >
          {options.map((option) => {
            const checked = selected.includes(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => onToggle(option)}
                className="w-full flex items-center gap-3 px-4 py-3.5 text-[15px] text-left transition-colors duration-100 hover:bg-[#222] cursor-pointer"
              >
                <span
                  className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors duration-150 ${
                    checked
                      ? "bg-[#22c55e] border-[#22c55e]"
                      : "border-[#555] bg-transparent"
                  }`}
                >
                  {checked && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </span>
                <span className={checked ? "text-white" : "text-gray-300"}>
                  {option}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      {error && (
        <p className="text-red-400 text-[12px] mt-0.5">{error}</p>
      )}
    </div>
  );
}

const BUSINESS_KEYWORDS = [
  "company", "business", "practice", "firm", "agency", "clinic", "shop",
  "store", "service", "services", "studio", "group", "solutions", "inc",
  "llc", "corp", "co", "consulting", "contractors", "contractor",
  // Industries
  "hvac", "plumbing", "plumber", "roofing", "roofer", "electrical",
  "electrician", "dental", "dentist", "law", "lawyer", "attorney", "legal",
  "medical", "doctor", "chiropractic", "chiropractor", "veterinary", "vet",
  "accounting", "accountant", "cpa", "real estate", "realtor", "realty",
  "insurance", "landscaping", "landscaper", "cleaning", "maid",
  "pest control", "exterminator", "painting", "painter", "moving", "movers",
  "construction", "builder", "renovation", "remodeling", "flooring",
  "carpet", "auto", "mechanic", "body shop", "towing", "car wash",
  "salon", "barber", "spa", "fitness", "gym", "yoga", "photography",
  "photographer", "catering", "restaurant", "bakery", "cafe", "bar",
  "hotel", "motel", "property management", "handyman", "locksmith",
  "tutoring", "daycare", "childcare", "pet", "grooming", "boarding",
  "wedding", "event", "dj", "printing", "sign", "marketing", "design",
  "web", "it", "tech", "software", "staffing", "recruiting", "security",
  "janitorial", "pressure washing", "pool", "tree", "fencing", "garage",
  "door", "window", "solar", "appliance", "repair", "installation",
  "disposal", "waste", "hauling", "courier", "delivery", "freight",
  "trucking", "transport", "logistics", "wholesale", "retail", "ecommerce",
  "nonprofit", "church", "ministry", "foundation", "therapy", "therapist",
  "counseling", "counselor", "wellness", "health", "nursing", "home care",
  "senior", "assisted living", "pharmacy", "optical", "orthodont",
  "dermatolog", "pediatr", "plastic surg", "cosmetic", "medspa",
  "tattoo", "piercing", "tailor", "alteration", "dry clean", "laundry",
  "notary", "tax", "bookkeep", "financial", "invest", "mortgage", "loan",
  "bank", "credit union",
];

function looksLikeBusiness(value: string): boolean {
  const lower = value.toLowerCase().trim();
  if (lower.length < 3) return false;
  return BUSINESS_KEYWORDS.some((kw) => lower.includes(kw));
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  // Strip leading 1 if they typed it
  const clean = digits.startsWith("1") && digits.length > 10 ? digits.slice(1) : digits;
  if (clean.length <= 3) return clean;
  if (clean.length <= 6) return `(${clean.slice(0, 3)}) ${clean.slice(3)}`;
  return `(${clean.slice(0, 3)}) ${clean.slice(3, 6)}-${clean.slice(6, 10)}`;
}

function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  const clean = digits.startsWith("1") && digits.length === 11 ? digits.slice(1) : digits;
  return clean.length === 10;
}

export default function BookPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [business, setBusiness] = useState("");
  const [timeEaters, setTimeEaters] = useState<string[]>([]);
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [businessWarning, setBusinessWarning] = useState("");

  function toggleTimeEater(option: string) {
    if (option === "All of the above") {
      // If all are already selected, deselect all. Otherwise select all.
      setTimeEaters((prev) =>
        prev.length === TIME_EATERS.length ? [] : [...TIME_EATERS]
      );
    } else {
      setTimeEaters((prev) => {
        const next = prev.includes(option)
          ? prev.filter((t) => t !== option && t !== "All of the above")
          : [...prev, option];
        // If they've manually checked all 4 individual options, auto-check "All of the above"
        const individualsChecked = TIME_EATERS.filter((t) => t !== "All of the above").every((t) => next.includes(t));
        if (individualsChecked && !next.includes("All of the above")) {
          return [...next, "All of the above"];
        }
        return next;
      });
    }
    if (errors.timeEaters) {
      setErrors((prev) => ({ ...prev, timeEaters: "" }));
    }
  }

  function handlePhoneChange(value: string) {
    setPhone(formatPhone(value));
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  }

  function handleBusinessBlur() {
    if (business.trim().length >= 3 && !looksLikeBusiness(business)) {
      setBusinessWarning("Hmm, that doesn\u2019t look like a business type. Try something like \u201Cplumbing company\u201D or \u201Cdental practice.\u201D");
    } else {
      setBusinessWarning("");
    }
  }

  function handleBusinessChange(value: string) {
    setBusiness(value);
    if (businessWarning) setBusinessWarning("");
  }

  function handleNameChange(value: string) {
    setFullName(value);
    if (errors.fullName) {
      setErrors((prev) => ({ ...prev, fullName: "" }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Name: need at least first + last
    const nameParts = fullName.trim().split(/\s+/);
    if (nameParts.length < 2) {
      newErrors.fullName = "Please enter your first and last name.";
    }

    if (timeEaters.length === 0) {
      newErrors.timeEaters = "Pick at least one.";
    }

    if (!isValidPhone(phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const firstName = nameParts[0];
    const digits = phone.replace(/\D/g, "");
    const cleanDigits = digits.startsWith("1") && digits.length === 11 ? digits.slice(1) : digits;
    const formattedPhone = `+1${cleanDigits}`;

    localStorage.setItem(
      "klema-phase1",
      JSON.stringify({
        firstName,
        fullName: fullName.trim(),
        business,
        timeEaters,
        phone: formattedPhone,
      })
    );
    router.push("/book-call");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-[480px]">
        <h1 className="text-[clamp(28px,5vw,40px)] font-bold text-white leading-[1.15] tracking-[-1px] text-center mb-3">
          Let&apos;s see where AI saves you the most time.
        </h1>
        <p className="text-[#9ca3af] text-center text-[16px] mb-10">
          You&apos;re 30 seconds away from buying back your time.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] text-[#9ca3af] font-medium">
              What should we call you?
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="First and last name"
              className="w-full bg-[#1a1a1a] border border-[#333333] rounded-xl px-4 py-4 text-white text-[16px] placeholder:text-[#555] outline-none transition-colors duration-200 focus:border-[#22c55e]"
            />
            {errors.fullName && (
              <p className="text-red-400 text-[12px] mt-0.5">{errors.fullName}</p>
            )}
          </div>

          {/* Business */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] text-[#9ca3af] font-medium">
              What kind of business do you run?
            </label>
            <input
              type="text"
              required
              value={business}
              onChange={(e) => handleBusinessChange(e.target.value)}
              onBlur={handleBusinessBlur}
              placeholder="e.g., plumbing company, dental practice, law firm"
              className={`w-full bg-[#1a1a1a] border rounded-xl px-4 py-4 text-white text-[16px] placeholder:text-[#555] outline-none transition-colors duration-200 focus:border-[#22c55e] ${
                businessWarning ? "border-[#fbbf24]" : "border-[#333333]"
              }`}
            />
            {businessWarning && (
              <p className="text-[#fbbf24] text-[12px] mt-1">{businessWarning}</p>
            )}
          </div>

          {/* Time Eaters — Dropdown with checkboxes */}
          <DropdownCheckbox
            options={TIME_EATERS}
            selected={timeEaters}
            onToggle={toggleTimeEater}
            error={errors.timeEaters}
          />

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] text-[#9ca3af] font-medium">
              Best number to reach you
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#555] text-[16px] select-none">
                +1
              </span>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="(555) 123-4567"
                className="w-full bg-[#1a1a1a] border border-[#333333] rounded-xl pl-12 pr-4 py-4 text-white text-[16px] placeholder:text-[#555] outline-none transition-colors duration-200 focus:border-[#22c55e]"
              />
            </div>
            {errors.phone && (
              <p className="text-red-400 text-[12px] mt-0.5">{errors.phone}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#22c55e] text-black font-bold text-[16px] py-4 rounded-xl mt-2 transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] cursor-pointer"
          >
            Pick My Time &rarr;
          </button>
        </form>

        <p className="text-[13px] text-[#9ca3af] text-center mt-4">
          We&apos;ll talk about your business, not ours.
        </p>

        <p className="text-[11px] text-[#666] text-center mt-6 leading-relaxed max-w-[400px] mx-auto">
          By clicking &ldquo;Pick My Time,&rdquo; you consent to receive phone calls,
          SMS messages, and emails from Klema Creative. Message and data rates may
          apply. Consent is not a condition of purchase.{" "}
          <a href="/privacy" className="underline hover:text-[#9ca3af]">Privacy Policy</a>
          {" | "}
          <a href="/terms" className="underline hover:text-[#9ca3af]">Terms of Service</a>
        </p>
      </div>
    </div>
  );
}
