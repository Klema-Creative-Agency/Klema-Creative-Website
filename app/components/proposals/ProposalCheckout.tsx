"use client";

import { useState, useEffect, FormEvent } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import type { ProposalData } from "@/app/data/proposals";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

/** Outer wrapper — fetches clientSecret then renders Elements */
export default function ProposalCheckout({
  proposal,
  onSuccess,
}: {
  proposal: ProposalData;
  onSuccess: () => void;
}) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/create-proposal-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: proposal.slug }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Could not initialize payment.");
          return;
        }
        setClientSecret(data.clientSecret);
      })
      .catch(() => setError("Network error. Please try again."));
  }, [proposal.slug]);

  if (error) {
    return (
      <div className="bg-surface border border-border rounded-[20px] p-8 text-center">
        <p className="text-red text-sm">{error}</p>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="bg-surface border border-border rounded-[20px] p-8 flex items-center justify-center min-h-[200px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-text-dim">Preparing secure checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "night",
          variables: {
            colorPrimary: "#4ade80",
            colorBackground: "#0d0d0d",
            colorText: "#f0eeeb",
            colorTextSecondary: "rgba(255,255,255,0.45)",
            colorDanger: "#f87171",
            fontFamily: "Inter, system-ui, sans-serif",
            borderRadius: "12px",
            spacingUnit: "4px",
          },
          rules: {
            ".Input": {
              border: "1px solid rgba(255,255,255,0.06)",
              backgroundColor: "#111111",
            },
            ".Input:focus": {
              border: "1px solid rgba(74,222,128,0.3)",
              boxShadow: "0 0 0 1px rgba(74,222,128,0.1)",
            },
            ".Label": {
              color: "rgba(255,255,255,0.7)",
            },
          },
        },
      }}
    >
      <CheckoutForm onSuccess={onSuccess} />
    </Elements>
  );
}

/** Inner form — uses Stripe hooks (must be inside Elements) */
function CheckoutForm({ onSuccess }: { onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setSubmitting(true);
    setError(null);

    const returnUrl = `${window.location.origin}${window.location.pathname}?payment=success`;

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl,
      },
      redirect: "if_required",
    });

    if (confirmError) {
      setError(confirmError.message || "Payment failed. Please try again.");
      setSubmitting(false);
    } else {
      onSuccess();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-surface border border-border rounded-[20px] p-8 max-md:p-6">
        <PaymentElement />
      </div>

      {error && (
        <p className="text-red text-sm text-center mt-4">{error}</p>
      )}

      <button
        type="submit"
        disabled={!stripe || submitting}
        className="btn-primary-hover w-full py-4 rounded-full text-[15px] font-bold text-center transition-all duration-300 bg-accent text-black tracking-[-0.01em] hover:shadow-[0_0_32px_rgba(74,222,128,0.3)] hover:-translate-y-px disabled:opacity-60 disabled:pointer-events-none mt-6"
      >
        {submitting ? "Processing..." : "Pay & Get Started \u2192"}
      </button>

      {/* Trust signals */}
      <div className="flex flex-col items-center gap-2 mt-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span className="text-[11px] text-text-dim">256-bit encryption</span>
          </div>
          <div className="w-px h-3 bg-border" />
          <div className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span className="text-[11px] text-text-dim">Powered by Stripe</span>
          </div>
        </div>
        <p className="text-[11px] text-text-dim text-center">
          Your card info never touches our servers. Payments processed securely by Stripe.
        </p>
      </div>
    </form>
  );
}
