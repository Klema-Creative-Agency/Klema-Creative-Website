import { Zap } from "lucide-react";
import { Link } from "wouter";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer
      className="py-10 sm:py-14 border-t"
      style={{ background: "oklch(0.16 0.06 240)", borderColor: "oklch(1 0 0 / 0.08)" }}
    >
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
              <Zap className="w-[1.125rem] h-[1.125rem] sm:w-[1.25rem] sm:h-[1.25rem] text-[var(--brand-lime)] shrink-0" strokeWidth={2.5} fill="var(--brand-lime)" />
              <span className="text-white font-display font-extrabold text-[1.125rem] sm:text-[1.25rem]">
                Klema Creative
              </span>
            </div>
            <p className="text-white/45 text-[0.8125rem] sm:text-[0.9375rem] leading-[1.6] sm:leading-[1.7] max-w-xs font-body">
              San Antonio's marketing agency built exclusively for home service contractors.
            </p>
          </div>

          <div>
            <h4 className="text-white text-[0.8125rem] sm:text-[0.875rem] font-display font-bold mb-4 sm:mb-5">
              Services
            </h4>
            <div className="flex flex-col gap-2 sm:gap-2.5">
              {["Custom Automation", "Local SEO", "Google Ads & PPC", "Web Development", "Graphic Design", "Workflow Automation"].map((item) => (
                <a
                  key={item}
                  href="#services"
                  className="text-white/40 hover:text-white/70 text-[0.8125rem] sm:text-[0.875rem] transition-colors font-body py-0.5"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white text-[0.8125rem] sm:text-[0.875rem] font-display font-bold mb-4 sm:mb-5">
              Trades We Serve
            </h4>
            <div className="flex flex-col gap-2 sm:gap-2.5">
              {["HVAC", "Plumbing", "Roofing", "Electrical", "Landscaping", "Pest Control"].map((item) => (
                <span key={item} className="text-white/40 text-[0.8125rem] sm:text-[0.875rem] font-body">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pt-6 sm:pt-8 border-t"
          style={{ borderColor: "oklch(1 0 0 / 0.08)" }}
        >
          <p className="text-white/30 text-[0.75rem] sm:text-[0.8125rem] font-body">
            &copy; {currentYear} Klema Creative Agency. San Antonio, TX.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="text-white/30 hover:text-white/55 text-[0.75rem] sm:text-[0.8125rem] transition-colors font-body py-1"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-white/30 hover:text-white/55 text-[0.75rem] sm:text-[0.8125rem] transition-colors font-body py-1"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
