import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

type Especialidad = {
  to: string;
  kicker: string;
  title: string;
  intro: string;
  extra: ReactNode;
};

const especialidades: Especialidad[] = [
  {
    to: "/demencia-y-alzheimer",
    kicker: "Demencia y Alzheimer",
    title: "Especializada en demencia y Alzheimer",
    intro:
      "Ofrezco acompañamiento psicológico tanto a personas que viven con un diagnóstico de demencia o Alzheimer como a sus familiares y cuidadores.",
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
    extra: (
      <p className="mt-8 rounded-xl bg-secondary px-5 py-4 text-sm font-semibold text-foreground/75">
        En colaboración con la Associació de Diabetis de Catalunya (ADC)
      </p>
    ),
  },
];

export function ServiciosDestacados() {
  return (
    <>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage">
        Sesiones individuales
      </p>
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
          return (
            <Link
              key={e.title}
              to={e.to}
              className={`${cls} transition-all hover:-translate-y-1 hover:ring-primary/25`}
            >
              <div className="h-px w-12 bg-honey" />
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-sage">
                {e.kicker}
              </p>
              <h3 className="mt-2 font-display text-2xl font-medium">{e.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-foreground/70 text-pretty">
                {e.intro}
              </p>
              <div className="mt-auto">{e.extra}</div>
              <p className="pt-6 text-sm font-semibold text-primary">
                Ver en qué puede centrarse el acompañamiento →
              </p>
            </Link>
          );
        })}
      </div>

      <p className="mx-auto mt-12 max-w-[62ch] text-center text-sm leading-relaxed text-foreground/60 text-pretty">
        Mi papel es el de <strong className="font-semibold text-foreground/75">acompañamiento psicológico y emocional</strong>,
        complementario al seguimiento médico correspondiente.
      </p>
    </>
  );
}
