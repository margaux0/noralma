import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Entrar · Noralma" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError("Correo o contraseña incorrectos.");
      return;
    }
    navigate({ to: "/escribir" });
  }

  const inputClass =
    "mt-2 w-full rounded-lg bg-secondary px-4 py-3 text-base outline-none ring-1 ring-foreground/5 focus:ring-2 focus:ring-primary/40";

  return (
    <div className="mx-auto flex max-w-md flex-col px-6 py-16 md:py-24">
      <h1 className="font-display text-3xl font-medium">Hola, Nora 🤍</h1>
      <p className="mt-2 text-sm text-foreground/65">
        Entra para escribir una nueva entrada en el blog.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-2xl bg-background p-7 ring-1 ring-foreground/5"
      >
        <label className="block text-sm font-semibold" htmlFor="email">
          Correo
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          required
        />
        <label className="mt-5 block text-sm font-semibold" htmlFor="password">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
          required
        />
        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground ring-1 ring-primary/40 transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          {loading ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </div>
  );
}
