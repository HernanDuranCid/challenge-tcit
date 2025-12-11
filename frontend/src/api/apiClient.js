import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:5000/api"
    : "/api");

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 8000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (process.env.NODE_ENV === "development") {
      console.error("❌ API Error:", error.message);
    }

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
    } else if (error.request) {
      alert("El servidor no responde. Verifica tu conexión o intenta más tarde.");
    }

    return Promise.reject(error);
  }
);

export const api = apiClient;
