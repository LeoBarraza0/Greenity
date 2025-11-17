from flask import Blueprint, request, jsonify, session, redirect, abort
from Config.db import db
from Models.Usuario import Usuario, UsuarioSchema
from werkzeug.security import check_password_hash
import secrets
import os
import base64
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.backends import default_backend

# Crear el Blueprint para control de usuarios
routes_User = Blueprint("routes_User", __name__)

user_schema = UsuarioSchema()
personas_schemas = UsuarioSchema(many=True)
users_schema = personas_schemas


# --- Hash helpers (cryptography PBKDF2) -------------------------
def hash_password_crypt(password_plain: str) -> str:
    salt = os.urandom(16)
    iterations = 100000
    kdf = PBKDF2HMAC(algorithm=hashes.SHA256(), length=32, salt=salt, iterations=iterations, backend=default_backend())
    key = kdf.derive(password_plain.encode())
    return f"crypt$pbkdf2${iterations}${base64.urlsafe_b64encode(salt).decode()}${base64.urlsafe_b64encode(key).decode()}"


def verify_password(stored_value: str, password_plain: str):
    # returns (ok: bool, migrated_hash_or_none)
    if not stored_value:
        return False, None
    if stored_value.startswith('crypt$pbkdf2$'):
        try:
            parts = stored_value.split('$')
            # format: crypt$pbkdf2$iterations$salt_b64$key_b64
            _, _meth, iterations_s, salt_b64, key_b64 = parts
            iterations = int(iterations_s)
            salt = base64.urlsafe_b64decode(salt_b64.encode())
            key = base64.urlsafe_b64decode(key_b64.encode())
            kdf = PBKDF2HMAC(algorithm=hashes.SHA256(), length=len(key), salt=salt, iterations=iterations, backend=default_backend())
            kdf.verify(password_plain.encode(), key)
            return True, None
        except Exception:
            return False, None
    elif stored_value.startswith('pbkdf2:'):
        # werkzeug format
        try:
            ok = check_password_hash(stored_value, password_plain)
            if ok:
                # migrate to crypt format
                return True, hash_password_crypt(password_plain)
            return False, None
        except Exception:
            return False, None
    else:
        # plaintext fallback
        if stored_value == password_plain:
            return True, hash_password_crypt(password_plain)
        return False, None


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

    user = Usuario.query.filter_by(correo=email).first()
    if not user:
        print(f"Usuario no encontrado: {email}")
        return jsonify({"status": 401, "message": "Credenciales inválidas"}), 401

    stored = user.contrasena_hash or ''

    ok, migrated = verify_password(stored, password)
    if ok:
        if migrated:
            try:
                user.contrasena_hash = migrated
                db.session.commit()
            except Exception:
                db.session.rollback()
        session['user_authenticated'] = True
        session['user_email'] = email
        print("Login exitoso")
        return jsonify({"status": 200, "message": "Login exitoso", "url": "/"})

    print(f"Credenciales inválidas para: {email}")
    return jsonify({"status": 401, "message": "Credenciales inválidas"}), 401


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

    name = data.get('name') or data.get('nombre') or ''
    email = data.get('email') or data.get('correo') or ''
    password = data.get('password') or data.get('contrasena') or data.get('contrasena_hash') or ''
    confirm_password = data.get('confirm_password') or data.get('confirm-password') or ''

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

    # Hash password before storing using cryptography PBKDF2 format
    hashed = hash_password_crypt(password)
    new_user = Usuario(correo=email, contrasena_hash=hashed, nombre=name, rol='usuario')
    try:
        db.session.add(new_user)
        db.session.commit()
        session['user_authenticated'] = True
        session['user_email'] = email
    except Exception as e:
        db.session.rollback()
        return jsonify({
            "status": 400,
            "message": "No se pudo registrar el usuario",
            "detail": str(e)
        }), 400

    # Responder manteniendo el formato original y agregando datos del usuario
    # Usar status 200 en el JSON porque el frontend espera `data.status === 200`.
    # Devolver url '/Main' para que la UI redirija a la vista principal ya autenticada.
    return jsonify({
        "status": 200,
        "message": "Usuario registrado exitosamente",
        "url": "/",
        "user": user_schema.dump(new_user)
    }), 200


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
    # aceptamos varios nombres para el password en el body
    contrasena = data.get('contrasena') or data.get('password') or data.get('contrasena_hash')

    u.correo = correo.lower() if correo else u.correo
    u.nombre = nombre
    u.rol = rol
    if contrasena:
        # Si el cliente ya envió un hash reconocible, guardarlo tal cual (compatible)
        if isinstance(contrasena, str) and (contrasena.startswith('crypt$pbkdf2$') or contrasena.startswith('pbkdf2:')):
            u.contrasena_hash = contrasena
        else:
            # hashear la contraseña en texto plano antes de guardar
            u.contrasena_hash = hash_password_crypt(contrasena)

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