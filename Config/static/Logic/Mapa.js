// JavaScript para funcionalidad interactiva de la página del mapa

document.addEventListener("DOMContentLoaded", function () {
  // Elementos del DOM
  const distanceSlider = document.getElementById("distance-slider");
  const distanceValue = document.getElementById("distance-value");
  const materialCheckboxes = document.querySelectorAll(".material-checkbox");
  const scheduleCheckboxes = document.querySelectorAll(".schedule-checkbox");
  const applyFiltersBtn = document.querySelector(".apply-filters-btn");
  const listViewBtn = document.getElementById("list-view");
  const gridViewBtn = document.getElementById("grid-view");
  const pointsContainer = document.getElementById("points-container");
  const myLocationBtn = document.getElementById("my-location-btn");
  const fullscreenBtn = document.getElementById("fullscreen-btn");
  const pointCards = document.querySelectorAll(".point-card");
  const actionBtns = document.querySelectorAll(".action-btn");

  // Estado de la aplicación
  let currentView = "list";
  let currentFilters = {
    distance: 1,
    materials: [],
    schedules: [],
  };

  // Inicialización
  init();

  function init() {
    setupDistanceSlider();
    setupCheckboxes();
    setupViewControls();
    setupMapControls();
    setupPointCards();
    setupActionButtons();
    setupAnimations();
    console.log("Mapa de reciclaje cargado correctamente");
  }

  // Configurar slider de distancia
  function setupDistanceSlider() {
    if (distanceSlider && distanceValue) {
      distanceSlider.addEventListener("input", function () {
        const value = this.value;
        distanceValue.textContent = `${value} km`;
        currentFilters.distance = parseInt(value);

        // Efecto visual en el slider
        this.style.background = `linear-gradient(to right, #22c55e 0%, #22c55e ${
          (value / 20) * 100
        }%, #e5e7eb ${(value / 20) * 100}%, #e5e7eb 100%)`;
      });

      // Establecer valor inicial
      distanceSlider.dispatchEvent(new Event("input"));
    }
  }

  // Configurar checkboxes
  function setupCheckboxes() {
    // Checkboxes de materiales
    materialCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        if (this.checked) {
          currentFilters.materials.push(this.value);
          // Efecto visual
          this.parentElement.style.transform = "scale(1.02)";
          setTimeout(() => {
            this.parentElement.style.transform = "";
          }, 200);
        } else {
          currentFilters.materials = currentFilters.materials.filter(
            (m) => m !== this.value
          );
        }
        updateFilterCount();
      });
    });

    // Checkboxes de horarios
    scheduleCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        if (this.checked) {
          currentFilters.schedules.push(this.value);
          // Efecto visual
          this.parentElement.style.transform = "scale(1.02)";
          setTimeout(() => {
            this.parentElement.style.transform = "";
          }, 200);
        } else {
          currentFilters.schedules = currentFilters.schedules.filter(
            (s) => s !== this.value
          );
        }
        updateFilterCount();
      });
    });
  }

  // Actualizar contador de filtros
  function updateFilterCount() {
    const totalFilters =
      currentFilters.materials.length + currentFilters.schedules.length;
    if (totalFilters > 0) {
      applyFiltersBtn.innerHTML = `<i class="fas fa-filter"></i> Aplicar Filtros (${totalFilters})`;
      applyFiltersBtn.style.background =
        "linear-gradient(135deg, #f59e0b, #d97706)";
    } else {
      applyFiltersBtn.innerHTML = `<i class="fas fa-filter"></i> Aplicar Filtros`;
      applyFiltersBtn.style.background =
        "linear-gradient(135deg, #22c55e, #16a34a)";
    }
  }

  // Configurar controles de vista
  function setupViewControls() {
    if (listViewBtn && gridViewBtn && pointsContainer) {
      listViewBtn.addEventListener("click", function () {
        switchView("list");
      });

      gridViewBtn.addEventListener("click", function () {
        switchView("grid");
      });
    }
  }

  // Cambiar vista
  function switchView(view) {
    if (currentView === view) return;

    currentView = view;

    // Actualizar botones
    listViewBtn.classList.toggle("active", view === "list");
    gridViewBtn.classList.toggle("active", view === "grid");

    // Cambiar clase del contenedor
    pointsContainer.classList.toggle("grid-view", view === "grid");

    // Animación de transición
    pointsContainer.style.opacity = "0.7";
    pointsContainer.style.transform = "scale(0.98)";

    setTimeout(() => {
      pointsContainer.style.opacity = "1";
      pointsContainer.style.transform = "scale(1)";
    }, 200);

    // Re-aplicar animaciones a las tarjetas
    setTimeout(() => {
      animatePointCards();
    }, 300);
  }

  // Configurar controles del mapa
  function setupMapControls() {
    if (myLocationBtn) {
      myLocationBtn.addEventListener("click", function () {
        getCurrentLocation();
      });
    }

    if (fullscreenBtn) {
      fullscreenBtn.addEventListener("click", function () {
        toggleFullscreen();
      });
    }
  }

  // Obtener ubicación actual
  function getCurrentLocation() {
    if (navigator.geolocation) {
      myLocationBtn.innerHTML =
        '<div class="loading"></div> Obteniendo ubicación...';
      myLocationBtn.disabled = true;

      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          // Centrar el mapa en la ubicación del usuario
          if (window.leafletMap) {
            window.leafletMap.setView([lat, lng], 15);
            
            // Agregar marcador de ubicación del usuario
            L.marker([lat, lng])
              .addTo(window.leafletMap)
              .bindPopup("📍 Tu ubicación actual")
              .openPopup();
          }

          setTimeout(() => {
            myLocationBtn.innerHTML =
              '<i class="fas fa-crosshairs"></i> Mi Ubicación';
            myLocationBtn.disabled = false;

            // Simular búsqueda de puntos cercanos (para mantener compatibilidad con el resto del código)
            showNearbyPoints(lat, lng);

            // Efecto visual de éxito
            myLocationBtn.style.background = "#22c55e";
            myLocationBtn.style.color = "white";
            setTimeout(() => {
              myLocationBtn.style.background = "";
              myLocationBtn.style.color = "";
            }, 2000);
          }, 1000);
        },
        function (error) {
          myLocationBtn.innerHTML =
            '<i class="fas fa-crosshairs"></i> Mi Ubicación';
          myLocationBtn.disabled = false;
          alert(
            "No se pudo obtener tu ubicación. Por favor, verifica los permisos de geolocalización."
          );
        }
      );
    } else {
      alert("Tu navegador no soporta geolocalización.");
    }
  }

  // Mostrar puntos cercanos
  function showNearbyPoints(lat, lng) {
    // Simular filtrado por distancia
    pointCards.forEach((card) => {
      const distance = Math.random() * 5; // Simular distancia aleatoria
      const distanceElement = card.querySelector(".distance");
      if (distanceElement) {
        distanceElement.textContent = `${distance.toFixed(1)} km`;
      }
    });

    // Ordenar por distancia
    const sortedCards = Array.from(pointCards).sort((a, b) => {
      const distanceA = parseFloat(a.querySelector(".distance").textContent);
      const distanceB = parseFloat(b.querySelector(".distance").textContent);
      return distanceA - distanceB;
    });

    // Reorganizar en el DOM
    sortedCards.forEach((card) => {
      pointsContainer.appendChild(card);
    });

    // Aplicar filtros actuales
    applyFilters();
  }

  // Alternar pantalla completa
  function toggleFullscreen() {
    const mapContainer = document.querySelector(".map-container");

    if (!document.fullscreenElement) {
      mapContainer
        .requestFullscreen()
        .then(() => {
          fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
        })
        .catch((err) => {
          console.log("Error al entrar en pantalla completa:", err);
        });
    } else {
      document
        .exitFullscreen()
        .then(() => {
          fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        })
        .catch((err) => {
          console.log("Error al salir de pantalla completa:", err);
        });
    }
  }

  // Configurar tarjetas de puntos
  function setupPointCards() {
    pointCards.forEach((card, index) => {
      // Efecto hover mejorado
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-8px) scale(1.02)";
        this.style.boxShadow = "0 12px 40px rgba(0,0,0,0.15)";
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)";
        this.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
      });

      // Efecto de click
      card.addEventListener("click", function (e) {
        if (!e.target.closest(".action-btn")) {
          this.style.transform = "scale(0.98)";
          setTimeout(() => {
            this.style.transform = "";
          }, 150);
        }
      });
    });
  }

  // Configurar botones de acción
  function setupActionButtons() {
    actionBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();

        const action = this.textContent.trim();
        const card = this.closest(".point-card");
        const pointName = card.querySelector(".point-name").textContent;

        // Efecto visual de click
        this.style.transform = "scale(0.95)";
        setTimeout(() => {
          this.style.transform = "";
        }, 150);

        // Simular acciones
        switch (true) {
          case action.includes("Cómo llegar"):
            showDirections(pointName);
            break;
          case action.includes("Llamar"):
            makeCall(pointName);
            break;
          case action.includes("Ver detalles"):
            showDetails(pointName);
            break;
        }
      });
    });
  }

  // Mostrar direcciones
  function showDirections(pointName) {
    // Simular apertura de Google Maps
    const btn = event.target.closest(".action-btn");
    btn.innerHTML = '<div class="loading"></div> Abriendo...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Cómo llegar';
      btn.disabled = false;
      alert(`Abriendo Google Maps para: ${pointName}`);
    }, 1000);
  }

  // Hacer llamada
  function makeCall(pointName) {
    const phoneNumber = "+54 11 1234-5678"; // Número simulado
    if (confirm(`¿Llamar a ${pointName}?\nTeléfono: ${phoneNumber}`)) {
      window.location.href = `tel:${phoneNumber}`;
    }
  }

  // Mostrar detalles
  function showDetails(pointName) {
    alert(
      `Detalles de ${pointName}:\n\n• Horarios extendidos\n• Materiales aceptados\n• Servicios adicionales\n• Reseñas de usuarios\n\nEsta funcionalidad se implementará próximamente.`
    );
  }

  // Aplicar filtros
  function applyFilters() {
    pointCards.forEach((card) => {
      let show = true;

      // Filtrar por materiales
      if (currentFilters.materials.length > 0) {
        const materials = Array.from(
          card.querySelectorAll(".material-tag")
        ).map((tag) => tag.textContent.toLowerCase());
        const hasMaterial = currentFilters.materials.some((filter) =>
          materials.some((material) => material.includes(filter))
        );
        if (!hasMaterial) show = false;
      }

      // Filtrar por horarios
      if (currentFilters.schedules.length > 0) {
        const schedule = card
          .querySelector(".point-schedule span")
          .textContent.toLowerCase();
        const hasSchedule = currentFilters.schedules.some((filter) => {
          switch (filter) {
            case "24h":
              return schedule.includes("24 horas");
            case "comercial":
              return schedule.includes("8:00") || schedule.includes("9:00");
            case "fines":
              return schedule.includes("sáb") || schedule.includes("dom");
            case "semana":
              return (
                schedule.includes("lun-vie") || schedule.includes("lun-fri")
              );
            default:
              return false;
          }
        });
        if (!hasSchedule) show = false;
      }

      // Mostrar/ocultar tarjeta
      if (show) {
        card.style.display = "block";
        card.style.animation = "fadeInUp 0.5s ease forwards";
      } else {
        card.style.display = "none";
      }
    });

    // Efecto visual en el botón
    applyFiltersBtn.style.transform = "scale(0.95)";
    setTimeout(() => {
      applyFiltersBtn.style.transform = "";
    }, 150);
  }

  // Configurar animaciones
  function setupAnimations() {
    // Animación de entrada para las tarjetas
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, observerOptions);

    // Aplicar animación a las tarjetas
    pointCards.forEach((card, index) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      card.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(card);
    });
  }

  // Animar tarjetas de puntos
  function animatePointCards() {
    pointCards.forEach((card, index) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";

      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, index * 100);
    });
  }

  // Event listener para el botón de aplicar filtros
  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener("click", function () {
      applyFilters();
    });
  }

  // Efectos de hover mejorados para botones
  const allButtons = document.querySelectorAll(
    "button, .nav-item, .view-btn, .action-btn"
  );
  allButtons.forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      if (!this.disabled) {
        this.style.transform = "translateY(-2px)";
      }
    });

    btn.addEventListener("mouseleave", function () {
      if (!this.disabled) {
        this.style.transform = "translateY(0)";
      }
    });
  });

  // Efecto de scroll suave para enlaces internos
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  smoothScrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Funcionalidad de navegación
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      // Solo interceptar si no tiene href o es un enlace interno
      if (!this.href || this.href.includes("#")) {
        e.preventDefault();

        // Remover clase active de todos los elementos
        navItems.forEach((nav) => nav.classList.remove("active"));

        // Añadir clase active al elemento clickeado
        this.classList.add("active");

        // Mostrar mensaje según la sección
        const text = this.textContent.trim();
        switch (text) {
          case "Inicio":
            window.location.href = "/index.html";
            break;
          case "Mapa":
            // Ya estamos en la página del mapa
            break;
          case "Educativo":
            alert("Sección Educativo - Próximamente disponible");
            break;
          case "Sugerir Punto":
            alert("Sección Sugerir Punto - Próximamente disponible");
            break;
          case "Contacto":
            alert("Sección Contacto - Próximamente disponible");
            break;
          case "Configuración":
            alert("Sección Configuración - Próximamente disponible");
            break;
        }
      }
      // Si tiene href válido, permitir navegación normal
    });
  });

  // Funcionalidad del botón de Iniciar Sesión
  const loginBtn = document.querySelector(".login-btn");
  if (loginBtn) {
    loginBtn.addEventListener("click", function () {
      // Efecto visual de click
      this.style.transform = "translateY(-1px) scale(1.02)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);

      // Redirigir a la página de login
      window.location.href = "/pages/Login.html";
    });
  }

  // Inicializar el mapa de Leaflet después de que todo esté cargado
  initLeafletMap();
});

