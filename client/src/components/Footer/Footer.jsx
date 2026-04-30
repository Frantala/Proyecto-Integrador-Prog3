import { Container, Row, Col } from "react-bootstrap";
import { FaInstagram } from "react-icons/fa"; 

function Footer() {
  return (
    <footer style={{ backgroundColor: "#c1f0f6" }} className="mt-5 py-3 shadow-sm">
      <Container className="h-100">
        <Row className="align-items-center h-100">
          {/* Texto */}
          <Col xs={12} sm={6} className="text-center text-sm-start">
            <p className="mb-0 text-dark">
              © 2026 Hustlery. Todos los derechos reservados.
            </p>
          </Col>

          {/* Redes */}
          <Col xs={12} sm={6} className="d-flex justify-content-center justify-content-sm-end">
            <a
              href="https://www.instagram.com/hustlery__"
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex align-items-center gap-2 text-dark text-decoration-none"
            >
              <FaInstagram size={24} color="black" />
              <span>Instagram</span>
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
