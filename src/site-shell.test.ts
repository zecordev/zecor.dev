import { describe, expect, it } from "vitest";
import "./site-shell";

describe("<zecor-doc>", () => {
  it("renders the nav and marks the current page", async () => {
    const el = document.createElement("zecor-doc");
    el.setAttribute("path", "/security");
    document.body.append(el);
    await (el as any).updateComplete;
    const links = [...(el.shadowRoot?.querySelectorAll("nav a") ?? [])];
    expect(links.map((a) => a.textContent)).toContain("Security");
    const current = el.shadowRoot?.querySelector('nav a[aria-current="page"]');
    expect(current?.getAttribute("href")).toBe("/security");
    el.remove();
  });

  it("toggles the theme attribute", async () => {
    delete document.documentElement.dataset.theme;
    const el = document.createElement("zecor-doc");
    document.body.append(el);
    await (el as any).updateComplete;
    (el.shadowRoot?.querySelector("button") as HTMLButtonElement).click();
    expect(document.documentElement.dataset.theme).toBe("light");
    el.remove();
  });
});
