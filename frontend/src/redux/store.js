import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postsSlice";

// Configuración del store global de la aplicación
export const store = configureStore({
  reducer: {
    // Estado asociado a la gestión de posts
    posts: postsReducer,
  },
});