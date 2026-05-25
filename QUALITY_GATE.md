# Criterios y Puertas de Calidad (Quality Gate)

## 1. Criterios de Aceptación de Código

- **HTML semántico**: Uso correcto de `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<nav>`, `<form>` y etiquetas de inputs correspondientes.
- **Formateo de Markdown (MD032)**:
  - Todas las listas (puntos o números) deben estar precedidas y seguidas por una línea en blanco.
  - Todos los encabezados (`#`, `##`, etc.) deben tener una línea en blanco arriba y abajo.
- **Javascript limpio**: Uso de ES6 (const/let, arrow functions, template literals), libre de errores de consola y variables globales no documentadas.

## 2. Cobertura y Pruebas Mínimas

- **Pruebas de Formulario**:
  - Validar comportamiento al enviar datos vacíos (debe mostrar alertas o textos de error y prevenir el envío).
  - Validar que el botón de envío no proceda si el checkbox de la Ley 1581 está desmarcado.
- **Prueba de Flujo de Google**:
  - Verificar inicialización correcta del script de Google y renderizado del botón oficial.
  - Simular respuesta de credencial para verificar la decodificación y renderizado de la UI de perfil del usuario.

## 3. Seguridad y Privacidad

- **Bloqueo Preventivo de Cookies**: Los scripts de seguimiento (Google Analytics, etc.) no deben cargarse en el DOM bajo ningún concepto antes de que el usuario haga clic en "Aceptar" en el banner de cookies.
- **Prevención XSS**: Toda información del formulario tradicional o de la API de Google debe ser sanitizada (escapar caracteres especiales como `<`, `>`, `&`, `"`, `'`) antes de ser inyectada en la UI mediante `textContent` o plantillas HTML seguras.

## 4. Rendimiento y Accesibilidad

- **Accesibilidad (A11y)**:
  - Todo elemento interactivo debe poder enfocarse mediante teclado (uso correcto de `tabindex` y `focus states`).
  - Las imágenes deben poseer la etiqueta `alt` descriptiva obligatoria.
  - Los inputs deben contar con un elemento `<label>` asociado mediante `for`/`id`.
- **Rendimiento**:
  - No usar imágenes superiores a 500KB.
  - Cargar las hojas de estilo de Google Fonts de forma eficiente.
