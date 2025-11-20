// JavaScript para funcionalidad de la página educativa

document.addEventListener('DOMContentLoaded', function() {
    console.log('Página Educativa cargada');
    
    
    // Inicializar todas las funcionalidades
    initNavigation();
    initHeroButtons();
    initMaterialTabs();
    initAnimations();
    initScrollEffects();
    initShareButtons();
    initCertificationSystem();
    initStepProgressSystem();
    initLearningSystem();
    // Funcionalidad del botón de Iniciar Sesión
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            // Efecto visual de click
            this.style.transform = 'translateY(-1px) scale(1.02)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Redirigir a la página de login
            window.location.href = '/pages/Login.html';
        });
    }
});
// Sistema de Módulos de Aprendizaje Mejorado

// Datos de los módulos
const modulesData = {
    1: {
        title: "Fundamentos del Reciclaje",
        icon: "book-open",
        lessons: [
            {
                id: 1,
                title: "¿Qué es el reciclaje?",
                type: "video",
                duration: "8 min",
                videoId: "LoWRxBdDJmE",
                content: `
                    <h3>Introducción al Reciclaje</h3>
                    <p>El reciclaje es el proceso de transformar materiales usados en nuevos productos, reduciendo así la necesidad de materias primas y el impacto ambiental.</p>
                `,
                completed: false
            },
            {
                id: 2,
                title: "Impacto Ambiental",
                type: "reading",
                duration: "10 min",
                content: `
                    <h3>El Impacto del Reciclaje en el Medio Ambiente</h3>
                    <div class="reading-content">
                        <h4>🌍 Beneficios Clave del Reciclaje</h4>
                        <div class="benefit-card">
                            <h5>1. Reducción de Residuos</h5>
                            <p>Cada año, millones de toneladas de residuos terminan en vertederos. El reciclaje reduce significativamente esta cantidad:</p>
                            <ul>
                                <li>Una tonelada de papel reciclado salva 17 árboles</li>
                                <li>Reciclar 1 kg de plástico ahorra 1.5 kg de CO2</li>
                                <li>El vidrio puede reciclarse infinitas veces sin perder calidad</li>
                            </ul>
                        </div>
                        <div class="stats-box">
                            <h4>📊 Datos Impactantes</h4>
                            <ul>
                                <li>Reciclar una lata de aluminio ahorra suficiente energía para hacer funcionar una TV durante 3 horas</li>
                                <li>Una botella de plástico tarda 450 años en degradarse</li>
                                <li>El papel reciclado usa 60% menos agua que el papel nuevo</li>
                            </ul>
                        </div>
                    </div>
                `,
                completed: false
            },
            {
                id: 3,
                title: "Las 3 R's",
                type: "video",
                duration: "6 min",
                videoId: "rRCZzrMjiY0",
                content: `<h3>El Principio de las 3 R's</h3><p>Aprende cómo aplicar reducir, reutilizar y reciclar en tu vida diaria.</p>`,
                completed: false
            }
        ]
    },
    2: {
        title: "Clasificación de Materiales",
        icon: "recycle",
        lessons: [
            {
                id: 1,
                title: "Tipos de Plástico",
                type: "video",
                duration: "10 min",
                videoId: "-z_BuzQGB4g",
                content: `<h3>Identificación de Plásticos</h3><p>Aprende a identificar los diferentes tipos de plástico y cuáles son reciclables.</p>`,
                completed: false
            },
            {
                id: 2,
                title: "Guía de Plásticos",
                type: "reading",
                duration: "12 min",
                content: `
                    <h3>Los 7 Tipos de Plástico</h3>
                    <div class="reading-content">
                        <div class="plastic-grid">
                            <div class="plastic-card recyclable">
                                <div class="plastic-number">1</div>
                                <h4>PET</h4>
                                <p><strong>✅ Fácilmente Reciclable</strong></p>
                                <p>Botellas de agua, refrescos, aceite. Se convierte en fibras para ropa y nuevas botellas.</p>
                            </div>
                            <div class="plastic-card recyclable">
                                <div class="plastic-number">2</div>
                                <h4>HDPE</h4>
                                <p><strong>✅ Fácilmente Reciclable</strong></p>
                                <p>Botellas de leche, champú. Se convierte en nuevas botellas y tuberías.</p>
                            </div>
                            <div class="plastic-card difficult">
                                <div class="plastic-number">3</div>
                                <h4>PVC</h4>
                                <p><strong>⚠️ Difícil</strong></p>
                                <p>Tuberías, tarjetas. Contiene cloro, evitar cuando sea posible.</p>
                            </div>
                        </div>
                    </div>
                `,
                completed: false
            }
        ]
    },
    3: {
        title: "Preparación y Limpieza",
        icon: "hands-wash",
        lessons: [
            {
                id: 1,
                title: "Técnicas de Limpieza",
                type: "video",
                duration: "8 min",
                videoId: "aR2017TUQNM",
                content: `<h3>Cómo Limpiar Envases</h3><p>Técnicas profesionales para preparar materiales reciclables.</p>`,
                completed: false
            },
            {
                id: 2,
                title: "Preparación por Material",
                type: "reading",
                duration: "15 min",
                content: `
                    <h3>Guía de Preparación</h3>
                    <div class="reading-content">
                        <h4>🔵 Plásticos</h4>
                        <ol>
                            <li>Vaciar completamente</li>
                            <li>Enjuagar con agua fría</li>
                            <li>Secar al aire</li>
                            <li>Quitar tapas y etiquetas grandes</li>
                            <li>Aplastar para ahorrar espacio</li>
                        </ol>
                        <h4>📄 Papel y Cartón</h4>
                        <ol>
                            <li>Mantener seco</li>
                            <li>Quitar grapas y clips</li>
                            <li>Aplanar cajas</li>
                            <li>No reciclar papel con comida o grasa</li>
                        </ol>
                    </div>
                `,
                completed: false
            }
        ]
    },
    4: {
        title: "Puntos de Reciclaje",
        icon: "map-marked-alt",
        lessons: [
            {
                id: 1,
                title: "Cómo Encontrar Puntos",
                type: "video",
                duration: "6 min",
                videoId: "1Blv0dVPkgE",
                content: `<h3>Localiza Centros de Reciclaje</h3><p>Aprende a usar mapas y apps para encontrar puntos cercanos.</p>`,
                completed: false
            },
            {
                id: 2,
                title: "Qué Llevar y Cómo",
                type: "reading",
                duration: "8 min",
                content: `
                    <h3>Guía para Visitar Puntos de Reciclaje</h3>
                    <div class="reading-content">
                        <h4>Antes de Ir</h4>
                        <ul>
                            <li>✅ Verifica horarios de atención</li>
                            <li>✅ Confirma qué materiales aceptan</li>
                            <li>✅ Prepara tus materiales en bolsas separadas</li>
                            <li>✅ Lleva identificación si es requerida</li>
                        </ul>
                        <h4>En el Centro</h4>
                        <ul>
                            <li>🔹 Sigue las señalizaciones</li>
                            <li>🔹 Deposita en los contenedores correctos</li>
                            <li>🔹 Pregunta al personal si tienes dudas</li>
                            <li>🔹 Respeta las normas del lugar</li>
                        </ul>
                    </div>
                `,
                completed: false
            }
        ]
    }
};

