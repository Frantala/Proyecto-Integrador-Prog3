import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  // Datos de ejemplo incluyendo 'stock' para la validación visual
  const cartItems = [
    {
      id: 1,
      name: "Gorra Chicago Bulls Red Visor",
      price: 45000,
      quantity: 1,
      stock: 5,
      image: "/public/images/Gorra-Chicag-Bulls.jpeg",
      category: "Classic"
    },
    {
      id: 2,
      name: "Gorra Chicago Bulls Negra",
      price: 48000,
      quantity: 2,
      stock: 3,
      image: "/public/images/Gorra-Chicago-Bulls-Negra.jpeg",
      category: "Urban"
    }
  ];

  // Cálculo del total directo sin subtotal ni envío
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div style={{ backgroundColor: "#f0fbfc", minHeight: "100vh" }} className="py-5">
      <Container>
        <h1 className="fw-bold mb-5 d-flex align-items-center gap-3">
          <ShoppingBag size={40} /> Mi Carrito
        </h1>

        <Row className="g-4">
          <Col lg={8}>
            <Card className="border-0 shadow-sm p-3">
              <Table responsive className="align-middle">
                <thead>
                  <tr className="text-muted border-bottom">
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
                            <small className="text-muted">Disponibles: {item.stock}</small>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="d-flex flex-column align-items-center">
                          <div className="d-flex align-items-center justify-content-center gap-2">
                            <Button 
                              variant="outline-secondary" 
                              size="sm" 
                              className="rounded-circle p-1"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={14} />
                            </Button>
                            
                            <span className="fw-bold px-2">{item.quantity}</span>
                            
                            <Button 
                              variant="outline-secondary" 
                              size="sm" 
                              className="rounded-circle p-1"
                              disabled={item.quantity >= item.stock}
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
                        <Button variant="link" className="text-danger p-0">
                          <Trash2 size={18} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="mt-3">
                <Link to="/" className="text-decoration-none text-primary fw-semibold">
                  ← Continuar comprando
                </Link>
              </div>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="border-0 shadow-sm overflow-hidden">
              <Card.Header style={{ backgroundColor: "#c1f0f6" }} className="py-3 border-0 text-center">
                <h5 className="mb-0 fw-bold">Resumen de Compra</h5>
              </Card.Header>
              <Card.Body className="p-4" style={{ backgroundColor: "#ffffff" }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <span className="fs-5 fw-bold">Total a pagar</span>
                  <span className="fs-4 fw-bold text-primary">
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