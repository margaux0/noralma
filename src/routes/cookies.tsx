import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, legalHead } from "@/components/LegalPage";
import { openCookieSettings } from "@/components/CookieConsent";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/cookies")({
  staticData: { sitemap: true },
  head: () => legalHead("/cookies", "Política de cookies", "Qué cookies usa la web de Noralma y cómo configurarlas."),
  component: () => (
    <LegalPage title="Política de cookies">
      <p>
        Una cookie es un pequeño archivo que la web guarda en tu navegador. Esta web solo
        usa lo imprescindible para funcionar.
      </p>
      <h2>Cookies que se usan</h2>
      <ul>
        <li>
          <strong>Técnicas (necesarias):</strong> guardan tu elección sobre las cookies y, si
          entras en el área privada, mantienen la sesión iniciada. No requieren consentimiento.
        </li>
        <li>
          <strong>Analíticas:</strong> ahora mismo no se usa ninguna. Si en el futuro se añaden,
          solo se activarán si las aceptas.
        </li>
      </ul>
      <p>
        La pregunta sobre cookies vuelve a aparecer en cada nueva visita. La invitación a
        La carta de Noralma también vuelve a mostrarse, sin guardar tu decisión de cerrarla
        entre visitas ni utilizarla para seguimiento publicitario.
      </p>
      <p>
        Al pulsar enlaces a Instagram, WhatsApp, LinkedIn o Doctoralia sales de esta web, y
        esos servicios aplican sus propias políticas de cookies.
      </p>
      <h2>Cambiar tu elección</h2>
      <p>
        <Button variant="link" type="button" onClick={openCookieSettings} className="h-auto min-h-11 whitespace-normal px-0 font-semibold text-primary underline">
          Abrir configuración de cookies
        </Button>
      </p>
    </LegalPage>
  ),
});
