import { useState, useEffect } from "react";
import PostFilter from "./PostFilter";

export default function PostList({ posts, onDelete }) {
  const [filtered, setFiltered] = useState(posts);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    setFiltered(posts);
  }, [posts]);

  const handleFilter = (q) => {
    setFiltered(
      posts.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()))
    );
  };

  const handleDelete = (id) => {
    setDeletingId(id);
    setTimeout(() => {
      onDelete(id);
      setDeletingId(null);
    }, 350);
  };

  return (
    <div className="relative bg-gray-100 dark:bg-slate-800 rounded-xl p-2 transition-colors duration-300 overflow-hidden">
      {/* 🔹 Filtro */}
      <div
        className="sticky top-0 z-20 bg-gray-100 dark:bg-slate-800 
                   transition-colors duration-300 
                   pb-1
                   before:absolute before:bottom-0 before:left-0 before:right-0
                   before:h-[1px] before:bg-gray-200 dark:before:bg-slate-700"
      >
        <PostFilter onFilter={handleFilter} />
      </div>

      {/* 🔹 Lista scrollable */}
      <div
        className="max-h-[55vh] overflow-y-auto space-y-2 rounded-lg
                   transition-[padding] duration-300 ease-in-out
                   scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-transparent
                   dark:scrollbar-thumb-indigo-300 dark:scrollbar-track-slate-700
                   will-change-transform"
        style={{ overscrollBehavior: "contain" }}
      >
        {/* 🔹 Encabezado */}
        {filtered.length > 0 && (
          <div
            className="sticky top-[-1px] z-30 
                       grid grid-cols-[1fr_2fr_auto] gap-4 px-4 
                       text-gray-500 dark:text-gray-400 text-sm font-semibold 
                       border-b border-gray-200 dark:border-slate-700 
                       py-2 transition-colors duration-300
                       bg-gray-100 dark:bg-slate-800
                       before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px]
                       before:bg-gray-100 dark:before:bg-slate-800"
          >
            <span>Nombre</span>
            <span>Descripción</span>
            <span>Acción</span>
          </div>
        )}

        {/* 🔹 Filas */}
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm my-3">
            No hay posts para mostrar.
          </p>
        ) : (
          filtered.map((post) => ( // ✅ sin reverse()
            <div
              key={post.id}
              className={`grid grid-cols-[1fr_2fr_auto] gap-4 items-center 
                          bg-white dark:bg-slate-800 
                          rounded-lg border border-gray-100 dark:border-slate-700 
                          p-3 shadow-sm hover:shadow-md 
                          transition-all duration-300 
                          ${
                            deletingId === post.id
                              ? "animate-fadeOutUp"
                              : "animate-fadeInUp"
                          }`}
            >
              {/* Nombre */}
              <div className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-semibold px-3 py-2 rounded-md truncate text-sm shadow-inner">
                {post.name}
              </div>

              {/* Descripción */}
              <div className="bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-gray-200 px-3 py-2 rounded-md text-sm shadow-inner break-words">
                {post.description}
              </div>

              {/* Botón */}
              <button
                onClick={() => handleDelete(post.id)}
                className="bg-red-500 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800 
                           text-white px-3 py-2 rounded-md text-sm shadow-md 
                           transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
