import type { ReactNode } from "react";

/** Hueco visible para datos legales que Nora todavía tiene que facilitar. */
export function Pendiente({ children }: { children: ReactNode }) {
  return (
    <mark className="rounded bg-honey/25 px-1 text-foreground">[{children}: pendiente de completar]</mark>
  );
}

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage">Información legal</p>
      <h1 className="mt-4 font-display text-4xl font-medium md:text-5xl">{title}</h1>
      <div className="mt-10 space-y-5 text-base leading-relaxed text-foreground/75 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:text-foreground [&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center [&_a]:text-primary [&_a]:underline [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6">
        {children}
      </div>
    </div>
  );
}

export function legalHead(path: string, title: string, description: string) {
  const url = `https://noralmapsicologia.com${path}`;
  return {
    meta: [
      { title: `${title} · Noralma` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} · Noralma` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
