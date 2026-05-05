import { Navbar as BootstrapNavbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-hustlery.png";
import "../../Navbar.css";


const CustomNavbar = () => {
  return (
    <BootstrapNavbar className="navbar-custom shadow-sm" style={{ backgroundColor: "#c1f0f6" }}>
      <Container fluid className="d-flex justify-content-between align-items-center">
        
        {/* Brand */}
        <BootstrapNavbar.Brand as={Link} to="/" className="brand-custom d-flex align-items-center">
          <img
            src={logo}
            alt="Hustlery Logo"
            className="logo-navbar me-2 d-inline-block align-text-top"
          />
          <span className="brand-text">Hustlery</span>
        </BootstrapNavbar.Brand>

        {/* Links */}
        <Nav className="nav-links mx-auto fw-medium">
          <Nav.Link as={Link} to="/">Inicio</Nav.Link>
          <Nav.Link as={Link} to="/about-us">Sobre Nosotros</Nav.Link>
        </Nav>

        {/* Icons */}
        <Nav className="nav-icons align-items-center">
          <Nav.Link as={Link} to="/cart">🛒</Nav.Link>
          <Nav.Link as={Link} to="/login">👤</Nav.Link>
        </Nav>
      </Container>
    </BootstrapNavbar>
  );
};

export default CustomNavbar;
