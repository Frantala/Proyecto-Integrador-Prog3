import { Container, Row, Col } from "react-bootstrap";
import { InstagramIcon } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-info bg-opacity-25 mt-5 py-4">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} sm={6} className="text-center text-sm-start mb-3 mb-sm-0">
            <p className="mb-0 text-dark">
              © 2026 Hustlery. Todos los derechos reservados.
            </p>
          </Col>

          <Col xs={12} sm={6} className="d-flex justify-content-center justify-content-sm-end">
            <a
              href="https://www.instagram.com/hustlery__"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-dark d-flex align-items-center gap-2"
            >
              <InstagramIcon size={24} color="black" />
              <span>Instagram</span>
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
