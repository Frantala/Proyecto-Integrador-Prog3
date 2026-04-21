import { Navbar, Container, Nav } from 'react-bootstrap';

const CustomNavbar = () => {
  return (
    <Navbar expand="lg" style={{ backgroundColor: '#c1f0f6' }} className="px-4 py-3">
      <Container fluid>
        <Navbar.Brand href="#" className="fw-bold fs-3">CapStyle</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto fw-medium">
            <Nav.Link href="#">Inicio</Nav.Link>
            <Nav.Link href="#">Nosotros</Nav.Link>
            <Nav.Link href="#">Contacto</Nav.Link>
          </Nav>
          <Nav className="gap-3 align-items-center">
            <Nav.Link href="#" style={{ fontSize: '1.2rem' }}>🛒</Nav.Link>
            <Nav.Link href="#" style={{ fontSize: '1.2rem' }}>👤</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
