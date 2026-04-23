import { ArrowLeft, Zap } from "lucide-react";
import { Link } from "wouter";
import { useEffect } from "react";

export default function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const lastUpdated = "April 13, 2026";

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.16 0.06 240)" }}>
      <header
        className="border-b"
        style={{ borderColor: "oklch(1 0 0 / 0.08)" }}
      >
        <div className="container py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Zap
              className="w-[1.125rem] h-[1.125rem] sm:w-[1.25rem] sm:h-[1.25rem] text-[var(--brand-lime)] shrink-0"
              strokeWidth={2.5}
              fill="var(--brand-lime)"
            />
            <span className="text-white font-display font-extrabold text-[1.125rem] sm:text-[1.25rem]">
              Klema Creative
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-white/60 hover:text-white text-[0.875rem] font-body transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="container py-14 sm:py-20 max-w-3xl">
        <div className="mb-10">
          <span className="section-label text-[var(--brand-lime)]">Legal</span>
          <h1
            className="text-white font-extrabold mt-4 mb-4"
            style={{
              fontSize: "clamp(1.875rem, 4vw, 2.875rem)",
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
            }}
          >
            Terms of Service
          </h1>
          <p className="text-white/55 font-body text-[0.9375rem]">
            Last updated: {lastUpdated}
          </p>
        </div>

        <div className="flex flex-col gap-8 text-white/75 font-body text-[1rem] sm:text-[1.0625rem] leading-[1.75]">
          <section>
            <p>
              These Terms of Service ("Terms") govern your access to and use of
              the Klema Creative Agency website at klemacreative.com, our
              services, and our communications with you, including calls, email,
              and SMS. By using our website, submitting a form, or
              communicating with us, you agree to these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-white font-display font-bold text-[1.25rem] sm:text-[1.375rem] mb-3">
              Use of the Website
            </h2>
            <p>
              You agree to use our website only for lawful purposes and in a
              way that does not infringe on the rights of others. Content on
              this website, including text, graphics, logos, and code, is
              owned by or licensed to Klema Creative and is protected by
              copyright and trademark laws.
            </p>
          </section>

          <section>
            <h2 className="text-white font-display font-bold text-[1.25rem] sm:text-[1.375rem] mb-3">
              Services
            </h2>
            <p>
              Specific services engagements with Klema Creative are governed by
              a separate written agreement or scope of work. Nothing on this
              website creates a client relationship unless and until a signed
              agreement is in place.
            </p>
          </section>

          <section
            id="sms-terms"
            className="p-6 sm:p-7 rounded-xl"
            style={{
              background: "oklch(0.74 0.21  50 / 0.08)",
              border: "1px solid oklch(0.74 0.21  50 / 0.3)",
            }}
          >
            <h2 className="text-white font-display font-bold text-[1.375rem] sm:text-[1.5rem] mb-4">
              SMS Terms of Service
            </h2>
            <p className="mb-4">
              By opting into SMS from a web form or other medium, you are
              agreeing to receive SMS messages from Klema Creative. This
              includes SMS messages for customer care and marketing.
            </p>

            <h3 className="text-white font-display font-bold text-[1.0625rem] sm:text-[1.125rem] mt-5 mb-2">
              Types of messages you can expect
            </h3>
            <ul className="list-disc pl-5 flex flex-col gap-1.5">
              <li>Appointment reminders and scheduling confirmations</li>
              <li>Responses to inquiries and audit requests you submitted</li>
              <li>Account and service notifications</li>
              <li>Order and invoice alerts</li>
              <li>
                Marketing and promotional messages about our services (only
                when you have opted in)
              </li>
            </ul>

            <h3 className="text-white font-display font-bold text-[1.0625rem] sm:text-[1.125rem] mt-5 mb-2">
              Messaging details
            </h3>
            <ul className="list-disc pl-5 flex flex-col gap-1.5">
              <li>Messaging frequency may vary.</li>
              <li>Message and data rates may apply.</li>
              <li>
                To opt out at any time, text <strong>STOP</strong> to any
                message we send.
              </li>
              <li>
                For assistance, text <strong>HELP</strong> or visit our website
                at{" "}
                <a
                  href="https://klemacreative.com"
                  className="text-[var(--brand-lime)] hover:underline"
                >
                  klemacreative.com
                </a>
                .
              </li>
            </ul>

            <p className="mt-5">
              SMS consent and mobile phone numbers are not shared with third
              parties or affiliates for marketing purposes. See our{" "}
              <Link
                href="/privacy-policy"
                className="text-[var(--brand-lime)] hover:underline"
              >
                Privacy Policy
              </Link>{" "}
              for full details on how we handle your information, and these
              Terms of Service for messaging terms.
            </p>
          </section>

          <section>
            <h2 className="text-white font-display font-bold text-[1.25rem] sm:text-[1.375rem] mb-3">
              Disclaimers
            </h2>
            <p>
              This website and its content are provided "as is" without
              warranties of any kind, either express or implied. We do not
              guarantee any specific marketing, lead, or revenue result.
              Results depend on many factors including your market, budget,
              offer, and execution.
            </p>
          </section>

          <section>
            <h2 className="text-white font-display font-bold text-[1.25rem] sm:text-[1.375rem] mb-3">
              Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, Klema Creative will not
              be liable for any indirect, incidental, special, consequential,
              or punitive damages arising from your use of the website or our
              communications.
            </p>
          </section>

          <section>
            <h2 className="text-white font-display font-bold text-[1.25rem] sm:text-[1.375rem] mb-3">
              Changes to These Terms
            </h2>
            <p>
              We may update these Terms from time to time. When we do, we will
              revise the "Last updated" date at the top of this page. Continued
              use of the website after changes means you accept the updated
              Terms.
            </p>
          </section>

          <section>
            <h2 className="text-white font-display font-bold text-[1.25rem] sm:text-[1.375rem] mb-3">
              Contact Us
            </h2>
            <div className="flex flex-col gap-1.5 text-white/80">
              <p className="font-semibold text-white">Klema Creative Agency</p>
              <p>San Antonio, TX</p>
              <p>
                <a
                  href="mailto:tamaya@klemacreative.com"
                  className="text-[var(--brand-lime)] hover:underline"
                >
                  tamaya@klemacreative.com
                </a>
              </p>
              <p>
                <a
                  href="tel:+1-210-974-9386"
                  className="text-[var(--brand-lime)] hover:underline"
                >
                  (210) 974-9386
                </a>
              </p>
            </div>
          </section>
        </div>

        <div
          className="mt-14 pt-8 border-t"
          style={{ borderColor: "oklch(1 0 0 / 0.08)" }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-[0.875rem] font-body transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
