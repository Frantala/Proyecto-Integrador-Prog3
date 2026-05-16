import { useState, useContext } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeContext";

function Login() {
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const validarCampoEnTiempoReal = (name, value) => {
    let errorMensaje = "";
    
    if (value.trim() === "") {
      setErrors(prev => ({ ...prev, [name]: undefined }));
      return;
    }

    if (name === "username" && value.length < 4) {
      errorMensaje = "Debe tener al menos 4 caracteres";
    }

    if (name === "email") {
      if (!value.includes("@")) {
        errorMensaje = "El email debe incluir @";
      } else {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(value)) {
          errorMensaje = "Formato de email inválido";
        }
      }
    }

    if (name === "password" && value.length < 6) {
      errorMensaje = "Debe tener al menos 6 caracteres";
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

    validarCampoEnTiempoReal(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    validarCampoEnTiempoReal("username", formData.username);
    validarCampoEnTiempoReal("email", formData.email);
    validarCampoEnTiempoReal("password", formData.password);

    const tieneErrores = Object.values(errors).some(error => error !== undefined);
    const camposVacios = !formData.username || !formData.email || !formData.password;

    if (!tieneErrores && !camposVacios) {
      console.log("Login attempt:", formData);
      alert("Funcionalidad de login en desarrollo");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <Card className={`shadow-lg border-0 ${theme === "light" ? "" : "bg-dark"}`}>
            
            {/* Encabezado adaptable */}
            <Card.Header style={{ backgroundColor: theme === "light" ? "#c1f0f6" : "#1a1a1a" }}>
              <h2 className={`fw-bold text-center mb-0 ${theme === "light" ? "text-dark" : "text-white"}`}>
                Iniciar Sesión
              </h2>
            </Card.Header>
            
            {/* Cuerpo de tarjeta adaptable */}
            <Card.Body style={{ backgroundColor: theme === "light" ? "#e0f7fa" : "#212529" }}>
              <Form noValidate onSubmit={handleSubmit}>
                
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label className={`fw-semibold ${theme === "light" ? "text-dark" : "text-white"}`}>
                    Nombre de Usuario
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Ingresa tu nombre de usuario"
                    isInvalid={!!errors.username}
                    isValid={formData.username && !errors.username}
                    className={theme === "light" ? "" : "bg-secondary text-white placeholder-light"}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label className={`fw-semibold ${theme === "light" ? "text-dark" : "text-white"}`}>
                    Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ejemplo@email.com"
                    style={{
                      borderColor: errors.email ? "#d4183d" : undefined,
                      boxShadow: errors.email ? "0 0 0 0.2rem rgba(212, 24, 61, 0.15)" : undefined
                    }}
                    isInvalid={!!errors.email}
                    isValid={formData.email && !errors.email}
                    className={theme === "light" ? "" : "bg-secondary text-white placeholder-light"}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="password">
                  <Form.Label className={`fw-semibold ${theme === "light" ? "text-dark" : "text-white"}`}>
                    Contraseña
                  </Form.Label>
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

              <div className="text-center mt-3 pt-3 border-top">
                <span className={theme === "light" ? "text-muted" : "text-white-50"}>
                  ¿No tienes cuenta?{" "}
                </span>
                <Link to="/register" className={`text-decoration-none fw-semibold ${theme === "light" ? "text-primary" : "text-info"}`}>
                  Regístrate
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;