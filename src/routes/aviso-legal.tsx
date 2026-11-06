import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, Pendiente, legalHead } from "@/components/LegalPage";
import { COLEGIADA, CONTACT_EMAIL } from "@/lib/contact";

export const Route = createFileRoute("/aviso-legal")({
  staticData: { sitemap: true },
  head: () => legalHead("/aviso-legal", "Aviso legal", "Datos de la titular y condiciones de uso de la web de Noralma."),
  component: () => (
    <LegalPage title="Aviso legal">
      <h2>Titular de la web</h2>
      <ul>
        <li>Titular: Nora Gallardo Cano</li>
        <li>Profesión: Psicóloga General Sanitaria</li>
        <li>Nº de colegiada: {COLEGIADA} (Col·legi Oficial de Psicologia de Catalunya)</li>
        <li>NIF: <Pendiente>NIF</Pendiente></li>
        <li>Domicilio profesional: <Pendiente>dirección de la consulta en Vilanova i la Geltrú</Pendiente></li>
        <li>Nº de registro del centro sanitario: <Pendiente>registro sanitario</Pendiente></li>
        <li>Correo electrónico: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
      </ul>
      <p>
        Esta información se ofrece en cumplimiento de la Ley 34/2002, de servicios de la
        sociedad de la información y de comercio electrónico (LSSI-CE).
      </p>
      <h2>Uso de la web</h2>
      <p>
        Los contenidos de esta web (textos, guías, artículos e imágenes) tienen carácter
        divulgativo y no sustituyen una evaluación ni un tratamiento psicológico
        individualizado. Si estás pasando por una situación de urgencia, contacta con el 112
        o con el teléfono de atención a la conducta suicida 024.
      </p>
      <h2>Propiedad intelectual</h2>
      <p>
        Los contenidos propios de Noralma no pueden reproducirse con fines comerciales sin
        autorización. Puedes compartirlos citando su procedencia.
      </p>
    </LegalPage>
  ),
});
