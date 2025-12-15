from database import db

# Modelo de dominio que representa la entidad Post dentro del sistema
class Post(db.Model):
    # Identificador único de la entidad
    id = db.Column(db.Integer, primary_key=True)

    # Campos obligatorios que definen el contenido principal del Post
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=False)

    # Inicialización explícita del modelo para mantener control sobre los atributos requeridos
    def __init__(self, name: str, description: str) -> None:
        self.name = name
        self.description = description

    # Conversión del modelo a diccionario para desacoplar la capa de persistencia
    # de la representación expuesta por la API
    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description
        }