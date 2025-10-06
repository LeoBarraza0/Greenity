// JavaScript para la página de configuración

document.addEventListener('DOMContentLoaded', function() {
    // Punto de entrada: todo lo que requiere elementos del DOM debe ir aquí
    console.log('Página Configuración cargada');
    /*
      1) Botón de Iniciar Sesión
         - Busca el botón con la clase .login-btn y le añade un efecto visual al hacer click.
         - Finalmente redirige a la página de login.
    */
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            // Efecto visual breve para dar feedback
            this.style.transform = 'translateY(-1px) scale(1.02)';
            setTimeout(() => { this.style.transform = ''; }, 150);

            // Redirección
            window.location.href = '/pages/Login.html';
        });
    }

    /*
      2) Navegación interna (barra lateral o menú)
         - Intercepta clicks en elementos .nav-item que no tengan un href externo.
         - Gestiona la clase "active" visualmente y en algunos casos
           redirige a otras páginas o muestra notificaciones.
    */
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Si es un enlace vacío o ancla, manejamos la navegación por JS
            if (!this.href || this.href.includes('#')) {
                e.preventDefault();

                // Remover active en todos y añadir en el que se clickeó
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');

                // Dependiendo del texto del enlace ejecutamos una acción
                const text = this.textContent.trim();
                switch(text) {
                    case 'Inicio':
                        window.location.href = '/index.html';
                        break;
                    case 'Mapa':
                        window.location.href = '/pages/Mapa.html';
                        break;
                    case 'Educativo':
                        showNotification('Sección Educativo - Próximamente disponible', 'info');
                        break;
                    case 'Sugerir Punto':
                        showNotification('Sección Sugerir Punto - Próximamente disponible', 'info');
                        break;
                    case 'Contacto':
                        showNotification('Sección Contacto - Próximamente disponible', 'info');
                        break;
                    case 'Configuración':
                        // Ya estamos en esta página, no hacemos nada
                        break;
                }
            }
            // Si el enlace tenía un href válido, se permite la navegación por defecto
        });
    });

    /*
      3) Slider de radio de búsqueda
         - Actualiza el texto que muestra el valor seleccionado y aplica
           una pequeña animación para llamar la atención.
    */
    const searchRadiusSlider = document.getElementById('search-radius');
    const sliderValue = document.querySelector('.slider-value');
    if (searchRadiusSlider && sliderValue) {
        searchRadiusSlider.addEventListener('input', function() {
            const value = this.value;
            sliderValue.textContent = value + ' km';

            // Animación de feedback cuando cambia el valor
            sliderValue.style.transform = 'scale(1.1)';
            sliderValue.style.color = '#22c55e';
            setTimeout(() => { sliderValue.style.transform = 'scale(1)'; }, 200);
        });
    }

    /*
      4) Toggle switches (checkboxes estilizados)
         - Detecta cambios, aplica una animación visual y muestra una notificación
           indicando si la opción fue activada o desactivada.
    */
    const toggleSwitches = document.querySelectorAll('.toggle-switch input[type="checkbox"]');
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const toggleItem = this.closest('.toggle-item');
            if (toggleItem) {
                // Feedback visual: escala y cambio de fondo según estado
                toggleItem.style.transform = 'scale(1.02)';
                toggleItem.style.backgroundColor = this.checked ? '#f0fdf4' : '#f8fafc';
                setTimeout(() => { toggleItem.style.transform = 'scale(1)'; }, 200);
            }

            // Mostrar notificación con etiqueta y estado
            const label = toggleItem ? toggleItem.querySelector('span').textContent : 'Configuración';
            const status = this.checked ? 'activada' : 'desactivada';
            showNotification(`${label} ${status}`, 'success');
        });
    });

    /*
      5) Selects personalizados
         - Cuando cambia el valor de un select, se aplica un estilo de confirmación
           y se muestra una notificación.
    */
    const customSelects = document.querySelectorAll('.custom-select');
    customSelects.forEach(select => {
        select.addEventListener('change', function() {
            if (this.value) {
                this.style.borderColor = '#22c55e';
                this.style.backgroundColor = '#f0fdf4';
                this.style.transform = 'scale(1.02)';
                setTimeout(() => { this.style.transform = 'scale(1)'; }, 200);

                const label = this.previousElementSibling ? this.previousElementSibling.textContent : 'Configuración';
                showNotification(`${label} actualizada`, 'success');
            }
        });
    });

    /*
      6) Botón "Guardar cambios"
         - Simula el guardado mostrando una animación en el botón y
           una notificación de éxito después de un retraso.
    */
    const saveBtn = document.querySelector('.save-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            // Animación de "loading" en el botón
            this.style.transform = 'scale(0.95)';
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Guardando...';

            setTimeout(() => {
                // Simular guardado completado
                this.style.transform = 'scale(1)';
                this.innerHTML = '<i class="fas fa-check"></i> ¡Guardado!';
                this.style.background = 'linear-gradient(135deg, #16a34a, #15803d)';

                showNotification('Configuración guardada exitosamente', 'success');

                // Resetear el botón a su estado original
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-save"></i> Guardar cambios';
                    this.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
                }, 2000);
            }, 1500);
        });
    }

    /*
      7) Botones de seguridad (Eliminar cuenta, Exportar datos, Cambiar contraseña)
         - Muestran confirmaciones o notificaciones según la acción.
    */
    const securityBtns = document.querySelectorAll('.security-btn');
    securityBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent.trim();

            if (action.includes('Eliminar cuenta')) {
                if (confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
                    showNotification('Funcionalidad de eliminación de cuenta próximamente disponible', 'warning');
                }
            } else if (action.includes('Exportar datos')) {
                showNotification('Exportando datos... - Funcionalidad próximamente disponible', 'info');
            } else if (action.includes('Cambiar contraseña')) {
                showNotification('Funcionalidad de cambio de contraseña próximamente disponible', 'info');
            }
        });
    });

    /*
      8) Botón Editar Perfil
         - Muestra una notificación (simulado).
    */
    const editProfileBtn = document.querySelector('.edit-profile-btn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            showNotification('Funcionalidad de edición de perfil próximamente disponible', 'info');
        });
    }

    /*
      9) Enlaces de privacidad
         - Previenen la navegación y muestran un mensaje informativo.
    */
    const privacyLinks = document.querySelectorAll('.privacy-link');
    privacyLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.textContent.trim();
            showNotification(`${linkText} - Próximamente disponible`, 'info');
        });
    });

    /*
      10) Animaciones de entrada para secciones usando IntersectionObserver
          - Observa las secciones con clase .config-section y aplica una animación
            cuando entran en el viewport.
    */
    const sections = document.querySelectorAll('.config-section');
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Asigna una animación CSS definida en estilos (slideInUp)
                entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    sections.forEach(section => observer.observe(section));

    /*
      11) Efectos hover mejorados para ciertos elementos interactivos
          - Aplica sombra y desplazamiento al hacer hover para mejorar la sensación
            de interactividad.
    */
    const interactiveElements = document.querySelectorAll('.toggle-item, .feature-item, .stat-item, .security-btn');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
        });
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });

    // Cargar configuraciones guardadas (en este ejemplo se simula la carga)
    loadSavedSettings();
});

