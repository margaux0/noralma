/**
 * Datos de las opiniones de Doctoralia.
 * La web las lee en directo del perfil; esta copia solo se muestra si
 * Doctoralia no responde (cifras y textos reales, comprobados el 5/11/2026).
 */
import type { Opinion } from "@/lib/doctoralia.functions";

/** Última valoración verificada del perfil de Doctoralia. */
export const DOCTORALIA_VERIFIED_SUMMARY = { rating: 5, count: 7 };

/** Copia de seguridad de las 7 opiniones reales publicadas en Doctoralia. */
export const DOCTORALIA_REVIEWS_FALLBACK: Opinion[] = [
  {
    name: "Mabe",
    date: "22 de octubre de 2026",
    rating: 5,
    text: "Profesional con una calidad humana y cercania inigualable, me siento super afortunada de tenerla como psicologa y tengo claro que cualquier paciente que trate con ella se va a sentir igual",
  },
  {
    name: "N.P.M",
    date: "8 de octubre de 2026",
    rating: 5,
    text: "Cercanía, capacidad de escucha, comprension, acompañamiento, ayuda, disponibilidad, eficacia, presencia, paz, son algunas de las palabras con las que describiría a esta gran profesional, Nora. Gracias por tanto. Suerte la mía.",
  },
  {
    name: "N.J.S",
    date: "3 de agosto de 2026",
    rating: 5,
    text: "Tiene una sensibilidad y una empatía increíbles. Sabe acompañarte con mucho respeto, incluso en los momentos más difíciles, y tiene una capacidad especial para ayudarte a identificar y desbloquear emociones que a veces ni siquiera sabes que llevas dentro. Gracias a su forma de trabajar he podido entenderme mucho mejor y avanzar a mi ritmo, sintiéndome siempre segura y acompañada. Se nota que ama su profesión y que se implica de verdad en el bienestar de las personas. La recomendaría sin ninguna duda a cualquier persona que esté buscando una psicóloga cercana, humana y muy profesional.",
  },
  {
    name: "Cristina G",
    date: "24 de julio de 2026",
    rating: 5,
    text: "Cercana, humana y muy profesional. Me hace sentir escuchada y comprendida en todo momento, siento que acudir a ella fue todo un acierto.",
  },
  {
    name: "Aina C",
    date: "24 de julio de 2026",
    rating: 5,
    text: "Una psicóloga excepcional: muy atenta, empática, cercana y profesional. Desde el primer momento me hizo sentir escuchada y comprendida, creando un espacio de confianza donde es fácil expresarse. Su calidez y dedicación marcan la diferencia. La recomiendo totalmente.",
  },
  {
    name: "Gisela",
    date: "24 de julio de 2026",
    rating: 5,
    text: "Estamos encantados con ella. Es una persona maravillosa, siempre cariñosa, atenta y cercana. Sobre todo, ha conseguido algo que parecía imposible: que nuestro hijo se abra y exprese cómo se siente. Para nosotros es una excelente profesional y, sobre todo, una persona excepcional, tanto para él como para toda nuestra familia. Estamos enormemente agradecidos por todo lo que hace.",
  },
  {
    name: "Josue",
    date: "24 de julio de 2026",
    rating: 5,
    text: "Excelente profesional. Desde el primer día me hizo sentir cómodo y escuchado. Gracias a su ayuda he aprendido a entenderme mejor y a afrontar las cosas de otra manera. Muy recomendable.",
  },
];

export function doctoraliaSummary(source: { rating: number; count: number } | null | undefined) {
  return source ? { rating: source.rating, count: source.count } : DOCTORALIA_VERIFIED_SUMMARY;
}

/** Opiniones para mostrar: las reales del perfil o, si fallan, la copia guardada. */
export function doctoraliaOpiniones(
  source: { opiniones: Opinion[] } | null | undefined,
): Opinion[] {
  return source?.opiniones?.length ? source.opiniones : DOCTORALIA_REVIEWS_FALLBACK;
}
