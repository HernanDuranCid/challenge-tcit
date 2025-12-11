from flask import Flask, jsonify
from flask_cors import CORS
from flask_talisman import Talisman
from routes import posts_bp
from database import db, init_db
from dotenv import load_dotenv
import logging
import os

load_dotenv()

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

CORS(
    app,
    resources={r"/api/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]}},
    supports_credentials=True,
    methods=["GET", "POST", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"]
)

Talisman(app, content_security_policy=None, force_https=False, session_cookie_secure=False)

logging.basicConfig(filename="app.log", level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")

app.register_blueprint(posts_bp, url_prefix="/api")

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Recurso no encontrado"}), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({"error": "Error interno del servidor"}), 500

# Entry point
if __name__ == "__main__":
    from waitress import serve
    with app.app_context():
        init_db()
    serve(app, host="0.0.0.0", port=5000)
