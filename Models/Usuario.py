from Config.db import db, ma, app
from datetime import datetime
from sqlalchemy import event

class Usuario(db.Model):
    __tablename__ = 'tbl_usuario'
    
    id = db.Column(db.Integer , primary_key=True, autoincrement=True)
    correo = db.Column(db.String(255), nullable=False, unique=True)
    contrasena_hash = db.Column(db.String(255), nullable=False)
    nombre = db.Column(db.String(255), nullable=True)
    rol = db.Column(db.String(50), nullable=True, default='usuario')
    creado_en = db.Column(db.TIMESTAMP, nullable=True, default=datetime.utcnow)
    actualizado_en = db.Column(db.TIMESTAMP, nullable=True, default=datetime.utcnow, onupdate=datetime.utcnow)


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


# Eventos esenciales: normalizar correo y actualizar `actualizado_en`
@event.listens_for(Usuario, 'before_insert')
def _usuario_before_insert(mapper, connection, target):
    if getattr(target, 'correo', None):
        target.correo = target.correo.lower()


@event.listens_for(Usuario, 'before_update')
def _usuario_before_update(mapper, connection, target):
    if getattr(target, 'correo', None):
        target.correo = target.correo.lower()
    try:
        target.actualizado_en = datetime.utcnow()
    except Exception:
        # No bloquear actualizaciones si no se puede setear el timestamp
        pass