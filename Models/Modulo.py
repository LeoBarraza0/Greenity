from Config.db import db, ma, app
from datetime import datetime

class Modulo(db.Model):
    __tablename__ = 'tbl_modulo'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    titulo = db.Column(db.String(255), nullable=False)
    icono = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.Text, nullable=False)
    indice_orden = db.Column(db.Integer, nullable=False)
    creado_en = db.Column(db.TIMESTAMP, nullable=True, default=datetime.utcnow)
    
    # Relaciones
    #lecciones = db.relationship('Leccion', backref='modulo', lazy=True)

    def __init__(self, titulo, icono, descripcion, indice_orden):
        self.titulo = titulo
        self.icono = icono
        self.descripcion = descripcion
        self.indice_orden = indice_orden

class ModuloSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Modulo
        load_instance = True
        include_relationships = True