import { supabase } from "@/integrations/supabase/client";
import blogDescansar from "@/assets/blog-descansar.jpg";
import blogAnsiedad from "@/assets/blog-ansiedad.jpg";
import blogAutocuidado from "@/assets/blog-autocuidado.jpg";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  published_at: string;
}

const coverMap: Record<string, string> = {
  "blog-descansar": blogDescansar,
  "blog-ansiedad": blogAnsiedad,
  "blog-autocuidado": blogAutocuidado,
};

export function coverFor(post: Pick<BlogPost, "cover_image">): string {
  if (post.cover_image && coverMap[post.cover_image]) return coverMap[post.cover_image];
  return blogDescansar;
}

export async function fetchPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("published_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function fetchPost(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
