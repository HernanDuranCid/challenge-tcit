import { useState } from "react";

export default function PostFilter({ onFilter }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    onFilter(e.target.value);
  };

  return (
    <div className="w-full">
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
