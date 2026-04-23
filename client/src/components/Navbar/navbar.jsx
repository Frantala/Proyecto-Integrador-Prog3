import { Navbar as BootstrapNavbar, Container, Nav } from 'react-bootstrap';
import logo from '../../assets/logo-hustlery.png'; 

const CustomNavbar = ({ setView }) => { 
  return (
    <BootstrapNavbar expand="lg" style={{ backgroundColor: '#c1f0f6' }} className="px-4 py-3 shadow-sm">
      <Container fluid>
        <div className="navbar-brand fw-bold fs-3 d-flex align-items-center">
          <img
            src={logo}
            alt="Hustlery Logo"
            height="60"
            className="me-2 d-inline-block align-text-top"
          />
          Hustlery
        </div>

        <BootstrapNavbar.Toggle aria-controls="navbar-nav" />
        <BootstrapNavbar.Collapse id="navbar-nav">
          <Nav className="mx-auto fw-medium">
            <Nav.Link href="#" onClick={(e) => { e.preventDefault(); setView('inicio'); }}>
              Inicio
            </Nav.Link>
            <Nav.Link href="#" onClick={(e) => { e.preventDefault(); setView('about'); }}>
              Sobre Nosotros
            </Nav.Link>
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