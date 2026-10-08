import { createFileRoute, Link } from "@tanstack/react-router";
import { ServiciosDestacados } from "@/components/ServiciosDestacados";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Servicios · Noralma" },
      {
        name: "description",
        content:
          "Acompañamiento psicológico a tu ritmo: sesiones individuales, acompañamiento guiado y recursos gratuitos.",
      },
      { property: "og:title", content: "Servicios · Noralma" },
      {
        property: "og:description",
        content: "Acompañamiento psicológico a tu ritmo, sin prisa y sin juicios.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/servicios" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/servicios" }],
  }),
  component: ServiciosPage,
});

const servicios = [
  {
    num: "01",
    title: "Sesiones individuales",
    text: "Un espacio de confianza para entender lo que te pasa, a tu ritmo. Trabajamos ansiedad, autoestima, transiciones vitales y todo aquello que necesite ser escuchado.",
  },
  {
    num: "02",
    title: "Acompañamiento guiado",
    text: "Un camino de seguimiento para sostener tus avances día a día, con materiales y ejercicios pensados para ti entre sesiones.",
  },
  {
    num: "03",
    title: "Recursos gratuitos",
    text: "Guías y cuadernos descargables para empezar cuando todavía no es momento de una sesión: ansiedad, autocuidado y estimulación cognitiva.",
  },
];

function ServiciosPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage">
        Servicios
      </p>
      <h1 className="mt-4 font-display text-4xl font-medium text-balance md:text-5xl">
        Acompañamiento a tu ritmo
      </h1>
      <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-foreground/65 text-pretty">
        Estoy definiendo cada formato con mimo. Mientras tanto, aquí tienes una idea de
        cómo puedo acompañarte. Escríbeme y hablamos de lo que necesitas.
      </p>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {servicios.map((s) => (
          <div
            key={s.num}
            className="rounded-2xl bg-background p-7 ring-1 ring-foreground/5 transition-transform hover:-translate-y-1"
          >
            <div className="grid size-11 place-items-center rounded-full bg-honey/25 text-xl text-primary">
              {s.num}
            </div>
            <h2 className="mt-5 font-display text-xl font-medium">{s.title}</h2>
            <p className="mt-2 text-base leading-relaxed text-foreground/65 text-pretty">
              {s.text}
            </p>
          </div>
        ))}
      </div>

      <section className="mt-20 rounded-3xl bg-card p-8 ring-1 ring-foreground/5 md:p-14">
        <ServiciosDestacados />
      </section>

      <div className="mt-14 rounded-2xl bg-secondary p-8 ring-1 ring-foreground/5 md:p-12">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-2xl font-medium md:text-3xl">
              ¿No sabes por dónde empezar?
            </h2>
            <p className="mt-2 max-w-[46ch] text-base leading-relaxed text-foreground/65 text-pretty">
              Es lo más normal del mundo. Cuéntame qué te pasa y vemos juntas qué formato
              encaja mejor contigo.
            </p>
          </div>
          <Link
            to="/contacto"
            className="shrink-0 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground ring-1 ring-primary/40 transition-colors hover:bg-primary/90"
          >
            Reservar sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
