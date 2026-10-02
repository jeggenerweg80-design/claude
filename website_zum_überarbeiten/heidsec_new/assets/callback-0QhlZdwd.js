import { N as reactExports, U as jsxRuntimeExports } from "./server-BP7qKV95.js";
import { u as useNavigate, a as useSearch } from "./router-lSCE4rBE.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
function CallbackPage() {
  const navigate = useNavigate();
  const search = useSearch({
    from: "/auth/social/callback"
  });
  reactExports.useEffect(() => {
    search?.provider || "";
    const status = search?.social_status;
    const returnTo = search?.returnTo;
    const error = search?.error;
    if (status === "success") {
      const target = returnTo || "/mein-konto";
      navigate({
        to: target
      });
      return;
    }
    if (status === "cancel") {
      const target = returnTo || "/";
      navigate({
        to: target
      });
      return;
    }
    if (status === "error" || error) {
      const target = returnTo || "/login";
      navigate({
        to: target,
        search: {
          redirect: "login_failed"
        }
      });
      return;
    }
  }, [navigate, search]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-dvh bg-ink flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-mist text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4", children: "OAuth Callback" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-6", children: "Der OAuth-Anmeldeprozess wurde abgeschlossen." })
  ] }) });
}
export {
  CallbackPage as component
};
