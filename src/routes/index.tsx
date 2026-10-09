import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import heroNoraAsset from "@/assets/hero-nora.png.asset.json";
const heroNora = heroNoraAsset.url;
import guiaCuadernoAsset from "@/assets/cuaderno-estimulacion-cognitiva.png.asset.json";
import guiaAnsiedad from "@/assets/guia-ansiedad.jpg";
import ansiedadPortadaAsset from "@/assets/ansiedad-portada.jpeg.asset.json";
import guiaAutocuidado from "@/assets/guia-autocuidado.jpg";
import amorPropioPortadaAsset from "@/assets/amor-propio-portada.webp.asset.json";
import { coverFor, fetchPosts, formatDate } from "@/lib/blog";
import { ServiciosDestacados } from "@/components/ServiciosDestacados";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Noralma · Nora, Psicóloga Sanitaria" },
      {
        name: "description",
        content:
          "Mi propósito es acompañarte a sentirte bien contigo. Noralma es el espacio de Nora, Psicóloga Sanitaria: sesiones, guías gratuitas y un blog para acompañarte en tu camino.",
      },
      { property: "og:title", content: "Noralma · Nora, Psicóloga Sanitaria" },
      {
        property: "og:description",
        content:
          "A construir una relación contigo misma desde la que puedas entenderte, aceptarte y vivir de una forma que tenga sentido para ti.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});


const guias = [
  {
    img: guiaCuadernoAsset.url,
    title: "Cuaderno de Estimulación Cognitiva",
    text: "Ejercicios suaves para cuidar tu mente.",
    href: "https://drive.google.com/file/d/1Gy1gyvY84VNbBcx-tCfK0QnoDoQUk4GP/view?usp=drivesdk",
  },
  {
    img: ansiedadPortadaAsset.url,
    title: "Cómo gestionar la Ansiedad",
    text: "Pasos concretos para bajar el ruido mental.",
    href: "https://drive.google.com/file/d/1GFjKAurQ_GZ1Nqb4JXUtRAzi7r5cxBmL/view?usp=drivesdk",
  },
  {
    img: amorPropioPortadaAsset.url,
    title: "Guía práctica de Amor Propio",
    text: "Pequeñas rutinas para cuidarte sin agobiarte.",
    href: "https://drive.google.com/file/d/1NcGFcwPTquQt3K88Ga_R6JlISr7VEMfo/view?usp=drivesdk",
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
    img: guiaCuadernoAsset.url,
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
            Nora · Psicóloga Sanitaria
          </p>
          <h1 className="mt-5 font-display text-4xl font-medium leading-tight text-balance md:text-6xl">
            Mi propósito es acompañarte a sentirte bien contigo.
          </h1>
          <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-foreground/70 text-pretty">
            A construir una relación contigo misma desde la que puedas entenderte, aceptarte
            y vivir de una forma que tenga sentido para ti.
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
            alt="Nora, Psicóloga Sanitaria, en su consulta"
            width={912}
            height={1104}
            style={{ objectPosition: "center 72%" }}
            className="aspect-[4/5] w-full rounded-3xl object-cover ring-1 ring-foreground/5"
          />
        </div>
      </section>

      {/* Propósito */}
      <section className="mx-auto max-w-6xl px-6 pb-16 md:pb-24">
        <div className="max-w-2xl">
          <p className="font-display text-2xl font-medium leading-snug text-foreground text-pretty md:text-3xl">
            Para mí, gran parte de este proceso tiene que ver con una pregunta que parece
            sencilla, pero que puede acompañarnos durante toda la vida:{" "}
            <span className="text-primary">¿Quién soy yo?</span>
          </p>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-foreground/75 text-pretty">
            <p>
              No creo que exista una respuesta definitiva. Nuestra identidad no es algo que
              encontramos y dejamos quieto: cambia con lo que vivimos, con las personas que
              conocemos, con nuestras decisiones, nuestras pérdidas y nuestros vínculos.
            </p>
            <p>
              No llegamos a una versión final de quienes somos. Estamos en constante
              movimiento. Y creo que ahí está una de las partes más bonitas de la vida:
              poder seguir descubriéndonos, cuestionarnos, cambiar de dirección y
              permitirnos ser diferentes a quienes fuimos.
            </p>
            <p>
              En terapia, iremos dando espacio a todo ello para preguntarnos:{" "}
              <span className="font-semibold text-foreground">
                ¿Esto me acerca a mí o me aleja de mí?
              </span>
            </p>
          </div>
          <p className="mt-10 font-display text-xl font-medium leading-snug text-primary text-pretty md:text-2xl">
            “Estoy aquí. Me estoy escuchando. Y esta vida se parece cada vez un poco más
            a mí.”
          </p>
        </div>
      </section>

      {/* Servicios */}
      <section className="bg-secondary ring-1 ring-foreground/5">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <ServiciosDestacados />
          <div className="mt-10">
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
                  href={g.href}
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
            href="https://www.instagram.com/noralma.psicologia"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            @noralma.psicologia →
          </a>
        </div>
        <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-foreground/65 text-pretty">
          Lo último que comparto por allí. Sígueme para no perderte nada.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {instagramPosts.map((post) => (
            <a
              key={post.caption}
              href="https://www.instagram.com/noralma.psicologia"
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
                href="https://wa.me/34611525410"
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
