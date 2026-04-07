import { useState, useEffect, useCallback } from "react";
import { Menu, X, Zap, Phone } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#process" },
  { label: "Results", href: "#results" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[oklch(0.20_0.07_145)] shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" className="flex items-center gap-2 sm:gap-2.5 group">
            <Zap className="w-[1.125rem] h-[1.125rem] sm:w-[1.25rem] sm:h-[1.25rem] text-[var(--brand-lime)] shrink-0" strokeWidth={2.5} fill="var(--brand-lime)" />
            <span className="font-display text-[1.125rem] sm:text-[1.25rem] font-extrabold text-white tracking-tight">
              Klema Creative
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/70 hover:text-white font-body text-[0.875rem] font-medium transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+1-210-974-9386"
              className="text-white/60 hover:text-white font-body text-[0.8125rem] font-medium transition-colors duration-200 flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" strokeWidth={2} />
              (210) 974-9386
            </a>
            <a href="#contact" className="btn-primary text-sm py-2.5 px-5">
              Free Lead Audit
            </a>
          </div>

          {/* Mobile: phone + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="tel:+1-210-974-9386"
              className="text-white/70 p-2.5 rounded-md hover:bg-white/10 transition-colors"
              aria-label="Call us"
            >
              <Phone className="w-5 h-5" strokeWidth={2} />
            </a>
            <button
              className="text-white p-2.5 -mr-2.5 rounded-md hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu -- full height overlay */}
      <div
        className={`md:hidden fixed inset-x-0 top-16 bottom-0 bg-[oklch(0.18_0.06_145)] transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="container py-6 flex flex-col gap-1 h-full">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white/80 hover:text-white font-body text-[1.0625rem] font-medium py-4 border-b border-white/10 active:bg-white/5 transition-colors"
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-auto pb-[env(safe-area-inset-bottom,1rem)]">
            <a href="#contact" className="btn-primary w-full justify-center text-base" onClick={closeMenu}>
              Free Lead Audit
            </a>
            <p className="text-white/30 text-center text-[0.8125rem] font-body mt-4">
              (210) 974-9386
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}
