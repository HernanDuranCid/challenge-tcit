import { useState } from "react";

// Componente encargado de capturar y propagar el texto de filtrado
export default function PostFilter({ onFilter }) {
  // Estado local que mantiene el valor actual del filtro
  const [query, setQuery] = useState("");

  // Maneja los cambios en el input y notifica al componente padre
  const handleChange = (e) => {
    setQuery(e.target.value);
    onFilter(e.target.value);
  };

  return (
    <div className="w-full">
      {/* Campo de entrada para filtrar posts por nombre */}
      <input
        type="text"
        placeholder="Filtrar por nombre..."
        value={query}
        onChange={handleChange}
        className="w-full px-4 py-2
                   border border-indigo-400 dark:border-indigo-500
                   bg-white dark:bg-slate-800
                   text-gray-900 dark:text-gray-100
                   rounded-lg
                   shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                   transition-colors duration-300
                   placeholder-gray-400 dark:placeholder-gray-500"
      />
    </div>
  );
}