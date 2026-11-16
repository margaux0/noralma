import { createFileRoute } from "@tanstack/react-router";
import { Home, MapPin, CalendarClock, Globe, Leaf, Lock, Smartphone, Wifi, DoorClosed, Clock } from "lucide-react";
import { OnlineAreas } from "@/components/OnlineAreas";
import { Button } from "@/components/ui/button";
import { Faq, faqs } from "@/components/Faq";
import { SITE_URL, ONLINE_WHATSAPP_URL, PRACTICA } from "@/lib/contact";
import { mainPageSchemaScript } from "@/lib/structured-data";

const title = "Psicóloga online ACT · Nora Gallardo Cano | Noralma";
const description =
  "Terapia psicológica online en España con Nora Gallardo Cano, Psicóloga General Sanitaria. Enfoque ACT para ansiedad, autoestima y autoexigencia. 60 € · 60 minutos.";

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
      mainPageSchemaScript("/terapia-online"),
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

const primeraSesion = [
  "Nos conocemos y exploramos el motivo de consulta.",
  "Hablamos de tu situación y de aquello que te gustaría trabajar.",
  "Valoramos conjuntamente tus necesidades.",
  "Exploramos cómo podría ayudarte el proceso terapéutico.",
];

const datos = [
  { label: "Psicóloga", value: "Nora Gallardo Cano · Psicóloga General Sanitaria" },
  { label: "Modalidad", value: "Online" },
  { label: "Duración", value: PRACTICA.duracion },
  { label: "Precio", value: `${PRACTICA.precio} por sesión` },
  { label: "Enfoque", value: "Terapia de Aceptación y Compromiso (ACT)" },
];

function TerapiaOnline() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage">Terapia psicológica online</p>
      <h1 className="mt-4 max-w-[22ch] font-display text-4xl font-medium leading-tight text-balance md:text-6xl">
        Terapia online: un espacio para volver a conectar contigo
      </h1>
      <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-foreground/70 text-pretty">
        La terapia online te permite contar con un espacio de acompañamiento psicológico desde donde te encuentres, con flexibilidad y sin necesidad de desplazamientos.
      </p>
      <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-muted-foreground">Un lugar donde explorar lo que estás viviendo, comprender tus dificultades y trabajar hacia una vida más coherente con tus valores.</p>
      <p className="mt-5 text-sm font-medium text-primary">Nora Gallardo Cano · Psicóloga General Sanitaria · Enfoque ACT</p>
      <Button asChild className="mt-8 h-auto min-h-11 whitespace-normal rounded-md px-6 py-3 shadow-none"><a href={ONLINE_WHATSAPP_URL} target="_blank" rel="noreferrer">Solicita tu primera sesión</a></Button>
      <p className="mt-3 text-sm text-muted-foreground">Me escribes por WhatsApp y valoramos la disponibilidad; la solicitud no confirma una cita.</p>

      <section className="mt-20" aria-labelledby="trabajar-online">
        <h2 id="trabajar-online" className="font-display text-3xl font-medium md:text-4xl">Qué podemos trabajar</h2>
        <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-muted-foreground">No necesitas encajar en una categoría. Partimos de lo que estás viviendo y de aquello que necesitas explorar.</p>
        <OnlineAreas />
      </section>

      <section className="mt-20 border-y border-primary/20 py-10" aria-labelledby="act-online">
        <p className="text-sm font-medium text-primary">Terapia de Aceptación y Compromiso</p>
        <h2 id="act-online" className="mt-3 font-display text-3xl font-medium md:text-4xl">Una relación más flexible con lo que sientes</h2>
        <p className="mt-5 max-w-[65ch] text-base leading-relaxed text-muted-foreground">En terapia no buscamos eliminar todas las emociones difíciles ni convertirnos en una versión perfecta de nosotros mismos. Trabajamos para aprender a relacionarnos con nuestra experiencia interna con mayor flexibilidad y avanzar hacia aquello que realmente nos importa.</p>
      </section>

      <section className="mt-20" aria-labelledby="ventajas">
        <h2 id="ventajas" className="font-display text-3xl font-medium md:text-4xl">Qué te ofrece la terapia online</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ventajas.map(({ icon: Icon, text }) => (
            <li key={text} className="flex gap-4 rounded-md bg-card p-6 ring-1 ring-foreground/5">
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

      <section className="mt-20 border-y border-primary/20 py-10" aria-labelledby="necesitas">
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
        <h2 id="como-funciona" className="font-display text-3xl font-medium md:text-4xl">Cómo será nuestra primera sesión</h2>
        <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-muted-foreground">Es un espacio para conocernos con calma. Podemos explorar estas cuestiones, adaptándonos a lo que necesites compartir, sin un guion rígido.</p>
        <ol className="mt-8 grid gap-6 sm:grid-cols-2">
          {primeraSesion.map((text, i) => <li key={text} className="flex gap-4 border-t border-primary/20 pt-5"><span className="font-display text-xl text-primary" aria-hidden="true">0{i + 1}</span><p className="text-base leading-relaxed text-muted-foreground">{text}</p></li>)}
        </ol>
        <p className="mt-6 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">Si continuamos, acordamos la frecuencia de las sesiones y revisamos el proceso contigo. No hay un resultado garantizado ni un ritmo que tengas que cumplir.</p>
      </section>

      <section className="mt-20 border-y border-primary/20 py-10" aria-labelledby="practica-online">
        <h2 id="practica-online" className="font-display text-3xl font-medium md:text-4xl">Información práctica</h2>
        <dl className="mt-6 divide-y divide-border">{datos.map(({ label, value }) => <div key={label} className="grid gap-2 py-4 sm:grid-cols-[10rem_1fr]"><dt className="text-sm font-medium">{label}</dt><dd className="text-base leading-relaxed text-muted-foreground">{value}</dd></div>)}</dl>
      </section>

      <div className="mt-20">
        <Faq />
      </div>
      <section className="mt-20 border-t border-primary/20 pt-10" aria-labelledby="solicitud-online">
        <h2 id="solicitud-online" className="font-display text-3xl font-medium md:text-4xl">¿Te gustaría empezar a dedicarte un espacio?</h2>
        <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-muted-foreground">Puedes escribirme para preguntar por las sesiones y la disponibilidad de primeras citas. No necesitas explicar detalles de salud por WhatsApp.</p>
        <Button asChild className="mt-6 h-auto min-h-11 whitespace-normal rounded-md px-6 py-3 shadow-none"><a href={ONLINE_WHATSAPP_URL} target="_blank" rel="noreferrer">Solicita tu primera sesión</a></Button>
        <p className="mt-3 text-sm text-muted-foreground">WhatsApp · +34 611 525 410</p>
      </section>
    </div>
  );
}
