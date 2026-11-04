import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, legalHead } from "@/components/LegalPage";
import { openCookieSettings } from "@/components/CookieConsent";

export const Route = createFileRoute("/cookies")({
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
        Al pulsar enlaces a Instagram, WhatsApp, LinkedIn o Doctoralia sales de esta web, y
        esos servicios aplican sus propias políticas de cookies.
      </p>
      <h2>Cambiar tu elección</h2>
      <p>
        <button type="button" onClick={openCookieSettings} className="font-semibold text-primary underline">
          Abrir configuración de cookies
        </button>
      </p>
    </LegalPage>
  ),
});
