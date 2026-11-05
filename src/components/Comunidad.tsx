import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import { InstagramIcon, TikTokIcon } from "@/components/SocialIcons";
import { SOCIAL_PROFILES, type SocialProfile } from "@/lib/social";
import { getSocialFollowers } from "@/lib/social.functions";

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

function ProfileCard({
  profile,
  followers,
  start,
}: {
  profile: SocialProfile;
  followers: number;
  start: boolean;
}) {
  const Icon = icons[profile.id];
  const count = useCountUp(followers, start);

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
        {followers.toLocaleString("es-ES")} seguidores en {profile.name}. Abrir perfil.
      </span>
    </a>
  );
}

export function Comunidad() {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  const { data: enDirecto, isPending } = useQuery({
    queryKey: ["social-followers"],
    queryFn: () => getSocialFollowers(),
    staleTime: 60 * 60 * 1000,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [seen]);

  // TikTok se lee en directo; Instagram usa la cifra guardada (Instagram no
  // deja leerla desde la web). Si la lectura falla, se muestra la guardada.
  const followersFor = (profile: SocialProfile) =>
    profile.id === "tiktok" ? (enDirecto?.tiktok ?? profile.followers) : profile.followers;

  const start = seen && !isPending;

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
            <ProfileCard
              key={profile.id}
              profile={profile}
              followers={followersFor(profile)}
              start={start}
            />
          ))}
        </div>

        <p className="mt-6 text-xs text-muted-foreground/80">
          Cifras reales de cada perfil, actualizadas automáticamente.
        </p>
      </div>
    </section>
  );
}
