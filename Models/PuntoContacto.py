from Config.db import db, ma

class PuntoContacto(db.Model):
    __tablename__ = 'tbl_punto_contacto'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    punto_id = db.Column(db.Integer, db.ForeignKey('tbl_punto.id', ondelete='CASCADE', onupdate='CASCADE'), nullable=True)
    tipo = db.Column(db.String(50), nullable=True)  # 'telefono', 'email', 'whatsapp', etc.
    valor = db.Column(db.String(255), nullable=True)

    def __init__(self, punto_id, tipo, valor):
        self.punto_id = punto_id
        self.tipo = tipo
        self.valor = valor

class PuntoContactoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = PuntoContacto
        load_instance = True