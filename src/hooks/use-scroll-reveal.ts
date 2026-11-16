import { useEffect } from "react";

/**
 * Progressive scroll reveal: content is visible by default (SSR / no JS / reduced motion).
 * Only after mount do off-screen elements get hidden and animate in once.
 */
export function useScrollReveal(rootSelector = ".home-editorial") {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(rootSelector);
    if (!root || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    root.querySelectorAll<HTMLElement>("[data-reveal-stagger]").forEach((group) => {
      Array.from(group.children).forEach((child, i) => {
        const el = child as HTMLElement;
        el.dataset.reveal ??= "up";
        el.style.setProperty("--reveal-delay", `${i * 80}ms`);
      });
    });

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const vh = window.innerHeight;
    const pending = items.filter((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) { el.classList.add("is-revealed"); return false; }
      el.classList.add("reveal-pending");
      return true;
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        el.classList.add("is-revealed");
        el.classList.remove("reveal-pending");
        io.unobserve(el);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    pending.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootSelector]);
}
