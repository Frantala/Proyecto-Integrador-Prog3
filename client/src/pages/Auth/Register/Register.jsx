import { useState, useContext } from "react";
import { Container, Row, Col, Form, Button, Card, Toast, ToastContainer } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; 
import { ThemeContext } from "../../../context/ThemeContext";

function Register() {
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("success");
  const [toastMessage, setToastMessage] = useState("");

  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    name: "", 
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  const validarCampo = (name, value) => {
    let errorMensaje = "";

    if (name === "name" && value.trim().length > 0 && value.length < 4) {
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

    if (!formData.name || formData.name.trim().length < 4) {
      newErrors.name = "Debe tener al menos 4 caracteres";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setToastType("error");
      setToastMessage("Por favor, revisa los errores del formulario.");
      setShowToast(true);
      return; 
    }

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: formData.name, 
          email: formData.email, 
          password: formData.password 
        })
      });

      if (!response.ok) {
        const errorText = await response.text(); 
        let errorMessage = `Error del servidor (Código ${response.status})`;
        
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          if (errorText) errorMessage = errorText; 
        }

        throw new Error(errorMessage);
      }

      await response.json();

      setToastType("success");
      setToastMessage("¡Registro completado con éxito! Ya podés ingresar");
      setShowToast(true);

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setToastType("error");
      setToastMessage(err.message);
      setShowToast(true);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      {}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={4000} autohide bg={toastType === "success" ? "success" : "danger"}>
          <Toast.Header closeButton={false}>
            <strong className="me-auto">{toastType === "success" ? "Éxito" : "Error"}</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <Card className={`shadow-lg border-0 ${theme === "light" ? "" : "bg-dark"}`}>
            
            <Card.Header style={{ backgroundColor: theme === "light" ? "#c1f0f6" : "#1a1a1a" }}>
              <h2 className={`fw-bold text-center mb-0 ${theme === "light" ? "text-dark" : "text-white"}`}>Crear una nueva cuenta</h2>
            </Card.Header>
            
            <Card.Body style={{ backgroundColor: theme === "light" ? "#e0f7fa" : "#212529" }}>
              <Form noValidate onSubmit={handleSubmit}>
                
                {}
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label className={`fw-semibold ${theme === "light" ? "text-dark" : "text-white"}`}>Nombre de Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ingresa tu nombre de usuario"
                    required
                    isInvalid={!!errors.name}
                    isValid={formData.name && !errors.name}
                    className={theme === "light" ? "" : "bg-secondary"}
                    style={theme === "light" ? {} : { color: "#020202" }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
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
                    className={theme === "light" ? "" : "bg-secondary"}
                    style={theme === "light" ? {} : { color: "#020202" }}
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
                    className={theme === "light" ? "" : "bg-secondary"}
                    style={theme === "light" ? {} : { color: "#020202" }}
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
                    className={theme === "light" ? "" : "bg-secondary"}
                    style={theme === "light" ? {} : { color: "#020202" }}
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