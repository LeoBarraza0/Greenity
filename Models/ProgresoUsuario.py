from Config.db import db, ma, app
from datetime import datetime

class ProgresoUsuario(db.Model):
    __tablename__ = 'tbl_progreso_usuario'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('tbl_usuario.id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False)
    leccion_id = db.Column(db.Integer, db.ForeignKey('tbl_leccion.id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False)
    completado = db.Column(db.Boolean, nullable=True, default=False)
    porcentaje = db.Column(db.Integer, nullable=True)
    actualizado_en = db.Column(db.TIMESTAMP, nullable=True, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    progreso_lecciones = db.relationship('ProgresoUsuario', backref='usuario', lazy=True, cascade='all, delete-orphan', passive_deletes=True)
    
    # Índices y constraints únicos
    __table_args__ = (
        db.Index('tbl_progreso_usuario_usuario_id_leccion_id_index', 'usuario_id', 'leccion_id'),
        db.UniqueConstraint('usuario_id', 'leccion_id', name='tbl_progreso_usuario_usuario_id_leccion_id_unique'),
    )

    def __init__(self, usuario_id, leccion_id, completado=False, porcentaje=None):
        self.usuario_id = usuario_id
        self.leccion_id = leccion_id
        self.completado = completado
        self.porcentaje = porcentaje

class ProgresoUsuarioSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = ProgresoUsuario
        load_instance = True