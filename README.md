# zecor.dev

The documentation site. Lit + Vite, static multi-page build, minimal client JS
(the Lit runtime plus a nav shell). Matches `platform-toolkit`'s stack.

```
cd docs
pnpm install
pnpm run dev       # local
pnpm run build     # -> docs/dist/, published to GitHub Pages (zecor.dev)
pnpm test          # Vitest + jsdom
```

Pages: `index.html` (landing), `architecture.html`, `security.html`,
`configuration.html`, `benchmarks.html`. Add a page by dropping another top-level
`.html`; `vite.config.ts` globs them as build entries.
