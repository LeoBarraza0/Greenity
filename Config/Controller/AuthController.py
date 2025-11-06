from flask import Blueprint, request, jsonify, session, redirect, abort
from Config.db import app
import secrets

# Crear el Blueprint para autenticación (siguiendo la lógica del profesor)
routes_Auth = Blueprint("routes_Auth", __name__)

# Funciones helper para CSRF (siguiendo la lógica del profesor)
def generate_csrf_token():
    """Genera un token CSRF y lo almacena en la sesión"""
    if 'csrf_token' not in session:
        session['csrf_token'] = secrets.token_urlsafe(32)
    return session['csrf_token']

def validar_csrf(token_from_request):
    """Valida el token CSRF recibido contra el almacenado en la sesión"""
    token_session = session.get('csrf_token')
    return token_session and secrets.compare_digest(token_session, token_from_request or "")

@routes_Auth.route("/login", methods=['POST'])
def login():
    """Endpoint para procesar el login del usuario"""
    # Obtener el token CSRF desde la cabecera o el formulario
    token = request.headers.get('X-CSRF-Token') or request.form.get('csrf_token')
    if not validar_csrf(token):
        print(f"CSRF Token inválido. Token recibido: {token}")
        abort(403, description="CSRF Token Inválido")
    
    data = request.form.to_dict()
    email = data.get('email', '')
    password = data.get('password', '')
    
    print(f"Intentando login con email: {email}, password: {password}")
    
    # Por ahora, un ejemplo básico
    if email == "admin@greenity.com" and password == "123456":
        session['user_authenticated'] = True
        session['user_email'] = email
        print("Login exitoso")
        return jsonify({
            "status": 200,
            "message": "Login exitoso",
            "url": "/Main"
        })
    else:
        print(f"Credenciales inválidas. Email: {email}, Password: {password}")
        return jsonify({
            "status": 401,
            "message": "Credenciales inválidas"
        })

@routes_Auth.route("/register", methods=['POST'])
def register():
    """Endpoint para registrar nuevos usuarios"""
    token = request.headers.get('X-CSRF-Token') or request.form.get('csrf_token')
    if not validar_csrf(token):
        abort(403, description="CSRF Token Inválido")
    
    data = request.form.to_dict()
    name = data.get('name', '')
    email = data.get('email', '')
    password = data.get('password', '')
    confirm_password = data.get('confirm_password', '')
    
    # Validaciones básicas
    if password != confirm_password:
        return jsonify({
            "status": 400,
            "message": "Las contraseñas no coinciden"
        })
    
    if len(password) < 6:
        return jsonify({
            "status": 400,
            "message": "La contraseña debe tener al menos 6 caracteres"
        })
    
    # Aquí puedes agregar tu lógica de registro en base de datos
    # Por ahora, solo confirmamos el registro
    return jsonify({
        "status": 200,
        "message": "Usuario registrado exitosamente",
        "url": "/Main"
    })

@routes_Auth.route("/logout")
def logout():
    """Endpoint para cerrar sesión del usuario"""
    session.clear()
    return redirect("/")

