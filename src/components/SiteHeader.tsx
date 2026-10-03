import { Link } from "@tanstack/react-router";

const navItems = [
  { to: "/servicios", label: "Servicios" },
  { to: "/blog", label: "Blog" },
  { to: "/#instagram", label: "Instagram", hash: true },
  { to: "/contacto", label: "Contacto" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm ring-1 ring-foreground/5">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-2xl font-semibold tracking-tight">
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
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <Link
          to="/contacto"
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground ring-1 ring-primary/40 transition-colors hover:bg-primary/90"
        >
          Reservar sesión
        </Link>
      </div>
    </header>
  );
}
