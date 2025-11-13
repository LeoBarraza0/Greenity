from flask import Blueprint, render_template, session
from Config.db import app

# Crear el Blueprint para rutas web (siguiendo la lógica del profesor)
routes_Web = Blueprint("routes_Web", __name__)

@routes_Web.route("/")
def index():
    """Ruta principal que muestra el formulario de login"""
    from Config.Controller.UserController import generate_csrf_token
    csrf_token = generate_csrf_token()
    return render_template("views/Login.html", csrf_token=csrf_token)

@routes_Web.route("/Main")
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
    return render_template("views/Contacto.html", 
                         user_authenticated=session.get('user_authenticated', False), 
                         user_email=session.get('user_email', ''))

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

