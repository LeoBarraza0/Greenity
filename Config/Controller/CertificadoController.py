from flask import Blueprint, request, jsonify, session
from Models.Certificado import Certificado, CertificadoSchema
from Config.db import db
import uuid
from datetime import datetime

routes_certificadoC = Blueprint('routes_certificadoC', __name__)

Certificado_schema = CertificadoSchema()
Certificados_schema = CertificadoSchema(many=True)


# ============= CREATE - Crear certificado =============
@routes_certificadoC.route('/certificados', methods=['POST'])
def crear_certificado():
    """Crear un nuevo certificado para el usuario autenticado"""
    # Obtener ID del usuario desde la sesión
    usuario_id = session.get('user_id')
    
    # Verificar autenticación
    if not usuario_id:
        return jsonify({
            'status': 401,
            'message': 'Usuario no autenticado. Debes iniciar sesión.'
        }), 401
    
    # Obtener datos opcionales del request
    data = request.get_json() or {}
    
    # Generar número de certificado único automáticamente
    fecha = datetime.utcnow().strftime('%Y%m%d')
    unique_id = str(uuid.uuid4())[:8].upper()
    numero_certificado = data.get('numero_certificado') or f"CERT-{fecha}-{unique_id}"
    
    try:
        # Crear certificado con el usuario_id de la sesión
        nuevo_certificado = Certificado(
            usuario_id=usuario_id,  # ID obtenido de la sesión
            numero_certificado=numero_certificado
        )
        
        db.session.add(nuevo_certificado)
        db.session.commit()
        
        return jsonify({
            'status': 200,
            'message': 'Certificado creado exitosamente',
            'certificado': Certificado_schema.dump(nuevo_certificado)
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'status': 400,
            'message': 'Error al crear el certificado',
            'detail': str(e)
        }), 400


# ============= READ - Listar todos los certificados del usuario =============
@routes_certificadoC.route('/certificados', methods=['GET'])
def listar_certificados():
    """Listar todos los certificados del usuario autenticado"""
    usuario_id = session.get('user_id')
    
    if not usuario_id:
        return jsonify({
            'status': 401,
            'message': 'Usuario no autenticado'
        }), 401
    
    try:
        # Solo mostrar certificados del usuario autenticado
        certificados = Certificado.query.filter_by(usuario_id=usuario_id).all()
        result = Certificados_schema.dump(certificados)
        
        return jsonify({
            'status': 200,
            'total': len(result),
            'certificados': result
        })
    except Exception as e:
        return jsonify({
            'status': 500,
            'message': 'Error al obtener certificados',
            'detail': str(e)
        }), 500


# ============= READ - Obtener un certificado específico =============
@routes_certificadoC.route('/certificados/<int:id>', methods=['GET'])
def obtener_certificado(id):
    """Obtener un certificado específico del usuario autenticado"""
    usuario_id = session.get('user_id')
    
    if not usuario_id:
        return jsonify({
            'status': 401,
            'message': 'Usuario no autenticado'
        }), 401
    
    try:
        # Buscar certificado que pertenezca al usuario
        certificado = Certificado.query.filter_by(
            id=id, 
            usuario_id=usuario_id
        ).first()
        
        if not certificado:
            return jsonify({
                'status': 404,
                'message': 'Certificado no encontrado o no pertenece al usuario'
            }), 404
        
        return jsonify({
            'status': 200,
            'certificado': Certificado_schema.dump(certificado)
        })
    except Exception as e:
        return jsonify({
            'status': 500,
            'message': 'Error al obtener el certificado',
            'detail': str(e)
        }), 500


# ============= UPDATE - Actualizar certificado =============
@routes_certificadoC.route('/certificados/<int:id>', methods=['PUT'])
def actualizar_certificado(id):
    """Actualizar un certificado del usuario autenticado"""
    usuario_id = session.get('user_id')
    
    if not usuario_id:
        return jsonify({
            'status': 401,
            'message': 'Usuario no autenticado'
        }), 401
    
    try:
        # Buscar certificado que pertenezca al usuario
        certificado = Certificado.query.filter_by(
            id=id, 
            usuario_id=usuario_id
        ).first()
        
        if not certificado:
            return jsonify({
                'status': 404,
                'message': 'Certificado no encontrado o no pertenece al usuario'
            }), 404
        
        data = request.get_json() or {}
        
        # Actualizar solo el número de certificado
        if 'numero_certificado' in data:
            nuevo_numero = data['numero_certificado']
            
            # Verificar que el nuevo número no exista en otro certificado
            existe = Certificado.query.filter(
                Certificado.numero_certificado == nuevo_numero,
                Certificado.id != id
            ).first()
            
            if existe:
                return jsonify({
                    'status': 400,
                    'message': 'El número de certificado ya existe'
                }), 400
            
            certificado.numero_certificado = nuevo_numero
        
        db.session.commit()
        
        return jsonify({
            'status': 200,
            'message': 'Certificado actualizado exitosamente',
            'certificado': Certificado_schema.dump(certificado)
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'status': 400,
            'message': 'Error al actualizar el certificado',
            'detail': str(e)
        }), 400


# ============= DELETE - Eliminar certificado =============
@routes_certificadoC.route('/certificados/<int:id>', methods=['DELETE'])
def eliminar_certificado(id):
    """Eliminar un certificado del usuario autenticado"""
    usuario_id = session.get('user_id')
    
    if not usuario_id:
        return jsonify({
            'status': 401,
            'message': 'Usuario no autenticado'
        }), 401
    
    try:
        # Buscar certificado que pertenezca al usuario
        certificado = Certificado.query.filter_by(
            id=id, 
            usuario_id=usuario_id
        ).first()
        
        if not certificado:
            return jsonify({
                'status': 404,
                'message': 'Certificado no encontrado o no pertenece al usuario'
            }), 404
        
        db.session.delete(certificado)
        db.session.commit()
        
        return jsonify({
            'status': 200,
            'message': 'Certificado eliminado correctamente'
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'status': 400,
            'message': 'Error al eliminar el certificado',
            'detail': str(e)
        }), 400
