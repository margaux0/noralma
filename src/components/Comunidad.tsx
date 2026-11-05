import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { InstagramIcon, TikTokIcon } from "@/components/SocialIcons";
import { SOCIAL_FOLLOWERS_UPDATED, SOCIAL_PROFILES, type SocialProfile } from "@/lib/social";

const icons = { instagram: InstagramIcon, tiktok: TikTokIcon } as const;

/** Sube el número desde cero hasta la cifra real, una sola vez. */
function useCountUp(target: number, start: boolean, duration = 1600) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    let frame = 0;
    const begin = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - begin) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, target, duration]);

  return value;
}

function ProfileCard({ profile, start }: { profile: SocialProfile; start: boolean }) {
  const Icon = icons[profile.id];
  const count = useCountUp(profile.followers, start);

  return (
    <a
      href={profile.url}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-5 border border-primary/15 bg-card p-6 transition-colors hover:border-primary/45 focus-visible:border-primary/45 sm:p-7"
    >
      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="size-6" />
      </span>
      <span className="min-w-0">
        <span className="block font-display text-4xl leading-none tabular-nums text-foreground sm:text-5xl">
          {count.toLocaleString("es-ES")}
        </span>
        <span className="mt-2 block text-sm text-muted-foreground">
          seguidores en {profile.name}
        </span>
        <span className="mt-3 flex items-center gap-1.5 text-sm font-medium text-primary">
          {profile.handle}
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </span>
      <span className="sr-only">
        {profile.followers.toLocaleString("es-ES")} seguidores en {profile.name}. Abrir perfil.
      </span>
    </a>
  );
}

export function Comunidad() {
  const ref = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || start) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [start]);

  return (
    <section aria-labelledby="comunidad" className="bg-sand/40">
      <div ref={ref} className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="max-w-2xl">
          <p className="home-eyebrow text-sm font-medium text-primary">Sígueme</p>
          <h2 id="comunidad" className="mt-4 font-display text-3xl font-medium leading-tight text-balance md:text-4xl">
            Súmate a nuestra comunidad
          </h2>
          <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-muted-foreground">
            Un espacio donde compartimos reflexiones, herramientas y pequeños recursos para
            acompañarte también fuera de terapia.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {SOCIAL_PROFILES.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} start={start} />
          ))}
        </div>

        <p className="mt-6 text-xs text-muted-foreground/80">
          Cifras reales de cada perfil, comprobadas en {SOCIAL_FOLLOWERS_UPDATED}.
        </p>
      </div>
    </section>
  );
}
