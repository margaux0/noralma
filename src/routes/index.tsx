import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import heroNoraAsset from "@/assets/hero-nora.png.asset.json";
const heroNora = heroNoraAsset.url;
import guiaCuaderno from "@/assets/guia-cuaderno.jpg";
import guiaAnsiedad from "@/assets/guia-ansiedad.jpg";
import guiaAutocuidado from "@/assets/guia-autocuidado.jpg";
import { coverFor, fetchPosts, formatDate } from "@/lib/blog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Noralma · Nora, psicóloga" },
      {
        name: "description",
        content:
          "A veces no necesitas hacer más. Necesitas entender mejor lo que te pasa. Noralma es el espacio de Nora, psicóloga: sesiones, guías gratuitas y un blog para acercarte a ti.",
      },
      { property: "og:title", content: "Noralma · Nora, psicóloga" },
      {
        property: "og:description",
        content:
          "Un espacio cálido para acercarte un poco más a ti, a tu ritmo, sin prisa y sin juicios.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const servicios = [
  {
    num: "01",
    title: "Sesiones individuales",
    text: "Un espacio de confianza para entender lo que te pasa, a tu ritmo.",
  },
  {
    num: "02",
    title: "Acompañamiento guiado",
    text: "Un camino de seguimiento para sostener tus avances día a día.",
  },
  {
    num: "03",
    title: "Recursos gratuitos",
    text: "Material para empezar cuando todavía no es momento de una sesión.",
  },
];

const guias = [
  {
    img: guiaCuaderno,
    title: "Cuaderno de Estimulación Cognitiva",
    text: "Ejercicios suaves para cuidar tu mente.",
  },
  {
    img: guiaAnsiedad,
    title: "Cómo gestionar la Ansiedad",
    text: "Pasos concretos para bajar el ruido mental.",
  },
  {
    img: guiaAutocuidado,
    title: "Guía de Autocuidado",
    text: "Pequeñas rutinas para cuidarte sin agobiarte.",
  },
];

const instagramPosts = [
  {
    img: guiaAnsiedad,
    caption: "3 señales de que tu ansiedad necesita pausa, no más productividad.",
  },
  {
    img: guiaAutocuidado,
    caption: "Ritual de autocuidado para noches de cabeza acelerada.",
  },
  {
    img: guiaCuaderno,
    caption: "Un cuaderno para cuidar tu mente, poco a poco.",
  },
];

