import { createFileRoute, useNavigate, Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { logoutUser, clearAccessToken } from "../lib/auth";
import { checkAdminAuth } from "../lib/admin";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    const session = await checkAdminAuth();

    if (!session.authenticated || !session.isAdmin) {
      if (!session.authenticated) {
        navigate({ to: "/login", search: { redirect: "/admin" } });
      } else {
        // Authenticated but not admin
        navigate({ to: "/" });
      }
      return;
    }

    setUser(session.user);
    setIsAdmin(true);
    setLoading(false);
  };

  const handleLogout = async () => {
    await logoutUser();
    clearAccessToken();
    navigate({ to: "/" });
  };

  if (loading) {
    return (
      <div className="min-h-dvh bg-ink flex items-center justify-center">
        <div className="text-mist">Wird initialisiert...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-dvh bg-ink flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-frost mb-4">403 — Zugriff verweigert</h1>
          <p className="text-mist mb-6">Du hast keine Admin-Berechtigung</p>
          <a href="/" className="btn-primary">
            Zur Startseite
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-ink grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5">
      {/* Sidebar */}
      <aside className="md:col-span-1 bg-graphite border-r border-electric/10 p-6 space-y-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img src="/assets/logo-monogram.svg" alt="HeidSec" className="h-8 w-8" />
          <span className="font-display text-sm font-semibold text-frost hidden lg:inline">
            Admin
          </span>
        </a>

        {/* Navigation */}
        <nav className="space-y-2">
          <NavLink to="/admin" label="Dashboard" />
          <NavLink to="/admin/sections" label="Seiten" />
          <NavLink to="/admin/faqs" label="FAQ" />
          <NavLink to="/admin/announcements" label="Ankündigungen" />
          <NavLink to="/admin/legal" label="Rechtstexte" />
          <NavLink to="/admin/media" label="Medien" />
        </nav>

        {/* User Info */}
        <div className="pt-8 border-t border-electric/10">
          <p className="text-xs text-mist mb-3">Angemeldet als:</p>
          <p className="text-sm text-frost font-medium truncate">{user?.email}</p>
          <p className="text-xs text-mist capitalize">({user?.role})</p>
          <button
            onClick={handleLogout}
            className="w-full mt-4 py-2 text-sm text-mist hover:text-frost transition-colors border border-electric/20 rounded"
          >
            Abmelden
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:col-span-3 lg:col-span-4 p-6 md:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

function NavLink({ to, label }: { to: string; label: string }) {
  return (
    <a
      href={to}
      className="block px-4 py-2 rounded text-sm font-medium transition-colors text-mist hover:text-frost hover:bg-electric/5"
    >
      {label}
    </a>
  );
}
