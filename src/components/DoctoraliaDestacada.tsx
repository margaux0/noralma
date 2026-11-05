import { ArrowUpRight, Star } from "lucide-react";

type Opinion = { name: string; text: string; date?: string; rating?: number };

export function DoctoraliaDestacada({ opiniones, profileUrl, rating, count }: {
  opiniones: Opinion[];
  profileUrl: string;
  rating?: number;
  count: number;
}) {
  return (
    <section id="resenas" aria-labelledby="opiniones-titulo" className="scroll-mt-28 bg-sand/25">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="home-eyebrow text-sm text-primary">Opiniones reales · Doctoralia</p>
            <h2 id="opiniones-titulo" className="mt-3 max-w-[28ch] font-display text-3xl font-medium leading-tight md:text-4xl">La experiencia de quienes han confiado en mí.</h2>
          </div>
          <a href={profileUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-primary underline-offset-4 hover:underline focus-visible:outline-primary">
            {rating !== undefined && <span>{rating}/5 · </span>}{count} opiniones en Doctoralia <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
        <div className="mt-8 grid items-start gap-5 md:grid-cols-3">
          {opiniones.map((opinion) => (
            <a key={opinion.name + opinion.date} href={profileUrl} target="_blank" rel="noreferrer" className="group flex h-full flex-col rounded-md border border-border bg-card p-6 outline-offset-4 transition-colors hover:border-primary/40 focus-visible:outline-primary">
              {opinion.rating !== undefined && <span aria-label={`Valoración: ${opinion.rating} de 5`} className="mb-4 flex gap-1 text-primary">{Array.from({ length: Math.floor(opinion.rating) }, (_, i) => <Star key={i} className="size-3 fill-current" aria-hidden="true" />)}</span>}
              <blockquote className="text-sm leading-relaxed text-muted-foreground">“{opinion.text}”</blockquote>
              <div className="mt-auto flex items-end justify-between gap-3 pt-6"><div><p className="text-sm font-medium">{opinion.name}</p>{opinion.date && <p className="mt-1 text-xs text-muted-foreground">{opinion.date}</p>}</div><ArrowUpRight className="size-4 text-primary" aria-hidden="true" /></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}