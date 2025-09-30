from flask import Flask, request, jsonify, redirect, render_template
from Config.db import app

@app.route("/")
def index():
    return render_template("views/Login.html")

@app.route("/Main")
def main():
    return render_template("views/index.html")

@app.route("/Mapa")
def mapa():
    return render_template("views/Mapa.html")

@app.route("/Configuracion")
def config():
    return render_template("views/Configuracion.html")

@app.route("/Contacto")
def contacto():
    return render_template("views/Contacto.html")

@app.route("/Educativo")
def edu():
    return render_template("views/Educativo.html")

@app.route("/Reciclaje")
def rec():
    return render_template("views/SugerirPunto.html")

if __name__ == "__main__":
    app.run(debug=True, port=5000, host='0.0.0.0')
    