// Estado global del sistema
let currentModule = null;
let currentLesson = 0;
let moduleProgress = {};

// Inicializar sistema de aprendizaje
function initLearningSystem() {
    // Cargar progreso guardado
    loadModuleProgress();
    
    // Inicializar botones de módulos
    const moduleCards = document.querySelectorAll('.module-card');
    moduleCards.forEach(card => {
        const moduleBtn = card.querySelector('.module-start-btn');
        const moduleNum = parseInt(card.getAttribute('data-module'));
        
        if (moduleBtn) {
            moduleBtn.addEventListener('click', () => openModule(moduleNum));
        }
        
        // Actualizar progreso visual
        updateModuleCardProgress(moduleNum);
    });
    // Fallback: asegurar que cualquier botón con la clase .module-start-btn tenga el listener
    const startButtons = document.querySelectorAll('.module-start-btn');
    startButtons.forEach(btn => {
        // Determine module number from closest .module-card
        const card = btn.closest('.module-card');
        if (!card) return;
        const moduleNum = parseInt(card.getAttribute('data-module'));
        // Attach listener if not already attached (defensive)
        btn.addEventListener('click', () => openModule(moduleNum));
    });
    
    // Inicializar controles del modal
    initModuleModal();
    
    // Verificar si debe mostrar popup de certificación
    checkCertificationEligibility();
    // Asegurar que el estado del botón de certificación se actualiza al iniciar
    try {
        updateCertButtonState(getProgressStore());
    } catch (e) {}
}

// Cargar progreso desde localStorage
function loadModuleProgress() {
    const saved = localStorage.getItem('moduleProgress');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            // Merge saved progress with current modulesData so newly added modules are initialized
            moduleProgress = Object.assign({}, parsed);
        } catch (e) {
            console.error('Error parsing saved moduleProgress, reinitializing', e);
            moduleProgress = {};
        }
    } else {
        // Inicializar estructura de progreso
        for (let moduleNum in modulesData) {
            moduleProgress[moduleNum] = {
                lessons: {},
                completed: false,
                percentage: 0
            };
        }
    }

    // Ensure every module in modulesData has an entry in moduleProgress
    for (let moduleNum in modulesData) {
        if (!moduleProgress[moduleNum]) {
            moduleProgress[moduleNum] = {
                lessons: {},
                completed: false,
                percentage: 0
            };
        } else {
            // Ensure structure integrity for existing entries
            moduleProgress[moduleNum].lessons = moduleProgress[moduleNum].lessons || {};
            moduleProgress[moduleNum].completed = !!moduleProgress[moduleNum].completed;
            moduleProgress[moduleNum].percentage = Number(moduleProgress[moduleNum].percentage) || 0;
        }
    }
}

// Guardar progreso
function saveModuleProgress() {
    localStorage.setItem('moduleProgress', JSON.stringify(moduleProgress));
    checkCertificationEligibility();
    // Also update cert button state so UI reflects module completion immediately
    try { updateCertButtonState(getProgressStore()); } catch (e) {}
}

// Abrir modal de módulo
function openModule(moduleNum) {
    currentModule = moduleNum;
    currentLesson = 0;
    
    const modal = document.getElementById('module-modal');
    if (modal) {
        modal.classList.add('show');
        loadModuleContent();
    }
}

// Cargar contenido del módulo
function loadModuleContent() {
    const module = modulesData[currentModule];
    if (!module) return;
    
    // Actualizar título
    const titleEl = document.getElementById('module-modal-title');
    if (titleEl) {
        titleEl.innerHTML = `<i class="fas fa-${module.icon}"></i> Módulo ${currentModule}: ${module.title}`;
    }
    
    // Cargar navegación lateral
    loadModuleNavigation();
    
    // Cargar primera lección
    loadLesson(currentLesson);
    
    // Actualizar badge de progreso
    updateProgressBadge();
}

// Cargar navegación del módulo
function loadModuleNavigation() {
    const navItems = document.getElementById('module-nav-items');
    if (!navItems) return;
    
    const module = modulesData[currentModule];
    navItems.innerHTML = '';
    
    module.lessons.forEach((lesson, index) => {
        const isCompleted = moduleProgress[currentModule]?.lessons[lesson.id] || false;
        const isCurrent = index === currentLesson;
        
        const navItem = document.createElement('div');
        navItem.className = `module-nav-item ${isCurrent ? 'active' : ''} ${isCompleted ? 'completed' : ''}`;
        navItem.innerHTML = `
            <div class="nav-item-icon">
                ${isCompleted ? '<i class="fas fa-check-circle"></i>' : 
                  lesson.type === 'video' ? '<i class="fas fa-play-circle"></i>' :
                  lesson.type === 'reading' ? '<i class="fas fa-book"></i>' :
                  '<i class="fas fa-question-circle"></i>'}
            </div>
            <div class="nav-item-content">
                <div class="nav-item-title">${lesson.title}</div>
                <div class="nav-item-meta">
                    <span>${lesson.type === 'video' ? '📹' : lesson.type === 'reading' ? '📖' : '❓'} ${lesson.duration}</span>
                </div>
            </div>
        `;
        
        navItem.addEventListener('click', () => {
            currentLesson = index;
            loadLesson(currentLesson);
            loadModuleNavigation();
        });
        
        navItems.appendChild(navItem);
    });
}

