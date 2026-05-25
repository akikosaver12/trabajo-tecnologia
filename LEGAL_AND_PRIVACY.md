# Cumplimiento Legal y Privacidad

## 1. Marco Legal Aplicable: Ley 1581 de 2012 (Colombia)

El proyecto cumple de manera estricta con el Régimen General de Protección de Datos Personales de Colombia (Ley 1581 de 2012 y Decreto 1377 de 2013).

- **Responsable del Tratamiento**: [Pendiente de Asignación por el Cliente / Organizador del Webinar]
- **Datos Recolectados**:
  - *Vía Formulario Tradicional*: Nombre Completo, Correo Electrónico y Teléfono Celular.
  - *Vía Google Sign-In (OAuth 2.0)*: Nombre Completo, Correo Electrónico e Imagen de Perfil (Avatar).
- **Finalidad del Tratamiento**:
  - Gestionar el registro y acceso al Webinar de Inteligencia Artificial.
  - Envío de recordatorios del evento (vía correo o WhatsApp/SMS si aplica).
  - Envío de información comercial o educativa sobre futuros cursos o eventos de tecnología, siempre y cuando se obtenga la autorización explícita.

## 2. Mecanismos de Consentimiento (Autorización Explícita)

Para garantizar un consentimiento informado, libre y previo, se implementarán dos flujos:

- **Formulario Tradicional**:
  - Casilla de verificación (checkbox) obligatoria, sin pre-marcar.
  - Texto descriptivo: *"Acepto los Términos y Condiciones y la Política de Tratamiento de Datos Personales (Ley 1581 de 2012)."* con enlace clickable a `politica-privacidad.html`.
- **Registro con Google**:
  - Leyenda informativa visible al lado del botón de Google: *"Al registrarte con tu cuenta de Google, autorizas el tratamiento de tus datos (nombre, correo y foto de perfil) según nuestra Política de Privacidad."*

## 3. Uso de Cookies y Terceros

Debido a la inclusión de herramientas de analítica y marketing (Google Analytics y Meta Pixel):

- Se implementará un **Banner de Consentimiento de Cookies** en la primera carga del sitio.
- Los scripts de terceros (tracking pixels, analytics tags) **no se cargarán** hasta que el usuario haga clic en "Aceptar".
- Se ofrecerá un enlace a `politica-cookies.html` con la explicación detallada de los tipos de cookies utilizadas, persistencia y forma de desactivarlas en el navegador.

## 4. Medidas de Seguridad de la Información

- **Tránsito de Datos Seguro**: Forzado de HTTPS en el servidor para evitar intercepción de datos (MitM).
- **Control en Cliente**: El token JWT entregado por Google se procesará en el navegador, extrayendo el perfil del usuario de forma local mediante codificación Base64 segura, previniendo inyecciones de datos no saneados.
- **Principio de Minimización**: Solo se solicitan los datos indispensables para ejecutar el registro al webinar.
