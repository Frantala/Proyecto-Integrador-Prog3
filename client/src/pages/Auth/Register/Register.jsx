import { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username || formData.username.length < 4) {
      newErrors.username = "Debe tener al menos 4 caracteres";
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Formato de email inválido";
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Debe tener al menos 6 caracteres";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Register attempt:", formData);
      alert("Funcionalidad de registro en desarrollo");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="shadow-lg border-0">
            <Card.Header style={{ backgroundColor: "#c1f0f6" }}>
              <h2 className="fw-bold text-dark text-center mb-0">Crear una nueva cuenta</h2>
            </Card.Header>
            <Card.Body style={{ backgroundColor: "#e0f7fa" }}>
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label className="fw-semibold text-dark">Nombre de Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Ingresa tu nombre de usuario"
                    required
                    isInvalid={!!errors.username}
                    isValid={formData.username && !errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
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
                    isInvalid={!!errors.email}
                    isValid={formData.email && !errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label className="fw-semibold text-dark">Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Ingresa tu contraseña"
                    required
                    isInvalid={!!errors.password}
                    isValid={formData.password && !errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="confirmPassword">
                  <Form.Label className="fw-semibold text-dark">Confirmar Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repite tu contraseña"
                    required
                    isInvalid={!!errors.confirmPassword}
                    isValid={formData.confirmPassword && !errors.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100 fw-semibold"
                  style={{ backgroundColor: "#2563eb", border: "none" }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#1d4ed8"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#2563eb"}
                >
                  Registrarse
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
