import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const KEY = "noralma-cookie-consent";
const EVENT = "noralma:cookie-settings";

export type CookieConsentValue = { necessary: true; analytics: boolean; date: string };

/** Lee el consentimiento guardado; solo llamar en el navegador. */
export function getCookieConsent(): CookieConsentValue | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CookieConsentValue) : null;
  } catch {
    return null;
  }
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(EVENT));
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [settings, setSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const saved = getCookieConsent();
    if (!saved) setVisible(true);
    else setAnalytics(saved.analytics);
    const open = () => {
      setAnalytics(getCookieConsent()?.analytics ?? false);
      setSettings(true);
      setVisible(true);
    };
    window.addEventListener(EVENT, open);
    return () => window.removeEventListener(EVENT, open);
  }, []);

  function save(value: boolean) {
    localStorage.setItem(KEY, JSON.stringify({ necessary: true, analytics: value, date: new Date().toISOString() }));
    setVisible(false);
    setSettings(false);
  }

  if (!visible) return null;

  return (
    <div role="dialog" aria-label="Preferencias de cookies" className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-xl rounded-2xl bg-card p-6 shadow-lg ring-1 ring-foreground/10">
      <p className="font-display text-lg font-medium">Tu privacidad importa</p>
      <p className="mt-2 text-sm leading-relaxed text-foreground/70">
        Uso solo las cookies necesarias para que la web funcione. Las opcionales nunca se
        activan sin tu permiso. <Link to="/cookies" className="text-primary underline">Más información</Link>
      </p>
      {settings && (
        <div className="mt-4 space-y-3 rounded-xl bg-secondary p-4 text-sm">
          <label className="flex items-start gap-3">
            <input type="checkbox" checked disabled className="mt-1 accent-primary" />
            <span><strong>Necesarias</strong> — siempre activas.</span>
          </label>
          <label className="flex items-start gap-3">
            <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="mt-1 accent-primary" />
            <span><strong>Analíticas</strong> — para entender cómo se usa la web (ahora mismo no se usa ninguna).</span>
          </label>
        </div>
      )}
      <div className="mt-5 flex flex-wrap gap-2">
        <button type="button" onClick={() => save(false)} className="rounded-full px-5 py-2.5 text-sm font-semibold text-primary ring-2 ring-primary transition-colors hover:bg-primary/10">
          Rechazar
        </button>
        {settings ? (
          <button type="button" onClick={() => save(analytics)} className="rounded-full px-5 py-2.5 text-sm font-semibold text-primary ring-2 ring-primary transition-colors hover:bg-primary/10">
            Guardar selección
          </button>
        ) : (
          <button type="button" onClick={() => setSettings(true)} className="rounded-full px-5 py-2.5 text-sm font-semibold text-primary ring-2 ring-primary transition-colors hover:bg-primary/10">
            Configurar
          </button>
        )}
        <button type="button" onClick={() => save(true)} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
          Aceptar
        </button>
      </div>
    </div>
  );
}
