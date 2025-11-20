from Config.db import db, ma
from datetime import datetime
from sqlalchemy import event

class Certificado(db.Model):
    __tablename__ = 'tbl_certificado'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('tbl_usuario.id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False)
    numero_certificado = db.Column(db.String(100), nullable=False, unique=True)
    emitido_en = db.Column(db.TIMESTAMP, nullable=True, default=datetime.utcnow)
    
    # Relaciones
    usuario = db.relationship('Usuario', backref=db.backref('certificados', lazy=True), lazy=True, passive_deletes=True, foreign_keys=[usuario_id])
    
    def __init__(self, usuario_id, numero_certificado):
        self.usuario_id = usuario_id
        self.numero_certificado = numero_certificado
class CertificadoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Certificado
        load_instance = True


# Evento esencial: autogenerar `numero_certificado` si viene vacío
@event.listens_for(Certificado, 'after_insert')
def _certificado_after_insert(mapper, connection, target):
    try:
        num_val = getattr(target, 'numero_certificado', None)
        if not num_val:
            num = f"CERT-{datetime.utcnow().strftime('%Y%m%d')}-{target.id}"
            connection.execute(
                Certificado.__table__.update()
                .where(Certificado.__table__.c.id == target.id)
                .values(numero_certificado=num)
            )
    except Exception:
        # No detener el flujo si no se puede actualizar (no crítico)
        pass