import { createFileRoute, Link } from "@tanstack/react-router";
import { WHATSAPP_URL } from "@/lib/contact";

export const Route = createFileRoute("/demencia-y-alzheimer")({
  head: () => ({
    meta: [
      { title: "Demencia y Alzheimer · Noralma" },
      {
        name: "description",
        content:
          "Acompañamiento psicológico para personas que viven con un diagnóstico de demencia o Alzheimer y para sus familiares y cuidadores.",
      },
      {
        property: "og:title",
        content: "Demencia y Alzheimer · Noralma",
      },
      {
        property: "og:description",
        content:
          "Ofrezco acompañamiento psicológico tanto a personas que viven con un diagnóstico de demencia o Alzheimer como a sus familiares y cuidadores.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/demencia-y-alzheimer" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/demencia-y-alzheimer" }],
  }),
  component: DemenciaAlzheimerPage,
});

const enfoque = [
  "Adaptación emocional al diagnóstico.",
  "Aceptación y comprensión de los cambios que aparecen durante el proceso.",
  "Gestión de emociones como tristeza, miedo, frustración, culpa o incertidumbre.",
  "Acompañamiento a familiares y cuidadores ante la sobrecarga emocional.",
  "Aprender a afrontar los cambios en la relación y en los roles familiares.",
  "Orientación y apoyo emocional durante las diferentes etapas del proceso.",
  "Estrategias para cuidar sin olvidarse de uno mismo.",
  "Duelo y adaptación a las pérdidas asociadas a la enfermedad.",
];

function DemenciaAlzheimerPage() {
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
          Demencia y Alzheimer
        </p>
        <h1 className="mt-3 font-display text-4xl font-medium text-balance md:text-5xl">
          Especializada en demencia y Alzheimer
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-foreground/70 text-pretty">
          Ofrezco acompañamiento psicológico tanto a personas que viven con un
          diagnóstico de demencia o Alzheimer como a sus familiares y
          cuidadores.
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

        <blockquote className="mt-10 border-l-2 border-honey pl-5 font-display text-lg italic leading-relaxed text-foreground/75">
          “Mi padre tiene Alzheimer y vivir este proceso de cerca también me ha
          enseñado que detrás de cada diagnóstico hay una persona, una historia
          y una familia. Desde ahí, también puedo acompañarte.”
        </blockquote>

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
              Cuéntame qué está pasando en tu familia y vemos juntas cómo puedo
              acompañarte a ti y a los tuyos.
            </p>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground ring-1 ring-primary/40 transition-colors hover:bg-primary/90"
          >
            Reservar sesión
          </a>
        </div>
      </div>
    </div>
  );
}
