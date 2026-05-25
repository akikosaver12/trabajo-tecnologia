# Requisitos del Proyecto (ISO/IEC/IEEE 29148)

## 1. Introducción

Este documento detalla las especificaciones funcionales y no funcionales de la Landing Page de registro para el Webinar de Inteligencia Artificial.

## 2. Requisitos Funcionales (RF)

### RF-01: Formulario de Registro Tradicional
- **Descripción**: Formulario que solicita Nombre Completo, Correo Electrónico y Teléfono Celular.
- **Criterio de Aceptación**: Debe validar que el correo tenga un formato válido, el celular contenga solo números (mínimo 10 dígitos) y se haya marcado obligatoriamente la casilla de aceptación de la Política de Privacidad (Ley 1581).

### RF-02: Registro con Google Sign-In
- **Descripción**: Botón oficial "Registrarse con Google" integrado en la interfaz.
- **Criterio de Aceptación**: Debe cargar la API de Google Identity Services, desplegar la ventana de autenticación y, al completarse con éxito, recibir el JWT para extraer la información básica.

### RF-03: Visualización de Perfil tras Registro
- **Descripción**: Área dinámica que reemplaza o acompaña el formulario tras un registro exitoso (tradicional o por Google).
- **Criterio de Aceptación**: Si el registro es por Google, debe mostrar la foto de perfil del usuario, su nombre y su correo electrónico con un mensaje de éxito. Si es tradicional, debe mostrar su nombre y correo con un avatar genérico.

### RF-04: Banner de Consentimiento de Cookies
- **Descripción**: Banner flotante inferior para informar sobre el uso de cookies analíticas/marketing (Google Analytics, Meta Pixel).
- **Criterio de Aceptación**: Debe incluir opciones de "Aceptar", "Rechazar" y un enlace a la Política de Cookies. La elección debe persistir en `localStorage` y ocultar el banner en visitas futuras.

### RF-05: Secciones de Contenido Persuasivo
- **Descripción**: Secciones para enganchar al usuario: Hero, Beneficios Clave del Webinar, Agenda (Cómo funciona / Paso a paso).
- **Criterio de Aceptación**: Diseño responsivo y coherente con las pautas visuales establecidas.

## 3. Requisitos No Funcionales (RNF)

### RNF-01: Rendimiento y Optimización
- **Descripción**: La página debe cargar en menos de 1.5 segundos en conexiones de banda ancha estándar.
- **Criterio de Aceptación**: Uso de HTML semántico, CSS vainilla sin frameworks pesados, y scripts asíncronos para SDKs externos.

### RNF-02: Diseño Responsivo y Mobile-First
- **Descripción**: Adaptación completa a dispositivos móviles, tablets y pantallas de escritorio.
- **Criterio de Aceptación**: La cuadrícula y los formularios deben apilarse y ser legibles en pantallas desde 320px de ancho.

### RNF-03: Accesibilidad (WCAG 2.1 AA)
- **Descripción**: Facilitar la navegación para personas con discapacidades visuales o motoras.
- **Criterio de Aceptación**: Contraste de texto de al menos 4.5:1, etiquetas `aria-label` en botones y controles, y navegabilidad completa mediante teclado.

### RNF-04: Seguridad de la Información
- **Descripción**: Protección contra inyección de scripts y exposición de datos.
- **Criterio de Aceptación**: Sanitización del JWT de Google y de las entradas del formulario antes de procesarlas o renderizarlas.
