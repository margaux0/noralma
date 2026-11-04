import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact";

const navItems = [
  { to: "/", label: "Inicio", exact: true },
  { to: "/acerca-de-mi", label: "Acerca de mí" },
  { to: "/servicios", label: "Servicios" },
  { to: "/blog", label: "Blog" },
  { to: "/#instagram", label: "Instagram", hash: true },
  { to: "/contacto", label: "Contacto" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm ring-1 ring-foreground/5">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="font-display text-2xl font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          Noralma<span className="text-primary">.</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-foreground/70 md:flex">
          {navItems.map((item) =>
            "hash" in item ? (
              <a
                key={item.label}
                href="/#instagram"
                className="transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.to}
                className="transition-colors hover:text-primary"
                activeProps={{ className: "text-primary" }}
                {...("exact" in item && item.exact
                  ? { activeOptions: { exact: true } }
                  : {})}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground ring-1 ring-primary/40 transition-colors hover:bg-primary/90 md:inline-flex"
          >
            Reservar sesión
          </a>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="inline-flex size-10 items-center justify-center rounded-full text-foreground/70 ring-1 ring-foreground/10 transition-colors hover:bg-foreground/5 hover:text-primary md:hidden"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="menu-movil"
          aria-label="Menú principal"
          className="border-t border-foreground/10 bg-background px-6 pb-5 pt-2 md:hidden"
        >
          <ul className="flex flex-col gap-0.5 text-base font-medium text-foreground/80">
            {navItems.map((item) =>
              "hash" in item ? (
                <li key={item.label}>
                  <a
                    href="/#instagram"
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-foreground/5 hover:text-primary"
                  >
                    {item.label}
                  </a>
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-foreground/5 hover:text-primary"
                    activeProps={{ className: "text-primary" }}
                    {...("exact" in item && item.exact
                      ? { activeOptions: { exact: true } }
                      : {})}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-3 block rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground ring-1 ring-primary/40 transition-colors hover:bg-primary/90"
          >
            Reservar sesión
          </a>
        </nav>
      )}
    </header>
  );
}
