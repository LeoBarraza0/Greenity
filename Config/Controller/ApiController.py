from flask import Blueprint, jsonify, request, session
from flask_mail import Message
from Config.db import app, mail
from Config.Controller.UserController import generate_csrf_token, validar_csrf
from datetime import datetime
import json
import os

# Crear el Blueprint para APIs (siguiendo la lógica del profesor)
routes_Api = Blueprint("routes_Api", __name__)

@routes_Api.route("/api/puntos-reciclaje")
def get_puntos_reciclaje():
    """Endpoint para obtener los datos del scraping de puntos de reciclaje"""
    try:
        # Ruta al archivo JSON generado por el scraping (en la raíz del proyecto)
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        json_file_path = os.path.join(base_dir, 'puntos_reciclaje_barranquilla.json')
        
        # Verificar si el archivo existe
        if not os.path.exists(json_file_path):
            return jsonify({
                "success": False,
                "error": "Archivo de datos no encontrado",
                "data": []
            }), 404
        
        # Leer y retornar los datos
        with open(json_file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        return jsonify(data)
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Error al cargar datos: {str(e)}",
            "data": []
        }), 500

@routes_Api.route("/api/ejecutar-scraping", methods=['POST'])
def ejecutar_scraping():
    """Endpoint para ejecutar el scraping y actualizar los datos"""
    try:
        # Importar y ejecutar el scraper
        from scraping import RecyclingPointsScraper
        
        scraper = RecyclingPointsScraper()
        data = scraper.scrape()
        
        if data.get('success'):
            # Guardar los datos actualizados
            scraper.save_to_json(data)
            return jsonify({
                "success": True,
                "message": "Scraping ejecutado exitosamente",
                "estadisticas": data.get('estadisticas', {})
            })
        else:
            return jsonify({
                "success": False,
                "error": data.get('error', 'Error desconocido')
            }), 500
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Error ejecutando scraping: {str(e)}"
        }), 500

@routes_Api.route("/api/contacto", methods=['POST'])
def enviar_contacto():
    """Endpoint para procesar y enviar el formulario de contacto por correo"""
    try:
        # Verificar que las credenciales de correo estén configuradas
        mail_password = app.config.get('MAIL_PASSWORD', '')
        mail_username = app.config.get('MAIL_USERNAME', '')
        
        if not mail_password or mail_password == '':
            return jsonify({
                "success": False,
                "error": "Error de configuración: Las credenciales de correo no están configuradas. Por favor, configura la variable de entorno MAIL_PASSWORD con una App Password de Gmail."
            }), 500
        
        # Validar token CSRF
        token = request.headers.get('X-CSRF-Token') or request.form.get('csrf_token') or request.json.get('csrf_token') if request.is_json else None
        if not validar_csrf(token):
            return jsonify({
                "success": False,
                "error": "Token CSRF inválido"
            }), 403
        
        # Obtener datos del formulario (puede venir como form-data o JSON)
        if request.is_json:
            data = request.json
        else:
            data = request.form.to_dict()
        
        # Validar campos requeridos
        required_fields = ['fullName', 'email', 'category', 'subject', 'message']
        missing_fields = [field for field in required_fields if not data.get(field)]
        
        if missing_fields:
            return jsonify({
                "success": False,
                "error": f"Campos requeridos faltantes: {', '.join(missing_fields)}"
            }), 400
        
        # Extraer datos del formulario
        nombre = data.get('fullName', '').strip()
        email_usuario = data.get('email', '').strip()
        categoria = data.get('category', '').strip()
        asunto = data.get('subject', '').strip()
        mensaje = data.get('message', '').strip()
        
        # Validar formato de email
        if '@' not in email_usuario or '.' not in email_usuario.split('@')[1]:
            return jsonify({
                "success": False,
                "error": "Email inválido"
            }), 400
        
        # Mapear categorías a nombres legibles
        categorias_map = {
            'general': 'Consulta General',
            'technical': 'Soporte Técnico',
            'suggestion': 'Sugerencia',
            'report': 'Reportar Problema',
            'business': 'Asociación Comercial'
        }
        categoria_nombre = categorias_map.get(categoria, categoria)
        
        # Crear el cuerpo del correo con formato HTML
        email_body = f"""
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: linear-gradient(135deg, #22c55e, #16a34a); color: white; padding: 20px; border-radius: 10px 10px 0 0; }}
                .content {{ background: #f8fafc; padding: 20px; border: 1px solid #e5e7eb; }}
                .field {{ margin-bottom: 15px; }}
                .label {{ font-weight: bold; color: #22c55e; margin-bottom: 5px; display: block; }}
                .value {{ background: white; padding: 10px; border-radius: 5px; border-left: 3px solid #22c55e; }}
                .footer {{ background: #e5e7eb; padding: 15px; text-align: center; border-radius: 0 0 10px 10px; font-size: 0.9em; color: #666; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2 style="margin: 0;">Nuevo Mensaje de Contacto - Greenity</h2>
                </div>
                <div class="content">
                    <div class="field">
                        <span class="label">Nombre completo:</span>
                        <div class="value">{nombre}</div>
                    </div>
                    <div class="field">
                        <span class="label">Email:</span>
                        <div class="value">{email_usuario}</div>
                    </div>
                    <div class="field">
                        <span class="label">Categoría:</span>
                        <div class="value">{categoria_nombre}</div>
                    </div>
                    <div class="field">
                        <span class="label">Asunto:</span>
                        <div class="value">{asunto}</div>
                    </div>
                    <div class="field">
                        <span class="label">Mensaje:</span>
                        <div class="value" style="white-space: pre-wrap;">{mensaje}</div>
                    </div>
                </div>
                <div class="footer">
                    <p>Este mensaje fue enviado desde el formulario de contacto de Greenity</p>
                    <p>Fecha: {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Crear el mensaje de correo
        msg = Message(
            subject=f'[Greenity Contacto] {asunto} - {categoria_nombre}',
            recipients=['greenity.contacto@gmail.com'],
            html=email_body,
            reply_to=email_usuario  # Permite responder directamente al usuario
        )
        
        # Enviar el correo
        mail.send(msg)
        
        return jsonify({
            "success": True,
            "message": "Mensaje enviado exitosamente. Te responderemos en 24 horas."
        }), 200
        
    except Exception as e:
        error_msg = str(e)
        print(f"Error al enviar correo de contacto: {error_msg}")
        
        # Mensajes de error más descriptivos
        if "Authentication Required" in error_msg or "5.7.0" in error_msg:
            return jsonify({
                "success": False,
                "error": "Error de autenticación con Gmail. Por favor, verifica que hayas configurado una App Password (no tu contraseña normal) en la variable de entorno MAIL_PASSWORD. Consulta EMAIL_CONFIGURATION.md para más detalles."
            }), 500
        elif "SMTPAuthenticationError" in error_msg or "authentication failed" in error_msg.lower():
            return jsonify({
                "success": False,
                "error": "Las credenciales de Gmail son incorrectas. Asegúrate de usar una App Password, no tu contraseña normal. Ve a myaccount.google.com/apppasswords para generar una."
            }), 500
        else:
            return jsonify({
                "success": False,
                "error": f"Error al enviar el mensaje: {error_msg}"
            }), 500

