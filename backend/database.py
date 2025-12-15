from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import SQLAlchemyError

# Inicialización de la instancia de SQLAlchemy
db = SQLAlchemy()

def init_db(app=None):
    from models import Post

    try:
        # Creación de tablas en la base de datos, manejado dependiendo del contexto de la aplicación
        if app:
            with app.app_context():
                db.create_all()
        else:
            db.create_all()
        print("Base de datos inicializada correctamente.")
    except SQLAlchemyError as e:
        # Captura y manejo de errores en la inicialización de la base de datos
        print(f"Error al inicializar la base de datos: {e}")
        db.session.rollback()