import { createContext, useState } from "react";

// 1. Creamos el contexto vacío
export const ThemeContext = createContext();

// 2. Creamos el componente Proveedor
export const ThemeProvider = ({ children }) => {
  // Aquí guardamos el estado del tema ('light' o 'dark')
  const [theme, setTheme] = useState("light");

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