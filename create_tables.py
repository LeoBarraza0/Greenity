#!/usr/bin/env python3
"""
Script para crear las tablas de la base de datos importando los modelos.
Ejecutar desde la raíz del proyecto:

  python .\create_tables.py

Nota: revisa las variables de entorno `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`, `DB_NAME`
o el archivo de configuración si la conexión falla.
"""
import sys
import traceback

from Config.db import db, app, ma

# Evitar que Marshmallow (SQLAlchemyAutoSchema) intente inspeccionar los modelos al importarlos
# porque eso desencadena resolución de relaciones antes de que todas las clases estén definidas.
# Sustituimos temporalmente `ma.SQLAlchemyAutoSchema` por `object` para que las declaraciones
# `class XSchema(ma.SQLAlchemyAutoSchema):` no ejecuten el metaclase de Marshmallow.
_original_auto_schema = getattr(ma, 'SQLAlchemyAutoSchema', None)
ma.SQLAlchemyAutoSchema = object

# Importar modelos (el orden ya no es tan crítico gracias al parche anterior)
import Models.Material
import Models.Punto
import Models.Organizacion
import Models.PuntoMaterial
import Models.PuntoContacto
import Models.Usuario
import Models.Modulo
import Models.Leccion
import Models.PreguntaQuiz
import Models.OpcionQuiz
import Models.IntentoQuizUsuario
import Models.Certificado
import Models.ProgresoUsuario

# Restaurar la clase original para no alterar el comportamiento de la app en caso de uso posterior
if _original_auto_schema is not None:
    ma.SQLAlchemyAutoSchema = _original_auto_schema


def main():
    try:
        with app.app_context():
            # debug: mostrar tipos de columnas clave para verificar compatibilidad
            try:
                import Models.Usuario as MU
                import Models.IntentoQuizUsuario as MI
                print('DEBUG: Usuario.id type ->', MU.Usuario.__table__.c.id.type)
                print('DEBUG: Intento.usuario_id type ->', MI.IntentoQuizUsuario.__table__.c.usuario_id.type)
            except Exception:
                pass

            db.create_all()
            print("[OK] Las tablas se crearon (o ya existían) correctamente.")
    except Exception as e:
        print("[ERROR] Al crear las tablas:")
        traceback.print_exc()
        sys.exit(1)


if __name__ == '__main__':
    main()
