from flask import Blueprint, request, jsonify, session, redirect, abort
from Config.db import app, db
from Models.Usuario import Usuario, UsuarioSchema
import secrets

# Crear el Blueprint para control de usuarios
routes_User = Blueprint("routes_User", __name__)

user_schema = UsuarioSchema()
personas_schemas = UsuarioSchema(many=True)
users_schema = personas_schemas


# Funciones helper para CSRF
def generate_csrf_token():
    """Genera un token CSRF y lo almacena en la sesión"""
    if 'csrf_token' not in session:
        session['csrf_token'] = secrets.token_urlsafe(32)
    return session['csrf_token']

def validar_csrf(token_from_request):
    """Valida el token CSRF recibido contra el almacenado en la sesión"""
    token_session = session.get('csrf_token')
    return token_session and secrets.compare_digest(token_session, token_from_request or "")


@routes_User.route("/login", methods=['POST'])
def login():
    """Endpoint para procesar el login del usuario"""
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


@routes_User.route("/register", methods=['POST'])
def register():
    """Endpoint para registrar nuevos usuarios"""
    token = request.headers.get('X-CSRF-Token') or request.form.get('csrf_token')
    if not validar_csrf(token):
        abort(403, description="CSRF Token Inválido")
    # aceptar JSON o form
    payload = request.get_json(silent=True)
    if payload is None:
        data = request.form.to_dict()
    else:
        data = payload

    name = data.get('name', '')
    email = data.get('email', '')
    password = data.get('password', '')
    confirm_password = data.get('confirm_password', '')

    # Validaciones básicas
    if password != confirm_password:
        return jsonify({
            "status": 400,
            "message": "Las contraseñas no coinciden"
        }), 400

    if len(password) < 6:
        return jsonify({
            "status": 400,
            "message": "La contraseña debe tener al menos 6 caracteres"
        }), 400

    # Normalizar correo
    email = email.lower() if email else email

    new_user = Usuario(correo=email, contrasena_hash=password, nombre=name, rol='usuario')
    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({
            "status": 400,
            "message": "No se pudo registrar el usuario",
            "detail": str(e)
        }), 400

    # Responder manteniendo el formato original y agregando datos del usuario
    return jsonify({
        "status": 200,
        "message": "Usuario registrado exitosamente",
        "url": "/Main",
        "user": user_schema.dump(new_user)
    }), 201


@routes_User.route("/logout")
def logout():
    """Endpoint para cerrar sesión del usuario"""
    session.clear()
    return redirect("/")


# --- CRUD API para Usuarios -----------------------------------------
@routes_User.route('/usuario', methods=['GET'])
def list_usuarios():
    all_users = Usuario.query.all()
    result = users_schema.dump(all_users)
    return jsonify(result)


@routes_User.route('/usuario/<int:id>', methods=['GET'])
def get_usuario(id):
    u = Usuario.query.get(id)
    if not u:
        return jsonify({'message': 'Usuario no encontrado'}), 404
    return user_schema.jsonify(u)


@routes_User.route('/usuario/<int:id>', methods=['PUT'])
def update_usuario(id):
    u = Usuario.query.get(id)
    if not u:
        return jsonify({'message': 'Usuario no encontrado'}), 404

    data = request.get_json() or {}
    correo = data.get('correo', u.correo)
    nombre = data.get('nombre', u.nombre)
    rol = data.get('rol', u.rol)
    contrasena = data.get('contrasena_hash', None)

    u.correo = correo.lower() if correo else u.correo
    u.nombre = nombre
    u.rol = rol
    if contrasena:
        u.contrasena_hash = contrasena

    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'No se pudo actualizar el usuario', 'detail': str(e)}), 400

    return user_schema.jsonify(u)


@routes_User.route('/usuario/<int:id>', methods=['DELETE'])
def delete_usuario(id):
    u = Usuario.query.get(id)
    if not u:
        return jsonify({'message': 'Usuario no encontrado'}), 404

    try:
        db.session.delete(u)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'No se pudo eliminar el usuario', 'detail': str(e)}), 400

    return jsonify({'message': 'Usuario eliminado correctamente'}), 200
