import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient as api } from "../api/apiClient";

// Acción asíncrona para obtener la lista de posts
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/posts");
      if (!Array.isArray(res.data)) throw new Error("Respuesta inválida del servidor");
      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.error ||
        err.message ||
        "No se pudo obtener la lista de posts.";
      return rejectWithValue(message);
    }
  }
);

// Acción asíncrona para crear un nuevo post
export const addPost = createAsyncThunk(
  "posts/addPost",
  async (post, { rejectWithValue }) => {
    try {
      const res = await api.post("/posts", post);
      if (!res.data || !res.data.id) throw new Error("Respuesta inválida del servidor");
      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.error ||
        err.message ||
        "No se pudo crear el post.";
      return rejectWithValue(message);
    }
  }
);

// Acción asíncrona para eliminar un post existente
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/posts/${id}`);
      if (!res.data?.id) throw new Error("Respuesta inválida al eliminar el post");
      return id;
    } catch (err) {
      const message =
        err.response?.data?.error ||
        err.message ||
        "No se pudo eliminar el post.";
      return rejectWithValue(message);
    }
  }
);

// Slice que gestiona el estado global de los posts
const postsSlice = createSlice({
  name: "posts",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // Limpia el mensaje de error del estado
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Estados asociados a la carga inicial de posts
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Error al cargar los posts.";
      })

      // Estados asociados a la creación de un post
      .addCase(addPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list.unshift(action.payload);
      })
      .addCase(addPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Error al crear el post.";
      })

      // Estados asociados a la eliminación de un post
      .addCase(deletePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = state.list.filter((p) => p.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Error al eliminar el post.";
      });
  },
});

// Exporta acciones síncronas del slice
export const { clearError } = postsSlice.actions;

// Exporta el reducer para el store
export default postsSlice.reducer;