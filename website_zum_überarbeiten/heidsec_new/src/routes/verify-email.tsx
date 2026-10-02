import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useState, FormEvent, useEffect } from "react";
import { verifyEmail, resendVerificationEmail, bootstrapSession } from "../lib/auth";

export const Route = createFileRoute("/verify-email")({
  component: VerifyEmailPage,
});

function VerifyEmailPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/verify-email" }) as { email?: string; token?: string };
  const [email, setEmail] = useState(search?.email || "");
  const [token, setToken] = useState(search?.token || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    // Auto-verify if token in URL
    if (search?.token) {
      handleVerify(search.token);
    } else {
      // Bootstrap to check if already verified
      bootstrapSession();
    }
  }, [search?.token]);

  const handleVerify = async (tokenToVerify?: string) => {
    const verifyToken = tokenToVerify || token;
    if (!verifyToken) {
      setError("Verification token is required");
      return;
    }

    setError("");
    setLoading(true);

    const result = await verifyEmail(verifyToken);
    setLoading(false);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate({ to: "/mein-konto" });
      }, 2000);
    } else {
      setError(result.error || "Verification failed");
    }
  };

  const handleResend = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("E-Mail is required");
      return;
    }

    setError("");
    setResendLoading(true);

    const result = await resendVerificationEmail(email);
    setResendLoading(false);

    if (result.success) {
      setSuccess(true);
      setError("");
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setError(result.error || "Resend failed");
    }
  };

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
          <h1 className="font-display text-3xl font-bold text-frost mb-2">E-Mail bestätigen</h1>
          <p className="text-mist">Verifizie deine E-Mail-Adresse um dein Konto zu aktivieren</p>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-electric/10 border border-electric/30 rounded text-electric text-sm text-center">
            ✓ E-Mail erfolgreich bestätigt. Wird weitergeleitet...
          </div>
        )}

        {error && !success && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded text-red-300 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Manual Token Input */}
          {!success && (
            <form onSubmit={(e) => { e.preventDefault(); handleVerify(); }} className="space-y-4">
              <div>
                <label htmlFor="token" className="block text-sm font-medium text-frost mb-2">
                  Verification Token
                </label>
                <input
                  id="token"
                  type="text"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Token aus E-Mail einfügen"
                  className="w-full px-4 py-2 bg-ink/50 border border-electric/20 rounded text-frost placeholder-mist/50 focus:outline-none focus:border-electric/50 transition-colors"
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={loading || !token}
                className="btn-primary w-full py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Wird bestätigt..." : "Bestätigen"}
              </button>
            </form>
          )}

          {/* Resend Verification Email */}
          {!success && (
            <form onSubmit={handleResend} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-frost mb-2">
                  E-Mail (zum erneuten Versenden)
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="deine@email.de"
                  className="w-full px-4 py-2 bg-ink/50 border border-electric/20 rounded text-frost placeholder-mist/50 focus:outline-none focus:border-electric/50 transition-colors"
                  disabled={resendLoading}
                />
              </div>
              <button
                type="submit"
                disabled={resendLoading || !email}
                className="btn-ghost w-full py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resendLoading ? "Wird versendet..." : "Link erneut versendet"}
              </button>
            </form>
          )}

          {/* Back Links */}
          {!success && (
            <div className="text-center text-sm space-y-2">
              <div>
                <a href="/login" className="text-electric hover:text-electric/80 transition-colors">
                  Zurück zur Anmeldung
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
