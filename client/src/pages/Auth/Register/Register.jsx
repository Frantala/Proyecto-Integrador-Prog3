import { useState, useContext } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeContext";

function Register() {
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  const validarCampo = (name, value) => {
    let errorMensaje = "";

    if (name === "username" && value.trim().length > 0 && value.length < 4) {
      errorMensaje = "Debe tener al menos 4 caracteres";
    }

    if (name === "email") {
      if (value.trim().length > 0 && !value.includes("@")) {
        errorMensaje = "El email debe incluir @";
      } else if (value.trim().length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errorMensaje = "Formato de email inválido";
      }
    }

    if (name === "password" && value.trim().length > 0 && value.length < 6) {
      errorMensaje = "Debe tener al menos 6 caracteres";
    }

    if (name === "confirmPassword" && value.trim().length > 0 && value !== formData.password) {
      errorMensaje = "Las contraseñas no coinciden";
    }

    setErrors(prev => ({
      ...prev,
      [name]: errorMensaje || undefined
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    validarCampo(name, value);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username || formData.username.length < 4) {
      newErrors.username = "Debe tener al menos 4 caracteres";
    }

    if (!formData.email || formData.email.trim().length === 0) {
      newErrors.email = "El email es obligatorio";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "El email debe incluir @";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
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
          <Card className={`shadow-lg border-0 ${theme === "light" ? "" : "bg-dark"}`}>
            
            {/* Encabezado adaptable */}
            <Card.Header style={{ backgroundColor: theme === "light" ? "#c1f0f6" : "#1a1a1a" }}>
              <h2 className={`fw-bold text-center mb-0 ${theme === "light" ? "text-dark" : "text-white"}`}>Crear una nueva cuenta</h2>
            </Card.Header>
            
            {/* Cuerpo de tarjeta adaptable */}
            <Card.Body style={{ backgroundColor: theme === "light" ? "#e0f7fa" : "#212529" }}>
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label className={`fw-semibold ${theme === "light" ? "text-dark" : "text-white"}`}>Nombre de Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Ingresa tu nombre de usuario"
                    required
                    isInvalid={!!errors.username}
                    isValid={formData.username && !errors.username}
                    className={theme === "light" ? "" : "bg-secondary text-white placeholder-light"}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label className={`fw-semibold ${theme === "light" ? "text-dark" : "text-white"}`}>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ejemplo@email.com"
                    required
                    isInvalid={!!errors.email}
                    isValid={formData.email && !errors.email}
                    className={theme === "light" ? "" : "bg-secondary text-white placeholder-light"}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label className={`fw-semibold ${theme === "light" ? "text-dark" : "text-white"}`}>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Ingresa tu contraseña"
                    required
                    isInvalid={!!errors.password}
                    isValid={formData.password && !errors.password}
                    className={theme === "light" ? "" : "bg-secondary text-white placeholder-light"}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="confirmPassword">
                  <Form.Label className={`fw-semibold ${theme === "light" ? "text-dark" : "text-white"}`}>Confirmar Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repite tu contraseña"
                    required
                    isInvalid={!!errors.confirmPassword}
                    isValid={formData.confirmPassword && !errors.confirmPassword}
                    className={theme === "light" ? "" : "bg-secondary text-white placeholder-light"}
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

              <div className="text-center mt-3 pt-3 border-top">
                <span className={theme === "light" ? "text-muted" : "text-white-50"}>
                  ¿Ya tienes cuenta?{" "}
                </span>
                <Link to="/login" className={`text-decoration-none fw-semibold ${theme === "light" ? "text-primary" : "text-info"}`}>
                  Inicia sesión
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
