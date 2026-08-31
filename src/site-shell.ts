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
      border-bottom: 1px solid var(--line, #242d39);
      font-family: var(--mono, monospace);
      font-size: 0.8rem;
    }
    .bar {
      display: flex;
      align-items: baseline;
      gap: 1.4rem;
      flex-wrap: wrap;
      max-width: 64rem;
      margin: 0 auto;
      padding: 1.1rem 1.5rem;
    }
    .brand {
      font-family: var(--display, monospace);
      font-weight: 700;
      font-size: 0.9rem;
      letter-spacing: -0.02em;
      color: var(--ink, #e9e5da);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
    }
    .brand::after {
      content: "";
      width: 0.5em;
      height: 1em;
      margin-left: 0.18em;
      background: var(--accent, #e2a458);
      animation: blink 1.2s steps(2, start) infinite;
    }
    @keyframes blink { to { visibility: hidden; } }
    @media (prefers-reduced-motion: reduce) {
      .brand::after { animation: none; }
    }
    nav { display: flex; gap: 1.1rem; flex-wrap: wrap; }
    nav a { color: var(--dim, #97a1ad); text-decoration: none; }
    nav a:hover { color: var(--ink, #e9e5da); }
    nav a[aria-current="page"] {
      color: var(--accent-ink, #f0bf7e);
      text-decoration: underline;
      text-underline-offset: 5px;
    }
    button {
      margin-left: auto;
      font: inherit;
      font-size: 0.72rem;
      letter-spacing: 0.06em;
      background: transparent;
      color: var(--dim, #97a1ad);
      border: 1px solid var(--line-2, #333e4d);
      border-radius: 4px;
      padding: 0.15rem 0.55rem;
      cursor: pointer;
    }
    button:hover { color: var(--ink, #e9e5da); border-color: var(--accent, #e2a458); }
    footer {
      border-top: 1px solid var(--line, #242d39);
      margin-top: 4rem;
      font-family: var(--mono, monospace);
      font-size: 0.72rem;
      color: var(--dim, #97a1ad);
    }
    .foot {
      max-width: 64rem;
      margin: 0 auto;
      padding: 1.3rem 1.5rem 2rem;
      display: flex;
      gap: 0.6rem 2rem;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    footer a { color: var(--dim, #97a1ad); }
    footer a:hover { color: var(--accent-ink, #f0bf7e); }
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
        <div class="bar">
          <a class="brand" href="/">zecor</a>
          <nav>
            ${PAGES.filter(([p]) => p !== "/").map(
              ([p, label]) =>
                html`<a href=${p} aria-current=${this.path === p ? "page" : "false"}>${label}</a>`,
            )}
          </nav>
          <button @click=${this.toggle} aria-label="Toggle colour theme">theme</button>
        </div>
      </header>
      <slot></slot>
      <footer>
        <div class="foot">
          <span>© 2026 Hilachem Ventures LLC · Zecor is released under the Apache License 2.0</span>
          <a href="https://github.com/zecordev">github.com/zecordev</a>
        </div>
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
