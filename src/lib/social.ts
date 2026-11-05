import { INSTAGRAM_URL, TIKTOK_URL } from "@/lib/contact";

/**
 * Perfiles sociales de Noralma.
 * Las cifras que se ven en la web se leen en directo de cada perfil
 * (ver src/lib/social.functions.ts). Los números de aquí son la copia
 * guardada que se muestra si alguna red no responde.
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
