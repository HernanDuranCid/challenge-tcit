# 🧩 Frontend – Challenge TCIT

Sistema desarrollado con **React**, **Redux Toolkit** y **TailwindCSS**, que se conecta a una API Flask para gestionar posts.  
La aplicación permite **crear**, **listar**, **filtrar** y **eliminar registros** con una interfaz moderna, responsiva y accesible.

---

## 🚀 Tecnologías utilizadas

- ⚛️ **React 18** – Librería base del frontend.  
- 🧠 **Redux Toolkit** – Manejo global del estado y side effects (async thunks).  
- 🎨 **TailwindCSS** – Framework de estilos utilitario con soporte para modo oscuro.  
- 🌗 **Dark Mode** – Activación por clase (`darkMode: "class"` en Tailwind).  
- 🧰 **Axios** – Cliente HTTP para comunicación con la API Flask.  
- 🔒 **Buenas prácticas de seguridad y validación** en formularios y API.

---

## 📁 Estructura del proyecto

```bash
frontend/
├── public/
├── src/
│   ├── api/
│   │   └── apiClient.js
│   ├── components/
│   │   ├── PostForm.jsx
│   │   ├── PostList.jsx
│   │   ├── PostFilter.jsx
│   │   └── ThemeToggle.jsx
│   ├── redux/
│   │   ├── postsSlice.js
│   │   └── store.js
│   ├── App.jsx
│   ├── index.jsx
│   ├── App.css
│   ├── index.css
│   └── tailwind.config.js
├── tailwind.config.js
├── postcss.config.js
├── pnpm-lock.yaml
├── package.json
└── README.md
```

---

## ⚙️ Instalación y ejecución

### 🧾 Requisitos previos
Asegúrate de tener instalados los siguientes componentes:
- [Node.js](https://nodejs.org/) v18 o superior  
- [pnpm](https://pnpm.io/) (gestor de paquetes recomendado)  
- Backend Flask corriendo en `http://127.0.0.1:5000/api`  

---

### 📦 Instalación de dependencias

1️⃣ Clona este repositorio en tu entorno local:

```bash
git clone https://github.com/usuario/nombre-del-repositorio.git
```

2️⃣ Entra al directorio del proyecto frontend:

```bash
cd frontend
```

3️⃣ Instala las dependencias usando pnpm (recomendado):

```bash
pnpm install
```
💡 Si prefieres usar npm o yarn, también puedes ejecutar:
```bash
npm install
# o
yarn install
```

### ▶️ Ejecución en modo desarrollo

```bash
pnpm start
```
El proyecto se ejecutará por defecto en
👉 http://localhost:3000

### 🏗️ Generar build de producción

```bash
pnpm run build
```
Esto creará una carpeta /build optimizada para despliegue.

### 🌐 Servir la build localmente (modo producción)

Para probar la build generada:
```bash
serve -s build
```
La app estará disponible en
👉 http://localhost:3000

### 🔄 Conexión con backend Flask

El frontend se conecta automáticamente al backend configurado en:
```env
REACT_APP_API_URL=http://127.0.0.1:5000/api
```
Si no existe esta variable, el sistema usará /api por defecto.

---

## 🌐 Seguridad en el Frontend

### 1. CORS restringido (en entorno de desarrollo)

Durante el desarrollo, las solicitudes están limitadas al backend local para evitar orígenes no autorizados:

```js
const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:5000/api"
    : "/api");
```

Esto asegura que el frontend solo se comunique con el backend configurado, incluso en producción.

### 2. Validaciones de entrada en formularios

Se aplican validaciones estrictas antes de enviar datos al backend:

* `name` y `description` son campos **obligatorios**
* Límite de caracteres: `name` (máx. 50) y `description` (máx. 100)
* Se eliminan espacios extra con `trim()`
* Errores mostrados al usuario con feedback visual

```js
if (!name.trim()) return setError("El nombre es obligatorio.");
if (!description.trim()) return setError("La descripción es obligatoria.");
if (name.length > 10) return setError("El nombre no puede superar los 10 caracteres.");
if (description.length > 50) return setError("La descripción no puede superar los 50 caracteres.");
```

### 3. Sanitización básica de entradas

Aunque la API realiza validaciones adicionales, el frontend previene la inserción de contenido potencialmente inseguro. Esto incluye:

* Bloqueo de cadenas vacías
* Limitación de longitud en los inputs (`maxLength`)
* Limpieza de caracteres especiales a través de inputs controlados

### 4. Manejo de errores de red

El frontend utiliza `Axios` centralizado (`apiClient.js`) para manejar errores y respuestas seguras:

```js
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error en la solicitud:", error);
    return Promise.reject(error);
  }
);
```

Esto evita fugas de información sensible en la consola y permite mostrar mensajes controlados al usuario.

---

## 🧠 Buenas prácticas implementadas

| Área                                   | Práctica                                         | Descripción                                        |
| -------------------------------------- | ------------------------------------------------ | -------------------------------------------------- |
| 🧩 **Frontend**                        | Validaciones defensivas                          | Todos los campos se validan antes de enviar        |
| ⚙️ **Manejo de API**                   | Cliente Axios centralizado                       | Facilita control de errores y configuración segura |
| 💬 **Errores controlados**             | Mensajes coherentes con el estado del formulario |                                                    |
| 🌈 **Variables de entorno**            | Configuración segura mediante `.env`             |                                                    |
| 🎨 **Separación de responsabilidades** | Componentes modulares y reutilizables            |                                                    |
| 🧰 **Redux Toolkit**                   | Manejo predecible del estado global              |                                                    |
| 🧭 **Tailwind + modo oscuro**          | Tema visual accesible y consistente              |                                                    |
| 🧱 **Animaciones suaves**              | Transiciones CSS no intrusivas para mejor UX     |                                                    |
| 🔒 **Inputs controlados**              | Evita inyecciones o comportamientos inesperados  |                                                    |

---
