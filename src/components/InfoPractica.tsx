import { PRACTICA, WHATSAPP_URL } from "@/lib/contact";

const filas = [
  { label: "Modalidad", value: PRACTICA.modalidad },
  { label: "Duración", value: PRACTICA.duracion },
  { label: "Precio", value: `${PRACTICA.precio} por sesión` },
  { label: "Forma de pago", value: PRACTICA.pago },
  { label: "Cancelaciones", value: PRACTICA.cancelacion },
  {
    label: "Primera sesión",
    value:
      "Nos conocemos, me cuentas qué te trae y valoramos juntas si este espacio y la modalidad elegida encajan con lo que necesitas.",
  },
];

export function InfoPractica() {
  return (
    <section aria-labelledby="info-practica" className="rounded-3xl bg-card p-8 ring-1 ring-foreground/5 md:p-12">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage">Información práctica</p>
      <h2 id="info-practica" className="mt-3 font-display text-3xl font-medium text-balance md:text-4xl">
        Todo lo que necesitas saber para empezar
      </h2>
      <dl className="mt-8 divide-y divide-foreground/10">
        {filas.map((f) => (
          <div key={f.label} className="grid gap-1 py-4 md:grid-cols-[12rem_1fr] md:gap-6">
            <dt className="text-sm font-semibold text-foreground">{f.label}</dt>
            <dd className="text-base leading-relaxed text-foreground/70 text-pretty">{f.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground ring-1 ring-primary/40 transition-colors hover:bg-primary/90"
        >
          Reserva tu sesión
        </a>
        <p className="text-sm text-foreground/60">Las reservas se hacen por WhatsApp; te respondo personalmente.</p>
      </div>
    </section>
  );
}
