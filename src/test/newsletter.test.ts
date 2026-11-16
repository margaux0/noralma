import { describe, expect, it } from "vitest";
import { NEWSLETTER_READY, newsletterSchema, shouldInviteToNewsletter } from "@/lib/newsletter";

describe("La carta de Noralma", () => {
  it("mantiene las altas cerradas hasta verificar el servicio completo", () => {
    expect(NEWSLETTER_READY).toBe(false);
  });
  it("no invita automáticamente con la newsletter desactivada", () => {
    expect(shouldInviteToNewsletter(0, false)).toBe(false);
    expect(shouldInviteToNewsletter(10000, false)).toBe(false);
    expect(shouldInviteToNewsletter(10000, true)).toBe(false);
  });
  it("exige consentimiento expreso", () => {
    expect(newsletterSchema.safeParse({ email: "nora@example.org", consent: false }).success).toBe(false);
    expect(newsletterSchema.safeParse({ email: "nora@example.org", consent: true }).success).toBe(true);
  });
  it("rechaza direcciones que no son correos", () => {
    expect(newsletterSchema.safeParse({ email: "no-es-un-correo", consent: true }).success).toBe(false);
  });
  it("normaliza el correo para evitar variantes duplicadas", () => {
    expect(newsletterSchema.parse({ email: " Nora@Example.org ", consent: true }).email).toBe("nora@example.org");
  });
});