import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

// Ruta protegida configurable por rol
function ProtectedRoute({ children, allowedRoles = ["admin", "super-admin"] }) {
  const { token, user } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const hasRole = user && allowedRoles.includes(user.role);

  if (!hasRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
