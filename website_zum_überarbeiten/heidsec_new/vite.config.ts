import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// HeidSec website — standalone build config.
// SSR build: `vite build` emits a Workers-shaped server bundle
// (dist/server/server.js — `export default { fetch }`) plus dist/client
// (hashed static assets). Rendering happens on the server per request, so
// site code must stay SSR-safe: never touch browser-only globals (window,
// document, localStorage, navigator) during render or at module top level —
// only inside effects/handlers, or guarded with `typeof window !== "undefined"`.
export default defineConfig({
  ssr: {
    // Bundle all npm deps into the server bundle (no node_modules at runtime
    // on a Worker). node: builtins stay external (nodejs_compat provides them).
    noExternal: true,
    external: ["cloudflare:workers"],
  },
  build: {
    rollupOptions: { external: [/^cloudflare:/] },
  },
  plugins: [
    // TanStack Start plugin must run before React's plugin.
    tanstackStart({
      server: { entry: "server" },
    }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
});
