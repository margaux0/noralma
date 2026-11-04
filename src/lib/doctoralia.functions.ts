import { createServerFn } from "@tanstack/react-start";

export type Opinion = { name: string; date: string; text: string };
export type DoctoraliaData = { rating: number; count: number; opiniones: Opinion[] };

const PROFILE_URL = "https://www.doctoralia.es/perfil/nora-gallardo-cano";

let cache: { at: number; data: DoctoraliaData } | null = null;
const TTL = 60 * 60 * 1000;

const formatter = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Madrid",
});

export function parseDoctoralia(html: string): DoctoraliaData | null {
  const scripts = html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
  for (const m of scripts) {
    try {
      const json = JSON.parse(m[1]);
      if (!json?.aggregateRating || !Array.isArray(json.review)) continue;
      const opiniones: Opinion[] = json.review
        .filter((r: any) => r?.reviewBody && r?.author?.name)
        .map((r: any) => ({
          name: String(r.author.name),
          date: r.datePublished ? formatter.format(new Date(r.datePublished)) : "",
          text: String(r.reviewBody).replace(/\s+/g, " ").trim(),
        }));
      if (!opiniones.length) continue;
      return {
        rating: Number(json.aggregateRating.ratingValue) || 5,
        count: Number(json.aggregateRating.reviewCount) || opiniones.length,
        opiniones,
      };
    } catch {
      // ignore malformed block
    }
  }
  return null;
}

export const getDoctoraliaOpiniones = createServerFn({ method: "GET" }).handler(
  async (): Promise<DoctoraliaData | null> => {
    if (cache && Date.now() - cache.at < TTL) return cache.data;
    try {
      const res = await fetch(PROFILE_URL, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120",
          "Accept-Language": "es-ES,es;q=0.9",
        },
      });
      if (!res.ok) {
        console.error(`Doctoralia fetch failed [${res.status}]`);
        return cache?.data ?? null;
      }
      const data = parseDoctoralia(await res.text());
      if (data) cache = { at: Date.now(), data };
      return data ?? cache?.data ?? null;
    } catch (e) {
      console.error("Doctoralia fetch error", e);
      return cache?.data ?? null;
    }
  },
);
