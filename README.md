# ⚡ Challenge TCIT

Sistema Full Stack desarrollado como parte del **Challenge TCIT**, compuesto por un **Frontend en React + TailwindCSS** y un **Backend en Flask**.

El proyecto implementa un gestor de posts con enfoque en **seguridad, validaciones defensivas, arquitectura modular y buenas prácticas** de desarrollo.

---

## 🧩 Estructura general del proyecto

```
project-root/
├── frontend/
│   ├── src/
│   └── README.md
│
└── backend/
    ├── app.py
    ├── models.py
    ├── routes.py
    ├── database.py
    └── README.md
```

---

## ⚙️ Instalación rápida

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/usuario/challenge-tcit.git
cd challenge-tcit
```

### 2️⃣ Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux / Mac
venv\Scripts\activate     # Windows
pip install -r requirements.txt
python app.py
```

### 3️⃣ Frontend

```bash
cd ../frontend
pnpm install
pnpm run dev
```

---

## 🧱 Tecnologías principales

### 🖥️ **Frontend**

* React (CRA)
* Redux Toolkit
* TailwindCSS
* Axios (con configuración centralizada en `apiClient.js`)
* Validaciones defensivas en formulario

### ⚙️ **Backend**

* Flask + Waitress
* Flask-CORS + Flask-Talisman (seguridad HTTP)
* SQLAlchemy (ORM)
* dotenv (variables de entorno)

---

## 🔐 Seguridad y buenas prácticas

| Área                      | Práctica                                             | Descripción                                    |
| ------------------------- | ---------------------------------------------------- | ---------------------------------------------- |
| 🧩 Frontend               | Validaciones defensivas                              | Evita envío de datos inválidos                 |
| ⚙️ Backend                | Validación redundante                                | Se replica la validación para máxima seguridad |
| 🔐 CORS controlado        | Solo se aceptan peticiones desde orígenes permitidos |                                                |
| 🧱 Cabeceras seguras      | Integración con Flask-Talisman                       |                                                |
| 💾 Rollback automático    | Previene corrupción de datos                         |                                                |
| 🌈 Variables de entorno   | Configuración segura mediante `.env`                 |                                                |
| 🧭 Respuestas JSON        | Estructura de errores y respuestas consistente       |                                                |
| 🧰 Logging                | Archivo `app.log` para auditoría                     |                                                |
| 🎨 Tailwind + modo oscuro | Tema visual accesible y coherente                    |                                                |

---

## 🧪 Pruebas rápidas

### ✅ Crear un post de ejemplo

```bash
curl -X POST http://127.0.0.1:5000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"name": "Ejemplo", "description": "Post de prueba"}'
```

### ✅ Visualizar desde el frontend

Abre en el navegador:

```
http://localhost:3000
```

---

## 🧭 Organización del proyecto

| Módulo           | Stack                            | Enfoque                               |
| ---------------- | -------------------------------- | ------------------------------------- |
| 🖥️ Frontend     | React + Tailwind + Redux         | UX accesible, validaciones defensivas |
| ⚙️ Backend       | Flask + SQLAlchemy + Talisman    | Seguridad y estructura modular        |
| 🧾 Documentación | README bajo formato Markdown     | Trazabilidad y claridad técnica       |

---

## 🧩 Autor

Desarrollado por **Hernán Durán**
Desafío técnico — **TCIT Challenge 2025**
