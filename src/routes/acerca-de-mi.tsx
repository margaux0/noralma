import { createFileRoute, Link } from "@tanstack/react-router";
import heroAsset from "@/assets/hero-nora.png.asset.json";

export const Route = createFileRoute("/acerca-de-mi")({
  head: () => ({
    meta: [
      { title: "Acerca de mí · Noralma" },
      {
        name: "description",
        content:
          "Soy Nora Gallardo, Psicóloga General Sanitaria. Noralma es un espacio para volver a escucharte, a tu ritmo y sin juicios.",
      },
      { property: "og:title", content: "Acerca de mí · Noralma" },
      {
        property: "og:description",
        content:
          "Soy Nora Gallardo, Psicóloga General Sanitaria. Un espacio para volver a escucharte.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/acerca-de-mi" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/acerca-de-mi" }],
  }),
  component: AcercaDeMiPage,
});

function AcercaDeMiPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="grid items-start gap-12 md:grid-cols-[1fr_0.8fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage">
            Acerca de mí
          </p>
          <h1 className="mt-4 font-display text-4xl font-medium text-balance md:text-5xl">
            Hola, soy Nora
          </h1>

          <div className="mt-8 max-w-[62ch] space-y-5 text-base leading-relaxed text-foreground/75 text-pretty">
            <p>
              Soy{" "}
              <span className="font-semibold text-foreground">
                Nora Gallardo, Psicóloga General Sanitaria
              </span>
              .
            </p>
            <p>
              Nací en Barcelona, en una familia con raíces andaluzas, y quizá por eso
              siempre he sentido que una parte importante de quienes somos tiene que ver
              con las historias que nos preceden, con aquello que heredamos y también con
              lo que, con el tiempo, elegimos hacer nuestro.
            </p>
            <p>
              Soy psicóloga, pero antes que eso soy persona. Y creo que ambas cosas se
              encuentran inevitablemente en mi manera de acompañar.
            </p>
            <p>
              Siempre me ha interesado lo que ocurre dentro de nosotros: cómo construimos
              nuestra forma de ver el mundo, cómo nos contamos nuestra propia historia y
              cómo esa voz interna puede influir en la manera en la que nos relacionamos,
              tomamos decisiones y nos vemos a nosotros mismos.
            </p>
          </div>

          <p className="mt-8 max-w-[52ch] font-display text-2xl font-medium leading-snug text-foreground text-pretty">
            Con los años, mi forma de entender la psicología también ha ido cambiando
            conmigo.
          </p>

          <div className="mt-8 max-w-[62ch] space-y-5 text-base leading-relaxed text-foreground/75 text-pretty">
            <p>
              Mi formación y mi experiencia profesional me han llevado a integrar la{" "}
              <span className="font-semibold text-foreground">
                Terapia de Aceptación y Compromiso (ACT)
              </span>
              , el trabajo con la{" "}
              <span className="font-semibold text-foreground">narrativa interna</span> y
              una mirada inspirada en algunos principios del{" "}
              <span className="font-semibold text-foreground">budismo</span>,
              especialmente la presencia, la aceptación y la comprensión de que todo está
              en constante cambio.
            </p>
            <p>
              Y también mi propia vida me ha enseñado cosas que ningún libro puede
              explicar del todo.
            </p>
          </div>

          <div className="mt-8 max-w-[62ch] space-y-5 text-base leading-relaxed text-foreground/75 text-pretty">
            <p>
              Actualmente estoy atravesando, junto a mi familia, la enfermedad de mi
              padre, que tiene Alzheimer.
            </p>
            <p>
              Acompañar de cerca un proceso así me ha puesto frente a algo que forma parte
              de la vida, aunque muchas veces intentemos mantenerlo lejos: el cambio, la
              pérdida, la incertidumbre y la necesidad de aprender a estar presentes
              incluso cuando no podemos controlar lo que ocurre.
            </p>
            <p>
              No comparto esto porque crea que mi experiencia sea igual a la de otras
              personas. Cada historia es única.
            </p>
            <p>
              Lo comparto porque también forma parte de{" "}
              <span className="font-semibold text-foreground">
                quién soy y de la mirada desde la que acompaño
              </span>
              .
            </p>
          </div>

          <div className="mt-8 max-w-[62ch] space-y-5 text-base leading-relaxed text-foreground/75 text-pretty">
            <p>
              Me ha reafirmado en algo que ya estaba muy presente en mi forma de entender
              la psicología:
            </p>
            <p className="font-display text-xl font-medium text-foreground">
              no somos algo terminado.
            </p>
            <p>
              Nuestra identidad cambia. Nos transformamos con lo que vivimos, con las
              personas que encontramos, con lo que perdemos, con lo que aprendemos y con
              las decisiones que tomamos.
            </p>
            <p>
              No creo que exista un momento en el que lleguemos a descubrir definitivamente
              quiénes somos y podamos quedarnos ahí.
            </p>
            <p>
              Creo que estamos constantemente convirtiéndonos en quienes somos.
            </p>
            <p>Y quizá ahí está una de las cosas más bonitas de estar vivos.</p>
          </div>

          <div className="mt-8 max-w-[62ch] space-y-5 text-base leading-relaxed text-foreground/75 text-pretty">
            <p>
              Por eso, cuando acompaño a alguien en terapia, no quiero decirle quién tiene
              que ser.
            </p>
            <p>Quiero ofrecerle un espacio para preguntárselo.</p>
            <p className="font-semibold text-foreground">
              ¿Quién soy hoy?
              <br />
              ¿Qué necesito?
              <br />
              ¿Qué me importa?
              <br />
              ¿Qué parte de mí quiero cuidar?
              <br />
              ¿Qué me acerca a mí y qué me aleja de mí?
            </p>
            <p>Sin buscar una versión perfecta.</p>
            <p>Sin tener que llegar a ningún sitio.</p>
            <p>Simplemente, aprendiendo a escucharnos mientras seguimos caminando.</p>
          </div>

          <p className="mt-8 font-display text-2xl font-medium leading-snug text-foreground">
            Soy Nora.
            <span className="block">
              Y este es el lugar que he creado para acompañarte en ese camino. 🌿
            </span>
          </p>

          <div className="mt-10">
            <Link
              to="/contacto"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground ring-1 ring-primary/40 transition-colors hover:bg-primary/90"
            >
              Reservar sesión
            </Link>
          </div>
        </div>

        <img
          src={heroAsset.url}
          alt="Nora, psicóloga"
          className="w-full rounded-2xl object-cover object-[center_72%] ring-1 ring-foreground/5 aspect-[4/5] md:sticky md:top-28"
        />
      </div>
    </div>
  );
}
