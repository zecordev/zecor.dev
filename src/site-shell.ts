import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

const PAGES: [string, string][] = [
  ["/", "Home"],
  ["/demo", "Demo"],
  ["/architecture", "Architecture"],
  ["/security", "Security"],
  ["/configuration", "Configuration"],
  ["/benchmarks", "Benchmarks"],
];

// Header nav + a theme toggle. Light DOM so the page's global theme.css styles the
// slotted content; the only shadow styles are for the bar itself.
@customElement("zecor-doc")
export class ZecorDoc extends LitElement {
  static styles = css`
    :host { display: block; }
    header {
      display: flex;
      align-items: baseline;
      gap: 1.25rem;
      flex-wrap: wrap;
      max-width: 46rem;
      margin: 0 auto;
      padding: 1.25rem;
      border-bottom: 1px solid var(--line, #232a26);
      font-family: var(--mono, monospace);
      font-size: 0.85rem;
    }
    .brand { font-weight: 700; color: var(--ink, #e9efe9); text-decoration: none; letter-spacing: 0.04em; }
    nav { display: flex; gap: 0.9rem; flex-wrap: wrap; }
    nav a { color: var(--dim, #93a099); text-decoration: none; }
    nav a[aria-current] { color: var(--accent-ink, #8fe3c8); }
    button {
      margin-left: auto;
      font: inherit;
      background: transparent;
      color: var(--dim, #93a099);
      border: 1px solid var(--line, #232a26);
      border-radius: 6px;
      padding: 0.15rem 0.5rem;
      cursor: pointer;
    }
    footer {
      max-width: 46rem;
      margin: 4rem auto 0;
      padding: 1.25rem;
      border-top: 1px solid var(--line, #232a26);
      font-family: var(--mono, monospace);
      font-size: 0.75rem;
      color: var(--dim, #93a099);
    }
  `;

  @property() path = "/";

  private toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "" : "light";
    if (next) root.dataset.theme = next;
    else delete root.dataset.theme;
    try {
      localStorage.setItem("zecor-doc-theme", next);
    } catch {
      /* private mode */
    }
  }

  render() {
    return html`
      <header>
        <a class="brand" href="/">zecor</a>
        <nav>
          ${PAGES.filter(([p]) => p !== "/").map(
            ([p, label]) =>
              html`<a href=${p} aria-current=${this.path === p ? "page" : "false"}>${label}</a>`,
          )}
        </nav>
        <button @click=${this.toggle} aria-label="Toggle colour theme">theme</button>
      </header>
      <slot></slot>
      <footer>
        © 2026 Hilachem Ventures LLC · Zecor is released under the Apache License 2.0
      </footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zecor-doc": ZecorDoc;
  }
}

// Restore the saved theme before first paint of any page that imports this module.
try {
  const t = localStorage.getItem("zecor-doc-theme");
  if (t === "light") document.documentElement.dataset.theme = "light";
} catch {
  /* ignore */
}
