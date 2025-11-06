from flask import Blueprint, jsonify
from Config.db import app
import json
import os

# Crear el Blueprint para APIs (siguiendo la lógica del profesor)
routes_Api = Blueprint("routes_Api", __name__)

@routes_Api.route("/api/puntos-reciclaje")
def get_puntos_reciclaje():
    """Endpoint para obtener los datos del scraping de puntos de reciclaje"""
    try:
        # Ruta al archivo JSON generado por el scraping (en la raíz del proyecto)
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        json_file_path = os.path.join(base_dir, 'puntos_reciclaje_barranquilla.json')
        
        # Verificar si el archivo existe
        if not os.path.exists(json_file_path):
            return jsonify({
                "success": False,
                "error": "Archivo de datos no encontrado",
                "data": []
            }), 404
        
        # Leer y retornar los datos
        with open(json_file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        return jsonify(data)
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Error al cargar datos: {str(e)}",
            "data": []
        }), 500

@routes_Api.route("/api/ejecutar-scraping", methods=['POST'])
def ejecutar_scraping():
    """Endpoint para ejecutar el scraping y actualizar los datos"""
    try:
        # Importar y ejecutar el scraper
        from scraping import RecyclingPointsScraper
        
        scraper = RecyclingPointsScraper()
        data = scraper.scrape()
        
        if data.get('success'):
            # Guardar los datos actualizados
            scraper.save_to_json(data)
            return jsonify({
                "success": True,
                "message": "Scraping ejecutado exitosamente",
                "estadisticas": data.get('estadisticas', {})
            })
        else:
            return jsonify({
                "success": False,
                "error": data.get('error', 'Error desconocido')
            }), 500
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Error ejecutando scraping: {str(e)}"
        }), 500

