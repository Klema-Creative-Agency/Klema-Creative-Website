import { useState, useEffect, useCallback } from "react";
import { Zap, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Services", subtitle: "Pricing + packages", href: "/services" },
  { label: "Solution", subtitle: "How we solve it", href: "/#solution" },
  { label: "How It Works", subtitle: "Our 4-step process", href: "/#process" },
  { label: "What to Expect", subtitle: "The Klema Promise", href: "/#promise" },
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
    <>
      {/* Item 1: Permanent dark gradient — keeps logo legible over bright cycling photos */}
      <div
        aria-hidden
        className="fixed top-0 left-0 right-0 h-24 z-40 pointer-events-none md:hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0) 100%)",
        }}
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isOpen
            ? "bg-[oklch(0.18_0.06_240)]"
            : scrolled
            ? "bg-[oklch(0.20_0.07_240)] shadow-lg shadow-black/20"
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

            {/* Mobile: phone + morphing hamburger */}
            <div className="flex md:hidden items-center gap-2">
              <a
                href="tel:+1-210-974-9386"
                className="text-white/85 p-2.5 rounded-md hover:bg-white/10 transition-colors"
                aria-label="Call us"
              >
                <Phone className="w-5 h-5" strokeWidth={2} />
              </a>
              {/* Item 2: Custom morphing hamburger ↔ X */}
              <button
                className="text-white p-2.5 -mr-2.5 rounded-md hover:bg-white/10 transition-colors w-11 h-11 flex items-center justify-center"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                <div className="relative w-5 h-4">
                  <span
                    className={`absolute left-0 top-0 w-full h-0.5 bg-current rounded-full transition-all duration-300 ease-out ${
                      isOpen ? "translate-y-[7px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-[7px] w-full h-0.5 bg-current rounded-full transition-all duration-200 ${
                      isOpen ? "opacity-0 scale-x-0" : ""
                    }`}
                  />
                  <span
                    className={`absolute left-0 bottom-0 w-full h-0.5 bg-current rounded-full transition-all duration-300 ease-out ${
                      isOpen ? "-translate-y-[7px] -rotate-45" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Item 4 + 7: Mobile menu — slide-in from right with backdrop blur */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              className="md:hidden fixed inset-x-0 top-16 bottom-0"
              style={{
                backgroundColor: "rgba(15, 22, 40, 0.92)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
            >
              <div className="container py-5 flex flex-col h-full">
                {/* Item 5: Pulsing dot status line */}
                <div className="flex items-center gap-2.5 pb-4 mb-2 border-b border-white/10">
                  <span className="relative flex shrink-0 w-2 h-2">
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-[var(--brand-lime)]"
                      animate={{ opacity: [0.6, 0, 0.6], scale: [1, 2.5, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                    />
                    <motion.span
                      className="relative w-2 h-2 rounded-full bg-[var(--brand-lime)]"
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </span>
                  <span className="text-white/85 text-[0.8125rem] font-body font-medium">
                    Now booking 5 founding clients this month
                  </span>
                </div>

                {/* Item 6: Nav items with subtitles */}
                <div className="flex flex-col gap-0.5">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="flex flex-col py-3.5 border-b border-white/5 active:bg-white/5 transition-colors"
                      onClick={closeMenu}
                    >
                      <span className="text-white text-[1.0625rem] font-body font-semibold leading-tight">
                        {link.label}
                      </span>
                      <span className="text-white/40 text-[0.8125rem] font-body mt-0.5">
                        {link.subtitle}
                      </span>
                    </a>
                  ))}
                </div>

                {/* Item 3: Bottom CTAs — Free Audit + tappable Call button */}
                <div className="mt-auto pb-[env(safe-area-inset-bottom,1rem)] flex flex-col gap-3 pt-6">
                  <a
                    href="#contact"
                    className="btn-primary w-full justify-center text-base"
                    onClick={closeMenu}
                  >
                    Free Lead Audit
                  </a>
                  <a
                    href="tel:+1-210-974-9386"
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-md font-display font-semibold text-[0.9375rem] text-white border-2 border-[var(--brand-lime)]/50 active:bg-[var(--brand-lime)]/10 transition-colors"
                    onClick={closeMenu}
                  >
                    <Phone className="w-4 h-4" strokeWidth={2.5} />
                    Call (210) 974-9386
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
