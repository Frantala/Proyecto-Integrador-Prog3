import { createContext, useState, useEffect } from "react";

// 1. Creamos el contexto vacío
export const ThemeContext = createContext();

// 2. Creamos el componente Proveedor
export const ThemeProvider = ({ children }) => {
  // Aquí guardamos el estado del tema ('light' o 'dark')
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("hustlery_theme");
    return savedTheme ? savedTheme : "light";
  });

  // 3. Cada vez que el 'theme' cambie, lo guardamos automáticamente en localStorage
  useEffect(() => {
    localStorage.setItem("hustlery_theme", theme);
  }, [theme]);

  // Función para alternar entre claro y oscuro
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    // Pasamos el estado y la función en el objeto 'value'
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};