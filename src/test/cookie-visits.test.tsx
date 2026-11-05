import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { CookieConsent } from "@/components/CookieConsent";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children }: { children: ReactNode }) => <span>{children}</span>,
}));

afterEach(() => { cleanup(); localStorage.clear(); });

describe("Cookies en cada visita", () => {
  it("pregunta de nuevo aunque la visita anterior haya rechazado cookies", () => {
    localStorage.setItem("noralma-cookie-consent", JSON.stringify({ necessary: true, analytics: false, date: "2026-11-05" }));
    const first = render(<CookieConsent />);
    expect(screen.getByRole("dialog", { name: "Preferencias de cookies" })).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Rechazar", exact: true }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(JSON.parse(localStorage.getItem("noralma-cookie-consent") ?? "{}").analytics).toBe(false);
    first.unmount();
    render(<CookieConsent />);
    expect(screen.getByRole("dialog", { name: "Preferencias de cookies" })).toBeVisible();
  });
});