import { Moon, Sun } from "lucide-react";

const ThemeToggle = ({ mode, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center cursor-pointer gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg transition-colors duration-300
                 hover:bg-gray-600 dark:hover:bg-gray-400 text-sm font-medium"
    >
      {mode === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      <span className="hidden md:inline">
        {mode === "dark" ? "Light Mode" : "Dark Mode"}
      </span>
    </button>
  );
};

export default ThemeToggle;
