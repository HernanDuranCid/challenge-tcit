import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../redux/postsSlice";

export default function PostForm() {
  const [form, setForm] = useState({ name: "", description: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();

  const sanitizeInput = (value) =>
    value.replace(/[<>]/g, "").replace(/\s{2,}/g, " ").trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const name = sanitizeInput(form.name);
    const description = sanitizeInput(form.description);

    // Validaciones
    if (!name) {
      setError("El nombre es obligatorio.");
      setSubmitting(false);
      return;
    }
    if (!description) {
      setError("La descripción es obligatoria.");
      setSubmitting(false);
      return;
    }
    if (name.length > 10) {
      setError("El nombre no puede superar los 10 caracteres.");
      setSubmitting(false);
      return;
    }
    if (description.length > 50) {
      setError("La descripción no puede superar los 50 caracteres.");
      setSubmitting(false);
      return;
    }

    const allowed = /^[\p{L}\p{N}\s.,!¿?()-]+$/u;
    if (!allowed.test(name) || !allowed.test(description)) {
      setError("Solo se permiten letras, números y puntuación básica.");
      setSubmitting(false);
      return;
    }

    setError("");
    dispatch(addPost({ name, description }));
    setForm({ name: "", description: "" });

    setTimeout(() => setSubmitting(false), 500);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 mb-6 justify-center"
    >
      {/* Nombre */}
      <input
        type="text"
        placeholder="Nombre"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: sanitizeInput(e.target.value) })
        }
        maxLength={50}
        required
        pattern="^[\p{L}\p{N}\s.,!¿?()-]+$"
        title="Solo se permiten letras, números y puntuación básica."
        className={`flex-1 px-3 py-2 border rounded-lg shadow-sm 
                   bg-white dark:bg-slate-800 
                   text-gray-900 dark:text-gray-100
                   focus:outline-none focus:ring-2 
                   focus:ring-indigo-500 focus:border-indigo-500
                   transition-colors duration-300 placeholder-gray-400 dark:placeholder-gray-500
                   ${
                     error.includes("nombre")
                       ? "border-red-500 focus:ring-red-500"
                       : "border-gray-300 dark:border-slate-700"
                   }`}
      />

      {/* Descripción */}
      <input
        type="text"
        placeholder="Descripción"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: sanitizeInput(e.target.value) })
        }
        maxLength={100}
        required
        pattern="^[\p{L}\p{N}\s.,!¿?()-]+$"
        title="Solo se permiten letras, números y puntuación básica."
        className={`flex-1 px-3 py-2 border rounded-lg shadow-sm 
                   bg-white dark:bg-slate-800 
                   text-gray-900 dark:text-gray-100
                   focus:outline-none focus:ring-2 
                   focus:ring-indigo-500 focus:border-indigo-500
                   transition-colors duration-300 placeholder-gray-400 dark:placeholder-gray-500
                   ${
                     error.includes("descripción")
                       ? "border-red-500 focus:ring-red-500"
                       : "border-gray-300 dark:border-slate-700"
                   }`}
      />

      {/* Botón Agregar */}
      <button
        type="submit"
        disabled={submitting}
        className={`font-semibold px-5 py-2 rounded-lg shadow-md transition-all duration-300
                   focus:outline-none focus:ring-2 
                   ${
                     submitting
                       ? "bg-gray-400 cursor-not-allowed"
                       : "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-400"
                   }`}
      >
        {submitting ? "Procesando..." : "Agregar"}
      </button>

      {/* Mensaje de error */}
      {error && (
        <p className="text-red-500 text-sm mt-2 text-center sm:col-span-2">
          {error}
        </p>
      )}
    </form>
  );
}
