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
              , y detrás de Noralma estoy yo: una persona que, además de acompañar
              procesos terapéuticos, cree profundamente en la importancia de poder
              sentirnos en casa dentro de nosotros mismos.
            </p>
            <p>
              Elegí la psicología porque siempre me ha interesado lo que hay detrás de
              lo que hacemos, pensamos y sentimos. Esa parte de nosotros que muchas
              veces no sabemos explicar, pero que está ahí y necesita ser escuchada.
            </p>
            <p>
              A lo largo de mi formación y experiencia profesional he acompañado a
              niños, adolescentes, adultos y familias en momentos muy diferentes de
              sus vidas: ansiedad, cambios, duelos, dificultades en las relaciones,
              autoestima, procesos de adaptación y momentos en los que simplemente
              sentimos que algo dentro de nosotros ya no funciona como antes.
            </p>
          </div>

          <p className="mt-8 max-w-[52ch] font-display text-2xl font-medium leading-snug text-foreground text-pretty">
            No siempre necesitamos cambiar quiénes somos. Muchas veces necesitamos
            volver a escucharnos.
          </p>

          <div className="mt-8 max-w-[62ch] space-y-5 text-base leading-relaxed text-foreground/75 text-pretty">
            <p>
              Por eso, mi manera de entender la terapia parte de una mirada cercana,
              humana y respetuosa. Me interesa conocer tu historia, pero también
              entender quién eres hoy, qué necesitas y hacia dónde quieres ir.
            </p>
            <p>
              Trabajo desde la{" "}
              <span className="font-semibold text-foreground">
                Terapia de Aceptación y Compromiso (ACT)
              </span>
              , una forma de terapia que pone el foco en aprender a relacionarnos de
              otra manera con nuestros pensamientos y emociones y, al mismo tiempo,
              acercarnos a una vida que esté en coherencia con nuestros valores.
            </p>
            <p>No creo en recetas universales ni en decirte cómo deberías vivir.</p>
            <p>Creo en acompañarte a descubrirlo.</p>
            <p>
              En que puedas tener un espacio donde no tengas que aparentar que estás
              bien, donde puedas hablar sin miedo a ser juzgada y donde podamos mirar
              juntas aquello que quizá llevas mucho tiempo intentando sostener sola.
            </p>
          </div>

          <div className="mt-8 max-w-[62ch] space-y-5 text-base leading-relaxed text-foreground/75 text-pretty">
            <p className="font-semibold text-foreground">
              Noralma nace de esa forma de entender la psicología.
            </p>
            <p>De la idea de que volver a ti también puede ser un proceso.</p>
            <p>
              Y de que, a veces, sanar empieza simplemente por volver a escuchar esa
              voz que siempre estuvo ahí.
            </p>
          </div>

          <p className="mt-8 font-display text-2xl font-medium leading-snug text-foreground">
            Soy Nora.
            <span className="block">Y estaré aquí para acompañarte en ese camino. 🌿</span>
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