// Cargar lección específica
function loadLesson(lessonIndex) {
    const module = modulesData[currentModule];
    const lesson = module.lessons[lessonIndex];
    if (!lesson) return;
    
    const contentEl = document.getElementById('lesson-content');
    if (!contentEl) return;
    
    // Limpiar contenido anterior
    contentEl.innerHTML = '';
    
    // Cargar según tipo de lección
    if (lesson.type === 'video') {
        contentEl.innerHTML = `
            <div class="lesson-video">
                <div class="video-header">
                    <h3>${lesson.title}</h3>
                    <span class="video-duration"><i class="fas fa-clock"></i> ${lesson.duration}</span>
                </div>
                <div class="video-container">
                    <iframe 
                        src="https://www.youtube.com/embed/${lesson.videoId}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
                ${lesson.content}
                <div class="lesson-actions">
                    <button class="btn-primary mark-complete-btn">
                        <i class="fas fa-check"></i> Marcar como Completado
                    </button>
                </div>
            </div>
        `;
    } else if (lesson.type === 'reading') {
        contentEl.innerHTML = `
            <div class="lesson-reading">
                <div class="reading-header">
                    <h3>${lesson.title}</h3>
                    <span class="reading-duration"><i class="fas fa-clock"></i> ${lesson.duration}</span>
                </div>
                ${lesson.content}
                <div class="lesson-actions">
                    <button class="btn-primary mark-complete-btn">
                        <i class="fas fa-check"></i> Marcar como Completado
                    </button>
                </div>
            </div>
        `;
    } else if (lesson.type === 'quiz') {
        loadQuiz(lesson);
    }
    
    // Botón marcar como completado
    const completeBtn = contentEl.querySelector('.mark-complete-btn');
    if (completeBtn) {
        const isCompleted = moduleProgress[currentModule]?.lessons[lesson.id];
        if (isCompleted) {
            completeBtn.innerHTML = '<i class="fas fa-check-circle"></i> Completado';
            completeBtn.classList.add('completed');
        }
        
        completeBtn.addEventListener('click', () => {
            markLessonComplete(lesson.id);
        });
    }
    
    // Actualizar botones de navegación
    updateNavigationButtons();
}

// Cargar quiz
function loadQuiz(lesson) {
    const contentEl = document.getElementById('lesson-content');
    let currentQuestion = 0;
    let answers = [];
    
    function showQuestion() {
        const q = lesson.questions[currentQuestion];
        contentEl.innerHTML = `
            <div class="lesson-quiz">
                <div class="quiz-header">
                    <h3>${lesson.title}</h3>
                    <div class="quiz-progress">Pregunta ${currentQuestion + 1} de ${lesson.questions.length}</div>
                </div>
                <div class="quiz-question">
                    <h4>${q.question}</h4>
                    <div class="quiz-options">
                        ${q.options.map((opt, i) => `
                            <button class="quiz-option" data-index="${i}">${opt}</button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        const options = contentEl.querySelectorAll('.quiz-option');
        options.forEach(opt => {
            opt.addEventListener('click', function() {
                const selectedIndex = parseInt(this.getAttribute('data-index'));
                answers[currentQuestion] = selectedIndex;
                
                options.forEach(o => o.classList.remove('selected'));
                this.classList.add('selected');
                
                setTimeout(() => {
                    if (currentQuestion < lesson.questions.length - 1) {
                        currentQuestion++;
                        showQuestion();
                    } else {
                        showQuizResults();
                    }
                }, 800);
            });
        });
    }
    
    function showQuizResults() {
        const correct = answers.filter((ans, i) => ans === lesson.questions[i].correct).length;
        const percentage = Math.round((correct / lesson.questions.length) * 100);
        const passed = percentage >= 70;
        
        contentEl.innerHTML = `
            <div class="quiz-results">
                <div class="results-icon ${passed ? 'success' : 'warning'}">
                    <i class="fas fa-${passed ? 'check-circle' : 'exclamation-triangle'}"></i>
                </div>
                <h3>${passed ? '¡Felicitaciones!' : 'Sigue Intentando'}</h3>
                <div class="results-score">
                    <div class="score-number">${correct}/${lesson.questions.length}</div>
                    <div class="score-percentage">${percentage}%</div>
                </div>
                <p>${passed ? '¡Has aprobado el quiz!' : 'Necesitas al menos 70% para aprobar.'}</p>
                <div class="lesson-actions">
                    ${passed ? `
                        <button class="btn-primary mark-complete-btn">
                            <i class="fas fa-check"></i> Continuar
                        </button>
                    ` : `
                        <button class="btn-secondary retry-quiz-btn">
                            <i class="fas fa-redo"></i> Intentar de Nuevo
                        </button>
                    `}
                </div>
            </div>
        `;
        
        if (passed) {
            const completeBtn = contentEl.querySelector('.mark-complete-btn');
            completeBtn.addEventListener('click', () => {
                markLessonComplete(lesson.id);
            });
        } else {
            const retryBtn = contentEl.querySelector('.retry-quiz-btn');
            retryBtn.addEventListener('click', () => {
                currentQuestion = 0;
                answers = [];
                showQuestion();
            });
        }
    }
    
    showQuestion();
}

// Marcar lección como completada
function markLessonComplete(lessonId) {
    if (!moduleProgress[currentModule]) {
        moduleProgress[currentModule] = { lessons: {}, completed: false, percentage: 0 };
    }
    
    moduleProgress[currentModule].lessons[lessonId] = true;
    
    // Calcular progreso del módulo
    const module = modulesData[currentModule];
    const totalLessons = module.lessons.length;
    const completedLessons = Object.keys(moduleProgress[currentModule].lessons).length;
    const percentage = Math.round((completedLessons / totalLessons) * 100);
    
    moduleProgress[currentModule].percentage = percentage;
    moduleProgress[currentModule].completed = percentage === 100;
    
    saveModuleProgress();
    updateProgressBadge();
    updateModuleCardProgress(currentModule);
    loadModuleNavigation();
    
    // Ir a siguiente lección
    if (currentLesson < module.lessons.length - 1) {
        currentLesson++;
        loadLesson(currentLesson);
    } else {
        // Módulo completado
        showModuleCompletedMessage();
    }
}

// Mostrar mensaje de módulo completado
function showModuleCompletedMessage() {
    const contentEl = document.getElementById('lesson-content');
    contentEl.innerHTML = `
        <div class="module-completed">
            <div class="completed-icon">
                <i class="fas fa-trophy"></i>
            </div>
            <h2>¡Módulo Completado!</h2>
            <p>Has terminado exitosamente el Módulo ${currentModule}: ${modulesData[currentModule].title}</p>
            <div class="lesson-actions">
                <button class="btn-primary close-module-btn">
                    <i class="fas fa-check"></i> Volver a Módulos
                </button>
            </div>
        </div>
    `;
    
    const closeBtn = contentEl.querySelector('.close-module-btn');
    closeBtn.addEventListener('click', () => {
        document.getElementById('module-modal').classList.remove('show');
    });
}

