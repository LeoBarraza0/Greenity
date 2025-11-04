from Config.db import db, ma, app

class PuntoMaterial(db.Model):
    __tablename__ = 'tbl_punto_material'
    
    # Clave primaria compuesta
    punto_id = db.Column(db.Integer, db.ForeignKey('tbl_punto.id'), primary_key=True)
    material_id = db.Column(db.Integer, db.ForeignKey('tbl_material.id'), primary_key=True)
    es_principal = db.Column(db.Boolean, nullable=True, default=False)

    def __init__(self, punto_id, material_id, es_principal=False):
        self.punto_id = punto_id
        self.material_id = material_id
        self.es_principal = es_principal

class PuntoMaterialSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = PuntoMaterial
        load_instance = True
        include_relationships = True

with app.app_context():
    db.create_all()  # Crear tablas si no existen