import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const OWNER_EMAIL = "noracano4@gmail.com";

function fecha() {
  return new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" });
}

async function notify(fields: Record<string, string>) {
  // Free relay (FormSubmit). The first message triggers an activation email to the owner.
  const res = await fetch(`https://formsubmit.co/ajax/${OWNER_EMAIL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json", Referer: "https://noralmapsicologia.com/" },
    body: JSON.stringify({ _template: "table", _captcha: "false", ...fields }),
  });
  const body = await res.text();
  if (!res.ok) console.error(`FormSubmit failed [${res.status}]: ${body}`);
  return { ok: res.ok, body };
}

const contactInput = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(2000),
  website: z.string().max(0).optional(), // honeypot
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((d) => contactInput.parse(d))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("contact_messages")
      .insert({ name: data.name, email: data.email, message: data.message });
    if (error) {
      console.error(error);
      return { ok: false };
    }
    await notify({
      _subject: "Nuevo contacto desde la web de Noralma",
      _replyto: data.email,
      Nombre: data.name,
      Correo: data.email,
      Mensaje: data.message,
      Fecha: fecha(),
    });
    return { ok: true };
  });

const newsletterInput = z.object({
  email: z.string().trim().toLowerCase().email().max(255),
  website: z.string().max(0).optional(),
});

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator((d) => newsletterInput.parse(d))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("newsletter_subscribers")
      .upsert({ email: data.email }, { onConflict: "email", ignoreDuplicates: true })
      .select("id");
    if (error) {
      console.error(error);
      return { ok: false };
    }
    // Only notify for a genuinely new subscriber (avoids duplicate notifications).
    if (row && row.length > 0) {
      await notify({
        _subject: "Nueva suscripción a la newsletter de Noralma",
        Correo: data.email,
        Fecha: fecha(),
      });
    }
    return { ok: true };
  });
