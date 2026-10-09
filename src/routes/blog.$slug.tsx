import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { coverFor, fetchPost, formatDate } from "@/lib/blog";
import { WHATSAPP_URL } from "@/lib/contact";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await fetchPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Entrada no encontrada · Noralma" }, { name: "robots", content: "noindex" }],
      };
    }
    return {
      meta: [
        { title: `${loaderData.title} · Blog Noralma` },
        { name: "description", content: loaderData.excerpt },
        { property: "og:title", content: loaderData.title },
        { property: "og:description", content: loaderData.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const post = Route.useLoaderData();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Link
        to="/blog"
        className="text-sm font-semibold text-primary transition-colors hover:text-primary/80"
      >
        ← Volver al blog
      </Link>
      <p className="mt-8 text-xs font-semibold uppercase tracking-[0.15em] text-sage">
        {post.category} · {formatDate(post.published_at)}
      </p>
      <h1 className="mt-4 font-display text-4xl font-medium leading-tight text-balance md:text-5xl">
        {post.title}
      </h1>
      <img
        src={coverFor(post)}
        alt={post.title}
        width={1024}
        height={640}
        className="mt-10 w-full rounded-2xl object-cover ring-1 ring-foreground/5"
      />
      <div className="mt-10 space-y-6">
        {post.content.split(/\n\s*\n/).map((paragraph, i) => (
          <p key={i} className="text-lg leading-relaxed text-foreground/80 text-pretty">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="mt-14 rounded-2xl bg-secondary p-8 ring-1 ring-foreground/5">
        <h2 className="font-display text-2xl font-medium">¿Te resuena lo que leíste?</h2>
        <p className="mt-2 text-base leading-relaxed text-foreground/65">
          Si quieres trabajarlo en sesión, escríbeme. Te respondo personalmente.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground ring-1 ring-primary/40 transition-colors hover:bg-primary/90"
        >
          Contactar con Nora
        </a>
      </div>
    </article>
  );
}
