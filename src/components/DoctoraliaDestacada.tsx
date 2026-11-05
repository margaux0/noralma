import { Star } from "lucide-react";
import { Marquee } from "@/components/Marquee";
import type { Opinion } from "@/lib/doctoralia.functions";

function Estrellas({ rating, className = "size-3.5" }: { rating: number; className?: string }) {
  return (
    <span className="flex gap-1" aria-hidden="true">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={`${className} ${index < Math.round(rating) ? "fill-current" : ""}`}
          strokeWidth={1.4}
        />
      ))}
    </span>
  );
}

function TarjetaOpinion({ opinion }: { opinion: Opinion }) {
  return (
    <article className="w-[18rem] shrink-0 px-2.5 sm:w-[21rem]">
      <div className="flex h-full flex-col border border-primary/15 bg-card p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-lg leading-none">{opinion.name}</h3>
          <Estrellas rating={opinion.rating ?? 5} className="size-3" />
        </div>
        <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-muted-foreground">
          {opinion.text}
        </p>
        {opinion.date ? (
          <span className="mt-auto pt-3 text-xs text-muted-foreground/70">{opinion.date}</span>
        ) : null}
      </div>
    </article>
  );
}

export function DoctoraliaDestacada({
  profileUrl,
  rating,
  count,
  opiniones,
}: {
  profileUrl: string;
  rating: number;
  count: number;
  opiniones: Opinion[];
}) {
  return (
    <section id="resenas" aria-label="Opiniones en Doctoralia" className="scroll-mt-28 bg-sand/25">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 pt-8 text-primary">
        <div className="flex items-center gap-3">
          <span className="font-display text-2xl font-medium" aria-label={`Valoración: ${rating} de 5`}>
            {rating}/5
          </span>
          <Estrellas rating={rating} />
        </div>
        <a
          href={profileUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center text-sm underline-offset-4 hover:underline focus-visible:outline-primary"
        >
          {count} opiniones en Doctoralia
        </a>
      </div>

      <div className="pt-4 pb-10">
        <Marquee
          duration={85}
          items={opiniones.map((opinion) => (
            <TarjetaOpinion key={opinion.name + opinion.date} opinion={opinion} />
          ))}
        />
      </div>
    </section>
  );
}
