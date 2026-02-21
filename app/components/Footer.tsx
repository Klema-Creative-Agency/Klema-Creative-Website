import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border pt-15 pb-10">
      <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
        <div className="flex justify-between items-start gap-15 flex-wrap max-md:flex-col max-md:gap-8">
          <div className="max-w-[280px]">
            <Link
              href="/"
              className="text-[19px] font-bold text-text no-underline tracking-[-0.3px] flex items-center gap-2.5 mb-3"
            >
              <span className="logo-dot" />
              klema creative
            </Link>
            <p className="text-[13px] text-text-dim leading-[1.7]">
              Full-service marketing agency helping San Antonio businesses
              dominate through strategy, design, and digital marketing.
            </p>
          </div>
          <div>
            <h5 className="text-xs font-bold tracking-[0.1em] uppercase text-text-mid mb-4">
              Services
            </h5>
            <ul className="list-none">
              <li className="mb-2.5">
                <Link
                  href="/services"
                  className="text-[13px] text-text-dim no-underline transition-colors duration-300 hover:text-text"
                >
                  Website Design
                </Link>
              </li>
              <li className="mb-2.5">
                <Link
                  href="/services"
                  className="text-[13px] text-text-dim no-underline transition-colors duration-300 hover:text-text"
                >
                  SEO &amp; AEO
                </Link>
              </li>
              <li className="mb-2.5">
                <Link
                  href="/services"
                  className="text-[13px] text-text-dim no-underline transition-colors duration-300 hover:text-text"
                >
                  Content Marketing
                </Link>
              </li>
              <li className="mb-2.5">
                <Link
                  href="/services"
                  className="text-[13px] text-text-dim no-underline transition-colors duration-300 hover:text-text"
                >
                  Lead Nurturing
                </Link>
              </li>
              <li className="mb-2.5">
                <Link
                  href="/services"
                  className="text-[13px] text-text-dim no-underline transition-colors duration-300 hover:text-text"
                >
                  Reputation Mgmt
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-xs font-bold tracking-[0.1em] uppercase text-text-mid mb-4">
              Free Tools
            </h5>
            <ul className="list-none">
              <li className="mb-2.5">
                <Link
                  href="/tools/ai-visibility"
                  className="text-[13px] text-text-dim no-underline transition-colors duration-300 hover:text-text"
                >
                  AI Visibility Scanner
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-xs font-bold tracking-[0.1em] uppercase text-text-mid mb-4">
              Company
            </h5>
            <ul className="list-none">
              <li className="mb-2.5">
                <Link
                  href="/"
                  className="text-[13px] text-text-dim no-underline transition-colors duration-300 hover:text-text"
                >
                  Home
                </Link>
              </li>
              <li className="mb-2.5">
                <Link
                  href="/packages"
                  className="text-[13px] text-text-dim no-underline transition-colors duration-300 hover:text-text"
                >
                  Packages
                </Link>
              </li>
              <li className="mb-2.5">
                <Link
                  href="/services"
                  className="text-[13px] text-text-dim no-underline transition-colors duration-300 hover:text-text"
                >
                  Pricing
                </Link>
              </li>
              <li className="mb-2.5">
                <Link
                  href="/contact"
                  className="text-[13px] text-text-dim no-underline transition-colors duration-300 hover:text-text"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border text-xs text-white-25 flex justify-between max-md:flex-col max-md:gap-2 max-md:items-center">
          <span>&copy; 2026 Klema Creative. All rights reserved.</span>
          <span>Built different in San Antonio, TX.</span>
        </div>
      </div>
    </footer>
  );
}
