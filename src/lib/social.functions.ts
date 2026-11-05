import { createServerFn } from "@tanstack/react-start";
import { INSTAGRAM_URL, TIKTOK_URL } from "@/lib/contact";

export type SocialFollowers = { instagram?: number; tiktok?: number };

/**
 * Identidad de móvil: Instagram y TikTok muestran sus cifras públicas
 * (seguidores) sin pedir inicio de sesión.
 */
const BROWSER =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

let cache: { at: number; data: SocialFollowers } | null = null;
const TTL = 60 * 60 * 1000;

/** Convierte "5,803", "5.803", "5,8 mil" o "5.8K" en un número entero. */
export function parseFollowers(raw: string): number | null {
  let s = raw.replace(/[\s\u00a0]/g, "").toLowerCase();
  if (!s) return null;

  let multiplier = 1;
  if (/(mil|k)$/.test(s)) {
    multiplier = 1000;
    s = s.replace(/(mil|k)$/, "");
  }

  const commas = (s.match(/,/g) ?? []).length;
  const dots = (s.match(/\./g) ?? []).length;

  if (commas && dots) {
    // El último separador es el decimal; los anteriores agrupan millares.
    const last = Math.max(s.lastIndexOf(","), s.lastIndexOf("."));
    s = s.slice(0, last).replace(/[.,]/g, "") + "." + s.slice(last + 1);
  } else if (commas || dots) {
    const sep = commas ? "," : ".";
    const groups = s.split(sep);
    const tail = groups[1] ?? "";
    // "5.803" o "5,803" agrupan millares; "5,8" es un decimal.
    const isThousands = groups.length === 2 && tail.length === 3 && multiplier === 1;
    s = isThousands ? groups.join("") : groups.join(".");
  }

  const value = Number(s);
  if (!Number.isFinite(value) || value <= 0) return null;
  return Math.round(value * multiplier);
}

/** Cifra de seguidores de la página pública de Instagram. */
export function parseInstagramFollowers(html: string): number | null {
  const match = html.match(/([\d][\d.,\s]{0,14}?)\s*(mil|k)?\s*(?:seguidores|followers)/i);
  if (!match) return null;
  return parseFollowers(`${match[1]}${match[2] ?? ""}`);
}

/** Cifra de seguidores de la página pública de TikTok. */
export function parseTiktokFollowers(html: string): number | null {
  const match = html.match(/"followerCount"\s*:\s*(\d+)/);
  if (!match) return null;
  return parseFollowers(match[1] ?? "");
}

async function read(url: string, parser: (html: string) => number | null): Promise<number | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": BROWSER,
        "Accept-Language": "es-ES,es;q=0.9",
      },
    });
    if (!res.ok) {
      console.error(`Social fetch failed [${res.status}] ${url}`);
      return null;
    }
    return parser(await res.text());
  } catch (error) {
    console.error(`Social fetch error ${url}`, error);
    return null;
  }
}

/**
 * Seguidores reales de los perfiles de Noralma.
 * Se leen de los propios perfiles y se guardan una hora en memoria;
 * si alguna red no responde, esa cifra se omite y la web muestra la guardada.
 */
export const getSocialFollowers = createServerFn({ method: "GET" }).handler(
  async (): Promise<SocialFollowers> => {
    if (cache && Date.now() - cache.at < TTL) return cache.data;

    const [instagram, tiktok] = await Promise.all([
      read(INSTAGRAM_URL, parseInstagramFollowers),
      read(TIKTOK_URL, parseTiktokFollowers),
    ]);

    const data: SocialFollowers = {};
    if (instagram && instagram > 0) data.instagram = instagram;
    if (tiktok && tiktok > 0) data.tiktok = tiktok;

    // Solo se cachean lecturas con alguna cifra: si fallan, se intenta otra vez.
    if (Object.keys(data).length) cache = { at: Date.now(), data };
    return data;
  },
);
