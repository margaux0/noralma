import { useEffect, useId, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EspiralMarca } from "@/components/EspiralMarca";
import { NEWSLETTER_DELAY_MS, NEWSLETTER_PREFERENCE_KEY, NEWSLETTER_READY, newsletterSchema, shouldInviteToNewsletter } from "@/lib/newsletter";

function NewsletterForm({ popup = false }: { popup?: boolean }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = newsletterSchema.safeParse({ email, consent });
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Revisa los datos del formulario.");
      return;
    }
    // Never pretend to have stored or subscribed an address.
    setError("Las suscripciones todavía no están abiertas. Tu correo no se ha guardado.");
  }

  return (
    <form onSubmit={submit} className="space-y-4" aria-label={popup ? "Suscripción desde la invitación" : "Suscripción a La carta de Noralma"}>
      <div>
        <label htmlFor={`${id}-email`} className="mb-2 block text-sm font-medium">Correo electrónico</label>
        <Input id={`${id}-email`} type="email" autoComplete="email" placeholder="Tu correo electrónico" maxLength={255} required value={email} onChange={(event) => setEmail(event.target.value)} className="h-12 bg-card shadow-none" aria-describedby={`${id}-availability`} />
      </div>
      <label className="flex min-h-11 items-start gap-3 text-sm leading-relaxed text-muted-foreground">
        <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required className="mt-1 size-5 shrink-0 accent-primary" />
        <span>Quiero recibir La carta de Noralma y acepto la <Link to="/privacidad" className="text-primary underline underline-offset-4">política de privacidad</Link>.</span>
      </label>
      <Button type="submit" disabled={!NEWSLETTER_READY} className="h-auto min-h-12 w-full whitespace-normal px-5 py-3 shadow-none">{popup ? "Quiero recibirla" : "Quiero formar parte"}</Button>
      <p id={`${id}-availability`} className="text-sm leading-relaxed text-muted-foreground">Las suscripciones todavía no están abiertas.</p>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <p className="text-xs leading-relaxed text-muted-foreground">Responsable: Nora Gallardo Cano. Usaremos tu correo solo para enviarte La carta de Noralma, con tu consentimiento. No incluyas información de salud.</p>
      <p className="text-xs leading-relaxed text-muted-foreground">{popup ? "Sin ruido ni exigencias. Puedes darte de baja cuando quieras." : "Recibirás únicamente comunicaciones de Noralma. Sin saturar tu bandeja de entrada y con la posibilidad de darte de baja cuando quieras."}</p>
    </form>
  );
}

export function NewsletterSection() {
  return (
    <section id="la-carta-de-noralma" aria-labelledby="newsletter-title" className="border-t border-primary/20 bg-sand/30">
      <div className="mx-auto grid max-w-6xl gap-9 px-6 py-16 md:grid-cols-[1.1fr_1fr] md:gap-20 md:py-20">
        <div>
          <EspiralMarca className="size-14" />
          <h2 id="newsletter-title" className="mt-5 font-display text-3xl font-medium text-primary md:text-4xl">Un espacio para ti.</h2>
          <p className="mt-4 font-display text-xl">La carta de Noralma</p>
          <p className="mt-5 max-w-[48ch] text-base leading-relaxed text-muted-foreground">De vez en cuando, me gustaría hacerte llegar algo más que palabras: reflexiones, ejercicios, herramientas y pequeñas pausas para acompañarte a comprenderte y cuidar de tu bienestar emocional.</p>
        </div>
        <div className="self-center"><NewsletterForm /></div>
      </div>
    </section>
  );
}

export function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let preference: string | null;
    try { preference = localStorage.getItem(NEWSLETTER_PREFERENCE_KEY); }
    catch { return; } // Without storage we cannot honour the no-repeat choice.
    const timer = window.setTimeout(() => {
      if (shouldInviteToNewsletter(preference, NEWSLETTER_DELAY_MS)) setOpen(true);
    }, NEWSLETTER_DELAY_MS);
    const sync = (event: StorageEvent) => {
      if (event.key === NEWSLETTER_PREFERENCE_KEY && event.newValue !== null) setOpen(false);
    };
    window.addEventListener("storage", sync);
    return () => { window.clearTimeout(timer); window.removeEventListener("storage", sync); };
  }, []);

  function close() {
    setOpen(false);
    try { localStorage.setItem(NEWSLETTER_PREFERENCE_KEY, "dismissed"); } catch { /* Storage can be unavailable. */ }
  }

  return (
    <Dialog.Root open={open} onOpenChange={(value) => { if (!value) close(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-foreground/30" />
        <Dialog.Content onOpenAutoFocus={(event) => event.preventDefault()} className="fixed left-1/2 top-1/2 z-[71] max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg border border-primary/20 bg-background p-6 shadow-lg sm:p-8">
          <Dialog.Close asChild><Button variant="ghost" size="icon" aria-label="Cerrar invitación a La carta de Noralma" title="Cerrar" className="absolute right-3 top-3 size-11"><X /></Button></Dialog.Close>
          <EspiralMarca className="size-11" />
          <Dialog.Title className="mt-4 pr-6 font-display text-2xl font-medium leading-tight text-primary">La carta de Noralma</Dialog.Title>
          <Dialog.Description className="mb-6 mt-4 text-sm leading-relaxed text-muted-foreground">
            <span className="mb-3 block font-display text-lg text-foreground">¿Te gustaría recibir una pequeña carta de vez en cuando?</span>
            Un espacio donde compartiré contigo reflexiones sobre psicología, herramientas para tu bienestar emocional y pequeños recursos que quizás puedan acompañarte en tu día a día.
          </Dialog.Description>
          <NewsletterForm popup />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}