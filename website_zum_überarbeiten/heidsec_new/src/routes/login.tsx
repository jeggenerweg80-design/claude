import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useState, FormEvent, useEffect } from "react";
import { loginUser, bootstrapSession } from "../lib/auth";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/login" }) as { redirect?: string };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Bootstrap session on mount
    bootstrapSession().then((result) => {
      if (result.authenticated && result.user) {
        // Already logged in, redirect
        navigate({ to: "/mein-konto" });
      } else {
        setInitialized(true);
      }
    });
  }, [navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await loginUser(email, password);
    setLoading(false);

    if (result.success) {
      const redirectTo = search?.redirect || "/mein-konto";
      navigate({ to: redirectTo as any });
    } else if (result.requiresVerification) {
      navigate({ to: `/verify-email?email=${encodeURIComponent(email)}` });
    } else {
      setError(result.error || "Login failed");
    }
  };

  if (!initialized) {
    return (
      <div className="min-h-dvh bg-ink flex items-center justify-center">
        <div className="text-mist">Wird initialisiert...</div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-ink flex items-center justify-center px-5">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-12 text-center">
          <a href="/" className="inline-flex items-center gap-3 mb-8">
            <img src="/assets/logo-monogram.svg" alt="HeidSec" className="h-8 w-8" />
            <span className="font-display text-lg font-semibold tracking-[0.22em] text-frost">
              HEIDSEC
            </span>
          </a>
          <h1 className="font-display text-3xl font-bold text-frost mb-2">Anmelden</h1>
          <p className="text-mist">Zugang zu deinem HeidSec-Konto</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-4 bg-red-900/20 border border-red-500/30 rounded text-red-300 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-frost mb-2">
              E-Mail
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-ink/50 border border-electric/20 rounded text-frost placeholder-mist/50 focus:outline-none focus:border-electric/50 focus:ring-1 focus:ring-electric/20 transition-colors"
              placeholder="deine@email.de"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-frost mb-2">
              Passwort
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-ink/50 border border-electric/20 rounded text-frost placeholder-mist/50 focus:outline-none focus:border-electric/50 focus:ring-1 focus:ring-electric/20 transition-colors"
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Wird angemeldet..." : "Anmelden"}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-8 space-y-4 text-sm text-center">
          <a href="/login/forgot-password" className="block text-electric hover:text-electric/80 transition-colors">
            Passwort vergessen?
          </a>
          <div className="flex items-center gap-2 justify-center">
            <span className="text-mist">Noch kein Konto?</span>
            <a href="/register" className="text-electric font-medium hover:text-electric/80 transition-colors">
              Jetzt registrieren
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
