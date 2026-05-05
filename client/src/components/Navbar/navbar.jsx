import { Navbar as BootstrapNavbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-hustlery.png";
import "./navbar.css";

const CustomNavbar = () => {
  return (
    <BootstrapNavbar 
      expand="lg"                 
      className="navbar-custom shadow-sm" 
      style={{ backgroundColor: "#c1f0f6" }}
    >
      <Container fluid>
        
        {/* Brand */}
        <BootstrapNavbar.Brand 
          as={Link} 
          to="/" 
          className="brand-custom d-flex align-items-center"
        >
          <img
            src={logo}
            alt="Hustlery Logo"
            className="logo-navbar me-2 d-inline-block align-text-top"
          />
          <span className="brand-text">Hustlery</span>
        </BootstrapNavbar.Brand>

        {/* Botón hamburguesa */}
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Contenido colapsable */}
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto fw-medium">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/about-us">Sobre Nosotros</Nav.Link>
          </Nav>

          <Nav className="nav-icons align-items-center">
            <Nav.Link as={Link} to="/cart">🛒</Nav.Link>
            <Nav.Link as={Link} to="/login">👤</Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default CustomNavbar;
