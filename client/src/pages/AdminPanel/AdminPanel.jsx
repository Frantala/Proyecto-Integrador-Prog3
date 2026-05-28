import { useState, useContext } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { ThemeContext } from "../../context/ThemeContext";

function AdminPanel() {
  const { theme } = useContext(ThemeContext);

  const [formData, setFormData] = useState({
    nombre: "",
    marca: "",
    precio: "",
    stock: "",
    imagenUrl: ""
  });

  const [errors, setErrors] = useState({});

  const validarCampoEnTiempoReal = (name, value) => {
    let errorMensaje = "";

    if (value.trim() === "") {
      setErrors(prev => ({ ...prev, [name]: undefined }));
      return;
    }

    if (name === "nombre" && value.length < 3) {
      errorMensaje = "El nombre debe tener al menos 3 caracteres";
    }

    if (name === "marca" && value.length < 2) {
      errorMensaje = "La marca debe tener al menos 2 caracteres";
    }

    if (name === "precio" && (isNaN(value) || parseFloat(value) <= 0)) {
      errorMensaje = "El precio debe ser mayor a 0";
    }

    if (name === "stock" && (isNaN(value) || parseInt(value) < 0)) {
      errorMensaje = "El stock no puede ser negativo";
    }

    if (name === "imagenUrl") {
      const regexUrl = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i;
      if (!regexUrl.test(value)) {
        errorMensaje = "Debe ser una URL válida de imagen";
      }
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

    validarCampoEnTiempoReal("nombre", formData.nombre);
    validarCampoEnTiempoReal("marca", formData.marca);
    validarCampoEnTiempoReal("precio", formData.precio);
    validarCampoEnTiempoReal("stock", formData.stock);
    validarCampoEnTiempoReal("imagenUrl", formData.imagenUrl);

    const tieneErrores = Object.values(errors).some(error => error !== undefined);
    const camposVacios = !formData.nombre || !formData.marca || !formData.precio || !formData.stock || !formData.imagenUrl;

    if (!tieneErrores && !camposVacios) {
      console.log("Producto listo para enviar:", formData);
      alert("Validación correcta. Backend se implementará a futuro.");
      setFormData({
        nombre: "",
        marca: "",
        precio: "",
        stock: "",
        imagenUrl: ""
      });
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Row className="w-100">
        <Col md={{ span: 8, offset: 2 }}>
          <Card className={`shadow-lg border-0 ${theme === "light" ? "" : "bg-dark"}`}>
            <Card.Header style={{ backgroundColor: theme === "light" ? "#c1f0f6" : "#1a1a1a" }}>
              <h2 className={`fw-bold text-center mb-0 ${theme === "light" ? "text-dark" : "text-white"}`}>
                Panel de Administración
              </h2>
            </Card.Header>
            <Card.Body style={{ backgroundColor: theme === "light" ? "#e0f7fa" : "#212529" }}>
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="nombre">
                  <Form.Label className={`fw-semibold ${theme === "light" ? "text-dark" : "text-white"}`}>
                    Nombre
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    isInvalid={!!errors.nombre}
                    isValid={formData.nombre && !errors.nombre}
                    className={theme === "light" ? "" : "bg-secondary text-white"}
                  />
                  <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="marca">
                  <Form.Label className={`fw-semibold ${theme === "light" ? "text-dark" : "text-white"}`}>
                    Marca
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="marca"
                    value={formData.marca}
                    onChange={handleChange}
                    isInvalid={!!errors.marca}
                    isValid={formData.marca && !errors.marca}
                    className={theme === "light" ? "" : "bg-secondary text-white"}
                  />
                  <Form.Control.Feedback type="invalid">{errors.marca}</Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="precio">
                      <Form.Label className={`fw-semibold ${theme === "light" ? "text-dark" : "text-white"}`}>
                        Precio
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="precio"
                        value={formData.precio}
                        onChange={handleChange}
                        isInvalid={!!errors.precio}
                        isValid={formData.precio && !errors.precio}
                        className={theme === "light" ? "" : "bg-secondary text-white"}
                      />
                      <Form.Control.Feedback type="invalid">{errors.precio}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="stock">
                      <Form.Label className={`fw-semibold ${theme === "light" ? "text-dark" : "text-white"}`}>
                        Stock
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        isInvalid={!!errors.stock}
                        isValid={formData.stock && !errors.stock}
                        className={theme === "light" ? "" : "bg-secondary text-white"}
                      />
                      <Form.Control.Feedback type="invalid">{errors.stock}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId="imagenUrl">
                  <Form.Label className={`fw-semibold ${theme === "light" ? "text-dark" : "text-white"}`}>
                    Imagen (URL)
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="imagenUrl"
                    value={formData.imagenUrl}
                    onChange={handleChange}
                    isInvalid={!!errors.imagenUrl}
                    isValid={formData.imagenUrl && !errors.imagenUrl}
                    className={theme === "light" ? "" : "bg-secondary text-white"}
                  />
                  <Form.Control.Feedback type="invalid">{errors.imagenUrl}</Form.Control.Feedback>
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100 fw-semibold"
                  style={{ backgroundColor: "#2563eb", border: "none" }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#1d4ed8"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#2563eb"}
                >
                  Agregar Producto
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminPanel;
