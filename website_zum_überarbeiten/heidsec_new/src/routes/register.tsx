import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, FormEvent, useEffect } from "react";
import { registerUser, bootstrapSession } from "../lib/auth";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
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

    if (password !== passwordConfirm) {
      setError("Passwörter stimmen nicht überein");
      return;
    }

    if (password.length < 8) {
      setError("Passwort muss mindestens 8 Zeichen lang sein");
      return;
    }

    setLoading(true);
    const result = await registerUser(email, password, name);
    setLoading(false);

    if (result.success) {
      if (result.requiresVerification) {
        navigate({ to: `/verify-email?email=${encodeURIComponent(email)}` });
      } else {
        navigate({ to: "/mein-konto" });
      }
    } else {
      setError(result.error || "Registration failed");
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
          <h1 className="font-display text-3xl font-bold text-frost mb-2">Konto erstellen</h1>
          <p className="text-mist">Sicherheit beginnt mit einem Konto</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-4 bg-red-900/20 border border-red-500/30 rounded text-red-300 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-frost mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-ink/50 border border-electric/20 rounded text-frost placeholder-mist/50 focus:outline-none focus:border-electric/50 focus:ring-1 focus:ring-electric/20 transition-colors"
              placeholder="Dein Name"
              disabled={loading}
            />
          </div>

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
              placeholder="Mindestens 8 Zeichen"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="passwordConfirm" className="block text-sm font-medium text-frost mb-2">
              Passwort wiederholen
            </label>
            <input
              id="passwordConfirm"
              type="password"
              required
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
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
            {loading ? "Wird registriert..." : "Konto erstellen"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-sm text-center">
          <span className="text-mist">Bereits angemeldet?</span>
          {" "}
          <a href="/login" className="text-electric font-medium hover:text-electric/80 transition-colors">
            Jetzt anmelden
          </a>
        </div>
      </div>
    </div>
  );
}
