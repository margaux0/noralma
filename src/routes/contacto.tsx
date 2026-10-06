import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto · Noralma" },
      {
        name: "description",
        content:
          "Escríbeme y hablemos con calma. Te respondo personalmente, sin prisa y con total privacidad.",
      },
      { property: "og:title", content: "Contacto · Noralma" },
      {
        property: "og:description",
        content: "Cuéntame qué te trae aquí. Te respondo personalmente.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contacto" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contacto" }],
  }),
  component: ContactoPage,
});

const contactSchema = z.object({
  name: z.string().trim().min(1, "Cuéntame cómo te llamas").max(100),
  email: z.string().trim().email("Revisa tu correo, parece incompleto").max(255),
  message: z.string().trim().min(1, "Escríbeme unas líneas").max(2000),
});

function ContactoPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    const parsed = contactSchema.safeParse({ name, email, message });
    if (!parsed.success) {
      setFormError(parsed.error.issues[0]?.message ?? "Revisa el formulario");
      return;
    }
    setStatus("sending");
    const { error } = await supabase.from("contact_messages").insert(parsed.data);
    if (error) {
      setStatus("error");
      setFormError("No pude enviar tu mensaje. Inténtalo de nuevo en un momento.");
      return;
    }
    setStatus("sent");
    setName("");
    setEmail("");
    setMessage("");
  }

  const inputClass =
    "mt-2 w-full rounded-lg bg-secondary px-4 py-3 text-base outline-none ring-1 ring-foreground/5 focus:ring-2 focus:ring-primary/40";

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage">
          Contacto
        </p>
        <h1 className="mt-4 font-display text-4xl font-medium text-balance md:text-5xl">
          Hablemos
        </h1>
        <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-foreground/65 text-pretty">
          Cuéntame qué te trae aquí. Te respondo personalmente, sin prisa y con total
          privacidad. Si lo prefieres, también puedes escribirme directamente por
          WhatsApp.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="https://wa.me/34611525410"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground ring-1 ring-primary/40 transition-colors hover:bg-primary/90"
          >
            Escribir por WhatsApp
          </a>
          <a
            href="https://www.instagram.com/noralma.psicologia"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-foreground/80 ring-1 ring-foreground/5 transition-colors hover:bg-sand/70"
          >
            @noralma.psicologia
          </a>
        </div>
      </div>

      {status === "sent" ? (
        <div className="flex flex-col items-start justify-center rounded-2xl bg-background p-8 ring-1 ring-foreground/5">
          <h2 className="font-display text-2xl font-medium">Mensaje enviado 🤍</h2>
          <p className="mt-2 text-base leading-relaxed text-foreground/65">
            Gracias por escribir. Te responderé personalmente lo antes posible.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-6 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-foreground/80 ring-1 ring-foreground/5 transition-colors hover:bg-sand/70"
          >
            Enviar otro mensaje
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-background p-7 ring-1 ring-foreground/5"
        >
          <label className="block text-sm font-semibold" htmlFor="nombre">
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Cómo te llamas"
            className={inputClass}
          />
          <label className="mt-5 block text-sm font-semibold" htmlFor="correo">
            Correo
          </label>
          <input
            id="correo"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tucorreo@ejemplo.com"
            className={inputClass}
          />
          <label className="mt-5 block text-sm font-semibold" htmlFor="mensaje">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Cuéntame brevemente qué te gustaría trabajar"
            className={inputClass}
          />
          {formError && <p className="mt-3 text-sm text-destructive">{formError}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-6 w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground ring-1 ring-primary/40 transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {status === "sending" ? "Enviando…" : "Enviar mensaje"}
          </button>
        </form>
      )}
    </div>
  );
}
