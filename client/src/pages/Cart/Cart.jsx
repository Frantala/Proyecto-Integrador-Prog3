import { useContext } from "react";
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";

const Cart = ({ cartItems, setCart, updateQuantity, removeFromCart }) => {
 
  const { theme } = useContext(ThemeContext);

  // Cálculo del total directo sin subtotal ni envío
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div style={{ backgroundColor: theme === "light" ? "#f0fbfc" : "#121212", minHeight: "100vh" }} className="py-5">
      <Container>
        {/* Título adaptativo */}
        <h1 className={`fw-bold mb-5 d-flex align-items-center gap-3 ${theme === "light" ? "text-dark" : "text-white"}`}>
          <ShoppingBag size={40} /> Mi Carrito
        </h1>

        <Row className="g-4">
          <Col lg={8}>
            <Card className={`border-0 shadow-sm p-3 ${theme === "light" ? "" : "bg-dark text-white"}`}>
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
                            {/* Texto de stock secundario adaptativo */}
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
              <div className="mt-3">
                {/* Enlace adaptativo */}
                <Link to="/" className={`text-decoration-none fw-semibold ${theme === "light" ? "text-primary" : "text-info"}`}>
                  ← Continuar comprando
                </Link>
              </div>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className={`border-0 shadow-sm overflow-hidden ${theme === "light" ? "" : "bg-dark"}`}>
              {/* Encabezado corregido y adaptativo */}
              <Card.Header 
                style={{ backgroundColor: theme === "light" ? "#c1f0f6" : "#1a1a1a" }} 
                className={`py-3 border-0 text-center fw-bold ${theme === "light" ? "text-dark" : "text-white"}`}
              >
                <h5 className="mb-0 fw-bold">Resumen de Compra</h5>
              </Card.Header>
              <Card.Body className="p-4" style={{ backgroundColor: theme === "light" ? "#ffffff" : "#212529", color: theme === "light" ? "#000000" : "#ffffff" }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <span className="fs-5 fw-bold">Total a pagar</span>
                  {/* Color del precio total adaptativo */}
                  <span className={`fs-4 fw-bold ${theme === "light" ? "text-primary" : "text-info"}`}>
                    ${total.toLocaleString()}
                  </span>
                </div>

                <Button 
                  className="w-100 py-3 fw-bold border-0" 
                  style={{ backgroundColor: "#2563eb" }}
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