import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from './context/ThemeContext.jsx';
import { Container, Row, Col } from 'react-bootstrap';
import { AuthContext } from './context/AuthContext.jsx';
import { authFetch } from './utils/authFetch.js';
import './App.css';
import './index.css';
import { Routes, Route } from "react-router-dom";
import CustomNavbar from './components/Navbar/navbar.jsx';
import ProductCard from './components/ProductCard/ProductCard.jsx';
import AboutUs from './pages/AboutUs/AboutUs/AboutUs.jsx';
import Footer from './components/Footer/Footer.jsx';
import Login from './pages/Auth/Login/Login.jsx';
import Cart from './pages/Cart/Cart.jsx'; 
import Register from './pages/Auth/Register/Register.jsx';
import AdminPanel from './pages/AdminPanel/AdminPanel.jsx';
import SuperAdmin from './components/SuperAdmin/SuperAdmin.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const { token, user, logout } = useContext(AuthContext); 
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const isAdmin = user?.role === "admin" || user?.role === "super-admin";

  const handleDeleteProduct = async (id) => {
    if (!token) return;

    try {
      const response = await authFetch(`http://localhost:3000/api/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      }, logout, navigate);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar producto");
      }

      setProducts((prev) => prev.filter((product) => product.id !== id));
      setMensaje("Producto eliminado correctamente.");
      setTimeout(() => setMensaje(""), 2000);
    } catch (error) {
      console.error(error);
      setMensaje(error.message);
      setTimeout(() => setMensaje(""), 3000);
    }
  };

  const handleUpdateProduct = async (updatedProduct) => {
    if (!token) return;

    try {
      const body = {
        nombre: updatedProduct.name,
        marca: updatedProduct.category,
        precio: updatedProduct.price,
        stock: updatedProduct.stock,
        imagenUrl: updatedProduct.image
      };

      const response = await authFetch(`http://localhost:3000/api/${updatedProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify(body)
      }, logout, navigate);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar producto");
      }

      const data = await response.json();
      const updated = data.producto;

      setProducts((prev) => prev.map((product) =>
        product.id === updated.id
          ? {
              ...product,
              name: updated.nombre,
              category: updated.marca,
              price: updated.precio,
              stock: updated.stock,
              image: updated.imagenUrl
            }
          : product
      ));
      setMensaje("Producto actualizado correctamente.");
      setTimeout(() => setMensaje(""), 2000);
    } catch (error) {
      console.error(error);
      setMensaje(error.message);
      setTimeout(() => setMensaje(""), 3000);
    }
  };

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
                            isAdmin={isAdmin}
                            onDelete={handleDeleteProduct}
                            onUpdate={handleUpdateProduct}
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
            <Route path="/superadmin" element={<SuperAdmin />} />
          </Routes>
        </div>

        <Footer />
      </div>
  );
}

export default App;
