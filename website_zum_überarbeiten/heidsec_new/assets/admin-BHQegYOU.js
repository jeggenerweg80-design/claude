import { N as reactExports, U as jsxRuntimeExports, a2 as Outlet } from "./server-BP7qKV95.js";
import { u as useNavigate } from "./router-lSCE4rBE.js";
import { l as logoutUser, c as clearAccessToken } from "./auth-DKM4MRJi.js";
import { c as checkAdminAuth } from "./admin-8wxL1wMd.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
function AdminLayout() {
  const navigate = useNavigate();
  const [user, setUser] = reactExports.useState(null);
  const [isAdmin, setIsAdmin] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    checkAccess();
  }, []);
  const checkAccess = async () => {
    const session = await checkAdminAuth();
    if (!session.authenticated || !session.isAdmin) {
      if (!session.authenticated) {
        navigate({
          to: "/login",
          search: {
            redirect: "/admin"
          }
        });
      } else {
        navigate({
          to: "/"
        });
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
    navigate({
      to: "/"
    });
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-dvh bg-ink flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-mist", children: "Wird initialisiert..." }) });
  }
  if (!isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-dvh bg-ink flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-frost mb-4", children: "403 — Zugriff verweigert" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-mist mb-6", children: "Du hast keine Admin-Berechtigung" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "btn-primary", children: "Zur Startseite" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-dvh bg-ink grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "md:col-span-1 bg-graphite border-r border-electric/10 p-6 space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "/", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/assets/logo-monogram.svg", alt: "HeidSec", className: "h-8 w-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm font-semibold text-frost hidden lg:inline", children: "Admin" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/admin", label: "Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/admin/sections", label: "Seiten" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/admin/faqs", label: "FAQ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/admin/announcements", label: "Ankündigungen" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/admin/legal", label: "Rechtstexte" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/admin/media", label: "Medien" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-8 border-t border-electric/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-mist mb-3", children: "Angemeldet als:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-frost font-medium truncate", children: user?.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-mist capitalize", children: [
          "(",
          user?.role,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleLogout, className: "w-full mt-4 py-2 text-sm text-mist hover:text-frost transition-colors border border-electric/20 rounded", children: "Abmelden" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "md:col-span-3 lg:col-span-4 p-6 md:p-8 overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
  ] });
}
function NavLink({
  to,
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: to, className: "block px-4 py-2 rounded text-sm font-medium transition-colors text-mist hover:text-frost hover:bg-electric/5", children: label });
}
export {
  AdminLayout as component
};
