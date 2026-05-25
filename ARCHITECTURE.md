# Arquitectura y Diseño Técnico

## 1. Objetivos Técnicos

- **Rendimiento**: Lograr tiempos de respuesta rápidos y bajas tasas de rebote al evitar dependencias de frameworks JS del lado del cliente.
- **Mantenibilidad**: Estructura de código limpia y modular usando variables de diseño CSS y modularización de JS.
- **Portabilidad**: Facilidad de despliegue en cualquier servidor de estáticos (Vercel, Netlify, GitHub Pages, Firebase Hosting).

## 2. Stack Tecnológico

- **Maquetación**: HTML5 Semántico.
- **Estilos (CSS)**: CSS3 Vainilla con Custom Properties (Tokens) y Flexbox/Grid para diseño responsivo.
- **Lógica (JS)**: JavaScript Vainilla (ES6) para validaciones y control de cookies.
- **SDKs Externos**: Google Identity Services Client Library (`https://accounts.google.com/gsi/client`) para la autenticación única (SSO).

## 3. Estructura de Directorios

El árbol de directorios del proyecto se organiza de la siguiente manera:

```text
solucion-de-problemas/
  ├── index.html                  # Página principal de la Landing Page
  ├── politica-privacidad.html    # Política de Privacidad de Datos (Ley 1581)
  ├── politica-cookies.html       # Política de Cookies
  ├── css/
  │   └── style.css               # Hoja de estilos global y diseño responsive
  ├── js/
  │   └── app.js                  # Lógica del formulario, cookies y Google GIS API
  └── assets/                     # Activos estáticos
      ├── logos/                  # Logos (Google, marca del evento)
      ├── icons/                  # Iconos SVG de soporte
      ├── images/                 # Imágenes optimizadas para la UI
      └── fonts/                  # Fuentes locales opcionales
```

## 4. Patrones de Diseño y Flujo de Autenticación

El flujo de registro mediante Google Sign-In sigue los siguientes pasos:

1. **Carga del SDK**: La biblioteca `gsi/client` se carga de forma asíncrona.
2. **Inicialización**: Se ejecuta `google.accounts.id.initialize` con el Client ID configurado y una función callback de manejo de credenciales.
3. **Renderizado del Botón**: Se renderiza el botón mediante `google.accounts.id.renderButton` en el contenedor HTML asignado.
4. **Respuesta (JWT)**: Cuando el usuario se autentica exitosamente, Google devuelve un JSON Web Token (JWT) firmado en la credencial.
5. **Procesamiento de Credenciales**: El callback de `app.js` recibe el JWT, lo decodifica de forma segura en el cliente (extrayendo el payload codificado en Base64) y muestra los datos del usuario (Nombre, Email, Foto de perfil) en una tarjeta de éxito dinámica.
