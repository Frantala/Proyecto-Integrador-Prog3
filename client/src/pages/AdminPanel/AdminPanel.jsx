import { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card, Toast, ToastContainer, Spinner } from "react-bootstrap";
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../../utils/authFetch";

function AdminPanel() {
  const { theme } = useContext(ThemeContext);
  const { token, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const [formData, setFormData] = useState({
    nombre: "",
    marca: "",
    precio: "",
    stock: "",
    imagenUrl: ""
  });

  const [errors, setErrors] = useState({});

  // Verificar si el usuario es admin al cargar el componente
  useEffect(() => {
    if (!token || !user) {
      navigate("/login");
      return;
    }

    const isAdmin = user.role === "admin" || user.role === "superadmin" || user.role === "super-admin";
    if (!isAdmin) {
      navigate("/");
      return;
    }

    setIsAuthorized(true);
    setLoading(false);
  }, [token, user, navigate]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Container>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  const validarCampoEnTiempoReal = (name, value) => {
    let errorMensaje = "";
    const trimmedValue = value.trim();

    if (trimmedValue === "") {
      errorMensaje = "Este campo es obligatorio";
    } else if (name === "nombre" && trimmedValue.length < 3) {
      errorMensaje = "El nombre debe tener al menos 3 caracteres";
    } else if (name === "marca" && trimmedValue.length < 2) {
      errorMensaje = "La marca debe tener al menos 2 caracteres";
    } else if (name === "precio") {
      const precioFloat = parseFloat(value);
      if (isNaN(precioFloat) || precioFloat <= 0) {
        errorMensaje = "El precio debe ser un número mayor a 0";
      }
    } else if (name === "stock") {
      const stockInt = Number(value);
      if (!Number.isInteger(stockInt) || stockInt < 0) {
        errorMensaje = "El stock debe ser un número entero mayor o igual a 0";
      }
    } else if (name === "imagenUrl") {
  // Aceptar Base64 o URLs
  const isBase64 = trimmedValue.startsWith("data:image/");
  const isUrl = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$|^(\/[\w\-.\/]+\.(?:png|jpg|jpeg|gif|webp))$/i.test(trimmedValue);
  
  if (!isBase64 && !isUrl) {
    errorMensaje = "Debes seleccionar una imagen válida";
  }
}

    setErrors(prev => ({
      ...prev,
      [name]: errorMensaje || undefined
    }));
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    const { nombre, marca, precio, stock, imagenUrl } = formData;
    const trimmedName = nombre.trim();
    const trimmedBrand = marca.trim();
    const trimmedImage = imagenUrl.trim();

    if (!trimmedName) {
      nuevosErrores.nombre = "El nombre es obligatorio";
    } else if (trimmedName.length < 3) {
      nuevosErrores.nombre = "El nombre debe tener al menos 3 caracteres";
    }

    if (!trimmedBrand) {
      nuevosErrores.marca = "La marca es obligatoria";
    } else if (trimmedBrand.length < 2) {
      nuevosErrores.marca = "La marca debe tener al menos 2 caracteres";
    }

    const precioFloat = parseFloat(precio);
    if (precio === "") {
      nuevosErrores.precio = "El precio es obligatorio";
    } else if (isNaN(precioFloat) || precioFloat <= 0) {
      nuevosErrores.precio = "El precio debe ser un número mayor a 0";
    }

    const stockInt = Number(stock);
    if (stock === "") {
      nuevosErrores.stock = "El stock es obligatorio";
    } else if (!Number.isInteger(stockInt) || stockInt < 0) {
      nuevosErrores.stock = "El stock debe ser un número entero mayor o igual a 0";
    }

    const regexUrl = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$|^(\/[\w\-.\/]+\.(?:png|jpg|jpeg|gif|webp))$/i;
    if (!trimmedImage) {
  nuevosErrores.imagenUrl = "La imagen es obligatoria";
} else {
  const isBase64 = trimmedImage.startsWith("data:image/");
  const isUrl = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$|^(\/[\w\-.\/]+\.(?:png|jpg|jpeg|gif|webp))$/i.test(trimmedImage);
  
  if (!isBase64 && !isUrl) {
    nuevosErrores.imagenUrl = "Debes seleccionar una imagen válida";
  }
}

    setErrors(nuevosErrores);
    return nuevosErrores;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    validarCampoEnTiempoReal(name, value);
  };

  const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    setFormData({
      ...formData,
      imagenUrl: event.target.result
    });
    validarCampoEnTiempoReal("imagenUrl", event.target.result);
  };
  reader.readAsDataURL(file);
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    validarCampoEnTiempoReal("nombre", formData.nombre);
    validarCampoEnTiempoReal("marca", formData.marca);
    validarCampoEnTiempoReal("precio", formData.precio);
    validarCampoEnTiempoReal("stock", formData.stock);
    validarCampoEnTiempoReal("imagenUrl", formData.imagenUrl);

    const nuevosErrores = validarFormulario();
    const tieneErrores = Object.keys(nuevosErrores).length > 0;

    if (tieneErrores) {
      setToastType("error");
      setToastMessage("Por favor, completa todos los campos correctamente.");
      setShowToast(true);
      return;
    }

    try {
      const response = await authFetch("http://localhost:3000/api/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({
          nombre: formData.nombre.trim(),
          marca: formData.marca.trim(),
          precio: parseFloat(formData.precio),
          stock: parseInt(formData.stock, 10),
          imagenUrl: formData.imagenUrl.trim()
        })
      }, logout, navigate);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear el producto");
      }

      setToastType("success");
      setToastMessage("¡Producto creado correctamente!");
      setShowToast(true);

      setFormData({
        nombre: "",
        marca: "",
        precio: "",
        stock: "",
        imagenUrl: ""
      });
      // Recargar la página para que la vista principal muestre el nuevo producto
      window.location.reload();

    } catch (error) {
      setToastType("error");
      setToastMessage(error.message);
      setShowToast(true);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={4000} autohide bg={toastType === "success" ? "success" : "danger"}>
          <Toast.Header closeButton={false}>
            <strong className="me-auto">{toastType === "success" ? "Éxito" : "Error"}</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

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
                    className={theme === "light" ? "" : "bg-secondary"}
                    style={theme === "light" ? {} : { color: "#020202" }}
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
                    className={theme === "light" ? "" : "bg-secondary"}
                    style={theme === "light" ? {} : { color: "#020202" }}
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
                        className={theme === "light" ? "" : "bg-secondary"}
                        style={theme === "light" ? {} : { color: "#020202" }}
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
                        className={theme === "light" ? "" : "bg-secondary"}
                        style={theme === "light" ? {} : { color: "#020202" }}
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
                    type="file"
                    name="imagen"
                    accept="image/*"
                    onChange={handleFileChange}
                    isInvalid={!!errors.imagenUrl}
                    isValid={formData.imagenUrl && !errors.imagenUrl}
                    className={theme === "light" ? "" : "bg-secondary"}
                    style={theme === "light" ? {} : { color: "#020202" }}
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
