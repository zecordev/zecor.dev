import { resolve } from "node:path";
import { globSync } from "glob";
import { defineConfig } from "vite";

// Multi-page static build. Every top-level .html is an entry; the output is plain
// static files for Cloudflare Pages / Vercel with no server.
const pages = Object.fromEntries(
  globSync("*.html").map((f) => [f.replace(/\.html$/, ""), resolve(f)]),
);

export default defineConfig({
  base: "/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: { input: pages },
  },
  test: { environment: "jsdom", globals: true },
});
