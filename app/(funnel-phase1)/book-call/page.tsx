import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Call | Klema Creative",
};

export default function BookCallPage() {
  return (
    <div className="min-h-screen px-5 pt-28 pb-16">
      <div className="w-full max-w-[560px] mx-auto">
        <h1 className="text-[clamp(28px,5vw,40px)] font-bold text-white leading-[1.15] tracking-[-1px] text-center mb-3">
          You&apos;re in, pick a time that works.
        </h1>
        <p className="text-[#9ca3af] text-center text-[16px] mb-10 max-w-[480px] mx-auto leading-relaxed">
          In 30 minutes, we&apos;ll look under the hood of your business and show
          you exactly where AI can buy back your time.
        </p>

        {/* GHL Calendar Embed — fixed height container prevents scroll trap on mobile */}
        <div className="rounded-2xl overflow-hidden mb-10 max-md:overflow-visible">
          <iframe
            src="https://api.leadconnectorhq.com/widget/booking/bNvI5haOP4Cajecr0hgM"
            width="100%"
            height="800"
            frameBorder="0"
            title="Book a call with Klema Creative"
            className="w-full max-md:h-[1200px]"
            style={{ maxHeight: "none" }}
          />
        </div>

        {/* Founder Trust Section */}
        <div className="flex items-center gap-4 max-md:flex-col max-md:text-center">
          <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border border-[#333333] flex items-center justify-center shrink-0">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#555"
              strokeWidth="1.5"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div>
            <p className="text-white text-[14px] font-medium">
              You&apos;ll be talking with the founder of Klema Creative.
            </p>
            <p className="text-[#9ca3af] text-[13px] mt-1">
              We&apos;ve helped local businesses automate what was eating their
              time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
