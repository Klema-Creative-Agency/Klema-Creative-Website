"use client";
import { useState, FormEvent } from "react";

interface EmailGateFormProps {
  websiteUrl: string;
  scanResults: unknown[];
  score: number;
  onUnlock: (email: string) => void;
}

export default function EmailGateForm({
  websiteUrl,
  scanResults,
  score,
  onUnlock,
}: EmailGateFormProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/capture-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, websiteUrl, scanResults, score }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
      onUnlock(email);
    } catch {
      setError("Network error — please try again");
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="bg-surface border border-accent-border rounded-2xl p-8 text-center">
        <div className="text-[32px] mb-3">✅</div>
        <p className="text-base font-bold mb-1.5">Results unlocked!</p>
        <p className="text-[13px] text-text-dim">
          Check your inbox for a detailed report and recommendations.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-2xl p-8">
      <div className="text-center mb-5">
        <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-accent mb-2">
          Unlock Full Results
        </p>
        <h3 className="text-xl font-extrabold tracking-[-0.3px] mb-2">
          See the full picture
        </h3>
        <p className="text-sm text-text-dim leading-relaxed">
          Enter your email to reveal detailed AI insights, competitor mentions,
          and personalized recommendations.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex gap-2.5 max-w-[460px] mx-auto flex-wrap"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          disabled={loading}
          className="flex-1 min-w-[200px] px-5 py-3.5 rounded-full border border-border bg-card text-text text-sm font-sans outline-none transition-colors duration-300 focus:border-accent-border-dim"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3.5 rounded-full border-none bg-accent text-black text-sm font-bold font-sans cursor-pointer transition-all duration-300 tracking-[-0.01em] btn-primary-hover disabled:opacity-70 disabled:cursor-wait"
        >
          {loading ? "Sending..." : "Unlock Results"}
        </button>
      </form>

      {error && (
        <p className="text-[13px] text-red text-center mt-3">{error}</p>
      )}

      <p className="text-[11px] text-white-25 text-center mt-4">
        No spam. Just your free AI visibility report + tips to improve it.
      </p>
    </div>
  );
}
