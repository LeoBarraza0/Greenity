// Espera a que el DOM esté listo para enlazar listeners y ejecutar
// inicializadores. Mantener toda la inicialización dentro de
// DOMContentLoaded evita referencias a elementos inexistentes.
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página Contacto cargada');
    
    // Inicializar modularmente cada responsabilidad de la página.
    initNavigation();       // manejo del menú/nav
    initFormValidation();   // validaciones del formulario de contacto
    initFAQ();              // comportamiento del FAQ y búsqueda
    initContactButtons();   // botones rápidos (llamar, email, ubicación)
    initAnimations();       // efectos visuales y observers
    
    // Botón de Iniciar Sesión: efecto visual + navegación.
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            // Pequeña animación para dar feedback táctil al usuario.
            this.style.transform = 'translateY(-1px) scale(1.02)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Redirige a la página de login (ruta relativa usada por el proyecto).
            window.location.href = '/pages/Login.html';
        });
    }
});

// Funcionalidad de navegación
// Inicializa la lógica de la navegación (barra/menu).
// - Añade la clase 'active' al item clickeado.
// - Intercepta enlaces internos (sin href o con '#') para manejar
//   la navegación usando rutas relativas del proyecto.
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Sólo interceptamos cuando el enlace no apunta a otra URL.
            if (!this.href || this.href.includes('#')) {
                e.preventDefault();
                
                // Limpiar estado activo en todos los elementos y marcar el actual.
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
                
                // Según el texto del elemento redirigimos a la vista correspondiente.
                // Este switch usa rutas del proyecto; agregar nuevas opciones según sea necesario.
                const text = this.textContent.trim();
                switch(text) {
                    case 'Inicio':
                        window.location.href = '/index.html';
                        break;
                    case 'Mapa':
                        window.location.href = '/pages/Mapa.html';
                        break;
                    case 'Educativo':
                        window.location.href = '/pages/Educativo.html';
                        break;
                    case 'Sugerir Punto':
                        window.location.href = '/pages/SugerirPunto.html';
                        break;
                    case 'Contacto':
                        // Ya estamos en esta página, no hacemos nada.
                        break;
                    case 'Configuración':
                        // Placeholder: mostrar aviso temporal.
                        alert('Sección Configuración - Próximamente disponible');
                        break;
                }
            }
            // Si el elemento tiene un href externo válido, se permite la navegación.
        });
    });
}

// Validación del formulario
// Inicializa la validación del formulario de contacto.
// Enlaza validación en tiempo real (blur/input) y controla el envío.
function initFormValidation() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea, select');
    
    // Validación por campo en eventos comunes para mejor UX.
    inputs.forEach(input => {
        // Validar cuando el usuario sale del campo (blur).
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        // Limpiar errores mientras el usuario escribe.
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
    
    // Manejo del envío: prevenimos comportamiento por defecto,
    // validamos todos los campos requeridos y mostramos feedback.
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Seleccionar sólo los campos marcados como required.
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Feedback visual: botón en modo 'enviando'.
            const submitBtn = form.querySelector('.submit-btn');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            // Simulación de envío (sustituir por llamada real al backend).
            setTimeout(() => {
                // Estado: envío completado con éxito.
                submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';
                submitBtn.style.background = '#22c55e';
                
                // Mostrar notificación de éxito al usuario.
                showSuccessMessage();
                
                // Restablecer el formulario después de unos segundos.
                setTimeout(() => {
                    form.reset();
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar mensaje';
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    
                    // Limpiar clases y mensajes de validación existentes.
                    const fields = form.querySelectorAll('.form-field');
                    fields.forEach(field => {
                        field.classList.remove('success', 'error');
                        const errorMsg = field.querySelector('.error-message');
                        if (errorMsg) errorMsg.remove();
                    });
                }, 3000);
            }, 2000);
        }
    });
}

// Valida un único campo y muestra/oculta mensajes de error.
// Devuelve true si el campo es válido, false en caso contrario.
function validateField(field) {
    const fieldContainer = field.closest('.form-field');
    const value = field.value.trim();
    
    // Limpiar estados previos para evitar duplicidades.
    fieldContainer.classList.remove('error', 'success');
    
    // Requerido: no debe estar vacío.
    if (field.hasAttribute('required') && !value) {
        showFieldError(fieldContainer, 'Este campo es obligatorio');
        return false;
    }
    
    // Validación sencilla de email usando el atributo type.
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(fieldContainer, 'Ingresa un email válido');
        return false;
    }
    
    // Soporte para pattern HTML: si existe, validar con RegExp.
    if (field.pattern && value && !new RegExp(field.pattern).test(value)) {
        showFieldError(fieldContainer, 'Formato inválido');
        return false;
    }
    
    // Si todas las comprobaciones se pasan, marcar como success.
    fieldContainer.classList.add('success');
    return true;
}

