from Config.db import db, ma, app
from datetime import datetime

class IntentoQuizUsuario(db.Model):
    __tablename__ = 'tbl_intento_quiz_usuario'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    usuario_id = db.Column(db.String(36), db.ForeignKey('tbl_usuario.id'), nullable=False)
    leccion_id = db.Column(db.Integer, db.ForeignKey('tbl_leccion.id'), nullable=False)
    puntaje = db.Column(db.Integer, nullable=True)
    total_preguntas = db.Column(db.Integer, nullable=True)
    aprobado = db.Column(db.Boolean, nullable=True, default=False)
    realizado_en = db.Column(db.TIMESTAMP, nullable=True, default=datetime.utcnow)
    
    # Relaciones
    certificados = db.relationship('Certificado', backref='intento_quiz', lazy=True)
    
    # Índices
    __table_args__ = (
        db.Index('tbl_intento_quiz_usuario_usuario_id_leccion_id_index', 'usuario_id', 'leccion_id'),
    )

    def __init__(self, usuario_id, leccion_id, puntaje=None, total_preguntas=None, aprobado=False):
        self.usuario_id = usuario_id
        self.leccion_id = leccion_id
        self.puntaje = puntaje
        self.total_preguntas = total_preguntas
        self.aprobado = aprobado

class IntentoQuizUsuarioSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = IntentoQuizUsuario
        load_instance = True

with app.app_context():
    db.create_all()  # Crear tablas si no existen