import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  // Intentamos cargar el usuario guardado (si existe)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser || savedUser === "undefined") {
      localStorage.removeItem("user"); // Limpiar valor inválido
      return null;
    }
    try {
      return JSON.parse(savedUser);
    } catch (error) {
      console.error("Error parsing saved user:", error);
      localStorage.removeItem("user"); // Limpiar si no es JSON válido
      return null;
    }
  });

  // Ahora el login recibe el token y los datos del usuario que manda el backend
  const login = (userToken, userData) => {
    localStorage.setItem("token", userToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(userToken);
    setUser(userData);
  };

  // Funcion de cerrar sesion
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};