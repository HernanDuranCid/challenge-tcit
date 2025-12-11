# 🧩 Backend — Challenge TCIT

Sistema backend desarrollado con **Flask**, enfocado en buenas prácticas de seguridad, modularidad y validaciones consistentes.
Sirve como API REST para el frontend de gestión de posts.

---

## 📁 Estructura del proyecto

```
backend/
├── .env
├── app.py
├── database.py
├── models.py
├── routes.py
├── requirements.txt
└── README.md
```

---

## ⚙️ Instalación y ejecución

### 1️⃣ Crear entorno virtual e instalar dependencias

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Linux / MacOS
venv\Scripts\activate      # Windows
pip install -r requirements.txt
```

### 2️⃣ Configurar variables de entorno

Crea un archivo `.env` con el siguiente contenido:

```env
DATABASE_URL=postgresql://usuario:contraseña@localhost:PORT/"nombre_de_la_tabla"
FLASK_ENV=prodution
```

### 3️⃣ Inicializar la base de datos

```bash
python app.py
```

Si la base de datos no existe, se crea automáticamente:

```
Base de datos inicializada correctamente.
```

---

## 🚀 Endpoints disponibles

| Método    | Ruta                             | Descripción               |
| --------- | -------------------------------- | ------------------------- |
| `GET`     | `/api/posts`                     | Obtiene todos los posts   |
| `POST`    | `/api/posts`                     | Crea un nuevo post        |
| `DELETE`  | `/api/posts/<id>`                | Elimina un post existente |
| `OPTIONS` | `/api/posts` y `/api/posts/<id>` | Preflight para CORS       |

---

## 🔐 Seguridad en la API

### 1. CORS restringido

Solo se permiten solicitudes desde orígenes específicos:

```python
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000"]}})
```

### 2. Cabeceras seguras con Flask-Talisman

Se agregaron cabeceras HTTP seguras para mitigar riesgos comunes:

* `Content-Security-Policy`
* `Strict-Transport-Security`
* `X-Frame-Options`
* `X-Content-Type-Options`
* `Referrer-Policy`
* Cookies marcadas como seguras (`SESSION_COOKIE_SECURE=True`)

### 3. Gestión de errores personalizados

```python
@app.errorhandler(404)
def not_found(error):
    return {"error": "Recurso no encontrado"}, 404

@app.errorhandler(500)
def server_error(error):
    return {"error": "Error interno del servidor"}, 500
```

### 4. Protección ante métodos no soportados (OPTIONS)

```python
@posts_bp.route("/posts", methods=["OPTIONS"])
@posts_bp.route("/posts/<int:id>", methods=["OPTIONS"])
def handle_options(id=None):
    response = make_response()
    response.headers["Access-Control-Allow-Origin"] = request.headers.get("Origin", "*")
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response, 204
```

---

## 🧠 Buenas prácticas implementadas

| Área                           | Práctica                                              | Descripción                                     |
| ------------------------------ | ----------------------------------------------------- | ----------------------------------------------- |
| ⚙️ **Backend**                 | Validación redundante                                 | Se replica la validación del frontend en la API |
| 🧱 **Gestión de errores**      | Manejo centralizado de 404, 405 y 500                 |                                                 |
| 🔐 **CORS controlado**         | Solo se aceptan peticiones desde orígenes permitidos  |                                                 |
| 🧩 **Flask-Talisman**          | Añade cabeceras HTTP seguras                          |                                                 |
| 💾 **Rollback automático**     | Previene corrupción de datos en errores DB            |                                                 |
| 🌈 **Variables de entorno**    | Configuración segura mediante `.env`                  |                                                 |
| 🧰 **Estructura modular**      | Código organizado en rutas, modelos y DB              |                                                 |
| 🧭 **Respuestas consistentes** | Todas las respuestas son JSON con códigos HTTP claros |                                                 |
| 🧾 **Logging estructurado**    | `app.log` almacena trazas de ejecución                |                                                 |

---

## 🧪 Pruebas rápidas

Probar la API manualmente con **curl** o **Postman**:

```bash
curl -X POST http://127.0.0.1:5000/api/posts \
     -H "Content-Type: application/json" \
     -d '{"name": "Ejemplo", "description": "Post de prueba"}'
```

Respuesta esperada:

```json
{
  "id": 1,
  "name": "Ejemplo",
  "description": "Post de prueba"
}
```

---

## 🧱 Tecnologías principales

* **Flask** — Framework backend ligero
* **Flask-CORS** — Control de orígenes cruzados
* **Flask-Talisman** — Seguridad HTTP avanzada
* **SQLAlchemy** — ORM para gestión de datos
* **Waitress** — Servidor WSGI para producción
* **dotenv** — Manejo seguro de variables de entorno

---
