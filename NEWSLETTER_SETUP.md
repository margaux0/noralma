# La carta de Noralma — activación pendiente

La sección y la invitación están integradas. La recogida está desactivada y no se guarda ningún correo. No hay integración API implementada: la conexión Brevo fue rechazada porque el rol actual no puede crear conexiones.

## Requisitos del propietario

1. Crear una cuenta Brevo y verificar un remitente autorizado (preferiblemente un dominio propio). No inferir el remitente desde el email de contacto.
2. Conectar Brevo desde Lovable con una cuenta que tenga permisos para crear conexiones. Usar la conexión segura, nunca claves en el chat o en código.
3. Completar NIF y domicilio de Nora para la información del responsable. Revisar condiciones de encargo y transferencias del proveedor y actualizar privacidad antes de activar.

## Configuración al conectar

- Crear la lista confirmada «Newsletter Noralma».
- Crear plantilla de confirmación con enlace `{{ params.DOIurl }}`. API documentada: `POST /v3/contacts/doubleOptinConfirmation`, campos `email`, `includeListIds`, `templateId`, `redirectionUrl`.
- Usar una función de servidor con validación compartida `newsletterSchema` y secretos de la conexión, según el modo gateway/directo que devuelva la conexión. No crear contactos confirmados antes del clic.
- Guardar prueba del consentimiento conforme al mecanismo admitido por Brevo. No guardar datos clínicos. Normalizar email y comprobar comportamiento de duplicados y contactos previamente dados de baja; no reactivar automáticamente.
- La página de retorno no debe afirmar que está confirmado solo por visitar la URL: verificar el estado del proveedor o mostrar una confirmación neutral de haber abierto el enlace.
- Crear automatización de bienvenida solo cuando se añada el contacto a la lista confirmada, sin repetirla para suscripciones existentes.
- Usar la baja administrada por Brevo en cada carta. Nunca exponer una función pública que permita dar de baja cualquier correo sin token de verificación.

## Bienvenida solicitada

Asunto: ¡Bienvenida a La carta de Noralma! 🌿

Hola,

Qué alegría que hayas decidido formar parte de este pequeño espacio.

A partir de ahora recibirás de vez en cuando una carta con reflexiones, herramientas y recursos relacionados con la psicología y el bienestar emocional.

No pretendo llenar tu bandeja de entrada, sino ofrecerte pequeñas lecturas que puedan acompañarte en algún momento de tu día.

Gracias por estar aquí.

Un abrazo,

Nora
Noralma Psicología

## Antes de activar

Probar con una dirección autorizada: solicitud real, entrega de confirmación, contacto pendiente antes del clic, alta tras el clic, bienvenida única, duplicado sin nueva alta y baja efectiva. Revisar la lista en Brevo y los eventos de envío. Eliminar únicamente los contactos de prueba por su identificador. Actualizar privacidad con la plataforma y sus condiciones reales; activar el formulario únicamente cuando el flujo completo funcione.

No se añade una tabla local porque Nora eligió Brevo o MailerLite como destino. Una copia adicional requeriría acordarla explícitamente, considerando las bajas y la minimización de datos.