from Config.db import db, ma, app
from datetime import datetime

class Certificado(db.Model):
    __tablename__ = 'tbl_certificado'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('tbl_usuario.id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False)
    intento_id = db.Column(db.Integer, db.ForeignKey('tbl_intento_quiz_usuario.id', ondelete='CASCADE', onupdate='CASCADE'), nullable=True)
    numero_certificado = db.Column(db.String(100), nullable=False, unique=True)
    emitido_en = db.Column(db.TIMESTAMP, nullable=True, default=datetime.utcnow)
    ruta_archivo = db.Column(db.String(500), nullable=True)
    
    # Relaciones
    certificados = db.relationship('Certificado', backref='usuario', lazy=True, cascade='all, delete-orphan', passive_deletes=True)
    
    def __init__(self, usuario_id, numero_certificado, intento_id=None, ruta_archivo=None):
        self.usuario_id = usuario_id
        self.intento_id = intento_id
        self.numero_certificado = numero_certificado
        self.ruta_archivo = ruta_archivo

class CertificadoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Certificado
        load_instance = True