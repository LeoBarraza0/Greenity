import os
from Config.db import app, db

with app.app_context():
    # IMPORTANTE: forzar importación de TODOS los modelos para registrar metadata
    # antes de crear tablas.
    import Models as _models
    assert _models

    # crear tablas UNA sola vez cuando la app se importe/arranque
    db.create_all()
    # Opcional: Al iniciar la aplicación, ejecutar el scraper y volcar los datos a la BD
    # Controlado por la variable de entorno ENABLE_AUTO_IMPORT (true/1/yes para activar)
    if str(os.getenv('ENABLE_AUTO_IMPORT', 'true')).lower() in ('1', 'true', 'yes'):
        try:
            # Importar el scraper y ejecutarlo
            from scraping import RecyclingPointsScraper
            print('Inicio automático: ejecutando scraping de puntos de reciclaje...')
            scraper = RecyclingPointsScraper()
            data = scraper.scrape()
            if data and data.get('success'):
                scraper.save_to_json(data)
                # Importar los datos al modelo usando el DataController
                try:
                    from Config.Controller.DataController import import_scraping_data
                    result = import_scraping_data()
                    print('Importación automática completada:', result)
                except Exception as e:
                    print('Error importando datos en arranque:', e)
            else:
                print('Scraping no devolvió datos exitosos en arranque:', getattr(data, 'get', lambda x: None)('error'))
        except Exception as e:
            # No queremos impedir el arranque por errores en scraping; solo registramos el fallo
            print('No se pudo ejecutar scraping automático en arranque:', str(e))
    
# Importar Blueprints (después de registrar modelos para evitar doble-definition de tablas)
from Config.Controller.WebController import routes_Web
from Config.Controller.UserController import routes_User
from Config.Controller.ApiController import routes_Api
from Config.Controller.CertificadoController import routes_certificadoC

# Registrar Blueprints sin url_prefix para mantener las rutas originales
app.register_blueprint(routes_Web, url_prefix="")
app.register_blueprint(routes_User, url_prefix="")
app.register_blueprint(routes_Api, url_prefix="")
app.register_blueprint(routes_certificadoC, url_prefix="/controller")

if __name__ == "__main__":
    # Ejecuta la aplicación Flask en modo debug (no usar en producción).
    # - debug=True activa autoreload y el debugger interactivo.
    # - host='0.0.0.0' hace que la app sea accesible desde otras máquinas
    #   en la red local (útil para pruebas en contenedores/VMs).
    app.run(debug=True, port=5000, host='0.0.0.0')
    