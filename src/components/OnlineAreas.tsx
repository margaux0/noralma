import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { onlineAreas } from "@/lib/online-areas";

export function OnlineAreas() {
  return (
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {onlineAreas.map(({ title, text, hash, Icon }) => (
        <Link key={title} to="/servicios" hash={hash} className="group flex min-w-0 flex-col rounded-md border border-primary/15 bg-card p-6 outline-offset-4 transition-colors hover:border-primary/40 focus-visible:outline-primary">
          <Icon className="size-6 text-primary" strokeWidth={1.3} aria-hidden="true" />
          <h3 className="mt-5 font-display text-xl font-medium leading-snug group-hover:text-primary">{title}</h3>
          <p className="mb-5 mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
          <span className="mt-auto flex min-h-11 items-center gap-2 text-sm font-medium text-primary">Conoce más <ArrowUpRight className="size-4" aria-hidden="true" /></span>
        </Link>
      ))}
    </div>
  );
}