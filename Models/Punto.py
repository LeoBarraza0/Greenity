from Config.db import db, ma, app
from datetime import datetime
from sqlalchemy import event

class Punto(db.Model):
    __tablename__ = 'tbl_punto'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(255), nullable=False)
    direccion = db.Column(db.Text, nullable=True)
    lat = db.Column(db.Float, nullable=True)
    lng = db.Column(db.Float, nullable=True)
    es_generico = db.Column(db.Boolean, nullable=True, default=False)
    mostrar_en_mapa = db.Column(db.Boolean, nullable=True, default=True)
    telefono = db.Column(db.String(50), nullable=True)
    datos_crudos = db.Column(db.JSON, nullable=True)
    observaciones = db.Column(db.Text, nullable=True)
    creado_en = db.Column(db.TIMESTAMP, nullable=True, default=datetime.utcnow)
    actualizado_en = db.Column(db.TIMESTAMP, nullable=True, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Claves foráneas
    organizacion_id = db.Column(db.Integer, db.ForeignKey('tbl_organizacion.id', ondelete='CASCADE', onupdate='CASCADE'), nullable=True)
    id_material = db.Column(db.Integer, db.ForeignKey('tbl_material.id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False)
    usuario_rel = db.Column(db.String(36), db.ForeignKey('tbl_usuario.id', ondelete='CASCADE', onupdate='CASCADE'), nullable=True)
    
    # Relaciones
    # `usuario_rel` referencia a `Usuario`; exponer `usuario_sugerencia` en el punto
    # y `puntos_sugeridos` en el usuario.
    usuario_sugerencia = db.relationship('Usuario', backref=db.backref('puntos_sugeridos', lazy=True), lazy=True, passive_deletes=True, foreign_keys=[usuario_rel])
    material = db.relationship('Material', backref='puntos', lazy=True, passive_deletes=True, foreign_keys=[id_material])
    contactos = db.relationship('PuntoContacto', backref='punto', lazy=True, cascade='all, delete-orphan', passive_deletes=True)
    
    # Índices
    __table_args__ = (
        db.Index('tbl_punto_lat_lng_index', 'lat', 'lng'),
        db.Index('tbl_punto_usuario_rel_index', 'usuario_rel'),
    )

    def __init__(self, nombre, id_material, direccion=None, lat=None, lng=None, organizacion_id=None, usuario_rel=None):
        self.nombre = nombre
        self.id_material = id_material
        self.direccion = direccion
        self.lat = lat
        self.lng = lng
        self.organizacion_id = organizacion_id
        self.usuario_rel = usuario_rel

class PuntoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Punto
        load_instance = True
        include_relationships = True


# Evento esencial: actualizar `actualizado_en` antes de update
@event.listens_for(Punto, 'before_update')
def _punto_before_update(mapper, connection, target):
    try:
        target.actualizado_en = datetime.utcnow()
    except Exception:
        pass