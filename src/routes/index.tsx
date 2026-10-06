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
          "Mi propósito es acompañarte a sentirte bien contigo. Noralma es el espacio de Nora, psicóloga: sesiones, guías gratuitas y un blog para acompañarte en tu camino.",
      },
      { property: "og:title", content: "Noralma · Nora, psicóloga" },
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
    href: "https://drive.google.com/file/d/1Gy1gyvY84VNbBcx-tCfK0QnoDoQUk4GP/view?usp=drivesdk",
  },
  {
    img: guiaAnsiedad,
    title: "Cómo gestionar la Ansiedad",
    text: "Pasos concretos para bajar el ruido mental.",
    href: "https://drive.google.com/file/d/1GFjKAurQ_GZ1Nqb4JXUtRAzi7r5cxBmL/view?usp=drivesdk",
  },
  {
    img: guiaAutocuidado,
    title: "Guía de Autocuidado",
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
            alt="Nora, psicóloga, en su consulta"
            width={912}
            height={1104}
            style={{ objectPosition: "center 72%" }}
            className="aspect-[4/5] w-full rounded-3xl object-cover ring-1 ring-foreground/5"
          />
        </div>
      </section>

      {/* Propósito — ¿Quién soy yo? */}
      <section className="mx-auto max-w-6xl px-6 pb-16 md:pb-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage">
            ¿Quién soy yo?
          </p>
          <p className="mt-5 font-display text-2xl font-medium leading-snug text-foreground text-pretty md:text-3xl">
            Soy Nora Gallardo, Psicóloga General Sanitaria.
          </p>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-foreground/75 text-pretty">
            <p>
              Nací en Barcelona, en una familia con raíces andaluzas, y quizá por eso
              siempre he sentido que una parte importante de quienes somos tiene que ver
              con las historias que nos preceden, con aquello que heredamos y también con
              lo que, con el tiempo, elegimos hacer nuestro.
            </p>
            <p className="font-display text-lg font-medium leading-snug text-foreground/85 text-pretty md:text-xl">
              Soy psicóloga, pero antes que eso soy persona. Y creo que ambas cosas se
              encuentran inevitablemente en mi manera de acompañar.
            </p>
            <p>
              Siempre me ha interesado lo que ocurre dentro de nosotros: cómo construimos
              nuestra forma de ver el mundo, cómo nos contamos nuestra propia historia y
              cómo esa voz interna puede influir en la manera en la que nos relacionamos,
              tomamos decisiones y nos vemos a nosotros mismos.
            </p>
            <p>
              Con los años, mi forma de entender la psicología también ha ido cambiando
              conmigo. Mi formación y mi experiencia profesional me han llevado a integrar
              la Terapia de Aceptación y Compromiso (ACT), el trabajo con la narrativa
              interna y una mirada inspirada en algunos principios del budismo,
              especialmente la presencia, la aceptación y la comprensión de que todo está
              en constante cambio.
            </p>
            <p>
              Y también mi propia vida me ha enseñado cosas que ningún libro puede
              explicar del todo.
            </p>
            <p>
              Actualmente estoy atravesando, junto a mi familia, la enfermedad de mi
              padre, que tiene Alzheimer. Acompañar de cerca un proceso así me ha puesto
              frente a algo que forma parte de la vida, aunque muchas veces intentemos
              mantenerlo lejos: el cambio, la pérdida, la incertidumbre y la necesidad de
              aprender a estar presentes incluso cuando no podemos controlar lo que
              ocurre.
            </p>
            <p>
              No comparto esto porque crea que mi experiencia sea igual a la de otras
              personas. Cada historia es única. Lo comparto porque también forma parte de
              quién soy y de la mirada desde la que acompaño.
            </p>
            <p className="font-display text-2xl font-medium leading-snug text-primary text-pretty md:text-3xl">
              No somos algo terminado.
            </p>
            <p>
              Nuestra identidad cambia. Nos transformamos con lo que vivimos, con las
              personas que encontramos, con lo que perdemos, con lo que aprendemos y con
              las decisiones que tomamos.
            </p>
            <p>
              No creo que exista un momento en el que lleguemos a descubrir definitivamente
              quiénes somos y podamos quedarnos ahí. Creo que estamos constantemente
              convirtiéndonos en quienes somos. Y quizá ahí está una de las cosas más
              bonitas de estar vivos.
            </p>
            <p>
              Por eso, cuando acompaño a alguien en terapia, no quiero decirle quién tiene
              que ser. Quiero ofrecerle un espacio para preguntárselo.
            </p>
            <p className="font-display text-lg font-medium leading-snug text-foreground/85 text-pretty md:text-xl">
              ¿Quién soy hoy? ¿Qué necesito? ¿Qué me importa? ¿Qué parte de mí quiero
              cuidar? ¿Qué me acerca a mí y qué me aleja de mí?
            </p>
            <p>
              Sin buscar una versión perfecta. Sin tener que llegar a ningún sitio.
              Simplemente, aprendiendo a escucharnos mientras seguimos caminando.
            </p>
          </div>
          <p className="mt-10 font-display text-xl font-medium leading-snug text-primary text-pretty md:text-2xl">
            “Soy Nora. Y este es el lugar que he creado para acompañarte en ese camino.”
          </p>
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
