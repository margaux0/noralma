import { Star } from "lucide-react";

export function DoctoraliaDestacada({ profileUrl, rating, count }: {
  profileUrl: string;
  rating: number;
  count: number;
}) {
  return (
    <section id="resenas" aria-label="Valoración de Doctoralia" className="scroll-mt-28 bg-sand/25">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 py-6 text-primary">
        <div className="flex items-center gap-3">
          <span className="font-display text-2xl font-medium" aria-label={`Valoración: ${rating} de 5`}>{rating}/5</span>
          <span className="flex gap-1" aria-hidden="true">
            {Array.from({ length: 5 }, (_, index) => <Star key={index} className={`size-3.5 ${index < Math.round(rating) ? "fill-current" : ""}`} strokeWidth={1.4} />)}
          </span>
        </div>
        <a href={profileUrl} target="_blank" rel="noreferrer" className="text-sm underline-offset-4 hover:underline focus-visible:outline-primary">{count} opiniones en Doctoralia</a>
      </div>
    </section>
  );
}