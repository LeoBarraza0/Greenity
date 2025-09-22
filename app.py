from flask import Flask, request, jsonify, redirect, render_template
from Config.db import app

@app.route("/")
def index():
    return render_template("Login.html")

@app.route("/Mapa")
def mapa():
    return render_template("Mapa.html")

@app.route("/Configuracion")
def config():
    return render_template("Configuracion.html")

@app.route("/Contacto")
def contacto():
    return render_template("Contacto.html")

@app.route("/Educativo")
def edu():
    return render_template("Educativo.html")

@app.route("/Reciclaje")
def rec():
    return render_template("SugerirPunto.html")

if __name__ == "__main__":
    app.run(debug=True, port=5000, host='0.0.0.0')
    