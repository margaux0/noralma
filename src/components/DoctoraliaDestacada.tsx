import { useEffect, useState } from "react";
import { ArrowUpRight, Pause, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/Marquee";

type Opinion = { name: string; text: string };

export function DoctoraliaDestacada({
  opiniones,
  profileUrl,
  rating,
  count,
}: {
  opiniones: Opinion[];
  profileUrl: string;
  rating: number;
  count: number;
}) {
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  const cards = opiniones.map((opinion) => (
    <a
      key={opinion.name}
      href={profileUrl}
      target="_blank"
      rel="noreferrer"
      className="group mr-3 flex h-36 w-[17rem] shrink-0 flex-col rounded-lg border border-doctoralia/20 bg-card px-5 py-4 transition-colors hover:border-doctoralia focus-visible:outline focus-visible:outline-doctoralia md:w-[21rem]"
    >
      <blockquote className="line-clamp-3 text-sm leading-relaxed">
        “{opinion.text}”
      </blockquote>
      <div className="mt-auto flex items-center justify-between gap-3 pt-3 text-sm">
        <span className="font-semibold">{opinion.name}</span>
        <ArrowUpRight
          className="size-4 shrink-0 text-doctoralia transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </div>
    </a>
  ));

  return (
    <section aria-label="Opiniones" className="bg-doctoralia-surface text-doctoralia-ink">
      <div className="mx-auto max-w-6xl px-6 py-7 md:py-9">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-semibold" aria-label={`Valoración: ${rating} de 5`}>{rating}/5</span>
          <span className="flex gap-0.5 text-doctoralia" aria-hidden="true">
            {Array.from({ length: 5 }, (_, index) => <Star key={index} className="size-4 fill-current" />)}
          </span>
          <a href={profileUrl} target="_blank" rel="noreferrer" className="text-sm underline-offset-4 hover:underline">
            {count} opiniones en Doctoralia
          </a>
        </div>
        <Marquee items={cards} duration={70} paused={paused} className="mt-6" />
        {(
          <div className="mt-3 flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setPaused(!paused)}
              aria-label={paused ? "Reanudar reseñas" : "Pausar reseñas"}
              title={paused ? "Reanudar reseñas" : "Pausar reseñas"}
              aria-pressed={paused}
            >
              {paused ? <Play /> : <Pause />}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
