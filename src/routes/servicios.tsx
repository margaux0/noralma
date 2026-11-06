import { SITE_URL } from "@/lib/contact";
import { createFileRoute } from "@tanstack/react-router";
import { ServiciosDestacados } from "@/components/ServiciosDestacados";
import { WHATSAPP_URL } from "@/lib/contact";
import { accompanimentAreas } from "@/lib/areas";
import { Button } from "@/components/ui/button";
import { InfoPractica } from "@/components/InfoPractica";

export const Route = createFileRoute("/servicios")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Servicios de psicología y acompañamiento · Noralma" },
      {
        name: "description",
        content:
          "Acompañamiento psicológico online y en Vilanova i la Geltrú: ansiedad, autoestima, duelo, cambios vitales, diabetes y Alzheimer. Sesiones de 60 minutos, 60 €.",
      },
      { property: "og:title", content: "Servicios · Noralma" },
      {
        property: "og:description",
        content: "Acompañamiento psicológico a tu ritmo, sin prisa y sin juicios.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/servicios` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/servicios` }],
  }),
  component: ServiciosPage,
});

function ServiciosPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage">
        Servicios
      </p>
      <h1 className="mt-4 font-display text-4xl font-medium text-balance md:text-5xl">
        Acompañamiento a tu ritmo
      </h1>
      <p className="mt-4 max-w-[56ch] text-base leading-relaxed text-foreground/65 text-pretty">
        Sesiones individuales de 60 minutos, online o presenciales en Vilanova i la Geltrú,
        para comprenderte, escucharte y construir una vida más coherente con lo que importa
        para ti.
      </p>

      <section id="acompanar" aria-labelledby="areas" className="mt-14 scroll-mt-24">
        <h2 id="areas" className="font-display text-3xl font-medium md:text-4xl">¿En qué puedo acompañarte?</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {accompanimentAreas.map(({ title, text, id, Icon }) => (
            <li id={id} key={id} className="scroll-mt-28 rounded-md border border-primary/15 bg-card p-6">
              <Icon className="size-6 text-primary" strokeWidth={1.3} aria-hidden="true" />
              <h3 className="mt-4 font-display text-xl leading-snug">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
              <Button asChild variant="link" className="mt-4 h-auto min-h-11 whitespace-normal px-0"><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">Hablemos sobre lo que necesitas →</a></Button>
            </li>
          ))}
        </ul>
      </section>

      <section id="forma-de-trabajar" aria-labelledby="forma" className="mt-20 grid scroll-mt-24 gap-10 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage">Mi forma de trabajar</p>
          <h2 id="forma" className="mt-3 font-display text-3xl font-medium text-balance md:text-4xl">
            Cercanía, escucha y respeto por tu historia
          </h2>
          <blockquote className="mt-8 border-l-2 border-honey pl-5 font-display text-xl italic leading-snug text-primary text-pretty">
            «Quizás no se trata de convertirte en alguien diferente, sino de comprenderte,
            escucharte y descubrir qué te acerca y qué te aleja de aquello que es importante
            para ti.»
          </blockquote>
        </div>
        <div className="space-y-4 text-base leading-relaxed text-foreground/70 text-pretty">
          <p>
            Entiendo la psicología desde la cercanía, la escucha, la aceptación y el respeto
            por la historia de cada persona. No hay dos procesos iguales, y la terapia se
            adapta a ti, no al revés.
          </p>
          <p>
            Trabajo integrando herramientas de la Terapia de Aceptación y Compromiso (ACT):
            te ayudo a relacionarte de otra manera con tus pensamientos y emociones, a
            identificar tus valores y a dar pasos coherentes con aquello que de verdad te
            importa.
          </p>
          <a href="/terapia-online" className="inline-flex min-h-11 items-center font-semibold text-primary">
            Cómo es la terapia online →
          </a>
        </div>
      </section>

      <div className="mt-20">
        <InfoPractica />
      </div>

      <section className="mt-20 border-t border-primary/20 pt-12">
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
