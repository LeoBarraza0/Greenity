from Config.db import db, ma, app
from datetime import datetime

class Leccion(db.Model):
    __tablename__ = 'tbl_leccion'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    modulo_id = db.Column(db.Integer, db.ForeignKey('tbl_modulo.id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False)
    titulo = db.Column(db.String(255), nullable=False)
    tipo_leccion = db.Column(db.Enum('video', 'lectura', 'quiz', name='tipo_leccion_enum'), nullable=False)
    duracion = db.Column(db.String(50), nullable=False)
    id_video_youtube = db.Column(db.String(50), nullable=True)
    contenido = db.Column(db.Text, nullable=False)
    indice_orden = db.Column(db.Integer, nullable=False)
    creado_en = db.Column(db.TIMESTAMP, nullable=True, default=datetime.utcnow)
    
    # Relaciones
    preguntas_quiz = db.relationship('PreguntaQuiz', backref='leccion', lazy=True, cascade='all, delete-orphan', passive_deletes=True)
    intentos_quiz = db.relationship('IntentoQuizUsuario', backref='leccion', lazy=True, cascade='all, delete-orphan', passive_deletes=True)
    progreso_usuarios = db.relationship('ProgresoUsuario', backref='leccion', lazy=True, cascade='all, delete-orphan', passive_deletes=True)
    
    # Índices
    __table_args__ = (
        db.Index('tbl_leccion_modulo_id_index', 'modulo_id'),
    )

    def __init__(self, modulo_id, titulo, tipo_leccion, duracion, contenido, indice_orden, id_video_youtube=None):
        self.modulo_id = modulo_id
        self.titulo = titulo
        self.tipo_leccion = tipo_leccion
        self.duracion = duracion
        self.contenido = contenido
        self.indice_orden = indice_orden
        self.id_video_youtube = id_video_youtube

class LeccionSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Leccion
        load_instance = True
        include_relationships = True