import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-background ring-1 ring-foreground/5">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center">
        <div>
          <Link to="/" className="font-display text-xl font-semibold">
            Noralma<span className="text-primary">.</span>
          </Link>
          <p className="mt-1 max-w-[42ch] text-sm leading-relaxed text-foreground/60 text-pretty">
            Psicología con alma para acompañarte en tu camino.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-foreground/70">
          <a
            href="https://www.instagram.com/noralma.psicologia"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-primary"
          >
            Instagram
          </a>
          <a
            href="https://linktr.ee/noralma.psico"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-primary"
          >
            TikTok
          </a>
          <a
            href="https://linktr.ee/noralma.psico"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-primary"
          >
            WhatsApp
          </a>
          <Link to="/blog" className="transition-colors hover:text-primary">
            Blog
          </Link>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 pb-8 text-xs text-foreground/50">
        © {new Date().getFullYear()} Noralma · Nora, psicóloga. Todos los derechos reservados.
      </div>
    </footer>
  );
}
