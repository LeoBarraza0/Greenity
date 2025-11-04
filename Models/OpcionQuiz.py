from Config.db import db, ma, app

class OpcionQuiz(db.Model):
    __tablename__ = 'tbl_opcion_quiz'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    pregunta_id = db.Column(db.Integer, db.ForeignKey('tbl_pregunta_quiz.id'), nullable=False)
    texto_opcion = db.Column(db.String(500), nullable=False)
    es_correcta = db.Column(db.Boolean, nullable=False, default=False)
    indice_orden = db.Column(db.Integer, nullable=False)

    def __init__(self, pregunta_id, texto_opcion, es_correcta, indice_orden):
        self.pregunta_id = pregunta_id
        self.texto_opcion = texto_opcion
        self.es_correcta = es_correcta
        self.indice_orden = indice_orden

class OpcionQuizSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = OpcionQuiz
        load_instance = True

with app.app_context():
    db.create_all()  # Crear tablas si no existen