from Config.db import db, ma, app
from datetime import datetime

class PreguntaQuiz(db.Model):
    __tablename__ = 'tbl_pregunta_quiz'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    leccion_id = db.Column(db.Integer, db.ForeignKey('tbl_leccion.id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False)
    texto_pregunta = db.Column(db.Text, nullable=False)
    indice_orden = db.Column(db.Integer, nullable=False)
    creado_en = db.Column(db.TIMESTAMP, nullable=True, default=datetime.utcnow)
    
    # Relaciones
    opciones = db.relationship('OpcionQuiz', backref='pregunta', lazy=True, cascade='all, delete-orphan', passive_deletes=True)

    def __init__(self, leccion_id, texto_pregunta, indice_orden):
        self.leccion_id = leccion_id
        self.texto_pregunta = texto_pregunta
        self.indice_orden = indice_orden

class PreguntaQuizSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = PreguntaQuiz
        load_instance = True
        include_relationships = True