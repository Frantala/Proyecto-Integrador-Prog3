import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

// ruta protegida para los admin
function ProtectedRoute({ children }) {
  const { token, user } = useContext(AuthContext);

  const isAdmin = user?.role === "admin" || user?.role === "super-admin";

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;