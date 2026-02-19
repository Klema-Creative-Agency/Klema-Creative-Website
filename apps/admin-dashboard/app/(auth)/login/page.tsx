"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/clients";
  const errorParam = searchParams.get("error");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(
    errorParam === "unauthorized" ? "Access denied. Admin accounts only." : "",
  );
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid credentials or insufficient permissions");
      setLoading(false);
    } else {
      router.push(callbackUrl);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <span className="w-2.5 h-2.5 rounded-full bg-accent" />
          <span className="text-[20px] font-semibold tracking-[-0.02em] text-text">
            klema creative
          </span>
        </div>

        {/* Card */}
        <div className="bg-surface border border-border rounded-2xl p-8">
          <h1 className="text-[22px] font-semibold text-text mb-1">Admin Dashboard</h1>
          <p className="text-[14px] text-text-dim mb-8">
            Sign in with your team account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-[13px] font-medium text-text-dim mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-4 rounded-lg bg-card border border-border text-text text-[14px] outline-none focus:border-accent/40 transition-colors placeholder:text-text-muted"
                placeholder="you@klemacreative.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-[13px] font-medium text-text-dim mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 px-4 rounded-lg bg-card border border-border text-text text-[14px] outline-none focus:border-accent/40 transition-colors placeholder:text-text-muted"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div className="bg-danger-dim border border-danger/20 rounded-lg px-4 py-3 text-[13px] text-danger">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-lg bg-accent text-bg font-semibold text-[14px] hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

        <p className="text-center text-[12px] text-text-muted mt-6">
          Internal use only — Klema Creative team
        </p>
      </div>
    </div>
  );
}