// Función para inicializar el mapa de Leaflet
function initLeafletMap() {
  // Inicializar el mapa centrado en Bogotá
  var map = L.map("map").setView([4.60971, -74.08175], 13);
  
  // Guardar referencia global del mapa
  window.leafletMap = map;

  // Añadir tiles de OpenStreetMap
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  // Agregar marcadores de puntos de reciclaje
  var puntosReciclaje = [
    {
      name: "EcoPunto San Martín",
      lat: 4.6097,
      lng: -74.0817,
      address: "Av. San Martín 1234, Centro",
      materials: ["Plástico", "Papel", "Vidrio", "Metal"]
    },
    {
      name: "Ecopunto Belgrano", 
      lat: 4.6150,
      lng: -74.0850,
      address: "Calle Belgrano 567, Belgrano",
      materials: ["Papel", "Cartón", "Pilas", "Electrónicos"]
    },
    {
      name: "Centro Verde Palermo",
      lat: 4.6050,
      lng: -74.0750,
      address: "Av. Santa Fe 3200, Palermo", 
      materials: ["Orgánicos", "Plástico", "Vidrio"]
    }
  ];

  // Agregar marcadores para cada punto
  puntosReciclaje.forEach(function(punto) {
    var marker = L.marker([punto.lat, punto.lng]).addTo(map);
    
    var popupContent = `
      <div style="min-width: 200px;">
        <h3 style="color: #22c55e; margin: 0 0 10px 0;">${punto.name}</h3>
        <p style="margin: 5px 0;"><strong>📍:</strong> ${punto.address}</p>
        <p style="margin: 5px 0;"><strong>♻️:</strong> ${punto.materials.join(', ')}</p>
        <button onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${punto.lat},${punto.lng}', '_blank')" 
                style="background: #22c55e; color: white; border: none; padding: 8px 12px; border-radius: 4px; margin-top: 10px; cursor: pointer;">
          Cómo llegar
        </button>
      </div>
    `;
    
    marker.bindPopup(popupContent);
  });

  // Evento: clic en el mapa agrega un nuevo marcador
  map.on("click", function (e) {
    L.marker([e.latlng.lat, e.latlng.lng])
      .addTo(map)
      .bindPopup(
        "Nuevo punto en: " +
          e.latlng.lat.toFixed(5) +
          ", " +
          e.latlng.lng.toFixed(5)
      )
      .openPopup();
  });

  console.log('Mapa de Leaflet inicializado correctamente');
}
