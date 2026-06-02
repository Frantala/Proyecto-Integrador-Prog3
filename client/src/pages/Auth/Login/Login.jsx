import { useState, useContext } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeContext";
import { AuthContext } from "../../../context/AuthContext";
import Toast from 'react-bootstrap/Toast';

function Login() {
  const { theme } = useContext(ThemeContext);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success"); // "success" o "error"

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar antes de enviar
    validarCampoEnTiempoReal("username", formData.username);
    validarCampoEnTiempoReal("email", formData.email);
    validarCampoEnTiempoReal("password", formData.password);

    const tieneErrores = Object.values(errors).some(error => error !== undefined);
    const camposVacios = !formData.username || !formData.email || !formData.password;

    if (tieneErrores || camposVacios) return;

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error del servidor (Código ${response.status})`);
      }

      const data = await response.json();
      login(data.token);

      // Toast de éxito
      setToastType("success");
      setToastMessage("Inicio de sesión exitoso");
      setShowToast(true);

      // Redirigir al inicio
      navigate("/inicio");
    } catch (err) {
      // Toast de error
      setToastType("error");
      setToastMessage(err.message); // ahora solo "usuario no encontrado"
      setShowToast(true);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <Card className={`shadow-lg border-0 ${theme === "light" ? "" : "bg-dark"}`}>
            <Card.Header style={{ backgroundColor: theme === "light" ? "#c1f0f6" : "#1a1a1a" }}>
              <h2 className={`fw-bold text-center mb-0 ${theme === "light" ? "text-dark" : "text-white"}`}>
                Iniciar Sesión
              </h2>
            </Card.Header>
            <Card.Body style={{ backgroundColor: theme === "light" ? "#e0f7fa" : "#212529" }}>
              <Form noValidate onSubmit={handleSubmit}>
                {/* Username */}
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
                    className={theme === "light" ? "" : "bg-secondary"}
                    style={theme === "light" ? {} : { color: "#020202" }}
                  />
                  <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                </Form.Group>

                {/* Email */}
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
                    isInvalid={!!errors.email}
                    isValid={formData.email && !errors.email}
                    className={theme === "light" ? "" : "bg-secondary"}
                    style={theme === "light" ? {} : { color: "#020202" }}
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                {/* Password */}
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
                    isInvalid={!!errors.password}
                    isValid={formData.password && !errors.password}
                    className={theme === "light" ? "" : "bg-secondary"}
                    style={theme === "light" ? {} : { color: "#020202" }}
                  />
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100 fw-semibold"
                  style={{ backgroundColor: "#2563eb", border: "none" }}
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

              <Toast
                bg={toastType === "error" ? "danger" : "success"}
                onClose={() => setShowToast(false)}
                show={showToast}
                delay={5000}
                autohide
                className="mt-3"
              >
                <Toast.Header>
                  <strong className="me-auto">
                    {toastType === "error" ? "Error" : "Éxito"}
                  </strong>
                </Toast.Header>
                <Toast.Body className="text-white">{toastMessage}</Toast.Body>
              </Toast>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
