# 🌱 Greenity - Aplicación Web para Reciclaje

Aplicación web desarrollada en Python/Flask para optimizar el reciclaje y fortalecer la cultura ciudadana de separación de residuos en Barranquilla, Colombia.

## 📋 Descripción

Greenity es una plataforma educativa e interactiva que permite a los ciudadanos:
- 🗺️ **Localizar puntos de reciclaje** cercanos mediante un mapa interactivo
- 📚 **Aprender sobre reciclaje** a través de módulos educativos interactivos
- 🎓 **Obtener certificación** al completar el programa de aprendizaje
- 📍 **Sugerir nuevos puntos** de recolección en la ciudad
- 💬 **Contactar** con la organización para reportes y consultas

## ⚠️ IMPORTANTE: Rama de Desarrollo

**Este proyecto debe ejecutarse desde la rama `newbd`**, que contiene la última versión estable con la base de datos actualizada.

```bash
git checkout newbd
```

## 🚀 Tecnologías Utilizadas

### Backend
- **Python 3.8+** - Lenguaje principal
- **Flask 2.x** - Framework web
- **SQLAlchemy** - ORM para base de datos
- **Flask-Marshmallow** - Serialización de datos
- **Flask-Mail** - Envío de correos electrónicos
- **Cryptography** - Seguridad y cifrado de contraseñas
- **BeautifulSoup4** - Web scraping de puntos de reciclaje
- **PyMySQL** - Conector MySQL

### Frontend
- **HTML5/CSS3** - Estructura y estilos
- **JavaScript (Vanilla)** - Lógica del cliente
- **Leaflet.js** - Mapas interactivos
- **Font Awesome** - Iconografía

### Base de Datos
- **MySQL 8.0** - Sistema de gestión de base de datos

### Containerización
- **Docker & Docker Compose** - Despliegue en contenedores

## 📦 Requisitos Previos

