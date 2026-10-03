import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { coverFor, fetchPosts, formatDate } from "@/lib/blog";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog · Noralma" },
      {
        name: "description",
        content:
          "Reflexiones y recursos de psicología escritos por Nora: ansiedad, autocuidado y bienestar, en un lenguaje cercano.",
      },
      { property: "og:title", content: "Blog · Noralma" },
      {
        property: "og:description",
        content: "Reflexiones y recursos de psicología, en un lenguaje cercano.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/blog" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

function BlogPage() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: fetchPosts,
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage">Blog</p>
      <h1 className="mt-4 font-display text-4xl font-medium text-balance md:text-5xl">
        Palabras para entenderte mejor
      </h1>
      <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-foreground/65 text-pretty">
        Escribo sobre ansiedad, autocuidado y todo lo que nos pasa por dentro, con un
        lenguaje cercano y sin tecnicismos.
      </p>

      {isLoading ? (
        <p className="mt-12 text-sm text-foreground/60">Cargando entradas…</p>
      ) : (
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {(posts ?? []).map((post) => (
            <Link
              key={post.id}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="rounded-2xl bg-background ring-1 ring-foreground/5 transition-transform hover:-translate-y-1"
            >
              <img
                src={coverFor(post)}
                alt={post.title}
                width={1024}
                height={640}
                loading="lazy"
                className="h-44 w-full rounded-t-2xl object-cover"
              />
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sage">
                  {post.category} · {formatDate(post.published_at)}
                </p>
                <h2 className="mt-2 font-display text-xl font-medium leading-snug text-balance">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-foreground/65 text-pretty">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