// Actualizar badge de progreso
function updateProgressBadge() {
    const badge = document.getElementById('module-progress-badge');
    if (badge && moduleProgress[currentModule]) {
        const percentage = moduleProgress[currentModule].percentage || 0;
        badge.textContent = `${percentage}% completado`;
        badge.className = `module-progress-badge ${percentage === 100 ? 'completed' : ''}`;
    }
}

// Actualizar progreso en tarjeta de módulo
function updateModuleCardProgress(moduleNum) {
    const card = document.querySelector(`.module-card[data-module="${moduleNum}"]`);
    if (!card) return;
    
    const progressFill = card.querySelector('.progress-fill');
    const progressText = card.querySelector('.progress-text');
    const startBtn = card.querySelector('.module-start-btn');
    
    const percentage = moduleProgress[moduleNum]?.percentage || 0;
    
    if (progressFill) progressFill.style.width = `${percentage}%`;
    if (progressText) progressText.textContent = `${percentage}% completado`;
    
    if (startBtn && percentage === 100) {
        startBtn.innerHTML = '<i class="fas fa-check-circle"></i> Revisar Módulo';
        startBtn.classList.add('completed');
    }
}

// Actualizar botones de navegación
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-lesson');
    const nextBtn = document.getElementById('next-lesson');
    const module = modulesData[currentModule];
    
    if (prevBtn) {
        prevBtn.disabled = currentLesson === 0;
    }
    
    if (nextBtn) {
        if (currentLesson >= module.lessons.length - 1) {
            nextBtn.style.display = 'none';
        } else {
            nextBtn.style.display = 'block';
        }
    }
}

// Inicializar controles del modal
function initModuleModal() {
    const closeBtn = document.getElementById('close-module-modal');
    const prevBtn = document.getElementById('prev-lesson');
    const nextBtn = document.getElementById('next-lesson');
    const downloadBtn = document.querySelector('.download-materials-btn');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            document.getElementById('module-modal').classList.remove('show');
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentLesson > 0) {
                currentLesson--;
                loadLesson(currentLesson);
                loadModuleNavigation();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const module = modulesData[currentModule];
            if (currentLesson < module.lessons.length - 1) {
                currentLesson++;
                loadLesson(currentLesson);
                loadModuleNavigation();
            }
        });
    }
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            alert('Descargando materiales del módulo... (Función en desarrollo)');
        });
    }
}

// Verificar elegibilidad para certificación
function checkCertificationEligibility() {
    // Use modulesAllComplete which is resilient and considers current modulesData
    if (modulesAllComplete()) {
        setTimeout(() => {
            showCertificationPopup();
        }, 1000);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initLearningSystem();
});
// Funcionalidad de navegación
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Solo interceptar si no tiene href o es un enlace interno
            if (!this.href || this.href.includes('#')) {
                e.preventDefault();
                
                // Remover clase active de todos los elementos
                navItems.forEach(nav => nav.classList.remove('active'));
                
                // Añadir clase active al elemento clickeado
                this.classList.add('active');
                
                // Mostrar mensaje según la sección
                const text = this.textContent.trim();
                switch(text) {
                    case 'Inicio':
                        window.location.href = '/index.html';
                        break;
                    case 'Mapa':
                        window.location.href = '/pages/Mapa.html';
                        break;
                    case 'Educativo':
                        // Ya estamos en la página educativa
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
            // Si tiene href válido, permitir navegación normal
        });
    });
}

// Funcionalidad de botones del hero
function initHeroButtons() {
    const videoBtn = document.querySelector('.hero-buttons .btn-primary');
    const downloadBtn = document.querySelector('.hero-buttons .btn-secondary');
    
    if (videoBtn) {
        videoBtn.addEventListener('click', function() {
            // Efecto visual
            this.style.transform = 'translateY(-3px) scale(1.05)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Simular carga de video
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando video...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                alert('Reproduciendo guía en video - Funcionalidad próximamente disponible');
            }, 2000);
        });
    }
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Efecto visual
            this.style.transform = 'translateY(-3px) scale(1.05)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Simular descarga
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Descargando...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                alert('Descargando guía PDF - Funcionalidad próximamente disponible');
            }, 1500);
        });
    }
}

// Funcionalidad de tabs de materiales
function initMaterialTabs() {
    const materialTabs = document.querySelectorAll('.material-tab');
    const materialGuides = document.querySelectorAll('.material-guide');
    
    materialTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const material = this.getAttribute('data-material');
            
            // Efecto visual en el tab
            this.style.transform = 'translateY(-2px) scale(1.05)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Remover clase active de todos los tabs
            materialTabs.forEach(t => t.classList.remove('active'));
            materialGuides.forEach(g => g.classList.remove('active'));
            
            // Añadir clase active al tab clickeado
            this.classList.add('active');
            
            // Mostrar la guía correspondiente con animación
            const guide = document.getElementById(material);
            if (guide) {
                // Pequeño delay para la animación
                setTimeout(() => {
                    guide.classList.add('active');
                }, 100);
            }
        });
    });
}


// Funcionalidad de botones de compartir
function initShareButtons() {
    const shareBtn = document.querySelector('.share-buttons .btn-outline');
    const downloadBtn = document.querySelector('.share-buttons .btn-primary');
    
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            // Efecto visual
            this.style.transform = 'translateY(-3px) scale(1.05)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Simular compartir
            if (navigator.share) {
                navigator.share({
                    title: 'Guía de Reciclaje - Grennity',
                    text: 'Aprende a reciclar correctamente con esta guía completa',
                    url: window.location.href
                });
            } else {
                // Fallback para navegadores que no soportan Web Share API
                const shareText = '¡Mira esta increíble guía de reciclaje! Aprende a reciclar correctamente y ayuda al medio ambiente.';
                const shareUrl = window.location.href;
                
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(`${shareText} ${shareUrl}`).then(() => {
                        alert('¡Enlace copiado al portapapeles! Compártelo con tus amigos.');
                    });
                } else {
                    alert('Comparte este enlace: ' + shareUrl);
                }
            }
        });
    }
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Efecto visual
            this.style.transform = 'translateY(-3px) scale(1.05)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Simular descarga de guía completa
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparando descarga...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                alert('Descargando guía completa en PDF - Funcionalidad próximamente disponible');
            }, 2000);
        });
    }
}

