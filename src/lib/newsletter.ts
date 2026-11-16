import { z } from "zod";

export const NEWSLETTER_DELAY_MS = 0;
export const NEWSLETTER_LIST_NAME = "Newsletter Noralma";

export const newsletterSchema = z.object({
  email: z.string().trim().email("Introduce un correo electrónico válido.").max(255, "El correo es demasiado largo.").transform((value) => value.toLowerCase()),
  consent: z.literal(true, { errorMap: () => ({ message: "Necesitamos tu consentimiento para enviarte La carta de Noralma." }) }),
});

export function shouldInviteToNewsletter(elapsedMs: number, cookiesVisible: boolean) {
  return NEWSLETTER_READY && !cookiesVisible && elapsedMs >= NEWSLETTER_DELAY_MS;
}

// Reopen only after delivery, double opt-in, welcome and unsubscribe are verified.
export const NEWSLETTER_READY = false;