# Registro de Decisiones de Arquitectura (ADR)

## 1. Decisiones Registradas

### ADR-001: Selección del Stack Tecnológico Vainilla (HTML5/CSS3/JS)
- **Fecha**: 25-May-2026

- **Capa**: Frontend / Arquitectura

- **Responsables**: Tech Lead / Software Architect

- **Estado**: Aceptado

- **Contexto**: Se requiere una Landing Page con carga extremadamente rápida para maximizar las conversiones de registro al webinar. Introducir frameworks pesados como React o Next.js añadiría un costo innecesario de compilación y mayor peso de bundle.

- **Decisión**: Usar HTML semántico puro, CSS3 modular estructurado por custom properties y JavaScript ES6 sin compiladores adicionales.

- **Justificación**: Carga instantánea (PageSpeed cercano al 100%), cero dependencias que mantener y facilidad de despliegue estático gratuito.

- **Consecuencias**: El código interactivo se manejará mediante manipulación directa del DOM (DOM scripting) organizada en `app.js`.

---

### ADR-002: Integración de Google Identity Services Client-Side
- **Fecha**: 25-May-2026

- **Capa**: Autenticación / Seguridad

- **Responsables**: Security Engineer / Software Architect

- **Estado**: Aceptado

- **Contexto**: El usuario solicitó registrarse utilizando el login de Google de manera ágil. Para una aplicación estática sin backend, debemos procesar las credenciales en el cliente de forma segura.

- **Decisión**: Utilizar el SDK oficial de Google Identity Services (`gsi/client`) para renderizar el botón y capturar el token JWT. Decodificar el token JWT en el cliente (Base64) únicamente para fines de visualización de perfil.

- **Justificación**: Reduce la fricción de registro y elimina la necesidad de un backend inmediato para verificar firmas si solo se requiere registrar la intención de asistencia en el cliente y mostrar su perfil.

- **Consecuencias**: Si se requiere un registro real persistente a una base de datos más adelante, el JWT deberá ser enviado a un servidor o API externa para su validación criptográfica correspondiente.

---

### ADR-003: Persistencia del Consentimiento de Cookies en LocalStorage
- **Fecha**: 25-May-2026

- **Capa**: Legal & Compliance / Frontend

- **Responsables**: Legal & InfoSec Officer / Frontend Engineer

- **Estado**: Aceptado

- **Contexto**: Para cumplir con las regulaciones de cookies, los scripts de analítica no deben cargarse hasta que el usuario dé su consentimiento. Además, debemos evitar mostrar el banner en cada recarga de página.

- **Decisión**: Almacenar el estado del consentimiento de cookies (`accepted` / `denied`) en `localStorage` del navegador.

- **Justificación**: Permite recordar la preferencia del usuario a lo largo de las sesiones sin necesidad de cookies de sesión adicionales, optimizando la experiencia de usuario de manera sencilla.

- **Consecuencias**: El script `app.js` leerá esta llave al cargar para determinar si inyecta o no los scripts de Google Analytics/Meta Pixel de forma dinámica.

---

### ADR-004: Integración Directa con la API REST de Supabase en Cliente
- **Fecha**: 25-May-2026

- **Capa**: Capa de Datos / Backend Serverless

- **Responsables**: Software Architect / Tech Lead

- **Estado**: Aceptado

- **Contexto**: Se requiere persistir los registros de los participantes (tanto tradicionales como vía Google) en una base de datos Supabase, sin introducir la complejidad y costo de un servidor backend intermedio.

- **Decisión**: Realizar peticiones HTTP `POST` directas utilizando la API REST nativa autogenerada de Supabase (`/rest/v1/registrados`) mediante la función nativa `fetch` en el navegador.

- **Justificación**: Evita descargar librerías SDK pesadas en el cliente, manteniendo el peso del script en pocos kilobytes y mejorando la velocidad de carga (PageSpeed). El acceso público de inserción se asegura habilitando Row Level Security (RLS) en Postgres.

- **Consecuencias**: El anon-key de Supabase se expone públicamente en el frontend, lo cual es seguro puesto que RLS bloquea cualquier permiso de lectura (`SELECT`) o modificación (`UPDATE`/`DELETE`) a usuarios anónimos.

---

### ADR-005: Despliegue en Vercel con Clean URLs
- **Fecha**: 25-May-2026

- **Capa**: DevOps / Infraestructura de Despliegue

- **Responsables**: DevOps Engineer

- **Estado**: Aceptado

- **Contexto**: El sitio cuenta con múltiples páginas internas (`politica-privacidad.html`, `politica-cookies.html`). Mostrar la extensión `.html` en la barra del navegador reduce la estética premium y profesional del proyecto.

- **Decisión**: Configurar un archivo `vercel.json` en la raíz del repositorio habilitando la opción `"cleanUrls": true` y configurando reglas de enrutamiento limpias para los documentos legales.

- **Justificación**: Vercel provee una red de entrega de contenido (CDN) global y optimizada de forma gratuita, ideal para hosting de estáticos.

- **Consecuencias**: Toda navegación a políticas se resolverá con URLs limpias (ej. `/politica-privacidad` en lugar de `/politica-privacidad.html`).
