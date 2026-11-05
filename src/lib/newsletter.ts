import { z } from "zod";

export const NEWSLETTER_DELAY_MS = 9000;
export const NEWSLETTER_PREFERENCE_KEY = "noralma-newsletter-preference";
export const NEWSLETTER_LIST_NAME = "Newsletter Noralma";

export const newsletterSchema = z.object({
  email: z.string().trim().email("Introduce un correo electrónico válido.").max(255, "El correo es demasiado largo.").transform((value) => value.toLowerCase()),
  consent: z.literal(true, { errorMap: () => ({ message: "Necesitamos tu consentimiento para enviarte La carta de Noralma." }) }),
});

export function shouldInviteToNewsletter(preference: string | null, elapsedMs: number) {
  return preference === null && elapsedMs >= NEWSLETTER_DELAY_MS;
}

// Brevo is not connected yet. Keep collection off until double opt-in,
// welcome automation and unsubscribe have been verified with the owner.
export const NEWSLETTER_READY = false;