import { useEffect, useState } from "react";
import { Phone, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileStickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past ~80% of first viewport
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="md:hidden fixed bottom-0 left-0 right-0 z-40"
          initial={{ y: "120%" }}
          animate={{ y: 0 }}
          exit={{ y: "120%" }}
          transition={{ type: "spring", damping: 26, stiffness: 280 }}
          style={{
            paddingBottom: "env(safe-area-inset-bottom, 0px)",
            backgroundColor: "rgba(15, 22, 40, 0.95)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div className="flex items-center gap-2.5 px-3 py-2.5">
            <a
              href="tel:+1-210-974-9386"
              className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-md border-2 border-[var(--brand-lime)]/50 text-white font-display font-semibold text-[0.875rem] active:bg-[var(--brand-lime)]/10 transition-colors shrink-0"
              aria-label="Call (210) 974-9386"
            >
              <Phone className="w-4 h-4" strokeWidth={2.5} />
              Call
            </a>
            <a
              href="#contact"
              className="btn-primary flex-1 justify-center text-[0.9375rem] py-3"
            >
              Free Lead Audit
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
