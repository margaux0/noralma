import { describe, expect, it } from "vitest";
import { NEWSLETTER_DELAY_MS, newsletterSchema, shouldInviteToNewsletter } from "@/lib/newsletter";

describe("La carta de Noralma", () => {
  it("invita en cuanto se entra, sin espera", () => {
    expect(NEWSLETTER_DELAY_MS).toBe(0);
    expect(shouldInviteToNewsletter(0, false)).toBe(true);
  });
  it("espera a que se cierre la pregunta de cookies", () => {
    expect(shouldInviteToNewsletter(9000, true)).toBe(false);
  });
  it("invita en una nueva visita sin depender de decisiones anteriores", () => {
    expect(shouldInviteToNewsletter(10000, false)).toBe(true);
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