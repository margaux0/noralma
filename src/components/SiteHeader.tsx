import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/", label: "Inicio", exact: true },
  { to: "/acerca-de-mi", label: "Sobre mí" },
  { to: "/terapia-online", label: "Terapia online" },
  { to: "/servicios", label: "Áreas de acompañamiento" },
  { to: "/#recursos", label: "Recursos", hash: true },
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
          className="flex shrink-0 flex-col font-display text-2xl font-semibold"
          onClick={() => setOpen(false)}
        >
          Noralma <span className="text-xs font-normal text-muted-foreground">| psicología clínica con alma</span>
        </Link>
        <nav aria-label="Menú principal" className="hidden items-center gap-4 text-sm font-medium text-foreground/70 xl:flex">
          {navItems.map((item) =>
            "hash" in item ? (
              <a
                key={item.label}
                href={item.to}
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
          <Button asChild className="hidden h-auto rounded-md px-4 py-2.5 shadow-none xl:inline-flex"><a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
          >
            Reservar sesión
          </a></Button>
          <Button
            variant="outline"
            size="icon"
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="inline-flex size-10 text-foreground/70 shadow-none xl:hidden"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </Button>
        </div>
      </div>
      {open && (
        <nav
          id="menu-movil"
          aria-label="Menú principal"
          className="border-t border-foreground/10 bg-background px-6 pb-5 pt-2 xl:hidden"
        >
          <ul className="flex flex-col gap-0.5 text-base font-medium text-foreground/80">
            {navItems.map((item) =>
              "hash" in item ? (
                <li key={item.label}>
                  <a
                    href={item.to}
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
          <Button asChild className="mt-3 h-auto w-full whitespace-normal rounded-md px-5 py-3 shadow-none"><a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
          >
            Reservar sesión
          </a></Button>
        </nav>
      )}
    </header>
  );
}
