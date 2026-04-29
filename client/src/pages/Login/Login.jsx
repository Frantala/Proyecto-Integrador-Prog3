import { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
    alert("Funcionalidad de login en desarrollo");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="shadow-lg border-0">
            <Card.Header style={{ backgroundColor: "#c1f0f6" }}>
              <h4 className="fw-bold text-dark mb-0">Iniciar Sesión</h4>
            </Card.Header>
            <Card.Body style={{ backgroundColor: "#e0f7fa" }}>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label className="fw-semibold text-dark">Nombre de Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Ingresa tu nombre de usuario"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label className="fw-semibold text-dark">Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ejemplo@email.com"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="password">
                  <Form.Label className="fw-semibold text-dark">Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Ingresa tu contraseña"
                    required
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100 fw-semibold"
                  style={{ backgroundColor: "#2563eb", border: "none" }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#1d4ed8"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#2563eb"}
                >
                  Iniciar Sesión
                </Button>
              </Form>

              <div className="text-center mt-3">
                <a href="#" className="text-decoration-none" style={{ color: "#2563eb" }}>
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <div className="text-center mt-3 pt-3 border-top">
                <span className="text-muted">¿No tienes cuenta? </span>
                <a href="#" className="text-decoration-none fw-semibold" style={{ color: "#2563eb" }}>
                  Regístrate
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;