// Muestra un mensaje de error dentro del contenedor del campo.
// Se asegura de eliminar mensajes previos para no duplicar.
function showFieldError(fieldContainer, message) {
    fieldContainer.classList.add('error');
    
    // Eliminar mensaje existente (si lo hay).
    const existingError = fieldContainer.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Crear y anexar el nuevo elemento de error con estilos inline
    // para evitar dependencia de clases adicionales en CSS.
    const errorMessage = document.createElement('span');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    errorMessage.style.cssText = 'color: #ef4444; font-size: 0.85rem; margin-top: 5px; display: block;';
    fieldContainer.appendChild(errorMessage);
}

// Elimina el estado de error y el mensaje asociado para un campo.
function clearFieldError(field) {
    const fieldContainer = field.closest('.form-field');
    fieldContainer.classList.remove('error');
    const errorMessage = fieldContainer.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Funciones de validación
// Comprueba que un string tenga formato de correo básico válido.
// No es infalible (no cubre todos los casos RFC) pero es suficiente para UX.
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Funcionalidad del FAQ
// Inicializa comportamiento del FAQ:
// - Toggle de items al hacer click (cierra otros abiertos)
// - Filtro en tiempo real conforme se escribe en el input de búsqueda
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    const searchInput = document.querySelector('.search-input');
    
    // Toggle: cuando se pulsa una pregunta, se expande y se cierran las demás.
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            // Cerrar otros items abiertos para mantener una vista limpia.
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Alternar el estado del item actual.
            item.classList.toggle('active');
            
            // Pequeña animación de feedback.
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Búsqueda: filtra por texto en pregunta o respuesta.
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question span').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.3s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
}

// Funcionalidad de botones de contacto
// Inicializa los botones de contacto presentes en la página.
// Incluye acciones de método (llamada, email, chat), ubicación y scroll
// directo al formulario.
function initContactButtons() {
    // Botones con métodos de contacto (Llamar, Enviar email, Iniciar chat).
    const methodBtns = document.querySelectorAll('.method-btn');
    methodBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Feedback visual al pulsar.
            this.style.transform = 'translateY(-2px) scale(1.05)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            const method = this.textContent.trim();
            switch(method) {
                case 'Llamar ahora':
                    // Placeholder: aquí se podría integrar WebRTC o esquema tel: en móviles.
                    alert('Funcionalidad de llamada próximamente disponible');
                    break;
                case 'Enviar email':
                    // Abrir cliente de correo con la dirección del contacto.
                    window.location.href = 'mailto:contacto@greenity.com';
                    break;
                case 'Iniciar chat':
                    // Placeholder para integrar chat en vivo o chatbot.
                    alert('Chat en vivo próximamente disponible');
                    break;
            }
        });
    });
    
    // Botón para mostrar ubicación (por ahora muestra alerta).
    const locationBtn = document.querySelector('.location-btn');
    if (locationBtn) {
        locationBtn.addEventListener('click', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // En el futuro: abrir Google Maps o mostrar mapa embebido.
            alert('Funcionalidad de Google Maps próximamente disponible');
        });
    }
    
    // Botón que desplaza la vista hasta la sección del formulario.
    const contactBtn = document.querySelector('.contact-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Scroll suave hacia el formulario para mejorar accesibilidad.
            const form = document.querySelector('.form-section');
            form.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// Animaciones
// Inicializa observadores y animaciones para mejorar la experiencia.
// Usa IntersectionObserver para animaciones cuando los elementos entran
// en el viewport, reduciendo trabajo y mejorando performance.
function initAnimations() {
    // Tarjetas informativas: entrada con opacidad y traslación.
    const infoCards = document.querySelectorAll('.info-card');
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    infoCards.forEach((card, index) => {
        // Estado inicial: invisible y ligeramente desplazado.
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.transitionDelay = `${index * 0.2}s`;
        cardObserver.observe(card);
    });
    
    // Animación para items del FAQ (similar a las tarjetas).
    const faqItems = document.querySelectorAll('.faq-item');
    const faqObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    faqItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        item.style.transitionDelay = `${index * 0.1}s`;
        faqObserver.observe(item);
    });
    
    // Efecto hover básico para botones: elevar ligeramente.
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = '';
            }
        });
    });
    
    // Efecto focus en inputs: subir visualmente el contenedor del input.
    const inputs = document.querySelectorAll('.form-input, .form-textarea, .form-select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
}

function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #22c55e, #16a34a);
        color: white;
        padding: 20px 30px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(34, 197, 94, 0.3);
        z-index: 1000;
        animation: slideInRight 0.5s ease;
    `;
    successDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-check-circle" style="font-size: 1.5rem;"></i>
            <div>
                <div style="font-weight: 600; font-size: 1.1rem;">¡Mensaje enviado!</div>
                <div style="font-size: 0.9rem; opacity: 0.9;">Te responderemos en 24 horas</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 500);
    }, 4000);
}

// Agregar estilos CSS para animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .form-field.success .form-input,
    .form-field.success .form-textarea,
    .form-field.success .form-select {
        border-color: #22c55e;
        background: rgba(34, 197, 94, 0.05);
    }
    
    .form-field.error .form-input,
    .form-field.error .form-textarea,
    .form-field.error .form-select {
        border-color: #ef4444;
        background: rgba(239, 68, 68, 0.05);
    }
`;
document.head.appendChild(style);

console.log('Greenity - Página Contacto cargada correctamente con todas las funcionalidades');