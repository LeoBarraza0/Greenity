from flask import Blueprint, render_template, session
from Config.db import app, db
from Models.Usuario import Usuario

# Crear el Blueprint para rutas web (siguiendo la lógica del profesor)
routes_Web = Blueprint("routes_Web", __name__)

@routes_Web.route("/login")
def index():
    """Ruta principal que muestra el formulario de login"""
    from Config.Controller.UserController import generate_csrf_token
    csrf_token = generate_csrf_token()
    return render_template("views/Login.html", csrf_token=csrf_token)

@routes_Web.route("/")
def main():
    """Página principal después del login"""
    return render_template("views/index.html", 
                         user_authenticated=session.get('user_authenticated', False), 
                         user_email=session.get('user_email', ''))

@routes_Web.route("/Mapa")
def mapa():
    """Página del mapa de puntos de reciclaje"""
    return render_template("views/Mapa.html", 
                         user_authenticated=session.get('user_authenticated', False), 
                         user_email=session.get('user_email', ''))

@routes_Web.route("/Configuracion")
def config():
    """Página de configuración"""
    return render_template("views/Configuracion.html", 
                         user_authenticated=session.get('user_authenticated', False), 
                         user_email=session.get('user_email', ''))

@routes_Web.route("/Contacto")
def contacto():
    """Página de contacto"""
    from Config.Controller.UserController import generate_csrf_token
    
    user_authenticated = session.get('user_authenticated', False)
    user_email = session.get('user_email', '')
    csrf_token = generate_csrf_token()
    
    # Obtener datos completos del usuario si está autenticado
    user_data = None
    if user_authenticated and user_email:
        try:
            user = Usuario.query.filter_by(correo=user_email).first()
            if user:
                user_data = {
                    'nombre': user.nombre or '',
                    'correo': user.correo or ''
                }
        except Exception as e:
            print(f"Error al obtener datos del usuario: {e}")
            # Si hay error, continuar sin datos del usuario
    
    return render_template("views/Contacto.html", 
                         user_authenticated=user_authenticated, 
                         user_email=user_email,
                         user_data=user_data,
                         csrf_token=csrf_token)

@routes_Web.route("/Educativo")
def edu():
    """Página educativa"""
    return render_template("views/Educativo.html", 
                         user_authenticated=session.get('user_authenticated', False), 
                         user_email=session.get('user_email', ''))

@routes_Web.route("/Reciclaje")
def rec():
    """Página para sugerir puntos de reciclaje"""
    return render_template("views/SugerirPunto.html", 
                         user_authenticated=session.get('user_authenticated', False), 
                         user_email=session.get('user_email', ''))

