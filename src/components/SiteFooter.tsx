import { Link } from "@tanstack/react-router";
import { openCookieSettings } from "@/components/CookieConsent";
import {
  COLEGIADA,
  CONTACT_EMAIL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  TIKTOK_URL,
  WHATSAPP_URL,
} from "@/lib/contact";
import { Button } from "@/components/ui/button";
import { EspiralMarca } from "@/components/EspiralMarca";

const linkClass =
  "inline-flex min-h-11 items-center text-sm text-foreground/70 transition-colors hover:text-primary";
const labelClass = "text-xs font-semibold uppercase tracking-[0.14em] text-primary";
const hairline = "h-px w-full bg-primary/25";

export function SiteFooter() {
  return (
    <footer className="bg-sand/60">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
        <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <EspiralMarca className="size-10 shrink-0" />
              <Link to="/" className="font-display text-2xl font-semibold">
                Noralma
              </Link>
            </div>
            <p className="mt-2 font-display text-lg italic text-primary">Psicología con alma.</p>
            <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-foreground/65">
              Nora Gallardo Cano · Psicóloga General Sanitaria · Col. {COLEGIADA}
            </p>
          </div>
          <Button asChild className="h-11 rounded-md shadow-none">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              Reserva tu sesión
            </a>
          </Button>
        </div>

        <div className={`mt-10 ${hairline}`} />

        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <nav aria-label="Navegación" className="flex flex-col items-start gap-1">
            <p className={labelClass}>Navegación</p>
            <Link to="/" className={linkClass}>Inicio</Link>
            <Link to="/acerca-de-mi" className={linkClass}>Sobre mí</Link>
            <Link to="/terapia-online" className={linkClass}>Terapia online</Link>
            <Link to="/servicios" className={linkClass}>Servicios</Link>
            <Link to="/" hash="recursos" className={linkClass}>Recursos</Link>
            <Link to="/blog" className={linkClass}>Blog</Link>
            <Link to="/contacto" className={linkClass}>Contacto</Link>
          </nav>

          <div className="flex flex-col items-start gap-1">
            <p className={labelClass}>Contacto</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>{CONTACT_EMAIL}</a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className={linkClass}>Instagram · @noralma.psicologia</a>
            <a href={TIKTOK_URL} target="_blank" rel="noreferrer" className={linkClass}>TikTok · @noralma.psicologia</a>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className={linkClass}>LinkedIn</a>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className={linkClass}>WhatsApp</a>
          </div>

          <nav aria-label="Información legal" className="flex flex-col items-start gap-1">
            <p className={labelClass}>Información legal</p>
            <Link to="/aviso-legal" className={linkClass}>Aviso legal</Link>
            <Link to="/privacidad" className={linkClass}>Política de privacidad</Link>
            <Link to="/cookies" className={linkClass}>Política de cookies</Link>
            <Button
              variant="link"
              type="button"
              onClick={openCookieSettings}
              className="h-auto min-h-11 justify-start px-0 text-left text-sm font-normal text-foreground/70 transition-colors hover:text-primary"
            >
              Configuración de cookies
            </Button>
          </nav>
        </div>

        <div className={`mt-12 ${hairline}`} />

        <p className="mt-5 text-xs leading-relaxed text-foreground/55">
          © {new Date().getFullYear()} Noralma · Nora Gallardo Cano, Psicóloga General Sanitaria ·
          Col. {COLEGIADA}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
