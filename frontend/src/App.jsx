import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, addPost, deletePost } from "./redux/postsSlice";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import ThemeToggle from "./components/ThemeToggle";

// Componente principal de la aplicación
function App() {
  // Dispatcher para acciones globales
  const dispatch = useDispatch();
  // Selección del estado de posts desde el store
  const { list, status } = useSelector((state) => state.posts);

  // Carga inicial de la lista de posts
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // Maneja la creación de un nuevo post
  const handleAdd = (form) => {
    dispatch(addPost(form));
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start p-6 space-y-6 
                 bg-gray-100 text-gray-900 
                 dark:bg-slate-900 dark:text-gray-100 
                 overflow-y-hidden
                 transition-colors duration-500"
    >
      {/* Contenedor del formulario */}
      <div className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-6 w-full max-w-3xl flex-shrink-0 mt-20 border border-gray-200 dark:border-slate-700 transition-colors duration-500">
        <h1 className="text-3xl font-bold text-center text-indigo-700 dark:text-indigo-400 mb-6 transition-colors">
          Gestor de Posts
        </h1>
        <PostForm onAdd={handleAdd} />
      </div>

      {/* Contenedor de la lista de posts */}
      <div className="w-full max-w-3xl flex-1 flex flex-col bg-transparent">
        {status === "loading" && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Cargando...
          </p>
        )}
        {status === "failed" && (
          <p className="text-center text-red-500">Error al cargar los posts.</p>
        )}

        {/* Listado de posts */}
        <div className="flex-1 space-y-4 px-1 scroll-smooth h-[65vh]">
          <PostList posts={list} onDelete={(id) => dispatch(deletePost(id))} />
        </div>
      </div>

      {/* Control de tema visual */}
      <ThemeToggle />
    </div>
  );
}

export default App;