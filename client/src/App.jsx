import { useEffect, useState, useContext } from 'react';
import { ThemeContext } from './context/ThemeContext.jsx';
import { Container, Row, Col } from 'react-bootstrap';
import { AuthContext } from './context/AuthContext.jsx';
import './App.css';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomNavbar from './components/Navbar/navbar.jsx';
import ProductCard from './components/ProductCard/ProductCard.jsx';
import AboutUs from './pages/AboutUs/AboutUs/AboutUs.jsx';
import Footer from './components/Footer/Footer.jsx';
import Login from './pages/Auth/Login/Login.jsx';
import Cart from './pages/Cart/Cart.jsx'; 
import Register from './pages/Auth/Register/Register.jsx';
import AdminPanel from './pages/AdminPanel/AdminPanel.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const { token } = useContext(AuthContext); 
  const { theme } = useContext(ThemeContext);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      setMensaje("El producto se ha agregado al carrito");
      setTimeout(() => setMensaje(""), 1000);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id && item.quantity < product.stock
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id, action) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        if (action === 'increase' && item.quantity < item.stock) {
          return { ...item, quantity: item.quantity + 1 };
        }
        if (action === 'decrease' && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(product => product.id !== id));
  };

  useEffect(() => {
    const fetchGorras = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/inicio');
        if (!response.ok) throw new Error("Error en la respuesta del servidor");

        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al traer las gorras:", error);
        setLoading(false);
      }
    };

    fetchGorras();
  }, []);

  return (
    <Router>
      <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme === "light" ? "#f0fbfc" : "#121212",
        color: theme === "light" ? "#000000" : "#ffffff",
        transition: "all 0.3s ease"
      }}>
        <CustomNavbar />

        {mensaje && (
          <div style={{
            position: 'fixed',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '30px',
            zIndex: 9999,
            fontWeight: '600',
            boxShadow: '0px 4px 15px rgba(0,0,0,0.3)',
            whiteSpace: 'nowrap'
          }}>
            {mensaje}
          </div>
        )}

        {/* ✅ Contenido flexible */}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route
              path="/"
              element={
                <Container className="py-5">
                  <h1 className="fw-bold mb-5">Nuestra Colección</h1>
                  {loading ? (
                    <p>Cargando...</p>
                  ) : (
                    <Row xs={1} sm={2} lg={4} className="g-4">
                      {products.map((p) => (
                        <Col key={p.id}>
                          <ProductCard
                            product={{
                              id: p.id,
                              name: p.nombre,
                              stock: p.stock,
                              price: p.precio,
                              image: p.imagenUrl,
                              category: p.marca
                            }}
                            addToCart={addToCart}
                          />
                        </Col>
                      ))}
                    </Row>
                  )}
                </Container>
              }
            />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={
              <Cart
                cartItems={cart}
                setCart={setCart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                token={token}
              />
            } />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            } />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
