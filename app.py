from flask import Flask
from Config.db import app

# Importar Blueprints (siguiendo la lógica del profesor)
from Config.Controller.WebController import routes_Web
from Config.Controller.AuthController import routes_Auth
from Config.Controller.ApiController import routes_Api

# Registrar Blueprints sin url_prefix para mantener las rutas originales
app.register_blueprint(routes_Web, url_prefix="")
app.register_blueprint(routes_Auth, url_prefix="")
app.register_blueprint(routes_Api, url_prefix="")

if __name__ == "__main__":
    # Ejecuta la aplicación Flask en modo debug (no usar en producción).
    # - debug=True activa autoreload y el debugger interactivo.
    # - host='0.0.0.0' hace que la app sea accesible desde otras máquinas
    #   en la red local (útil para pruebas en contenedores/VMs).
    app.run(debug=True, port=5000, host='0.0.0.0')
    