import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";

import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { COOKIE_VISIBILITY_EVENT } from "@/components/CookieConsent";

const CHAT_ESPERADO =
  "https://wa.me/34611525410?text=Hola%2C%20Nora.%20He%20visitado%20tu%20web%20de%20NORALMA%20y%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20tus%20servicios%20de%20psicolog%C3%ADa.";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

function mostrarBoton() {
  act(() => {
    vi.advanceTimersByTime(2000);
  });
}

describe("Botón flotante de WhatsApp", () => {
  it("no aparece hasta que pasan 2 segundos", () => {
    vi.useFakeTimers();
    render(<WhatsAppFloat />);

    expect(screen.queryByRole("link", { name: /¿Hablamos\?/ })).toBeNull();

    mostrarBoton();

    const boton = screen.getByRole("link", { name: /¿Hablamos\?/ });
    expect(boton).toBeVisible();
    expect(boton).toHaveAttribute("href", CHAT_ESPERADO);
    expect(boton).toHaveAttribute("target", "_blank");
  });

  it("se esconde mientras la pregunta de cookies está abierta", () => {
    vi.useFakeTimers();
    render(<WhatsAppFloat />);
    mostrarBoton();
    expect(screen.getByRole("link", { name: /¿Hablamos\?/ })).toBeVisible();

    act(() => {
      window.dispatchEvent(
        new CustomEvent(COOKIE_VISIBILITY_EVENT, { detail: true }),
      );
    });
    expect(screen.queryByRole("link", { name: /¿Hablamos\?/ })).toBeNull();

    act(() => {
      window.dispatchEvent(
        new CustomEvent(COOKIE_VISIBILITY_EVENT, { detail: false }),
      );
    });
    expect(screen.getByRole("link", { name: /¿Hablamos\?/ })).toBeVisible();
  });
});
