from Config.db import app, db

# Importar Blueprints (siguiendo la lógica del profesor)
from Config.Controller.WebController import routes_Web
from Config.Controller.UserController import routes_User
from Config.Controller.ApiController import routes_Api

# Registrar Blueprints sin url_prefix para mantener las rutas originales
app.register_blueprint(routes_Web, url_prefix="")
app.register_blueprint(routes_User, url_prefix="")
app.register_blueprint(routes_Api, url_prefix="")

with app.app_context():
    # IMPORTANTE: forzar importación de TODOS los modelos para registrar metadata
    # antes de crear tablas.
    import Models as _models
    assert _models

    # crear tablas UNA sola vez cuando la app se importe/arranque
    db.create_all()

if __name__ == "__main__":
    # Ejecuta la aplicación Flask en modo debug (no usar en producción).
    # - debug=True activa autoreload y el debugger interactivo.
    # - host='0.0.0.0' hace que la app sea accesible desde otras máquinas
    #   en la red local (útil para pruebas en contenedores/VMs).
    app.run(debug=True, port=5000, host='0.0.0.0')
    