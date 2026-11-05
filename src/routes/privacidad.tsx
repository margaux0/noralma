import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, Pendiente, legalHead } from "@/components/LegalPage";
import { CONTACT_EMAIL } from "@/lib/contact";

export const Route = createFileRoute("/privacidad")({
  head: () => legalHead("/privacidad", "Política de privacidad", "Cómo trata Noralma tus datos personales y cuáles son tus derechos."),
  component: () => (
    <LegalPage title="Política de privacidad">
      <h2>Responsable del tratamiento</h2>
      <p>
        Nora Gallardo Cano, Psicóloga General Sanitaria. NIF: <Pendiente>NIF</Pendiente>.
        Domicilio: <Pendiente>dirección</Pendiente>. Contacto:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
      <h2>Qué datos recojo y para qué</h2>
      <ul>
        <li>
          Formulario de contacto: nombre, correo electrónico y mensaje, solo para responder a
          tu consulta. No es necesario que incluyas información de salud en él.
        </li>
        <li>
          WhatsApp: si me escribes por esta vía, uso tus datos solo para gestionar tu cita y
          responderte.
        </li>
        <li>
          Atención psicológica: los datos de salud que se generen durante la terapia se tratan
          con total confidencialidad, sujetos al secreto profesional y a la normativa sanitaria.
        </li>
      </ul>
      <h2>La carta de Noralma</h2>
      <p>
        Las suscripciones a La carta de Noralma todavía no están abiertas y este formulario
        no guarda ni envía tu correo. Cuando se active, su finalidad será enviarte reflexiones,
        herramientas y recursos de psicología y bienestar emocional, solo con tu consentimiento
        expreso y después de confirmar tu dirección. No se solicitarán datos de salud ni se
        incorporará tu dirección a otras campañas comerciales.
      </p>
      <p>
        La plataforma de correo y sus condiciones se identificarán aquí antes de abrir las
        suscripciones. Podrás retirar tu consentimiento y darte de baja desde cada correo o
        escribiendo a <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
      <h2>Consentimiento y prestación del servicio</h2>
      <p>
        Tu consentimiento al enviar el formulario o escribirme, y la prestación del servicio
        profesional que solicitas (art. 6.1.a y 6.1.b del RGPD; art. 9.2.h para los datos de
        salud en el marco de la atención sanitaria).
      </p>
      <h2>Cuánto tiempo conservo tus datos</h2>
      <p>
        Los mensajes de contacto, el tiempo necesario para atender tu consulta. La
        documentación clínica, durante los plazos que marca la normativa sanitaria aplicable.
      </p>
      <h2>Con quién se comparten</h2>
      <p>
        No cedo tus datos a terceros salvo obligación legal. Los mensajes del formulario se
        guardan en un proveedor de alojamiento que actúa como encargado del tratamiento.
      </p>
      <h2>Tus derechos</h2>
      <p>
        Puedes pedir acceder, rectificar, suprimir, oponerte, limitar el tratamiento o la
        portabilidad de tus datos escribiendo a{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. También puedes presentar una
        reclamación ante la Agencia Española de Protección de Datos (aepd.es).
      </p>
    </LegalPage>
  ),
});
