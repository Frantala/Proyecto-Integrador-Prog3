import { useContext } from "react";
import { Navbar as BootstrapNavbar, Container, Nav } from "react-bootstrap";
import { ThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-hustlery.png";
import "./Navbar.css";

const CustomNavbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <BootstrapNavbar
      expand="lg"
      className="navbar-custom shadow-sm"
      style={{ backgroundColor: theme === "light" ? "#c1f0f6" : "#1a1a1a" }}
      variant={theme === "light" ? "light" : "dark"}
      sticky="top"
    >
      <Container fluid>
        {/* Brand */}
        <BootstrapNavbar.Brand as={Link} to="/" className="brand-custom d-flex align-items-center">
          <img
            src={logo}
            alt="Hustlery Logo"
            className="logo-navbar d-inline-block align-text-top"
          />
          <span className="brand-text">Hustlery</span>
        </BootstrapNavbar.Brand>

        {/* Toggle para menú hamburguesa en móvil */}
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggler-custom" />

        {/* Contenedor colapsable */}
        <BootstrapNavbar.Collapse id="basic-navbar-nav" className="navbar-collapse-custom">
          {/* Links - Centered */}
          <Nav className="nav-links fw-medium">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/about-us">Sobre Nosotros</Nav.Link>
            {/* ✅ Nuevo link al AdminPanel */}
            <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
          </Nav>

          {/* Icons - Right */}
          <Nav className="nav-icons align-items-center">
            <Nav.Link as={Link} to="/cart">🛒</Nav.Link>
            <Nav.Link as={Link} to="/login">👤</Nav.Link>
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
