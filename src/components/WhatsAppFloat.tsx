import { useEffect, useState, type SVGProps } from "react";
import { WHATSAPP_INFO_URL } from "@/lib/contact";
import { COOKIE_VISIBILITY_EVENT } from "@/components/CookieConsent";

/** El botón aparece 2 segundos después de entrar y ya no se va al navegar. */
const APPEAR_AFTER_MS = 2000;

function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 448 512" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 110.9L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.1-3.2-5.5-.3-8.4 2.4-11.2 2.5-2.5 5.5-6.4 8.3-9.6 2.8-3.2 3.7-5.5 5.5-9.3 1.9-3.7.9-6.9-.4-9.4-1.4-2.5-12.5-30-17.1-41.1-4.5-10.9-9.1-9.4-12.5-9.6-3.4-.2-7.3-.2-11.2-.2-3.9 0-10.2 1.4-15.6 6.9-5.3 5.6-20.3 19.8-20.3 48.3 0 28.5 20.8 56 23.7 59.9 2.9 4 41 62.6 99.3 87.8 13.9 6 24.7 9.6 33.1 12.3 13.9 4.4 26.6 3.8 36.6 2.3 11.2-1.7 34.5-14.1 39.3-27.7 4.9-13.7 4.9-25.4 3.4-27.8-1.4-2.5-5.4-4-10.9-6.8z" />
    </svg>
  );
}

export function WhatsAppFloat() {
  const [ready, setReady] = useState(false);
  const [cookiesVisible, setCookiesVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), APPEAR_AFTER_MS);
    const sync = (event: Event) =>
      setCookiesVisible((event as CustomEvent<boolean>).detail);
    window.addEventListener(COOKIE_VISIBILITY_EVENT, sync);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(COOKIE_VISIBILITY_EVENT, sync);
    };
  }, []);

  // Mientras la pregunta de cookies está abierta no se muestra: en el teléfono
  // ocuparían el mismo sitio y se taparían entre sí.
  if (!ready || cookiesVisible) return null;

  return (
    <a
      href={WHATSAPP_INFO_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="¿Hablamos? Escribe a Nora por WhatsApp"
      className="wa-float fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/95 py-1.5 pl-1.5 pr-3.5 text-[13px] font-medium text-primary backdrop-blur-sm transition-colors hover:bg-card sm:bottom-6 sm:right-6 sm:gap-2.5 sm:py-2 sm:pl-2 sm:pr-5 sm:text-sm"
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground sm:size-9">
        <WhatsAppIcon className="size-4 sm:size-[18px]" />
      </span>
      ¿Hablamos?
    </a>
  );
}
