import { Navbar as BootstrapNavbar, Container, Nav } from 'react-bootstrap';
import logo from '../assets/logo-hustlery.png'; 

const CustomNavbar = () => {
  return (
    <BootstrapNavbar expand="lg" style={{ backgroundColor: '#c1f0f6' }} className="px-4 py-3">
      <Container fluid>
        <BootstrapNavbar.Brand href="#" className="fw-bold fs-3 d-flex align-items-center">
          {/* Logo */}
          <img
            src={logo}
            alt="CapStyle Logo"
            height="60"
            className="me-2 d-inline-block align-text-top"
          />
          {/* Texto */}
          Hustlery
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="navbar-nav" />
        <BootstrapNavbar.Collapse id="navbar-nav">
          <Nav className="mx-auto fw-medium">
            <Nav.Link href="#">Inicio</Nav.Link>
            <Nav.Link href="#">sobre Nosotros</Nav.Link>
          </Nav>
          <Nav className="gap-3 align-items-center">
            <Nav.Link href="#" style={{ fontSize: '1.2rem' }}>🛒</Nav.Link>
            <Nav.Link href="#" style={{ fontSize: '1.2rem' }}>👤</Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default CustomNavbar;
