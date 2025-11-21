// JavaScript para funcionalidad interactiva de la página

// Todos los listeners y la inicialización se realizan cuando el DOM
// está listo para evitar referencias a elementos inexistentes.
document.addEventListener('DOMContentLoaded', function() {
    // ------------------------------
    // BÚSQUEDA
    // ------------------------------
    // Se enlazan el botón y el campo de búsqueda. Al pulsar el botón
    // o al presionar Enter en el input se toma el texto y se muestra
    // un mensaje (placeholder hasta implementar la búsqueda real).
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-bar input');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                // Aquí se debería invocar la búsqueda real (API/filtrado).
                alert(`Buscando: "${searchTerm}" - Esta funcionalidad se implementará próximamente`);
            } else {
                // Mensaje de validación simple si el campo está vacío.
                alert('Por favor, ingresa una dirección o código postal');
            }
        });
        
        // Permitir activar la búsqueda con Enter.
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
    
    // ------------------------------
    // GEOLOCALIZACIÓN (ubicación actual)
    // ------------------------------
    // Si el navegador soporta geolocalización, se solicita la posición
    // del usuario y se maneja la respuesta o el error con callbacks.
    const locationBtn = document.querySelector('.location-btn');
    if (locationBtn) {
        locationBtn.addEventListener('click', function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        // position contiene lat/lng; aquí sólo se muestra
                        // un mensaje de ejemplo indicando éxito.
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;
                        alert(`Ubicación obtenida: ${lat.toFixed(4)}, ${lng.toFixed(4)} - Buscando puntos de reciclaje cercanos...`);
                    },
                    function(error) {
                        // Error en la obtención de la ubicación: pedir input manual.
                        alert('No se pudo obtener tu ubicación. Por favor, ingresa tu dirección manualmente.');
                    }
                );
            } else {
                // Navegador no soporta geolocalización
                alert('Tu navegador no soporta geolocalización. Por favor, ingresa tu dirección manualmente.');
            }
        });
    }
    
    // ------------------------------
    // INICIO DE SESIÓN
    // ------------------------------
    // Botón que aplica una micro-animación y redirige a la página de login.
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            // Efecto visual para dar feedback inmediato al usuario.
            this.style.transform = 'translateY(-1px) scale(1.02)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Redirección a la página de login (ruta relativa del proyecto).
            window.location.href = '/pages/Login.html';
        });
    }
    
    // ------------------------------
    // NAVEGACIÓN (barra/menu)
    // ------------------------------
    // Se interceptan clicks en items del nav para manejar el estado
    // 'active' y para ejecutar acciones específicas (scroll o redirección).
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Sólo interceptamos navegación cuando no hay un href válido
            // (por ejemplo enlaces internos o elementos que actúan como botones).
            if (!this.href || this.href.includes('#')) {
                e.preventDefault();
                
                // Limpiar estado activo y marcar el elemento actual.
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
                
                // Actuar según el texto del item (rutas y placeholders).
                const text = this.textContent.trim();
                switch(text) {
                    case 'Inicio':
                        // Scroll suave hacia el inicio de la página.
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        break;
                    case 'Mapa':
                        // Navegar a la página del mapa.
                        window.location.href = '/pages/Mapa.html';
                        break;
                    case 'Educativo':
                        // Placeholder: mostrar mensaje hasta implementar.
                        alert('Sección Educativo - Próximamente disponible');
                        break;
                    case 'Sugerir Punto':
                        alert('Sección Sugerir Punto - Próximamente disponible');
                        break;
                    case 'Contacto':
                        alert('Sección Contacto - Próximamente disponible');
                        break;
                    case 'Configuración':
                        alert('Sección Configuración - Próximamente disponible');
                        break;
                }
            }
            // Si el elemento tiene un href válido, se permite la navegación normal.
        });
    });
    
    // ------------------------------
    // BOTONES CTA (call-to-action)
    // ------------------------------
    // Detectar CTAs y ejecutar la acción adecuada según el texto.
    const ctaButtons = document.querySelectorAll('.cta-btn');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const text = this.textContent.trim();
            if (text.includes('Explorar Mapa')) {
                // Redirigir al mapa si el CTA así lo indica.
                window.location.href = '/pages/Mapa.html';
            } else if (text.includes('Aprender Más')) {
                // Placeholder educativo.

            }
        });
    });
    
    // ------------------------------
    // ENLACE: Ver mapa completo
    // ------------------------------
    // Enlace que lleva al usuario a la vista del mapa completa.
    const mapLink = document.querySelector('.map-link');
    if (mapLink) {
        mapLink.addEventListener('click', function(e) {
            // Redirección directa al mapa.
            window.location.href = '/pages/Mapa.html';
        });
    }
    
    // ------------------------------
    // TARJETAS DE CARACTERÍSTICAS Y ESTADÍSTICAS
    // ------------------------------
    // Añadir listeners para mostrar información contextual (placeholders).
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.feature-title').textContent;
            alert(`Característica: ${title} - Próximamente disponible`);
        });
    });
    
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('click', function() {
            const number = this.querySelector('.stat-number').textContent;
            const label = this.querySelector('.stat-label').textContent;
            alert(`Estadística: ${number} ${label} - Información detallada próximamente`);
        });
    });
    
    // ------------------------------
    // SCROLL SUAVE PARA ENLACES INTERNOS
    // ------------------------------
    // Se interceptan enlaces con hash y se realiza scroll suave al target.
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ------------------------------
    // ANIMACIONES DE ENTRADA (IntersectionObserver)
    // ------------------------------
    // Se usa un observer para disparar animaciones cuando elementos
    // entran en el viewport, mejorando performance vs animar todo desde el inicio.
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Aplicar el observer a tarjetas relevantes y preparar estado inicial.
    const animatedElements = document.querySelectorAll('.stat-card, .feature-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ------------------------------
    // EFECTOS DE HOVER EN BOTONES
    // ------------------------------
    // Añadimos micro-interacciones para dar feedback cuando el cursor
    // entra/sale de botones y elementos clickeables.
    const buttons = document.querySelectorAll('button, .nav-item, .cta-btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Mensaje de diagnóstico en consola para confirmar carga correcta.
    console.log('Grennity - Página de reciclaje cargada correctamente');
});