// Animaciones de scroll
function initScrollEffects() {
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
    
    // Aplicar animación a las tarjetas
    const animatedElements = document.querySelectorAll('.step-card, .myth-card, .tip-card, .fact-item');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// Efectos visuales adicionales
function initAnimations() {
    // Efecto hover en las tarjetas de pasos
    const stepCards = document.querySelectorAll('.step-card');
    stepCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Efecto hover en las tarjetas de mitos
    const mythCards = document.querySelectorAll('.myth-card');
    mythCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Efecto hover en las tarjetas de consejos
    const tipCards = document.querySelectorAll('.tip-card');
    tipCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Efecto hover en los elementos de la tabla
    const tableItems = document.querySelectorAll('.table-item');
    tableItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.backgroundColor = 'rgba(34, 197, 94, 0.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.backgroundColor = 'transparent';
        });
    });
    
    // Efecto de click en los botones
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline, .material-tab');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Sistema de Certificación
function initCertificationSystem() {
    // Nota: ya no mostramos el pop-up automáticamente por tiempo.
    // El pop-up se mostrará únicamente cuando todas las secciones estén al 100%.
    // Inicializar botones de certificación
    initCertificationButtons();
}

// Mostrar pop-up de certificación
function showCertificationPopup() {
    const popup = document.getElementById('certification-popup');
    if (popup) {
        popup.classList.add('show');
        
        // Efecto de entrada
        setTimeout(() => {
            popup.style.opacity = '1';
            popup.style.visibility = 'visible';
        }, 100);
    }
}

// Ocultar pop-up de certificación
function hideCertificationPopup() {
    const popup = document.getElementById('certification-popup');
    if (popup) {
        popup.classList.remove('show');
        popup.style.opacity = '0';
        popup.style.visibility = 'hidden';
    }
}

// Inicializar botones de certificación
function initCertificationButtons() {
    // Botones del pop-up
    const popupStartBtn = document.querySelector('.popup-start-btn');
    const popupLaterBtn = document.querySelector('.popup-later-btn');
    
    // Botones de la sección de certificación (puede haber más de uno)
    const certStartBtns = document.querySelectorAll('.cert-start-btn');
    
    if (popupStartBtn) {
        popupStartBtn.addEventListener('click', function() {
            // Cargar progreso más reciente y basar la decisión únicamente en si los módulos
            // están al 100% (modulesAllComplete).
            loadModuleProgress();
            if (modulesAllComplete()) {
                hideCertificationPopup();
                startTrivia();
            } else {
                const incomplete = [];
                Object.keys(modulesData).forEach(m => {
                    const pct = moduleProgress[m]?.percentage || 0;
                    if (pct < 100) incomplete.push(`Módulo ${m} (${pct}%)`);
                });
                alert(`Para acceder al examen de certificación debes completar todos los Módulos al 100%. Módulos incompletos: ${incomplete.join(', ')}.`);
            }
        });
    }
    
    if (popupLaterBtn) {
        popupLaterBtn.addEventListener('click', function() {
            hideCertificationPopup();
        });
    }
    
    if (certStartBtns && certStartBtns.length > 0) {
        certStartBtns.forEach(certStartBtn => {
            certStartBtn.addEventListener('click', function(event) {
                // If element is a link, prevent navigation until we validate
                if (event && event.preventDefault) event.preventDefault();

                // Simplificar: basar la autorización del examen únicamente en que los módulos
                // estén al 100%.
                loadModuleProgress();
                if (modulesAllComplete()) {
                    startTrivia();
                } else {
                    const incomplete = [];
                    Object.keys(modulesData).forEach(m => {
                        const pct = moduleProgress[m]?.percentage || 0;
                        if (pct < 100) incomplete.push(`Módulo ${m} (${pct}%)`);
                    });
                    alert(`No puedes iniciar el examen. Completa todos los Módulos al 100%. Módulos incompletos: ${incomplete.join(', ')}.`);
                }
            });
        });
    }
}

// Helper: verificar si todos los módulos están al 100%
function modulesAllComplete() {
    try {
        // moduleProgress se mantiene en memoria y se guarda en localStorage por initLearningSystem
        if (!moduleProgress || Object.keys(moduleProgress).length === 0) {
            // intentar cargar desde localStorage por seguridad
            const saved = localStorage.getItem('moduleProgress');
            if (saved) moduleProgress = JSON.parse(saved);
            else return false;
        }

        // Only consider modules that exist in modulesData (ignore stale/extra keys)
        const moduleKeys = Object.keys(modulesData);
        return moduleKeys.every(k => {
            const entry = moduleProgress ? moduleProgress[k] : undefined;
            return !!entry && Number(entry.percentage) === 100;
        });
    } catch (err) {
        console.error('Error verificando módulos completos', err);
        return false;
    }
}

