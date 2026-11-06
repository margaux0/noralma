import { createFileRoute } from "@tanstack/react-router";
import { Home, MapPin, CalendarClock, Globe, Leaf, Lock, Smartphone, Wifi, DoorClosed, Clock } from "lucide-react";
import { InfoPractica } from "@/components/InfoPractica";
import { Faq, faqs } from "@/components/Faq";
import { SITE_URL, WHATSAPP_URL } from "@/lib/contact";

const title = "Terapia psicológica online · Noralma, psicóloga general sanitaria";
const description =
  "Terapia psicológica online con Nora Gallardo, Psicóloga General Sanitaria. Sesiones de 60 minutos desde donde estés, con la misma cercanía y confidencialidad.";

export const Route = createFileRoute("/terapia-online")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/terapia-online` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/terapia-online` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: TerapiaOnline,
});

const ventajas = [
  { icon: Home, text: "Puedes hacer las sesiones desde casa o desde cualquier lugar en el que tengas privacidad." },
  { icon: MapPin, text: "No necesitas desplazarte." },
  { icon: CalendarClock, text: "Te resulta más fácil integrar la terapia en tu rutina." },
  { icon: Globe, text: "Hay más flexibilidad de horarios y de lugar." },
  { icon: Leaf, text: "Puedes crear tu propio espacio de tranquilidad y comodidad." },
  { icon: Lock, text: "Sigue siendo un acompañamiento psicológico profesional y confidencial." },
];

const requisitos = [
  { icon: Smartphone, text: "Un móvil, ordenador o tablet." },
  { icon: Wifi, text: "Conexión estable a internet." },
  { icon: DoorClosed, text: "Un espacio privado y tranquilo." },
  { icon: Clock, text: "Un momento para dedicarte a ti." },
];

const pasos = [
  { t: "Me escribes", d: "Por WhatsApp, me cuentas brevemente qué buscas y acordamos un día y una hora." },
  { t: "Primera sesión", d: "Nos conocemos, exploramos qué te trae y valoramos juntas si la terapia online encaja con lo que necesitas." },
  { t: "El proceso", d: "Sesiones de 60 minutos con la frecuencia que acordemos. Vamos a tu ritmo y revisamos juntas cómo te sientes con el camino." },
];

function TerapiaOnline() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage">Terapia psicológica online</p>
      <h1 className="mt-4 max-w-[22ch] font-display text-4xl font-medium leading-tight text-balance md:text-6xl">
        Cuidarte no debería depender de dónde vives ni de cuánto tiempo tienes
      </h1>
      <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-foreground/70 text-pretty">
        La terapia online te permite tener un espacio para comprenderte y escucharte sin
        desplazarte, desde un lugar en el que te sientas cómoda. Es la misma escucha, el
        mismo cuidado y el mismo rigor profesional, a través de una pantalla.
      </p>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground ring-1 ring-primary/40 transition-colors hover:bg-primary/90"
      >
        Reserva tu sesión
      </a>

      <section className="mt-20" aria-labelledby="ventajas">
        <h2 id="ventajas" className="font-display text-3xl font-medium md:text-4xl">Qué te ofrece la terapia online</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ventajas.map(({ icon: Icon, text }) => (
            <li key={text} className="flex gap-4 rounded-2xl bg-card p-6 ring-1 ring-foreground/5">
              <Icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              <span className="text-base leading-relaxed text-foreground/75">{text}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-[62ch] text-sm leading-relaxed text-foreground/60 text-pretty">
          La terapia online no es la mejor opción para todas las personas ni en todos los
          momentos. Valoramos juntas si es adecuada según tus necesidades; si no lo es, te lo
          diré y buscaremos la alternativa más adecuada, como las sesiones presenciales en
          Vilanova i la Geltrú.
        </p>
      </section>

      <section className="mt-20 rounded-3xl bg-secondary p-8 ring-1 ring-foreground/5 md:p-12" aria-labelledby="necesitas">
        <h2 id="necesitas" className="font-display text-3xl font-medium md:text-4xl">¿Qué necesitas para empezar?</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {requisitos.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-background text-primary ring-1 ring-foreground/5">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="text-base text-foreground/80">{text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20" aria-labelledby="como-funciona">
        <h2 id="como-funciona" className="font-display text-3xl font-medium md:text-4xl">Cómo funciona</h2>
        <ol className="mt-8 grid gap-5 md:grid-cols-3">
          {pasos.map((p, i) => (
            <li key={p.t} className="rounded-2xl bg-card p-7 ring-1 ring-foreground/5">
              <span className="font-display text-sm text-honey">0{i + 1}</span>
              <h3 className="mt-3 font-display text-xl font-medium">{p.t}</h3>
              <p className="mt-2 text-base leading-relaxed text-foreground/70 text-pretty">{p.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-20">
        <InfoPractica />
      </div>

      <div className="mt-20">
        <Faq />
      </div>
    </div>
  );
}