/* --------------------------------------------------------------- */
/* Helpers: notificaciones y carga de settings                          */
/* --------------------------------------------------------------- */

// Muestra notificaciones temporales en la esquina superior derecha
function showNotification(message, type = 'info') {
    // Crear el contenedor de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
    `;

    // Estilos inline para asegurar comportamiento sin depender de CSS externo
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 600;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;

    // Añadir al body y animar entrada/salida
    document.body.appendChild(notification);
    setTimeout(() => { notification.style.transform = 'translateX(0)'; }, 100);
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => { if (notification.parentNode) notification.parentNode.removeChild(notification); }, 300);
    }, 3000);
}

// Devuelve el icono FontAwesome según tipo de notificación
function getNotificationIcon(type) {
    const icons = { 'success': 'check-circle', 'error': 'exclamation-circle', 'warning': 'exclamation-triangle', 'info': 'info-circle' };
    return icons[type] || 'info-circle';
}

// Devuelve un gradiente apropiado según tipo (se usa como background)
function getNotificationColor(type) {
    const colors = {
        'success': 'linear-gradient(135deg, #22c55e, #16a34a)',
        'error': 'linear-gradient(135deg, #ef4444, #dc2626)',
        'warning': 'linear-gradient(135deg, #f59e0b, #d97706)',
        'info': 'linear-gradient(135deg, #3b82f6, #2563eb)'
    };
    return colors[type] || colors['info'];
}

// Simula la carga de configuraciones guardadas (por ejemplo desde localStorage o API)
function loadSavedSettings() {
    // Aquí se define un objeto con valores por defecto (simulado)
    const savedSettings = {
        defaultLocation: 'Palermo, Buenos Aires',
        searchRadius: 5,
        autoLocation: false,
        rememberFavorites: false,
        pushNotifications: false,
        emailNotifications: false,
        appTheme: '',
        compactView: false,
        showTips: false,
        autoUpdate: false,
        language: '',
        mapStyle: '',
        usageAnalysis: false,
        locationData: false,
        functionalCookies: false
    };

    // Aplicar valores simulados a los elementos del DOM si existen
    const defaultLocationInput = document.getElementById('default-location');
    if (defaultLocationInput) defaultLocationInput.value = savedSettings.defaultLocation;

    const searchRadiusSlider = document.getElementById('search-radius');
    const sliderValue = document.querySelector('.slider-value');
    if (searchRadiusSlider && sliderValue) {
        searchRadiusSlider.value = savedSettings.searchRadius;
        sliderValue.textContent = savedSettings.searchRadius + ' km';
    }

    // Aplicar el estado de toggles por id
    const toggleIds = ['auto-location', 'remember-favorites', 'push-notifications', 'email-notifications', 'compact-view', 'show-tips', 'auto-update', 'usage-analysis', 'location-data', 'functional-cookies'];
    toggleIds.forEach(id => {
        const toggle = document.getElementById(id);
        if (toggle) {
            const settingKey = id.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
            toggle.checked = savedSettings[settingKey] || false;
        }
    });

    // Aplicar selects por id
    const selectIds = ['app-theme', 'language', 'map-style'];
    selectIds.forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            const settingKey = id.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
            select.value = savedSettings[settingKey] || '';
        }
    });
}
