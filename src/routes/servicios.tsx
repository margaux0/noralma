import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

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

type Especialidad = {
  to?: string;
  kicker: string;
  title: string;
  intro: string;
  items: string[];
  extra: ReactNode;
};

const especialidades: Especialidad[] = [
  {
    to: "/demencia-y-alzheimer",
    kicker: "Demencia y Alzheimer",
    title: "Especializada en demencia y Alzheimer",
    intro:
      "Ofrezco acompañamiento psicológico tanto a personas que viven con un diagnóstico de demencia o Alzheimer como a sus familiares y cuidadores.",
    items: [
      "Adaptación emocional al diagnóstico.",
      "Aceptación y comprensión de los cambios que aparecen durante el proceso.",
      "Gestión de emociones como tristeza, miedo, frustración, culpa o incertidumbre.",
      "Acompañamiento a familiares y cuidadores ante la sobrecarga emocional.",
      "Aprender a afrontar los cambios en la relación y en los roles familiares.",
      "Orientación y apoyo emocional durante las diferentes etapas del proceso.",
      "Estrategias para cuidar sin olvidarse de uno mismo.",
      "Duelo y adaptación a las pérdidas asociadas a la enfermedad.",
    ],
    extra: (
      <blockquote className="mt-8 border-l-2 border-honey pl-5 font-display text-lg italic leading-relaxed text-foreground/75">
        “Mi padre tiene Alzheimer y vivir este proceso de cerca también me ha enseñado que detrás de cada
        diagnóstico hay una persona, una historia y una familia. Desde ahí, también puedo acompañarte.”
      </blockquote>
    ),
  },
  {
    to: "/diabetes",
    kicker: "Diabetes y bienestar emocional",
    title: "Especializada en diabetes",
    intro:
      "Acompaño a personas que viven con diabetes, trabajando el impacto emocional que puede tener convivir con una enfermedad crónica.",
    items: [
      "Adaptación emocional al diagnóstico.",
      "Miedo e incertidumbre relacionados con la enfermedad.",
      "Cansancio y agotamiento de estar constantemente pendiente del autocuidado.",
      "Relación con la alimentación, el cuerpo y el autocuidado.",
      "Frustración ante los cambios y las dificultades del día a día.",
      "Gestión del miedo a las hipoglucemias y otras preocupaciones asociadas a la diabetes.",
      "Autoexigencia y sentimiento de culpa cuando las cosas no salen como esperamos.",
      "Impacto de la diabetes en la autoestima, las relaciones y la vida cotidiana.",
      "Aprender a cuidar de uno mismo sin sentir que la enfermedad ocupa todo el espacio.",
    ],
    extra: (
      <p className="mt-8 rounded-xl bg-secondary px-5 py-4 text-sm font-semibold text-foreground/75">
        En colaboración con la Associació de Diabetis de Catalunya (ADC)
      </p>
    ),
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
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage">Sesiones individuales</p>
        <h2 className="mt-4 font-display text-3xl font-medium text-balance md:text-4xl">
          Un espacio para parar y escucharte
        </h2>
        <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-foreground/70 text-pretty">
          Un espacio individual y confidencial para parar, escucharte y comprender qué necesitas en este
          momento de tu vida. Un acompañamiento cercano y personalizado para ayudarte a sentirte más en
          coherencia contigo.
        </p>
        <p className="mt-6 inline-block rounded-full bg-primary/10 px-5 py-2 font-display text-lg text-primary">
          60 € · 60 minutos
        </p>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {especialidades.map((e) => {
            const cls =
              "flex flex-col rounded-2xl bg-background p-8 ring-1 ring-foreground/5 md:p-10";
            const hover = `${cls} transition-all hover:-translate-y-1 hover:ring-primary/25`;
            const body = (
              <>
                <div className="h-px w-12 bg-honey" />
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-sage">
                  {e.kicker}
                </p>
                <h3 className="mt-2 font-display text-2xl font-medium">
                  {e.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-foreground/70 text-pretty">
                  {e.intro}
                </p>
                {e.extra}
                <p className="mt-6 text-sm font-semibold text-primary">
                  Ver en qué puede centrarse el acompañamiento →
                </p>
              </>
            );
            if (e.to === "/demencia-y-alzheimer") {
              return (
                <Link key={e.title} to="/demencia-y-alzheimer" className={hover}>
                  {body}
                </Link>
              );
            }
            if (e.to === "/diabetes") {
              return (
                <Link key={e.title} to="/diabetes" className={hover}>
                  {body}
                </Link>
              );
            }
            return (
              <article key={e.title} className={cls}>
                {body}
              </article>
            );
          })}
        </div>

        <p className="mx-auto mt-12 max-w-[62ch] text-center text-sm leading-relaxed text-foreground/60 text-pretty">
          Mi papel es el de <strong className="font-semibold text-foreground/75">acompañamiento psicológico y emocional</strong>,
          complementario al seguimiento médico correspondiente.
        </p>
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
