import { useEffect, useState } from "react";
import { ArrowUpRight, Pause, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/Marquee";
import doctoraliaLogo from "@/assets/doctoralia-logo.png.asset.json";

type Opinion = { name: string; text: string };

export function DoctoraliaDestacada({
  opiniones,
  profileUrl,
}: {
  opiniones: Opinion[];
  profileUrl: string;
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
    <section aria-labelledby="doctoralia-heading" className="bg-doctoralia-surface text-doctoralia-ink">
      <div className="mx-auto max-w-6xl px-6 py-7 md:py-9">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
          <div>
            <a href={profileUrl} target="_blank" rel="noreferrer" aria-label="Ver el perfil de Nora en Doctoralia" className="inline-block rounded-sm focus-visible:outline focus-visible:outline-doctoralia">
              <img src={doctoraliaLogo.url} alt="Doctoralia" width={960} height={167} className="h-auto w-40 md:w-44" />
            </a>
            <h2 id="doctoralia-heading" className="mt-3 font-display text-2xl font-medium md:text-3xl">Voces que me acompañan</h2>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <div>
              <div className="flex items-center gap-2" aria-label="Valoración: 5 de 5">
                <span className="text-2xl font-semibold">5/5</span>
                <span className="flex gap-0.5 text-doctoralia" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, index) => <Star key={index} className="size-4 fill-current" />)}
                </span>
              </div>
              <p className="mt-1 text-sm">7 opiniones en Doctoralia</p>
            </div>
            <Button asChild variant="doctoralia" className="h-11 px-5">
              <a href={profileUrl} target="_blank" rel="noreferrer">Ver opiniones <ArrowUpRight aria-hidden="true" /></a>
            </Button>
          </div>
        </div>
        <Marquee items={cards} duration={70} paused={paused} className="mt-6" />
        {!reducedMotion && (
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
