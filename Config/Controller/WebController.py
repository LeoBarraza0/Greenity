from flask import Blueprint, render_template, session, request, jsonify, current_app
from Config.db import app, db, mail
from flask_mail import Message
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


@routes_Web.route('/submit_sugerencia', methods=['POST'])
def submit_sugerencia():
    """Recibe la sugerencia desde el formulario 'Sugerir Punto' y la envía por correo."""
    try:
        print("=== Iniciando submit_sugerencia ===")
        print(f"request.form keys: {request.form.keys()}")
        
        # Validar que el usuario aceptó términos
        terms = request.form.get('terms')
        if not terms or terms.lower() not in ['on', 'true']:
            print("Términos no aceptados")
            return jsonify({'status': 'error', 'message': 'Debes aceptar los términos y condiciones'}), 400
        
        # Mapeo de códigos de materiales a nombres en español
        materials_map = {
            'pet': 'PET (Botellas)',
            'hdpe': 'HDPE (Envases)',
            'pvc': 'PVC',
            'ldpe': 'LDPE (Bolsas)',
            'newspaper': 'Periódicos',
            'magazines': 'Revistas',
            'cardboard': 'Cartón Corrugado',
            'office_paper': 'Papel de Oficina',
            'clear_glass': 'Vidrio Transparente',
            'jars': 'Frascos',
            'white_glass': 'Vidrio Blanco',
            'colored_glass': 'Vidrio de Color',
            'aluminum_cans': 'Latas de Aluminio',
            'metal_structures': 'Estructuras Metálicas',
            'steel_cans': 'Latas de Acero',
            'cables': 'Cables Metálicos',
            'batteries': 'Pilas y Baterías',
            'phones': 'Teléfonos Móviles',
            'computers': 'Computadoras y Laptops',
            'electrical_cables': 'Cables Eléctricos',
            'clothing': 'Ropa y Telas',
            'furniture': 'Muebles Usados',
            'tires': 'Neumáticos',
            'chemicals': 'Químicos y Tóxicos',
        }
        
        # Obtener y traducir materiales seleccionados
        materials = request.form.getlist('materials')
        materials_spanish = [materials_map.get(m, m) for m in materials]
        
        # Obtener datos del formulario
        point_data = {
            'Nombre del Punto': request.form.get('pointName', ''),
            'Tipo de Punto': request.form.get('pointType', ''),
            'Descripción': request.form.get('description', ''),
            'Dirección': request.form.get('address', ''),
            'Ciudad': request.form.get('city', ''),
            'Estado': request.form.get('state', ''),
            'Código Postal': request.form.get('postalCode', ''),
            'Horarios': request.form.get('schedule', ''),
            'Teléfono': request.form.get('phone', ''),
            'Sitio Web': request.form.get('website', ''),
            'Información Adicional': request.form.get('additionalInfo', ''),
        }
        
        # Construir HTML del correo con estilo profesional
        html_body = f"""
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px;">
            <div style="max-width: 700px; margin: 0 auto; background-color: white; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
                
                <!-- Header Verde -->
                <div style="background: linear-gradient(135deg, #22c55e, #16a34a); color: white; padding: 30px 20px; text-align: center;">
                    <h1 style="margin: 0; font-size: 28px; font-weight: 700;">✓ Nueva Sugerencia Recibida</h1>
                    <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Greenity - Red de Reciclaje Comunitaria</p>
                </div>
                
                <!-- Contenido Principal -->
                <div style="padding: 30px 20px;">
                    
                    <!-- Información Básica -->
                    <div style="margin-bottom: 25px;">
                        <h2 style="color: #22c55e; font-size: 18px; margin: 0 0 15px 0; border-bottom: 2px solid #22c55e; padding-bottom: 10px;">ℹ️ Información Básica</h2>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px; color: #666; font-weight: 600; width: 40%;">Nombre del Punto:</td>
                                <td style="padding: 8px; color: #333;">{point_data['Nombre del Punto']}</td>
                            </tr>
                            <tr style="background-color: #f9f9f9;">
                                <td style="padding: 8px; color: #666; font-weight: 600;">Tipo de Punto:</td>
                                <td style="padding: 8px; color: #333;">{point_data['Tipo de Punto']}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; color: #666; font-weight: 600;">Descripción:</td>
                                <td style="padding: 8px; color: #333;">{point_data['Descripción']}</td>
                            </tr>
                        </table>
                    </div>
                    
                    <!-- Ubicación -->
                    <div style="margin-bottom: 25px;">
                        <h2 style="color: #22c55e; font-size: 18px; margin: 0 0 15px 0; border-bottom: 2px solid #22c55e; padding-bottom: 10px;">📍 Ubicación</h2>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px; color: #666; font-weight: 600; width: 40%;">Dirección:</td>
                                <td style="padding: 8px; color: #333;">{point_data['Dirección']}</td>
                            </tr>
                            <tr style="background-color: #f9f9f9;">
                                <td style="padding: 8px; color: #666; font-weight: 600;">Ciudad:</td>
                                <td style="padding: 8px; color: #333;">{point_data['Ciudad']}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; color: #666; font-weight: 600;">Estado:</td>
                                <td style="padding: 8px; color: #333;">{point_data['Estado']}</td>
                            </tr>
                            <tr style="background-color: #f9f9f9;">
                                <td style="padding: 8px; color: #666; font-weight: 600;">Código Postal:</td>
                                <td style="padding: 8px; color: #333;">{point_data['Código Postal']}</td>
                            </tr>
                        </table>
                    </div>
                    
                    <!-- Materiales Aceptados -->
                    <div style="margin-bottom: 25px;">
                        <h2 style="color: #22c55e; font-size: 18px; margin: 0 0 15px 0; border-bottom: 2px solid #22c55e; padding-bottom: 10px;">♻️ Materiales Aceptados</h2>
                        <div style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(22, 163, 74, 0.05)); padding: 15px; border-radius: 8px; border-left: 4px solid #22c55e;">
                            <p style="margin: 0; color: #333; line-height: 1.8;">
                                {', '.join(materials_spanish) if materials_spanish else 'No especificado'}
                            </p>
                        </div>
                    </div>
                    
                    <!-- Horarios y Contacto -->
                    <div style="margin-bottom: 25px;">
                        <h2 style="color: #22c55e; font-size: 18px; margin: 0 0 15px 0; border-bottom: 2px solid #22c55e; padding-bottom: 10px;">⏰ Horarios y Contacto</h2>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px; color: #666; font-weight: 600; width: 40%;">Horarios:</td>
                                <td style="padding: 8px; color: #333;">{point_data['Horarios']}</td>
                            </tr>
                            <tr style="background-color: #f9f9f9;">
                                <td style="padding: 8px; color: #666; font-weight: 600;">Teléfono:</td>
                                <td style="padding: 8px; color: #333;">{point_data['Teléfono']}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; color: #666; font-weight: 600;">Sitio Web:</td>
                                <td style="padding: 8px; color: #333;">{point_data['Sitio Web']}</td>
                            </tr>
                        </table>
                    </div>
                    
                    <!-- Información Adicional -->
                    {f'''<div style="margin-bottom: 25px;">
                        <h2 style="color: #22c55e; font-size: 18px; margin: 0 0 15px 0; border-bottom: 2px solid #22c55e; padding-bottom: 10px;">ℹ️ Información Adicional</h2>
                        <div style="background: #f9f9f9; padding: 15px; border-radius: 8px;">
                            <p style="margin: 0; color: #333; line-height: 1.6;">{point_data['Información Adicional']}</p>
                        </div>
                    </div>''' if point_data['Información Adicional'] else ''}
                    
                </div>
                
                <!-- Footer -->
                <div style="background-color: #f5f5f5; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0; color: #666; font-size: 12px;">
                        Este correo fue generado automáticamente por el sistema de Greenity.<br>
                        Por favor, verifica la información y publícala en la plataforma cuando sea apropiado.
                    </p>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Preparar mensaje
        subject = "Nueva sugerencia de punto de reciclaje - Greenity"
        sender = current_app.config.get('MAIL_DEFAULT_SENDER', 'noreply@greenity.com')
        recipient = current_app.config.get('MAIL_USERNAME') or sender

        msg = Message(
            subject=subject,
            sender=sender,
            recipients=[recipient],
            html=html_body
        )

        # Adjuntar archivos recibidos (fotos)
        if 'photos' in request.files:
            files = request.files.getlist('photos')
            for file in files:
                if file and file.filename:
                    try:
                        data = file.read()
                        msg.attach(file.filename, file.content_type or 'application/octet-stream', data)
                        print(f"Adjuntado: {file.filename}")
                    except Exception as e:
                        print(f"Error adjuntando {file.filename}: {e}")

        # Enviar correo
        try:
            mail.send(msg)
            print("Correo enviado exitosamente")
            return jsonify({'status': 'ok', 'message': 'Sugerencia enviada correctamente. Gracias por contribuir.'}), 200
        except Exception as mail_error:
            print(f"Error al enviar correo: {mail_error}")
            # Aún así, retornar éxito si el formulario fue validado
            # (útil si no hay credenciales de email configuradas en desarrollo)
            return jsonify({
                'status': 'ok',
                'message': 'Sugerencia recibida. (Email: modo offline)'
            }), 200
            
    except Exception as e:
        print(f"Error al procesar sugerencia: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({'status': 'error', 'message': f'Error: {str(e)}'}), 500