function Index() {
  const { data: posts } = useQuery({ queryKey: ["blog-posts"], queryFn: fetchPosts });
  const latestPosts = (posts ?? []).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
        <div className="rise">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage">
            Nora · Psicóloga
          </p>
          <h1 className="mt-5 font-display text-4xl font-medium leading-tight text-balance md:text-6xl">
            A veces no necesitas hacer más. Necesitas entender mejor lo que te pasa.
          </h1>
          <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-foreground/70 text-pretty">
            Gracias por estar aquí. Noralma es un espacio cálido para acercarte un poco
            más a ti, a tu ritmo, sin prisa y sin juicios.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contacto"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground ring-1 ring-primary/40 transition-colors hover:bg-primary/90"
            >
              Reservar sesión
            </Link>
            <a
              href="#guias"
              className="rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-foreground/80 ring-1 ring-foreground/5 transition-colors hover:bg-sand/70"
            >
              Guías gratuitas
            </a>
          </div>
        </div>
        <div className="rise" style={{ animationDelay: ".15s" }}>
          <img
            src={heroNora}
            alt="Nora, psicóloga, en su consulta"
            width={912}
            height={1104}
            style={{ objectPosition: "center 72%" }}
            className="aspect-[4/5] w-full rounded-3xl object-cover ring-1 ring-foreground/5"
          />
        </div>
      </section>

      {/* Servicios */}
      <section className="bg-secondary ring-1 ring-foreground/5">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <h2 className="font-display text-3xl font-medium text-balance md:text-4xl">
            Servicios
          </h2>
          <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-foreground/65 text-pretty">
            Acompañamiento psicológico a tu ritmo. Estoy definiendo cada formato; pronto
            podrás ver los detalles.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {servicios.map((s) => (
              <div
                key={s.num}
                className="rounded-2xl bg-background p-7 ring-1 ring-foreground/5 transition-transform hover:-translate-y-1"
              >
                <div className="grid size-11 place-items-center rounded-full bg-honey/25 text-xl text-primary">
                  {s.num}
                </div>
                <h3 className="mt-5 font-display text-xl font-medium">{s.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-foreground/65 text-pretty">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              to="/servicios"
              className="text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              Ver todos los servicios →
            </Link>
          </div>
        </div>
      </section>

      {/* Guías */}
      <section id="guias" className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <h2 className="font-display text-3xl font-medium text-balance md:text-4xl">
          Guías para empezar
        </h2>
        <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-foreground/65 text-pretty">
          Descárgalas gratis. Son un primer paso suave, sin compromiso.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {guias.map((g) => (
            <div
              key={g.title}
              className="flex items-center gap-5 rounded-2xl bg-background p-6 ring-1 ring-foreground/5 transition-transform hover:-translate-y-1"
            >
              <img
                src={g.img}
                alt={g.title}
                width={736}
                height={912}
                loading="lazy"
                className="h-28 w-20 shrink-0 rounded-lg object-cover ring-1 ring-foreground/5"
              />
              <div className="min-w-0">
                <h3 className="font-display text-lg font-medium leading-snug text-balance">
                  {g.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-foreground/65">{g.text}</p>
                <a
                  href="https://linktr.ee/noralma.psico"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground ring-1 ring-primary/40 transition-colors hover:bg-primary/90"
                >
                  Descargar
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Blog */}
      <section className="bg-secondary ring-1 ring-foreground/5">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-medium text-balance md:text-4xl">
              Desde el blog
            </h2>
            <Link
              to="/blog"
              className="text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              Ver todo →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {latestPosts.map((post) => (
              <Link
                key={post.id}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="rounded-2xl bg-background ring-1 ring-foreground/5 transition-transform hover:-translate-y-1"
              >
                <img
                  src={coverFor(post)}
                  alt={post.title}
                  width={1024}
                  height={640}
                  loading="lazy"
                  className="h-40 w-full rounded-t-2xl object-cover"
                />
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sage">
                    {post.category}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-medium leading-snug text-balance">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/65 text-pretty">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram */}
      <section id="instagram" className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-medium text-balance md:text-4xl">
            En Instagram
          </h2>
          <a
            href="https://www.instagram.com/noralma.psico"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            @noralma.psico →
          </a>
        </div>
        <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-foreground/65 text-pretty">
          Lo último que comparto por allí. Sígueme para no perderte nada.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {instagramPosts.map((post) => (
            <a
              key={post.caption}
              href="https://www.instagram.com/noralma.psico"
              target="_blank"
              rel="noreferrer"
              className="group block"
            >
              <img
                src={post.img}
                alt={post.caption}
                width={736}
                height={912}
                loading="lazy"
                className="aspect-square w-full rounded-xl object-cover ring-1 ring-foreground/5 transition-transform group-hover:-translate-y-1"
              />
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                {post.caption}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Contacto */}
      <section className="bg-secondary ring-1 ring-foreground/5">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-medium text-balance md:text-4xl">
              Hablemos
            </h2>
            <p className="mt-3 text-base leading-relaxed text-foreground/65 text-pretty">
              Cuéntame qué te trae aquí. Te respondo personalmente, sin prisa y con total
              privacidad.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contacto"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground ring-1 ring-primary/40 transition-colors hover:bg-primary/90"
              >
                Escribir un mensaje
              </Link>
              <a
                href="https://linktr.ee/noralma.psico"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground/80 ring-1 ring-foreground/5 transition-colors hover:bg-sand/70"
              >
                TikTok · Instagram · WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
