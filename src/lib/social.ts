import { INSTAGRAM_URL, TIKTOK_URL } from "@/lib/contact";

/**
 * Perfiles sociales de Noralma con sus cifras reales de seguidores.
 * Cifras leídas de los propios perfiles el 5 de noviembre de 2026.
 * No se inventan: si cambia alguna, se actualiza aquí (o se pide a Lovable
 * que vuelva a leerlas de los perfiles).
 */
export type SocialProfile = {
  id: "instagram" | "tiktok";
  name: string;
  handle: string;
  url: string;
  followers: number;
};

export const SOCIAL_PROFILES: SocialProfile[] = [
  {
    id: "instagram",
    name: "Instagram",
    handle: "@noralma.psicologia",
    url: INSTAGRAM_URL,
    followers: 5803,
  },
  {
    id: "tiktok",
    name: "TikTok",
    handle: "@noralma.psicologia",
    url: TIKTOK_URL,
    followers: 3144,
  },
];

/** Fecha en que se comprobaron las cifras (para el pie de la sección). */
export const SOCIAL_FOLLOWERS_UPDATED = "noviembre de 2026";