// Preguntas de la trivia
const triviaQuestions = [
    {
        question: "¿Cuál es el símbolo universal del reciclaje?",
        options: [
            "Un círculo con tres flechas",
            "Un triángulo verde",
            "Una hoja de árbol",
            "Un corazón verde"
        ],
        correct: 0,
        explanation: "El símbolo universal del reciclaje es un círculo con tres flechas que representan reducir, reutilizar y reciclar."
    },
    {
        question: "¿Qué número de plástico es más fácil de reciclar?",
        options: [
            "Número 1 (PET)",
            "Número 3 (PVC)",
            "Número 6 (PS)",
            "Número 7 (Otros)"
        ],
        correct: 0,
        explanation: "El plástico número 1 (PET) es el más fácil de reciclar y se usa comúnmente en botellas de agua."
    },
    {
        question: "¿Se debe lavar los envases antes de reciclarlos?",
        options: [
            "Sí, siempre",
            "No, no es necesario",
            "Solo si están muy sucios",
            "Solo los de vidrio"
        ],
        correct: 0,
        explanation: "Sí, es importante lavar los envases antes de reciclarlos para evitar contaminar el proceso de reciclaje."
    },
    {
        question: "¿Cuánto tiempo tarda en degradarse una botella de plástico?",
        options: [
            "450 años",
            "50 años",
            "10 años",
            "2 años"
        ],
        correct: 0,
        explanation: "Una botella de plástico puede tardar hasta 450 años en degradarse completamente en el medio ambiente."
    },
    {
        question: "¿Qué materiales NO se pueden reciclar juntos?",
        options: [
            "Vidrio y metal",
            "Papel y cartón",
            "Plástico y vidrio",
            "Todos se pueden mezclar"
        ],
        correct: 2,
        explanation: "El plástico y el vidrio no se pueden reciclar juntos porque requieren procesos diferentes de reciclaje."
    },
    {
        question: "¿Cuál es la regla de las 3 R's?",
        options: [
            "Reducir, Reutilizar, Reciclar",
            "Recoger, Revisar, Reciclar",
            "Reutilizar, Reducir, Revisar",
            "Reciclar, Reducir, Revisar"
        ],
        correct: 0,
        explanation: "Las 3 R's son: Reducir (consumir menos), Reutilizar (dar segunda vida) y Reciclar (procesar materiales)."
    },
    {
        question: "¿Se pueden reciclar las bolsas de plástico en el contenedor normal?",
        options: [
            "Sí, siempre",
            "No, van en contenedores especiales",
            "Solo las transparentes",
            "Solo las de color"
        ],
        correct: 1,
        explanation: "Las bolsas de plástico no van en el contenedor normal porque pueden dañar las máquinas de reciclaje. Van en contenedores especiales."
    },
    {
        question: "¿Cuánta energía se ahorra reciclando una lata de aluminio?",
        options: [
            "95%",
            "50%",
            "25%",
            "10%"
        ],
        correct: 0,
        explanation: "Reciclar una lata de aluminio ahorra hasta 95% de la energía necesaria para producir una nueva."
    },
    {
        question: "¿Qué tipo de papel NO se puede reciclar?",
        options: [
            "Periódicos",
            "Revistas",
            "Papel encerado",
            "Cajas de cartón"
        ],
        correct: 2,
        explanation: "El papel encerado no se puede reciclar debido a su recubrimiento de cera que contamina el proceso."
    },
    {
        question: "¿Cuántos árboles se salvan reciclando una tonelada de papel?",
        options: [
            "17 árboles",
            "5 árboles",
            "50 árboles",
            "100 árboles"
        ],
        correct: 0,
        explanation: "Reciclar una tonelada de papel salva aproximadamente 17 árboles y reduce significativamente las emisiones de CO2."
    }
];

// Variables del sistema de trivia
let currentQuestion = 0;
let userAnswers = [];
let triviaStarted = false;

// Iniciar trivia
function startTrivia() {
    currentQuestion = 0;
    userAnswers = [];
    triviaStarted = true;
    
    const modal = document.getElementById('trivia-modal');
    if (modal) {
        modal.classList.add('show');
        showQuestion();
    }
}

// Mostrar pregunta actual
function showQuestion() {
    const question = triviaQuestions[currentQuestion];
    const questionElement = document.getElementById('trivia-question');
    const optionsElement = document.getElementById('trivia-options');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const nextBtn = document.getElementById('trivia-next');
    const skipBtn = document.getElementById('trivia-skip');
    
    if (!questionElement || !optionsElement) return;
    
    // Actualizar progreso
    const progress = ((currentQuestion + 1) / triviaQuestions.length) * 100;
    if (progressFill) {
        progressFill.style.width = progress + '%';
    }
    if (progressText) {
        progressText.textContent = `Pregunta ${currentQuestion + 1} de ${triviaQuestions.length}`;
    }
    
    // Mostrar pregunta
    questionElement.innerHTML = `
        <div class="question-text">${question.question}</div>
    `;
    
    // Mostrar opciones
    optionsElement.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.textContent = option;
        button.addEventListener('click', () => selectOption(index));
        optionsElement.appendChild(button);
    });
    
    // Ocultar botones de navegación
    if (nextBtn) nextBtn.style.display = 'none';
    if (skipBtn) skipBtn.style.display = 'none';
}

// Seleccionar opción
function selectOption(optionIndex) {
    const options = document.querySelectorAll('.option-button');
    const question = triviaQuestions[currentQuestion];
    
    // Remover selección anterior
    options.forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Marcar opción seleccionada
    options[optionIndex].classList.add('selected');
    
    // Guardar respuesta
    userAnswers[currentQuestion] = optionIndex;
    
    // Mostrar botón siguiente
    const nextBtn = document.getElementById('trivia-next');
    if (nextBtn) {
        nextBtn.style.display = 'inline-flex';
        nextBtn.onclick = () => nextQuestion();
    }
}

// Siguiente pregunta
function nextQuestion() {
    if (currentQuestion < triviaQuestions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        finishTrivia();
    }
}

// Finalizar trivia
function finishTrivia() {
    const modal = document.getElementById('trivia-modal');
    const resultsModal = document.getElementById('results-modal');
    
    if (modal) modal.classList.remove('show');
    if (resultsModal) {
        resultsModal.classList.add('show');
        showResults();
    }
}

// Mostrar resultados
function showResults() {
    const correctAnswers = userAnswers.filter((answer, index) => 
        answer === triviaQuestions[index].correct
    ).length;
    
    const totalQuestions = triviaQuestions.length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    
    const resultsContent = document.getElementById('results-content');
    const downloadBtn = document.getElementById('download-certificate');
    const resultsModal = document.getElementById('results-modal');
    
    if (!resultsContent) return;
    
    // Determinar nivel de rendimiento
    let level, message, iconClass, scoreClass;
    
    if (correctAnswers >= 9) {
        level = "¡Excelente!";
        message = "¡Felicitaciones! Has demostrado un conocimiento excepcional sobre reciclaje. Eres un verdadero defensor del medio ambiente.";
        iconClass = "fas fa-trophy";
        scoreClass = "excellent";
    } else if (correctAnswers >= 7) {
        level = "¡Muy bien!";
        message = "¡Buen trabajo! Tienes un buen conocimiento sobre reciclaje. Con un poco más de práctica, serás un experto.";
        iconClass = "fas fa-star";
        scoreClass = "good";
    } else if (correctAnswers >= 5) {
        level = "Regular";
        message = "Tienes algunos conocimientos básicos, pero hay mucho por aprender. Te recomendamos revisar las guías de reciclaje.";
        iconClass = "fas fa-exclamation-triangle";
        scoreClass = "average";
    } else {
        level = "Necesitas mejorar";
        message = "Es importante que aprendas más sobre reciclaje para ayudar al medio ambiente. ¡No te desanimes, todos empezamos así!";
        iconClass = "fas fa-book";
        scoreClass = "poor";
    }
    
    resultsContent.innerHTML = `
        <div class="results-icon ${scoreClass}">
            <i class="${iconClass}"></i>
        </div>
        <h3 class="results-title">${level}</h3>
        <div class="results-score ${scoreClass}">${correctAnswers}/${totalQuestions} (${percentage}%)</div>
        <p class="results-message">${message}</p>
        ${correctAnswers >= 9 ? `
            <div class="certificate-preview">
                <h4><i class="fas fa-certificate"></i> ¡Certificado Disponible!</h4>
                <p>Has aprobado con excelencia. Descarga tu certificado oficial de reciclaje responsable.</p>
            </div>
        ` : ''}
    `;
    
    // Configurar botón de descarga de certificado (solo si tiene 9+ puntos)
    if (downloadBtn) {
        if (correctAnswers >= 9) {
            downloadBtn.style.display = 'inline-flex';
            downloadBtn.onclick = () => downloadCertificate(correctAnswers, percentage);
        } else {
            downloadBtn.style.display = 'none';
        }
    }
    
    // Configurar botones de navegación
    const retakeBtn = document.getElementById('retake-exam');
    const closeBtn = document.getElementById('close-results');
    
    if (retakeBtn) {
        retakeBtn.onclick = function() {
            if (resultsModal) {
                resultsModal.classList.remove('show');
            }
            // Reiniciar el sistema de trivia
            currentQuestion = 0;
            userAnswers = [];
            triviaStarted = false;
            startTrivia();
        };
    }
    
    if (closeBtn) {
        closeBtn.onclick = function() {
            if (resultsModal) {
                resultsModal.classList.remove('show');
            }
        };
    }
}

