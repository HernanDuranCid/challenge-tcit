import axios from "axios";

// Definición de la URL base de la API según el entorno de ejecución
const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:5000/api"
    : "/api");

// Cliente HTTP centralizado para las llamadas a la API
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 8000,
});

// Interceptor de respuestas para manejo global de errores
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Registro de errores solo en entorno de desarrollo
    if (process.env.NODE_ENV === "development") {
      console.error("API Error:", error.message);
    }

    // Manejo de errores con respuesta del servidor
    if (error.response) {
      const { status, data } = error.response;
      const msg = data?.error || "Error inesperado en el servidor";

      switch (status) {
        case 400:
          alert("Solicitud inválida: " + msg);
          break;
        case 404:
          alert("Recurso no encontrado.");
          break;
        case 500:
          alert("Error interno del servidor.");
          break;
        default:
          alert(`Error ${status}: ${msg}`);
      }
    }
    // Manejo de errores sin respuesta del servidor
    else if (error.request) {
      alert("El servidor no responde. Verifica tu conexión o intenta más tarde.");
    }

    return Promise.reject(error);
  }
);

// Exportación del cliente HTTP para uso en la aplicación
export const api = apiClient;