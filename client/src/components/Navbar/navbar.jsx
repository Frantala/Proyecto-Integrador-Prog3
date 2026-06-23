import { useContext } from "react";
import { Navbar as BootstrapNavbar, Container, Nav } from "react-bootstrap";
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext"; 
import { Link, useNavigate } from "react-router-dom"; 
import logo from "../../assets/logo-hustlery.png";
import "./Navbar.css";

const CustomNavbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { token, user, logout } = useContext(AuthContext); 
  const navigate = useNavigate(); 

  // verificacion de roles
  const isAdmin = user && (user.role === "admin" || user.role === "superadmin" || user.role === "super-admin");
  const isSuperAdmin = user && (user.role === "super-admin" || user.role === "superadmin");

  // Función para manejar el clic en cerrar sesión
  const handleLogout = () => {
    logout();
    navigate("/login"); // Lo mandamos de vuelta al login al salir
  };

  return (
    <BootstrapNavbar
      expand="lg"
      className="navbar-custom shadow-sm"
      style={{ backgroundColor: theme === "light" ? "#c1f0f6" : "#1a1a1a" }}
      variant={theme === "light" ? "light" : "dark"}
      sticky="top"
    >
      <Container fluid>
        <BootstrapNavbar.Brand as={Link} to="/" className="brand-custom d-flex align-items-center">
          <img
            src={logo}
            alt="Hustlery Logo"
            className="logo-navbar d-inline-block align-text-top"
          />
          <span className="brand-text">Hustlery</span>
        </BootstrapNavbar.Brand>

        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggler-custom" />

      
        <BootstrapNavbar.Collapse id="basic-navbar-nav" className="navbar-collapse-custom">
          <Nav className="nav-links fw-medium">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/about-us">Sobre Nosotros</Nav.Link>
            {isAdmin && (
              <Nav.Link as={Link} to="/admin">
                Admin
              </Nav.Link>
            )}
            {isSuperAdmin && (
              <Nav.Link as={Link} to="/superadmin">
                SuperAdmin
              </Nav.Link>
            )}
          </Nav>

          <Nav className="nav-icons align-items-center">
            <Nav.Link as={Link} to="/cart">🛒</Nav.Link>
            
            
            {token ? (
              <Nav.Link 
                onClick={handleLogout} 
                style={{ cursor: "pointer" }} 
                title="Cerrar Sesión"
              >
                🚪
              </Nav.Link>
            ) : (
              <Nav.Link 
                as={Link} 
                to="/login" 
                title="Iniciar Sesión"
              >
                👤
              </Nav.Link>
            )}

            <Nav.Link onClick={toggleTheme} style={{ cursor: "pointer" }}>
              {theme === "light" ? "🌘" : "☀️"}
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default CustomNavbar;