// Generar y descargar certificado
function downloadCertificate(score, percentage) {
    // 1) Pedir al usuario su nombre. Si no lo proporciona, abortamos.
    const userName = prompt("Por favor, ingresa tu nombre para el certificado:");
    if (!userName) return; // El usuario canceló o dejó el campo vacío.

    // 2) Obtener fecha actual en formato localizado (es-ES) para mostrarla
    //    en el certificado y usarla en el nombre del archivo.
    const currentDate = new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // 3) Construir el contenido HTML del certificado.
    //    NOTA: el bloque siguiente contiene HTML+CSS embebido (diseño).
    const certificateContent = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Certificado de Reciclaje - ${userName}</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    margin: 0;
                    padding: 40px;
                    background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
                    min-height: 100vh;
                }
                .certificate {
                    background: white;
                    border: 8px solid #22c55e;
                    border-radius: 20px;
                    padding: 60px;
                    text-align: center;
                    box-shadow: 0 20px 60px rgba(34, 197, 94, 0.2);
                    max-width: 800px;
                    margin: 0 auto;
                    position: relative;
                }
                .certificate::before {
                    content: '';
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    right: 20px;
                    bottom: 20px;
                    border: 2px solid #22c55e;
                    border-radius: 15px;
                    pointer-events: none;
                }
                .logo {
                    width: 120px;
                    height: 120px;
                    background: linear-gradient(135deg, #22c55e, #16a34a);
                    border-radius: 50%;
                    margin: 0 auto 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 3rem;
                    box-shadow: 0 10px 30px rgba(34, 197, 94, 0.3);
                }
                .title {
                    font-size: 2.5rem;
                    font-weight: bold;
                    color: #22c55e;
                    margin-bottom: 20px;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                }
                .subtitle {
                    font-size: 1.2rem;
                    color: #666;
                    margin-bottom: 40px;
                }
                .name {
                    font-size: 2rem;
                    font-weight: bold;
                    color: #333;
                    margin-bottom: 30px;
                    padding: 20px;
                    background: linear-gradient(135deg, #f0fdf4, #dcfce7);
                    border-radius: 15px;
                    border: 2px solid #22c55e;
                }
                .achievement {
                    font-size: 1.3rem;
                    color: #22c55e;
                    font-weight: bold;
                    margin-bottom: 20px;
                }
                .score {
                    font-size: 1.1rem;
                    color: #666;
                    margin-bottom: 40px;
                }
                .date {
                    font-size: 1rem;
                    color: #999;
                    margin-bottom: 30px;
                }
                .footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 40px;
                    padding-top: 20px;
                    border-top: 2px solid #e5e7eb;
                }
                .signature {
                    text-align: center;
                }
                .signature-line {
                    width: 200px;
                    height: 2px;
                    background: #22c55e;
                    margin: 10px auto;
                }
                .certificate-number {
                    font-size: 0.9rem;
                    color: #999;
                    font-family: monospace;
                }
            </style>
        </head>
        <body>
            <div class="certificate">
                <div class="logo">🌱</div>
                <h1 class="title">Certificado de Reciclaje</h1>
                <p class="subtitle">Certificación en Reciclaje Responsable</p>
                
                <div class="name">${userName}</div>
                
                <div class="achievement">¡Felicitaciones por tu excelente desempeño!</div>
                <div class="score">Puntuación: ${score}/10 (${percentage}%)</div>
                <div class="date">Fecha de certificación: ${currentDate}</div>
                
                <p style="font-size: 1.1rem; color: #666; line-height: 1.6; margin: 30px 0;">
                    Este certificado reconoce el compromiso de <strong>${userName}</strong> con el medio ambiente 
                    y su conocimiento demostrado en las mejores prácticas de reciclaje. 
                    Has demostrado ser un verdadero defensor de la sostenibilidad.
                </p>
                
                <div class="footer">
                    <div class="signature">
                        <div class="signature-line"></div>
                        <div>Grennity Team</div>
                        <div style="font-size: 0.9rem; color: #666;">Organización de Sostenibilidad</div>
                    </div>
                    <div class="certificate-number">
                        Cert. #${Date.now().toString().slice(-8)}
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;
    
    // 4) Crear un Blob con el HTML y forzar la descarga en el navegador.
    //    - Se crea una URL temporal con URL.createObjectURL
    //    - Se genera un enlace <a> dinámico con el atributo download
    //    - Se simula el click para iniciar la descarga
    const blob = new Blob([certificateContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    // Normalizar el nombre de archivo: reemplazar espacios y añadir fecha.
    a.download = `Certificado_Reciclaje_${userName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    // 5) Limpieza: quitar el enlace y liberar la URL para evitar fugas de memoria.
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // 6) Feedback sencillo al usuario indicando que la descarga fue iniciada.
    alert('¡Certificado descargado exitosamente! Revisa tu carpeta de descargas.');
}

// Cerrar modales
document.addEventListener('click', function(e) {
    // Cerrar modal al hacer clic en el overlay
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('show');
    }
    
    // Cerrar modal al hacer clic en el overlay
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('show');
        return;
    }

    // Manejar botones con clase .modal-close (cierre genérico)
    if (e.target.classList.contains('modal-close') || e.target.closest('.modal-close')) {
        // Buscar el overlay padre más cercano y quitar la clase 'show'
        const closeBtn = e.target.classList.contains('modal-close') ? e.target : e.target.closest('.modal-close');
        const overlay = closeBtn.closest('.modal-overlay') || document.querySelector('.modal-overlay.show');
        if (overlay) overlay.classList.remove('show');
        return;
    }

    // Cerrar modal de trivia con el botón X (caso específico por compatibilidad)
    if (e.target.id === 'close-trivia' || e.target.closest('#close-trivia')) {
        const triviaModal = document.getElementById('trivia-modal');
        if (triviaModal) {
            triviaModal.classList.remove('show');
        }
        return;
    }

    // Cerrar modal de paso (botón X específico)
    if (e.target.id === 'close-step-modal' || e.target.closest('#close-step-modal')) {
        const stepModal = document.getElementById('step-modal');
        if (stepModal) stepModal.classList.remove('show');
        return;
    }

    // Cerrar pop-up de certificación al hacer clic en el overlay
    if (e.target.id === 'certification-popup') {
        hideCertificationPopup();
        return;
    }
});

console.log('Grennity - Página Educativa cargada correctamente con todas las funcionalidades');

/* ---------------------- Step Progress System ---------------------- */
function initStepProgressSystem() {
    // Load progress from localStorage or initialize
    const stored = localStorage.getItem('greennity_step_progress');
    let progress = stored ? JSON.parse(stored) : {1:0,2:0,3:0,4:0};

    // Apply initial progress values to UI
    document.querySelectorAll('.step-card').forEach(card => {
        const step = card.getAttribute('data-step');
        const fill = card.querySelector('.step-progress .progress-fill');
        const text = card.querySelector('.step-progress .progress-text');
        const value = progress[step] || 0;
        if (fill) fill.style.width = value + '%';
        if (text) text.textContent = value + '%';
    });

    // Disable cert start button unless all are 100%
    updateCertButtonState(progress);

    // Click handler to open modal when a step-card is clicked
    document.querySelectorAll('.step-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function(e) {
            openStepModal(this, progress);
        });
    });
}

function openStepModal(card, progress) {
    const step = card.getAttribute('data-step');
    const title = card.querySelector('.step-title') ? card.querySelector('.step-title').textContent : `Paso ${step}`;
    const description = card.querySelector('.step-description') ? card.querySelector('.step-description').textContent : '';
    const listItems = Array.from(card.querySelectorAll('.step-list li')).map(li => li.textContent.trim());

    const modal = document.getElementById('step-modal');
    const modalTitle = modal.querySelector('.modal-step-title');
    const modalBody = modal.querySelector('.modal-step-body');
    const saveBtn = document.getElementById('step-modal-save');
    const cancelBtn = document.getElementById('step-modal-cancel');

    modalTitle.textContent = title;
    // Build checklist HTML
    modalBody.innerHTML = `
        <p class="step-modal-desc">${description}</p>
        <div class="step-modal-checklist">
            ${listItems.map((txt, idx) => `
                <label class="check-item"><input type="checkbox" data-idx="${idx}"> ${txt}</label>
            `).join('')}
        </div>
        <div style="margin-top:16px; font-size:0.95rem; color:#666;">Marca las acciones que completes para aumentar el progreso del paso.</div>
    `;

    // Restore checked state from progress store (we persist only percentage, but assume checklist length => compute checked by percentage)
    const stored = localStorage.getItem('greennity_step_progress_details');
    let details = stored ? JSON.parse(stored) : {};
    const key = `step_${step}`;
    const savedChecked = details[key] || [];
    modal.querySelectorAll('.check-item input[type="checkbox"]').forEach((cb, i) => {
        cb.checked = savedChecked.includes(i);
    });

    // Show modal
    modal.classList.add('show');

    // Save handler
    saveBtn.onclick = function() {
        const checked = Array.from(modal.querySelectorAll('.check-item input[type="checkbox"]')).map((c, i) => c.checked ? i : -1).filter(i => i >= 0);
        details[key] = checked;
        // persist details
        localStorage.setItem('greennity_step_progress_details', JSON.stringify(details));

        // compute percentage: (checked / total) * 100
        const total = modal.querySelectorAll('.check-item').length || 1;
        const percent = Math.round((checked.length / total) * 100);

        // update progress store
        const store = localStorage.getItem('greennity_step_progress');
        let progressStore = store ? JSON.parse(store) : {1:0,2:0,3:0,4:0};
        progressStore[step] = percent;
        localStorage.setItem('greennity_step_progress', JSON.stringify(progressStore));

        // update UI
        const fill = card.querySelector('.step-progress .progress-fill');
        const text = card.querySelector('.step-progress .progress-text');
        if (fill) fill.style.width = percent + '%';
        if (text) text.textContent = percent + '%';

        // close modal
        modal.classList.remove('show');

        // Update exam button state
        updateCertButtonState(progressStore);
    };

    cancelBtn.onclick = function() {
        modal.classList.remove('show');
    };
}

function updateCertButtonState(progressStore) {
    const certBtns = document.querySelectorAll('.cert-start-btn');
    if (!certBtns || certBtns.length === 0) return;
    // Base the button state solely on module completion (not on step progress)
    const modulesComplete = modulesAllComplete();
    certBtns.forEach(certBtn => {
        if (modulesComplete) {
            certBtn.disabled = false;
            certBtn.classList.remove('disabled');
            certBtn.title = 'Puedes iniciar el examen';
        } else {
            certBtn.disabled = true;
            certBtn.classList.add('disabled');
            certBtn.title = 'Completa todos los Módulos al 100% para habilitar el examen';
        }
    });

    // Mostrar el pop-up de certificación cuando todos los módulos estén al 100%.
    if (modulesComplete) {
        try {
            const shown = localStorage.getItem('greennity_cert_popup_shown');
            if (!shown) {
                showCertificationPopup();
                localStorage.setItem('greennity_cert_popup_shown', '1');
            }
        } catch (err) {
            if (!window.__greennity_cert_shown) {
                showCertificationPopup();
                window.__greennity_cert_shown = true;
            }
        }
    }
}

// Helpers para progreso
function getProgressStore() {
    const store = localStorage.getItem('greennity_step_progress');
    return store ? JSON.parse(store) : {1:0,2:0,3:0,4:0};
}

// Devuelve un array con los números de paso que no están al 100%
function canStartExam(progressStore) {
    const store = progressStore || getProgressStore();
    const missing = [];
    [1,2,3,4].forEach(n => {
        if ((store[n] || 0) < 100) missing.push(n);
    });
    return missing;
}

