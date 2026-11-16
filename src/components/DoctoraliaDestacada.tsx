import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, Star, ArrowUpRight } from "lucide-react";
import type { Opinion } from "@/lib/doctoralia.functions";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const AUTO_MS = 6000;
const EXCERPT = 220;

function Estrellas({ rating, className = "size-3.5" }: { rating: number; className?: string }) {
  return (
    <span className="flex gap-1" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`${className} ${i < Math.round(rating) ? "fill-current" : ""}`} strokeWidth={1.4} />
      ))}
    </span>
  );
}

function TarjetaOpinion({ opinion, index, total }: { opinion: Opinion; index: number; total: number }) {
  const largo = opinion.text.length > EXCERPT;
  const extracto = largo ? opinion.text.slice(0, opinion.text.lastIndexOf(" ", EXCERPT)) + "…" : opinion.text;
  return (
    <article
      role="group"
      aria-roledescription="opinión"
      aria-label={`${index + 1} de ${total}`}
      className="review-slide flex h-[17.5rem] shrink-0 snap-start flex-col rounded-lg border border-primary/15 bg-card p-6"
    >
      <div className="flex items-center justify-between gap-3 text-primary">
        <h3 className="font-display text-lg leading-none text-foreground">{opinion.name}</h3>
        <Estrellas rating={opinion.rating ?? 5} className="size-3" />
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">«{extracto}»</p>
      <div className="mt-auto flex items-center justify-between gap-3 pt-3 text-xs text-muted-foreground/80">
        <span>{opinion.date}</span>
        {largo && (
          <Dialog>
            <DialogTrigger className="min-h-11 rounded-sm px-1 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary">
              Leer completa
            </DialogTrigger>
            <DialogContent className="max-w-lg bg-card">
              <DialogTitle className="font-display text-xl">Opinión de {opinion.name}</DialogTitle>
              <DialogDescription className="text-base leading-relaxed text-muted-foreground">«{opinion.text}»</DialogDescription>
              {opinion.date && <p className="text-xs text-muted-foreground">{opinion.date} · Doctoralia</p>}
            </DialogContent>
          </Dialog>
        )}
      </div>
    </article>
  );
}

function Carrusel({ opiniones }: { opiniones: Opinion[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hover, setHover] = useState(false);
  const [focusIn, setFocusIn] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (mq.matches) setPlaying(false);
  }, []);

  const goTo = useCallback((i: number) => {
    const el = track.current;
    if (!el) return;
    const n = opiniones.length;
    const idx = ((i % n) + n) % n;
    const slide = el.children[idx] as HTMLElement | undefined;
    if (slide) el.scrollTo({ left: slide.offsetLeft - el.offsetLeft, behavior: reduced ? "auto" : "smooth" });
  }, [opiniones.length, reduced]);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const w = (el.children[0] as HTMLElement | undefined)?.offsetWidth ?? 1;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      setActive(atEnd ? opiniones.length - 1 : Math.round(el.scrollLeft / (w + 20)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [opiniones.length]);

  useEffect(() => {
    if (!playing || hover || focusIn) return;
    const id = window.setInterval(() => {
      const el = track.current;
      const atEnd = el ? el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 : false;
      goTo(atEnd ? 0 : active + 1);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [playing, hover, focusIn, active, goTo]);

  const manual = (fn: () => void) => { setPlaying(false); fn(); };

  return (
    <div
      role="region"
      aria-roledescription="carrusel"
      aria-label="Opiniones de pacientes en Doctoralia"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocusIn(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocusIn(false); }}
    >
      <div
        ref={track}
        onPointerDown={() => setPlaying(false)}
        onWheel={(e) => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) setPlaying(false); }}
        className="review-track flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-2"
        aria-live={playing ? "off" : "polite"}
      >
        {opiniones.map((o, i) => <TarjetaOpinion key={o.name + o.date} opinion={o} index={i} total={opiniones.length} />)}
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1" role="group" aria-label="Elegir opinión">
          {opiniones.map((o, i) => (
            <button
              key={o.name + o.date}
              type="button"
              aria-label={`Ir a la opinión ${i + 1}`}
              aria-current={i === active}
              onClick={() => manual(() => goTo(i))}
              className="grid size-8 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-primary"
            >
              <span className={`block h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-5 bg-primary" : "w-1.5 bg-primary/30"}`} />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pausar el carrusel" : "Reanudar el carrusel"} className="review-ctrl">
            {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
          </button>
          <button type="button" onClick={() => manual(() => goTo(active - 1))} aria-label="Opinión anterior" className="review-ctrl"><ChevronLeft className="size-4" /></button>
          <button type="button" onClick={() => manual(() => goTo(active + 1))} aria-label="Opinión siguiente" className="review-ctrl"><ChevronRight className="size-4" /></button>
        </div>
      </div>
    </div>
  );
}

export function DoctoraliaDestacada({ profileUrl, rating, count, opiniones }: { profileUrl: string; rating: number; count: number; opiniones: Opinion[] }) {
  return (
    <section id="resenas" aria-labelledby="resenas-titulo" className="scroll-mt-28 bg-sand/25">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            {opiniones.length > 0 && <h2 id="resenas-titulo" className="font-display text-3xl font-medium leading-tight md:text-4xl">Cómo han vivido su proceso conmigo</h2>}
            <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-primary ${opiniones.length ? "mt-4" : ""}`}>
              <span className="font-display text-2xl font-medium" aria-label={`Valoración: ${rating} de 5`} id={opiniones.length ? undefined : "resenas-titulo"}>{rating}/5</span>
              <Estrellas rating={rating} />
              <a href={profileUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center text-sm underline-offset-4 hover:underline">{count} opiniones en Doctoralia</a>
            </div>
          </div>
          {opiniones.length > 0 && (
            <a href={profileUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline">
              Ver todas las opiniones en Doctoralia <ArrowUpRight className="size-4" />
            </a>
          )}
        </div>
        {opiniones.length > 0 && (
          <div className="mt-8">
            <Carrusel opiniones={opiniones} />
            <p className="mt-5 text-xs text-muted-foreground">Cada proceso es único: estas experiencias no garantizan resultados concretos.</p>
          </div>
        )}
      </div>
    </section>
  );
}
