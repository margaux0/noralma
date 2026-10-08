import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/diabetes")({
  head: () => ({
    meta: [
      { title: "Diabetes y bienestar emocional · Noralma" },
      {
        name: "description",
        content:
          "Acompañamiento psicológico para personas que viven con diabetes, trabajando el impacto emocional de convivir con una enfermedad crónica.",
      },
      {
        property: "og:title",
        content: "Diabetes y bienestar emocional · Noralma",
      },
      {
        property: "og:description",
        content:
          "Acompaño a personas que viven con diabetes, trabajando el impacto emocional que puede tener convivir con una enfermedad crónica.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/diabetes" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/diabetes" }],
  }),
  component: DiabetesPage,
});

const enfoque = [
  "Adaptación emocional al diagnóstico.",
  "Miedo e incertidumbre relacionados con la enfermedad.",
  "Cansancio y agotamiento de estar constantemente pendiente del autocuidado.",
  "Relación con la alimentación, el cuerpo y el autocuidado.",
  "Frustración ante los cambios y las dificultades del día a día.",
  "Gestión del miedo a las hipoglucemias y otras preocupaciones asociadas a la diabetes.",
  "Autoexigencia y sentimiento de culpa cuando las cosas no salen como esperamos.",
  "Impacto de la diabetes en la autoestima, las relaciones y la vida cotidiana.",
  "Aprender a cuidar de uno mismo sin sentir que la enfermedad ocupa todo el espacio.",
];

function DiabetesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <Link
        to="/servicios"
        className="text-sm font-semibold text-foreground/55 transition-colors hover:text-primary"
      >
        ← Volver a Servicios
      </Link>

      <div className="mt-8 max-w-[70ch]">
        <div className="h-px w-12 bg-honey" />
        <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-sage">
          Diabetes y bienestar emocional
        </p>
        <h1 className="mt-3 font-display text-4xl font-medium text-balance md:text-5xl">
          Especializada en diabetes
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-foreground/70 text-pretty">
          Acompaño a personas que viven con diabetes, trabajando el impacto
          emocional que puede tener convivir con una enfermedad crónica.
        </p>
      </div>

      <section className="mt-12 rounded-3xl bg-card p-8 ring-1 ring-foreground/5 md:p-12">
        <h2 className="font-display text-2xl font-medium md:text-3xl">
          El acompañamiento puede centrarse en:
        </h2>
        <ul className="mt-7 space-y-4">
          {enfoque.map((i) => (
            <li
              key={i}
              className="flex gap-4 text-base leading-relaxed text-foreground/75 text-pretty md:text-lg"
            >
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-honey" />
              {i}
            </li>
          ))}
        </ul>

        <p className="mt-10 rounded-xl bg-secondary px-5 py-4 text-sm font-semibold text-foreground/75">
          En colaboración con la Associació de Diabetis de Catalunya (ADC)
        </p>

        <p className="mt-8 max-w-[62ch] text-sm leading-relaxed text-foreground/60 text-pretty">
          Mi papel es el de{" "}
          <strong className="font-semibold text-foreground/75">
            acompañamiento psicológico y emocional
          </strong>
          , complementario al seguimiento médico correspondiente.
        </p>
      </section>

      <div className="mt-14 rounded-2xl bg-secondary p-8 ring-1 ring-foreground/5 md:p-12">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-2xl font-medium md:text-3xl">
              ¿Hablamos?
            </h2>
            <p className="mt-2 max-w-[46ch] text-base leading-relaxed text-foreground/65 text-pretty">
              Cuéntame cómo te afecta la diabetes en tu día a día y vemos juntas
              cómo puedo acompañarte.
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
