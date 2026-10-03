import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/escribir")({
  head: () => ({
    meta: [{ title: "Nueva entrada · Noralma" }, { name: "robots", content: "noindex" }],
  }),
  component: EscribirPage,
});

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const covers = [
  { value: "blog-descansar", label: "Diario y té" },
  { value: "blog-ansiedad", label: "Cortinas de lino" },
  { value: "blog-autocuidado", label: "Taza y planta" },
];

function EscribirPage() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Reflexión");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState("blog-descansar");
  const [status, setStatus] = useState<"idle" | "saving">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate({ to: "/auth" });
      } else {
        setChecking(false);
      }
    });
  }, [navigate]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const slug = slugify(title);
    if (!title.trim() || !content.trim() || !slug) {
      setError("El título y el contenido son necesarios.");
      return;
    }
    setStatus("saving");
    const { error } = await supabase.from("blog_posts").insert({
      slug,
      title: title.trim(),
      category: category.trim() || "Reflexión",
      excerpt: excerpt.trim(),
      content: content.trim(),
      cover_image: cover,
    });
    setStatus("idle");
    if (error) {
      setError(
        error.code === "23505"
          ? "Ya existe una entrada con un título parecido. Cámbialo un poco."
          : "No pude guardar la entrada. Inténtalo de nuevo.",
      );
      return;
    }
    navigate({ to: "/blog/$slug", params: { slug } });
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  if (checking) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-sm text-foreground/60">
        Comprobando tu sesión…
      </div>
    );
  }

  const inputClass =
    "mt-2 w-full rounded-lg bg-secondary px-4 py-3 text-base outline-none ring-1 ring-foreground/5 focus:ring-2 focus:ring-primary/40";

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-medium md:text-4xl">Nueva entrada</h1>
        <button
          onClick={handleSignOut}
          className="text-sm font-medium text-foreground/60 transition-colors hover:text-primary"
        >
          Cerrar sesión
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-2xl bg-background p-7 ring-1 ring-foreground/5"
      >
        <label className="block text-sm font-semibold" htmlFor="titulo">
          Título
        </label>
        <input
          id="titulo"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ej. Cuando descansar también es avanzar"
          className={inputClass}
        />
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold" htmlFor="categoria">
              Categoría
            </label>
            <input
              id="categoria"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold" htmlFor="portada">
              Imagen de portada
            </label>
            <select
              id="portada"
              value={cover}
              onChange={(e) => setCover(e.target.value)}
              className={inputClass}
            >
              {covers.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <label className="mt-5 block text-sm font-semibold" htmlFor="resumen">
          Resumen (una frase)
        </label>
        <input
          id="resumen"
          type="text"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Una frase que invite a leer"
          className={inputClass}
        />
        <label className="mt-5 block text-sm font-semibold" htmlFor="contenido">
          Contenido
        </label>
        <textarea
          id="contenido"
          rows={12}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escribe aquí tu entrada. Separa los párrafos con una línea en blanco."
          className={inputClass}
        />
        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
        <button
          type="submit"
          disabled={status === "saving"}
          className="mt-6 w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground ring-1 ring-primary/40 transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          {status === "saving" ? "Publicando…" : "Publicar entrada"}
        </button>
      </form>
    </div>
  );
}
