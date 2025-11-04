from Config.db import db, ma, app
from datetime import datetime

class Punto(db.Model):
    __tablename__ = 'tbl_punto'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(255), nullable=False)
    direccion = db.Column(db.Text, nullable=True)
    lat = db.Column(db.Double, nullable=True)
    lng = db.Column(db.Double, nullable=True)
    es_generico = db.Column(db.Boolean, nullable=True, default=False)
    mostrar_en_mapa = db.Column(db.Boolean, nullable=True, default=True)
    telefono = db.Column(db.String(50), nullable=True)
    datos_crudos = db.Column(db.JSON, nullable=True)
    observaciones = db.Column(db.Text, nullable=True)
    creado_en = db.Column(db.TIMESTAMP, nullable=True, default=datetime.utcnow)
    actualizado_en = db.Column(db.TIMESTAMP, nullable=True, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Claves foráneas
    organizacion_id = db.Column(db.Integer, db.ForeignKey('tbl_organizacion.id'), nullable=True)
    usuario_rel = db.Column(db.String(36), db.ForeignKey('tbl_usuario.id'), nullable=True)
    
    # Relaciones
    materiales = db.relationship('PuntoMaterial', backref='punto', lazy=True)
    contactos = db.relationship('PuntoContacto', backref='punto', lazy=True)
    
    # Índices
    __table_args__ = (
        db.Index('tbl_punto_lat_lng_index', 'lat', 'lng'),
        db.Index('tbl_punto_usuario_rel_index', 'usuario_rel'),
    )

    def __init__(self, nombre, direccion=None, lat=None, lng=None, organizacion_id=None, usuario_rel=None):
        self.nombre = nombre
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

with app.app_context():
    db.create_all()  # Crear tablas si no existen   