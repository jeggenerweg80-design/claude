import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useState, FormEvent, useEffect } from "react";
import { requestPasswordReset, resetPassword, bootstrapSession } from "../lib/auth";

export const Route = createFileRoute("/login/forgot-password")({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/login/forgot-password" }) as { token?: string };
  const [step, setStep] = useState<"email" | "reset">(search?.token ? "reset" : "email");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(search?.token || "");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    bootstrapSession().then(() => {
      setInitialized(true);
    });
  }, []);

  const handleRequestReset = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await requestPasswordReset(email);
    setLoading(false);

    if (result.success) {
      setSuccess(true);
      setEmail("");
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setError(result.error || "Request failed");
    }
  };

  const handleResetPassword = async (e: FormEvent) => {
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
    const result = await resetPassword(token, password);
    setLoading(false);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate({ to: "/login" });
      }, 2000);
    } else {
      setError(result.error || "Reset failed");
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
          <h1 className="font-display text-3xl font-bold text-frost mb-2">
            {step === "email" ? "Passwort zurücksetzen" : "Neues Passwort setzen"}
          </h1>
          <p className="text-mist">
            {step === "email"
              ? "Gib deine E-Mail ein, um einen Link zum Zurücksetzen zu erhalten"
              : "Lege ein neues Passwort für dein Konto fest"}
          </p>
        </div>

        {success && step === "email" && (
          <div className="mb-6 p-4 bg-electric/10 border border-electric/30 rounded text-center">
            <p className="text-frost mb-2">✓ E-Mail versendet</p>
            <p className="text-sm text-mist">
              Wenn ein Konto mit dieser E-Mail existiert, erhältst du einen Link zum Zurücksetzen.
            </p>
          </div>
        )}

        {success && step === "reset" && (
          <div className="mb-6 p-4 bg-electric/10 border border-electric/30 rounded text-center">
            <p className="text-frost mb-2">✓ Passwort zurückgesetzt</p>
            <p className="text-sm text-mist">Wird weitergeleitet...</p>
          </div>
        )}

        {error && !success && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded text-red-300 text-sm">
            {error}
          </div>
        )}

        {step === "email" ? (
          <form onSubmit={handleRequestReset} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-frost mb-2">
                E-Mail-Adresse
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

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Wird versendet..." : "Link versendet"}
            </button>

            <div className="text-sm text-center">
              <a href="/login" className="text-electric hover:text-electric/80 transition-colors">
                Zurück zur Anmeldung
              </a>
            </div>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-frost mb-2">
                Neues Passwort
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
              {loading ? "Wird gespeichert..." : "Passwort speichern"}
            </button>

            <div className="text-sm text-center">
              <a href="/login" className="text-electric hover:text-electric/80 transition-colors">
                Zurück zur Anmeldung
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
