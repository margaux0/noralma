import { describe, expect, it } from "vitest";
import { ONLINE_WHATSAPP_URL, PRACTICA } from "@/lib/contact";

describe("Datos confirmados para terapia online", () => {
  it("mantiene el precio confirmado de 60 euros", () => {
    expect(PRACTICA.precio).toBe("60 €");
  });
  it("mantiene la duración confirmada de 60 minutos", () => {
    expect(PRACTICA.duracion).toBe("60 minutos");
  });
  it("solicita información y disponibilidad al número indicado, sin confirmar una cita", () => {
    const url = new URL(ONLINE_WHATSAPP_URL);
    expect(url.origin + url.pathname).toBe("https://wa.me/34611525410");
    expect(url.searchParams.get("text")).toBe("Hola, Nora. He visitado tu web y me gustaría recibir información sobre las sesiones de terapia online y la disponibilidad de primeras citas. Gracias");
  });
});