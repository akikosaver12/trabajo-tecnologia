/**
 * =======================================================
 * LOGICA DEL FRONTEND: REGISTRO WEBINAR & GOOGLE SIGN-IN
 * INTEGRADO CON SUPABASE REST API (SERVERLESS)
 * =======================================================
 */

// Configuración de Credenciales de Supabase
// Puedes configurar estas variables en un script previo o reemplazarlas con tus datos reales de Supabase.
const SUPABASE_CONFIG = {
    url: window.ENV?.SUPABASE_URL || "https://YOUR_SUPABASE_PROJECT_ID.supabase.co",
    anonKey: window.ENV?.SUPABASE_ANON_KEY || "YOUR_SUPABASE_ANON_KEY"
};

document.addEventListener("DOMContentLoaded", () => {
    // Inicializar elementos de la interfaz
    const registrationCard = document.getElementById("registration-card");
    const successCard = document.getElementById("success-card");
    const webinarForm = document.getElementById("webinar-form");
    const btnReset = document.getElementById("btn-reset-form");
    
    // Perfil de Usuario en Éxito
    const userAvatar = document.getElementById("user-avatar");
    const userDisplayName = document.getElementById("user-display-name");
    const userDisplayEmail = document.getElementById("user-display-email");
    const registrationMethodBadge = document.getElementById("registration-method-badge");

    // Banner de Cookies
    const cookieBanner = document.getElementById("cookie-banner");
    const cookieAccept = document.getElementById("cookie-accept");
    const cookieReject = document.getElementById("cookie-reject");

    // ==========================================
    // 1. BANNER DE COOKIES & CUMPLIMIENTO LEGAL
    // ==========================================
    
    const checkCookieConsent = () => {
        const consent = localStorage.getItem("cookieConsent");
        if (!consent) {
            // Mostrar banner si no hay registro previo
            cookieBanner.classList.remove("hidden");
        } else if (consent === "accepted") {
            // Si ya fue aceptado, ejecutar carga de scripts
            loadAnalyticsScripts();
        }
    };

    const loadAnalyticsScripts = () => {
        console.log("[Legal & Compliance] Cargando scripts analíticos y píxeles de seguimiento...");
        
        // Simulación de inyección de Google Analytics
        const gaScript = document.createElement("script");
        gaScript.text = "console.log('Google Analytics inicializado de forma segura.');";
        document.head.appendChild(gaScript);

        // Simulación de inyección de Meta Pixel
        const fbScript = document.createElement("script");
        fbScript.text = "console.log('Meta Pixel inicializado de forma segura.');";
        document.head.appendChild(fbScript);
    };

    cookieAccept.addEventListener("click", () => {
        localStorage.setItem("cookieConsent", "accepted");
        cookieBanner.classList.add("hidden");
        loadAnalyticsScripts();
    });

    cookieReject.addEventListener("click", () => {
        localStorage.setItem("cookieConsent", "denied");
        cookieBanner.classList.add("hidden");
        console.log("[Legal & Compliance] El usuario rechazó las cookies. Scripts de terceros bloqueados.");
    });

    // Validar estado de cookies inicial
    checkCookieConsent();


    // ==========================================
    // 2. PERSISTENCIA EN SUPABASE (REST API)
    // ==========================================

    const saveToSupabase = async (data) => {
        // Validación de configuración por defecto
        if (SUPABASE_CONFIG.url.includes("YOUR_SUPABASE_PROJECT_ID") || !SUPABASE_CONFIG.anonKey || SUPABASE_CONFIG.anonKey === "YOUR_SUPABASE_ANON_KEY") {
            console.warn("[Supabase Warning] Credenciales no configuradas. Simulando persistencia local exitosa.");
            // Retornamos una promesa resuelta para simular éxito en entorno local sin credenciales
            return new Promise((resolve) => setTimeout(resolve, 800));
        }

        try {
            const response = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/registrados`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "apikey": SUPABASE_CONFIG.anonKey,
                    "Authorization": `Bearer ${SUPABASE_CONFIG.anonKey}`,
                    "Prefer": "return=minimal"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`Error en servidor Supabase: ${response.statusText}`);
            }

            console.log("[Supabase] Datos del participante guardados exitosamente.");
            return true;
        } catch (error) {
            console.error("[Supabase Error] Error de comunicación con la base de datos:", error);
            throw error;
        }
    };


    // ==========================================
    // 3. VALIDACIÓN DEL FORMULARIO TRADICIONAL
    // ==========================================

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePhone = (phone) => {
        // Validación básica de número telefónico (mínimo 10 dígitos)
        const re = /^[0-9]{10,15}$/;
        return re.test(phone);
    };

    const sanitizeHTML = (str) => {
        // Sanitización básica para prevenir ataques XSS
        return str.replace(/[&<>"']/g, (m) => {
            switch (m) {
                case '&': return '&amp;';
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '"': return '&quot;';
                case "'": return '&#039;';
                default: return m;
            }
        });
    };

    const clearErrors = () => {
        document.querySelectorAll(".input-group").forEach(group => {
            group.classList.remove("invalid");
        });
        document.getElementById("consent-error").style.display = "none";
    };

    webinarForm.addEventListener("submit", (e) => {
        e.preventDefault();
        clearErrors();

        const nameInput = document.getElementById("reg-name");
        const emailInput = document.getElementById("reg-email");
        const phoneInput = document.getElementById("reg-phone");
        const consentCheckbox = document.getElementById("legal-consent");

        let isValid = true;

        // Validar Nombre
        if (!nameInput.value.trim()) {
            nameInput.parentElement.classList.add("invalid");
            isValid = false;
        }

        // Validar Email
        if (!validateEmail(emailInput.value.trim())) {
            emailInput.parentElement.classList.add("invalid");
            isValid = false;
        }

        // Validar Teléfono
        if (!validatePhone(phoneInput.value.trim())) {
            phoneInput.parentElement.classList.add("invalid");
            isValid = false;
        }

        // Validar Checkbox de Ley 1581
        if (!consentCheckbox.checked) {
            document.getElementById("consent-error").style.display = "block";
            isValid = false;
        }

        if (isValid) {
            // Deshabilitar botón para simular carga
            const submitBtn = document.getElementById("btn-submit-registration");
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = "Procesando registro...";

            const registrationData = {
                nombre: nameInput.value.trim(),
                email: emailInput.value.trim(),
                celular: phoneInput.value.trim(),
                metodo_registro: "traditional"
            };

            // Intentar persistir en Supabase
            saveToSupabase(registrationData)
                .then(() => {
                    // Sanitizar y mapear valores del usuario a la UI de éxito
                    const sanitizedName = sanitizeHTML(registrationData.nombre);
                    const sanitizedEmail = sanitizeHTML(registrationData.email);

                    userDisplayName.textContent = sanitizedName;
                    userDisplayEmail.textContent = sanitizedEmail;
                    userAvatar.src = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"; // Avatar por defecto
                    registrationMethodBadge.textContent = "Registro Tradicional";
                    registrationMethodBadge.style.backgroundColor = "rgba(6, 182, 212, 0.15)";
                    registrationMethodBadge.style.color = "var(--color-secondary)";
                    registrationMethodBadge.style.borderColor = "rgba(6, 182, 212, 0.3)";

                    // Intercambio de tarjetas
                    registrationCard.classList.add("hidden");
                    successCard.classList.remove("hidden");
                    webinarForm.reset();
                })
                .catch(() => {
                    alert("Hubo un error de conexión al procesar el registro en la base de datos. Por favor, intenta de nuevo.");
                })
                .finally(() => {
                    // Restablecer botón
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                });
        }
    });

    // ==========================================
    // 4. INTEGRACIÓN CON GOOGLE SIGN-IN API
    // ==========================================

    window.handleCredentialResponse = (response) => {
        console.log("[Google OAuth] Credencial recibida exitosamente de Google.");
        
        try {
            // Decodificar el Payload del JWT de forma segura (Base64 URL Decoder en Cliente)
            const credentialToken = response.credential;
            const base64Url = credentialToken.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(window.atob(base64).split('').map((c) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            const profile = JSON.parse(jsonPayload);

            // Sanitizar datos del perfil de Google
            const userName = sanitizeHTML(profile.name);
            const userEmail = sanitizeHTML(profile.email);
            const userPicUrl = profile.picture;

            // Datos para la persistencia en Supabase
            const registrationData = {
                nombre: profile.name,
                email: profile.email,
                celular: null, // No provisto por Google Sign-In básico
                metodo_registro: "google"
            };

            // Actualizar estado visual
            const oauthNotice = document.querySelector(".google-legal-notice");
            const originalNoticeText = oauthNotice.innerHTML;
            oauthNotice.innerHTML = "<strong>Guardando registro en base de datos...</strong>";

            // Guardar en Supabase
            saveToSupabase(registrationData)
                .then(() => {
                    // Renderizar los datos en el contenedor de perfil exitoso
                    userDisplayName.textContent = userName;
                    userDisplayEmail.textContent = userEmail;
                    userAvatar.src = userPicUrl || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
                    
                    registrationMethodBadge.textContent = "Cuenta de Google";
                    registrationMethodBadge.style.backgroundColor = "rgba(99, 102, 241, 0.15)";
                    registrationMethodBadge.style.color = "var(--color-primary)";
                    registrationMethodBadge.style.borderColor = "rgba(99, 102, 241, 0.3)";

                    // Intercambiar tarjetas en la interfaz
                    registrationCard.classList.add("hidden");
                    successCard.classList.remove("hidden");
                })
                .catch(() => {
                    alert("Error de conexión al persistir el registro de Google en Supabase.");
                })
                .finally(() => {
                    oauthNotice.innerHTML = originalNoticeText;
                });

        } catch (error) {
            console.error("[Google OAuth] Error al decodificar la credencial de Google:", error);
            alert("Ocurrió un error al procesar el registro con tu cuenta de Google.");
        }
    };

    const initializeGoogleSignIn = () => {
        // Verificar si la biblioteca de Google se ha cargado en el navegador
        if (typeof google !== "undefined" && google.accounts && google.accounts.id) {
            console.log("[Google OAuth] Inicializando Google Identity Services...");
            
            // Inicializar el SDK de Google con un Client ID de pruebas para localhost
            google.accounts.id.initialize({
                client_id: "1008671549463-mockclientid.apps.googleusercontent.com", // Client ID de demostración
                callback: window.handleCredentialResponse
            });

            // Renderizar el botón oficial con un estilo oscuro acorde a la interfaz
            google.accounts.id.renderButton(
                document.getElementById("google-login-button"),
                { 
                    theme: "filled_black", 
                    size: "large",
                    text: "signup_with",
                    shape: "pill",
                    width: "300"
                }
            );
        } else {
            // Intentar re-inicializar en 500ms si el script asíncrono no ha terminado de cargar
            setTimeout(initializeGoogleSignIn, 500);
        }
    };

    // Inicializar Google Sign-In
    initializeGoogleSignIn();

    // ==========================================
    // 5. RESETEAR FORMULARIO (OTRO REGISTRO)
    // ==========================================
    
    btnReset.addEventListener("click", () => {
        successCard.classList.add("hidden");
        registrationCard.classList.remove("hidden");
        clearErrors();
    });
});
