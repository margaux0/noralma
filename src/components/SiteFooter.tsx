import { Link } from "@tanstack/react-router";
import { openCookieSettings } from "@/components/CookieConsent";
import { COLEGIADA, CONTACT_EMAIL, INSTAGRAM_URL, LINKEDIN_URL, WHATSAPP_URL } from "@/lib/contact";

const linkClass = "transition-colors hover:text-primary";

export function SiteFooter() {
  return (
    <footer className="bg-sand/60 ring-1 ring-foreground/5">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link to="/" className="font-display text-xl font-semibold">
            Noralma <span className="font-sans text-sm font-normal text-foreground/70">| psicología clínica con alma</span>
          </Link>
          <p className="mt-3 max-w-[38ch] text-sm leading-relaxed text-foreground/65 text-pretty">
            Nora Gallardo Cano · Psicóloga General Sanitaria · Col. {COLEGIADA}. Terapia online y
            presencial en Vilanova i la Geltrú.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Reserva tu sesión
          </a>
        </div>
        <nav aria-label="Secciones" className="flex flex-col gap-2 text-sm text-foreground/70">
          <p className="mb-1 font-semibold text-foreground">La web</p>
          <Link to="/terapia-online" className={linkClass}>Terapia online</Link>
          <Link to="/servicios" className={linkClass}>Servicios</Link>
          <Link to="/acerca-de-mi" className={linkClass}>Sobre mí</Link>
          <Link to="/blog" className={linkClass}>Blog</Link>
          <Link to="/contacto" className={linkClass}>Contacto</Link>
        </nav>
        <div className="flex flex-col gap-2 text-sm text-foreground/70">
          <p className="mb-1 font-semibold text-foreground">Sígueme</p>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className={linkClass}>Instagram</a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className={linkClass}>LinkedIn</a>
          <a href="https://www.tiktok.com/@noralma.psico" target="_blank" rel="noreferrer" className={linkClass}>TikTok</a>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className={linkClass}>WhatsApp</a>
          <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>{CONTACT_EMAIL}</a>
        </div>
        <nav aria-label="Legal" className="flex flex-col gap-2 text-sm text-foreground/70">
          <p className="mb-1 font-semibold text-foreground">Legal</p>
          <Link to="/aviso-legal" className={linkClass}>Aviso legal</Link>
          <Link to="/privacidad" className={linkClass}>Política de privacidad</Link>
          <Link to="/cookies" className={linkClass}>Política de cookies</Link>
          <button type="button" onClick={openCookieSettings} className={`text-left ${linkClass}`}>
            Configuración de cookies
          </button>
        </nav>
      </div>
      <div className="mx-auto max-w-6xl px-6 pb-8 text-xs text-foreground/55">
        © {new Date().getFullYear()} Noralma · Nora Gallardo Cano, Psicóloga General Sanitaria.
      </div>
    </footer>
  );
}
