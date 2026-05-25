# Backlog del Proyecto

## 1. Tareas de Configuración y Documentación

- **[x] Configuración Inicial de Memoria**: Crear y configurar los 10 archivos `.md` de gobernanza del proyecto.

- **[ ] Aprobación del Plan de Trabajo**: Obtener la firma o aprobación explícita del cliente sobre el `implementation_plan.md`.

## 2. Fase de Desarrollo (Sprint 1)

- **[ ] Estructura Base y Contenido (HTML)**:
  - Crear `index.html` con las secciones Hero, Beneficios, Agenda, Formulario y Cookie Banner.
  - Crear `politica-privacidad.html` adaptada a la Ley 1581 y recolección de datos de Google.
  - Crear `politica-cookies.html` explicando las cookies analíticas e instructivo de desactivación.

- **[ ] Diseño Visual y Responsive (CSS)**:
  - Configurar variables CSS en `css/style.css` (colores `#0B0F19`, `#6366F1`, `#06B6D4`, tipografías Outfit e Inter).
  - Diseñar componentes de formulario con estilo glassmorphic.
  - Implementar animaciones de hover y carga sutiles.
  - Asegurar adaptabilidad mobile-first.

- **[ ] Lógica e Integraciones (JavaScript)**:
  - Integrar el SDK de Google Identity Services.
  - Crear el script en `js/app.js` para inicializar el botón de Google, procesar el JWT, y extraer el perfil de usuario de forma segura.
  - Implementar validaciones para el formulario de registro tradicional y el consentimiento legal.
  - Crear la lógica interactiva del banner de cookies (persistir aceptación en `localStorage`).

## 3. Fase de Calidad y Pruebas

- **[ ] Auditoría de Calidad (Quality Gate)**:
  - Validar accesibilidad con teclado.
  - Comprobar que los scripts de cookies de terceros no se ejecuten antes de la aceptación explícita.
  - Validar responsividad en dispositivos móviles virtuales.
  - Realizar sanitización contra inyecciones XSS.
