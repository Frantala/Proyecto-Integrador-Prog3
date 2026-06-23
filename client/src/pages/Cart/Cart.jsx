import { useContext, useState } from "react"; // <-- Sumamos useState para el mensaje de éxito
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // <-- Importamos useNavigate
import { ThemeContext } from "../../context/ThemeContext";

const Cart = ({ cartItems, setCart, updateQuantity, removeFromCart, token }) => {
 
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate(); // <-- Instanciamos el navegador
  const [successMessage, setSuccessMessage] = useState(""); // <-- Estado para el cartel de agradecimiento

  // Cálculo del total directo 
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  //Manejo del botón "Finalizar Compra"
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    if (!token) {
      // Si NO está logueado: Redirigimos al Login
      navigate("/login");
    } else {
      // SÍ está logueado: Mostramos el cartel de éxito y vaciamos el carrito
      setSuccessMessage("¡Muchas gracias por comprar en Hustlery!");
      setCart([]); // Vaciamos el carrito de la App
      
      // Limpiamos el mensaje 
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/"); // Lo mandamos al inicio después de comprar
      }, 3000);
    }
  };

  return (
    <div style={{ backgroundColor: theme === "light" ? "#f0fbfc" : "#121212", minHeight: "100vh" }} className="py-5">
      <Container>
        
        {successMessage && (
          <div style={{
            position: 'fixed',
            top: '100px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#198754', // Verde Success
            color: 'white',
            padding: '16px 32px',
            borderRadius: '30px',
            zIndex: 9999,
            fontWeight: '700',
            boxShadow: '0px 4px 15px rgba(0,0,0,0.3)',
            whiteSpace: 'nowrap',
            fontSize: '1.2rem'
          }}>
            {successMessage}
          </div>
        )}

        <h1 className={`fw-bold mb-5 d-flex align-items-center gap-3 ${theme === "light" ? "text-dark" : "text-white"}`}>
          <ShoppingBag size={40} /> Mi Carrito
        </h1>

        <Row className="g-4">
          <Col lg={8}>
            <Card className={`border-0 shadow-sm p-3 ${theme === "light" ? "" : "bg-dark text-white"}`}>
              {cartItems.length === 0 ? (
                <div className="text-center py-5">
                  <p className="fs-5 text-muted">No tienes productos en el carrito.</p>
                </div>
              ) : (
                <Table responsive className="align-middle" variant={theme === "light" ? "light" : "dark"}>
                  <thead>
                    <tr className={`border-bottom ${theme === "light" ? "text-muted" : "text-white-50"}`}>
                      <th>Producto</th>
                      <th className="text-center">Cantidad</th>
                      <th className="text-center">Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              style={{ width: "70px", borderRadius: "8px" }} 
                            />
                            <div>
                              <p className="mb-0 fw-bold">{item.name}</p>
                              <small className={theme === "light" ? "text-muted" : "text-white-50"}>
                                Disponibles: {item.stock}
                              </small>
                            </div>
                          </div>
                        </td>
                        <td className="text-center">
                          <div className="d-flex flex-column align-items-center">
                            <div className="d-flex align-items-center justify-content-center gap-2">
                              <Button 
                                variant={theme === "light" ? "outline-secondary" : "outline-light"} 
                                size="sm" 
                                className="rounded-circle p-1"
                                disabled={item.quantity <= 1}
                                onClick={() => updateQuantity(item.id, 'decrease')}
                              >
                                <Minus size={14} />
                              </Button>
                              
                              <span className="fw-bold px-2">{item.quantity}</span>
                              
                              <Button 
                                variant={theme === "light" ? "outline-secondary" : "outline-light"} 
                                size="sm" 
                                className="rounded-circle p-1"
                                disabled={item.quantity >= item.stock}
                                onClick={() => updateQuantity(item.id, 'increase')}
                              >
                                <Plus size={14} />
                              </Button>
                            </div>
                            {item.quantity >= item.stock && (
                              <small className="text-danger mt-1" style={{ fontSize: '0.7rem' }}>
                                Límite alcanzado
                              </small>
                            )}
                          </div>
                        </td>
                        <td className="text-center fw-bold">
                          ${(item.price * item.quantity).toLocaleString()}
                        </td>
                        <td className="text-end">
                          <Button variant="link" className="text-danger p-0" onClick={() => removeFromCart(item.id)}>
                            <Trash2 size={18} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
              <div className="mt-3">
                <Link to="/" className={`text-decoration-none fw-semibold ${theme === "light" ? "text-primary" : "text-info"}`}>
                  ← Continuar comprando
                </Link>
              </div>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className={`border-0 shadow-sm overflow-hidden ${theme === "light" ? "" : "bg-dark"}`}>
              <Card.Header 
                style={{ backgroundColor: theme === "light" ? "#c1f0f6" : "#1a1a1a" }} 
                className={`py-3 border-0 text-center fw-bold ${theme === "light" ? "text-dark" : "text-white"}`}
              >
                <h5 className="mb-0 fw-bold">Resumen de Compra</h5>
              </Card.Header>
              <Card.Body className="p-4" style={{ backgroundColor: theme === "light" ? "#ffffff" : "#212529", color: theme === "light" ? "#000000" : "#ffffff" }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <span className="fs-5 fw-bold">Total a pagar</span>
                  <span className={`fs-4 fw-bold ${theme === "light" ? "text-primary" : "text-info"}`}>
                    ${total.toLocaleString()}
                  </span>
                </div>
                <Button 
                  className="w-100 py-3 fw-bold border-0" 
                  style={{ backgroundColor: "#2563eb" }}
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                >
                  Finalizar Compra
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Cart;