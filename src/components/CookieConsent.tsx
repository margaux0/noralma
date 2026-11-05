import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

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
    <div role="dialog" aria-label="Preferencias de cookies" className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-h-[calc(100dvh-6rem)] max-w-xl overflow-y-auto rounded-lg bg-card p-5 shadow-lg ring-1 ring-foreground/10 sm:p-6">
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
      <div className="mt-5 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        <Button variant="outline" type="button" onClick={() => save(false)} className="h-auto min-h-11 whitespace-normal border-primary px-4 py-2.5 text-primary shadow-none">
          Rechazar
        </Button>
        {settings ? (
          <Button variant="outline" type="button" onClick={() => save(analytics)} className="h-auto min-h-11 whitespace-normal border-primary px-4 py-2.5 text-primary shadow-none">
            Guardar selección
          </Button>
        ) : (
          <Button variant="outline" type="button" onClick={() => setSettings(true)} className="h-auto min-h-11 whitespace-normal border-primary px-4 py-2.5 text-primary shadow-none">
            Configurar
          </Button>
        )}
        <Button type="button" onClick={() => save(true)} className="col-span-2 h-auto min-h-11 px-4 py-2.5 shadow-none">
          Aceptar
        </Button>
      </div>
    </div>
  );
}