### Opción 1: Con Docker (Recomendado)
- [Docker](https://www.docker.com/get-started) 20.10+
- [Docker Compose](https://docs.docker.com/compose/install/) 1.29+

### Opción 2: Sin Docker
- Python 3.8 o superior
- MySQL 8.0 o superior
- pip (gestor de paquetes de Python)

## 🔧 Instalación

### Opción 1: Instalación con Docker (Recomendado)

1. **Clonar el repositorio y cambiar a la rama `newbd`:**
```bash
git clone https://github.com/LeoBarraza0/Greenity.git
cd Greenity
git checkout newbd
```

2. **Configurar variables de entorno (opcional):**

Crear un archivo `.env` en la raíz del proyecto (o usar los valores por defecto):
```env
# Base de datos
DB_USER=root
DB_PASSWORD=12345
DB_HOST=db
DB_PORT=3306
DB_NAME=greenity_db

# Correo electrónico (opcional)
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=tu_email@gmail.com
MAIL_PASSWORD=tu_app_password

# Scraping automático
ENABLE_AUTO_IMPORT=true
```

3. **Levantar los contenedores:**
```bash
docker-compose up -d
```

4. **Verificar que los servicios estén corriendo:**
```bash
docker-compose ps
```

5. **Acceder a la aplicación:**
```
http://localhost:5000
```

### Opción 2: Instalación Manual (Sin Docker)

1. **Clonar el repositorio y cambiar a la rama `newbd`:**
```bash
git clone https://github.com/LeoBarraza0/Greenity.git
cd Greenity
git checkout newbd
```

2. **Crear y activar entorno virtual:**
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

3. **Instalar dependencias:**
```bash
pip install -r requirements.txt
```

4. **Configurar MySQL:**
- Instalar MySQL 8.0
- Crear base de datos:
```sql
CREATE DATABASE greenity_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

5. **Configurar variables de entorno:**
```bash
# Windows (PowerShell)
$env:DB_USER="root"
$env:DB_PASSWORD="tu_password"
$env:DB_HOST="localhost"
$env:DB_PORT="3306"
$env:DB_NAME="greenity_db"

# Linux/Mac
export DB_USER=root
export DB_PASSWORD=tu_password
export DB_HOST=localhost
export DB_PORT=3306
export DB_NAME=greenity_db
```

6. **Ejecutar la aplicación:**
```bash
python app.py
```

7. **Acceder a la aplicación:**
```
http://localhost:5000
```

## 📁 Estructura del Proyecto

```
Greenity/
├── app.py                      # Punto de entrada de la aplicación
├── requirements.txt            # Dependencias de Python
├── docker-compose.yaml         # Configuración de Docker
├── Dockerfile                  # Imagen Docker de la app
├── scraping.py                 # Web scraper de puntos de reciclaje
├── Config/
│   ├── db.py                   # Configuración de base de datos
│   ├── Controller/             # Controladores de la aplicación
│   │   ├── UserController.py   # Autenticación y usuarios
│   │   ├── CertificadoController.py  # Gestión de certificados
│   │   ├── ApiController.py    # Endpoints API públicos
│   │   ├── WebController.py    # Rutas de las vistas web
│   │   └── DataController.py   # Importación de datos
│   ├── static/                 # Archivos estáticos (CSS, JS, imágenes)
│   │   ├── css/                # Estilos
│   │   ├── js/                 # Scripts JavaScript
│   │   └── Img/                # Imágenes
│   └── templates/              # Plantillas HTML
│       ├── main/               # Componentes reutilizables
│       └── views/              # Páginas de la aplicación
└── Models/                     # Modelos de la base de datos
    ├── Usuario.py              # Modelo de usuarios
    ├── Certificado.py          # Modelo de certificados
    ├── Punto.py                # Modelo de puntos de reciclaje
    ├── Material.py             # Modelo de materiales
    ├── Organizacion.py         # Modelo de organizaciones
    └── PuntoContacto.py        # Modelo de contactos
```

## 🎯 Funcionalidades Principales

### 1. Sistema de Autenticación
- Registro de usuarios con validación
- Login con protección CSRF
- Hash de contraseñas con PBKDF2
- Sesiones seguras con Flask

### 2. Mapa Interactivo
- Visualización de puntos de reciclaje en Barranquilla
- Filtrado por tipo de material
- Información detallada de cada punto
- Integración con Leaflet.js y OpenStreetMap

### 3. Módulo Educativo
- 4 módulos de aprendizaje interactivos:
  1. Fundamentos del Reciclaje
  2. Clasificación de Materiales
  3. Impacto Ambiental
  4. Economía Circular
- Videos educativos embebidos
- Cuestionarios de evaluación
- Sistema de progreso persistente

### 4. Sistema de Certificación
- Examen final de certificación
- Generación automática de certificados
- Descarga en formato PDF/HTML
- Almacenamiento en base de datos con número único
- Vinculación automática al usuario autenticado

### 5. Web Scraping Automático
- Extracción de puntos de reciclaje de fuentes web
- Importación automática a la base de datos
- Actualización de información de materiales y organizaciones

## 🔑 Endpoints API Principales

### Autenticación
```
POST /login          # Iniciar sesión
POST /register       # Registrar usuario
GET  /logout         # Cerrar sesión
```

### Usuarios
```
GET    /usuario         # Listar usuarios
GET    /usuario/<id>    # Obtener usuario
PUT    /usuario/<id>    # Actualizar usuario
DELETE /usuario/<id>    # Eliminar usuario
```

### Certificados
```
POST   /controller/certificados       # Crear certificado (autenticado)
GET    /controller/certificados       # Listar certificados del usuario
GET    /controller/certificados/<id>  # Obtener certificado específico
PUT    /controller/certificados/<id>  # Actualizar certificado
DELETE /controller/certificados/<id>  # Eliminar certificado
```

### Datos Públicos
```
GET /api/puntos              # Obtener puntos de reciclaje
GET /api/materiales          # Obtener materiales
GET /api/organizaciones      # Obtener organizaciones
```

## 🗄️ Modelos de Base de Datos

### Usuario
- `id` (Integer, PK)
- `correo` (String, unique)
- `contrasena_hash` (String)
- `nombre` (String)
- `rol` (String: 'admin', 'usuario')
- `created_at` (Timestamp)

### Certificado
- `id` (Integer, PK)
- `usuario_id` (Integer, FK → Usuario)
- `numero_certificado` (String, unique)
- `emitido_en` (Timestamp)

### Punto
- `id` (Integer, PK)
- `nombre` (String)
- `direccion` (String)
- `latitud` (Float)
- `longitud` (Float)
- `id_material` (Integer, FK → Material)
- `usuario_rel` (Integer, FK → Usuario)

### Material
- `id` (Integer, PK)
- `nombre` (String)
- `descripcion` (String)

### Organizacion
- `id` (Integer, PK)
- `nombre` (String)
- `descripcion` (String)

### PuntoContacto
- `id` (Integer, PK)
- `punto_id` (Integer, FK → Punto)
- `organizacion_id` (Integer, FK → Organizacion)
- `telefono` (String)
- `email` (String)
- `horario` (String)

## 🧪 Uso de la Aplicación

### Para Usuarios Finales:

1. **Registro/Login:**
   - Accede a `/pages/Login.html`
   - Crea una cuenta con tu correo y contraseña
   - Inicia sesión

2. **Explorar el Mapa:**
   - Ve a la sección "Mapa"
   - Busca puntos de reciclaje cercanos
   - Filtra por tipo de material

3. **Aprender sobre Reciclaje:**
   - Accede a la sección "Educativo"
   - Completa los 4 módulos de aprendizaje
   - Responde los cuestionarios

4. **Obtener Certificación:**
   - Completa todos los módulos al 100%
   - Realiza el examen final
   - Obtén 9+ puntos (90%)
   - Descarga tu certificado oficial

### Para Administradores:

1. **Gestión de Usuarios:**
   - CRUD completo desde `/usuario`

2. **Actualización de Datos:**
   - Los puntos de reciclaje se actualizan automáticamente al iniciar la app
   - Para forzar actualización manual: reiniciar el servicio

## 🐛 Solución de Problemas

### Error de conexión a MySQL
```bash
# Verificar que el contenedor de MySQL está corriendo
docker-compose ps

# Ver logs de MySQL
docker-compose logs db
```

### La aplicación no inicia
```bash
# Ver logs de la aplicación
docker-compose logs web

# Reiniciar servicios
docker-compose restart
```

### Error de CSRF Token
- Asegúrate de estar usando el formulario desde el frontend
- Verifica que las cookies estén habilitadas en tu navegador

### Los puntos de reciclaje no aparecen
```bash
# Ejecutar manualmente el scraping
docker-compose exec web python scraping.py
```

## 📝 Variables de Entorno

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `DB_USER` | Usuario de MySQL | `root` |
| `DB_PASSWORD` | Contraseña de MySQL | `12345` |
| `DB_HOST` | Host de MySQL | `db` (Docker) / `localhost` |
| `DB_PORT` | Puerto de MySQL | `3306` |
| `DB_NAME` | Nombre de la BD | `greenity_db` |
| `MAIL_SERVER` | Servidor SMTP | `smtp.gmail.com` |
| `MAIL_PORT` | Puerto SMTP | `587` |
| `MAIL_USERNAME` | Email de envío | - |
| `MAIL_PASSWORD` | Contraseña de email | - |
| `ENABLE_AUTO_IMPORT` | Scraping automático | `true` |

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama desde `newbd`: `git checkout -b feature/nueva-funcionalidad`
3. Commit tus cambios: `git commit -m 'Agregar nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request hacia la rama `newbd`


## 👥 Autores

- **LeoBarraza0** - [GitHub](https://github.com/LeoBarraza0)

## 📞 Soporte

Para reportar bugs o solicitar funcionalidades:
- Abre un [Issue](https://github.com/LeoBarraza0/Greenity/issues)
- Contacta a través del formulario en la app

---

**Desarrollado con 💚 para un Barranquilla más sostenible**


