import { ArrowLeft, Zap } from "lucide-react";
import { Link } from "wouter";
import { useEffect } from "react";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const lastUpdated = "April 13, 2026";

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.16 0.06 145)" }}>
      <header
        className="border-b"
        style={{ borderColor: "oklch(1 0 0 / 0.08)" }}
      >
        <div className="container py-6 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
          >
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
            Privacy Policy
          </h1>
          <p className="text-white/55 font-body text-[0.9375rem]">
            Last updated: {lastUpdated}
          </p>
        </div>

        <div className="prose-dark flex flex-col gap-8 text-white/75 font-body text-[1rem] sm:text-[1.0625rem] leading-[1.75]">
          <section>
            <p>
              Klema Creative Agency ("Klema Creative," "we," "us," or "our")
              respects your privacy. This Privacy Policy explains what
              information we collect, how we use it, who we share it with, and
              the rights you have regarding your information when you visit
              klemacreative.com, submit a form, or communicate with us by phone,
              SMS, or email.
            </p>
          </section>

          <section>
            <h2 className="text-white font-display font-bold text-[1.25rem] sm:text-[1.375rem] mb-3">
              Information We Collect
            </h2>
            <p className="mb-3">
              We collect personal information that you voluntarily provide when
              you request an audit, contact us, or engage our services. This
              includes:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>Your name</li>
              <li>Phone number (mobile and landline)</li>
              <li>Email address</li>
              <li>Business name, trade, and service area</li>
              <li>
                The content of any messages you send us (form submissions, SMS,
                email, or call notes)
              </li>
              <li>
                Basic website analytics data such as IP address, browser type,
                pages visited, and referring site
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-display font-bold text-[1.25rem] sm:text-[1.375rem] mb-3">
              How We Use Your Information
            </h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>Respond to your inquiries and deliver the audit or service you requested</li>
              <li>
                Send you account, appointment, and service-related messages by
                phone, SMS, or email
              </li>
              <li>
                Send marketing communications about our services, when you have
                opted in
              </li>
              <li>Improve our website, offerings, and customer experience</li>
              <li>
                Meet legal, regulatory, tax, and carrier compliance obligations
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-display font-bold text-[1.25rem] sm:text-[1.375rem] mb-3">
              Who We Share Your Information With
            </h2>
            <p className="mb-3">
              We do not sell your personal information. We share limited
              information only with trusted service providers that help us run
              our business, and only to the extent they need it to perform
              their work for us. These include:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>
                Communication and telephony providers (for example, RingCentral)
                that deliver our calls and text messages
              </li>
              <li>
                Email and marketing platforms used to send transactional and
                opt-in marketing messages
              </li>
              <li>
                Cloud hosting, analytics, and customer relationship management
                tools used to operate the website and manage inquiries
              </li>
              <li>
                Professional advisors and authorities when required by law,
                subpoena, or to protect our legal rights
              </li>
            </ul>
            <p
              className="mt-5 p-4 rounded-md font-semibold"
              style={{
                background: "oklch(0.74 0.21 130 / 0.12)",
                border: "1px solid oklch(0.74 0.21 130 / 0.35)",
                color: "#ffffff",
              }}
            >
              SMS consent and mobile phone numbers are not shared with third
              parties or affiliates for marketing purposes. Your SMS opt-in
              information stays with Klema Creative and is only passed to the
              messaging carrier required to deliver the messages you requested.
            </p>
          </section>

          <section>
            <h2 className="text-white font-display font-bold text-[1.25rem] sm:text-[1.375rem] mb-3">
              SMS Messaging Terms
            </h2>
            <p className="mb-3">
              By submitting a form on this website or otherwise providing your
              mobile number, you agree to receive SMS messages from Klema
              Creative related to your inquiry, appointments, audits, and
              service updates. Message frequency varies. Message and data rates
              may apply.
            </p>
            <p className="mb-3">
              You can opt out at any time by replying <strong>STOP</strong> to
              any text message from us. Reply <strong>HELP</strong> for help.
              See our full{" "}
              <Link
                href="/terms"
                className="text-[var(--brand-lime)] hover:underline"
              >
                SMS Terms of Service
              </Link>{" "}
              for the types of messages you may receive and all messaging
              details. Questions? Reach us at{" "}
              <a
                href="mailto:tamaya@klemacreative.com"
                className="text-[var(--brand-lime)] hover:underline"
              >
                tamaya@klemacreative.com
              </a>{" "}
              or{" "}
              <a
                href="tel:+1-210-974-9386"
                className="text-[var(--brand-lime)] hover:underline"
              >
                (210) 974-9386
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-white font-display font-bold text-[1.25rem] sm:text-[1.375rem] mb-3">
              Cookies and Analytics
            </h2>
            <p>
              We use cookies and similar technologies to understand how visitors
              use our website and to improve site performance. You can disable
              cookies in your browser settings, though some parts of the site
              may not function correctly.
            </p>
          </section>

          <section>
            <h2 className="text-white font-display font-bold text-[1.25rem] sm:text-[1.375rem] mb-3">
              Data Retention and Security
            </h2>
            <p>
              We keep your personal information only as long as needed to
              provide our services, meet legal obligations, and support our
              business records. We use reasonable administrative, technical,
              and physical safeguards to protect your information, though no
              system is completely secure.
            </p>
          </section>

          <section>
            <h2 className="text-white font-display font-bold text-[1.25rem] sm:text-[1.375rem] mb-3">
              Your Rights
            </h2>
            <p>
              You may request to access, correct, or delete the personal
              information we hold about you, and you may opt out of marketing
              communications at any time. To make a request, email us at{" "}
              <a
                href="mailto:tamaya@klemacreative.com"
                className="text-[var(--brand-lime)] hover:underline"
              >
                tamaya@klemacreative.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-white font-display font-bold text-[1.25rem] sm:text-[1.375rem] mb-3">
              Children's Privacy
            </h2>
            <p>
              Our services are intended for business owners and are not directed
              to children under 13. We do not knowingly collect personal
              information from children.
            </p>
          </section>

          <section>
            <h2 className="text-white font-display font-bold text-[1.25rem] sm:text-[1.375rem] mb-3">
              Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. When we do,
              we will revise the "Last updated" date at the top of this page.
              Material changes will be communicated through the website or by
              direct notice where appropriate.
            </p>
          </section>

          <section>
            <h2 className="text-white font-display font-bold text-[1.25rem] sm:text-[1.375rem] mb-3">
              Contact Us
            </h2>
            <p>
              Questions about this Privacy Policy or our data practices?
              Contact:
            </p>
            <div className="mt-4 flex flex-col gap-1.5 text-white/80">
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
