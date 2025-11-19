"""Auto-import de todos los módulos en el paquete `Models`.

Esto asegura que todas las clases `db.Model` sean registradas en la
metadata de SQLAlchemy antes de llamar a `db.create_all()`.
"""
import pkgutil
import importlib
import os

package_dir = os.path.dirname(__file__)

# Importar modelos en un orden controlado para resolver dependencias entre modelos
ORDERED_MODELS = [
	'Usuario',
	'Organizacion',
	'Material',
	'Modulo',
	'OpcionQuiz',
	'PreguntaQuiz',
    'Certificado',
    'IntentoQuizUsuario',
    'ProgresoUsuario',
	'Leccion',
    'PuntoMaterial',
    'PuntoContacto',
	'Punto'
]

# Importar en el orden definido (ignorar fallos aquí; errores reales se mostrarán luego)
for m in ORDERED_MODELS:
	try:
		importlib.import_module(f"{__name__}.{m}")
	except Exception:
		pass

# Importar cualquier módulo restante en orden alfabético para asegurar que
# nuevos modelos se carguen también.
for _finder, module_name, _ispkg in sorted(pkgutil.iter_modules([package_dir]), key=lambda x: x[1]):
	if module_name.startswith("_"):
		continue
	if module_name in ORDERED_MODELS:
		continue
	importlib.import_module(f"{__name__}.{module_name}")

