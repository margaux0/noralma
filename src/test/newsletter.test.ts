import { describe, expect, it } from "vitest";
import { NEWSLETTER_DELAY_MS, newsletterSchema, shouldInviteToNewsletter } from "@/lib/newsletter";

describe("La carta de Noralma", () => {
  it("espera nueve segundos antes de invitar", () => {
    expect(NEWSLETTER_DELAY_MS).toBe(9000);
    expect(shouldInviteToNewsletter(null, 8999)).toBe(false);
    expect(shouldInviteToNewsletter(null, 9000)).toBe(true);
  });
  it("no repite una invitación cerrada", () => {
    expect(shouldInviteToNewsletter("dismissed", 9000)).toBe(false);
  });
  it("no invita a quien ya ha solicitado la suscripción", () => {
    expect(shouldInviteToNewsletter("subscribed", 9000)).toBe(false);
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