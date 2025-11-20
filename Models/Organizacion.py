from Config.db import db, ma
from datetime import datetime

class Organizacion(db.Model):
    __tablename__ = 'tbl_organizacion'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(255), nullable=False)
    sitio_web = db.Column(db.String(500), nullable=True)
    telefono = db.Column(db.String(50), nullable=True)
    direccion = db.Column(db.Text, nullable=True)
    creado_en = db.Column(db.TIMESTAMP, nullable=True, default=datetime.utcnow)
    
    # Relaciones
    puntos = db.relationship('Punto', backref='organizacion', lazy=True, cascade='all, delete-orphan', passive_deletes=True)

    def __init__(self, nombre, sitio_web=None, telefono=None, direccion=None):
        self.nombre = nombre
        self.sitio_web = sitio_web
        self.telefono = telefono
        self.direccion = direccion

class OrganizacionSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Organizacion
        load_instance = True