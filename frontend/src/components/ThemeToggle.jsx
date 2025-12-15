import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

// Componente encargado de alternar el tema visual de la aplicación
export default function ThemeToggle() {
  // Estado que mantiene el tema actual
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  // Sincroniza el tema con el DOM y el almacenamiento local
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Alterna entre los temas disponibles
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-5 right-5 p-2 rounded-full 
                 bg-indigo-600 dark:bg-indigo-500 
                 text-white shadow-md 
                 hover:scale-105 active:scale-95 
                 transition-transform duration-200"
      aria-label="Toggle theme"
    >
      {/* Icono según el tema activo */}
      {theme === "light" ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
}