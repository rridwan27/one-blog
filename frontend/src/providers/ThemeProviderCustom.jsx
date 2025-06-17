import { createContext, useEffect, useState, use } from "react";

const ThemeContext = createContext();

export const ThemeProviderCustom = ({ children }) => {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const savedMode = localStorage.getItem("theme") || "light";
    setMode(savedMode);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  const toggleTheme = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  return <ThemeContext value={{ mode, toggleTheme }}>{children}</ThemeContext>;
};

export const useThemeMode = () => use(ThemeContext);
