from flask import Blueprint, request, jsonify, make_response
from models import Post
from database import db

posts_bp = Blueprint("posts", __name__)

@posts_bp.route("/posts", methods=["OPTIONS"])
@posts_bp.route("/posts/<int:id>", methods=["OPTIONS"])
def handle_options(id=None):
    response = make_response()
    response.headers["Access-Control-Allow-Origin"] = request.headers.get("Origin", "*")
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response, 204


@posts_bp.route("/posts", methods=["GET"])
def get_posts():
    try:
        posts = Post.query.order_by(Post.id.desc()).all()
        return jsonify([p.to_dict() for p in posts]), 200
    except Exception as e:
        print(f"Error en GET /posts: {e}")
        return jsonify({"error": "Error al obtener los posts"}), 500


@posts_bp.route("/posts", methods=["POST"])
def add_post():
    data = request.get_json()

    if not data or not data.get("name"):
        return jsonify({"error": "El campo 'name' es obligatorio"}), 400

    name = data["name"].strip()
    description = data.get("description", "").strip()

    if len(name) > 10 or len(description) > 50:
        return jsonify({"error": "Datos demasiado largos"}), 400

    try:
        new_post = Post(name=name, description=description)
        db.session.add(new_post)
        db.session.commit()
        return jsonify(new_post.to_dict()), 201
    except Exception as e:
        print(f"Error en POST /posts: {e}")
        db.session.rollback()
        return jsonify({"error": "No se pudo crear el post"}), 500


@posts_bp.route("/posts/<int:id>", methods=["DELETE"])
def delete_post(id):
    try:
        post = Post.query.get(id)
        if not post:
            return jsonify({"error": "Post no encontrado"}), 404

        db.session.delete(post)
        db.session.commit()
        return jsonify(post.to_dict()), 200
    except Exception as e:
        print(f"Error en DELETE /posts/{id}: {e}")
        db.session.rollback()
        return jsonify({"error": "No se pudo eliminar el post"}), 500
