import { U as jsxRuntimeExports } from "./server-BP7qKV95.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
function AdminDashboard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-bold text-frost mb-2", children: "Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-mist", children: "Verwalte Inhalte der HeidSec Website" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardCard, { title: "Seiten", description: "Bearbeite Website-Sektionen", href: "/admin/sections", icon: "📄" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardCard, { title: "FAQ", description: "Verwalte häufig gestellte Fragen", href: "/admin/faqs", icon: "❓" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardCard, { title: "Ankündigungen", description: "Erstelle Nachrichten und Banner", href: "/admin/announcements", icon: "📢" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardCard, { title: "Rechtstexte", description: "Privacy, Terms, Imprint", href: "/admin/legal", icon: "⚖️" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardCard, { title: "Medien", description: "Verwaltete Bilder und Videos", href: "/admin/media", icon: "🎨" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 bg-electric/5 border border-electric/20 rounded", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-frost mb-2", children: "Willkommen im Admin-Bereich" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-mist text-sm", children: "Hier kannst du alle öffentlichen Inhalte der HeidSec-Website verwalten. Alle Änderungen werden sofort veröffentlicht, sofern nicht anders markiert." })
    ] })
  ] });
}
function DashboardCard({
  title,
  description,
  href,
  icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href, className: "p-6 bg-ink/50 border border-electric/10 rounded hover:border-electric/30 hover:bg-electric/5 transition-colors group", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-3", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-frost group-hover:text-electric transition-colors", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-mist mt-1", children: description })
  ] });
}
export {
  AdminDashboard as component
};
