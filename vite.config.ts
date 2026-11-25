// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro, VITE_* env injection, @ path alias, React/TanStack dedupe, error logger plugins,
//     and sandbox detection (port/host/strictPort).
// Keep the custom TanStack server entry: src/server.ts wraps SSR errors before returning responses.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Make the Cloudflare Workers target explicit in CI instead of relying on provider detection.
  // Nitro emits .output/server/index.mjs and the static assets in .output/public.
  nitro: {
    preset: "cloudflare_module",
    cloudflare: {
      nodeCompat: true,
      deployConfig: true,
    },
  },
  tanstackStart: {
    server: { entry: "server" },
  },
});
