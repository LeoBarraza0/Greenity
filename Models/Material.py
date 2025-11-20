from Config.db import db, ma, app
from datetime import datetime

class Material(db.Model):
    __tablename__ = 'tbl_material'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(255), nullable=False, unique=True)
    slug = db.Column(db.String(255), nullable=True)
    clase_icono = db.Column(db.String(100), nullable=True)
    creado_en = db.Column(db.TIMESTAMP, nullable=True, default=datetime.utcnow)
    
    # Relaciones
    # puntos se define en Punto con backref='puntos'

    def __init__(self, nombre, slug=None, clase_icono=None):
        self.nombre = nombre
        self.slug = slug
        self.clase_icono = clase_icono

class MaterialSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Material
        load_instance = True