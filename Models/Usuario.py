from Config.db import db, ma, app
from datetime import datetime
import uuid

class Usuario(db.Model):
    __tablename__ = 'tbl_usuario'
    
    # ID como UUID (CHAR(36))
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    correo = db.Column(db.String(255), nullable=False, unique=True)
    contrasena_hash = db.Column(db.String(255), nullable=False)
    nombre = db.Column(db.String(255), nullable=True)
    rol = db.Column(db.String(50), nullable=True, default='usuario')
    creado_en = db.Column(db.TIMESTAMP, nullable=True, default=datetime.utcnow)
    actualizado_en = db.Column(db.TIMESTAMP, nullable=True, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relaciones
    puntos_sugeridos = db.relationship('Punto', backref='usuario_sugerencia', lazy=True)
    intentos_quiz = db.relationship('IntentoQuizUsuario', backref='usuario', lazy=True)
    progreso_lecciones = db.relationship('ProgresoUsuario', backref='usuario', lazy=True)
    certificados = db.relationship('Certificado', backref='usuario', lazy=True)

    def __init__(self, correo, contrasena_hash, nombre=None, rol='usuario'):
        self.correo = correo
        self.contrasena_hash = contrasena_hash
        self.nombre = nombre
        self.rol = rol

class UsuarioSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Usuario
        load_instance = True
        exclude = ('contrasena_hash',)  # No exponer contraseña en JSON
