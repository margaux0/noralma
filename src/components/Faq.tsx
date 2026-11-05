import { ChevronDown } from "lucide-react";
import { PRACTICA } from "@/lib/contact";

export const faqs = [
  {
    q: "¿Cómo funciona la terapia psicológica online?",
    a: "Las sesiones se hacen por videollamada, en el día y la hora que acordemos. Tú te conectas desde un lugar tranquilo y con privacidad, y el trabajo terapéutico es el mismo: escucharte, comprender lo que te pasa y buscar juntas formas de relacionarte de otra manera con ello.",
  },
  {
    q: "¿Es igual de efectiva que la terapia presencial?",
    a: "La investigación muestra que, para muchas personas y muchas dificultades, la terapia online puede ser tan útil como la presencial. Aun así, no es la mejor opción para todo el mundo ni en todas las situaciones: por eso valoramos juntas en la primera sesión si es la modalidad adecuada para ti. Ninguna terapia puede garantizar resultados concretos.",
  },
  {
    q: "¿Qué necesito para realizar una sesión?",
    a: "Un móvil, ordenador o tablet, una conexión estable a internet, un espacio privado y tranquilo y un momento para dedicarte a ti.",
  },
  {
    q: "¿Cómo se desarrolla la primera sesión?",
    a: "Es un espacio para conocernos. Me cuentas qué te trae, qué te gustaría trabajar y qué esperas de la terapia. Yo te explico cómo trabajo y, al final, valoramos juntas si este acompañamiento encaja contigo y cómo podríamos continuar.",
  },
  { q: "¿Cuánto dura cada sesión?", a: `Cada sesión dura ${PRACTICA.duracion}.` },
  {
    q: "¿Cuál es el precio?",
    a: `${PRACTICA.precio} por sesión. Puedes pagar en efectivo, por transferencia o por Bizum.`,
  },
  {
    q: "¿Cómo puedo reservar?",
    a: "Escríbeme por WhatsApp desde cualquiera de los botones de «Reserva tu sesión» y buscamos juntas un día y una hora.",
  },
  { q: "¿Qué ocurre si necesito cancelar o cambiar una sesión?", a: PRACTICA.cancelacion },
  {
    q: "¿Las sesiones son confidenciales?",
    a: "Sí. Todo lo que compartes en sesión está protegido por el secreto profesional y por la normativa de protección de datos. Solo existen las excepciones que marca la ley, por ejemplo, ante un riesgo grave para tu vida o la de otras personas.",
  },
  {
    q: "¿Puedo realizar terapia si vivo fuera de Cataluña o de España?",
    a: "Si vives en otra comunidad autónoma, en principio sí. Si vives fuera de España, escríbeme antes: la atención debe ajustarse a la normativa y a las condiciones profesionales que se apliquen en cada caso, y lo valoraremos juntas.",
  },
];

export function Faq() {
  return (
    <section aria-labelledby="faq-heading">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage">Preguntas frecuentes</p>
      <h2 id="faq-heading" className="mt-3 font-display text-3xl font-medium text-balance md:text-4xl">
        Dudas habituales antes de empezar
      </h2>
      <div className="mt-8 divide-y divide-foreground/10 border-y border-foreground/10">
        {faqs.map((f) => (
          <details key={f.q} className="group py-1">
            <summary className="grid min-h-11 cursor-pointer list-none grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-4 text-left font-display text-lg font-medium [&::-webkit-details-marker]:hidden">
              <span className="min-w-0">{f.q}</span>
              <ChevronDown className="size-5 shrink-0 text-primary transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <p className="max-w-[65ch] pb-5 text-base leading-relaxed text-foreground/70 text-pretty">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
