from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import SQLAlchemyError

db = SQLAlchemy()

def init_db(app=None):
    from models import Post

    try:
        if app:
            with app.app_context():
                db.create_all()
        else:
            db.create_all()
        print("Base de datos inicializada correctamente.")
    except SQLAlchemyError as e:
        print(f"Error al inicializar la base de datos: {e}")
        db.session.rollback()
