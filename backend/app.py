from flask import Flask, jsonify
from flask_cors import CORS
from flask_talisman import Talisman
from routes import posts_bp
from database import db, init_db
from dotenv import load_dotenv
import logging
import os

# Carga de configuración externa para desacoplar secretos y entorno del código
load_dotenv()

app = Flask(__name__)

# Configuración de base de datos mediante variable de entorno
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Inicialización desacoplada del ORM para facilitar testing y escalabilidad
db.init_app(app)

# Configuración controlada de CORS para exponer solo los endpoints de la API
CORS(
    app,
    resources={r"/api/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]}},
    supports_credentials=True,
    methods=["GET", "POST", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"]
)

# Middleware de seguridad HTTP con configuración flexible para entorno local
Talisman(app, content_security_policy=None, force_https=False, session_cookie_secure=False)

# Logging a archivo para trazabilidad básica de la aplicación
logging.basicConfig(
    filename="app.log",
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)

# Registro de blueprints para mantener separación de responsabilidades
app.register_blueprint(posts_bp, url_prefix="/api")

# Manejo centralizado de errores HTTP para respuestas consistentes
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Recurso no encontrado"}), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({"error": "Error interno del servidor"}), 500

# Punto de entrada utilizando servidor WSGI en lugar del servidor de desarrollo
if __name__ == "__main__":
    from waitress import serve
    # Inicialización del esquema de base de datos al arranque
    with app.app_context():
        init_db()
    serve(app, host="0.0.0.0", port=5000)