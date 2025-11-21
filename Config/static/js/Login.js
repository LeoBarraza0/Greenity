// Login animado y moderno para Greenity
// Este archivo gestiona la UI de login/registro: cambio de pestañas,
// toggles de contraseña, validación en cliente, envío de formularios
// (con token CSRF), animaciones y notificaciones.
// IMPORTANTE: Sólo se añaden comentarios; no se modifica la lógica.
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const tabButtons = document.querySelectorAll('.tab-btn');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginFormElement = document.getElementById('loginForm');
    const registerFormElement = document.getElementById('registerForm');
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    // Variables de estado
    let currentTab = 'login';
    let isSubmitting = false;

    // Inicialización: agrupa la configuración de eventos y comportamiento.
    // Mantener init() como punto de entrada facilita pruebas y lectura.
    init();

    function init() {
        setupTabSwitching();
        setupPasswordToggles();
        setupFormValidation();
        setupFormSubmissions();
        setupAnimations();
        showCSRFToken();
    }

    // Muestra en consola los tokens CSRF presentes en los formularios.
    // Útil para depuración: confirma que los tokens se han renderizado
    // desde el servidor y que estarán disponibles para enviar con la petición.
    function showCSRFToken() {
        const loginToken = document.getElementById('login-csrf-token');
        const registerToken = document.getElementById('register-csrf-token');
        
        if (loginToken) {
            console.log('🔐 Token CSRF (Login):', loginToken.value);
        }
        if (registerToken) {
            console.log('🔐 Token CSRF (Register):', registerToken.value);
        }
    }

    // Configura el cambio de pestañas (login/register).
    // Detecta clicks en los botones de tab y llama a switchTab si cambia
    // la pestaña activa.
    function setupTabSwitching() {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                if (targetTab !== currentTab) {
                    switchTab(targetTab);
                }
            });
        });
    }

    // Cambia visualmente entre el formulario de login y registro.
    // - Quita/añade clases, aplica transiciones y actualiza el estado actualTab.
    // - Las animaciones están controladas por estilos inline para un efecto
    //   fluido sin depender de clases CSS adicionales.
    function switchTab(tabName) {
        // Remover clase active de todos los tabs
        tabButtons.forEach(btn => btn.classList.remove('active'));
        
        // Agregar clase active al tab seleccionado
        const activeButton = document.querySelector(`[data-tab="${tabName}"]`);
        activeButton.classList.add('active');
        
        // Determinar qué formulario ocultar y cuál mostrar
        const currentForm = tabName === 'login' ? registerForm : loginForm;
        const newForm = tabName === 'login' ? loginForm : registerForm;
        
        // Aplicar animación de salida al formulario actual
        currentForm.style.opacity = '0';
        currentForm.style.transform = 'translateX(30px)';
        
        setTimeout(() => {
            // Tras la animación de salida, ocultar/mostrar formularios
            currentForm.classList.add('hidden');
            newForm.classList.remove('hidden');
            newForm.style.opacity = '0';
            newForm.style.transform = 'translateX(30px)';
            
            // Forzar el frame para iniciar la animación de entrada
            requestAnimationFrame(() => {
                newForm.style.transition = 'all 0.5s ease-out';
                newForm.style.opacity = '1';
                newForm.style.transform = 'translateX(0)';
            });
        }, 250);
        
        currentTab = tabName;
    }

    // Prepara los toggles para mostrar/ocultar contraseñas.
    // Por convención el id del toggle sigue el patrón 'toggle-{inputId}'.
    // Al activar el toggle se cambia el type del input y el icono.
    function setupPasswordToggles() {
        togglePasswordButtons.forEach(button => {
            button.addEventListener('click', function() {
                const inputId = this.id.replace('toggle-', '');
                const input = document.getElementById(inputId);
                const icon = this;
                
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                } else {
                    input.type = 'password';
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                }
                
                // Pequeña animación en el icono como feedback visual.
                icon.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    icon.style.transform = 'scale(1)';
                }, 150);
            });
        });
    }

    // Enlaza validaciones en tiempo real sobre inputs requeridos.
    // - 'blur' dispara validación, 'input' limpia mensajes previos.
    function setupFormValidation() {
        const inputs = document.querySelectorAll('input[required]');
        
        inputs.forEach(input => {
            // Validación en tiempo real
            input.addEventListener('blur', function() {
                validateInput(this);
            });
            
            input.addEventListener('input', function() {
                clearValidation(this);
            });
        });
    }

    // Valida un input individual aplicando reglas por tipo.
    // Retorna true si el campo es válido. Añade clases 'error'/'success'
    // y muestra un tooltip de validación cuando procede.
    function validateInput(input) {
        const wrapper = input.closest('.input-wrapper');
        const value = input.value.trim();
        let isValid = true;
        let message = '';

        // Limpiar clases anteriores
        wrapper.classList.remove('error', 'success');
        
        // Validaciones específicas según el tipo de input
        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
            message = 'Por favor ingresa un email válido';
        } else if (input.type === 'password') {
            // Si es campo de confirmación, comparar con la contraseña original.
            if (input.id.includes('confirm')) {
                const password = document.getElementById(input.id.replace('confirm-', ''));
                isValid = value === password.value;
                message = 'Las contraseñas no coinciden';
            } else {
                // Requerir longitud mínima para contraseñas.
                isValid = value.length >= 6;
                message = 'La contraseña debe tener al menos 6 caracteres';
            }
        } else if (input.type === 'text') {
            // Nombre mínimo de 2 caracteres.
            isValid = value.length >= 2;
            message = 'El nombre debe tener al menos 2 caracteres';
        }

        // Mostrar estados visuales sólo cuando el usuario ha escrito algo.
        if (!isValid && value !== '') {
            wrapper.classList.add('error');
            showTooltip(input, message);
        } else if (isValid && value !== '') {
            wrapper.classList.add('success');
        }
        
        return isValid;
    }

    // Limpiar estado de validación y tooltip asociado a un input.
    function clearValidation(input) {
        const wrapper = input.closest('.input-wrapper');
        wrapper.classList.remove('error', 'success');
        hideTooltip(input);
    }

    // Crea y muestra un tooltip de validación (mensaje) junto al input.
    // - Se asegura de eliminar cualquier tooltip previo para evitar duplicados.
    // - El tooltip se añade al wrapper para posicionamiento relativo.
    function showTooltip(input, message) {
        hideTooltip(input); // Remover tooltip existente
        
        const tooltip = document.createElement('div');
        tooltip.className = 'validation-tooltip';
        tooltip.textContent = message;
        tooltip.style.cssText = `
            position: absolute;
            top: -35px;
            left: 0;
            background: #e74c3c;
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 0.8rem;
            white-space: nowrap;
            z-index: 1000;
            animation: fadeInDown 0.3s ease-out;
        `;
        
        const wrapper = input.closest('.input-wrapper');
        wrapper.style.position = 'relative';
        wrapper.appendChild(tooltip);
    }

    // Elimina el tooltip de validación asociado a un input si existe.
    function hideTooltip(input) {
        const tooltip = input.closest('.input-wrapper').querySelector('.validation-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }

    // Enlaza el evento submit de los formularios de login y registro.
    // - Previene el envío por defecto y delega a handleFormSubmission.
    function setupFormSubmissions() {
        loginFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'login');
        });

        registerFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'register');
        });
    }

    // Maneja la lógica de envío de formularios:
    // - Evita envíos concurrentes con isSubmitting
    // - Valida todos los campos requeridos
    // - Realiza comprobaciones adicionales para registro (coincidencia de contraseñas)
    // - Llama a submitForm que realiza la petición HTTP real
    function handleFormSubmission(form, type) {
        if (isSubmitting) return;
        
        const inputs = form.querySelectorAll('input[required]');
        let allValid = true;
        
        // Validar todos los campos
        inputs.forEach(input => {
            if (!validateInput(input)) {
                allValid = false;
            }
        });
        
        if (!allValid) {
            showNotification('Por favor corrige los errores antes de continuar', 'error');
            return;
        }
        
        // Validación adicional para registro: revisión explícita de confirmación
        if (type === 'register') {
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            
            if (password !== confirmPassword) {
                showNotification('Las contraseñas no coinciden', 'error');
                return;
            }
        }
        
        // Si todo es correcto, proceder al envío (función que hace fetch).
        submitForm(form, type);
    }

    // Envía el formulario al servidor usando fetch.
    // - Marca isSubmitting para evitar envíos duplicados
    // - Añade cabecera con token CSRF extraída del FormData
    // - Maneja la respuesta JSON: éxito (reset, redirección opcional) o error
    // - Realiza limpieza del estado del botón y tratamiento de errores de red
    function submitForm(form, type) {
        isSubmitting = true;
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Estado de carga: feedback visual mientras dura la petición.
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = '<i class="fas fa-spinner"></i> Procesando...';
        
        // Obtener datos del formulario
        const formData = new FormData(form);
        const token = formData.get('csrf_token');
        
        // Determinar la URL del endpoint (login vs register)
        const endpoint = type === 'login' ? '/login' : '/register';
        
        // Realizar petición con protección CSRF
        console.log('Enviando petición a:', endpoint);
        console.log('Token CSRF:', token);
        console.log('Datos del formulario:', Object.fromEntries(formData));
        
        fetch(endpoint, {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRF-Token': token
            }
        })
        .then(response => response.json())
        .then(data => {
            // Restaurar estado del botón y marca isSubmitting=false
            isSubmitting = false;
            submitBtn.classList.remove('loading');
            submitBtn.innerHTML = originalText;
            
            if (data.status === 200) {
                // En caso de éxito: notificar, resetear formulario y opcionalmente redirigir
                showNotification(data.message, 'success');
                
                form.reset();
                clearAllValidations();
                
                if (data.url) {
                    setTimeout(() => {
                        window.location.href = data.url;
                    }, 1500);
                }
            } else {
                // Mostrar mensaje de error provisto por el servidor
                showNotification(data.message, 'error');
            }
        })
        .catch(error => {
            // En caso de fallo de red o excepción: restaurar estados y avisar
            isSubmitting = false;
            submitBtn.classList.remove('loading');
            submitBtn.innerHTML = originalText;
            
            console.error('Error:', error);
            showNotification('Error de conexión. Inténtalo de nuevo.', 'error');
        });
    }

    // Limpia todos los estados de validación presentes (clases y tooltips).
    function clearAllValidations() {
        const wrappers = document.querySelectorAll('.input-wrapper');
        wrappers.forEach(wrapper => {
            wrapper.classList.remove('error', 'success');
            const tooltip = wrapper.querySelector('.validation-tooltip');
            if (tooltip) tooltip.remove();
        });
    }

    // Muestra una notificación temporal en pantalla.
    // - 'type' controla color e ícono (success/error/info).
    // - La notificación se elimina automáticamente tras unos segundos.
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#20bf6b' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 10000;
            animation: slideInRight 0.5s ease-out;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remover después de 4 segundos (animación de salida incluida).
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease-out';
            setTimeout(() => notification.remove(), 500);
        }, 4000);
    }

    // Prepara animaciones y micro-interacciones adicionales.
    // - Focus en inputs para dar feedback visual
    // - Hover en botones (respetando estado 'loading')
    function setupAnimations() {
        // Animación de entrada para inputs
        const inputs = document.querySelectorAll('input');
        inputs.forEach((input, index) => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
        });
        
        // Efecto de hover en botones
        const buttons = document.querySelectorAll('button, .submit-btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', function() {
                if (!this.classList.contains('loading')) {
                    this.style.transform = 'translateY(0)';
                }
            });
        });
    }

    // Agregar estilos CSS para animaciones adicionales.
    // Estos estilos se inyectan dinámicamente para no depender de
    // archivos CSS externos y asegurar que las keyframes estén disponibles.
    const additionalStyles = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes fadeInDown {
            from { transform: translateY(-10px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .input-wrapper {
            transition: transform 0.3s ease;
        }
        
        .notification {
            font-family: 'Inter', sans-serif;
            font-weight: 500;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);
});

// Enlaza la acción del enlace "¿Olvidaste tu contraseña?".
// Actualmente muestra un placeholder; aquí se podría abrir un modal
// o iniciar el flujo de recuperación de contraseña en el servidor.
document.addEventListener('DOMContentLoaded', function() {
    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Funcionalidad de recuperación de contraseña próximamente disponible');
        });
    }
});
